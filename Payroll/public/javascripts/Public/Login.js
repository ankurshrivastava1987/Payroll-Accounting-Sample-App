$.validator.addMethod(
    "CheckAuth",
    function (value, element) {
        var params = { LoginId: $('#txtLoginId1').val().trim(), Password: $('#txtPassword1').val().trim() };
        $.ajax({
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            url: HostUrl + '/ClientLoginService.svc/LoginMe',
            data: JSON.stringify(params),
            processData: false,
            dataType: 'json',
            async: false,
            success: function (dtoClient) {
                response = (dtoClient.ClientId == undefined);
                if (!response) {
                    $.localStorage.set('UserId', dtoClient.ClientId);
                }
            },
            error: function (a, b, c) {
            }
        });
        return !response;
    },
    "Invalid Username or Password"
);
var form1 = $("#frmEntry1");
var valid = form1.validate({

    /* @validation states + elements
         ------------------------------------------- */

    errorClass: 'error-view',
    validClass: 'success-view',
    errorElement: 'span',

    /* @validation rules
         ------------------------------------------ */
    rules: {
        txtLoginId1: {
            required: true
        },
        txtPassword1: {
            required: true,
            CheckAuth: true
        }
    },
    messages: {
        txtLoginId1: {
            required: 'Username is required'
        },
        txtPassword1: {
            required: 'Password is required'
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
function Login() {
    if (form1.valid()) {
        $.localStorage.set('ClientId', 0);
        return true;
    }
}
$(document).ready(function () {
    $("#btnLogin").click(function (e) {
        if (Login()) {
            window.location.href = '/Client/Client/ViewAllClients';
        }
    });
    $("#btnSignUp").click(function (e) {
        window.location.href = '/Plans';
    });
    $("#btnForgotPassword").click(function (e) {
        window.location.href = '/Forgot-Password';
    });
});