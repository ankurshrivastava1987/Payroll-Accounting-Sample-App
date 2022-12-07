app.page("ViewFederalTaxSetup", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnFederalTaxSetupId').val(params);
            DisplayData();
            FillFederalTaxSetupDetails();
        }
    }
}); 

function DisplayData() {    
    var params = { FederalTaxSetupId: parseInt($('#hdnFederalTaxSetupId').val(), 10) };
    CallService('Admin/FederalTaxSetupService.svc', 'GetObject', params, OnFederalTaxSetupGetObjectSuccess, true);
}
function OnFederalTaxSetupGetObjectSuccess(dtoFederalTaxSetup) {
    if (dtoFederalTaxSetup.FederalTaxSetupId != undefined) {
        $('#spanEffectiveDate').html(FormatDateUTC(dtoFederalTaxSetup.EffectiveDate));
        $('#spanFederalFilingStatusName').html(_.escape(dtoFederalTaxSetup.FederalFilingStatusName));
        $('#spanPayScheduleRecurrenceName').html(_.escape(dtoFederalTaxSetup.PayScheduleRecurrenceName));
        $('#spanAllowance').html(accounting.formatMoney(dtoFederalTaxSetup.Allowance));
    }
    else
    {
        window.location = "/Admin/Main.html#ViewAllFederalTaxSetups";
    }    
}

function FillFederalTaxSetupDetails() {
    var params = { FederalTaxSetupId: parseInt($('#hdnFederalTaxSetupId').val(), 10) };
    CallService('Admin/FederalTaxSetupService.svc', 'GetFederalTaxSetupDetail', params, OnGetFederalTaxSetupDetailSuccess, true);
}

function OnGetFederalTaxSetupDetailSuccess(Details) {   
    var html = '';
    $.each(Details, function () {       
        html += '<tr>';
        html += '<td class="text-right">' + accounting.formatMoney(this.LowLimit) + '</td>';
        html += '<td class="text-right">' + accounting.formatMoney(this.HighLimit) + '</td>';
        html += '<td class="text-right">' + accounting.formatMoney(this.AdditionalTax) + '</td>';
        html += '<td class="text-right">' + this.TaxRate.toFixed(2) + '%</td>';
        html += '</tr>';
    });   
    $('#bodyFederalTaxSetupDetails').html(html);   
}

function Edit() {
    window.location = "/Admin/Main.html#FederalTaxSetup:" + $('#hdnFederalTaxSetupId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllFederalTaxSetups";
}

socket.on('GetFederalTaxSetupObject', function (FederalTaxSetupId) {
    if ($('#hdnFederalTaxSetupId').val() == FederalTaxSetupId) {
        DisplayData();       
        FillFederalTaxSetupDetails();
    }
})
