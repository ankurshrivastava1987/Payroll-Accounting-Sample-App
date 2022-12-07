app.page("ViewStateTaxSetup1", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnStateTaxSetupId').val(params);
            DisplayData();
            FillStateTaxSetup1Details();
        }
    }
}); 

function DisplayData() {
    var params = { StateTaxSetupId: parseInt($('#hdnStateTaxSetupId').val(), 10) };
    CallService('Admin/StateTaxSetup1Service.svc', 'GetObject', params, OnStateTaxSetup1GetObjectSuccess, true);
}
function OnStateTaxSetup1GetObjectSuccess(dtoStateTaxSetup1) {
    if (dtoStateTaxSetup1.StateTaxSetupId != undefined) {       
        $('#spanStateName').html(_.escape(dtoStateTaxSetup1.StateName));
        $('#spanEffectiveDate').html(FormatDateUTC(dtoStateTaxSetup1.EffectiveDate));
        $('#spanPayScheduleRecurrenceName').html(_.escape(dtoStateTaxSetup1.PayScheduleRecurrenceName)); 
        $('#spanSubtractForEachAllowanceClaimed').html(accounting.formatMoney(dtoStateTaxSetup1.SubtractForEachAllowanceClaimed)); 
    }
    else {       
        window.location = "/Admin/Main.html#ViewAllStateTaxSetup1s";
    }
}

function FillStateTaxSetup1Details() {
    var params = { StateTaxSetupId: parseInt($('#hdnStateTaxSetupId').val(), 10) };
    CallService('Admin/StateTaxSetup1Service.svc', 'GetStateTaxSetup1Detail', params, OnGetStateTaxSetup1DetailSuccess, true);
}

function OnGetStateTaxSetup1DetailSuccess(Details) {   
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
    $('#bodyStateTaxSetup1Details').html(html);   
}

function Edit() {
    window.location = "/Admin/Main.html#StateTaxSetup1:" + $('#hdnStateTaxSetupId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllStateTaxSetup1s";
}

socket.on('GetStateTaxSetup1Object', function (StateTaxSetupId) {
    if ($('#hdnStateTaxSetupId').val() == StateTaxSetupId) {
        DisplayData();       
        FillStateTaxSetup1Details();
    }
})
