app.page("ViewAllowanceStatusSetup1", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnAllowanceStatusSetupId').val(params);
            DisplayData();
            FillAllowanceStatusSetup1Detail();
        }
    }
}); 

function DisplayData() {    
    var params = { AllowanceStatusSetupId: parseInt($('#hdnAllowanceStatusSetupId').val(), 10) };
    CallService('Admin/AllowanceStatusSetup1Service.svc', 'GetObject', params, OnAllowanceStatusSetup1GetObjectSuccess, true);
}
function OnAllowanceStatusSetup1GetObjectSuccess(dtoAllowanceStatusSetup1) {
    if (dtoAllowanceStatusSetup1.AllowanceStatusSetupId != undefined) {       
        $('#spanStateName').html(_.escape(dtoAllowanceStatusSetup1.StateName));
        $('#spanAllowancePercentage').html(_.escape(dtoAllowanceStatusSetup1.AllowancePercentage.toFixed(2) + '%'));
        $('#spanEffectiveDate').html(FormatDateUTC(dtoAllowanceStatusSetup1.EffectiveDate));        
    }
    else {       
        window.location = "/Admin/Main.html#ViewAllAllowanceStatusSetup1s";
    }   
}
var params = {};
var PayScheduleRecurrences = CallService1('Admin/PayScheduleRecurrenceService.svc', 'GetLookup', params);
var html = '';
for (var i = 0; i < PayScheduleRecurrences.length; i++) {
    html += '<tr id="' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '">';
    html += '<td>' + PayScheduleRecurrences[i].PayScheduleRecurrenceName + '</td>';
    html += '<td style="text-align:right"><span class="a"></span></td>';
    html += '<td style="text-align:right"><span class="b"></span></td>';
    html += '<td style="text-align:right"><span class="c"></span></td>';
    html += '</tr>';
}
$('#bodyAllowance').html(html);


function Edit() {
    window.location = "/Admin/Main.html#AllowanceStatusSetup1:" + $('#hdnAllowanceStatusSetupId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllAllowanceStatusSetup1s";
}

function FillAllowanceStatusSetup1Detail() {
    var params = { AllowanceStatusSetupId: parseInt($('#hdnAllowanceStatusSetupId').val(), 10) };
    CallService('Admin/AllowanceStatusSetup1Service.svc', 'GetAllowanceStatusSetup1Detail', params, OnGetAllowanceStatusSetup1DetailSuccess, true);
}

function OnGetAllowanceStatusSetup1DetailSuccess(response) {
    for (var i = 0; i < response.length; i++) {
        $('#' + response[i].PayScheduleRecurrenceId).find('.a').html(accounting.formatMoney(response[i].OneExemption));
        $('#' + response[i].PayScheduleRecurrenceId).find('.b').html(accounting.formatMoney(response[i].MinimumStandardDeduction));
        $('#' + response[i].PayScheduleRecurrenceId).find('.c').html(accounting.formatMoney(response[i].MaximumStandardDeduction));
    }
}

socket.on('GetAllowanceStatusSetup1Object', function (AllowanceStatusSetupId) {
    if ($('#hdnAllowanceStatusSetupId').val() == AllowanceStatusSetupId) {
        DisplayData();       
        FillAllowanceStatusSetup1Detail();        
    }
})
