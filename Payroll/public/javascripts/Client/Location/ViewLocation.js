CheckPageRequest();
app.page("ViewLocation", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnLocationId').val(params);
            DisplayData();
        }
    }
});
function DisplayData() {    
    var params = { ClientId: $.localStorage.get('ClientId'), LocationId: parseInt($('#hdnLocationId').val(), 10) };
    var dtoLocation = CallService1('Client/LocationService.svc', 'GetObject', params);
    if (dtoLocation.LocationId != undefined) {
        $('#spanLocationName').html(_.escape(dtoLocation.LocationName));
        $('#spanAddress1').html(_.escape(dtoLocation.Address1));
        $('#spanAddress2').html(_.escape(dtoLocation.Address2));       
        $('#spanCityName').html(_.escape(dtoLocation.CityName));
        $('#spanStateName').html(_.escape(dtoLocation.StateName));
        $('#spanZipCode').html(_.escape(dtoLocation.ZipCode) + (dtoLocation.ZipCodeExt.trim() != '' ? '-' + _.escape(dtoLocation.ZipCodeExt.trim()) : ''));
    }
    else {
        window.location = "/Client/Main.html#ViewAllLocations";
    }
}

function Edit() {
    window.location = "/Client/Main.html#Location:" + $('#hdnLocationId').val();
}

function Close() {
    window.location = "/Client/Main.html#ViewAllLocations";
}

window.scrollTo(0, 0);
socket.on('GetLocationObject', function (LocationId) {
    if ($('#hdnLocationId').val() == LocationId) {
        DisplayData();
    }
})
