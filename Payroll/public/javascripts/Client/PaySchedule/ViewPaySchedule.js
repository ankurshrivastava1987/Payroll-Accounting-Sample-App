CheckPageRequest();
app.page("ViewPaySchedule", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnPayScheduleId').val(params);
            DisplayData();
        }
    }
});
function DisplayData() {    
    var params = { ClientId: $.localStorage.get('ClientId'), PayScheduleId: parseInt($('#hdnPayScheduleId').val(), 10) };
    var dtoPaySchedule = CallService1('Client/PayScheduleService.svc', 'GetObject', params);
    if (dtoPaySchedule.PayScheduleId != undefined) {
        $('#spanPayScheduleName').html(_.escape(dtoPaySchedule.PayScheduleName));
        $('#spanPayPeriodEndDate').html((FormatDateUTC(dtoPaySchedule.PayPeriodEndDate) == '01/01/1900' ? '' : FormatDateUTC(dtoPaySchedule.PayPeriodEndDate)));
        $('#spanPayScheduleRecurrenceName').html(_.escape(dtoPaySchedule.PayScheduleRecurrenceName));
        $('#spanStatus').html(_.escape(dtoPaySchedule.Status));
        $('#spanDefault').html(dtoPaySchedule.Default ? 'Yes' : 'No');
    }
    else {
        window.location = "/Client/Main.html#ViewAllPaySchedules";
    }
}

function Edit() {
    window.location = "/Client/Main.html#PaySchedule:" + $('#hdnPayScheduleId').val();
}

function Close() {
    window.location = "/Client/Main.html#ViewAllPaySchedules";
}
window.scrollTo(0, 0); 
socket.on('GetPayScheduleObject', function (PayScheduleId) {
    if ($('#hdnPayScheduleId').val() == PayScheduleId) {
        DisplayData();
    }
})
