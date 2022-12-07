app.page("State", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnStateId').val(params);
            $('.page-head').html("Edit State");
            DisplayData();
        }        
    }
});
function DisplayData() {    
    var params = { StateId: parseInt($('#hdnStateId').val(), 10) };
    CallService('Admin/StateService.svc', 'GetObject', params, OnStateGetObjectSuccess, true);
}
function OnStateGetObjectSuccess(dtoState) {
    if (dtoState.StateId != undefined) {
        $('#txtStateCode').val(dtoState.StateCode);
        $('#txtStateName').val(dtoState.StateName);
    }
    else {
        window.location = "/Admin/Main.html#ViewAllStates";
    }   
}
$("#txtStateCode").focus();
$.validator.addMethod(
    "AlreadyExists1", 
        function (value, element) {
        var params = { StateId: parseInt($("#hdnStateId").val(), 10), StateCode: value };
        var response = CallService1('Admin/StateService.svc', 'Exists1', params);
        return !response;
    },
        "State Code already exists"
);
$.validator.addMethod(
    "AlreadyExists", 
        function (value, element) {
        var params = { StateId: parseInt($("#hdnStateId").val(), 10), StateName: value };
        var response = CallService1('Admin/StateService.svc', 'Exists', params);
        return !response;
    },
        "State Name already exists"
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
        txtStateCode: {
            required: true,
            AlreadyExists1: true
        },
        txtStateName: {
            required: true,
            AlreadyExists: true
        }
    },
    messages: {
        txtStateCode: {
            required: 'State Code is required'
        },
        txtStateName: {
            required: 'State Name is required'
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
        var params = { StateId: parseInt($("#hdnStateId").val(), 10), StateCode: $("#txtStateCode").val(), StateName: $("#txtStateName").val() };
        CallService('Admin/StateService.svc', 'Save', params, OnStateSaveSuccess, false);
    }
};

function OnStateSaveSuccess(StateId) {
    if (StateId > 0) {
        window.location = "/Admin/Main.html#ViewAllStates";
    }
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllStates";
}
