CheckPageRequest();
app.page("Leave", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnLeaveId').val(params);
            $('.page-head').html("Edit Leave");
            var params = { LeaveId: parseInt($('#hdnLeaveId').val(), 10) };
            var dtoLeave = CallService1('Client/SetUp/Leave/LeaveService.svc', 'GetObject', params);
            if (dtoLeave.LeaveId != undefined) {
                $('#txtDescription').val(dtoLeave.Description);
                $('#txtHoursEarned').val(dtoLeave.HoursEarnedPerYear);
                $('#txtHoursAvailable').val(dtoLeave.MaxAvailableHours);
                $('#cmbAccrualFrequency').val(dtoLeave.Frequency);
                $('#cmbCategory').val(dtoLeave.Category);
            }
            else {
                window.location = "/Client/Main.html#ViewAllLeaves";
            }
        }
    }
});


//$("#txtLocationName").focus();

//$.validator.addMethod(
//    "AlreadyExists",
//    function (value, element) {
//        var params = { ClientId: $.localStorage.get('ClientId'), LeaveId: parseInt($("#hdnLeaveId").val(), 10), LocationName: value };
//        var response = CallService1('Client/LeaveService.svc', 'Exists', params);

//        return !response;
//    },
//    "Leave Name already exists"
//);

$.validator.addMethod(
    "Required1",
    function (value, element) {

        return ($('#cmbAccrualFrequency').val() == '0' ? false : true);
    },
    "Accrual Frequency is required"
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
        txtDescription: {
            required: true
        },
        txtHoursEarned: {
            required: true
        },
        txtHoursAvailable: {
            required: true
        },
        cmbAccrualFrequency: {
            Required1: true,
        }
    },
    messages: {
        txtDescription: {
            required: 'Description is required'
        },
        txtHoursEarned: {
            required: 'Hours Earned Per Year'
        },
        txtHoursAvailable: {
            required: 'Max Available Hours is required'
        },
        cmbAccrualFrequency: {
            required: 'Accrual Frequency is required'
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
        var params = {
            LeaveId: parseInt($("#hdnLeaveId").val(), 10),
            ClientId: $.localStorage.get('ClientId'),
            Category: $("#cmbCategory").val(),
            Description: $("#txtDescription").val(),
            Frequency: $("#cmbAccrualFrequency").val(),
            HoursEarnedPerYear : $("#txtHoursEarned").val(),
            MaxAvailableHours: $("#txtHoursAvailable").val()
        };
        CallService('Client/SetUp/Leave/LeaveService.svc', 'Save', params, OnLeaveSaveSuccess, false);
    }
};

function OnLeaveSaveSuccess(LeaveId) {
    if (LeaveId > 0) {
        window.location = "/Client/Main.html#ViewAllLeaves";
    }
}

function Close() {
    window.location = "/Client/Main.html#ViewAllLeaves";
}
window.scrollTo(0, 0);