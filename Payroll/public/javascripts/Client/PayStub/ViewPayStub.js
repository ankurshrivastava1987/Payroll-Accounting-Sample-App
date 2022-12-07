CheckPageRequest();
app.page("ViewPayStub", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnPayStubId').val(params);
            DisplayData();
        }
    }
});
function DisplayData() {    
    var params = { ClientId: $.localStorage.get('ClientId'), PayStubId: parseInt($('#hdnPayStubId').val(), 10) };
    var dtoPayStub = CallService1('Client/PayStubService.svc', 'GetObject', params);
    if (dtoPayStub.PayStubId != undefined) {
        $('#spanPayStubName').html(_.escape(dtoPayStub.PayStubName));
        $('#spanPayStubDescription').html(_.escape(dtoPayStub.PayStubDescription.replace('\n', '<br/>')));
        $('#spanPayStubType').html(_.escape(dtoPayStub.PayStubType));
        $('#spanValueIn').html(_.escape(dtoPayStub.ValueIn));
        $('#spanTaxable').html(_.escape(dtoPayStub.Taxable ? 'Yes' : 'No'));
        if (!dtoPayStub.Editable)
        {
            $('#btnEdit').attr('disabled', 'disabled');
        }
    }
    else {
        window.location = "/Client/Main.html#ViewAllPayStubs";
    }    
}
function OnPayStubGetObjectSuccess(dtoPayStub) {
    
}
function Edit() {
    window.location = "/Client/Main.html#PayStub:" + $('#hdnPayStubId').val();
}

function Close() {
    window.location = "/Client/Main.html#ViewAllPayStubs";
}
window.scrollTo(0, 0);
socket.on('GetPayStubObject', function (PayStubId) {
    if ($('#hdnPayStubId').val() == PayStubId) {
        DisplayData();
    }
})
