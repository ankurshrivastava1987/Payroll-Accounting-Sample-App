app.page("ViewAllowanceChartSetup", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            
            $('#hdnAllowanceChartSetupId').val(params);
            DisplayData();
            FillAllowanceChartSetupDetails();
        }
    }
}); 

function DisplayData() {    
    var params = { AllowanceChartSetupId: parseInt($('#hdnAllowanceChartSetupId').val(), 10) };
    CallService('Admin/AllowanceChartSetupService.svc', 'GetObject', params, OnAllowanceChartSetupGetObjectSuccess, true);
}
function OnAllowanceChartSetupGetObjectSuccess(dtoAllowanceChartSetup) {
    if (dtoAllowanceChartSetup.AllowanceChartSetupId != undefined) {       
        $('#spanStateName').html(_.escape(dtoAllowanceChartSetup.StateName));
        $('#spanEffectiveDate').html(FormatDateUTC(dtoAllowanceChartSetup.EffectiveDate));        
    }
    else {       
        window.location = "/Admin/Main.html#ViewAllAllowanceChartSetups";
    }   
}

var params = {};
var PayScheduleRecurrences = CallService1('Admin/PayScheduleRecurrenceService.svc', 'GetLookup', params);
html = '<tr class="footable-odd">';
html += '<td>Frequency</td>';
html += '<td class="text-right">Amount for one Allowance</td>';
html += '</tr>';
$('#tblAllowance thead').html(html);
html = '';
for (var i = 0; i < PayScheduleRecurrences.length; i++) {
    html += '<tr>';
    html += '<td>' + _.escape(PayScheduleRecurrences[i].PayScheduleRecurrenceName) + '</td>';
    html += '<td class="text-right"><span id="C_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '" >$0.00</span></td>';
    html += '</tr>';
}
$('#bodyAllowance').html(html);

function Edit() {
    window.location = "/Admin/Main.html#AllowanceChartSetup:" + $('#hdnAllowanceChartSetupId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllAllowanceChartSetups";
}

function FillAllowanceChartSetupDetails() {    
    var params = { AllowanceChartSetupId: parseInt($('#hdnAllowanceChartSetupId').val(), 10) };
    CallService('Admin/AllowanceChartSetupService.svc', 'GetAllowanceChartSetupDetail', params, OnGetAllowanceChartSetupDetailSuccess, true);
}

function OnGetAllowanceChartSetupDetailSuccess(response) {
    for (var i = 0; i < PayScheduleRecurrences.length; i++) {
       
        for (var j = 0; j < response.length; j++) {
            if (PayScheduleRecurrences[i].PayScheduleRecurrenceId === response[j].PayScheduleRecurrenceId) {
               
                $('#C_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId).html(accounting.formatMoney(response[j].Amount));
            }
        }        
    }
}


socket.on('GetAllowanceChartSetupObject', function (AllowanceChartSetupId) {
    if ($('#hdnAllowanceChartSetupId').val() == AllowanceChartSetupId) {
        DisplayData();       
        FillAllowanceChartSetupDetails();
    }
})
