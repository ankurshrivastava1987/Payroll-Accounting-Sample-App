app.page("ViewAllowanceStatusSetup", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnAllowanceStatusSetupId').val(params);
            DisplayData();
        }
    }
}); 

var params = {};
var PayScheduleRecurrences = CallService1('Admin/PayScheduleRecurrenceService.svc', 'GetLookup', params);
var FilingStatuses;
function DisplayData() {    
    var params = { AllowanceStatusSetupId: parseInt($('#hdnAllowanceStatusSetupId').val(), 10) };
    CallService('Admin/AllowanceStatusSetupService.svc', 'GetObject', params, OnAllowanceStatusSetupGetObjectSuccess, true);
}
function OnAllowanceStatusSetupGetObjectSuccess(dtoAllowanceStatusSetup) {
    if (dtoAllowanceStatusSetup.AllowanceStatusSetupId != undefined) {       
        $('#spanStateName').html(_.escape(dtoAllowanceStatusSetup.StateName));
        $('#spanEffectiveDate').html(FormatDateUTC(dtoAllowanceStatusSetup.EffectiveDate));

        var params = { StateId: dtoAllowanceStatusSetup.StateId};
        FilingStatuses = CallService1('Admin/FilingStatusService.svc', 'GetLookup', params);
        var html = '';
        html += '<tr class="footable-odd">';
        html += '<td>Frequency</td>';
        for (var i = 0; i < FilingStatuses.length; i++) {
            html += '<td class="text-right">' + _.escape(FilingStatuses[i].FilingStatusName) + '</td>';
        }
        html += '</tr>';
        $('#tblStandardDeduction thead').html(html);
        $('#tblPersonalAllowance thead').html(html);
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
        html = '';
        for (var i = 0; i < PayScheduleRecurrences.length; i++) {
            html += '<tr>';
            html += '<td>' + PayScheduleRecurrences[i].PayScheduleRecurrenceName + '</td>';
            for (var j = 0; j < FilingStatuses.length; j++) {
                html += '<td class="text-right"><span id="B_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_' + FilingStatuses[j].FilingStatusId + '">$0.00</span></td>';
            }
            html += '</tr>';
        }
        $('#bodyPersonalAllowance').html(html);


        html = '<tr class="footable-odd">';
        html += '<td>Frequency</td>';
        html += '<td class="text-right">Dependent Allowance</td>';
        html += '</tr>';
        $('#tblDependentAllowance thead').html(html);
        html = '';
        for (var i = 0; i < PayScheduleRecurrences.length; i++) {
            html += '<tr>';
            html += '<td>' + _.escape(PayScheduleRecurrences[i].PayScheduleRecurrenceName) + '</td>';
            html += '<td class="text-right"><span id="C_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '" >$0.00</span></td>';
            html += '</tr>';
        }
        $('#bodyDependentAllowance').html(html);

        //alert($('#hdnAllowanceStatusSetupId').val());
        FillAllowanceStatusSetupStandardDeduction();
        FillAllowanceStatusSetupPersonalAllowance();
        FillAllowanceStatusSetupDependentAllowance();
    }
    else {       
        window.location = "/Admin/Main.html#ViewAllAllowanceStatusSetups";
    }    
}

function Edit() {
    window.location = "/Admin/Main.html#AllowanceStatusSetup:" + $('#hdnAllowanceStatusSetupId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllAllowanceStatusSetups";
}


function FillAllowanceStatusSetupStandardDeduction() {
    var params = { AllowanceStatusSetupId: parseInt($('#hdnAllowanceStatusSetupId').val(), 10) };
    CallService('Admin/AllowanceStatusSetupService.svc', 'GetAllowanceStatusSetupStandardDeduction', params, OnGetAllowanceStatusSetupStandardDeductionSuccess, true);
}

function OnGetAllowanceStatusSetupStandardDeductionSuccess(response) {
    //alert(PayScheduleRecurrences.length);
    //alert(FilingStatuses.length);
    //alert(response.length);
    for (var i = 0; i < PayScheduleRecurrences.length; i++) {
        for (var j = 0; j < FilingStatuses.length; j++) {
            for (var k = 0; k < response.length; k++) {
                if ((PayScheduleRecurrences[i].PayScheduleRecurrenceId === response[k].PayScheduleRecurrenceId) && (FilingStatuses[j].FilingStatusId === response[k].FilingStatusId)) {
                    $('#A_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_' + FilingStatuses[j].FilingStatusId).html(accounting.formatMoney(response[k].Amount));
                    //alert(accounting.formatMoney(response[k].Amount));
                }
            }
        }
    }
}

function FillAllowanceStatusSetupPersonalAllowance() {
    var params = { AllowanceStatusSetupId: parseInt($('#hdnAllowanceStatusSetupId').val(), 10) };
    CallService('Admin/AllowanceStatusSetupService.svc', 'GetAllowanceStatusSetupPersonalAllowance', params, OnGetAllowanceStatusSetupPersonalAllowanceSuccess, true);
}

function OnGetAllowanceStatusSetupPersonalAllowanceSuccess(response) {
    for (var i = 0; i < PayScheduleRecurrences.length; i++) {
        for (var j = 0; j < FilingStatuses.length; j++) {
            for (var k = 0; k < response.length; k++) {
                if ((PayScheduleRecurrences[i].PayScheduleRecurrenceId === response[k].PayScheduleRecurrenceId) && (FilingStatuses[j].FilingStatusId === response[k].FilingStatusId)) {
                    $('#B_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_' + FilingStatuses[j].FilingStatusId).html(accounting.formatMoney(response[k].Amount));
                }
            }
        }
    }
}

function FillAllowanceStatusSetupDependentAllowance() {
    var params = { AllowanceStatusSetupId: parseInt($('#hdnAllowanceStatusSetupId').val(), 10) };
    CallService('Admin/AllowanceStatusSetupService.svc', 'GetAllowanceStatusSetupDependentAllowance', params, OnGetAllowanceStatusSetupDependentAllowanceSuccess, true);
}

function OnGetAllowanceStatusSetupDependentAllowanceSuccess(response) {
    for (var i = 0; i < PayScheduleRecurrences.length; i++) {       
        for (var j = 0; j < response.length; j++) {
            if (PayScheduleRecurrences[i].PayScheduleRecurrenceId === response[j].PayScheduleRecurrenceId) {
                $('#C_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId).html(accounting.formatMoney(response[j].Amount));
            }
        }      
    }
}

socket.on('GetAllowanceStatusSetupObject', function (AllowanceStatusSetupId) {
    if ($('#hdnAllowanceStatusSetupId').val() == AllowanceStatusSetupId) {
        DisplayData();  
    }
})
