//Single Page Application
CheckPageRequest();
app.page("Feature", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnFeatureId').val(params);
            DisplayData();
        }
        else {
            window.location = "/Admin/Main.html#ViewAllFeatures";
        }
    }
});
// End for Single page application

function DisplayData() {
    var params = { FeatureId: parseInt($('#hdnFeatureId').val(), 10) };
    CallService('Admin/FeatureService.svc', 'GetObject', params, OnFeatureGetObjectSuccess, true);
}
function OnFeatureGetObjectSuccess(dtoFeature) {    
    if (dtoFeature.FeatureId != undefined) {
        $('#txtFeatureCode').val(dtoFeature.FeatureCode);
        $('#txtFeatureName').val(dtoFeature.FeatureName);
        $('#txtDisplayOrder').val(dtoFeature.DisplayOrder);
    }
}
DisplayData();

$("#txtFeatureCode").focus();
$.validator.addMethod(
    "Required1", 
        function (value, element) {        
        return ($('#txtFeatureCode').val()=="0"? false:true);
    },
        "Feature Code is required"
);
$.validator.addMethod(
    "AlreadyExists1", 
        function (value, element) {
        var params = { FeatureId: parseInt($("#hdnFeatureId").val(), 10), FeatureCode: value };
        var response = CallService1('Admin/FeatureService.svc', 'Exists1', params);
        return !response;
    },
        "Feature Code already exists"
);
$.validator.addMethod(
    "AlreadyExists", 
        function (value, element) {
        var params = { FeatureId: parseInt($("#hdnFeatureId").val(), 10), FeatureName: value };
        var response = CallService1('Admin/FeatureService.svc', 'Exists', params);
        return !response;
    },
        "Feature Name already exists"
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
        txtFeatureCode: {
            Required1: true,
            AlreadyExists1: true
        },
        txtFeatureName: {
            required: true,
            AlreadyExists: true
        }
    },
    messages: {        
        txtFeatureName: {
            required: 'Feature Name is required'
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
        var params = { FeatureId: parseInt($("#hdnFeatureId").val(), 10), FeatureCode: parseInt($("#txtFeatureCode").val(), 10), FeatureName: $("#txtFeatureName").val(), DisplayOrder: parseInt($("#txtDisplayOrder").val(), 10) };
        CallService('Admin/FeatureService.svc', 'Save', params, OnFeatureSaveSuccess, false);
    }
};

function OnFeatureSaveSuccess(FeatureId) {
    if (FeatureId > 0) {
        window.location = "/Admin/Main.html#ViewAllFeatures";
    }
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllFeatures";
}
