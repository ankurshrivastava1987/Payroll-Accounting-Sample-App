app.page("ViewStateTaxSetup3", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnStateTaxSetupId').val(params);
            DisplayData();
            FillStateTaxSetup3Details();
        }
    }
}); 

function DisplayData() {    
    var params = { StateTaxSetupId: parseInt($('#hdnStateTaxSetupId').val(), 10) };
    CallService('Admin/StateTaxSetup3Service.svc', 'GetObject', params, OnStateTaxSetup3GetObjectSuccess, true);
}
function OnStateTaxSetup3GetObjectSuccess(dtoStateTaxSetup3) {
    if (dtoStateTaxSetup3.StateTaxSetupId != undefined) {       
        $('#spanStateName').html(_.escape(dtoStateTaxSetup3.StateName));
        $('#spanEffectiveDate').html(FormatDateUTC(dtoStateTaxSetup3.EffectiveDate));              
    }
    else {       
        window.location = "/Admin/Main.html#ViewAllStateTaxSetup3s";
    }    
}

function FillStateTaxSetup3Details() {
    var params = { StateTaxSetupId: parseInt($('#hdnStateTaxSetupId').val(), 10) };
    CallService('Admin/StateTaxSetup3Service.svc', 'GetStateTaxSetup3Detail', params, OnGetStateTaxSetup3DetailSuccess, true);
}

function OnGetStateTaxSetup3DetailSuccess(Details) {   
    var html = '';
    $.each(Details, function () {       
        html += '<tr>';
        html += '<td class="text-right">' + accounting.formatMoney(this.LowLimit) + '</td>';
        html += '<td class="text-right">' + accounting.formatMoney(this.HighLimit) + '</td>';
        html += '<td class="text-right">' + accounting.formatMoney(this.AdditionalTax) + '</td>';
        html += '<td class="text-right">' + this.TaxRate.toFixed(2) + '%</td>';
        html += '</tr>';
    });   
    $('#bodyStateTaxSetup3Details').html(html);   
}

function Edit() {
    window.location = "/Admin/Main.html#StateTaxSetup3:" + $('#hdnStateTaxSetupId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllStateTaxSetup3s";
}

socket.on('GetStateTaxSetup3Object', function (StateTaxSetupId) {
    if ($('#hdnStateTaxSetupId').val() == StateTaxSetupId) {
        DisplayData();       
        FillStateTaxSetup3Details();
    }
})
