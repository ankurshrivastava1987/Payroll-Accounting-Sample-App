app.page("ViewTaxSlabSetup", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnTaxSlabSetupId').val(params);
            DisplayData();
            FillTaxSlabSetupDetails();
        }
    }
}); 
function DisplayData() {    
    var params = { TaxSlabSetupId: parseInt($('#hdnTaxSlabSetupId').val(), 10) };
    CallService('Admin/TaxSlabSetupService.svc', 'GetObject', params, OnTaxSlabSetupGetObjectSuccess, true);
}
function OnTaxSlabSetupGetObjectSuccess(dtoTaxSlabSetup) {
    if (dtoTaxSlabSetup.TaxSlabSetupId != undefined) {       
        $('#spanStateName').html(_.escape(dtoTaxSlabSetup.StateName));
        $('#spanEffectiveDate').html(FormatDateUTC(dtoTaxSlabSetup.EffectiveDate));        
    }
    else {       
        window.location = "/Admin/Main.html#ViewAllTaxSlabSetups";
    }  
}

function FillTaxSlabSetupDetails() {
    var params = { TaxSlabSetupId: parseInt($('#hdnTaxSlabSetupId').val(), 10) };
    CallService('Admin/TaxSlabSetupService.svc', 'GetTaxSlabSetupDetail', params, OnGetTaxSlabSetupDetailSuccess, true);
}

function OnGetTaxSlabSetupDetailSuccess(Details) {   
    var html = '';
    $.each(Details, function () {       
        html += '<tr>';
        html += '<td class="text-right">' + accounting.formatMoney(this.LowLimit) + '</td>';
        html += '<td class="text-right">' + accounting.formatMoney(this.HighLimit) + '</td>';
        html += '<td class="text-right">' + accounting.formatMoney(this.AdditionalTax) + '</td>';
        html += '<td class="text-right">' + this.TaxRate.toFixed(2) + '%</td>';
        html += '</tr>';
    });   
    $('#bodyTaxSlabSetupDetails').html(html);   
}

function Edit() {
    window.location = "/Admin/Main.html#TaxSlabSetup:" + $('#hdnTaxSlabSetupId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllTaxSlabSetups";
}

socket.on('GetTaxSlabSetupObject', function (TaxSlabSetupId) {
    if ($('#hdnTaxSlabSetupId').val() == TaxSlabSetupId) {
        DisplayData();       
        FillTaxSlabSetupDetails();
    }
})
