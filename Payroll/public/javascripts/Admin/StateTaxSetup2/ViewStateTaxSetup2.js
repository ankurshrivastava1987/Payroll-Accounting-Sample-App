app.page("ViewStateTaxSetup2", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnStateTaxSetupId').val(params);
            DisplayData();
            FillStateTaxSetup2Details();
        }
    }
}); 


function DisplayData() {
    var params = { StateTaxSetupId: parseInt($('#hdnStateTaxSetupId').val(), 10) };
    CallService('Admin/StateTaxSetup2Service.svc', 'GetObject', params, OnStateTaxSetup2GetObjectSuccess, true);
}

function OnStateTaxSetup2GetObjectSuccess(dtoStateTaxSetup2) {
    if (dtoStateTaxSetup2.StateTaxSetupId != undefined) {       
        $('#spanStateName').html(_.escape(dtoStateTaxSetup2.StateName));
        $('#spanEffectiveDate').html(FormatDateUTC(dtoStateTaxSetup2.EffectiveDate));
        $('#spanPayScheduleRecurrenceName').html(_.escape(dtoStateTaxSetup2.PayScheduleRecurrenceName)); 
        $('#spanFilingStatusName').html(_.escape(dtoStateTaxSetup2.FilingStatusName)); 
    }
    else {       
        window.location = "/Admin/Main.html#ViewAllStateTaxSetup2s";
    }
}

function FillStateTaxSetup2Details() {
    var params = { StateTaxSetupId: parseInt($('#hdnStateTaxSetupId').val(), 10) };
    CallService('Admin/StateTaxSetup2Service.svc', 'GetStateTaxSetup2Detail', params, OnGetStateTaxSetup2DetailSuccess, true);
}

function OnGetStateTaxSetup2DetailSuccess(Details) {   
    var html = '';
    $.each(Details, function () {       
        html += '<tr>';
        html += '<td class="text-right">' + accounting.formatMoney(this.LowLimit) + '</td>';
        html += '<td class="text-right">' + accounting.formatMoney(this.HighLimit) + '</td>';
        html += '<td class="text-right">' + accounting.formatMoney(this.AC0) + '</td>';
        html += '<td class="text-right">' + accounting.formatMoney(this.AC1) + '</td>';
        html += '<td class="text-right">' + accounting.formatMoney(this.AC2) + '</td>';
        html += '<td class="text-right">' + accounting.formatMoney(this.AC3) + '</td>';
        html += '<td class="text-right">' + accounting.formatMoney(this.AC4) + '</td>';
        html += '<td class="text-right">' + accounting.formatMoney(this.AC5) + '</td>';
        html += '<td class="text-right">' + accounting.formatMoney(this.AC6) + '</td>';
        html += '<td class="text-right">' + accounting.formatMoney(this.AC7) + '</td>';
        html += '<td class="text-right">' + accounting.formatMoney(this.AC8) + '</td>';
        html += '<td class="text-right">' + accounting.formatMoney(this.AC9) + '</td>';
        html += '<td class="text-right">' + accounting.formatMoney(this.AC10) + '</td>';
        html += '</tr>';
    });   
    $('#bodyStateTaxSetup2Details').html(html);   
}

function Edit() {
    window.location = "/Admin/Main.html#StateTaxSetup2:" + $('#hdnStateTaxSetupId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllStateTaxSetup2s";
}


socket.on('GetStateTaxSetup2Object', function (StateTaxSetupId) {
    if ($('#hdnStateTaxSetupId').val() == StateTaxSetupId) {
        DisplayData();       
        FillStateTaxSetup2Details();
    }
})
