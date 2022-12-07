app.page("TaxSlabSetup", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnTaxSlabSetupId').val(params);
            $('.page-head').html("Edit Tax Slab Setup");  
            DisplayData();
            FillTaxSlabSetupDetail();
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
    var params = { TaxSlabSetupId: parseInt($('#hdnTaxSlabSetupId').val(), 10) };
    CallService('Admin/TaxSlabSetupService.svc', 'GetObject', params, OnTaxSlabSetupGetObjectSuccess, true);
   
}
function OnTaxSlabSetupGetObjectSuccess(dtoTaxSlabSetup) {
    if (dtoTaxSlabSetup.TaxSlabSetupId != undefined) {
        $('#cmbStateName').val(dtoTaxSlabSetup.StateId);
        $('#txtEffectiveDate').val(FormatDateUTC(dtoTaxSlabSetup.EffectiveDate));
    }
    else {
        window.location = "/Admin/Main.html#ViewAllTaxSlabSetups";
    }    
}

function FillTaxSlabSetupDetail() {
    var params = { TaxSlabSetupId: parseInt($('#hdnTaxSlabSetupId').val(), 10) };
    CallService('Admin/TaxSlabSetupService.svc', 'GetTaxSlabSetupDetail', params, OnGetTaxSlabSetupDetailSuccess, true);
}

function OnGetTaxSlabSetupDetailSuccess(response) {
    var i = 0;
    var TaxSlabSetupDetails = '';
    $.each(response, function () {
        TaxSlabSetupDetails += i + String.fromCharCode(134);        
        TaxSlabSetupDetails += this.LowLimit.toFixed(2) + String.fromCharCode(134);
        TaxSlabSetupDetails += this.HighLimit.toFixed(2) + String.fromCharCode(134);
        TaxSlabSetupDetails += this.AdditionalTax.toFixed(2) + String.fromCharCode(134);
        TaxSlabSetupDetails += this.TaxRate.toFixed(2) + String.fromCharCode(134);             
        TaxSlabSetupDetails += "0";
        if (i < response.length - 1) {
            TaxSlabSetupDetails += String.fromCharCode(135);
        }
        i++;
    });
    $('#hdnTaxSlabSetupDetails').val(TaxSlabSetupDetails);
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
        var params = { TaxSlabSetupId: parseInt($("#hdnTaxSlabSetupId").val(), 10), StateId: parseInt($("#cmbStateName").val(), 10), EffectiveDate: $("#txtEffectiveDate").val(), TaxSlabSetupDetails: $("#hdnTaxSlabSetupDetails").val() };
        CallService('Admin/TaxSlabSetupService.svc', 'Save', params, OnTaxSlabSetupSaveSuccess, false);
    }
};

function OnTaxSlabSetupSaveSuccess(TaxSlabSetupId) {
    if (TaxSlabSetupId > 0) {
        window.location = "/Admin/Main.html#ViewAllTaxSlabSetups";
    }
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllTaxSlabSetups";
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
            var arrDetails = $('#hdnTaxSlabSetupDetails').val().split(String.fromCharCode(135));
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
            $('#hdnTaxSlabSetupDetails').val(arrDetails.join(String.fromCharCode(135)));
            FillGrid();
            $('#myModal').modal('toggle');
        }
    });
});

function Delete(rowNo) {
    var arrDetails = $('#hdnTaxSlabSetupDetails').val().split(String.fromCharCode(135));
    var arrDetail = arrDetails[rowNo].split(String.fromCharCode(134));
    arrDetail[5] = "1";
    arrDetails[rowNo] = arrDetail.join(String.fromCharCode(134));
    $('#hdnTaxSlabSetupDetails').val(arrDetails.join(String.fromCharCode(135)));
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
    var arrDetails = $('#hdnTaxSlabSetupDetails').val().split(String.fromCharCode(135));
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
    $('#tblTaxSlabSetupDetails').find('tr').each(function () {
        var row = $(this);
        if (row.find('input[name^="chk"]').is(':checked')) {           
            Delete(row.context.attributes['rowno'].value);
        }
    });    
    FillGrid();   
}
function FillGrid() {
    var html = '';   
    if ($('#hdnTaxSlabSetupDetails').val() != "") {
        var arrDetails = $('#hdnTaxSlabSetupDetails').val().split(String.fromCharCode(135));
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
    $('#bodyTaxSlabSetupDetails').html(html);  
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