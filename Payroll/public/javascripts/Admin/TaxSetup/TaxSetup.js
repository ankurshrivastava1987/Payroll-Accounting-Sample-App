app.page("TaxSetup", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnTaxSetupId').val(params);
            $('.page-head').html("Edit Tax Setup");           
            var params = { TaxSetupId: parseInt($('#hdnTaxSetupId').val(), 10) };
            var dtoTaxSetup = CallService1('Admin/TaxSetupService.svc', 'GetObject', params);
            if (dtoTaxSetup.TaxSetupId != undefined) {
                $('#txtEffectiveDate').val(FormatDateUTC(dtoTaxSetup.EffectiveDate));
                $('#txtSocialSecurityTaxEmployer').val(dtoTaxSetup.SocialSecurityTaxEmployer.toFixed(2));
                $('#txtSocialSecurityTaxEmployee').val(dtoTaxSetup.SocialSecurityTaxEmployee.toFixed(2));
                $('#txtMedicareTaxEmployer').val(dtoTaxSetup.MedicareTaxEmployer.toFixed(2));
                $('#txtMedicareTaxEmployee').val(dtoTaxSetup.MedicareTaxEmployee.toFixed(2));
                $('#txtFUTATax').val(dtoTaxSetup.FUTATax.toFixed(2));
                $('#txtFUTATaxCreditReduction').val(dtoTaxSetup.FUTATaxCreditReduction.toFixed(2));
            }
            else
            {
                window.location = "/Admin/Main.html#ViewAllTaxSetups";
            }           
        }        
    }
});

$("#txtEffectiveDate").focus();
$('#txtEffectiveDate').val(FormatJSDate(new Date(), 'mm/dd/yy'));
$('#txtEffectiveDate').datepicker({
    format: 'mm/dd/yyyy',
    orientation: 'bottom',
    autoclose: true,
    todayHighlight: true
});

function OnTaxSetupGetObjectSuccess(dtoTaxSetup) {
    if (dtoTaxSetup.TaxSetupId != undefined) {
        $('#txtEffectiveDate').val(FormatDateUTC(dtoTaxSetup.EffectiveDate));
        $('#txtSocialSecurityTaxEmployer').val(dtoTaxSetup.SocialSecurityTaxEmployer.toFixed(2));
        $('#txtSocialSecurityTaxEmployee').val(dtoTaxSetup.SocialSecurityTaxEmployee.toFixed(2));
        $('#txtMedicareTaxEmployer').val(dtoTaxSetup.MedicareTaxEmployer.toFixed(2));
        $('#txtMedicareTaxEmployee').val(dtoTaxSetup.MedicareTaxEmployee.toFixed(2));
        $('#txtFUTATax').val(dtoTaxSetup.FUTATax.toFixed(2));
        $('#txtFUTATaxCreditReduction').val(dtoTaxSetup.FUTATaxCreditReduction.toFixed(2));
    }
    $("body").removeClass("loading");
}

function Save() {
    var params = { TaxSetupId: parseInt($("#hdnTaxSetupId").val(), 10), EffectiveDate: $("#txtEffectiveDate").val(), SocialSecurityTaxEmployer: $("#txtSocialSecurityTaxEmployer").val(), SocialSecurityTaxEmployee: $("#txtSocialSecurityTaxEmployee").val(), MedicareTaxEmployer: $("#txtMedicareTaxEmployer").val(), MedicareTaxEmployee: $("#txtMedicareTaxEmployee").val(), FUTATax: $("#txtFUTATax").val(), FUTATaxCreditReduction: $("#txtFUTATaxCreditReduction").val() };
    CallService('Admin/TaxSetupService.svc', 'Save', params, OnTaxSetupSaveSuccess, false);   
};

function OnTaxSetupSaveSuccess(TaxSetupId) {
    if (TaxSetupId > 0) {
        window.location = "/Admin/Main.html#ViewAllTaxSetups";
    }
}
function Close() {
    window.location = "/Admin/Main.html#ViewAllTaxSetups";
}
