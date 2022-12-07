app.page("Client", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnClientId').val(params);
            $('.page-head').html("Edit Client");
            DisplayData();
        }      
    }
});
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
        var params = { ClientId: parseInt($("#hdnClientId").val(), 10), LoginId: value };
        var response = CallService1('Admin/ClientService.svc', 'Exists', params);
        
        return !response;
    },
        "Username already exists"
);
$.validator.addMethod(
    "AlreadyExists1", 
        function (value, element) {
        var params = { ClientId: parseInt($("#hdnClientId").val(), 10), EMailId: value };
        var response = CallService1('Admin/ClientService.svc', 'Exists1', params);
        
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
        },        
        txtLoginId: {
            required: true,
            AlreadyExists: true
        },
        txtPassword: {
            required: true
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
function FillIndustries() {
    var params = {};
    CallService('Admin/IndustryService.svc', 'GetLookup', params, OnIndustryGetLookupSuccess, false);
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
    var params = { ParentClientId:0, ClientId: parseInt($('#hdnClientId').val(), 10) };
    CallService('Admin/ClientService.svc', 'GetObject', params, OnClientGetObjectSuccess, true);
}
function OnClientGetObjectSuccess(dtoClient) {
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
        $('#txtLoginId').val(dtoClient.LoginId);
        $('#txtPassword').val(dtoClient.Password);
        $('#cmbStatus').val(dtoClient.Status);
    }
    else
    {
        window.location = "/Admin/Main.html#ViewAllClients";
    }    
}
function Save() {
    if (form.valid())
    {
        var params = { ClientId: parseInt($("#hdnClientId").val(), 10) };
        var dtoClient = CallService1('Client/ClientService.svc', 'GetObject', params);
        params = {
            ClientId: parseInt($("#hdnClientId").val(), 10),
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
            LoginId: $("#txtLoginId").val(),
            Password: $("#txtPassword").val(),
            Status: $("#cmbStatus").val(),
            ParentClientId: 0,
            ActivationCode: dtoClient.ActivationCode
        };
        CallService('Admin/ClientService.svc', 'Save', params, OnClientSaveSuccess, false);
    }
};

function OnClientSaveSuccess(ClientId) {
    if (ClientId > 0) {
        window.location = "/Admin/Main.html#ViewAllClients";
    }
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllClients";
}
