app.page("ViewStandardDeduction2", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnStandardDeductionId').val(params);
            DisplayData();
            FillStandardDeduction2Detail();
        }
    }
}); 
var params = {};
var PayScheduleRecurrences = CallService1('Admin/PayScheduleRecurrenceService.svc', 'GetLookup', params);
var FilingStatuses;
function DisplayData() {    
    var params = { StandardDeductionId: parseInt($('#hdnStandardDeductionId').val(), 10) };
    CallService('Admin/StandardDeduction2Service.svc', 'GetObject', params, OnStandardDeduction2GetObjectSuccess, true);
}
function OnStandardDeduction2GetObjectSuccess(dtoStandardDeduction2) {
    if (dtoStandardDeduction2.StandardDeductionId != undefined) {       
        $('#spanStateName').html(_.escape(dtoStandardDeduction2.StateName));
        $('#spanEffectiveDate').html(FormatDateUTC(dtoStandardDeduction2.EffectiveDate));
        $('#spanNetAmountMultiplyBy').html(_.escape(dtoStandardDeduction2.NetAmountMultiplyBy.toFixed(5)));
        var params = { StateId: dtoStandardDeduction2.StateId};
        FilingStatuses = CallService1('Admin/FilingStatusService.svc', 'GetLookup', params);
        var html = '';
        html += '<tr class="footable-odd">';
        html += '<td>Frequency</td>';
        for (var i = 0; i < FilingStatuses.length; i++) {
            html += '<td class="text-right">' + _.escape(FilingStatuses[i].FilingStatusName) + '</td>';
        }
        html += '</tr>';
        $('#tblStandardDeduction thead').html(html);       
        html = '';
        for (var i = 0; i < PayScheduleRecurrences.length; i++) {
            html += '<tr>';
            html += '<td>' + PayScheduleRecurrences[i].PayScheduleRecurrenceName + '</td>';
            for (var j = 0; j < FilingStatuses.length; j++) {
                html += '<td class="text-right"><span id="A_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_' + FilingStatuses[j].FilingStatusId + '">$0.00</span></td>';
            }
            html += '</tr>';
        }
        $('#bodyStandardDeduction').html(html);        

        FillStandardDeduction2Detail();      
    }
    else {       
        window.location = "/Admin/Main.html#ViewAllStandardDeduction2s";
    }    
}

function Edit() {
    window.location = "/Admin/Main.html#StandardDeduction2:" + $('#hdnStandardDeductionId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllStandardDeduction2s";
}


function FillStandardDeduction2Detail() {
    var params = { StandardDeductionId: parseInt($('#hdnStandardDeductionId').val(), 10) };
    CallService('Admin/StandardDeduction2Service.svc', 'GetStandardDeduction2Detail', params, OnGetStandardDeduction2DetailSuccess, true);
}

function OnGetStandardDeduction2DetailSuccess(response) {
    for (var i = 0; i < PayScheduleRecurrences.length; i++) {
        for (var j = 0; j < FilingStatuses.length; j++) {
            for (var k = 0; k < response.length; k++) {
                if ((PayScheduleRecurrences[i].PayScheduleRecurrenceId === response[k].PayScheduleRecurrenceId) && (FilingStatuses[j].FilingStatusId === response[k].FilingStatusId)) {
                    $('#A_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_' + FilingStatuses[j].FilingStatusId).html(accounting.formatMoney(response[k].Amount));
                }
            }
        }
    }
}
socket.on('GetStandardDeduction2Object', function (StandardDeductionId) {
    if ($('#hdnStandardDeductionId').val() == StandardDeductionId) {
        DisplayData();  
    }
})
