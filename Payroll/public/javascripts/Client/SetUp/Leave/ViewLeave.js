CheckPageRequest();
app.page("ViewLeave", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnLeaveId').val(params);
            DisplayData();
        }
    }
});
function DisplayData() {
    var params = { LeaveId: parseInt($('#hdnLeaveId').val(), 10) };
    var dtoLeave = CallService1('Client/SetUp/Leave/LeaveService.svc', 'GetObject', params);
    if (dtoLeave.LeaveId != undefined) {
        $('#spanCategory').html(_.escape(dtoLeave.Category));
        $('#spanDescription').html(_.escape(dtoLeave.Description));
        $('#spanAccrualFrequency').html(_.escape(dtoLeave.Frequency));
        $('#spanHoursEarned').html(_.escape(dtoLeave.HoursEarnedPerYear));
        $('#spanHoursAvailable').html(_.escape(dtoLeave.MaxAvailableHours));
    }
    else {
        window.location = "/Client/Main.html#ViewAllLeaves";
    }
}

function Edit() {
    window.location = "/Client/Main.html#Leave:" + $('#hdnLeaveId').val();
}

function Close() {
    window.location = "/Client/Main.html#ViewAllLeaves";
}

window.scrollTo(0, 0);
socket.on('GetLeaveObject', function (LeaveId) {
    if ($('#hdnLeaveId').val() == LeaveId) {
        DisplayData();
    }
})
