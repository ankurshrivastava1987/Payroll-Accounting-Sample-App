app.page("ViewClient", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnClientId').val(params);
            DisplayData();
        }
    }
}); 

function DisplayData() {    
    var params = {ParentClientId: 0, ClientId: parseInt($('#hdnClientId').val(), 10) };
    CallService('Admin/ClientService.svc', 'GetObject', params, OnClientGetObjectSuccess, true);
}
function OnClientGetObjectSuccess(dtoClient) {
    if (dtoClient.ClientId != undefined) {        
        $('#spanClientTypeName').html(_.escape(dtoClient.ClientTypeName));
        $('#spanFullName').html(_.escape(dtoClient.FullName));
        $('#spanAddress1').html(_.escape(dtoClient.Address1));
        $('#spanAddress2').html(_.escape(dtoClient.Address2));        
        $('#spanCityName').html(_.escape(dtoClient.CityName));
        $('#spanStateName').html(_.escape(dtoClient.StateName));
        $('#spanZipCode').html(_.escape(dtoClient.ZipCode) + (dtoClient.ZipCodeExt.trim() != '' ? '-' + _.escape(dtoClient.ZipCodeExt.trim()): ''));
        $('#spanIndustryName').html(_.escape(dtoClient.IndustryName));
        $('#spanContactName').html(_.escape(dtoClient.ContactName));
        $('#spanJobTitleName').html(_.escape(dtoClient.JobTitleName));
        $('#spanWorkPhoneNo').html(_.escape(dtoClient.WorkPhoneNo) + (dtoClient.WorkPhoneNoExt.trim() != '' ? '-' + _.escape(dtoClient.WorkPhoneNoExt.trim()): ''));       
        $('#spanCellPhoneNo').html(_.escape(dtoClient.CellPhoneNo));
        $('#spanFaxNo').html(_.escape(dtoClient.FaxNo));
        $('#spanEMailId').html(_.escape(dtoClient.EMailId));
        $('#spanLoginId').html(_.escape(dtoClient.LoginId));        
        $('#spanStatus').html(_.escape(dtoClient.Status));
    }
    else {
        window.location = "/Admin/Main.html#ViewAllClients";
    }  
}
function Edit() {
    window.location = "/Admin/Main.html#Client:" + $('#hdnClientId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllClients";
}

socket.on('GetClientObject', function (ClientId) {
    if ($('#hdnClientId').val() == ClientId) {
        DisplayData();
    }
})
