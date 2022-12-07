function DisplayData1() {
    var params = { };
    CallService('Client/ClientService.svc', 'GetObject1', params, OnClientGetObjectSuccess1, true);
}
function OnClientGetObjectSuccess1(dtoClient) {
    if (dtoClient.ClientId != undefined) {
        $('#spanUserName').html(_.escape(dtoClient.FullName));             
    }
}
DisplayData1();
function DisplayData2() {
    var params = {ClientId: parseInt($.localStorage.get('ClientId'), 10)};
    CallService('Client/ClientService.svc', 'GetObject', params, OnClientGetObjectSuccess2, true);
}
function OnClientGetObjectSuccess2(dtoClient) {
    if (dtoClient.ClientId != undefined) {
        $('#spanSelectedClientName').html(_.escape(dtoClient.FullName));
    }
}
DisplayData2();

socket.on('GetClientObject', function (ClientId) {
    if (parseInt($.localStorage.get('UserId'), 10) == ClientId) {
        DisplayData1();
    }
    else if (parseInt($.localStorage.get('ClientId'), 10) == ClientId) {
        DisplayData2();
    }
})
