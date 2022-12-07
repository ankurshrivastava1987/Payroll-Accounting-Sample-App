app.page("FilingStatus", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnFilingStatusId').val(params);
            $('.page-head').html("Edit Filing Status");
            DisplayData();
        }       
    }
});

function DisplayData() {    
    var params = { FilingStatusId: parseInt($('#hdnFilingStatusId').val(), 10) };
    CallService('Admin/FilingStatusService.svc', 'GetObject', params, OnFilingStatusGetObjectSuccess, true);
}
function OnFilingStatusGetObjectSuccess(dtoFilingStatus) {
    if (dtoFilingStatus.FilingStatusId != undefined) {
        $('#cmbStateName').val(dtoFilingStatus.StateId);
        $('#txtFilingStatusCode').val(dtoFilingStatus.FilingStatusCode);
        $('#txtFilingStatusName').val(dtoFilingStatus.FilingStatusName);
    }
    else {
        window.location = "/Admin/Main.html#ViewAllFilingStatuses";
    }  
}
if (parseInt($("#hdnFilingStatusId").val(), 10) > 0) {
    DisplayData();
}
$("#cmbStateName").focus();
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
$.validator.addMethod(
    "Required1",
    function (value, element) {

        return ($('#cmbStateName').val() == '0' ? false : true);
    },
    "State is required"
);
$.validator.addMethod(
    "AlreadyExists1", 
        function (value, element) {
            var params = { FilingStatusId: parseInt($("#hdnFilingStatusId").val(), 10), FilingStatusCode: value, StateId: $('#cmbStateName').val() };
        var response = CallService1('Admin/FilingStatusService.svc', 'Exists1', params);
        return !response;
    },
        "Filing Status Code already exists"
);
$.validator.addMethod(
    "AlreadyExists", 
        function (value, element) {
            var params = { FilingStatusId: parseInt($("#hdnFilingStatusId").val(), 10), FilingStatusName: value, StateId: $('#cmbStateName').val() };
        var response = CallService1('Admin/FilingStatusService.svc', 'Exists', params);
        return !response;
    },
        "Filing Status Name already exists"
);
var form = $("#frmEntry");
var valid = form.validate({
    
    /* @validation FilingStatuss + elements
         ------------------------------------------- */

    errorClass: 'error-view',
    validClass: 'success-view',
    errorElement: 'span',
    
    /* @validation rules
         ------------------------------------------ */
        rules: {
        txtFilingStatusCode: {
            required: true,
            AlreadyExists1: true
        },
        txtFilingStatusName: {
            required: true,
            AlreadyExists: true
        },
        cmbStateName: {
            Required1: true
        }
    },
    messages: {
        txtFilingStatusCode: {
            required: 'Filing Status Code is required'
        },
        txtFilingStatusName: {
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
        var params = { FilingStatusId: parseInt($("#hdnFilingStatusId").val(), 10), StateId: $('#cmbStateName').val(), FilingStatusCode: $("#txtFilingStatusCode").val(), FilingStatusName: $("#txtFilingStatusName").val() };
        CallService('Admin/FilingStatusService.svc', 'Save', params, OnFilingStatusSaveSuccess, false);
    }
};

function OnFilingStatusSaveSuccess(FilingStatusId) {
    if (FilingStatusId > 0) {
        window.location = "/Admin/Main.html#ViewAllFilingStatuses";
    }
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllFilingStatuses";
}
