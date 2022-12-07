app.page("ViewPayScheduleRecurrence", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnPayScheduleRecurrenceId').val(params);
            DisplayData();
        }
    }
}); 

function DisplayData() {
    var params = { PayScheduleRecurrenceId: parseInt($('#hdnPayScheduleRecurrenceId').val(), 10) };
    CallService('Admin/PayScheduleRecurrenceService.svc', 'GetObject', params, OnPayScheduleRecurrenceGetObjectSuccess, true);
}
function OnPayScheduleRecurrenceGetObjectSuccess(dtoPayScheduleRecurrence) {
    if (dtoPayScheduleRecurrence != undefined) {
        $('#spanPayScheduleRecurrenceCode').html(_.escape(dtoPayScheduleRecurrence.PayScheduleRecurrenceCode));
        $('#spanPayScheduleRecurrenceName').html(_.escape(dtoPayScheduleRecurrence.PayScheduleRecurrenceName));
        $('#spanDisplayOrder').html(_.escape(dtoPayScheduleRecurrence.DisplayOrder));
    }
    else {
        window.location = "/Admin/Main.html#ViewAllPayScheduleRecurrences";
    }
}
function Edit() {
    window.location = "/Admin/Main.html#PayScheduleRecurrence:" + $('#hdnPayScheduleRecurrenceId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllPayScheduleRecurrences";
}

socket.on('GetPayScheduleRecurrenceObject', function (PayScheduleRecurrenceId) {
    if ($('#hdnPayScheduleRecurrenceId').val() == PayScheduleRecurrenceId) {
        DisplayData();
    }
})
