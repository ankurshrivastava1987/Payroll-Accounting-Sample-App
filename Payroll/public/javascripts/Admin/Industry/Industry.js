app.page("Industry", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnIndustryId').val(params);
            $('.page-head').html("Edit Industry");
            DisplayData();
        }       
    }
});

function DisplayData() {    
    var params = { IndustryId: parseInt($('#hdnIndustryId').val(), 10) };
    CallService('Admin/IndustryService.svc', 'GetObject', params, OnIndustryGetObjectSuccess, true);
}
function OnIndustryGetObjectSuccess(dtoIndustry) {
    if (dtoIndustry.IndustryId != undefined) {
        $('#txtIndustryName').val(dtoIndustry.IndustryName);
    }
    else
    {
        window.location = "/Admin/Main.html#ViewAllIndustries";
    }
}
$("#txtIndustryName").focus();
$.validator.addMethod(
    "AlreadyExists", 
        function (value, element) {
            var params = { IndustryId: parseInt($("#hdnIndustryId").val(), 10), IndustryName: value };
            var response = CallService1('Admin/IndustryService.svc', 'Exists', params);
            return !response;
    },
        "Industry Name already exists"
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
        txtIndustryName: {
            required: true,
            AlreadyExists: true
        }
    },
    messages: {
        txtIndustryName: {
            required: 'Industry Name is required'
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
        var params = { IndustryId: parseInt($("#hdnIndustryId").val(), 10), IndustryName: $("#txtIndustryName").val() };
        CallService('Admin/IndustryService.svc', 'Save', params, OnIndustrySaveSuccess, false);
    }
};

function OnIndustrySaveSuccess(IndustryId) {
    if (IndustryId > 0) {
        window.location = "/Admin/Main.html#ViewAllIndustries";
    }
}
function Close() {
    window.location = "/Admin/Main.html#ViewAllIndustries";
}
