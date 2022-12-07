app.page("StandardDeduction2", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnStandardDeductionId').val(params);
            $('.page-head').html("Edit Standard Deduction 2");
            DisplayData();
            FillStandardDeduction2Detail();
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
});
function DisplayData() {    
    var params = { StandardDeductionId: parseInt($('#hdnStandardDeductionId').val(), 10) };
    CallService('Admin/StandardDeduction2Service.svc', 'GetObject', params, OnStandardDeduction2GetObjectSuccess, true);    
}
function OnStandardDeduction2GetObjectSuccess(dtoStandardDeduction2) {
    if (dtoStandardDeduction2.StandardDeductionId != undefined) {
        $('#cmbStateName').val(dtoStandardDeduction2.StateId);
        $('#cmbStateName').change();
        $('#txtEffectiveDate').val(FormatDateUTC(dtoStandardDeduction2.EffectiveDate));
        $('#txtNetAmountMultiplyBy').val(dtoStandardDeduction2.NetAmountMultiplyBy.toFixed(5));        
    }
    else {
        window.location = "/Admin/Main.html#ViewAllStandardDeduction2s";
    }    
}

function FillStandardDeduction2Detail() {
    var params = { StandardDeductionId: parseInt($('#hdnStandardDeductionId').val(), 10) };
    CallService('Admin/StandardDeduction2Service.svc', 'GetStandardDeduction2Detail', params, OnGetStandardDeduction2DetailSuccess, true);
}

function OnGetStandardDeduction2DetailSuccess(response) {
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
       
        var params = { StandardDeductionId: parseInt($("#hdnStandardDeductionId").val(), 10), StateId: parseInt($("#cmbStateName").val(), 10), EffectiveDate: $("#txtEffectiveDate").val(), NetAmountMultiplyBy: $("#txtNetAmountMultiplyBy").val(), StandardDeductions: StandardDeductions};
        CallService('Admin/StandardDeduction2Service.svc', 'Save', params, OnStandardDeduction2SaveSuccess, false);
    }
};

function OnStandardDeduction2SaveSuccess(StandardDeductionId) {
    if (StandardDeductionId > 0) {
        window.location = "/Admin/Main.html#ViewAllStandardDeduction2s";
    }
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllStandardDeduction2s";
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
$('.decimal1').keypress(function (event) {
    return isNumber(event, this)
}).bind('blur', function () {
    var num;

    num = parseFloat($(this).val());

    num = isNaN(num) ? '0.00000' : num;
    if (num && num < 0) num = num * -1;
    $(this).val(parseFloat(num).toFixed(5));
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