app.page("ViewDeductionConstantSetup", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnDeductionConstantSetupId').val(params);
            DisplayData();
            FillDeductionConstantASetup();
            FillDeductionConstantBSetup();
        }
    }
}); 

function DisplayData() {   
    var params = { DeductionConstantSetupId: parseInt($('#hdnDeductionConstantSetupId').val(), 10) };
    CallService('Admin/DeductionConstantSetupService.svc', 'GetObject', params, OnDeductionConstantSetupGetObjectSuccess, true);
}
function OnDeductionConstantSetupGetObjectSuccess(dtoDeductionConstantSetup) {
    if (dtoDeductionConstantSetup.DeductionConstantSetupId != undefined) {       
        $('#spanStateName').html(_.escape(dtoDeductionConstantSetup.StateName));
        $('#spanEffectiveDate').html(FormatDateUTC(dtoDeductionConstantSetup.EffectiveDate));        
    }
    else {       
        window.location = "/Admin/Main.html#ViewAllDeductionConstantSetups";
    }    
}

var params = {};
var PayScheduleRecurrences = CallService1('Admin/PayScheduleRecurrenceService.svc', 'GetLookup', params);

var html = '';
html += '<tr class="footable-odd">';
html += '<td>Personal Exemptions</td>';
for (var i = 0; i < PayScheduleRecurrences.length; i++) {
    html += '<td class="text-right">' + _.escape(PayScheduleRecurrences[i].PayScheduleRecurrenceName) + '</td>';
}

html += '</tr>';
$('#tblA thead').html(html);

html = '<tr class="footable-odd">';
html += '<td>Dependent Exemptions</td>';
for (var i = 0; i < PayScheduleRecurrences.length; i++) {
    html += '<td class="text-right">' + _.escape(PayScheduleRecurrences[i].PayScheduleRecurrenceName) + '</td>';
}

html += '</tr>';
$('#tblB thead').html(html);

html = '';
for (var i = 1; i <= 6; i++) {
    html += '<tr>';
    html += '<td>' + i + '</td>';
    for (var j = 0; j < PayScheduleRecurrences.length; j++) {
        html += '<td class="text-right"><span id="A_' + i + '_' + PayScheduleRecurrences[j].PayScheduleRecurrenceId + '">$0.00</span></td>';
    }
    html += '</tr>';
}
$('#bodyA').html(html);
html = '';
for (var i = 1; i <= 5; i++) {
    html += '<tr>';
    html += '<td>' + i + '</td>';
    for (var j = 0; j < PayScheduleRecurrences.length; j++) {
        html += '<td class="text-right"><span id="B_' + i + '_' + PayScheduleRecurrences[j].PayScheduleRecurrenceId + '">$0.00</span></td>';
    }
    html += '</tr>';
}
$('#bodyB').html(html);

function Edit() {
    window.location = "/Admin/Main.html#DeductionConstantSetup:" + $('#hdnDeductionConstantSetupId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllDeductionConstantSetups";
}


function FillDeductionConstantASetup() {
    var params = { DeductionConstantSetupId: parseInt($('#hdnDeductionConstantSetupId').val(), 10) };
    CallService('Admin/DeductionConstantSetupService.svc', 'GetDeductionConstantASetup', params, OnGetDeductionConstantASetupSuccess, true);
}

function OnGetDeductionConstantASetupSuccess(response) {
    for (var i = 0; i <= 6; i++) {
        for (var j = 0; j < PayScheduleRecurrences.length; j++) {
            for (var k = 0; k < response.length; k++) {
                if ((PayScheduleRecurrences[j].PayScheduleRecurrenceId === response[k].PayScheduleRecurrenceId) && (i === response[k].PersonalExemptions)) {
                    $('#A_' + i + '_' + PayScheduleRecurrences[j].PayScheduleRecurrenceId).html(accounting.formatMoney(response[k].Amount));
                }
            }
        }
    }
}

function FillDeductionConstantBSetup() {
    var params = { DeductionConstantSetupId: parseInt($('#hdnDeductionConstantSetupId').val(), 10) };
    CallService('Admin/DeductionConstantSetupService.svc', 'GetDeductionConstantBSetup', params, OnGetDeductionConstantBSetupSuccess, true);
}

function OnGetDeductionConstantBSetupSuccess(response) {
    for (var i = 0; i <= 5; i++) {
        for (var j = 0; j < PayScheduleRecurrences.length; j++) {
            for (var k = 0; k < response.length; k++) {
                if ((PayScheduleRecurrences[j].PayScheduleRecurrenceId === response[k].PayScheduleRecurrenceId) && (i === response[k].DependentExemptions)) {
                    $('#B_' + i + '_' + PayScheduleRecurrences[j].PayScheduleRecurrenceId).html(accounting.formatMoney(response[k].Amount));
                }
            }
        }
    }
}
socket.on('GetDeductionConstantSetupObject', function (DeductionConstantSetupId) {
    if ($('#hdnDeductionConstantSetupId').val() == DeductionConstantSetupId) {
        DisplayData();       
        FillDeductionConstantSetupDetails();
    }
})
