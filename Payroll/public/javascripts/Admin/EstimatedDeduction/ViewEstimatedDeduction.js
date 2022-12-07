app.page("ViewEstimatedDeduction", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnEstimatedDeductionId').val(params);
            DisplayData();
            FillEstimatedDeductionDetail();
        }
    }
}); 

function DisplayData() {    
    var params = { EstimatedDeductionId: parseInt($('#hdnEstimatedDeductionId').val(), 10) };
    CallService('Admin/EstimatedDeductionService.svc', 'GetObject', params, OnEstimatedDeductionGetObjectSuccess, true);
}
function OnEstimatedDeductionGetObjectSuccess(dtoEstimatedDeduction) {
    if (dtoEstimatedDeduction.EstimatedDeductionId != undefined) {       
        $('#spanStateName').html(_.escape(dtoEstimatedDeduction.StateName));
        $('#spanEffectiveDate').html(FormatDateUTC(dtoEstimatedDeduction.EffectiveDate));        
    }
    else {       
        window.location = "/Admin/Main.html#ViewAllEstimatedDeductions";
    }    
}
var params = {};
var PayScheduleRecurrences = CallService1('Admin/PayScheduleRecurrenceService.svc', 'GetLookup', params);

var params = {};
var FilingStatuses = CallService1('Admin/FilingStatusService.svc', 'GetLookup', params);
var html = '';
html += '<tr class="footable-odd">';
html += '<td>Additional Withholding Allowances</td>';
for (var i = 0; i < PayScheduleRecurrences.length; i++) {
    html += '<td class="text-right">' + _.escape(PayScheduleRecurrences[i].PayScheduleRecurrenceName) + '</td>';
}
html += '</tr>';
$('#tblEstimatedDeduction thead').html(html);

html = '';
for (var j = 1; j < 11; j++) {
    html += '<tr>';
    html += '<td>' + j + '</td>';
    for (var i = 0; i < PayScheduleRecurrences.length; i++) {
        html += '<td class="text-right"><span id="A_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_' + j + '">$0.00</span></td>';
    }
    html += '</tr>';
}
$('#bodyEstimatedDeduction').html(html);

function Edit() {
    window.location = "/Admin/Main.html#EstimatedDeduction:" + $('#hdnEstimatedDeductionId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllEstimatedDeductions";
}


function FillEstimatedDeductionDetail() {
    var params = { EstimatedDeductionId: parseInt($('#hdnEstimatedDeductionId').val(), 10) };
    CallService('Admin/EstimatedDeductionService.svc', 'GetEstimatedDeductionDetail', params, OnGetEstimatedDeductionDetailSuccess, true);
}

function OnGetEstimatedDeductionDetailSuccess(response) {
    for (var i = 0; i < PayScheduleRecurrences.length; i++) {
        for (var j = 1; j < 11; j++) {
            for (var k = 0; k < response.length; k++) {
                if ((PayScheduleRecurrences[i].PayScheduleRecurrenceId === response[k].PayScheduleRecurrenceId) && (j === response[k].AdditionalAllowances)) {
                    $('#A_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_' + j).html(accounting.formatMoney(response[k].Amount));
                }
            }
        }
    }
}
socket.on('GetEstimatedDeductionObject', function (EstimatedDeductionId) {
    if ($('#hdnEstimatedDeductionId').val() == EstimatedDeductionId) {
        DisplayData();       
        FillEstimatedDeductionDetail();       
    }
})
