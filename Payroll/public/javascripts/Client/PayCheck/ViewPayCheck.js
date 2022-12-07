CheckPageRequest();
app.page("ViewPayCheck", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnPayCheckId').val(params);
            DisplayData();            
        }
    }
});
function DisplayData() {    
    var params = { ClientId: $.localStorage.get('ClientId'), PayCheckId: parseInt($('#hdnPayCheckId').val(), 10) };
    CallService('Client/PayCheckService.svc', 'GetObject', params, OnPayCheckGetObjectSuccess, true);
}
function OnPayCheckGetObjectSuccess(dtoPayCheck) {
    if (dtoPayCheck.PayCheckId != undefined) {       
        $('#spanName').html('ADVICE OF DEPOSIT');       
        $('#spanClientFullName').html(_.escape(dtoPayCheck.ClientFullName));
        $('#spanClientAddress1').html(_.escape(dtoPayCheck.ClientAddress1));
        $('#spanClientAddress2').html(_.escape(dtoPayCheck.ClientAddress2));       
        $('#spanClientCity').html(_.escape(dtoPayCheck.ClientCityName));
        $('#spanClientStateCode').html(_.escape(dtoPayCheck.ClientStateCode));
        $('#spanClientZipCode').html(_.escape(dtoPayCheck.ClientZipCode));
        $('#spanEmployeeFullName').html(_.escape(dtoPayCheck.EmployeeFullName));
        $('#spanEmployeeAddress1').html(_.escape(dtoPayCheck.EmployeeAddress1));
        $('#spanEmployeeAddress2').html(_.escape(dtoPayCheck.EmployeeAddress2));       
        $('#spanEmployeeCity').html(_.escape(dtoPayCheck.EmployeeCityName));
        $('#spanEmployeeStateCode').html(_.escape(dtoPayCheck.EmployeeStateCode));
        $('#spanEmployeeZipCode').html(_.escape(dtoPayCheck.EmployeeZipCode));
        if (dtoPayCheck.PayPeriod.trim() != '') {           
            $('#spanPayPeriod').html(_.escape(dtoPayCheck.PayPeriod));
            $('#divPayPeriod').removeClass('hide');
        }
        if ((dtoPayCheck.PayCheckType != 2) && (dtoPayCheck.PayCheckType != 3)) {           
            $('#tblDeduction').removeClass('hide');
            $('#trRegularPay').removeClass('hide');
            $('#trOTPay').removeClass('hide');
            $('#trDoubleOTPay').removeClass('hide');
            $('#trSickPay').removeClass('hide');
            $('#trVacationPay').removeClass('hide');
        }
        $('#spanNetPayCheck').html(_.escape(accounting.formatMoney(dtoPayCheck.NetPayCheck)));
        $('#spanPayDate').html(_.escape(FormatDateUTC(dtoPayCheck.PayDate)));
        //$('#spanPayType').html(_.escape(dtoPayCheck.PayType));
        if (dtoPayCheck.NetToGross) {
            $('#spanPaidByEmployerAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.PaidByEmployerAmount)));
            $('#spanPaidByEmployerAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.PaidByEmployerYTD)));
            $('#trPaidByEmployer').removeClass('hide');
        }
         
        $('#spanHours').html(_.escape(dtoPayCheck.RegularHours.toFixed(2)));
        $('#spanRate').html(_.escape(accounting.formatMoney(dtoPayCheck.PayRate)));
        $('#spanRegularAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.RegularAmount)));
        $('#spanOTHours').html(_.escape(dtoPayCheck.OTHours.toFixed(2)));
        $('#spanOTRate').html(_.escape(accounting.formatMoney(dtoPayCheck.OTRate)));
        $('#spanOTAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.OTAmount)));
        $('#spanOTAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.OTAmountYTD)));
        $('#spanDoubleOTHours').html(_.escape(dtoPayCheck.DoubleOTHours.toFixed(2)));
        $('#spanDoubleOTRate').html(_.escape(accounting.formatMoney(dtoPayCheck.DoubleOTRate)));
        $('#spanDoubleOTAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.DoubleOTAmount)));
        $('#spanDoubleOTAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.DoubleOTAmountYTD)));
        $('#spanSickHours').html(_.escape(dtoPayCheck.SickHours.toFixed(2)));
        $('#spanSickRate').html(_.escape(accounting.formatMoney(dtoPayCheck.SickRate)));
        $('#spanSickAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.SickAmount)));
        $('#spanSickAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.SickAmountYTD)));
        $('#spanVacationHours').html(_.escape(dtoPayCheck.VacationHours.toFixed(2)));
        $('#spanVacationRate').html(_.escape(accounting.formatMoney(dtoPayCheck.VacationRate)));
        $('#spanVacationAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.VacationAmount)));
        $('#spanVacationAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.VacationAmountYTD)));
        $('#spanRegularAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.AmountPaidYTD)));
        $('#spanFederalTaxAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.FederalTaxAmount)));
        $('#spanFederalTaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.FederalTaxAmountYTD)));
        $('#spanSocialSecurityTaxAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.SocialSecurityTaxAmount)));
        $('#spanSocialSecurityTaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.SocialSecurityTaxAmountYTD)));
        $('#spanMedicareTaxAmountAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.MedicareTaxAmount)));
        $('#spanMedicareTaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.MedicareTaxAmountYTD)));
        $('#spanStateTaxAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.StateTaxAmount)));
        $('#spanStateTaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.StateTaxAmountYTD)));
        $('#spanCountyTaxAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.CountyTaxAmount)));
        $('#spanCountyTaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.CountyTaxAmountYTD)));
        $('#spanTotalPaid').html(_.escape(accounting.formatMoney(dtoPayCheck.TotalPay)));
        $('#spanTotalPaidYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.TotalPayYTD)));       
        $('#spanDeductions').html(_.escape(accounting.formatMoney(dtoPayCheck.Deductions)));
        $('#spanDeductionsYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.DeductionsYTD)));
        $('#spanTax').html(_.escape(accounting.formatMoney(dtoPayCheck.Tax)));
        $('#spanTaxYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.TaxYTD)));
        $('#spanNetPayCheckSummary').html(_.escape(accounting.formatMoney(dtoPayCheck.NetPayCheck)));      
        $('#spanEmployerFUTATaxAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerFUTATaxAmount)));
        $('#spanEmployerFUTATaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerFUTATaxAmountYTD)));
        $('#spanEmployerSocialSecurityTaxAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerSocialSecurityTaxAmount)));
        $('#spanEmployerSocialSecurityTaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerSocialSecurityTaxAmountYTD)));
        $('#spanEmployerMedicareTaxAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerMedicareTaxAmount)));
        $('#spanEmployerMedicareTaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerMedicareTaxAmountYTD)));
        $('#spanEmployerSUITaxAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerSUITaxAmount)));
        $('#spanEmployerSUITaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerSUITaxAmountYTD)));
        $('#spanEmployerAdminAssessmentTaxAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerAdminAssessmentTaxAmount)));
        $('#spanEmployerAdminAssessmentTaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerAdminAssessmentTaxAmountYTD)));
        $('#spanTotalEmployerTax').html(_.escape(accounting.formatMoney(dtoPayCheck.TotalEmployerTax)));
        $('#spanTotalEmployerTaxYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.TotalEmployerTaxYTD)));
        $('.state').html(_.escape(dtoPayCheck.StateCode));
        var html = '';
        if (dtoPayCheck.Addition != '') {
            $(dtoPayCheck.Addition).find('additions').each(function () {
                var $entry = $(this);                
                html += '<tr>';
                html += '<td style="width:20%;text-align:left;padding-left:5px;">';
                html += $entry.attr('paystubname');
                html += '</td>';
                html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
                if ($entry.attr('ValueIn') == 'Hours') {
                    html += parseFloat($entry.attr('Hours')).toFixed(2);
                }        
                html += '</td>';
                html += '<td style="width:20%; text-align:right;">';
                if ($entry.attr('ValueIn') == 'Hours') {
                    html +=  accounting.formatMoney($entry.attr('PayRatePerHour'));
                }  
                html += '</td>';
                html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
                html += accounting.formatMoney($entry.attr('amount'));
                html += '</td>';
                html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
                html += accounting.formatMoney($entry.attr('YTD')) + '&nbsp; &nbsp;';
                html += '</td>';
                html += '</tr>';               
            })
            $('#tblMain').append(html);
        }
        html = '';
        if (dtoPayCheck.Deduction != '') {
            $(dtoPayCheck.Deduction).find('deductions').each(function () {
                var $entry = $(this);
                html += '<tr id="' + $entry.attr('PayStubId') + '" taxable="' + $entry.attr('taxable') + '">';
                html += '<td style="text-align:left;padding-left:5px;">';
                html += $entry.attr('paystubname');
                html += '</td>';
                html += '<td style="text-align:right;">';
                html +=  accounting.formatMoney($entry.attr('amount'));
                html += '</td>';
                html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
                html += accounting.formatMoney($entry.attr('YTD'))  + '&nbsp; &nbsp;';
                html += '</td>';
                html += '</tr>';
            })
        }
        $('#tblDeduction').append(html);
    }
}
function Edit() {
    window.location = "/Client/Main.html#EditPayCheck:" + $('#hdnPayCheckId').val();
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
