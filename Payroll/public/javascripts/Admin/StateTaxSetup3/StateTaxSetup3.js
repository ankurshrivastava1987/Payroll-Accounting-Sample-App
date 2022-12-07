app.page("StateTaxSetup3", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnStateTaxSetupId').val(params);
            $('.page-head').html("Edit State Tax Setup 3");
            DisplayData();
            FillStateTaxSetup3Detail();
        }        
    }
});
$('#txtSearch').hide();
$('#btnGo').hide();
$('#aRefresh').hide();
$('#txtEffectiveDate').val(FormatJSDate(new Date(), 'mm/dd/yy'));
$('#txtEffectiveDate').datepicker({
    format: 'mm/dd/yyyy',
    orientation: 'bottom',
    autoclose: true,
    todayHighlight: true
});
function FillStates() {
    var params = {};
    CallService('Admin/StateService.svc', 'GetLookup', params, OnStateGetLookupSuccess, false);
}

function OnStateGetLookupSuccess(states) {
    var html = '<option value="0"></option>';
    if (states != undefined) {
        for (var i = 0; i < states.length; i++) {
            html += '<option value="' + states[i]['StateId'] + '">' + states[i]['StateName'] + '</option>';
        }
    }
    $('#cmbStateName').append(html);
    $('#cmbStateName').val("0");
}
FillStates();

function DisplayData() {   
    var params = { StateTaxSetupId: parseInt($('#hdnStateTaxSetupId').val(), 10) };
   CallService('Admin/StateTaxSetup3Service.svc', 'GetObject', params, OnStateTaxSetup3GetObjectSuccess, true);
    
}
function OnStateTaxSetup3GetObjectSuccess(dtoStateTaxSetup3) {
    if (dtoStateTaxSetup3.StateTaxSetupId != undefined) {
        $('#cmbStateName').val(dtoStateTaxSetup3.StateId);
        $('#txtEffectiveDate').val(FormatDateUTC(dtoStateTaxSetup3.EffectiveDate));
    }
    else {
        window.location = "/Admin/StateTaxSetup3/ViewAllStateTaxSetup3s";
    }    
}
function FillStateTaxSetup3Detail() {
    var params = { StateTaxSetupId: parseInt($('#hdnStateTaxSetupId').val(), 10) };
    CallService('Admin/StateTaxSetup3Service.svc', 'GetStateTaxSetup3Detail', params, OnGetStateTaxSetup3DetailSuccess, true);
}

function OnGetStateTaxSetup3DetailSuccess(response) {
    var i = 0;
    var StateTaxSetup3Details = '';
    $.each(response, function () {
        StateTaxSetup3Details += i + String.fromCharCode(134);        
        StateTaxSetup3Details += this.LowLimit.toFixed(2) + String.fromCharCode(134);
        StateTaxSetup3Details += this.HighLimit.toFixed(2) + String.fromCharCode(134);
        StateTaxSetup3Details += this.AdditionalTax.toFixed(2) + String.fromCharCode(134);
        StateTaxSetup3Details += this.TaxRate.toFixed(2) + String.fromCharCode(134);             
        StateTaxSetup3Details += "0";
        if (i < response.length - 1) {
            StateTaxSetup3Details += String.fromCharCode(135);
        }
        i++;
    });
    $('#hdnStateTaxSetup3Details').val(StateTaxSetup3Details);
    FillGrid();    
}

$.validator.addMethod(
    "Required1",
    function (value, element) {
        return ($('#cmbStateName').val() === '0' ? false : true);
    },
    "State is required"
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
        cmbStateName: {
            Required1: true
        }
            
    },
    messages: {        
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
        var params = { StateTaxSetupId: parseInt($("#hdnStateTaxSetupId").val(), 10), StateId: parseInt($("#cmbStateName").val(), 10), EffectiveDate: $("#txtEffectiveDate").val(), StateTaxSetup3Details: $("#hdnStateTaxSetup3Details").val() };
        CallService('Admin/StateTaxSetup3Service.svc', 'Save', params, OnStateTaxSetup3SaveSuccess, false);
    }
};

function OnStateTaxSetup3SaveSuccess(StateTaxSetupId) {
    if (StateTaxSetupId > 0) {
        window.location = "/Admin/Main.html#ViewAllStateTaxSetup3s";
    }
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllStateTaxSetup3s";
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
            var arrDetails = $('#hdnStateTaxSetup3Details').val().split(String.fromCharCode(135));
            if (arrDetails[0] == "") {
                arrDetails.splice(0, 1);
            }           
            if ($('#hdnRowNo').val() == '-1') {
                var detail = '';
                detail += arrDetails.length + String.fromCharCode(134);
                detail += $('#txtLowLimit').val() + String.fromCharCode(134);
                detail += $('#txtHighLimit').val() + String.fromCharCode(134);
                detail += $('#txtAdditionalTax').val() + String.fromCharCode(134);
                detail += $('#txtTaxRate').val() + String.fromCharCode(134);
                detail += "0";
                arrDetails.push(detail);
            }
            else {
                var detail = '';
                detail += $('#hdnRowNo').val() + String.fromCharCode(134);
                detail += $('#txtLowLimit').val() + String.fromCharCode(134);
                detail += $('#txtHighLimit').val() + String.fromCharCode(134);
                detail += $('#txtAdditionalTax').val() + String.fromCharCode(134);
                detail += $('#txtTaxRate').val() + String.fromCharCode(134);
                detail += "0";
                arrDetails[parseInt($('#hdnRowNo').val())] = detail;
            }
            $('#hdnStateTaxSetup3Details').val(arrDetails.join(String.fromCharCode(135)));
            FillGrid();
            $('#myModal').modal('toggle');
        }
    });
});

function Delete(rowNo) {
    var arrDetails = $('#hdnStateTaxSetup3Details').val().split(String.fromCharCode(135));
    var arrDetail = arrDetails[rowNo].split(String.fromCharCode(134));
    arrDetail[5] = "1";
    arrDetails[rowNo] = arrDetail.join(String.fromCharCode(134));
    $('#hdnStateTaxSetup3Details').val(arrDetails.join(String.fromCharCode(135)));
}
function NewRecord() {
    $('#hdnRowNo').val('-1');   
    $('#txtLowLimit').val('0.00');
    $('#txtHighLimit').val('0.00');
    $('#txtAdditionalTax').val('0.00');
    $('#txtTaxRate').val('0.00');
    $('#myModal').modal('toggle');
    SetKeyPress();   
};
function EditRecord(rowNo) {
    var arrDetails = $('#hdnStateTaxSetup3Details').val().split(String.fromCharCode(135));
    var arrDetail = arrDetails[rowNo].split(String.fromCharCode(134));
    $('#hdnRowNo').val(arrDetail[0]);
    $('#txtLowLimit').val(arrDetail[1]);
    $('#txtHighLimit').val(arrDetail[2]);
    $('#txtAdditionalTax').val(arrDetail[3]); 
    $('#txtTaxRate').val(arrDetail[4]);
    $('#myModal').modal('toggle');
    SetKeyPress();    
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
    $('#tblStateTaxSetup3Details').find('tr').each(function () {
        var row = $(this);
        if (row.find('input[name^="chk"]').is(':checked')) {           
            Delete(row.context.attributes['rowno'].value);
        }
    });    
    FillGrid();   
}
function FillGrid() {
    var html = '';   
    if ($('#hdnStateTaxSetup3Details').val() != "") {
        var arrDetails = $('#hdnStateTaxSetup3Details').val().split(String.fromCharCode(135));
        for (var i = 0; i < arrDetails.length; i++) {
            var arrDetail = arrDetails[i].split(String.fromCharCode(134));
            if (arrDetail[5] == "0") {
                html += '<tr rowno="' + i + '">';
                html += '<td><input type="checkbox" name="chk' + i + '"/></td>';
                html += '<td class="text-right">' + accounting.formatMoney(arrDetail[1]) + '</td>';
                html += '<td class="text-right">' + accounting.formatMoney(arrDetail[2]) + '</td>';
                html += '<td class="text-right">' + accounting.formatMoney(arrDetail[3]) + '</td>';
                html += '<td class="text-right">' + arrDetail[4] + '%</td>';
                html += ' <td class="td-center"><a href="javascript:void(0)" onclick=\"EditRecord(' + i + ')\" class="link"><i class="fa fa-pencil" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick=\"DeleteRecord(' + i + ')\" class="link"><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
                html += '</tr>';
            }
        }
    }    
    $('#bodyStateTaxSetup3Details').html(html);  
}
$.validator.addMethod(
    "Required5", 
        function (value, element) {        
        return ($('#txtHighLimit').val()==='0.00'?false:true);
    },
        "But Not Over is required"
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
        txtHighLimit: {
            Required5: true
        }
    },
    messages: {       
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

var CurrentStepIndex = 1;
function StepClick(index) {
    CurrentStepIndex = index;
    CommandManager();
}
function CommandManager() {
    if (CurrentStepIndex == 1) {
        $('#liStep1').addClass('completed');
        $('#liStep2').removeClass('completed');

        $('#divStep1').removeClass('hide');
        $('#divStep2').addClass('hide');

        $("#btnBack").attr('disabled', 'disabled');
        $("#btnNext").removeAttr('disabled');
    }
    else if (CurrentStepIndex == 2) {
        $('#liStep1').addClass('completed');
        $('#liStep2').addClass('completed');

        $('#divStep1').addClass('hide');
        $('#divStep2').removeClass('hide');

        $("#btnBack").removeAttr('disabled');
        $("#btnNext").attr('disabled', 'disabled');
    }
}
$("#btnBack").click(function (e) {
    CurrentStepIndex = CurrentStepIndex - 1
    CommandManager();
});
$("#btnNext").click(function (e) {
    CurrentStepIndex = CurrentStepIndex + 1
    CommandManager();
});