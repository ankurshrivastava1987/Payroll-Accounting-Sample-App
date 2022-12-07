CheckPageRequest();
app.page("PayStub", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnPayStubId').val(params);
            $('.page-head').html("Edit Pay Stub");
            var params = { ClientId: $.localStorage.get('ClientId'), PayStubId: parseInt($('#hdnPayStubId').val(), 10) };
            var dtoPayStub = CallService1('Client/PayStubService.svc', 'GetObject', params);
            if (dtoPayStub.PayStubId != undefined) {
                if (dtoPayStub.Editable) {
                    $('#txtPayStubName').val(dtoPayStub.PayStubName);
                    $('#txtPayStubDescription').val(dtoPayStub.PayStubDescription);
                    $('#cmbPayStubType').val(dtoPayStub.PayStubType);
                    $('#cmbValueIn').val(dtoPayStub.ValueIn);
                    if (dtoPayStub.Taxable) {
                        $('#chkTaxable').prop('checked', dtoPayStub.Taxable);
                    }
                }
                else {
                    window.location = "/Client/Main.html#ViewAllPayStubs";
                }
            }
            else {
                window.location = "/Client/Main.html#ViewAllPayStubs";
            }
        }
    }
});
$("#txtPayStubName").focus();
$.validator.addMethod(
    "AlreadyExists",
    function (value, element) {
        var params = { ClientId: $.localStorage.get('ClientId'), PayStubId: parseInt($("#hdnPayStubId").val(), 10), PayStubName: value };
        var response = CallService1('Client/PayStubService.svc', 'Exists', params);

        return !response;
    },
    "Pay Stub Name already exists"
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
        txtPayStubName: {
            required: true,
            AlreadyExists: true
        }
    },
    messages: {
        txtPayStubName: {
            required: 'Pay Stub Name is required'
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
            PayStubId: parseInt($("#hdnPayStubId").val(), 10),
            ClientId: $.localStorage.get('ClientId'),
            PayStubName: $("#txtPayStubName").val(),
            PayStubDescription: $("#txtPayStubDescription").val(),
            PayStubType: $("#cmbPayStubType").val(),
            ValueIn: $("#cmbValueIn").val(),
            Taxable: $('#chkTaxable').is(':checked')
        };
        CallService('Client/PayStubService.svc', 'Save', params, OnPayStubSaveSuccess, false);
    }
};

function OnPayStubSaveSuccess(PayStubId) {
    if (PayStubId > 0) {
        window.location = "/Client/Main.html#ViewAllPayStubs";
    }
}

function Close() {
    window.location = "/Client/Main.html#ViewAllPayStubs";
}