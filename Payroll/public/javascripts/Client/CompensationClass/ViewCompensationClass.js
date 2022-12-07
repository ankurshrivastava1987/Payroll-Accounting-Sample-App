CheckPageRequest();
app.page("ViewCompensationClass", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnCompensationClassId').val(params);
            DisplayData();
        }
    }
});

function DisplayData() {    
    var params = { ClientId: $.localStorage.get('ClientId'), CompensationClassId: parseInt($('#hdnCompensationClassId').val(), 10) };
    var dtoCompensationClass = CallService1('Client/CompensationClassService.svc', 'GetObject', params);
    if (dtoCompensationClass.CompensationClassId != undefined) {
        $('#spanCompensationClassName').html(_.escape(dtoCompensationClass.CompensationClassName));
    }
    else {
        window.location = "/Client/Main.html#ViewAllCompensationClasses";
    }
}

function Edit() {
    window.location = "/Client/Main.html#CompensationClass:" + $('#hdnCompensationClassId').val();
}

function Close() {
    window.location = "/Client/Main.html#ViewAllCompensationClasses";
}
window.scrollTo(0, 0);
socket.on('GetCompensationClassObject', function (CompensationClassId) {
    if ($('#hdnCompensationClassId').val() == CompensationClassId) {
        DisplayData();
    }
})
