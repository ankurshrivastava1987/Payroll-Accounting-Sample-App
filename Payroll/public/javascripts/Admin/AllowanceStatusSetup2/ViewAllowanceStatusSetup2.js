app.page("ViewAllowanceStatusSetup2", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnAllowanceStatusSetupId').val(params);
            DisplayData();
            FillAllowanceStatusSetup2Detail();
        }
    }
}); 

function DisplayData() {    
    var params = { AllowanceStatusSetupId: parseInt($('#hdnAllowanceStatusSetupId').val(), 10) };
    CallService('Admin/AllowanceStatusSetup2Service.svc', 'GetObject', params, OnAllowanceStatusSetup2GetObjectSuccess, true);
}
function OnAllowanceStatusSetup2GetObjectSuccess(dtoAllowanceStatusSetup2) {
    if (dtoAllowanceStatusSetup2.AllowanceStatusSetupId != undefined) {       
        $('#spanStateName').html(_.escape(dtoAllowanceStatusSetup2.StateName));        
        $('#spanEffectiveDate').html(FormatDateUTC(dtoAllowanceStatusSetup2.EffectiveDate));        
    }
    else {       
        window.location = "/Admin/Main.html#ViewAllAllowanceStatusSetup2s";
    }    
}
var params = {};
var PayScheduleRecurrences = CallService1('Admin/PayScheduleRecurrenceService.svc', 'GetLookup', params);
var html = '';
for (var i = 0; i < PayScheduleRecurrences.length; i++) {
    html += '<tr id="' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '">';
    html += '<td>' + PayScheduleRecurrences[i].PayScheduleRecurrenceName + '</td>';
    html += '<td style="text-align:right"><span class="a"></span></td>';   
    html += '</tr>';
}
$('#bodyAllowance').html(html);


function Edit() {
    window.location = "/Admin/Main.html#AllowanceStatusSetup2:" + $('#hdnAllowanceStatusSetupId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllAllowanceStatusSetup2s";
}

function FillAllowanceStatusSetup2Detail() {
    var params = { AllowanceStatusSetupId: parseInt($('#hdnAllowanceStatusSetupId').val(), 10) };
    CallService('Admin/AllowanceStatusSetup2Service.svc', 'GetAllowanceStatusSetup2Detail', params, OnGetAllowanceStatusSetup2DetailSuccess, true);
}

function OnGetAllowanceStatusSetup2DetailSuccess(response) {
    for (var i = 0; i < response.length; i++) {
        $('#' + response[i].PayScheduleRecurrenceId).find('.a').html(accounting.formatMoney(response[i].OneExemption));       
    }
}
socket.on('GetAllowanceStatusSetup2Object', function (AllowanceStatusSetupId) {
    if ($('#hdnAllowanceStatusSetupId').val() == AllowanceStatusSetupId) {
        DisplayData();       
        FillAllowanceStatusSetup2Detail();        
    }
})
