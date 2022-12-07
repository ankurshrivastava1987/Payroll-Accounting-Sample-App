CheckPageRequest();
app.page("ViewPriorTaxPayment", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnPriorTaxPaymentId').val(params);
            DisplayData();
        }
    }
});
function DisplayData() { 
    var params = { ClientId: $.localStorage.get('ClientId'), PriorTaxPaymentId: parseInt($('#hdnPriorTaxPaymentId').val(), 10) };
    var dtoPriorTaxPayment = CallService1('Client/TaxesAndForms/PriorTaxPaymentService.svc', 'GetObject', params);
    if (dtoPriorTaxPayment.PriorTaxPaymentId != undefined) {
        $('#hdnPriorTaxPaymentId').val(dtoPriorTaxPayment.PriorTaxPaymentId);
        $('#spanTaxType').html(dtoPriorTaxPayment.TaxType);
        $('#spanLiabilityPeriod').html(dtoPriorTaxPayment.LiabilityPeriod);
        $("#spanPeriodStartDate").html(dtoPriorTaxPayment.PeriodStartDate);
        $("#spanPeriodEndDate").html(dtoPriorTaxPayment.PeriodEndDate);
        $("#spanPaymentDate").html(dtoPriorTaxPayment.PaymentDate);
        $('#spanCheckNumber').html(dtoPriorTaxPayment.CheckNumber);
        $('#spanNotes').html(dtoPriorTaxPayment.Notes);
        $('#spanFederalIncomeTax').html(dtoPriorTaxPayment.FederalIncome);
        $('#spanSocialSecurity').html(dtoPriorTaxPayment.SocialSecurity);
        $('#spanSocialSecurityEmployer').html(dtoPriorTaxPayment.SocialSecurityEmployer);
        $('#spanMedicare').html(dtoPriorTaxPayment.Medicare);
        $('#spanMedicareEmployer').html(dtoPriorTaxPayment.MedicareEmployer);
        $('#spanFutaEmployer').html(dtoPriorTaxPayment.FutaEmployer);
        $('#spanTotalAmount').html(dtoPriorTaxPayment.TotalAmount);
        $("#spanPeriodEndDate").html(dtoPriorTaxPayment.PeriodEndDate);

        if (dtoPriorTaxPayment.TaxType == "Federal Taxes (941/944)") {
            $("#trFutaEmployer").addClass('hide');
            $("#trFederalIncomeTax").removeClass('hide');
            $("#trSocialSecurity").removeClass('hide');
            $("#trSocialSecurityEmployer").removeClass('hide');
            $("#trMedicare").removeClass('hide');
            $("#trMedicareEmployer").removeClass('hide');
        }
        else {
            $("#trFutaEmployer").removeClass('hide');
            $("#trFederalIncomeTax").addClass('hide');
            $("#trSocialSecurity").addClass('hide');
            $("#trSocialSecurityEmployer").addClass('hide');
            $("#trMedicare").addClass('hide');
            $("#trMedicareEmployer").addClass('hide');
        }

        if (dtoPriorTaxPayment.LiabilityPeriod != "UserDefined") {
            $("#txtPeriodStartDate").html('');
            $("#txtPeriodEndDate").html('');
            $("#trStartDate").addClass('hide');
            $("#trEndDate").addClass('hide');
        }

        //FillLiabilityPeriod();
        $('#spanLiabilityPeriod').html(dtoPriorTaxPayment.LiabilityPeriod);
        //if (dtoContractor.AlreadyPaid == true)
        //    $("#chkAlreadyPaid").attr('checked', 'checked');
        //else
        //    $("#chkAlreadyPaid").removeAttr('checked', '');
    }
    else {
        window.location = "/Client/Main.html#ViewAllPriorTaxPayments";
    }
}

function Edit(PriorTaxPaymentId) {
    window.location = '/Client/Main.html#PriorTaxPayment:' + $('#hdnPriorTaxPaymentId').val();
}

function Close() {
    window.location = "/Client/Main.html#ViewAllPriorTaxPayments";
}


window.scrollTo(0, 0);
socket.on('GetPriorTaxPaymentObject', function (PriorTaxPaymentId) {
    if ($('#hdnPriorTaxPaymentId').val() == PriorTaxPaymentId) {
        DisplayData();
    }
})
