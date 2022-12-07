app.page("ViewExemptionAllowance", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnExemptionAllowanceId').val(params);
            DisplayData();
            FillExemptionAllowanceDetail();
        }
    }
}); 

function DisplayData() {    
    var params = { ExemptionAllowanceId: parseInt($('#hdnExemptionAllowanceId').val(), 10) };
    CallService('Admin/ExemptionAllowanceService.svc', 'GetObject', params, OnExemptionAllowanceGetObjectSuccess, true);
}
function OnExemptionAllowanceGetObjectSuccess(dtoExemptionAllowance) {
    if (dtoExemptionAllowance.ExemptionAllowanceId != undefined) {       
        $('#spanStateName').html(_.escape(dtoExemptionAllowance.StateName));
        $('#spanEffectiveDate').html(FormatDateUTC(dtoExemptionAllowance.EffectiveDate));        
    }
    else {       
        window.location = "/Admin/Main.html#ViewAllExemptionAllowances";
    }   
}
var params = {};
var PayScheduleRecurrences = CallService1('Admin/PayScheduleRecurrenceService.svc', 'GetLookup', params);

var params = {};
var FilingStatuses = CallService1('Admin/FilingStatusService.svc', 'GetLookup', params);
var html = '';
html += '<tr class="footable-odd">';
html += '<td>Allowances on DE 4 or Form W-4</td>';
for (var i = 0; i < PayScheduleRecurrences.length; i++) {
    html += '<td class="text-right">' + _.escape(PayScheduleRecurrences[i].PayScheduleRecurrenceName) + '</td>';
}
html += '</tr>';
$('#tblExemptionAllowance thead').html(html);

html = '';
for (var j = 0; j < 11; j++) {
    html += '<tr>';
    html += '<td>' + j + '</td>';
    for (var i = 0; i < PayScheduleRecurrences.length; i++) {
        html += '<td class="text-right"><span id="A_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_' + j + '">$0.00</span></td>';
    }
    html += '</tr>';
}
$('#bodyExemptionAllowance').html(html);

function Edit() {
    window.location = "/Admin/Main.html#ExemptionAllowance:" + $('#hdnExemptionAllowanceId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllExemptionAllowances";
}


function FillExemptionAllowanceDetail() {
    var params = { ExemptionAllowanceId: parseInt($('#hdnExemptionAllowanceId').val(), 10) };
    CallService('Admin/ExemptionAllowanceService.svc', 'GetExemptionAllowanceDetail', params, OnGetExemptionAllowanceDetailSuccess, true);
}

function OnGetExemptionAllowanceDetailSuccess(response) {
    for (var i = 0; i < PayScheduleRecurrences.length; i++) {
        for (var j = 0; j < 11; j++) {
            for (var k = 0; k < response.length; k++) {
                if ((PayScheduleRecurrences[i].PayScheduleRecurrenceId === response[k].PayScheduleRecurrenceId) && (j === response[k].Allowances)) {
                    $('#A_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_' + j).html(accounting.formatMoney(response[k].Amount));
                }
            }
        }
    }
}
socket.on('GetExemptionAllowanceObject', function (ExemptionAllowanceId) {
    if ($('#hdnExemptionAllowanceId').val() == ExemptionAllowanceId) {
        DisplayData();       
        FillExemptionAllowanceDetail();       
    }
})
