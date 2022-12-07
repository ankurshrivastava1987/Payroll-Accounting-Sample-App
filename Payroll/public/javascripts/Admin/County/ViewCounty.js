app.page("ViewCounty", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnCountyId').val(params);
            DisplayData();
        }
    }
}); 

function DisplayData() {    
    var params = { CountyId: parseInt($('#hdnCountyId').val(), 10) };
    CallService('Admin/CountyService.svc', 'GetObject', params, OnCountyGetObjectSuccess, true);
}
function OnCountyGetObjectSuccess(dtoCounty) {
    if (dtoCounty.CountyId != undefined) {
        $('#spanCountyCode').html(_.escape(dtoCounty.CountyCode));      
        $('#spanCountyName').html(_.escape(dtoCounty.CountyName));      
        $('#spanStateName').html(_.escape(dtoCounty.StateName));        
    }
    else {
        window.location = "/Admin/Main.html#ViewAllCounties";
    }    
}
function Edit() {
    window.location = "/Admin/Main.html#County:" + $('#hdnCountyId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllCounties";
}

socket.on('GetCountyObject', function (CountyId) {
    if ($('#hdnCountyId').val() == CountyId) {
        DisplayData();
    }
})
