app.page("User", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnUserId').val(params);
            $('.page-head').html("Edit User"); 
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
        var params = { UserId: parseInt($("#hdnUserId").val(), 10), LoginId: value };
        var response = CallService1('Admin/UserService.svc', 'Exists', params);     
             
        return !response;
    },
        "Username already exists"
);
$.validator.addMethod(
    "AlreadyExists1", 
        function (value, element) {
        var params = { UserId: parseInt($("#hdnUserId").val(), 10), EMailId: value };
        var response = CallService1('Admin/UserService.svc', 'Exists1', params);
        
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
if (parseInt($('#hdnUserId').val(), 10) == 0) {
    $("#trUserCode").hide();
}
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

function DisplayData() {  
    var params = { UserId: parseInt($('#hdnUserId').val(), 10) };
    CallService('Admin/UserService.svc', 'GetObject', params, OnUserGetObjectSuccess, true);
}
function OnUserGetObjectSuccess(dtoUser) {
    if (dtoUser.UserId != undefined) {
        $('#txtUserCode').val(dtoUser.UserCode);
        $('#txtFullName').val(dtoUser.FullName);
        $('#txtAddress1').val(dtoUser.Address1);
        $('#txtAddress2').val(dtoUser.Address2);        
        $('#txtCityName').val(dtoUser.CityName);
        $('#cmbStateName').val(dtoUser.StateId);
        $('#txtZipCode').val(dtoUser.ZipCode);
        $('#txtZipCodeExt').val(dtoUser.ZipCodeExt);
        $('#txtJobTitleName').val(dtoUser.JobTitleName);
        $('#txtWorkPhoneNo').val(dtoUser.WorkPhoneNo);
        $('#txtWorkPhoneNoExt').val(dtoUser.WorkPhoneNoExt);
        $('#txtCellPhoneNo').val(dtoUser.CellPhoneNo);
        $('#txtEMailId').val(dtoUser.EMailId);
        $('#txtLoginId').val(dtoUser.LoginId);
        $('#txtPassword').val(dtoUser.Password);
        $('#cmbStatus').val(dtoUser.Status);
    }    
}

function Save() {
    if (form.valid()) {
        var params = { UserId: parseInt($("#hdnUserId").val(), 10), FullName: $("#txtFullName").val(), Address1: $("#txtAddress1").val(), Address2: $("#txtAddress2").val(), CityName: $("#txtCityName").val(), StateId: $("#cmbStateName").val(), ZipCode: $("#txtZipCode").val(), ZipCodeExt: $("#txtZipCodeExt").val(), JobTitleName: $("#txtJobTitleName").val(), WorkPhoneNo: $("#txtWorkPhoneNo").val(), WorkPhoneNoExt: $("#txtWorkPhoneNoExt").val(), CellPhoneNo: $("#txtCellPhoneNo").val(), EMailId: $("#txtEMailId").val(), LoginId: $("#txtLoginId").val(), Password: $("#txtPassword").val(), Status: $("#cmbStatus").val() };
        CallService('Admin/UserService.svc', 'Save', params, OnUserSaveSuccess, false); 
    }
};

function OnUserSaveSuccess(UserId) {    
    if (UserId > 0) {
        window.location = "/Admin/Main.html#ViewAllUsers";
    }
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllUsers";
}
