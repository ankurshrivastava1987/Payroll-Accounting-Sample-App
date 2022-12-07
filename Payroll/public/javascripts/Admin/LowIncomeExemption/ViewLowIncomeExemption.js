app.page("ViewLowIncomeExemption", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnLowIncomeExemptionId').val(params);
            DisplayData();
            FillLowIncomeExemptionDetail();
        }
    }
}); 

function DisplayData() {    
    var params = { LowIncomeExemptionId: parseInt($('#hdnLowIncomeExemptionId').val(), 10) };
    CallService('Admin/LowIncomeExemptionService.svc', 'GetObject', params, OnLowIncomeExemptionGetObjectSuccess, true);
}
function OnLowIncomeExemptionGetObjectSuccess(dtoLowIncomeExemption) {
    if (dtoLowIncomeExemption.LowIncomeExemptionId != undefined) {       
        $('#spanStateName').html(_.escape(dtoLowIncomeExemption.StateName));
        $('#spanEffectiveDate').html(FormatDateUTC(dtoLowIncomeExemption.EffectiveDate));        
    }
    else {       
        window.location = "/Admin/Main.html#ViewAllLowIncomeExemptions";
    }   
}
var params = {};
var PayScheduleRecurrences = CallService1('Admin/PayScheduleRecurrenceService.svc', 'GetLookup', params);

var html = '';
html += '<tr class="footable-odd">';
html += '<td rowspan="2">Frequency</td>';
html += '<td rowspan="2">SINGLE PERSONS($)</td>';
html += '<td rowspan="2">DUAL INCOME MARRIED($)</td>';
html += '<td rowspan="2">MARRIED WITH MULTIPLE EMPLOYERS($)</td>';
html += '<td colspan="2">MARRIED PERSONS</td>';
html += '<td rowspan="2">UNMARRIED/HEAD OF HOUSEHOLD($)</td>';
html += '</tr>';
html += '<tr class="footable-odd">';
html += '<td>0 OR 1($)</td>';
html += '<td>2 OR MORE($)</td>';
html += '</tr>';
$('#tblLowIncomeExemption thead').html(html);

html = '';
for (var i = 0; i < PayScheduleRecurrences.length; i++) {
    html += '<tr>';
    html += '<td>' + _.escape(PayScheduleRecurrences[i].PayScheduleRecurrenceName) + '</td>';
    html += '<td class="text-right"><span id="A_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_S">$0.00</span></td>';
    html += '<td class="text-right"><span id="B_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_MJ">$0.00</span></td>';
    html += '<td class="text-right"><span id="C_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_MM">$0.00</span></td>';
    html += '<td class="text-right"><span id="D_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_M01">$0.00</span></td>';
    html += '<td class="text-right"><span id="E_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_M2">$0.00</span></td>';
    html += '<td class="text-right"><span id="F_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_HH">$0.00</span></td>';
    html += '</tr>';
}
$('#bodyLowIncomeExemption').html(html);

function Edit() {
    window.location = "/Admin/Main.html#LowIncomeExemption:" + $('#hdnLowIncomeExemptionId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllLowIncomeExemptions";
}


function FillLowIncomeExemptionDetail() {
    var params = { LowIncomeExemptionId: parseInt($('#hdnLowIncomeExemptionId').val(), 10) };
    CallService('Admin/LowIncomeExemptionService.svc', 'GetLowIncomeExemptionDetail', params, OnGetLowIncomeExemptionDetailSuccess, true);
}

function OnGetLowIncomeExemptionDetailSuccess(response) {
    for (var i = 0; i < PayScheduleRecurrences.length; i++) {        
        for (var j = 0; j < response.length; j++) {
            if (PayScheduleRecurrences[i].PayScheduleRecurrenceId === response[j].PayScheduleRecurrenceId) {
                $('#A_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_S').html(accounting.formatMoney(response[j].S));
                $('#B_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_MJ').html(accounting.formatMoney(response[j].MJ));
                $('#C_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_MM').html(accounting.formatMoney(response[j].MM));
                $('#D_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_M01').html(accounting.formatMoney(response[j].M01));
                $('#E_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_M2').html(accounting.formatMoney(response[j].M2));
                $('#F_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_HH').html(accounting.formatMoney(response[j].HH));
            }
        }        
    }
}
socket.on('GetLowIncomeExemptionObject', function (LowIncomeExemptionId) {
    if ($('#hdnLowIncomeExemptionId').val() == LowIncomeExemptionId) {
        DisplayData();       
        FillLowIncomeExemptionDetail();       
    }
})
