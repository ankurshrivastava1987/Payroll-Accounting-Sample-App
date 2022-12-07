CheckPageRequest();
app.page("ViewPayCheckContractor", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnPayCheckId').val(params);
            DisplayData();
        }
    }
});
function DisplayData() {
    var params = { ClientId: $.localStorage.get('ClientId'), PayCheckId: parseInt($('#hdnPayCheckId').val(), 10) };
    CallService('Client/PayCheckService.svc', 'GetObjectContractor', params, OnPayCheckGetObjectSuccess, true);
}
function OnPayCheckGetObjectSuccess(dtoPayCheck) {
    if (dtoPayCheck.PayCheckId != undefined) {        
        $('#spanName').html('ADVICE OF DEPOSIT');       
        $('#spanClientFullName').html(_.escape(dtoPayCheck.ClientFullName));
        $('#spanClientAddress1').html(_.escape(dtoPayCheck.ClientAddress1));
        $('#spanClientAddress2').html(_.escape(dtoPayCheck.ClientAddress2));        
        $('#spanClientCity').html(_.escape(dtoPayCheck.ClientCity));
        $('#spanClientStateCode').html(_.escape(dtoPayCheck.ClientStateCode));
        $('#spanClientZipCode').html(_.escape(dtoPayCheck.ClientZipCode));
        $('#spanEmployeeFullName').html(_.escape(dtoPayCheck.EmployeeFullName));
        $('#spanEmployeeAddress1').html(_.escape(dtoPayCheck.EmployeeAddress1));
        $('#spanEmployeeAddress2').html(_.escape(dtoPayCheck.EmployeeAddress2));       
        $('#spanEmployeeCity').html(_.escape(dtoPayCheck.EmployeeCity));
        $('#spanEmployeeStateCode').html(_.escape(dtoPayCheck.EmployeeStateCode));
        $('#spanEmployeeZipCode').html(_.escape(dtoPayCheck.EmployeeZipCode));
       
        $('#spanNetPayCheck').html(_.escape(accounting.formatMoney(dtoPayCheck.TotalPay)));
        $('#spanPayDate').html(_.escape(FormatDateUTC(dtoPayCheck.PayDate)));               
        $('#spanReimbursementAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.ReimbursementAmount)));
        $('#spanPaymentAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.PaymentAmount)));        
        $('#spanDeductionAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.DeductionAmount))); 
    }
}
function Edit() {
    window.location = "/Client/Main.html#EditPayCheckContractor:" + $('#hdnPayCheckId').val();
}

function Close() {
    window.location = "/Client/Main.html#ViewAllPayChecks";
}
window.scrollTo(0, 0);
socket.on('GetPayCheckObject', function (PayCheckId) {
    if ($('#hdnPayCheckId').val() == PayCheckId) {
        DisplayData();
    }
})
