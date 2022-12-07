app.page("ViewCountyTaxSetup", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnCountyTaxSetupId').val(params);
            DisplayData();            
        }
    }
}); 

function DisplayData() {    
    var params = { CountyTaxSetupId: parseInt($('#hdnCountyTaxSetupId').val(), 10) };
    CallService('Admin/CountyTaxSetupService.svc', 'GetObject', params, OnCountyTaxSetupGetObjectSuccess, true);
}
function OnCountyTaxSetupGetObjectSuccess(dtoCountyTaxSetup) {
    if (dtoCountyTaxSetup.CountyTaxSetupId != undefined) {       
        $('#spanStateName').html(_.escape(dtoCountyTaxSetup.StateName));
        $('#spanEffectiveDate').html(FormatDateUTC(dtoCountyTaxSetup.EffectiveDate));        
        var params = { CountyTaxSetupId: parseInt($('#hdnCountyTaxSetupId').val(), 10) };
        CallService('Admin/CountyTaxSetupService.svc', 'GetCountyTaxSetupDetail', params, OnGetCountyTaxSetupDetailSuccess, true);
    }
    else {       
        window.location = "/Admin/Main.html#ViewAllCountyTaxSetups";
    }    
}

function OnGetCountyTaxSetupDetailSuccess(Details) {   
    var html = '';
    $.each(Details, function () {       
        html += '<tr>';
        html += '<td>' + this.CountyName + '</td>';      ;
        html += '<td class="text-right">' + (this.TaxRate === null ? 0 : this.TaxRate).toFixed(9) + '%</td>';
        html += '</tr>';
    });   
    $('#bodyCountyTaxSetupDetails').html(html);   
}
function Edit() {
    window.location = "/Admin/Main.html#CountyTaxSetup:" + $('#hdnCountyTaxSetupId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllCountyTaxSetups";
}

socket.on('GetCountyTaxSetupObject', function (CountyTaxSetupId) {
    if ($('#hdnCountyTaxSetupId').val() == CountyTaxSetupId) {
        DisplayData();
    }
})
