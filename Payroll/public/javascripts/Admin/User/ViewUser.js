app.page("ViewUser", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnUserId').val(params);
            DisplayData();
        }
    }
}); 

function DisplayData() {   
    var params = { UserId: parseInt($('#hdnUserId').val(), 10) };
    CallService('Admin/UserService.svc', 'GetObject', params, OnUserGetObjectSuccess, true);
}
function OnUserGetObjectSuccess(dtoUser) {
    if (dtoUser.UserId != undefined) {
        $('#spanUserCode').html(_.escape(dtoUser.UserCode));
        $('#spanFullName').html(_.escape(dtoUser.FullName));
        $('#spanAddress1').html(_.escape(dtoUser.Address1));
        $('#spanAddress2').html(_.escape(dtoUser.Address2));       
        $('#spanCityName').html(_.escape(dtoUser.CityName));
        $('#spanStateName').html(_.escape(dtoUser.StateName));
        $('#spanZipCode').html(_.escape(dtoUser.ZipCode) + (dtoUser.ZipCodeExt.trim() != '' ? '-' + _.escape(dtoUser.ZipCodeExt.trim()) : ''));
        $('#spanJobTitleName').html(_.escape(dtoUser.JobTitleName));
        $('#spanWorkPhoneNo').html(_.escape(dtoUser.WorkPhoneNo) + (dtoUser.WorkPhoneNoExt.trim() != '' ? '-' + _.escape(dtoUser.WorkPhoneNoExt.trim()) : ''));
        $('#spanCellPhoneNo').html(_.escape(dtoUser.CellPhoneNo));
        $('#spanEMailId').html(_.escape(dtoUser.EMailId));
        $('#spanLoginId').html(_.escape(dtoUser.LoginId));
        $('#spanStatus').html(_.escape(dtoUser.Status));
    }
    else
    {
        window.location = "/Admin/Main.html#ViewAllUsers";
    }   
}
function Edit() {
    window.location = "/Admin/Main.html#User:" + $('#hdnUserId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllUsers";
}

socket.on('GetUserObject', function (UserId) {
    if ($('#hdnUserId').val() == UserId) {
        DisplayData();
    }
})
