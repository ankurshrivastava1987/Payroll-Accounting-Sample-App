app.page("ViewFeature", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnFeatureId').val(params);
            DisplayData();
        }
    }
}); 

function DisplayData() {
    var params = { FeatureId: parseInt($('#hdnFeatureId').val(), 10) };
    CallService('Admin/FeatureService.svc', 'GetObject', params, OnFeatureGetObjectSuccess, true);
}
function OnFeatureGetObjectSuccess(dtoFeature) {
    if (dtoFeature != undefined) {
        $('#spanFeatureCode').html(dtoFeature.FeatureCode);
        $('#spanFeatureName').html(dtoFeature.FeatureName);
        $('#spanDisplayOrder').html(dtoFeature.DisplayOrder);
    }
}
function Edit() {
    window.location = "/Admin/Main.html#Feature:" + $('#hdnFeatureId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllFeatures";
}

socket.on('GetFeatureObject', function (FeatureId) {
    if ($('#hdnFeatureId').val() == FeatureId) {
        DisplayData();
    }
})
