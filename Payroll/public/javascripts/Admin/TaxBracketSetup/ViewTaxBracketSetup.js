app.page("ViewTaxBracketSetup", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnTaxBracketSetupId').val(params);
            DisplayData();
            FillTaxBracketSetupDetails();
        }
    }
}); 

function DisplayData() {    
    var params = { TaxBracketSetupId: parseInt($('#hdnTaxBracketSetupId').val(), 10) };
    CallService('Admin/TaxBracketSetupService.svc', 'GetObject', params, OnTaxBracketSetupGetObjectSuccess, true);
}
function OnTaxBracketSetupGetObjectSuccess(dtoTaxBracketSetup) {
    if (dtoTaxBracketSetup.TaxBracketSetupId != undefined) {       
        $('#spanStateName').html(_.escape(dtoTaxBracketSetup.StateName));
        $('#spanEffectiveDate').html(FormatDateUTC(dtoTaxBracketSetup.EffectiveDate));        
    }
    else {       
        window.location = "/Admin/Main.html#ViewAllTaxBracketSetups";
    }    
}

function FillTaxBracketSetupDetails() {
    var params = { TaxBracketSetupId: parseInt($('#hdnTaxBracketSetupId').val(), 10) };
    CallService('Admin/TaxBracketSetupService.svc', 'GetTaxBracketSetupDetail', params, OnGetTaxBracketSetupDetailSuccess, true);
}

function OnGetTaxBracketSetupDetailSuccess(Details) {   
    var html = '';
    $.each(Details, function () {       
        html += '<tr>';
        html += '<td class="text-right">' + accounting.formatMoney(this.LowLimit) + '</td>';
        html += '<td class="text-right">' + accounting.formatMoney(this.HighLimit) + '</td>';
        html += '<td class="text-right">' + accounting.formatMoney(this.MinusAdjustment) + '</td>';
        html += '<td class="text-right">' + this.TaxRate.toFixed(2) + '%</td>';
        html += '</tr>';
    });   
    $('#bodyTaxBracketSetupDetails').html(html);   
}

function Edit() {
    window.location = "/Admin/Main.html#TaxBracketSetup:" + $('#hdnTaxBracketSetupId').val();
}

function Close() {
    window.location = "/Admin/Main.html#:ViewAllTaxBracketSetups";
}

socket.on('GetTaxBracketSetupObject', function (TaxBracketSetupId) {
    if ($('#hdnTaxBracketSetupId').val() == TaxBracketSetupId) {
        DisplayData();       
        FillTaxBracketSetupDetails();
    }
})
