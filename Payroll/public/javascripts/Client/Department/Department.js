CheckPageRequest();
app.page("Department", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnDepartmentId').val(params);
            $('.page-head').html("Edit Department");
            var params = { ClientId: $.localStorage.get('ClientId'), DepartmentId: parseInt($('#hdnDepartmentId').val(), 10) };
            var dtoDepartment = CallService1('Client/DepartmentService.svc', 'GetObject', params);
            if (dtoDepartment.DepartmentId != undefined) {
                $('#txtDepartmentName').val(dtoDepartment.DepartmentName);
            }
            else {
                window.location = "/Client/Main.html#ViewAllDepartments";
            }
        }
    }
});
$("#txtDepartmentName").focus();
$.validator.addMethod(
    "AlreadyExists",
    function (value, element) {
        var params = { ClientId: $.localStorage.get('ClientId'), DepartmentId: parseInt($("#hdnDepartmentId").val(), 10), DepartmentName: value };
        var response = CallService1('Client/DepartmentService.svc', 'Exists', params);

        return !response;
    },
    "Department Name already exists"
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
        txtDepartmentName: {
            required: true,
            AlreadyExists: true
        }        
    },
    messages: {
        txtDepartmentName: {
            required: 'Department Name is required'
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
            DepartmentId: parseInt($("#hdnDepartmentId").val(), 10),
            ClientId: $.localStorage.get('ClientId'),
            DepartmentName: $("#txtDepartmentName").val()
        };
        CallService('Client/DepartmentService.svc', 'Save', params, OnDepartmentSaveSuccess, false);
    }
};

function OnDepartmentSaveSuccess(DepartmentId) {
    if (DepartmentId > 0) {
        window.location = "/Client/Main.html#ViewAllDepartments";
    }
}

function Close() {
    window.location = "/Client/Main.html#ViewAllDepartments";
}
window.scrollTo(0, 0); 