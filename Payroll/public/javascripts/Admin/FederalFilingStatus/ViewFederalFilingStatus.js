app.page("ViewFederalFilingStatus", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnFederalFilingStatusId').val(params);
            DisplayData();
        }
    }
}); 

function DisplayData() {    
    var params = { FederalFilingStatusId: parseInt($('#hdnFederalFilingStatusId').val(), 10) };
    CallService('Admin/FederalFilingStatusService.svc', 'GetObject', params, OnFederalFilingStatusGetObjectSuccess, true);
}
function OnFederalFilingStatusGetObjectSuccess(dtoFederalFilingStatus) {
    if (dtoFederalFilingStatus != undefined) {
        $('#spanFederalFilingStatusCode').html(_.escape(dtoFederalFilingStatus.FederalFilingStatusCode));
        $('#spanFederalFilingStatusName').html(_.escape(dtoFederalFilingStatus.FederalFilingStatusName));        
    }
    else {
        window.location = "/Admin/Main.html#ViewAllFederalFilingStatuses";
    }   
}
function Edit() {
    window.location = "/Admin/Main.html#FederalFilingStatus:" + $('#hdnFederalFilingStatusId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllFederalFilingStatuses";
}

socket.on('GetFederalFilingStatusObject', function (FederalFilingStatusId) {
    if ($('#hdnFederalFilingStatusId').val() == FederalFilingStatusId) {
        DisplayData();
    }
})