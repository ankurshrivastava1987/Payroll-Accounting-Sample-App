//Single Page Application
CheckPageRequest();
app.page("Plan", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnPlanId').val(params);
            DisplayData();
        }
        else {
            window.location = "/Admin/Main.html#ViewAllPlans";
        }
    }
});
// End for Single page application

$('#txtSearch').hide();
$('#btnGo').hide();
$('#aRefresh').hide();
$(function () {
    $('#txtEffectiveDate').DatePicker({
        orientation: "bottom",
        daysOfWeekDisabled: "6",
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true
    });    
});

function FillAvailableFeatures() {
    var params = { PlanId: parseInt($('#hdnPlanId').val(), 10) };
    CallService('Admin/PlanService.svc', 'GetAvailableFeatures', params, OnFeatureGetAvailableFeaturesSuccess, true);
}

function OnFeatureGetAvailableFeaturesSuccess(features) {
    var html = '';
    if (features != undefined) {
        for (var i = 0; i < features.length; i++) {
            html += '<option value="' + features[i]['FeatureId'] + '">' + features[i]['FeatureName'] + '</option>';
        }
    }
    $('#lstAvailable').append(html);    
}
FillAvailableFeatures();

function FillSelectedFeatures() {
    var params = { PlanId: parseInt($('#hdnPlanId').val(), 10) };
    CallService('Admin/PlanService.svc', 'GetSelectedFeatures', params, OnFeatureGetSelectedFeaturesSuccess, true);
}

function OnFeatureGetSelectedFeaturesSuccess(features) {
    var html = '';
    if (features != undefined) {
        for (var i = 0; i < features.length; i++) {
            html += '<option value="' + features[i]['FeatureId'] + '">' + features[i]['FeatureName'] + '</option>';
        }
    }
    $('#lstSelected').append(html);
}
FillSelectedFeatures();

function FillPlanCharges() {
    var params = { PlanId: parseInt($('#hdnPlanId').val(), 10) };
    CallService('Admin/PlanService.svc', 'GetPlanCharges', params, OnFeatureGetPlanChargesSuccess, true);
}

function OnFeatureGetPlanChargesSuccess(Charges) {
    var i = 0;
    var planCharges = '';
    $.each(Charges, function () {
        planCharges += i + String.fromCharCode(134);        
        planCharges += FormatDateUTC(this.EffectiveDate) + String.fromCharCode(134);
        planCharges += this.AmountPerMonth.toFixed(2) + String.fromCharCode(134);
        planCharges += this.AmountPerEmployeePerMonth.toFixed(2) + String.fromCharCode(134);
        planCharges += this.AmountPerYear.toFixed(2) + String.fromCharCode(134);             
        planCharges += "0";
        if (i < Charges.length - 1) {
            planCharges += String.fromCharCode(135);
        }
        i++;
    });
    $('#hdnCharges').val(planCharges);
    FillGrid();    
}
FillPlanCharges();

function DisplayData() {
    var params = { PlanId: parseInt($('#hdnPlanId').val(), 10) };
    CallService('Admin/PlanService.svc', 'GetObject', params, OnPlanGetObjectSuccess, true);
}
function OnPlanGetObjectSuccess(dtoPlan) {
    if (dtoPlan.PlanId != undefined) {
        $('#txtPlanCode').val(dtoPlan.PlanCode);
        $('#txtPlanName').val(dtoPlan.PlanName);
        $('#txtDisplayOrder').val(dtoPlan.DisplayOrder);
        $('#cmbStatus').val(dtoPlan.Status);
    }
}
DisplayData();

$("#txtPlanCode").focus();
$.validator.addMethod(
    "Required1", 
        function (value, element) {
        return ($('#txtPlanCode').val() == "0"? false:true);
    },
        "Plan Code is required"
);
$.validator.addMethod(
    "AlreadyExists1", 
        function (value, element) {
        var params = { PlanId: parseInt($("#hdnPlanId").val(), 10), PlanCode: value };
        var response = CallService1('Admin/PlanService.svc', 'Exists1', params);
        return !response;
    },
        "Plan Code already exists"
);
$.validator.addMethod(
    "AlreadyExists", 
        function (value, element) {
        var params = { PlanId: parseInt($("#hdnPlanId").val(), 10), PlanName: value };
        var response = CallService1('Admin/PlanService.svc', 'Exists', params);
        return !response;
    },
        "Plan Name already exists"
);
var form = $("#frmEntry");
var valid = form.validate({
    
    /* @validation states + elements
         ------------------------------------------- */

    errorClass: 'error-view',
    validClass: 'success-view',
    errorElement: 'span',
    
    /* @validation rules
         ------------------------------------------ */
        rules: {
        txtPlanCode: {
            Required1: true,
            AlreadyExists1: true
        },
        txtPlanName: {
            required: true,
            AlreadyExists: true
        }
    },
    messages: {
        txtPlanName: {
            required: 'Plan Name is required'
        }
    },
    highlight: function (element, errorClass, validClass) {
        $(element).closest('.input').removeClass(validClass).addClass(errorClass);
        if ($(element).is(':checkbox') || $(element).is(':radio')) {
            $(element).closest('.check').removeClass(validClass).addClass(errorClass);
        }
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).closest('.input').removeClass(errorClass).addClass(validClass);
        if ($(element).is(':checkbox') || $(element).is(':radio')) {
            $(element).closest('.check').removeClass(errorClass).addClass(validClass);
        }
    },
    errorPlacement: function (error, element) {
        if ($(element).is(':checkbox') || $(element).is(':radio')) {
            $(element).closest('.check').append(error);
        } else {
            $(element).closest('.unit').append(error);
        }
    }
});
function Save() {
    if (form.valid()) {
        var features = '';
        $("#lstSelected > option").each(function () {
            features += this.value + ',';
        });
        if (features != '') {
            features = features.substring(0, features.length - 1);
        }
        var params = { PlanId: parseInt($("#hdnPlanId").val(), 10), PlanCode: parseInt($("#txtPlanCode").val(), 10), PlanName: $("#txtPlanName").val(), DisplayOrder: parseInt($("#txtDisplayOrder").val(), 10), Status: $("#cmbStatus").val(), Features: features, PlanCharges: $("#hdnCharges").val() };
        CallService('Admin/PlanService.svc', 'Save', params, OnPlanSaveSuccess, false);
    }
};

function OnPlanSaveSuccess(PlanId) {
    if (PlanId > 0) {
        window.location = "/Admin/Main.html#ViewAllPlans";
    }
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllPlans";
}
function move_list_items(sourceid, destinationid) {
    $("#" + sourceid + "  option:selected").appendTo("#" + destinationid);
}

//this will move all selected items from source list to destination list
function move_list_items_all(sourceid, destinationid) {
    $("#" + sourceid + " option").appendTo("#" + destinationid);
}
function SetKeyPress() {
    $('.decimal').keypress(function (event) {
        return isNumber(event, this)
    }).bind('blur', function () {
        var num;
        
        num = parseFloat($(this).val());
        
        num = isNaN(num) ? '0.00' : num;
        if (num && num < 0) num = num * -1;
        $(this).val(parseFloat(num).toFixed(2));
    });
}
$(document).ready(function () {    
    $('input[name="0"]').click(function () {
        $('input[type="checkbox"]').each(function () {
            if ($(this).context.name != "0") {
                $(this).prop("checked", $('input[name="0"]')[0].checked);
            }
        });
    });
    $("#btnOK").click(function (e) {
        if (form1.valid()) {
            var arrCharges = $('#hdnCharges').val().split(String.fromCharCode(135));
            if (arrCharges[0] == "") {
                arrCharges.splice(0, 1);
            }           
            if ($('#hdnRowNo').val() == '-1') {
                var charge = '';
                charge += arrCharges.length + String.fromCharCode(134);
                charge += $('#txtEffectiveDate').val() + String.fromCharCode(134);
                charge += $('#txtAmountPerMonth').val() + String.fromCharCode(134);
                charge += $('#txtAmountPerEmployeePerMonth').val() + String.fromCharCode(134);
                charge += $('#txtAmountPerYear').val() + String.fromCharCode(134);
                charge += "0";
                arrCharges.push(charge);
            }
            else {
                var charge = '';
                charge += $('#hdnRowNo').val() + String.fromCharCode(134);
                charge += $('#txtEffectiveDate').val() + String.fromCharCode(134);
                charge += $('#txtAmountPerMonth').val() + String.fromCharCode(134);
                charge += $('#txtAmountPerEmployeePerMonth').val() + String.fromCharCode(134);
                charge += $('#txtAmountPerYear').val() + String.fromCharCode(134);
                charge += "0";
                arrCharges[parseInt($('#hdnRowNo').val())] = charge;
            }
            $('#hdnCharges').val(arrCharges.join(String.fromCharCode(135)));
            FillGrid();
            $('#myModal').modal('toggle');
        }
    });
});

function Delete(rowNo) {
    var arrCharges = $('#hdnCharges').val().split(String.fromCharCode(135));
    var arrCharge = arrCharges[rowNo].split(String.fromCharCode(134));
    arrCharge[5] = "1";
    arrCharges[rowNo] = arrCharge.join(String.fromCharCode(134));
    $('#hdnCharges').val(arrCharges.join(String.fromCharCode(135)));
}
function NewRecord() {
    $('#hdnRowNo').val('-1');
    $('#txtEffectiveDate').val(FormatDate(new Date(), 'mm/dd/yy'));
    $('#txtAmountPerMonth').val('0.00');
    $('#txtAmountPerEmployeePerMonth').val('0.00');
    $('#txtAmountPerYear').val('0.00');
    $('#myModal').modal('toggle');
    SetKeyPress();
    $('#txtEffectiveDate').focus();
};
function EditRecord(rowNo) {
    var arrCharges = $('#hdnCharges').val().split(String.fromCharCode(135));
    var arrCharge = arrCharges[rowNo].split(String.fromCharCode(134));
    $('#hdnRowNo').val(arrCharge[0]);
    $('#txtEffectiveDate').val(arrCharge[1]);
    $('#txtAmountPerMonth').val(arrCharge[2]);
    $('#txtAmountPerEmployeePerMonth').val(arrCharge[3]); 
    $('#txtAmountPerYear').val(arrCharge[4]);
    $('#myModal').modal('toggle');
    SetKeyPress();
    $('#txtEffectiveDate').focus();
}
function DeleteRecord(rowNo) {
    if (!confirm('Are you sure to delete selected record?')) {
        return false;
    }
    Delete(rowNo);
    FillGrid();
}
function DeleteSelected() {
    if ($('td input[name^="chk"]:checked').is(":empty") == false) {
        alert('Use checkboxes to select record(s)');
        return false;
    }
    if (!confirm('Are you sure to delete selected record(s)?')) {
        return false;
    }    
    $('#tblCharges').find('tr').each(function () {
        var row = $(this);
        if (row.find('input[name^="chk"]').is(':checked')) {           
            Delete(row.context.attributes['rowno'].value);
        }
    });    
    FillGrid();   
}
function FillGrid() {
    var html = '';   
    if ($('#hdnCharges').val() != "") {
        var arrCharges = $('#hdnCharges').val().split(String.fromCharCode(135));
        for (var i = 0; i < arrCharges.length; i++) {
            var arrCharge = arrCharges[i].split(String.fromCharCode(134));
            if (arrCharge[5] == "0") {
                html += '<tr rowno="' + i + '">';
                html += '<td><input type="checkbox" name="chk' + i + '"/></td>';
                html += '<td>' + arrCharge[1] + '</td>';
                html += '<td>' + arrCharge[2] + '</td>';
                html += '<td>' + arrCharge[3] + '</td>';
                html += '<td>' + arrCharge[4] + '</td>';
                html += ' <td class="td-center"><a href="javascript:void(0)" onclick=\"EditRecord(' + i + ')\"><span class="zmdi zmdi-edit"></span></a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick=\"DeleteRecord(' + i + ')\"><span class="zmdi zmdi-close"></span></a></td>';
                html += '</tr>';
            }
        }
    }    
    $('#bodyCharges').html(html);  
}
$.validator.addMethod(
    "AlreadyExists2", 
        function (value, element) {
        var arrCharges = $('#hdnCharges').val().split(String.fromCharCode(135));
        if (arrCharges[0] == "") {
            arrCharges.splice(0, 1);
        }
        var found = false;
        for (var i = 0; i < arrCharges.length; i++) {
            var arrCharge = arrCharges[i].split(String.fromCharCode(134))
            if (($('#hdnRowNo').val() != arrCharge[0]) && (value == arrCharge[1])) {
                found = true;
                break;
            }
        }       
        return !found;
    },
        "Effective Date already exists"
);
var form1 = $("#frmEntry1");
var valid1 = form1.validate({
    
    /* @validation states + elements
         ------------------------------------------- */

    errorClass: 'error-view',
    validClass: 'success-view',
    errorElement: 'span',
    
    /* @validation rules
         ------------------------------------------ */
        rules: {
        txtEffectiveDate: {
            required: true,
            AlreadyExists2: true
        }
    },
    messages: {
        txtEffectiveDate: {
            required: 'Effective Date is required'
        }
    },
    highlight: function (element, errorClass, validClass) {
        $(element).closest('.input').removeClass(validClass).addClass(errorClass);
        if ($(element).is(':checkbox') || $(element).is(':radio')) {
            $(element).closest('.check').removeClass(validClass).addClass(errorClass);
        }
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).closest('.input').removeClass(errorClass).addClass(validClass);
        if ($(element).is(':checkbox') || $(element).is(':radio')) {
            $(element).closest('.check').removeClass(errorClass).addClass(validClass);
        }
    },
    errorPlacement: function (error, element) {
        if ($(element).is(':checkbox') || $(element).is(':radio')) {
            $(element).closest('.check').append(error);
        } else {
            $(element).closest('.unit').append(error);
        }
    }
});