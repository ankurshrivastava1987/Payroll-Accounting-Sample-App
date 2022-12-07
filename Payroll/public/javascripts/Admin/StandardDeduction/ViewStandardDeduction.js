app.page("ViewStandardDeduction", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnStandardDeductionId').val(params);
            DisplayData();
            FillStandardDeductionDetail();
        }
    }
}); 

function DisplayData() {    
    var params = { StandardDeductionId: parseInt($('#hdnStandardDeductionId').val(), 10) };
    CallService('Admin/StandardDeductionService.svc', 'GetObject', params, OnStandardDeductionGetObjectSuccess, true);
}
function OnStandardDeductionGetObjectSuccess(dtoStandardDeduction) {
    if (dtoStandardDeduction.StandardDeductionId != undefined) {       
        $('#spanStateName').html(_.escape(dtoStandardDeduction.StateName));
        $('#spanEffectiveDate').html(FormatDateUTC(dtoStandardDeduction.EffectiveDate));        
    }
    else {       
        window.location = "/Admin/Main.html#ViewAllStandardDeductions";
    }    
}
var params = {};
var PayScheduleRecurrences = CallService1('Admin/PayScheduleRecurrenceService.svc', 'GetLookup', params);

var html = '';
html += '<tr class="footable-odd">';
html += '<td rowspan="2">Frequency</td>';
html += '<td rowspan="2">Single Persons</td>';
html += '<td rowspan="2">Dual Income Married</td>';
html += '<td rowspan="2">Married With Multiple Employers</td>';
html += '<td colspan="2">Married Persons</td>';
html += '<td rowspan="2">Unmarried/Head of Household</td>';
html += '</tr>';
html += '<tr class="footable-odd">';
html += '<td>0 OR 1</td>';
html += '<td>2 OR More</td>';
html += '</tr>';
$('#tblStandardDeduction thead').html(html);

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
$('#bodyStandardDeduction').html(html);

function Edit() {
    window.location = "/Admin/Main.html#StandardDeduction:" + $('#hdnStandardDeductionId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllStandardDeductions";
}


function FillStandardDeductionDetail() {
    var params = { StandardDeductionId: parseInt($('#hdnStandardDeductionId').val(), 10) };
    CallService('Admin/StandardDeductionService.svc', 'GetStandardDeductionDetail', params, OnGetStandardDeductionDetailSuccess, true);
}

function OnGetStandardDeductionDetailSuccess(response) {
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
socket.on('GetStandardDeductionObject', function (StandardDeductionId) {
    if ($('#hdnStandardDeductionId').val() == StandardDeductionId) {
        DisplayData();       
        FillStandardDeductionDetail();       
    }
})
