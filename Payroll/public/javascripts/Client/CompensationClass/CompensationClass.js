CheckPageRequest();
app.page("CompensationClass", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnCompensationClassId').val(params);
            $('.page-head').html("Edit Compensation Class");
            var params = { ClientId: $.localStorage.get('ClientId'), CompensationClassId: parseInt($('#hdnCompensationClassId').val(), 10) };
            var dtoCompensationClass = CallService1('Client/CompensationClassService.svc', 'GetObject', params);
            if (dtoCompensationClass.CompensationClassId != undefined) {
                $('#txtCompensationClassName').val(dtoCompensationClass.CompensationClassName);
            }
            else {
                window.location = "/Client/Main.html#ViewAllCompensationClasses";
            }
        }
    }
});
$("#txtCompensationClassName").focus();
$.validator.addMethod(
    "AlreadyExists",
    function (value, element) {
        var params = { ClientId: $.localStorage.get('ClientId'), CompensationClassId: parseInt($("#hdnCompensationClassId").val(), 10), CompensationClassName: value };
        var response = CallService1('Client/CompensationClassService.svc', 'Exists', params);

        return !response;
    },
    "Compensation Class Name already exists"
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
        txtCompensationClassName: {
            required: true,
            AlreadyExists: true
        }        
    },
    messages: {
        txtCompensationClassName: {
            required: 'Compensation Class Name is required'
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
        var params = {
            CompensationClassId: parseInt($("#hdnCompensationClassId").val(), 10),
            ClientId: $.localStorage.get('ClientId'),
            CompensationClassName: $("#txtCompensationClassName").val()
        };
        CallService('Client/CompensationClassService.svc', 'Save', params, OnCompensationClassSaveSuccess, false);
    }
};

function OnCompensationClassSaveSuccess(CompensationClassId) {
    if (CompensationClassId > 0) {
        window.location = "/Client/Main.html#ViewAllCompensationClasses";
    }
}

function Close() {
    window.location = "/Client/Main.html#ViewAllCompensationClasses";
}
window.scrollTo(0, 0);