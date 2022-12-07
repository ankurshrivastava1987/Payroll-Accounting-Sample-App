app.page("ViewStateTaxSetup4", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnStateTaxSetupId').val(params);
            DisplayData();
            FillStateTaxSetup4Details();
        }
    }
}); 

function DisplayData() {   
    var params = { StateTaxSetupId: parseInt($('#hdnStateTaxSetupId').val(), 10) };
    CallService('Admin/StateTaxSetup4Service.svc', 'GetObject', params, OnStateTaxSetup4GetObjectSuccess, true);
}
function OnStateTaxSetup4GetObjectSuccess(dtoStateTaxSetup4) {
    if (dtoStateTaxSetup4.StateTaxSetupId != undefined) {       
        $('#spanStateName').html(_.escape(dtoStateTaxSetup4.StateName));
        $('#spanEffectiveDate').html(FormatDateUTC(dtoStateTaxSetup4.EffectiveDate));
        $('#spanPayScheduleRecurrenceName').html(_.escape(dtoStateTaxSetup4.PayScheduleRecurrenceName));
        $('#spanFilingStatusName').html(_.escape(dtoStateTaxSetup4.FilingStatusName));
        $('#spanLocalTaxPercentage').html(dtoStateTaxSetup4.LocalTaxPercentage.toFixed(2) + '%'); 
        $('#spanIsDelawareWorkplace').html((dtoStateTaxSetup4.IsDelawareWorkplace=='Y'?'Yes':'No'));         
    }
    else {       
        window.location = "/Admin/Main.html#ViewAllStateTaxSetup4s";
    }    
}

function FillStateTaxSetup4Details() {
    var params = { StateTaxSetupId: parseInt($('#hdnStateTaxSetupId').val(), 10) };
    CallService('Admin/StateTaxSetup4Service.svc', 'GetStateTaxSetup4Detail', params, OnGetStateTaxSetup4DetailSuccess, true);
}

function OnGetStateTaxSetup4DetailSuccess(Details) {   
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
    window.location = "/Admin/Main.html#StateTaxSetup4:" + $('#hdnStateTaxSetupId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllStateTaxSetup4s";
}

socket.on('GetStateTaxSetup4Object', function (StateTaxSetupId) {
    if ($('#hdnStateTaxSetupId').val() == StateTaxSetupId) {
        DisplayData();       
        FillStateTaxSetup4Details();
    }
})
