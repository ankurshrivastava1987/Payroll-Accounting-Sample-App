app.page("FederalFilingStatus", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnFederalFilingStatusId').val(params);
            $('.page-head').html("Edit Federal Filing Status");
            DisplayData();
        }        
    }
});

function DisplayData() {    
    var params = { FederalFilingStatusId: parseInt($('#hdnFederalFilingStatusId').val(), 10) };
    CallService('Admin/FederalFilingStatusService.svc', 'GetObject', params, OnFederalFilingStatusGetObjectSuccess, true);
}
function OnFederalFilingStatusGetObjectSuccess(dtoFederalFilingStatus) {
    if (dtoFederalFilingStatus.FederalFilingStatusId != undefined) {        
        $('#txtFederalFilingStatusCode').val(dtoFederalFilingStatus.FederalFilingStatusCode);
        $('#txtFederalFilingStatusName').val(dtoFederalFilingStatus.FederalFilingStatusName);
    }
    else {
        window.location = "/Admin/Main.html#ViewAllFederalFilingStatuses";
    }       
}

$("#txtFederalFilingStatusCode").focus();
$.validator.addMethod(
    "AlreadyExists1", 
        function (value, element) {
            var params = { FederalFilingStatusId: parseInt($("#hdnFederalFilingStatusId").val(), 10), FederalFilingStatusCode: value };
        var response = CallService1('Admin/FederalFilingStatusService.svc', 'Exists1', params);
        return !response;
    },
        "Filing Status Code already exists"
);
$.validator.addMethod(
    "AlreadyExists", 
        function (value, element) {
            var params = { FederalFilingStatusId: parseInt($("#hdnFederalFilingStatusId").val(), 10), FederalFilingStatusName: value };
        var response = CallService1('Admin/FederalFilingStatusService.svc', 'Exists', params);
        return !response;
    },
        "Filing Status Name already exists"
);
var form = $("#frmEntry");
var valid = form.validate({
    
    /* @validation FederalFilingStatuss + elements
         ------------------------------------------- */

    errorClass: 'error-view',
    validClass: 'success-view',
    errorElement: 'span',
    
    /* @validation rules
         ------------------------------------------ */
        rules: {
        txtFederalFilingStatusCode: {
            required: true,
            AlreadyExists1: true
        },
        txtFederalFilingStatusName: {
            required: true,
            AlreadyExists: true
        }
    },
    messages: {
        txtFederalFilingStatusCode: {
            required: 'Filing Status Code is required'
        },
        txtFederalFilingStatusName: {
            required: 'Filing Status Name is required'
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
        var params = { FederalFilingStatusId: parseInt($("#hdnFederalFilingStatusId").val(), 10), FederalFilingStatusCode: $("#txtFederalFilingStatusCode").val(), FederalFilingStatusName: $("#txtFederalFilingStatusName").val() };
        CallService('Admin/FederalFilingStatusService.svc', 'Save', params, OnFederalFilingStatusSaveSuccess, false);
    }
};

function OnFederalFilingStatusSaveSuccess(FederalFilingStatusId) {
    if (FederalFilingStatusId > 0) {
        window.location = "/Admin/Main.html#ViewAllFederalFilingStatuses";
    }
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllFederalFilingStatuses";
}
