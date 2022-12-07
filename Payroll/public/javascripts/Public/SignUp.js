$("#txtFullName").focus();
$('.phoneno').mask('(000) 000-0000', {
    placeholder: "(000) 000-0000"
});
$.validator.addMethod(
    "InvalidWorkPhoneNo",
    function (value, element) {
        if ($('#txtWorkPhoneNo').val().trim() != '') {
            return ($('#txtWorkPhoneNo').val().trim().length < 14 ? false : true);
        }
        return true;
    },
    "Invalid Work Phone #"
);
$.validator.addMethod(
    "InvalidCellPhoneNo",
    function (value, element) {
        if ($('#txtCellPhoneNo').val().trim() != '') {
            return ($('#txtCellPhoneNo').val().trim().length < 14 ? false : true);
        }
        return true;
    },
    "Invalid Cell Phone #"
);
$.validator.addMethod(
    "AlreadyExists",
    function (value, element) {
        var params = { ClientId: 0, LoginId: value };
        var response = CallService1('Public/ClientService.svc', 'Exists', params);
        return !response;
    },
    "Username already exists"
);
$.validator.addMethod(
    "AlreadyExists1",
    function (value, element) {
        var params = { ClientId: 0, EMailId: value };
        var response = CallService1('Public/ClientService.svc', 'Exists1', params);
        return !response;
    },
    "E-Mail already exists"
);
$.validator.addMethod(
    "PasswordNoMatch",
    function (value, element) {
        return !($('#txtPassword').val() != value);
    },
    "Password does not match"
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
        txtFullName: {
            required: true
        },
        txtWorkPhoneNo: {
            InvalidWorkPhoneNo: true
        },
        txtCellPhoneNo: {
            InvalidCellPhoneNo: true
        },
        txtEMailId: {
            required: true,
            email: true,
            AlreadyExists1: true
        },
        txtLoginId: {
            required: true,
            AlreadyExists: true
        },
        txtPassword: {
            required: true
        },
        txtConfirmPassword: {
            required: true,
            PasswordNoMatch: true
        }
    },
    messages: {
        txtFullName: {
            required: 'Full Name is required'
        },
        txtEMailId: {
            required: 'E-Mail is required',
            email: 'Incorrect E-Mail format'
        },
        txtLoginId: {
            required: 'Username is required'
        },
        txtPassword: {
            required: 'Password is required'
        },
        txtConfirmPassword: {
            required: 'Confirm Password is required'
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
function FillStates() {
    var params = {};
    CallService('Public/StateService.svc', 'GetLookup', params, OnStateGetLookupSuccess, false);
}

function OnStateGetLookupSuccess(states) {
    var html = '<option value="0"></option>';
    if (states != undefined) {
        for (var i = 0; i < states.length; i++) {
            html += '<option value="' + _.escape(states[i]['StateId']) + '">' + _.escape(states[i]['StateName']) + '</option>';
        }
    }
    $('#cmbStateName').append(html);
    $('#cmbStateName').val("0");
}
FillStates();
function FillIndustries() {
    var params = {};
    CallService('Public/IndustryService.svc', 'GetLookup', params, OnIndustryGetLookupSuccess, false);
}

function OnIndustryGetLookupSuccess(industries) {
    var html = '<option value="0"></option>';
    if (industries != undefined) {
        for (var i = 0; i < industries.length; i++) {
            html += '<option value="' + _.escape(industries[i]['IndustryId']) + '">' + _.escape(industries[i]['IndustryName']) + '</option>';
        }
    }
    $('#cmbIndustryName').append(html);
    $('#cmbIndustryName').val("0");
}
FillIndustries();
if (($('#txtPlanId').val() == 1) && ($('#txtPlanType').val().toLowerCase() == 'monthly'))
{   
    $('#txtAmount').val('25.00');
}
else if (($('#txtPlanId').val() == 1) && ($('#txtPlanType').val().toLowerCase() == 'yearly'))
{
    $('#txtAmount').val('250.00');
}
else if (($('#txtPlanId').val() == 2) && ($('#txtPlanType').val().toLowerCase() == 'monthly'))
{
    $('#txtAmount').val('39.00');
}
else if (($('#txtPlanId').val() == 2) && ($('#txtPlanType').val().toLowerCase() == 'yearly'))
{
    $('#txtAmount').val('390.00');
}
else if (($('#txtPlanId').val() == 3) && ($('#txtPlanType').val().toLowerCase() == 'monthly'))
{
    $('#txtAmount').val('99.00');
}
form.on('submit', function (e) {
    if (grecaptcha.getResponse() == "") {
        e.preventDefault();
        $('#spanRequiredCaptcha').removeClass('hide');
    }
    else
    {
        $('#spanRequiredCaptcha').addClass('hide');
    }
});