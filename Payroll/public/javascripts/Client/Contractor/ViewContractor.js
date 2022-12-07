CheckPageRequest();
app.page("ViewContractor", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnContractorId').val(params);
            DisplayData();
        }
    }
});
function DisplayData() {    
    var params = { ClientId: $.localStorage.get('ClientId'), ContractorId: parseInt($('#hdnContractorId').val(), 10) };
    var dtoContractor = CallService1('Client/Contractor/ContractorService.svc', 'GetObject', params);
    if (dtoContractor.ContractorId != undefined) {
        $('#hdnContractorId').val(dtoContractor.ContractorId);
        $('#spanFederalEIN').html(dtoContractor.FederalEIN);

        if (dtoContractor.Type == 1) {
            $('#spanType').html('Business');
            $("#spanSSN").html("Contractor's Federal EIN:");
            $("#spanlblLine1").html("Business Name(Line 1):");
        }
        else {
            $("#spanSSN").html("SSN:");
            $("#spanlblLine1").html("Full Name:");
            $('#spanType').html('Individual');
            $("#trLine2").attr('style', 'display:none;');
        }

        $('#spanAddress1').html(dtoContractor.Address1);
        $('#spanAddress2').html(dtoContractor.Address2);        
        $('#spanLine1').html(dtoContractor.Line1);
        $('#spanLine2').html(dtoContractor.Line2);
        $('#spanCity').html(dtoContractor.CityName);
        $('#spanStateName').html(dtoContractor.StateName);
        $('#spanZipCode').html(dtoContractor.ZipCode);
        $('#spanZipCodeExt').html(dtoContractor.ZipCodeExt);
        $('#spanEmail').html(dtoContractor.Email);

        if (dtoContractor.Status == false)
            $("#spanStatus").html('Active');
        else
            $("#spanStatus").html('InActive');

        if (dtoContractor.PaymentMethod == "Check")
            $('#spanPaymentMethod').html('Check');
        else
            $('#spanPaymentMethod').html('Direct deposit');

        //if (dtoContractor.AlreadyPaid == true)
        //    $("#chkAlreadyPaid").attr('checked', 'checked'); 
        //else
        //    $("#chkAlreadyPaid").attr('checked', '');
    }
    else {
        window.Contractor = "/Client/Main.html#ViewAllContractors";
    }    
}

function Edit()
{
    window.location = "/Client/Main.html#Contractor:" + $('#hdnContractorId').val();
}

function Close() {
    window.location = "/Client/Main.html#ViewAllContractors";
}
window.scrollTo(0, 0);
socket.on('GetContractorObject', function (ContractorId) {
    if ($('#hdnContractorId').val() == ContractorId) {
        DisplayData();
    }
})
