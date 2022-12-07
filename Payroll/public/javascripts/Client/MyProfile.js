CheckPageRequest();
$('#hdnClientId').val($.localStorage.get('UserId'));
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
    "AlreadyExists1",
    function (value, element) {
        var params = { ClientId: parseInt($("#hdnClientId").val(), 10), EMailId: value };
        var response = CallService1('Client/ClientService.svc', 'Exists1', params);

        return !response;
    },
    "E-Mail already exists"
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
        }
    },
    messages: {
        txtFullName: {
            required: 'Full Name is required'
        },
        txtEMailId: {
            required: 'E-Mail is required',
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
function FillStates() {
    var params = {};
    CallService('Public/StateService.svc', 'GetLookup', params, OnStateGetLookupSuccess, false);
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
function FillIndustries() {
    var params = {};
    CallService('Public/IndustryService.svc', 'GetLookup', params, OnIndustryGetLookupSuccess, false);
}

function OnIndustryGetLookupSuccess(industries) {
    var html = '<option value="0"></option>';
    if (industries != undefined) {
        for (var i = 0; i < industries.length; i++) {
            html += '<option value="' + industries[i]['IndustryId'] + '">' + industries[i]['IndustryName'] + '</option>';
        }
    }
    $('#cmbIndustryName').append(html);
    $('#cmbIndustryName').val("0");
}
FillIndustries();

function DisplayData() {    
    var params = {ClientId: parseInt($.localStorage.get('UserId'), 10) };
    var dtoClient = CallService1('Client/ClientService.svc', 'GetObject1', params);
    if (dtoClient.ClientId != undefined) {
        $('#cmbClientType').val(dtoClient.ClientType);
        $('#txtFullName').val(dtoClient.FullName);
        $('#txtAddress1').val(dtoClient.Address1);
        $('#txtAddress2').val(dtoClient.Address2);       
        $('#txtCityName').val(dtoClient.CityName);
        $('#cmbStateName').val(dtoClient.StateId);
        $('#txtZipCode').val(dtoClient.ZipCode);
        $('#txtZipCodeExt').val(dtoClient.ZipCodeExt);
        $('#cmbIndustryName').val(dtoClient.IndustryId);
        $('#txtContactName').val(dtoClient.ContactName);
        $('#txtJobTitleName').val(dtoClient.JobTitleName);
        $('#txtWorkPhoneNo').val(dtoClient.WorkPhoneNo);
        $('#txtWorkPhoneNoExt').val(dtoClient.WorkPhoneNoExt);
        $('#txtCellPhoneNo').val(dtoClient.CellPhoneNo);
        $('#txtFaxNo').val(dtoClient.FaxNo);
        $('#txtEMailId').val(dtoClient.EMailId);
        $('#cmbStatus').val(dtoClient.Status);
    }
}
DisplayData();
function Save() {
    if (form.valid()) {
        var params = { ClientId: parseInt($.localStorage.get('UserId'), 10) };
        var dtoClient = CallService1('Client/ClientService.svc', 'GetObject1', params);        
        params = {
            ClientId: parseInt($.localStorage.get('UserId'), 10),
            ClientType: parseInt($("#cmbClientType").val(), 10),
            FullName: $("#txtFullName").val(),
            Address1: $("#txtAddress1").val(),
            Address2: $("#txtAddress2").val(),            
            CityName: $("#txtCityName").val(),
            StateId: $("#cmbStateName").val(),
            ZipCode: $("#txtZipCode").val(),
            ZipCodeExt: $("#txtZipCodeExt").val(),
            IndustryId: parseInt($("#cmbIndustryName").val(), 10),
            ContactName: $("#txtContactName").val(),
            JobTitleName: $("#txtJobTitleName").val(),
            WorkPhoneNo: $("#txtWorkPhoneNo").val(),
            WorkPhoneNoExt: $("#txtWorkPhoneNoExt").val(),
            CellPhoneNo: $("#txtCellPhoneNo").val(),
            FaxNo: $("#txtFaxNo").val(),
            EMailId: $("#txtEMailId").val(),
            LoginId: dtoClient.LoginId,
            Password: dtoClient.Password,
            Status: $("#cmbStatus").val(),
            ParentClientId: 0,
            ActivationCode: dtoClient.ActivationCode,
            StripeId: dtoClient.StripeId,
            EmployeeRange: dtoClient.EmployeeRange,
            ServiceType: dtoClient.ServiceType,  
            AccessLevel: dtoClient.AccessLevel,           
            DirectDeposit: dtoClient.DirectDeposit,
            PaidEmployee: dtoClient.PaidEmployee,
            PaidVacation: dtoClient.PaidVacation,
            MoreThanOneLocation: dtoClient.MoreThanOneLocation,
            PayContractor: dtoClient.PayContractor           
        };
        CallService('Client/ClientService.svc', 'Save', params, OnClientSaveSuccess, false);
    }
};

function OnClientSaveSuccess(ClientId) {
    if (ClientId > 0) {
        window.location = "/Client/Main.html#Setup";
    }
}

function Close() {
    window.location = "/Client/Main.html#Setup";
}
