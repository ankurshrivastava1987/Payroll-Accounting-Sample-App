$("#txtLoginId").focus();
$.validator.addMethod(
    "CheckBlank",
    function (value, element) {
        return !(($('#txtLoginId').val().trim() == '') && ($('#txtEMailId').val().trim() == ''));
    },
    "Please enter Username or E-Mail"
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
        txtEMailId: {  
            email: true,          
            CheckBlank: true
        }
    }, 
    messages: {
        txtEMailId: {
            email: 'Incorrect E-Mail format'
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
        var params = { LoginId: $("#txtLoginId").val(), EMailId: $("#txtEMailId").val() };
        CallService('Public/ClientService.svc', 'ForgotPassword', params, OnClientForgotPasswordSuccess, false);
    }
};
function OnClientForgotPasswordSuccess(response) {
    if (response > 0) {
        window.location = '/';
    }
}

