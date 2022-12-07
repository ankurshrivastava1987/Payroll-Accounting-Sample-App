CheckPageRequest();
app.page("ViewClientTaxSetup", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnClientTaxSetupId').val(params);    
            DisplayData();        
        }
    }
}); 

function DisplayData()
{
    var params = { ClientId: $.localStorage.get('ClientId'), ClientTaxSetupId: parseInt($('#hdnClientTaxSetupId').val(), 10) };
    var dtoClientTaxSetup = CallService1('Client/ClientTaxSetupService.svc', 'GetObject', params);
    if (dtoClientTaxSetup != undefined) {
        $('#spanEffectiveDate').html(FormatDateUTC(dtoClientTaxSetup.EffectiveDate));
        $('#spanStateName').html(_.escape(dtoClientTaxSetup.StateName));
        $('#spanSUITaxEmployer').html(dtoClientTaxSetup.SUITaxEmployer.toFixed(6));
        $('#spanMinLimit').html(accounting.formatMoney(dtoClientTaxSetup.MinLimit));
        $('#spanMaxLimit').html(accounting.formatMoney(dtoClientTaxSetup.MaxLimit));
    }
}

function Edit() {
    window.location = "/Client/Main.html#ClientTaxSetup:" + $('#hdnClientTaxSetupId').val();
}

function Close() {
    window.location = "/Client/Main.html#ViewAllClientTaxSetups";
}
window.scrollTo(0, 0);
socket.on('GetClientTaxSetupObject', function (ClientTaxSetupId) {
    if ($('#hdnClientTaxSetupId').val() == ClientTaxSetupId) {
        DisplayData();
    }
})
