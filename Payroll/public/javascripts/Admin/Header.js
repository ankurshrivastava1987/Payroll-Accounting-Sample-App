function DisplayData1() {
    var params = { UserId: parseInt($.localStorage.get('UserId'), 10) };
    CallService('Admin/UserService.svc', 'GetObject', params, OnUserGetObjectSuccess1, true);
}
function OnUserGetObjectSuccess1(dtoUser) {
    if (dtoUser.UserId != undefined) {
        $('#spanUserName').html(_.escape(dtoUser.FullName));
        $('#spanUserName1').html(_.escape(dtoUser.FullName));       
    }
}

DisplayData1();
socket.on('GetUserObject', function (UserId) {
    if (parseInt($.localStorage.get('UserId'), 10) == UserId) {
        DisplayData1();
    }
})
