app.page("ViewTaxSetup", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnTaxSetupId').val(params);
            DisplayData();
        }
    }
}); 

function DisplayData() {    
    var params = { TaxSetupId: parseInt($('#hdnTaxSetupId').val(), 10) };
    CallService('Admin/TaxSetupService.svc', 'GetObject', params, OnTaxSetupGetObjectSuccess, true);
}
function OnTaxSetupGetObjectSuccess(dtoTaxSetup) {
    if (dtoTaxSetup.TaxSetupId != undefined) {
        $('#spanEffectiveDate').html(FormatDateUTC(dtoTaxSetup.EffectiveDate));
        $('#spanSocialSecurityTaxEmployer').html(dtoTaxSetup.SocialSecurityTaxEmployer.toFixed(2));
        $('#spanSocialSecurityTaxEmployee').html(dtoTaxSetup.SocialSecurityTaxEmployee.toFixed(2));
        $('#spanMedicareTaxEmployer').html(dtoTaxSetup.MedicareTaxEmployer.toFixed(2));
        $('#spanMedicareTaxEmployee').html(dtoTaxSetup.MedicareTaxEmployee.toFixed(2));
        $('#spanFUTATax').html(dtoTaxSetup.FUTATax.toFixed(2));
        $('#spanFUTATaxCreditReduction').html(dtoTaxSetup.FUTATaxCreditReduction.toFixed(2));
    }
    else {
        window.location = "/Admin/Main.html#ViewAllTaxSetups";
    }
}
function Edit() {
    window.location = "/Admin/Main.html#TaxSetup:" + $('#hdnTaxSetupId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllTaxSetups";
}

socket.on('GetTaxSetupObject', function (TaxSetupId) {
    if ($('#hdnTaxSetupId').val() == TaxSetupId) {
        DisplayData();
    }
})
