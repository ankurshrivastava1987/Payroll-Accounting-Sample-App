app.page("ViewIndustry", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnIndustryId').val(params);
            DisplayData();
        }
    }
}); 

function DisplayData() {   
    var params = { IndustryId: parseInt($('#hdnIndustryId').val(), 10) };
    CallService('Admin/IndustryService.svc', 'GetObject', params, OnIndustryGetObjectSuccess, true);
}
function OnIndustryGetObjectSuccess(dtoIndustry) {
    if (dtoIndustry != undefined) {
        $('#spanIndustryName').html(_.escape(dtoIndustry.IndustryName));
    }
    else {
        window.location = "/Admin/Main.html#ViewAllIndustries";
    }
}
function Edit() {
    window.location = "/Admin/Main.html#Industry:" + $('#hdnIndustryId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllIndustries";
}

socket.on('GetIndustryObject', function (IndustryId) {
    if ($('#hdnIndustryId').val() == IndustryId) {
        DisplayData();
    }
})
