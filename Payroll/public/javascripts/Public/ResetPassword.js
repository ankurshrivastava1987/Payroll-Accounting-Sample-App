$.validator.addMethod(
    "PasswordNoMatch",
    function (value, element) {
        return !($('#txtNewPassword').val() != value);
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
        txtNewPassword: {
            required: true
        },
        txtConfirmPassword: {
            required: true,
            PasswordNoMatch: true
        }
    },
    messages: {       
        txtNewPassword: {
            required: 'New Password is required'
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
function Submit() {
    if (form.valid()) {
        var params = { ActivationCode: GetQueryParameter('Code'), Password: $("#txtNewPassword").val()};
        CallService('Public/ClientService.svc', 'ResetPassword', params, OnClientResetPasswordSuccess, false);
    }
};
function OnClientResetPasswordSuccess(response) {
    if (response > 0) {
        window.location = '/';
    }
}