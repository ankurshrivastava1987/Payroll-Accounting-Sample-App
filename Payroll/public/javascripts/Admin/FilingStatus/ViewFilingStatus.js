app.page("ViewFilingStatus", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnFilingStatusId').val(params);
            DisplayData();
        }
    }
}); 

function DisplayData() {    
    var params = { FilingStatusId: parseInt($('#hdnFilingStatusId').val(), 10) };
    CallService('Admin/FilingStatusService.svc', 'GetObject', params, OnFilingStatusGetObjectSuccess, true);
}
function OnFilingStatusGetObjectSuccess(dtoFilingStatus) {
    if (dtoFilingStatus != undefined) {
        $('#spanFilingStatusCode').html(_.escape(dtoFilingStatus.FilingStatusCode));
        $('#spanFilingStatusName').html(_.escape(dtoFilingStatus.FilingStatusName));
        $('#spanStateName').html(_.escape(dtoFilingStatus.StateName));
    }
    else {
        window.location = "/Admin/Main.html#ViewAllFilingStatuses";
    }  
}
function Edit() {
    window.location = "/Admin/Main.html#FilingStatus:" + $('#hdnFilingStatusId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllFilingStatuses";
}

socket.on('GetFilingStatusObject', function (FilingStatusId) {
    if ($('#hdnFilingStatusId').val() == FilingStatusId) {
        DisplayData();
    }
})
