function DisplayData() {
    $("body").removeClass('loading').addClass("loading");
    var params = { ParentClientId: parseInt($.localStorage.get('UserId'), 10), ClientId: parseInt($('#hdnClientId').val(), 10) };
    CallService('Client/ClientService.svc', 'GetObject', params, OnClientGetObjectSuccess, true);
}
function OnClientGetObjectSuccess(dtoClient) {
    if (dtoClient.ClientId != undefined) {
        $('#spanClientTypeName').html(_.escape(dtoClient.ClientTypeName));
        $('#spanFullName').html(_.escape(dtoClient.FullName));
        $('#spanAddress1').html(_.escape(dtoClient.Address1));
        $('#spanAddress2').html(_.escape(dtoClient.Address2));        
        $('#spanCityName').html(_.escape(dtoClient.CityName));
        $('#spanStateName').html(_.escape(dtoClient.StateName));
        $('#spanZipCode').html(_.escape(dtoClient.ZipCode) + (dtoClient.ZipCodeExt.trim() != '' ? '-' + _.escape(dtoClient.ZipCodeExt.trim()) : ''));
        $('#spanIndustryName').html(_.escape(dtoClient.IndustryName));
        $('#spanContactName').html(_.escape(dtoClient.ContactName));
        $('#spanJobTitleName').html(_.escape(dtoClient.JobTitleName));
        $('#spanWorkPhoneNo').html(_.escape(dtoClient.WorkPhoneNo) + (dtoClient.WorkPhoneNoExt.trim() != '' ? '-' + _.escape(dtoClient.WorkPhoneNoExt.trim()) : ''));
        $('#spanCellPhoneNo').html(_.escape(dtoClient.CellPhoneNo));
        $('#spanFaxNo').html(_.escape(dtoClient.FaxNo));
        $('#spanEMailId').html(_.escape(dtoClient.EMailId));
        $('#spanLoginId').html(_.escape(dtoClient.LoginId));
        $('#spanStatus').html(_.escape(dtoClient.Status));
    }
    else
    {
        window.location.href = '/Client/Client/ViewAllClients';
    }
    $("body").removeClass("loading");
}
function Edit() {
    window.location = "/Client/Client/EditClient/" + $('#hdnClientId').val();
}

function Close() {
    window.location = "/Client/Client/ViewAllClients";
}
DisplayData();
socket.on('GetClientClientObject', function (ClientId) {
    if ($('#hdnClientId').val() == ClientId) {
        DisplayData();
    }
})
