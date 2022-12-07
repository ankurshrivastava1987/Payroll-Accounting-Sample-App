app.page("ViewState", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnStateId').val(params);
            DisplayData();
        }
    }
}); 


function DisplayData() {   
    var params = { StateId: parseInt($('#hdnStateId').val(), 10) };
    CallService('Admin/StateService.svc', 'GetObject', params, OnStateGetObjectSuccess, true);
}
function OnStateGetObjectSuccess(dtoState) {
    if (dtoState.StateId != undefined) {
        $('#spanStateCode').html(_.escape(dtoState.StateCode));
        $('#spanStateName').html(_.escape(dtoState.StateName));
    }
    else {
        window.location = "/Admin/Main.html#ViewAllStates";
    } 
}
function Edit() {
    window.location = "/Admin/Main.html#State:" + $('#hdnStateId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllStates";
}

socket.on('GetStateObject', function (StateId) {
    if ($('#hdnStateId').val() == StateId) {
        DisplayData();
    }
})
