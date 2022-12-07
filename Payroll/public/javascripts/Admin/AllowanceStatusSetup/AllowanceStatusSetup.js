app.page("AllowanceStatusSetup", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnAllowanceStatusSetupId').val(params);
            $('.page-head').html("Edit Allowance Status Setup");
            DisplayData();
            FillAllowanceStatusSetupStandardDeduction();
            FillAllowanceStatusSetupPersonalAllowance();
            FillAllowanceStatusSetupDependentAllowance();
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
var FilingStatuses;
$("#cmbStateName").change(function () {
    var params = { StateId: $('#cmbStateName').val() };
    FilingStatuses = CallService1('Admin/FilingStatusService.svc', 'GetLookup', params);
    var html = '';
    html += '<tr class="footable-odd">';
    html += '<td>Frequency</td>';
    for (var i = 0; i < FilingStatuses.length; i++) {
        html += '<td>' + _.escape(FilingStatuses[i].FilingStatusName) + '($)</td>';
    }
    html += '</tr>';
    $('#tblStandardDeduction thead').html(html);
    $('#tblPersonalAllowance thead').html(html);
    html = '';
    for (var i = 0; i < PayScheduleRecurrences.length; i++) {
        html += '<tr>';
        html += '<td>' + PayScheduleRecurrences[i].PayScheduleRecurrenceName + '</td>';
        for (var j = 0; j < FilingStatuses.length; j++) {
            html += '<td><input id="A_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_' + FilingStatuses[j].FilingStatusId + '" class="form-control decimal text-right a" style="width:100px;" value="0.00"></input></td>';
        }
        html += '</tr>';
    }
    $('#bodyStandardDeduction').html(html);
    html = '';
    for (var i = 0; i < PayScheduleRecurrences.length; i++) {
        html += '<tr>';
        html += '<td>' + _.escape(PayScheduleRecurrences[i].PayScheduleRecurrenceName) + '</td>';
        for (var j = 0; j < FilingStatuses.length; j++) {
            html += '<td><input id="B_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_' + FilingStatuses[j].FilingStatusId + '" class="form-control decimal text-right b" style="width:100px;" value="0.00"></input></td>';
        }
        html += '</tr>';
    }
    $('#bodyPersonalAllowance').html(html);


    html = '<tr class="footable-odd">';
    html += '<td>Frequency</td>';
    html += '<td>Dependent Allowance($)</td>';
    html += '</tr>';
    $('#tblDependentAllowance thead').html(html);
    html = '';
    for (var i = 0; i < PayScheduleRecurrences.length; i++) {
        html += '<tr>';
        html += '<td>' + _.escape(PayScheduleRecurrences[i].PayScheduleRecurrenceName) + '</td>';
        html += '<td><input id="C_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '" class="form-control decimal text-right c" style="width:100px;" value="0.00"></input></td>';
        html += '</tr>';
    }
    $('#bodyDependentAllowance').html(html);
});
function DisplayData() {    
    var params = { AllowanceStatusSetupId: parseInt($('#hdnAllowanceStatusSetupId').val(), 10) };
    CallService('Admin/AllowanceStatusSetupService.svc', 'GetObject', params, OnAllowanceStatusSetupGetObjectSuccess, true);   
}
function OnAllowanceStatusSetupGetObjectSuccess(dtoAllowanceStatusSetup) {
    if (dtoAllowanceStatusSetup.AllowanceStatusSetupId != undefined) {
        $('#cmbStateName').val(dtoAllowanceStatusSetup.StateId);
        $('#cmbStateName').change();
        $('#txtEffectiveDate').val(FormatDateUTC(dtoAllowanceStatusSetup.EffectiveDate));        
    }
    else {
        window.location = "/Admin/Main.html#ViewAllAllowanceStatusSetups";
    }    
}
function FillAllowanceStatusSetupStandardDeduction() {
    var params = { AllowanceStatusSetupId: parseInt($('#hdnAllowanceStatusSetupId').val(), 10) };
    CallService('Admin/AllowanceStatusSetupService.svc', 'GetAllowanceStatusSetupStandardDeduction', params, OnGetAllowanceStatusSetupStandardDeductionSuccess, true);
}

function OnGetAllowanceStatusSetupStandardDeductionSuccess(response) {
    for (var i = 0; i < PayScheduleRecurrences.length; i++)
    {
        for (var j = 0; j < FilingStatuses.length; j++)
        {
            for (var k = 0; k < response.length; k++)
            {
                if ((PayScheduleRecurrences[i].PayScheduleRecurrenceId === response[k].PayScheduleRecurrenceId) && (FilingStatuses[j].FilingStatusId === response[k].FilingStatusId))
                {
                    $('#A_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_' + FilingStatuses[j].FilingStatusId).val(response[k].Amount.toFixed(2));
                }
            }
        }
    }
}

function FillAllowanceStatusSetupPersonalAllowance() {
    var params = { AllowanceStatusSetupId: parseInt($('#hdnAllowanceStatusSetupId').val(), 10) };
    CallService('Admin/AllowanceStatusSetupService.svc', 'GetAllowanceStatusSetupPersonalAllowance', params, OnGetAllowanceStatusSetupPersonalAllowanceSuccess, true);
}

function OnGetAllowanceStatusSetupPersonalAllowanceSuccess(response) {
    for (var i = 0; i < PayScheduleRecurrences.length; i++) {
        for (var j = 0; j < FilingStatuses.length; j++) {
            for (var k = 0; k < response.length; k++) {
                if ((PayScheduleRecurrences[i].PayScheduleRecurrenceId === response[k].PayScheduleRecurrenceId) && (FilingStatuses[j].FilingStatusId === response[k].FilingStatusId)) {
                    $('#B_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_' + FilingStatuses[j].FilingStatusId).val(response[k].Amount.toFixed(2));
                }
            }
        }
    }
}

function FillAllowanceStatusSetupDependentAllowance() {
    var params = { AllowanceStatusSetupId: parseInt($('#hdnAllowanceStatusSetupId').val(), 10) };
    CallService('Admin/AllowanceStatusSetupService.svc', 'GetAllowanceStatusSetupDependentAllowance', params, OnGetAllowanceStatusSetupDependentAllowanceSuccess, true);
}

function OnGetAllowanceStatusSetupDependentAllowanceSuccess(response) {
    for (var i = 0; i < PayScheduleRecurrences.length; i++) {        
        for (var j = 0; j < response.length; j++) {
            if (PayScheduleRecurrences[i].PayScheduleRecurrenceId === response[j].PayScheduleRecurrenceId)  {
                $('#C_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId).val(response[j].Amount.toFixed(2));
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
        var StandardDeductions = '';
        $('.a').each(function (index, data) {
            var arrA = $(this).attr('id').split('_');
            StandardDeductions += arrA[1] + String.fromCharCode(134) + arrA[2] + String.fromCharCode(134) + $(this).val();
            if (index < $('.a').length - 1)
            {
                StandardDeductions += String.fromCharCode(135);
            }
        });
        var PersonalAllowances = '';
        $('.b').each(function (index, data) {
            var arrB = $(this).attr('id').split('_');
            PersonalAllowances += arrB[1] + String.fromCharCode(134) + arrB[2] + String.fromCharCode(134) + $(this).val();
            if (index < $('.b').length - 1) {
                PersonalAllowances += String.fromCharCode(135);
            }
        });
        var DependentAllowances = '';
        $('.c').each(function (index, data) {
            var arrC = $(this).attr('id').split('_');
            DependentAllowances += arrC[1] + String.fromCharCode(134) + $(this).val();
            if (index < $('.c').length - 1) {
                DependentAllowances += String.fromCharCode(135);
            }
        });
        var params = { AllowanceStatusSetupId: parseInt($("#hdnAllowanceStatusSetupId").val(), 10), StateId: parseInt($("#cmbStateName").val(), 10), EffectiveDate: $("#txtEffectiveDate").val(), StandardDeductions: StandardDeductions, PersonalAllowances: PersonalAllowances, DependentAllowances: DependentAllowances};
        CallService('Admin/AllowanceStatusSetupService.svc', 'Save', params, OnAllowanceStatusSetupSaveSuccess, false);
    }
};

function OnAllowanceStatusSetupSaveSuccess(AllowanceStatusSetupId) {
    if (AllowanceStatusSetupId > 0) {
        window.location = "/Admin/Main.html#ViewAllAllowanceStatusSetups";
    }
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllAllowanceStatusSetups";
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
        $('#liStep3').removeClass('completed');
        $('#liStep4').removeClass('completed');
       
        $('#divStep1').removeClass('hide');
        $('#divStep2').addClass('hide');
        $('#divStep3').addClass('hide');
        $('#divStep4').addClass('hide');      

        $("#btnBack").attr('disabled', 'disabled');
        $("#btnNext").removeAttr('disabled');
    }
    else if (CurrentStepIndex == 2) {
        $('#liStep1').addClass('completed');
        $('#liStep2').addClass('completed');
        $('#liStep3').removeClass('completed');
        $('#liStep4').removeClass('completed');       

        $('#divStep1').addClass('hide');
        $('#divStep2').removeClass('hide');
        $('#divStep3').addClass('hide');
        $('#divStep4').addClass('hide');       

        $("#btnBack").removeAttr('disabled');
        $("#btnNext").removeAttr('disabled');
    }
    else if (CurrentStepIndex == 3) {
        $('#liStep1').addClass('completed');
        $('#liStep2').addClass('completed');
        $('#liStep3').addClass('completed');
        $('#liStep4').removeClass('completed');       

        $('#divStep1').addClass('hide');
        $('#divStep2').addClass('hide');
        $('#divStep3').removeClass('hide');
        $('#divStep4').addClass('hide');       

        $("#btnBack").removeAttr('disabled');
        $("#btnNext").removeAttr('disabled');
    }   
    else if (CurrentStepIndex == 4) {
        $('#liStep1').addClass('completed');
        $('#liStep2').addClass('completed');
        $('#liStep3').addClass('completed');
        $('#liStep4').addClass('completed');       

        $('#divStep1').addClass('hide');
        $('#divStep2').addClass('hide');
        $('#divStep3').addClass('hide');
        $('#divStep4').removeClass('hide');      

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