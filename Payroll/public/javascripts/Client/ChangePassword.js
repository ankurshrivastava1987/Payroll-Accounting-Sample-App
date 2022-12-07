CheckPageRequest();
$("#txtPassword").focus();
$.validator.addMethod(
    "ValidatePassword",
    function (value, element) {
        var params = { ClientId: parseInt($.localStorage.get('UserId'), 10), Password: value };
        var response = CallService1('Client/ClientService.svc', 'ValidatePassword', params);
        return response;
    },
    "Old password is wrong"
);
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
        txtPassword: {
            required: true,
            ValidatePassword:true
        },
        txtNewPassword: {
            required: true            
        },
        txtConfirmPassword: {
            required: true,
            PasswordNoMatch: true
        }
    },
    messages: {
        txtPassword: {
            required: 'Old Password is required'
        },
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
function Save()
{
    if (form.valid())
    {
        var params = { ClientId: parseInt($.localStorage.get('UserId'), 10) };
        var dtoClient = CallService1('Client/ClientService.svc', 'GetObject1', params);
        params = {
            ClientId: dtoClient.ClientId,
            ClientType: dtoClient.ClientType,
            FullName: dtoClient.FullName,
            Address1: dtoClient.Address1,
            Address2: dtoClient.Address2,            
            CityName: dtoClient.CityName,
            StateId: dtoClient.StateId,
            ZipCode: dtoClient.ZipCode,
            ZipCodeExt: dtoClient.ZipCodeExt,
            IndustryId: dtoClient.IndustryId,
            ContactName: dtoClient.ContactName,
            JobTitleName: dtoClient.JobTitleName,
            WorkPhoneNo: dtoClient.WorkPhoneNo,
            WorkPhoneNoExt: dtoClient.WorkPhoneNoExt,
            CellPhoneNo: dtoClient.CellPhoneNo,
            FaxNo: dtoClient.FaxNo,
            EMailId: dtoClient.EMailId,
            LoginId: dtoClient.LoginId,
            Password: $("#txtNewPassword").val(),
            Status: dtoClient.Status,
            ParentClientId: 0,
            ActivationCode: dtoClient.ActivationCode
        };
        CallService('Client/ClientService.svc', 'Save', params, OnClientSaveSuccess, false);
    }
}
function OnClientSaveSuccess(ClientId) {
    if (ClientId > 0) {
        window.location = "/Client/Main.html#Setup";
    }
}
function Close() {
    window.location = "/Client/Main.html#Setup";
}
