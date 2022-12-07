app.page("DeductionConstantSetup", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnDeductionConstantSetupId').val(params);
            $('.page-head').html("Edit Deduction Constant Setup");
            DisplayData();
            FillDeductionConstantASetup();
            FillDeductionConstantBSetup();
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

var html = '';
html += '<tr class="footable-odd">';
html += '<td>Personal Exemptions</td>';
for (var i = 0; i < PayScheduleRecurrences.length; i++) {   
    html += '<td>' + _.escape(PayScheduleRecurrences[i].PayScheduleRecurrenceName) + '($)</td>';  
}
html += '</tr>';
$('#tblA thead').html(html);

html = '<tr class="footable-odd">';
html += '<td>Dependent Exemptions</td>';
for (var i = 0; i < PayScheduleRecurrences.length; i++) {
    html += '<td>' + _.escape(PayScheduleRecurrences[i].PayScheduleRecurrenceName) + '($)</td>';
}
html += '</tr>';
$('#tblB thead').html(html);
html = '';
for (var i = 1; i <= 6; i++)
{
    html += '<tr>';
    html += '<td>' + i + '</td>';
    for (var j = 0; j < PayScheduleRecurrences.length; j++) {
        html += '<td><input id="A_' + i + '_' + PayScheduleRecurrences[j].PayScheduleRecurrenceId + '" class="form-control decimal text-right a" style="width:85px;" value="0.00"></input></td>';
    }
    html += '</tr>';
}
$('#bodyA').html(html);
html = '';
for (var i = 1; i <= 5; i++) {
    html += '<tr>';
    html += '<td>' + i + '</td>';
    for (var j = 0; j < PayScheduleRecurrences.length; j++) {
        html += '<td><input id="B_' + i + '_' + PayScheduleRecurrences[j].PayScheduleRecurrenceId + '" class="form-control decimal text-right b" style="width:85px;" value="0.00"></input></td>';
    }
    html += '</tr>';
}
$('#bodyB').html(html);

function DisplayData() {   
    var params = { DeductionConstantSetupId: parseInt($('#hdnDeductionConstantSetupId').val(), 10) };
    CallService('Admin/DeductionConstantSetupService.svc', 'GetObject', params, OnDeductionConstantSetupGetObjectSuccess, true);    
}
function OnDeductionConstantSetupGetObjectSuccess(dtoDeductionConstantSetup) {
    if (dtoDeductionConstantSetup.DeductionConstantSetupId != undefined) {
        $('#cmbStateName').val(dtoDeductionConstantSetup.StateId);
        $('#txtEffectiveDate').val(FormatDateUTC(dtoDeductionConstantSetup.EffectiveDate));
    }
    else {
        window.location = "/Admin/Main.html#ViewAllDeductionConstantSetups";
    }    
}

function FillDeductionConstantASetup() {
    var params = { DeductionConstantSetupId: parseInt($('#hdnDeductionConstantSetupId').val(), 10) };
    CallService('Admin/DeductionConstantSetupService.svc', 'GetDeductionConstantASetup', params, OnGetDeductionConstantASetupSuccess, true);
}

function OnGetDeductionConstantASetupSuccess(response) {
    for (var i = 1; i <= 6; i++) {
        for (var j = 0; j < PayScheduleRecurrences.length; j++)
        {       
            for (var k = 0; k < response.length; k++)
            {
                if ((PayScheduleRecurrences[j].PayScheduleRecurrenceId == response[k].PayScheduleRecurrenceId) && (i == response[k].PersonalExemptions))
                {
                    $('#A_' + i + '_' + PayScheduleRecurrences[j].PayScheduleRecurrenceId).val(response[k].Amount.toFixed(2));
                }
            }
        }
    }
}

function FillDeductionConstantBSetup() {
    var params = { DeductionConstantSetupId: parseInt($('#hdnDeductionConstantSetupId').val(), 10) };
    CallService('Admin/DeductionConstantSetupService.svc', 'GetDeductionConstantBSetup', params, OnGetDeductionConstantBSetupSuccess, true);
}

function OnGetDeductionConstantBSetupSuccess(response) {
    for (var i = 1; i <= 5; i++) {
        for (var j = 0; j < PayScheduleRecurrences.length; j++) {        
            for (var k = 0; k < response.length; k++) {
                if ((PayScheduleRecurrences[j].PayScheduleRecurrenceId === response[k].PayScheduleRecurrenceId) && (i === response[k].DependentExemptions)) {
                    $('#B_' + i + '_' + PayScheduleRecurrences[j].PayScheduleRecurrenceId).val(response[k].Amount.toFixed(2));
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
        var DeductionConstantsA = '';
        $('.a').each(function (index, data) {
            var arrA = $(this).attr('id').split('_');
            DeductionConstantsA += arrA[1] + String.fromCharCode(134) + arrA[2] + String.fromCharCode(134) + $(this).val();
            if (index < $('.a').length - 1)
            {
                DeductionConstantsA += String.fromCharCode(135);
            }
        });
        var DeductionConstantsB = '';
        $('.b').each(function (index, data) {
            var arrB = $(this).attr('id').split('_');
            DeductionConstantsB += arrB[1] + String.fromCharCode(134) + arrB[2] + String.fromCharCode(134) + $(this).val();
            if (index < $('.b').length - 1) {
                DeductionConstantsB += String.fromCharCode(135);
            }
        });       
        var params = { DeductionConstantSetupId: parseInt($("#hdnDeductionConstantSetupId").val(), 10), StateId: parseInt($("#cmbStateName").val(), 10), EffectiveDate: $("#txtEffectiveDate").val(), DeductionConstantsA: DeductionConstantsA, DeductionConstantsB: DeductionConstantsB};
        CallService('Admin/DeductionConstantSetupService.svc', 'Save', params, OnDeductionConstantSetupSaveSuccess, false);
    }
};

function OnDeductionConstantSetupSaveSuccess(DeductionConstantSetupId) {
    if (DeductionConstantSetupId > 0) {
        window.location = "/Admin/Main.html#ViewAllDeductionConstantSetups";
    }
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllDeductionConstantSetups";
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
       
        $('#divStep1').removeClass('hide');
        $('#divStep2').addClass('hide');
        $('#divStep3').addClass('hide');        

        $("#btnBack").attr('disabled', 'disabled');
        $("#btnNext").removeAttr('disabled');
    }
    else if (CurrentStepIndex == 2) {
        $('#liStep1').addClass('completed');
        $('#liStep2').addClass('completed');
        $('#liStep3').removeClass('completed');              

        $('#divStep1').addClass('hide');
        $('#divStep2').removeClass('hide');
        $('#divStep3').addClass('hide');               

        $("#btnBack").removeAttr('disabled');
        $("#btnNext").removeAttr('disabled');
    }    
    else if (CurrentStepIndex == 3) {
        $('#liStep1').addClass('completed');
        $('#liStep2').addClass('completed');
        $('#liStep3').addClass('completed');             

        $('#divStep1').addClass('hide');
        $('#divStep2').addClass('hide');
        $('#divStep3').removeClass('hide');           

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