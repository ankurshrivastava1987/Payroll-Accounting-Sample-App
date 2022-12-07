CheckPageRequest();
app.page("Client", function () {
    return function (params) {        
        if (parseInt(params, 10) > 0)
        {            
            $('#hdnClientId').val(params);
            $('.page-head').html("Edit Client");
            var params = {ClientId: parseInt(params, 10) };
            var dtoClient = CallService1('Client/ClientService.svc', 'GetObject', params);
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
                $("#cmbEmployeeRange").val(dtoClient.EmployeeRange);
                $("#cmbServiceType").val(dtoClient.ServiceType);
                if (dtoClient.ServiceType == 1) {
                    $('#optWholesale').attr('checked', 'checked');
                }
                else {
                    $('#optRetail').attr('checked', 'checked');
                }
                $("#cmbAccessLevel").val(dtoClient.AccessLevel);
                $("#cmbDirectDeposit").val(dtoClient.DirectDeposit);
                $("#cmbPaidEmployee").val(dtoClient.PaidEmployee);
                $("#cmbPaidVacation").val(dtoClient.PaidVacation);
                $("#cmbMoreThanOneLocation").val(dtoClient.MoreThanOneLocation);
                $("#cmbPayContractor").val(dtoClient.PayContractor);
                
                PayContractorChange();
                if (dtoClient.PayEmployee == 'Y') {
                    $('#optYes').attr('checked', 'checked');
                }
                else
                {
                    $('#optNo').attr('checked', 'checked');
                }
                $('#cmbCompanyType').val(dtoClient.CompanyType);
                $('#txtFilingName').val(dtoClient.FilingName);
                $('#txtFilingAddress1').val(dtoClient.FilingAddress1);
                $('#txtFilingAddress2').val(dtoClient.FilingAddress2);               
                $('#txtFilingCityName').val(dtoClient.FilingCityName);
                $('#cmbFilingStateName').val(dtoClient.FilingStateId);
                $('#txtFilingZipCode').val(dtoClient.FilingZipCode);
                $('#txtFilingZipCodeExt').val(dtoClient.FilingZipCodeExt);
                $('#txtEIN').val(dtoClient.EIN);
                $('#cmbDepositSchedule').val(dtoClient.DepositSchedule);
            }
            else {
                window.location.href = '/Client/Main.html#ViewAllClients';
            }            
        }       
    }
}); 
$("#txtFullName").focus();
$('.phoneno').mask('(000) 000-0000', {
    placeholder: "(000) 000-0000"
});
$('#txtEIN').mask('00-0000000', {
    placeholder: "00-0000000"
});
$.validator.setDefaults({
    ignore: [],
    // any other default options and/or rules
});
$.validator.addMethod(
    "InvalidEIN",
    function (value, element) {
        if ($('#txtEIN').val().trim() != '') {
            return ($('#txtEIN').val().trim().length < 10 ? false : true);
        }
        return true;
    },
    "Invalid EIN"
);
$.validator.addMethod(
    "InvalidWorkPhoneNo",
    function (value, element) {       
        if ($('#txtWorkPhoneNo').val().trim() != '')
        {
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
        var response = CallService1('Client/ClientService.svc', 'Exists', params);
        
        return !response;
    },
        "Username already exists"
);
$.validator.addMethod(
    "AlreadyExists1", 
        function (value, element) {
        var params = { ClientId: parseInt($("#hdnClientId").val(), 10), EMailId: value};
        var response = CallService1('Client/ClientService.svc', 'Exists1', params);
        
        return !response;
    },
        "E-Mail already exists"
);
$.validator.addMethod(
    "Required1",
    function (value, element) {

        return ($('#cmbStateName').val() == '0' ? false : true);
    },
    "State is required"
);
$.validator.addMethod(
    "Required2",
    function (value, element) {

        return ($('#cmbEmployeeRange').val() == '0' ? false : true);
    },
    "Number of employees is required"
);
$.validator.addMethod(
    "Required3",
    function (value, element) {

        return ($('#cmbServiceType').val() == '0' ? false : true);
    },
    "Service Type is required"
);
$.validator.addMethod(
    "Required4",
    function (value, element) {

        return ($('#cmbAccessLevel').val() == '0' ? false : true);
    },
    "Access Level is required"
);
$.validator.addMethod(
    "Required5",
    function (value, element) {

        return ($('#cmbDirectDeposit').val() == '' ? false : true);
    },
    "This field is required"
);
$.validator.addMethod(
    "Required6",
    function (value, element) {

        return ($('#cmbPaidEmployee').val() == '' ? false : true);
    },
    "This field is required"
);
$.validator.addMethod(
    "Required7",
    function (value, element) {

        return ($('#cmbPaidVacation').val() == '' ? false : true);
    },
    "This field is required"
);
$.validator.addMethod(
    "Required8",
    function (value, element) {

        return ($('#cmbMoreThanOneLocation').val() == '' ? false : true);
    },
    "This field is required"
);
$.validator.addMethod(
    "Required9",
    function (value, element) {

        return ($('#cmbPayContractor').val() == '' ? false : true);
    },
    "This field is required"
);
$.validator.addMethod(
    "Required10",
    function (value, element) {

        return ($('#cmbFilingStateName').val() == '0' ? false : true);
    },
    "Filing State is required"
);
$.validator.addMethod(
    "Required11",
    function (value, element) {

        return ($('#cmbCompanyType').val() == '0' ? false : true);
    },
    "Company Type is required"
);
$.validator.addMethod(
    "Required12",
    function (value, element) {

        return ($('#cmbDepositSchedule').val() == '0' ? false : true);
    },
    "Deposit Schedule is required"
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
        txtAddress1: {
            required: true
        },
        txtWorkPhoneNo: { 
            required:true,          
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
            AlreadyExists: true
        },        
        cmbStateName: {
            Required1: true
        },
        cmbEmployeeRange: {
            Required2: true
        },
        cmbServiceType: {
            Required3: true
        },
        cmbAccessLevel: {
            Required4: true
        },
        cmbDirectDeposit: {
            Required5: true
        },
        cmbPaidEmployee: {
            Required6: true
        },
        cmbPaidVacation: {
            Required7: true
        },
        cmbMoreThanOneLocation: {
            Required8: true
        },
        cmbPayContractor: {
            Required9: true
        }       
    },
    messages: {
        txtFullName: {
            required: 'Full Name is required'
        },
        txtAddress1: {
            required: 'Address is required'
        },
        txtWorkPhoneNo: {
            required: 'Work Phone # is required'
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

var form1 = $("#frmEntry1");
var valid1 = form1.validate({

    /* @validation states + elements
         ------------------------------------------- */

    errorClass: 'error-view',
    validClass: 'success-view',
    errorElement: 'span',

    /* @validation rules
         ------------------------------------------ */
    rules: {        
        cmbEmployeeRange: {
            Required2: true
        },
        cmbServiceType: {
            Required3: true
        },
        cmbAccessLevel: {
            Required4: true
        }
    },
    messages: {
        
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

var form2 = $("#frmEntry2");
var valid2 = form2.validate({

    /* @validation states + elements
         ------------------------------------------- */

    errorClass: 'error-view',
    validClass: 'success-view',
    errorElement: 'span',

    /* @validation rules
         ------------------------------------------ */
    rules: {       
        cmbDirectDeposit: {
            Required5: true
        },
        cmbPaidEmployee: {
            Required6: true
        },
        cmbPaidVacation: {
            Required7: true
        },
        cmbMoreThanOneLocation: {
            Required8: true
        },
        cmbPayContractor: {
            Required9: true
        }
    },
    messages: {
       
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

var form3 = $("#frmEntry3");
var valid3 = form3.validate({

    /* @validation states + elements
         ------------------------------------------- */

    errorClass: 'error-view',
    validClass: 'success-view',
    errorElement: 'span',

    /* @validation rules
         ------------------------------------------ */
    rules: {
        cmbCompanyType: {
            Required11: true
        },
        txtFilingName: {
            required: true
        },
        txtFilingAddress1: {
            required: true
        },
        txtFilingCityName: {
            required: true
        },
        txtFilingZipCode: {
            required: true
        },        
        cmbFilingStateName: {
            Required10: true
        }        
    },
    messages: {
        txtFilingName: {
            required: 'Filing Name is required'
        },
        txtFilingAddress1: {
            required: 'Filing Address is required'
        },
        txtFilingCityName: {
            required: 'Filing City is required'
        },
        txtFilingZipCode: {
            required: 'Filing Zip Code is required'            
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

var form4 = $("#frmEntry4");
var valid4 = form4.validate({

    /* @validation states + elements
         ------------------------------------------- */

    errorClass: 'error-view',
    validClass: 'success-view',
    errorElement: 'span',

    /* @validation rules
         ------------------------------------------ */
    rules: {
        cmbDepositSchedule: {
            Required12: true
        },
        txtEIN: {
            InvalidEIN: true
        }
    },
    messages: {
       
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
    $('#cmbFilingStateName').append(html);
    $('#cmbFilingStateName').val("0");
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

function Save() {
    if (form.valid()) {
        if (form1.valid()) {
            if (form2.valid()) {
                if (form3.valid()) {
                    if (form3.valid()) {
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
                            ActivationCode: dtoClient.ActivationCode,
                            StripeId: dtoClient.StripeId,
                            EmployeeRange: $("#cmbEmployeeRange").val(),
                            ServiceType: ($("#optWholesale").is(':checked') ? 1 : 2),
                            AccessLevel: $("#cmbAccessLevel").val(),
                            DirectDeposit: $("#cmbDirectDeposit").val(),
                            PaidEmployee: $("#cmbPaidEmployee").val(),
                            PaidVacation: $("#cmbPaidVacation").val(),
                            MoreThanOneLocation: $("#cmbMoreThanOneLocation").val(),
                            PayContractor: $("#cmbPayContractor").val(),
                            PayEmployee: ($("#optYes").is(':checked') ? 'Y' : 'N'),
                            CompanyType: parseInt($("#cmbCompanyType").val(), 10),
                            FilingName: $("#txtFilingName").val(),
                            FilingAddress1: $("#txtFilingAddress1").val(),
                            FilingAddress2: $("#txtFilingAddress2").val(),                            
                            FilingCityName: $("#txtFilingCityName").val(),
                            FilingStateId: $("#cmbFilingStateName").val(),
                            FilingZipCode: $("#txtFilingZipCode").val(),
                            FilingZipCodeExt: $("#txtFilingZipCodeExt").val(),
                            EIN: $("#txtEIN").val(),
                            DepositSchedule: $("#cmbDepositSchedule").val(),
                        };
                        CallService('Client/ClientService.svc', 'Save', params, OnClientSaveSuccess, false);
                    }
                    else
                    {
                        StepClick(5);
                    }
                }
                else
                {
                    StepClick(4);
                }
            }
            else
            {
                StepClick(3);
            }
        }
        else
        {
            StepClick(2);
        }
    }
    else
    {
        StepClick(1);
    }
};

function OnClientSaveSuccess(ClientId) {
    if (ClientId > 0) {
        window.location = "/Client/Main.html#ViewAllClients";
    }
}

function Close() {
    window.location = "/Client/Main.html#ViewAllClients";
}
var CurrentStepIndex = 1;
function StepClick(index) {
    CurrentStepIndex = index;
    CommandManager();
}
function CommandManager() {
    if (CurrentStepIndex == 1) {
        $('#liStep1').addClass('completed');
        $('#liStep2').removeClass('completed');
        $('#liStep3').removeClass('completed');       
        $('#liStep4').removeClass('completed'); 
        $('#liStep5').removeClass('completed'); 

        $('#divStep1').removeClass('hide');
        $('#divStep2').addClass('hide');
        $('#divStep3').addClass('hide');
        $('#divStep4').addClass('hide');
        $('#divStep5').addClass('hide');

        $("#btnBack").attr('disabled', 'disabled');
        $("#btnNext").removeAttr('disabled');
    }
    else if (CurrentStepIndex == 2) {
        $('#liStep1').addClass('completed');
        $('#liStep2').addClass('completed');
        $('#liStep3').removeClass('completed');        
        $('#liStep4').removeClass('completed');  
        $('#liStep5').removeClass('completed'); 

        $('#divStep1').addClass('hide');
        $('#divStep2').removeClass('hide');
        $('#divStep3').addClass('hide');       
        $('#divStep4').addClass('hide');
        $('#divStep5').addClass('hide');

        $("#btnBack").removeAttr('disabled');
        $("#btnNext").removeAttr('disabled');
    }
    else if (CurrentStepIndex == 3) {
        $('#liStep1').addClass('completed');
        $('#liStep2').addClass('completed');
        $('#liStep3').addClass('completed');       
        $('#liStep4').removeClass('completed');
        $('#liStep5').removeClass('completed');

        $('#divStep1').addClass('hide');
        $('#divStep2').addClass('hide');
        $('#divStep3').removeClass('hide');        
        $('#divStep4').addClass('hide'); 
        $('#divStep5').addClass('hide'); 

        $("#btnBack").removeAttr('disabled');
        $("#btnNext").removeAttr('disabled');
    }   
    else if (CurrentStepIndex == 4) {
        $('#liStep1').addClass('completed');
        $('#liStep2').addClass('completed');
        $('#liStep3').addClass('completed');
        $('#liStep4').addClass('completed');
        $('#liStep5').removeClass('completed');

        $('#divStep1').addClass('hide');
        $('#divStep2').addClass('hide');
        $('#divStep3').addClass('hide');
        $('#divStep4').removeClass('hide');
        $('#divStep5').addClass('hide');

        $("#btnBack").removeAttr('disabled');
        $("#btnNext").removeAttr('disabled');
    }   
    else if (CurrentStepIndex == 5) {
        $('#liStep1').addClass('completed');
        $('#liStep2').addClass('completed');
        $('#liStep3').addClass('completed');
        $('#liStep4').addClass('completed');
        $('#liStep5').addClass('completed');

        $('#divStep1').addClass('hide');
        $('#divStep2').addClass('hide');
        $('#divStep3').addClass('hide');
        $('#divStep4').addClass('hide');
        $('#divStep5').removeClass('hide');

        $("#btnBack").removeAttr('disabled');
        $("#btnNext").attr('disabled', 'disabled');
    }   
}
$("#btnBack").click(function (e) {
    CurrentStepIndex = CurrentStepIndex - 1
    CommandManager();
});
$("#btnNext").click(function (e) {
    CurrentStepIndex = CurrentStepIndex + 1
    CommandManager();
});
$("#btnClose").click(function (e) {
    Close();
});
$("#btnSave").click(function (e) {
    Save();
});
$("#chkSame").click(function (e) {
    if ($('#chkSame').is(':checked'))
    {
        $('#txtFilingAddress1').val($('#txtAddress1').val());
        $('#txtFilingAddress2').val($('#txtAddress2').val());        
        $('#txtFilingCityName').val($('#txtCityName').val());
        $('#cmbFilingStateName').val($('#cmbStateName').val());
        $('#txtFilingZipCode').val($('#txtZipCode').val());
        $('#txtFilingZipCodeExt').val($('#txtZipCodeExt').val());
    }
});
function PayContractorChange()
{
    if ($("#cmbPayContractor").val() == 'Y') {
        $('#tblQuestion').removeClass('hide');
    }
    else {
        $('#tblQuestion').addClass('hide');
    }
}
$("#cmbPayContractor").change(function () {
    PayContractorChange();
});
$(document).ready(function () {
    $('[data-toggle="popover"]').popover({
        container: 'body',
        html: true
    });  
    $('body').on('click', function (e) {
        $('[data-toggle="popover"]').each(function () {
            //the 'is' for buttons that trigger popups
            //the 'has' for icons within a button that triggers a popup
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });
});
window.scrollTo(0, 0);