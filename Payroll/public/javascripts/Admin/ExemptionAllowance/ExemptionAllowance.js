app.page("ExemptionAllowance", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnExemptionAllowanceId').val(params);
            $('.page-head').html("Edit Exemption Allowance");
            DisplayData();
            FillExemptionAllowanceDetail();
        }       
    }
});
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
var params = {};
var PayScheduleRecurrences = CallService1('Admin/PayScheduleRecurrenceService.svc', 'GetLookup', params);

var params = {};
var FilingStatuses = CallService1('Admin/FilingStatusService.svc', 'GetLookup', params);
var html = '';
html += '<tr class="footable-odd">';
html += '<td>Allowances on DE 4 or Form W-4</td>';
for (var i = 0; i < PayScheduleRecurrences.length; i++) {   
    html += '<td>' + _.escape(PayScheduleRecurrences[i].PayScheduleRecurrenceName) + '($)</td>';  
}
html += '</tr>';
$('#tblExemptionAllowance thead').html(html);

html = '';
for (var j = 0; j < 11; j++)
{
    html += '<tr>';
    html += '<td>' + j + '</td>';
    for (var i = 0; i < PayScheduleRecurrences.length; i++){
        html += '<td><input id="A_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_' + j + '" class="form-control decimal text-right a" style="width:90px;" value="0.00"></input></td>';
    }
    html += '</tr>';
}
$('#bodyExemptionAllowance').html(html);

function DisplayData() {   
    var params = { ExemptionAllowanceId: parseInt($('#hdnExemptionAllowanceId').val(), 10) };
    CallService('Admin/ExemptionAllowanceService.svc', 'GetObject', params, OnExemptionAllowanceGetObjectSuccess, true);
    
}
function OnExemptionAllowanceGetObjectSuccess(dtoExemptionAllowance) {
    if (dtoExemptionAllowance.ExemptionAllowanceId != undefined) {
        $('#cmbStateName').val(dtoExemptionAllowance.StateId);
        $('#txtEffectiveDate').val(FormatDateUTC(dtoExemptionAllowance.EffectiveDate));
    }
    else {
        window.location = "/Admin/Main.html#ViewAllExemptionAllowances";
    }   
}

function FillExemptionAllowanceDetail() {
    var params = { ExemptionAllowanceId: parseInt($('#hdnExemptionAllowanceId').val(), 10) };
    CallService('Admin/ExemptionAllowanceService.svc', 'GetExemptionAllowanceDetail', params, OnGetExemptionAllowanceDetailSuccess, true);
}

function OnGetExemptionAllowanceDetailSuccess(response) {
    for (var i = 0; i < PayScheduleRecurrences.length; i++)
    {
        for (var j = 0; j < 11; j++)
        {
            for (var k = 0; k < response.length; k++)
            {
                if ((PayScheduleRecurrences[i].PayScheduleRecurrenceId === response[k].PayScheduleRecurrenceId) && (j === response[k].Allowances))
                {
                    $('#A_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_' + j).val(response[k].Amount.toFixed(2));
                }
            }
        }
    }
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
        var ExemptionAllowanceDetails = '';
        $('.a').each(function (index, data) {
            var arrA = $(this).attr('id').split('_');
            ExemptionAllowanceDetails += arrA[1] + String.fromCharCode(134) + arrA[2] + String.fromCharCode(134) + $(this).val();
            if (index < $('.a').length - 1)
            {
                ExemptionAllowanceDetails += String.fromCharCode(135);
            }
        });       
        var params = { ExemptionAllowanceId: parseInt($("#hdnExemptionAllowanceId").val(), 10), StateId: parseInt($("#cmbStateName").val(), 10), EffectiveDate: $("#txtEffectiveDate").val(), ExemptionAllowanceDetails: ExemptionAllowanceDetails};
        CallService('Admin/ExemptionAllowanceService.svc', 'Save', params, OnExemptionAllowanceSaveSuccess, false);
    }
};

function OnExemptionAllowanceSaveSuccess(ExemptionAllowanceId) {
    if (ExemptionAllowanceId > 0) {
        window.location = "/Admin/Main.html#ViewAllExemptionAllowances";
    }
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllExemptionAllowances";
}
$('.decimal').keypress(function (event) {
    return isNumber(event, this)
}).bind('blur', function () {
    var num;

    num = parseFloat($(this).val());

    num = isNaN(num) ? '0.00' : num;
    if (num && num < 0) num = num * -1;
    $(this).val(parseFloat(num).toFixed(2));
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