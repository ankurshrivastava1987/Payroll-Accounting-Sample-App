app.page("PayScheduleRecurrence", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnPayScheduleRecurrenceId').val(params);
            $('.page-head').html("Edit Pay Schedule");
            DisplayData();
        }        
    }
});

function DisplayData() {
    var params = { PayScheduleRecurrenceId: parseInt($('#hdnPayScheduleRecurrenceId').val(), 10) };
    CallService('Admin/PayScheduleRecurrenceService.svc', 'GetObject', params, OnPayScheduleRecurrenceGetObjectSuccess, true);
}
function OnPayScheduleRecurrenceGetObjectSuccess(dtoPayScheduleRecurrence) {    
    if (dtoPayScheduleRecurrence.PayScheduleRecurrenceId != undefined) {
        $('#txtPayScheduleRecurrenceCode').val(dtoPayScheduleRecurrence.PayScheduleRecurrenceCode);
        $('#txtPayScheduleRecurrenceName').val(dtoPayScheduleRecurrence.PayScheduleRecurrenceName);
        $('#txtDisplayOrder').val(dtoPayScheduleRecurrence.DisplayOrder);
    }
    else {
        window.location = "/Admin/Main.html#ViewAllPayScheduleRecurrences";
    }
}
DisplayData();

$("#txtPayScheduleRecurrenceCode").focus();
$.validator.addMethod(
    "Required1", 
        function (value, element) {        
        return ($('#txtPayScheduleRecurrenceCode').val().trim()==""? false:true);
    },
        "Pay Schedule Code is required"
);
$.validator.addMethod(
    "AlreadyExists1", 
        function (value, element) {
        var params = { PayScheduleRecurrenceId: parseInt($("#hdnPayScheduleRecurrenceId").val(), 10), PayScheduleRecurrenceCode: value };
        var response = CallService1('Admin/PayScheduleRecurrenceService.svc', 'Exists1', params);
        return !response;
    },
        "Pay Schedule Code already exists"
);
$.validator.addMethod(
    "AlreadyExists", 
        function (value, element) {
        var params = { PayScheduleRecurrenceId: parseInt($("#hdnPayScheduleRecurrenceId").val(), 10), PayScheduleRecurrenceName: value };
        var response = CallService1('Admin/PayScheduleRecurrenceService.svc', 'Exists', params);
        return !response;
    },
        "Pay Schedule already exists"
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
        txtPayScheduleRecurrenceCode: {
            Required1: true,
            AlreadyExists1: true
        },
        txtPayScheduleRecurrenceName: {
            required: true,
            AlreadyExists: true
        }
    },
    messages: {  
        txtPayScheduleRecurrenceName: {
            required: 'Pay Schedule is required'
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
        var params = { PayScheduleRecurrenceId: parseInt($("#hdnPayScheduleRecurrenceId").val(), 10), PayScheduleRecurrenceCode: $("#txtPayScheduleRecurrenceCode").val(), PayScheduleRecurrenceName: $("#txtPayScheduleRecurrenceName").val(), DisplayOrder: parseInt($("#txtDisplayOrder").val(), 10) };
        CallService('Admin/PayScheduleRecurrenceService.svc', 'Save', params, OnPayScheduleRecurrenceSaveSuccess, false);
    }
};

function OnPayScheduleRecurrenceSaveSuccess(PayScheduleRecurrenceId) {
    if (PayScheduleRecurrenceId > 0) {
        window.location = "/Admin/Main.html#ViewAllPayScheduleRecurrences";
    }
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllPayScheduleRecurrences";
}
