CheckPageRequest();
app.page("PaySchedule", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnPayScheduleId').val(params);
            $('.page-head').html("Edit Pay Schedule");
            var params = { ClientId: $.localStorage.get('ClientId'), PayScheduleId: parseInt($('#hdnPayScheduleId').val(), 10) };
            var dtoPaySchedule = CallService1('Client/PayScheduleService.svc', 'GetObject', params);
            if (dtoPaySchedule.PayScheduleId != undefined) {
                $('#txtPayScheduleName').val(dtoPaySchedule.PayScheduleName);
                $("#txtDaysAfterClose").val(dtoPaySchedule.DaysAfterClose);
                $('#txtPayPeriodEndDate').val((FormatDateUTC(dtoPaySchedule.PayPeriodEndDate) == '01/01/1900' ? '' : FormatDateUTC(dtoPaySchedule.PayPeriodEndDate)));
                $("#cmbPayScheduleRecurrenceName").val(dtoPaySchedule.PayScheduleRecurrenceId);
                $("#cmbPayScheduleRecurrenceName").change();
                if (dtoPaySchedule.DailyEveryWeekDay) {
                    $("#chkDailyEveryWeekDay").attr("checked", "checked");
                }
                $("#cmbStatus").val(dtoPaySchedule.Status);
                if (dtoPaySchedule.Default) {
                    $("#chkDefault").attr("checked", "checked");
                }
            }
            else {
                window.location = "/Client/Main.html#ViewAllPaySchedules";
            }
        }
    }
});
$("#txtPayScheduleName").focus();
$('.input-date-picker').mask('00/00/0000', {
    placeholder: "MM/DD/YYYY"
});
$('.input-date-picker').datepicker({
    format: 'mm/dd/yyyy',
    orientation: 'bottom',
    autoclose: true,
    todayHighlight: true
});
$.validator.addMethod(
    "InvalidPayPeriodEndDate",
    function (value, element) {
        if ($('#txtPayPeriodEndDate').val().trim() != '') {
            return ($('#txtPayPeriodEndDate').val().trim().length < 10 ? false : true);
        }
        return true;
    },
    "Invalid Last Pay Period End Date"
);
$.validator.addMethod(
    "AlreadyExists",
    function (value, element) {
        var params = { ClientId: $.localStorage.get('ClientId'), PayScheduleId: parseInt($("#hdnPayScheduleId").val(), 10), PayScheduleName: value };
        var response = CallService1('Client/PayScheduleService.svc', 'Exists', params);
        return !response;
    },
    "Pay Schedule Name already exists"
);
$.validator.addMethod(
    "Required1",
    function (value, element) {

        return ($('#cmbPayScheduleRecurrenceName').val() == '0' ? false : true);
    },
    "Recurrence is required"
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
        txtPayScheduleName: {
            required: true,
            AlreadyExists: true
        },
        txtPayPeriodEndDate:
        {
            required:true,
            InvalidPayPeriodEndDate:true
        },
        cmbPayScheduleRecurrenceName: {
            Required1: true
        }
    },
    messages: {
        txtPayScheduleName: {
            required: 'Pay Schedule Name is required'
        },
        txtPayPeriodEndDate:
        {
            required:'Last Pay Period End Date is required'             
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
function FillPayScheduleRecurrences() {
    var params = {};
    CallService('Client/PayScheduleRecurrenceService.svc', 'GetLookup', params, OnPayScheduleRecurrenceGetLookupSuccess, false);
}

function OnPayScheduleRecurrenceGetLookupSuccess(PayScheduleRecurrences) {
    var html = '<option value="0"></option>';
    if (PayScheduleRecurrences != undefined) {
        for (var i = 0; i < PayScheduleRecurrences.length; i++) {
            html += '<option value="' + PayScheduleRecurrences[i]['PayScheduleRecurrenceId'] + '">' + PayScheduleRecurrences[i]['PayScheduleRecurrenceName'] + '</option>';
        }
    }
    $('#cmbPayScheduleRecurrenceName').append(html);
    $('#cmbPayScheduleRecurrenceName').val("0");
}
FillPayScheduleRecurrences();
function Save() {
    if (form.valid()) {
        var params = {
            PayScheduleId: parseInt($("#hdnPayScheduleId").val(), 10),
            ClientId: $.localStorage.get('ClientId'),
            PayScheduleName: $("#txtPayScheduleName").val(),
            DaysAfterClose: $("#txtDaysAfterClose").val(),
            PayPeriodEndDate: $("#txtPayPeriodEndDate").val(),
            PayScheduleRecurrenceId: $("#cmbPayScheduleRecurrenceName").val(),
            DailyEveryWeekDay: $("#chkDailyEveryWeekDay").is(':checked'),            
            Status: $("#cmbStatus").val(),
            Default: $("#chkDefault").is(':checked')
        };
        CallService('Client/PayScheduleService.svc', 'Save', params, OnPayScheduleSaveSuccess, false);
    }
};

function OnPayScheduleSaveSuccess(PayScheduleId) {
    if (PayScheduleId > 0) {
        window.location = "/Client/Main.html#ViewAllPaySchedules";
    }
}

function Close() {
    window.location = "/Client/Main.html#ViewAllPaySchedules";
}
$("#cmbPayScheduleRecurrenceName").change(function () {
    $('#trRecur').removeClass('hide');
    var params = { PayScheduleRecurrenceId: parseInt($(this).val(), 10) };
    var dtoPayScheduleRecurrence = CallService1('Client/PayScheduleRecurrenceService.svc', 'GetObject', params);
    if (dtoPayScheduleRecurrence.PayScheduleRecurrenceCode == 'DA') {
        $('#trRecur').removeClass('hide');
    }
    else if (dtoPayScheduleRecurrence.PayScheduleRecurrenceCode == 'WW') {
        $('#trRecur').addClass('hide');       
    }
    else if (dtoPayScheduleRecurrence.PayScheduleRecurrenceCode == 'BW') {
        $('#trRecur').addClass('hide');       
    }
    else if (dtoPayScheduleRecurrence.PayScheduleRecurrenceCode == 'SM') {
        $('#trRecur').addClass('hide');      
    }
    else if (dtoPayScheduleRecurrence.PayScheduleRecurrenceCode == 'MM') {
        $('#trRecur').addClass('hide');        
    }
    else if (dtoPayScheduleRecurrence.PayScheduleRecurrenceCode == 'QQ') {
        $('#trRecur').addClass('hide');
    }
    else if (dtoPayScheduleRecurrence.PayScheduleRecurrenceCode == 'SA') {
        $('#trRecur').addClass('hide');        
    }
    else if (dtoPayScheduleRecurrence.PayScheduleRecurrenceCode == 'AA') {
        $('#trRecur').addClass('hide');
    }
    else {
        $('#trRecur').addClass('hide');
    }
});
window.scrollTo(0, 0); 