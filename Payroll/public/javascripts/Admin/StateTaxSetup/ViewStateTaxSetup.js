app.page("ViewStateTaxSetup", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnStateTaxSetupId').val(params);
            DisplayData();
            FillStateTaxSetupDetails();
        }
    }
}); 

function DisplayData() {    
    var params = { StateTaxSetupId: parseInt($('#hdnStateTaxSetupId').val(), 10) };
    CallService('Admin/StateTaxSetupService.svc', 'GetObject', params, OnStateTaxSetupGetObjectSuccess, true);
}
function OnStateTaxSetupGetObjectSuccess(dtoStateTaxSetup) {
    if (dtoStateTaxSetup.StateTaxSetupId != undefined) {       
        $('#spanStateName').html(_.escape(dtoStateTaxSetup.StateName));
        $('#spanEffectiveDate').html(FormatDateUTC(dtoStateTaxSetup.EffectiveDate));
        $('#spanPayScheduleRecurrenceName').html(_.escape(dtoStateTaxSetup.PayScheduleRecurrenceName));
        $('#spanFilingStatusName').html(_.escape(dtoStateTaxSetup.FilingStatusName));        
    }
    else {       
        window.location = "/Admin/Main.html#ViewAllStateTaxSetups";
    }   
}

function FillStateTaxSetupDetails() {
    var params = { StateTaxSetupId: parseInt($('#hdnStateTaxSetupId').val(), 10) };
    CallService('Admin/StateTaxSetupService.svc', 'GetStateTaxSetupDetail', params, OnGetStateTaxSetupDetailSuccess, true);
}

function OnGetStateTaxSetupDetailSuccess(Details) {   
    var html = '';
    $.each(Details, function () {       
        html += '<tr>';
        html += '<td class="text-right">' + accounting.formatMoney(this.LowLimit) + '</td>';
        html += '<td class="text-right">' + accounting.formatMoney(this.HighLimit) + '</td>';
        html += '<td class="text-right">' + accounting.formatMoney(this.AdditionalTax) + '</td>';
        html += '<td class="text-right">' + this.TaxRate.toFixed(2) + '%</td>';
        html += '</tr>';
    });   
    $('#bodyStateTaxSetupDetails').html(html);   
}

function Edit() {
    window.location = "/Admin/Main.html#StateTaxSetup:" + $('#hdnStateTaxSetupId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllStateTaxSetups";
}

socket.on('GetStateTaxSetupObject', function (StateTaxSetupId) {
    if ($('#hdnStateTaxSetupId').val() == StateTaxSetupId) {
        DisplayData();       
        FillStateTaxSetupDetails();
    }
})
