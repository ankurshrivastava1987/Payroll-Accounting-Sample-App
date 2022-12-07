CheckPageRequest();
app.page("EditPayCheck", function () {
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
        $('#hdnPayCheckId').val(dtoPayCheck.PayCheckId);       
        $('#spanName').html('ADVICE OF DEPOSIT');       
        $('#hdnPayCheckMainId').val(dtoPayCheck.PayCheckMainId);
        $('#hdnPayScheduleId').val(dtoPayCheck.PayScheduleId);
        $('#hdnEmployeeId').val(dtoPayCheck.EmployeeId);
        $('#hdnNotes').val(dtoPayCheck.Notes);
        $('#hdnPayCheckType').val(dtoPayCheck.PayCheckType);
        if (dtoPayCheck.PayPeriod.trim() != '') {
            $('#spanPayPeriod').html(_.escape(dtoPayCheck.PayPeriod));
            $('#divPayPeriod').removeClass('hide');
        }
        if ((dtoPayCheck.PayCheckType != 2) && (dtoPayCheck.PayCheckType != 3))
        {
            $('#tblDeduction').removeClass('hide');
            $('#trRegularPay').removeClass('hide');
            $('#trOTPay').removeClass('hide');
            $('#trDoubleOTPay').removeClass('hide');
            $('#trSickPay').removeClass('hide');
            $('#trVacationPay').removeClass('hide');
        }
        $('#hdnSupplementalTaxRate').val(dtoPayCheck.SupplementalTaxRate);
        $('#hdnFederalTaxRate').val(dtoPayCheck.FederalTaxRate);
        $('#hdnNetToGross').val(dtoPayCheck.NetToGross);
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
        $('#spanPayPeriod').html(_.escape(dtoPayCheck.PayPeriod));
        $('#spanNetPayCheck').html(_.escape(accounting.formatMoney(dtoPayCheck.NetPayCheck)));
        $('#spanPayDate').html(_.escape(FormatDateUTC(dtoPayCheck.PayDate)));       
        if (dtoPayCheck.NetToGross) {
            $('#spanPaidByEmployerAmount').attr('oldvalue', dtoPayCheck.PaidByEmployerAmount);
            $('#spanPaidByEmployerAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.PaidByEmployerAmount)));
            $('#spanPaidByEmployerAmountYTD').attr('oldvalue', dtoPayCheck.PaidByEmployerYTD);
            $('#spanPaidByEmployerAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.PaidByEmployerYTD)));
            $('#trPaidByEmployer').removeClass('hide');
        }
        $('#txtRegularHours').val(_.escape(accounting.toFixed(dtoPayCheck.RegularHours, 2)));
        $('#spanRegularHours').html(_.escape(accounting.toFixed(dtoPayCheck.RegularHours, 2)));
        if ((dtoPayCheck.PayCheckType == 2) || (dtoPayCheck.PayCheckType == 3)) {
            $('#spanRegularHours').removeClass('hide');
        }
        else {
            $('#txtRegularHours').removeClass('hide');
        }
        $('#txtPayRate').val(_.escape(accounting.formatMoney(dtoPayCheck.PayRate)));
        $('#spanPayRate').html(_.escape(accounting.formatMoney(dtoPayCheck.PayRate)));
        if ((dtoPayCheck.PayCheckType == 2) || (dtoPayCheck.PayCheckType == 3)) {
            $('#spanPayRate').removeClass('hide');
        }
        else {
            $('#txtPayRate').removeClass('hide');
        }
        $('#spanRegularAmount').attr('oldvalue', dtoPayCheck.RegularAmount);
        $('#spanRegularAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.RegularAmount)));
        $('#spanRegularAmountYTD').attr('oldvalue', dtoPayCheck.AmountPaidYTD);
        $('#spanRegularAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.AmountPaidYTD)));

        $('#txtOTHours').val(_.escape(accounting.toFixed(dtoPayCheck.OTHours, 2)));
        $('#spanOTHours').html(_.escape(accounting.toFixed(dtoPayCheck.OTHours, 2)));
        if ((dtoPayCheck.PayCheckType == 2) || (dtoPayCheck.PayCheckType == 3)) {
            $('#spanOTHours').removeClass('hide');
        }
        else {
            $('#txtOTHours').removeClass('hide');
        }
        $('#txtOTRate').val(_.escape(accounting.formatMoney(dtoPayCheck.OTRate)));
        $('#spanOTRate').html(_.escape(accounting.formatMoney(dtoPayCheck.OTRate)));
        if ((dtoPayCheck.PayCheckType == 2) || (dtoPayCheck.PayCheckType == 3)) {
            $('#spanOTRate').removeClass('hide');
        }
        else {
            $('#txtOTRate').removeClass('hide');
        }
        $('#spanOTAmount').attr('oldvalue', dtoPayCheck.OTAmount);
        $('#spanOTAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.OTAmount)));
        $('#spanOTAmountYTD').attr('oldvalue', dtoPayCheck.OTAmountYTD);
        $('#spanOTAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.OTAmountYTD)));

        $('#txtDoubleOTHours').val(_.escape(accounting.toFixed(dtoPayCheck.DoubleOTHours, 2)));
        $('#spanDoubleOTHours').html(_.escape(accounting.toFixed(dtoPayCheck.DoubleOTHours, 2)));
        if ((dtoPayCheck.PayCheckType == 2) || (dtoPayCheck.PayCheckType == 3)) {
            $('#spanDoubleOTHours').removeClass('hide');
        }
        else {
            $('#txtDoubleOTHours').removeClass('hide');
        }
        $('#txtDoubleOTRate').val(_.escape(accounting.formatMoney(dtoPayCheck.DoubleOTRate)));
        $('#spanDoubleOTRate').html(_.escape(accounting.formatMoney(dtoPayCheck.DoubleOTRate)));
        if ((dtoPayCheck.PayCheckType == 2) || (dtoPayCheck.PayCheckType == 3)) {
            $('#spanDoubleOTRate').removeClass('hide');
        }
        else {
            $('#txtDoubleOTRate').removeClass('hide');
        }
        $('#spanDoubleOTAmount').attr('oldvalue', dtoPayCheck.DoubleOTAmount);
        $('#spanDoubleOTAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.DoubleOTAmount)));
        $('#spanDoubleOTAmountYTD').attr('oldvalue', dtoPayCheck.DoubleOTAmountYTD);
        $('#spanDoubleOTAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.DoubleOTAmountYTD)));

        $('#txtSickHours').val(_.escape(accounting.toFixed(dtoPayCheck.SickHours, 2)));
        $('#spanSickHours').html(_.escape(accounting.toFixed(dtoPayCheck.SickHours, 2)));
        if ((dtoPayCheck.PayCheckType == 2) || (dtoPayCheck.PayCheckType == 3)) {
            $('#spanSickHours').removeClass('hide');
        }
        else {
            $('#txtSickHours').removeClass('hide');
        }
        $('#txtSickRate').val(_.escape(accounting.formatMoney(dtoPayCheck.SickRate)));
        $('#spanSickRate').html(_.escape(accounting.formatMoney(dtoPayCheck.SickRate)));
        if ((dtoPayCheck.PayCheckType == 2) || (dtoPayCheck.PayCheckType == 3)) {
            $('#spanSickRate').removeClass('hide');
        }
        else {
            $('#txtSickRate').removeClass('hide');
        }
        $('#spanSickAmount').attr('oldvalue', dtoPayCheck.SickAmount);
        $('#spanSickAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.SickAmount)));
        $('#spanSickAmountYTD').attr('oldvalue', dtoPayCheck.SickAmountYTD);
        $('#spanSickAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.SickAmountYTD)));

        $('#txtVacationHours').val(_.escape(accounting.toFixed(dtoPayCheck.VacationHours, 2)));
        $('#spanVacationHours').html(_.escape(accounting.toFixed(dtoPayCheck.VacationHours, 2)));
        if ((dtoPayCheck.PayCheckType == 2) || (dtoPayCheck.PayCheckType == 3)) {
            $('#spanVacationHours').removeClass('hide');
        }
        else {
            $('#txtVacationHours').removeClass('hide');
        }
        $('#txtVacationRate').val(_.escape(accounting.formatMoney(dtoPayCheck.VacationRate)));
        $('#spanVacationRate').html(_.escape(accounting.formatMoney(dtoPayCheck.VacationRate)));
        if ((dtoPayCheck.PayCheckType == 2) || (dtoPayCheck.PayCheckType == 3)) {
            $('#spanVacationRate').removeClass('hide');
        }
        else {
            $('#txtVacationRate').removeClass('hide');
        }
        $('#spanVacationAmount').attr('oldvalue', dtoPayCheck.VacationAmount);
        $('#spanVacationAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.VacationAmount)));
        $('#spanVacationAmountYTD').attr('oldvalue', dtoPayCheck.VacationAmountYTD);
        $('#spanVacationAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.VacationAmountYTD)));

        $('#txtFederalTaxAmount').attr('oldvalue', dtoPayCheck.FederalTaxAmount);
        $('#txtFederalTaxAmount').val(_.escape(accounting.formatMoney(dtoPayCheck.FederalTaxAmount)));
        $('#spanFederalTaxAmountYTD').attr('oldvalue', dtoPayCheck.FederalTaxAmountYTD);
        $('#spanFederalTaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.FederalTaxAmountYTD)));
        $('#spanSocialSecurityTaxAmount').attr('oldvalue', dtoPayCheck.SocialSecurityTaxAmount);
        $('#spanSocialSecurityTaxAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.SocialSecurityTaxAmount)));
        $('#spanSocialSecurityTaxAmountYTD').attr('oldvalue', dtoPayCheck.SocialSecurityTaxAmountYTD);
        $('#spanSocialSecurityTaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.SocialSecurityTaxAmountYTD)));
        $('#spanMedicareTaxAmount').attr('oldvalue', dtoPayCheck.MedicareTaxAmount);
        $('#spanMedicareTaxAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.MedicareTaxAmount)));
        $('#spanMedicareTaxAmountYTD').attr('oldvalue', dtoPayCheck.MedicareTaxAmountYTD);
        $('#spanMedicareTaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.MedicareTaxAmountYTD)));

        $('#txtStateTaxAmount').attr('oldvalue', dtoPayCheck.StateTaxAmount);
        $('#txtStateTaxAmount').val(_.escape(accounting.formatMoney(dtoPayCheck.StateTaxAmount)));
        $('#spanStateTaxAmountYTD').attr('oldvalue', dtoPayCheck.StateTaxAmountYTD);
        $('#spanStateTaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.StateTaxAmountYTD)));
        $('#txtCountyTaxAmount').attr('oldvalue', dtoPayCheck.CountyTaxAmount);
        $('#txtCountyTaxAmount').val(_.escape(accounting.formatMoney(dtoPayCheck.CountyTaxAmount)));
        $('#spanCountyTaxAmountYTD').attr('oldvalue', dtoPayCheck.CountyTaxAmountYTD);
        $('#spanCountyTaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.CountyTaxAmountYTD)));
        $('#spanTotalPaid').html(_.escape(accounting.formatMoney(dtoPayCheck.TotalPay)));
        $('#spanTotalPaidYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.TotalPayYTD)));        
        $('#spanDeductions').html(_.escape(accounting.formatMoney(dtoPayCheck.Deductions)));
        $('#spanDeductionsYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.DeductionsYTD)));
        $('#spanTax').html(_.escape(accounting.formatMoney(dtoPayCheck.Tax)));
        $('#spanTaxYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.TaxYTD)));
        $('#spanNetPayCheckSummary').html(_.escape(accounting.formatMoney(dtoPayCheck.NetPayCheck)));       
        $('#spanEmployerFUTATaxAmount').attr('oldvalue',dtoPayCheck.EmployerFUTATaxAmount);
        $('#spanEmployerFUTATaxAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerFUTATaxAmount)));
        $('#spanEmployerFUTATaxAmountYTD').attr('oldvalue', dtoPayCheck.EmployerFUTATaxAmountYTD);
        $('#spanEmployerFUTATaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerFUTATaxAmountYTD)));
        $('#spanEmployerSocialSecurityTaxAmount').attr('oldvalue', dtoPayCheck.EmployerSocialSecurityTaxAmount);
        $('#spanEmployerSocialSecurityTaxAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerSocialSecurityTaxAmount)));
        $('#spanEmployerSocialSecurityTaxAmountYTD').attr('oldvalue', dtoPayCheck.EmployerSocialSecurityTaxAmountYTD);
        $('#spanEmployerSocialSecurityTaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerSocialSecurityTaxAmountYTD)));
        $('#spanEmployerMedicareTaxAmount').attr('oldvalue', dtoPayCheck.EmployerMedicareTaxAmount);
        $('#spanEmployerMedicareTaxAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerMedicareTaxAmount)));
        $('#spanEmployerMedicareTaxAmountYTD').attr('oldvalue', dtoPayCheck.EmployerMedicareTaxAmountYTD);
        $('#spanEmployerMedicareTaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerMedicareTaxAmountYTD)));
        $('#spanEmployerSUITaxAmount').attr('oldvalue', dtoPayCheck.EmployerSUITaxAmount);
        $('#spanEmployerSUITaxAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerSUITaxAmount)));
        $('#spanEmployerSUITaxAmountYTD').attr('oldvalue', dtoPayCheck.EmployerSUITaxAmountYTD);
        $('#spanEmployerSUITaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerSUITaxAmountYTD)));
        //$('#spanEmployerAdminAssessmentTaxAmount').attr('oldvalue', dtoPayCheck.EmployerAdminAssessmentTaxAmount);
        //$('#spanEmployerAdminAssessmentTaxAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerAdminAssessmentTaxAmount)));
        //$('#spanEmployerAdminAssessmentTaxAmountYTD').attr('oldvalue', dtoPayCheck.EmployerAdminAssessmentTaxAmountYTD);
        //$('#spanEmployerAdminAssessmentTaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerAdminAssessmentTaxAmountYTD)));
        $('#spanTotalEmployerTax').html(_.escape(accounting.formatMoney(dtoPayCheck.TotalEmployerTax)));
        $('#spanTotalEmployerTaxYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.TotalEmployerTaxYTD)));
        $('.state').html(_.escape(dtoPayCheck.StateCode));
        //if (dtoPayCheck.PayType === 'Hourly') {
        //    $('#spanPayType1').html('Per Hour');
        //}
        //else {
        //    if (dtoPayCheck.PayScheduleRecurrenceCode === 'DA') {
        //        $('#spanPayType1').html('Per Day');
        //    }
        //    else if (dtoPayCheck.PayScheduleRecurrenceCode === 'WW') {
        //        $('#spanPayType1').html('Per Week');
        //    }
        //    else if (dtoPayCheck.PayScheduleRecurrenceCode === 'BW') {
        //        $('#spanPayType1').html('Per Bi-Week');
        //    }
        //    else if (dtoPayCheck.PayScheduleRecurrenceCode === 'SM') {
        //        $('#spanPayType1').html('Per Semi-Month');
        //    }
        //    else if (dtoPayCheck.PayScheduleRecurrenceCode === 'MM') {
        //        $('#spanPayType1').html('Per Month');
        //    }
        //    else if (dtoPayCheck.PayScheduleRecurrenceCode === 'QQ') {
        //        $('#spanPayType1').html('Per Quarter');
        //    }
        //    else if (dtoPayCheck.PayScheduleRecurrenceCode === 'SA') {
        //        $('#spanPayType1').html('Per Semi-Annual');
        //    }
        //    else if (dtoPayCheck.PayScheduleRecurrenceCode === 'AA') {
        //        $('#spanPayType1').html('Per Year');
        //    }
        //}
        var html = '';
        if (dtoPayCheck.Addition != '') {
            $(dtoPayCheck.Addition).find('additions').each(function () {
                var $entry = $(this);
                html += '<tr id="' + $entry.attr('PayStubId') + '" taxable="' + $entry.attr('taxable') + '" valuein="' + $entry.attr('ValueIn') + '" paystubcode="' + $entry.attr('PayStubCode') + '">';
                html += '<td style="width:20%;text-align:left;padding-left:5px;">';
                html += $entry.attr('paystubname');
                html += '</td>';
                html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
                if ($entry.attr('ValueIn') == 'Hours') {
                    if ((dtoPayCheck.PayCheckType == 2) || (dtoPayCheck.PayCheckType == 3)) {
                        html += '<span>' + $entry.attr('Hours') + '</span>';
                        html += '<input id="' + $entry.attr('PayStubId') + '_CurrentHours" class="form-control decimal CurrentHours hide" style="width:80px;text-align:right" oldvalue="' + $entry.attr('Hours') + '" value="' + $entry.attr('Hours') + '" onblur="CalculateNetAmount()"></input>';
                    }
                    else
                    {
                        html += '<input id="' + $entry.attr('PayStubId') + '_CurrentHours" class="form-control decimal CurrentHours" style="width:80px;text-align:right" oldvalue="' + $entry.attr('Hours') + '" value="' + $entry.attr('Hours') + '" onblur="CalculateNetAmount()"></input>';
                    }
                }               
                html += '</td>';
                html += '<td style=" text-align:right;">';
                if ($entry.attr('ValueIn') == 'Hours') {
                    if ((dtoPayCheck.PayCheckType == 2) || (dtoPayCheck.PayCheckType == 3)) {
                        html += '<span>' + accounting.formatMoney($entry.attr('PayRatePerHour')) + '</span>';
                        html += '<input id="' + $entry.attr('PayStubId') + '_PayRate" class="form-control decimal textbox PayRate hide" style="width:80px;text-align:right" oldvalue="' + $entry.attr('PayRatePerHour') + '" value="' + accounting.formatMoney($entry.attr('PayRatePerHour')) + '" onblur="CalculateNetAmount()"></input>';
                    }
                    else {
                        html += '<input id="' + $entry.attr('PayStubId') + '_PayRate" class="form-control decimal textbox PayRate" style="width:80px;text-align:right" oldvalue="' + $entry.attr('PayRatePerHour') + '" value="' + accounting.formatMoney($entry.attr('PayRatePerHour')) + '" onblur="CalculateNetAmount()"></input>';
                    }                    
                }  
                html += '</td>';
                html += '<td style="width:20%; text-align:right;">';
                if ($entry.attr('ValueIn') == 'Hours') {
                    html += '<span id="' + $entry.attr('PayStubId') + '_Current" class="Current" oldvalue="' + $entry.attr('amount') + '">' + accounting.formatMoney($entry.attr('amount')) + '</span>';
                }
                else {
                    if ((dtoPayCheck.PayCheckType == 1) || ((dtoPayCheck.PayCheckType == 2) && ($entry.attr('PayStubCode') == 'BONUS')) || ((dtoPayCheck.PayCheckType == 3) && ($entry.attr('PayStubCode') == 'COM'))) {
                        html += '<input id="' + $entry.attr('PayStubId') + '_Current" class="form-control decimal textbox Current" style="width:80px;text-align:right" oldvalue="' + $entry.attr('amount') + '" value="' + accounting.formatMoney($entry.attr('amount')) + '" onblur="CalculateNetAmount()"></input>';
                    }
                    else {
                        html += '<span>' + accounting.formatMoney($entry.attr('amount')) + '</span>';
                        html += '<input id="' + $entry.attr('PayStubId') + '_Current" class="form-control decimal textbox Current hide" style="width:80px;text-align:right" oldvalue="' + $entry.attr('amount') + '" value="' + accounting.formatMoney($entry.attr('amount')) + '" onblur="CalculateNetAmount()"></input>';

                    }
                }
                html += '</td>';               
                html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
                html += '<span id="' + $entry.attr('PayStubId') + '_YTD" oldvalue="' + $entry.attr('YTD') + '">' + accounting.formatMoney($entry.attr('YTD')) + '</span>&nbsp; &nbsp;';
                html += '</td>';
                html += '</tr>';
            })            
        }
        $('#tblMain').append(html);
        //if (($('#hdnPayCheckType').val() != 2) && ($('#hdnPayCheckType').val() != 3)) {
            AddRowPlus();
        //}
        html = '';
        if (dtoPayCheck.Deduction != '') {
            $(dtoPayCheck.Deduction).find('deductions').each(function () {
                var $entry = $(this);
                html += '<tr id="' + $entry.attr('PayStubId') + '" taxable="' + $entry.attr('taxable') + '">';
                html += '<td style="text-align:left;padding-left:5px;">';
                html += $entry.attr('paystubname');
                html += '</td>';              
                html += '<td style="text-align:right;">';
                html += '<input id="' + $entry.attr('PayStubId') + '_Current" class="form-control decimal textbox" style="width:100px;text-align:right" oldvalue="' + $entry.attr('amount') + '" value="' + accounting.formatMoney($entry.attr('amount')) + '" onblur="CalculateNetAmount2()"></input>';
                html += '</td>'; 
                html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
                html += '<span id="' + $entry.attr('PayStubId') + '_YTD" oldvalue="' + $entry.attr('YTD') + '">' + accounting.formatMoney($entry.attr('YTD')) + '</span>&nbsp; &nbsp;';
                html += '</td>';   
                html += '</tr>';
            })            
        }
        $('#tblDeduction').append(html);
        AddRowMinus();
        FocusInFocusOut();
    }
}
function AddRowPlus()
{
    var HideRow = false;
    if (($('#hdnPayCheckType').val() == 2) || ($('#hdnPayCheckType').val() == 3)) {
        HideRow = true;
    }
    var SelectedPayStubs = [];
    var rowLength = document.getElementById('tblMain').rows.length;
    for (var i = 2; i < rowLength; i++) { 
        if ($(document.getElementById('tblMain').rows[i]).attr('id') != undefined) {
            SelectedPayStubs.push($(document.getElementById('tblMain').rows[i]).attr('id'));
        }
    }

    var params = { ClientId: $.localStorage.get('ClientId') };
    var PayStubs = CallService1('Client/PayStubService.svc', 'GetLookup', params);
    var html = '';
    html += '<tr id="0_Add" class="' + (HideRow ? 'hide': '') + '">';
    html += '<td style="width:20%;text-align:left;padding-left:5px;">';
    html += '<span id="0_Add_Name"><span><a id="0_Add_AddPayStub" href="javascript:void(0)" class="link" onclick="AddPayStub()">Add Pay Stub</a><select id="0_Add_Select" class="form-control hide target" style="width:150px">';
    html += '<option value="0"></option>';
    if (PayStubs != undefined) {
        for (var i = 0; i < PayStubs.length; i++) {
            if ((SelectedPayStubs.indexOf(PayStubs[i]['PayStubId']) == -1) && (PayStubs[i]['PayStubType'] == 'Addition') && (PayStubs[i]['ValueIn'] == 'Amount')) {
                html += '<option value="' + PayStubs[i]['PayStubId'] + '">' + PayStubs[i]['PayStubName'] + '</option>';
            }
        }
    }
    html += '</select>';
    html += '</td>';
    html += '<td colspan="2" style="padding: 5px 0px 5px 0px; text-align:right;">';
    html += '';
    html += '</td>';
    html += '<td style="width:20%; text-align:right;">';
    html += '<input id="0_Add_Current" class="form-control decimal textbox Current hide" style="width:80px;text-align:right" oldvalue="0" value="$0.00" onblur="CalculateNetAmount()"></input>';
    html += '</td>';
    html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
    html += '<span id="0_Add_YTD" oldvalue="0" class="hide">$0.00</span>&nbsp; &nbsp;';
    html += '</td>';
    html += '</tr>';
    $('#tblMain').append(html);
    $(".target").change(function () {
        var PayStubId = $('#0_Add_Select option:selected').val();
        if (PayStubId > 0) {          
            $('#0_Add_Current').removeClass('hide');
            $('#0_Add_YTD').removeClass('hide');
        }
        else {
            $('#0_Add_Current').addClass('hide');
            $('#0_Add_YTD').addClass('hide');
        }
    });    
    $("#0_Add_Current").blur(function () {          
        var PayStubId = $('#0_Add_Select option:selected').val();   
        if (PayStubId > 0) {
            var params = { ClientId: $.localStorage.get('ClientId'), PayStubId: PayStubId};
            var dtoPayStub = CallService1('Client/PayStubService.svc', 'GetObject', params);
            $('#0_Add').attr('taxable', dtoPayStub.Taxable? '1': '0');
            $('#0_Add').attr('id', PayStubId);
            $('#0_Add_AddPayStub').attr('id', PayStubId + '_Add_AddPayStub');
            $('#0_Add_Name').html($('#0_Add_Select option:selected').text());
            $('#0_Add_Name').attr('id', PayStubId + '_Name');
            $('#0_Add_Select').attr('id', PayStubId + '_Select');
            $('#0_Add_Current').attr('id', PayStubId + '_Current');
            $('#0_Add_YTD').attr('id', PayStubId + '_YTD');
            AddRowPlus();
            CalculateNetAmount();
        }
    }); 
    FocusInFocusOut();   
}
function AddPayStub()
{
    $('#0_Add_AddPayStub').addClass('hide');
    $('#0_Add_Select').removeClass('hide');
}
function AddRowMinus() {
    var SelectedPayStubs = [];
    var rowLength = document.getElementById('tblDeduction').rows.length;
    for (var i = 1; i < rowLength; i++) {
        if ($(document.getElementById('tblDeduction').rows[i]).attr('id') != undefined) {
            SelectedPayStubs.push($(document.getElementById('tblDeduction').rows[i]).attr('id'));
        }
    }

    var params = { ClientId: $.localStorage.get('ClientId') };
    var PayStubs = CallService1('Client/PayStubService.svc', 'GetLookup', params);
    var html = '';
    html += '<tr id="0_Minus">';
    html += '<td style="text-align:left;padding-left:5px;">';
    html += '<span id="0_Minus_Name"><span><a id="0_Minus_AddPayStub" href="javascript:void(0)" class="link" onclick="AddPayStub1()">Add Pay Stub</a><select id="0_Minus_Select" class="form-control hide target" style="width:150px">';
    html += '<option value="0"></option>';
    if (PayStubs != undefined) {
        for (var i = 0; i < PayStubs.length; i++) {
            if ((SelectedPayStubs.indexOf(PayStubs[i]['PayStubId']) == -1) && (PayStubs[i]['PayStubType'] == 'Deduction') && (PayStubs[i]['ValueIn'] == 'Amount')) {
                html += '<option value="' + PayStubs[i]['PayStubId'] + '">' + PayStubs[i]['PayStubName'] + '</option>';
            }
        }
    }
    html += '</select>';
    html += '</td>';    
    html += '<td style="width:20%; text-align:right;">';
    html += '<input id="0_Minus_Current" class="form-control decimal textbox hide" style="width:100px;text-align:right" oldvalue="0" value="$0.00" onblur="CalculateNetAmount2()"></input>';
    html += '</td>';
    html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
    html += '<span id="0_Minus_YTD" oldvalue="0" class="hide">$0.00</span>&nbsp; &nbsp;';
    html += '</td>';
    html += '</tr>';
    $('#tblDeduction').append(html);
    $(".target").change(function () {
        var PayStubId = $('#0_Minus_Select option:selected').val();
        if (PayStubId > 0) {
            $('#0_Minus_Current').removeClass('hide');
            $('#0_Minus_YTD').removeClass('hide');
        }
        else {
            $('#0_Minus_Current').addClass('hide');
            $('#0_Minus_YTD').addClass('hide');
        }
    });
    $("#0_Minus_Current").blur(function () {
        var PayStubId = $('#0_Minus_Select option:selected').val();
        if (PayStubId > 0) {
            var params = { ClientId: $.localStorage.get('ClientId'), PayStubId: PayStubId };
            var dtoPayStub = CallService1('Client/PayStubService.svc', 'GetObject', params);
            $('#0_Minus').attr('taxable', dtoPayStub.Taxable ? '1' : '0');
            $('#0_Minus').attr('id', PayStubId);
            $('#0_Minus_AddPayStub').attr('id', PayStubId + '_Minus_AddPayStub');
            $('#0_Minus_Name').html($('#0_Minus_Select option:selected').text());
            $('#0_Minus_Name').attr('id', PayStubId + '_Name');
            $('#0_Minus_Select').attr('id', PayStubId + '_Select');
            $('#0_Minus_Current').attr('id', PayStubId + '_Current');
            $('#0_Minus_YTD').attr('id', PayStubId + '_YTD');
            AddRowMinus();
            CalculateNetAmount2();
        }
    });
    FocusInFocusOut();
}
function AddPayStub1() {
    $('#0_Minus_AddPayStub').addClass('hide');
    $('#0_Minus_Select').removeClass('hide');
}
function CalculateNetAmount() {
    //if ($('#spanPayType1').html() === 'Per Hour') {
    //    $('#spanRegularAmount').html(accounting.formatMoney(parseFloat($('#txtPayRate').val().replace('$', '').replace(',', '')) * parseFloat($("#txtRegularHours").val())));
    //    $('#spanPayRatePerHour').html(parseFloat($('#txtPayRate').val().replace('$', '').replace(',', '')));
    //}
    //else {
    //    if ($('#spanPayType1').html() === 'Per Day') {
    //        $('#spanRegularAmount').html(accounting.formatMoney((parseFloat($('#txtPayRate').val().replace('$', '').replace(',', '')) / 8) * parseFloat($("#txtRegularHours").val())));
    //        $('#spanPayRatePerHour').html(parseFloat($('#txtPayRate').val().replace('$', '').replace(',', '')) / 8);
    //    }
    //    else if ($('#spanPayType1').html() === 'Per Week') {
    //        $('#spanRegularAmount').html(accounting.formatMoney((parseFloat($('#txtPayRate').val().replace('$', '').replace(',', '')) / 40) * parseFloat($("#txtRegularHours").val())));
    //        $('#spanPayRatePerHour').html(parseFloat($('#txtPayRate').val().replace('$', '').replace(',', '')) / 40);
    //    }
    //    else if ($('#spanPayType1').html() === 'Per Bi-Week') {
    //        $('#spanRegularAmount').html(accounting.formatMoney((parseFloat($('#txtPayRate').val().replace('$', '').replace(',', '')) / 80) * parseFloat($("#txtRegularHours").val())));
    //        $('#spanPayRatePerHour').html(parseFloat($('#txtPayRate').val().replace('$', '').replace(',', '')) / 80);
    //    }
    //    else if ($('#spanPayType1').html() === 'Per Semi-Month') {
    //        $('#spanRegularAmount').html(accounting.formatMoney((parseFloat($('#txtPayRate').val().replace('$', '').replace(',', '')) / 88) * parseFloat($("#txtRegularHours").val())));
    //        $('#spanPayRatePerHour').html(parseFloat($('#txtPayRate').val().replace('$', '').replace(',', '')) / 88);
    //    }
    //    else if ($('#spanPayType1').html() === 'Per Month') {
    //        $('#spanRegularAmount').html(accounting.formatMoney((parseFloat($('#txtPayRate').val().replace('$', '').replace(',', '')) / 176) * parseFloat($("#txtRegularHours").val())));
    //        $('#spanPayRatePerHour').html(parseFloat($('#txtPayRate').val().replace('$', '').replace(',', '')) / 176);
    //    }
    //    else if ($('#spanPayType1').html() === 'Per Quarter') {
    //        $('#spanRegularAmount').html(accounting.formatMoney((parseFloat($('#txtPayRate').val().replace('$', '').replace(',', '')) / 528) * parseFloat($("#txtRegularHours").val())));
    //        $('#spanPayRatePerHour').html(parseFloat($('#txtPayRate').val().replace('$', '').replace(',', '')) / 528);
    //    }
    //    else if ($('#spanPayType1').html() === 'Per Semi-Annual') {
    //        $('#spanRegularAmount').html(accounting.formatMoney((parseFloat($('#txtPayRate').val().replace('$', '').replace(',', '')) / 1056) * parseFloat($("#txtRegularHours").val())));
    //        $('#spanPayRatePerHour').html(parseFloat($('#txtPayRate').val().replace('$', '').replace(',', '')) / 1056);
    //    }
    //    else if ($('#spanPayType1').html() === 'Per Year') {
    //        $('#spanRegularAmount').html(accounting.formatMoney((parseFloat($('#txtPayRate').val().replace('$', '').replace(',', '')) / 2112) * parseFloat($("#txtRegularHours").val())));
    //        $('#spanPayRatePerHour').html(parseFloat($('#txtPayRate').val().replace('$', '').replace(',', '')) / 2112);
    //    }
    //}
    $('#spanRegularAmount').html(accounting.formatMoney($('#txtRegularHours').val() * $('#txtPayRate').val().replace('$', '').replace(',', '')));
    $('#spanRegularAmountYTD').html(_.escape(accounting.formatMoney(parseFloat($('#spanRegularAmountYTD').attr('oldvalue')) - parseFloat($('#spanRegularAmount').attr('oldvalue')) + parseFloat($('#spanRegularAmount').html().replace('$', '').replace(',', '')))));
    $('#spanOTAmount').html(accounting.formatMoney($('#txtOTHours').val() * $('#txtOTRate').val().replace('$', '').replace(',', '')));
    $('#spanOTAmountYTD').html(_.escape(accounting.formatMoney(parseFloat($('#spanOTAmountYTD').attr('oldvalue')) - parseFloat($('#spanOTAmount').attr('oldvalue')) + parseFloat($('#spanOTAmount').html().replace('$', '').replace(',', '')))));
    $('#spanDoubleOTAmount').html(accounting.formatMoney($('#txtDoubleOTHours').val() * $('#txtDoubleOTRate').val().replace('$', '').replace(',', '')));
    $('#spanDoubleOTAmountYTD').html(_.escape(accounting.formatMoney(parseFloat($('#spanDoubleOTAmountYTD').attr('oldvalue')) - parseFloat($('#spanDoubleOTAmount').attr('oldvalue')) + parseFloat($('#spanDoubleOTAmount').html().replace('$', '').replace(',', '')))));
    $('#spanSickAmount').html(accounting.formatMoney($('#txtSickHours').val() * $('#txtSickRate').val().replace('$', '').replace(',', '')));
    $('#spanSickAmountYTD').html(_.escape(accounting.formatMoney(parseFloat($('#spanSickAmountYTD').attr('oldvalue')) - parseFloat($('#spanSickAmount').attr('oldvalue')) + parseFloat($('#spanSickAmount').html().replace('$', '').replace(',', '')))));
    $('#spanVacationAmount').html(accounting.formatMoney($('#txtVacationHours').val() * $('#txtVacationRate').val().replace('$', '').replace(',', '')));
    $('#spanVacationAmountYTD').html(_.escape(accounting.formatMoney(parseFloat($('#spanVacationAmountYTD').attr('oldvalue')) - parseFloat($('#spanVacationAmount').attr('oldvalue')) + parseFloat($('#spanVacationAmount').html().replace('$', '').replace(',', '')))));

    var TaxableAmount = parseFloat($('#spanRegularAmount').html().replace('$', '').replace(',', ''));
    TaxableAmount += parseFloat($('#spanOTAmount').html().replace('$', '').replace(',', '')) + parseFloat($('#spanDoubleOTAmount').html().replace('$', '').replace(',', '')) + parseFloat($('#spanSickAmount').html().replace('$', '').replace(',', '')) + parseFloat($('#spanVacationAmount').html().replace('$', '').replace(',', ''));
    
    var NetAmount = TaxableAmount;
    var NetAmountYTD = parseFloat($('#spanRegularAmountYTD').html().replace('$', '').replace(',', ''));
    NetAmountYTD += parseFloat($('#spanOTAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanDoubleOTAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanSickAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanVacationAmountYTD').html().replace('$', '').replace(',', ''));
    $('#txtFederalTaxAmount').val('$0.00');
    $('#txtStateTaxAmount').val('$0.00');
    $('#spanSocialSecurityTaxAmount').html('$0.00');
    $('#spanMedicareTaxAmount').html('$0.00');    
    var rowLength = document.getElementById('tblMain').rows.length;    
    for (var i = 7; i < rowLength - 1; i++) {        
        if ($(document.getElementById('tblMain').rows[i]).attr('valuein') == 'Hours') {
            $(document.getElementById('tblMain').rows[i]).find('.Current').html(accounting.formatMoney($(document.getElementById('tblMain').rows[i]).find('.CurrentHours').val().replace('$', '').replace(',', '') * $(document.getElementById('tblMain').rows[i]).find('.PayRate').val().replace('$', '').replace(',', '')));
        }       
        var cell = $(document.getElementById('tblMain').rows[i]).find('.Current');             
        $('#' + $(document.getElementById('tblMain').rows[i]).attr('id') + '_YTD').html(accounting.formatMoney(parseFloat($('#' + $(document.getElementById('tblMain').rows[i]).attr('id') + '_YTD').attr('oldvalue')) - parseFloat(cell.attr('oldvalue')) + parseFloat($(document.getElementById('tblMain').rows[i]).attr('valuein') == 'Hours' ? cell.html().replace('$', '').replace(',', ''): cell.val().replace('$', '').replace(',', ''))));                 
        if ($(document.getElementById('tblMain').rows[i]).attr('taxable') == 1) {
            if ($(document.getElementById('tblMain').rows[i]).attr('valuein') == 'Hours') {
                TaxableAmount += parseFloat(cell.html().replace('$', '').replace(',', ''));
            }
            else
            {
                TaxableAmount += parseFloat(cell.val().replace('$', '').replace(',', ''));
            }
        }  
        if ($(document.getElementById('tblMain').rows[i]).attr('valuein') == 'Hours') {
            NetAmount += parseFloat(cell.html().replace('$', '').replace(',', ''));
        }
        else {
            NetAmount += parseFloat(cell.val().replace('$', '').replace(',', ''));
        }
        NetAmountYTD += parseFloat($('#' + $(document.getElementById('tblMain').rows[i]).attr('id') + '_YTD').html().replace('$', '').replace(',', ''));
    }
    
    var DeductionAmount = 0;
    var DeductionAmountYTD = 0;
    rowLength = document.getElementById('tblDeduction').rows.length;  
    for (var i = 1; i < rowLength-1; i++) {
        var cell = $(document.getElementById('tblDeduction').rows[i]).find('.form-control');
        $('#' + $(document.getElementById('tblDeduction').rows[i]).attr('id') + '_YTD').html(accounting.formatMoney(parseFloat($('#' + $(document.getElementById('tblDeduction').rows[i]).attr('id') + '_YTD').attr('oldvalue')) - parseFloat(cell.attr('oldvalue')) + parseFloat(cell.val().replace('$', '').replace(',', ''))));
        if ($(document.getElementById('tblDeduction').rows[i]).attr('taxable') == 1) {
            TaxableAmount += parseFloat(cell.val().replace('$', '').replace(',', ''));
        }
        //NetAmount -= parseFloat(cell.val().replace('$', '').replace(',', ''));
        //NetAmountYTD -= parseFloat($('#' + $(document.getElementById('tblDeduction').rows[i]).attr('id') + '_YTD').html().replace('$', '').replace(',', ''));
        DeductionAmount += parseFloat(cell.val().replace('$', '').replace(',', ''));
        DeductionAmountYTD += parseFloat($('#' + $(document.getElementById('tblDeduction').rows[i]).attr('id') + '_YTD').html().replace('$', '').replace(',', ''));
    }
    $('#spanDeductions').html(accounting.formatMoney(DeductionAmount));
    $('#spanDeductionsYTD').html(accounting.formatMoney(DeductionAmountYTD));
    $('#spanTotalPaid').html(accounting.formatMoney(NetAmount));
    $('#spanTotalPaidYTD').html(accounting.formatMoney(NetAmountYTD));
    var params = { EmployeeId: $('#hdnEmployeeId').val(), TaxableAmount: TaxableAmount };
    var dtoTax = CallService1('Client/PayCheckService.svc', 'GetTax', params)
    var params = { ClientId: $.localStorage.get('ClientId'), EmployeeId: $('#hdnEmployeeId').val(), PayCheckId: $('#hdnPayCheckId').val(), TaxableAmount: TaxableAmount };
    var SUITaxAmount = CallService1('Client/PayCheckService.svc', 'GetSUITax', params)
    $("#spanEmployerSUITaxAmount").html(accounting.formatMoney(SUITaxAmount));
    $('#spanEmployerSUITaxAmountYTD').html(accounting.formatMoney(parseFloat($('#spanEmployerSUITaxAmountYTD').attr('oldvalue')) - parseFloat($('#spanEmployerSUITaxAmount').attr('oldvalue')) + parseFloat($('#spanEmployerSUITaxAmount').html().replace('$', '').replace(',', ''))));
    $('#spanSocialSecurityTaxAmount').html(accounting.formatMoney(dtoTax.SocialSecurityTaxAmount));
    $('#spanSocialSecurityTaxAmountYTD').html(accounting.formatMoney(parseFloat($('#spanSocialSecurityTaxAmountYTD').attr('oldvalue')) - parseFloat($('#spanSocialSecurityTaxAmount').attr('oldvalue')) + parseFloat($('#spanSocialSecurityTaxAmount').html().replace('$', '').replace(',', ''))));
    $('#spanMedicareTaxAmount').html(accounting.formatMoney(dtoTax.MedicareTaxAmount));
    $('#spanMedicareTaxAmountYTD').html(accounting.formatMoney(parseFloat($('#spanMedicareTaxAmountYTD').attr('oldvalue')) - parseFloat($('#spanMedicareTaxAmount').attr('oldvalue')) + parseFloat($('#spanMedicareTaxAmount').html().replace('$', '').replace(',', ''))));
    $('#spanEmployerSocialSecurityTaxAmount').html(accounting.formatMoney(dtoTax.EmployerSocialSecurityTaxAmount));
    $('#spanEmployerSocialSecurityTaxAmountYTD').html(accounting.formatMoney(parseFloat($('#spanEmployerSocialSecurityTaxAmountYTD').attr('oldvalue')) - parseFloat($('#spanEmployerSocialSecurityTaxAmount').attr('oldvalue')) + parseFloat($('#spanEmployerSocialSecurityTaxAmount').html().replace('$', '').replace(',', ''))));
    $('#spanEmployerMedicareTaxAmount').html(accounting.formatMoney(dtoTax.EmployerMedicareTaxAmount));
    $('#spanEmployerMedicareTaxAmountYTD').html(accounting.formatMoney(parseFloat($('#spanEmployerMedicareTaxAmountYTD').attr('oldvalue')) - parseFloat($('#spanEmployerMedicareTaxAmount').attr('oldvalue')) + parseFloat($('#spanEmployerMedicareTaxAmount').html().replace('$', '').replace(',', ''))));
    $('#spanEmployerFUTATaxAmount').html(accounting.formatMoney(dtoTax.EmployerFUTATaxAmount));
    $('#spanEmployerFUTATaxAmountYTD').html(accounting.formatMoney(parseFloat($('#spanEmployerFUTATaxAmountYTD').attr('oldvalue')) - parseFloat($('#spanEmployerFUTATaxAmount').attr('oldvalue')) + parseFloat($('#spanEmployerFUTATaxAmount').html().replace('$', '').replace(',', ''))));

    var FederalTaxAmount = 0;
    if ($('#hdnSupplementalTaxRate').val() == 'true') {
        FederalTaxAmount = TaxableAmount * $('#hdnFederalTaxRate').val() * 0.01;
    }
    else {
        var params = { EmployeeId: $('#hdnEmployeeId').val(), TaxableAmount: TaxableAmount };
        FederalTaxAmount = CallService1('Client/PayCheckService.svc', 'GetFederalTax', params);
    }
    $('#txtFederalTaxAmount').val(accounting.formatMoney(FederalTaxAmount));
    $('#spanFederalTaxAmountYTD').html(accounting.formatMoney(parseFloat($('#spanFederalTaxAmountYTD').attr('oldvalue')) - parseFloat($('#txtFederalTaxAmount').attr('oldvalue')) + parseFloat($('#txtFederalTaxAmount').val().replace('$', '').replace(',', ''))));
        
    var params = { EmployeeId: $('#hdnEmployeeId').val(), TaxableAmount: TaxableAmount };
    var StateTaxAmount = CallService1('Client/PayCheckService.svc', 'GetStateTax', params);
    $('#txtStateTaxAmount').val(accounting.formatMoney(StateTaxAmount));
    $('#spanStateTaxAmountYTD').html(accounting.formatMoney(parseFloat($('#spanStateTaxAmountYTD').attr('oldvalue')) - parseFloat($('#txtStateTaxAmount').attr('oldvalue')) + parseFloat($('#txtStateTaxAmount').val().replace('$', '').replace(',', ''))));
    $('#spanCountyTaxAmountYTD').html(accounting.formatMoney(parseFloat($('#spanCountyTaxAmountYTD').attr('oldvalue')) - parseFloat($('#txtCountyTaxAmount').attr('oldvalue')) + parseFloat($('#txtCountyTaxAmount').val().replace('$', '').replace(',', ''))));
    $('#spanTax').html(accounting.formatMoney(parseFloat($('#txtFederalTaxAmount').val().replace('$', '').replace(',', '')) + parseFloat($('#spanSocialSecurityTaxAmount').html().replace('$', '').replace(',', '')) + parseFloat($('#spanMedicareTaxAmount').html().replace('$', '').replace(',', '')) + parseFloat($('#txtStateTaxAmount').val().replace('$', '').replace(',', '')) + parseFloat($('#txtCountyTaxAmount').val().replace('$', '').replace(',', ''))));
    $('#spanTaxYTD').html(accounting.formatMoney(parseFloat($('#spanFederalTaxAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanSocialSecurityTaxAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanMedicareTaxAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanStateTaxAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanCountyTaxAmountYTD').html().replace('$', '').replace(',', ''))));
    $('#spanNetPayCheckSummary').html(accounting.formatMoney(parseFloat($('#spanTotalPaid').html().replace('$', '').replace(',', '')) - parseFloat($('#spanDeductions').html().replace('$', '').replace(',', '')) - parseFloat($('#spanTax').html().replace('$', '').replace(',', ''))));
    $('#spanNetPayCheck').html($('#spanNetPayCheckSummary').html());
    $('#spanTotalEmployerTax').html(accounting.formatMoney(parseFloat($('#spanEmployerFUTATaxAmount').html().replace('$', '').replace(',', '')) + parseFloat($('#spanEmployerSocialSecurityTaxAmount').html().replace('$', '').replace(',', '')) + parseFloat($('#spanEmployerMedicareTaxAmount').html().replace('$', '').replace(',', '')) + parseFloat($("#spanEmployerSUITaxAmount").html().replace('$', '').replace(',', ''))));
    $('#spanTotalEmployerTaxYTD').html(accounting.formatMoney(parseFloat($('#spanEmployerFUTATaxAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanEmployerSocialSecurityTaxAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanEmployerMedicareTaxAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($("#spanEmployerSUITaxAmountYTD").html().replace('$', '').replace(',', ''))));
    if ($('#hdnNetToGross').val() == 'true') {
        $('#spanPaidByEmployerAmount').html($('#spanTax').html());       
        $('#spanPaidByEmployerAmountYTD').html(accounting.formatMoney(parseFloat($('#spanPaidByEmployerAmountYTD').attr('oldvalue')) - parseFloat($('#spanPaidByEmployerAmount').attr('oldvalue')) + parseFloat($('#spanPaidByEmployerAmount').html().replace('$', '').replace(',', ''))));                 
        $('#spanNetPayCheck').html(accounting.formatMoney(parseFloat($('#spanNetPayCheck').html().replace('$', '').replace(',', '')) + parseFloat($('#spanTax').html().replace('$', '').replace(',', ''))));
        $('#spanNetPayCheckSummary').html($('#spanNetPayCheck').html());
        $('#spanTotalPaid').html(accounting.formatMoney(parseFloat($('#spanTotalPaid').html().replace('$', '').replace(',', '')) + parseFloat($('#spanTax').html().replace('$', '').replace(',', ''))));
        NetAmountYTD = parseFloat($('#spanRegularAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanOTAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanDoubleOTAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanSickAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanVacationAmountYTD').html().replace('$', '').replace(',', ''));
        rowLength = document.getElementById('tblMain').rows.length;
        for (var i = 7; i < rowLength - 1; i++) {            
            NetAmountYTD += parseFloat($('#' + $(document.getElementById('tblMain').rows[i]).attr('id') + '_YTD').html().replace('$', '').replace(',', ''));
        }
        NetAmountYTD += parseFloat($('#spanPaidByEmployerAmountYTD').html().replace('$', '').replace(',', ''))
        $('#spanTotalPaidYTD').html(accounting.formatMoney(NetAmountYTD));
    }
}
function CalculateNetAmount1() {    
    $('#spanSocialSecurityTaxAmountYTD').html(accounting.formatMoney(parseFloat($('#spanSocialSecurityTaxAmountYTD').attr('oldvalue')) - parseFloat($('#spanSocialSecurityTaxAmount').attr('oldvalue')) + parseFloat($('#spanSocialSecurityTaxAmount').html().replace('$', '').replace(',', ''))));    
    $('#spanMedicareTaxAmountYTD').html(accounting.formatMoney(parseFloat($('#spanMedicareTaxAmountYTD').attr('oldvalue')) - parseFloat($('#spanMedicareTaxAmount').attr('oldvalue')) + parseFloat($('#spanMedicareTaxAmount').html().replace('$', '').replace(',', ''))));
    $('#spanFederalTaxAmountYTD').html(accounting.formatMoney(parseFloat($('#spanFederalTaxAmountYTD').attr('oldvalue')) - parseFloat($('#txtFederalTaxAmount').attr('oldvalue')) + parseFloat($('#txtFederalTaxAmount').val().replace('$', '').replace(',', ''))));   
    $('#spanStateTaxAmountYTD').html(accounting.formatMoney(parseFloat($('#spanStateTaxAmountYTD').attr('oldvalue')) - parseFloat($('#txtStateTaxAmount').attr('oldvalue')) + parseFloat($('#txtStateTaxAmount').val().replace('$', '').replace(',', ''))));
    $('#spanCountyTaxAmountYTD').html(accounting.formatMoney(parseFloat($('#spanCountyTaxAmountYTD').attr('oldvalue')) - parseFloat($('#txtCountyTaxAmount').attr('oldvalue')) + parseFloat($('#txtCountyTaxAmount').val().replace('$', '').replace(',', ''))));

    var TaxableAmount = parseFloat($('#spanRegularAmount').html().replace('$', '').replace(',', ''));
    TaxableAmount += parseFloat($('#spanOTAmount').html().replace('$', '').replace(',', '')) + parseFloat($('#spanDoubleOTAmount').html().replace('$', '').replace(',', '')) + parseFloat($('#spanSickAmount').html().replace('$', '').replace(',', '')) + parseFloat($('#spanVacationAmount').html().replace('$', '').replace(',', ''));     
    var NetAmount = TaxableAmount;
    var rowLength = document.getElementById('tblMain').rows.length; 
    for (var i = 7; i < rowLength - 1; i++) {       
        var cell = $(document.getElementById('tblMain').rows[i]).find('.Current'); 
        if ($(document.getElementById('tblMain').rows[i]).attr('valuein') == 'Hours') {
            NetAmount += parseFloat(cell.html().replace('$', '').replace(',', ''));
        }
        else {
            NetAmount += parseFloat(cell.val().replace('$', '').replace(',', ''));
        }        
    }
    $('#spanTotalPaid').html(accounting.formatMoney(NetAmount));
    $('#spanTax').html(accounting.formatMoney(parseFloat($('#txtFederalTaxAmount').val().replace('$', '').replace(',', '')) + parseFloat($('#spanSocialSecurityTaxAmount').html().replace('$', '').replace(',', '')) + parseFloat($('#spanMedicareTaxAmount').html().replace('$', '').replace(',', '')) + parseFloat($('#txtStateTaxAmount').val().replace('$', '').replace(',', '')) + parseFloat($('#txtCountyTaxAmount').val().replace('$', '').replace(',', ''))));
    $('#spanTaxYTD').html(accounting.formatMoney(parseFloat($('#spanFederalTaxAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanSocialSecurityTaxAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanMedicareTaxAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanStateTaxAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanCountyTaxAmountYTD').html().replace('$', '').replace(',', ''))));
    
    $('#spanNetPayCheckSummary').html(accounting.formatMoney(parseFloat($('#spanTotalPaid').html().replace('$', '').replace(',', '')) - parseFloat($('#spanDeductions').html().replace('$', '').replace(',', '')) - parseFloat($('#spanTax').html().replace('$', '').replace(',', ''))));   
    $('#spanNetPayCheck').html($('#spanNetPayCheckSummary').html());
    
    if ($('#hdnNetToGross').val() == 'true') {
        $('#spanPaidByEmployerAmount').html($('#spanTax').html());
        $('#spanPaidByEmployerAmountYTD').html(accounting.formatMoney(parseFloat($('#spanPaidByEmployerAmountYTD').attr('oldvalue')) - parseFloat($('#spanPaidByEmployerAmount').attr('oldvalue')) + parseFloat($('#spanPaidByEmployerAmount').html().replace('$', '').replace(',', ''))));
        $('#spanNetPayCheck').html(accounting.formatMoney(parseFloat($('#spanNetPayCheck').html().replace('$', '').replace(',', '')) + parseFloat($('#spanTax').html().replace('$', '').replace(',', ''))));
        $('#spanNetPayCheckSummary').html($('#spanNetPayCheck').html());
        $('#spanTotalPaid').html(accounting.formatMoney(parseFloat($('#spanTotalPaid').html().replace('$', '').replace(',', '')) + parseFloat($('#spanTax').html().replace('$', '').replace(',', ''))));
        var NetAmountYTD = parseFloat($('#spanRegularAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanOTAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanDoubleOTAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanSickAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanVacationAmountYTD').html().replace('$', '').replace(',', ''));
        var rowLength = document.getElementById('tblMain').rows.length;
        for (var i = 7; i < rowLength - 1; i++) {
            NetAmountYTD += parseFloat($('#' + $(document.getElementById('tblMain').rows[i]).attr('id') + '_YTD').html().replace('$', '').replace(',', ''));
        }
        NetAmountYTD += parseFloat($('#spanPaidByEmployerAmountYTD').html().replace('$', '').replace(',', ''))
        $('#spanTotalPaidYTD').html(accounting.formatMoney(NetAmountYTD));
    }
}
function CalculateNetAmount2() {
    var TaxableAmount = parseFloat($('#spanRegularAmount').html().replace('$', '').replace(',', ''));
    TaxableAmount += parseFloat($('#spanOTAmount').html().replace('$', '').replace(',', '')) + parseFloat($('#spanDoubleOTAmount').html().replace('$', '').replace(',', '')) + parseFloat($('#spanSickAmount').html().replace('$', '').replace(',', '')) + parseFloat($('#spanVacationAmount').html().replace('$', '').replace(',', ''));

    var NetAmount = TaxableAmount;
    var NetAmountYTD = parseFloat($('#spanRegularAmountYTD').html().replace('$', '').replace(',', ''));
    NetAmountYTD += parseFloat($('#spanOTAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanDoubleOTAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanSickAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanVacationAmountYTD').html().replace('$', '').replace(',', ''));
   
    $('#txtFederalTaxAmount').val('0.00');
    $('#txtStateTaxAmount').val('0.00');
    $('#spanSocialSecurityTaxAmount').html('0.00');
    $('#spanMedicareTaxAmount').html('0.00');
    var rowLength = document.getElementById('tblMain').rows.length;
    //for (var i = 2; i < rowLength-1; i++) {
    //    var cell = $(document.getElementById('tblMain').rows[i]).find('.form-control');
    //    $('#' + $(document.getElementById('tblMain').rows[i]).attr('id') + '_YTD').html(accounting.formatMoney(parseFloat($('#' + $(document.getElementById('tblMain').rows[i]).attr('id') + '_YTD').attr('oldvalue')) - parseFloat(cell.attr('oldvalue')) + parseFloat(cell.val().replace('$', '').replace(',', ''))));
    //    if ($(document.getElementById('tblMain').rows[i]).attr('taxable') == 1) {
    //        TaxableAmount += parseFloat(cell.val().replace('$', '').replace(',', ''));
    //    }
    //    NetAmount += parseFloat(cell.val().replace('$', '').replace(',', ''));
    //    NetAmountYTD += parseFloat($('#' + $(document.getElementById('tblMain').rows[i]).attr('id') + '_YTD').html().replace('$', '').replace(',', ''));
    //}
    for (var i = 7; i < rowLength - 1; i++) {
        //if ($(document.getElementById('tblMain').rows[i]).attr('valuein') == 'Hours') {
        //    $(document.getElementById('tblMain').rows[i]).find('.Current').html(accounting.formatMoney($(document.getElementById('tblMain').rows[i]).find('.CurrentHours').val().replace('$', '').replace(',', '') * $(document.getElementById('tblMain').rows[i]).find('.PayRate').val().replace('$', '').replace(',', '')));
        //}
        var cell = $(document.getElementById('tblMain').rows[i]).find('.Current');
        //$('#' + $(document.getElementById('tblMain').rows[i]).attr('id') + '_YTD').html(accounting.formatMoney(parseFloat($('#' + $(document.getElementById('tblMain').rows[i]).attr('id') + '_YTD').attr('oldvalue')) - parseFloat(cell.attr('oldvalue')) + parseFloat($(document.getElementById('tblMain').rows[i]).attr('valuein') == 'Hours' ? cell.html().replace('$', '').replace(',', '') : cell.val().replace('$', '').replace(',', ''))));
        if ($(document.getElementById('tblMain').rows[i]).attr('taxable') == 1) {
            if ($(document.getElementById('tblMain').rows[i]).attr('valuein') == 'Hours') {
                TaxableAmount += parseFloat(cell.html().replace('$', '').replace(',', ''));
            }
            else {
                TaxableAmount += parseFloat(cell.val().replace('$', '').replace(',', ''));
            }
        }
        if ($(document.getElementById('tblMain').rows[i]).attr('valuein') == 'Hours') {
            NetAmount += parseFloat(cell.html().replace('$', '').replace(',', ''));
        }
        else {
            NetAmount += parseFloat(cell.val().replace('$', '').replace(',', ''));
        }
        NetAmountYTD += parseFloat($('#' + $(document.getElementById('tblMain').rows[i]).attr('id') + '_YTD').html().replace('$', '').replace(',', ''));
    }
    $('#spanTotalPaid').html(accounting.formatMoney(NetAmount));
    $('#spanTotalPaidYTD').html(accounting.formatMoney(NetAmountYTD));
    rowLength = document.getElementById('tblDeduction').rows.length;
    var DeductionAmount = 0;
    var DeductionAmountYTD = 0;
    for (var i = 1; i < rowLength-1; i++) {
        var cell = $(document.getElementById('tblDeduction').rows[i]).find('.form-control');
        $('#' + $(document.getElementById('tblDeduction').rows[i]).attr('id') + '_YTD').html(accounting.formatMoney(parseFloat($('#' + $(document.getElementById('tblDeduction').rows[i]).attr('id') + '_YTD').attr('oldvalue')) - parseFloat(cell.attr('oldvalue')) + parseFloat(cell.val().replace('$', '').replace(',', ''))));
        if ($(document.getElementById('tblDeduction').rows[i]).attr('taxable') == 1) {
            TaxableAmount += parseFloat(cell.val().replace('$', '').replace(',', ''));
        }
        NetAmount -= parseFloat(cell.val().replace('$', '').replace(',', ''));
        NetAmountYTD -= parseFloat($('#' + $(document.getElementById('tblDeduction').rows[i]).attr('id') + '_YTD').html().replace('$', '').replace(',', ''));
        DeductionAmount += parseFloat(cell.val().replace('$', '').replace(',', ''));
        DeductionAmountYTD += parseFloat($('#' + $(document.getElementById('tblDeduction').rows[i]).attr('id') + '_YTD').html().replace('$', '').replace(',', ''));
    }
    $('#spanDeductions').html(accounting.formatMoney(DeductionAmount));
    $('#spanDeductionsYTD').html(accounting.formatMoney(DeductionAmountYTD));
    var params = { EmployeeId: $('#hdnEmployeeId').val(), TaxableAmount: TaxableAmount };
    var dtoTax = CallService1('Client/PayCheckService.svc', 'GetTax', params)
    var params = { ClientId: $.localStorage.get('ClientId'), EmployeeId: $('#hdnEmployeeId').val(), PayCheckId: $('#hdnPayCheckId').val(), TaxableAmount: TaxableAmount };
    var SUITaxAmount = CallService1('Client/PayCheckService.svc', 'GetSUITax', params)
    $("#spanEmployerSUITaxAmount").html(accounting.formatMoney(SUITaxAmount));
    $('#spanEmployerSUITaxAmountYTD').html(accounting.formatMoney(parseFloat($('#spanEmployerSUITaxAmountYTD').attr('oldvalue')) - parseFloat($('#spanEmployerSUITaxAmount').attr('oldvalue')) + parseFloat($('#spanEmployerSUITaxAmount').html().replace('$', '').replace(',', ''))));
    $('#spanSocialSecurityTaxAmount').html(accounting.formatMoney(dtoTax.SocialSecurityTaxAmount));
    $('#spanSocialSecurityTaxAmountYTD').html(accounting.formatMoney(parseFloat($('#spanSocialSecurityTaxAmountYTD').attr('oldvalue')) - parseFloat($('#spanSocialSecurityTaxAmount').attr('oldvalue')) + parseFloat($('#spanSocialSecurityTaxAmount').html().replace('$', '').replace(',', ''))));
    $('#spanMedicareTaxAmount').html(accounting.formatMoney(dtoTax.MedicareTaxAmount));
    $('#spanMedicareTaxAmountYTD').html(accounting.formatMoney(parseFloat($('#spanMedicareTaxAmountYTD').attr('oldvalue')) - parseFloat($('#spanMedicareTaxAmount').attr('oldvalue')) + parseFloat($('#spanMedicareTaxAmount').html().replace('$', '').replace(',', ''))));
    $('#spanEmployerSocialSecurityTaxAmount').html(accounting.formatMoney(dtoTax.EmployerSocialSecurityTaxAmount));
    $('#spanEmployerSocialSecurityTaxAmountYTD').html(accounting.formatMoney(parseFloat($('#spanEmployerSocialSecurityTaxAmountYTD').attr('oldvalue')) - parseFloat($('#spanEmployerSocialSecurityTaxAmount').attr('oldvalue')) + parseFloat($('#spanEmployerSocialSecurityTaxAmount').html().replace('$', '').replace(',', ''))));
    $('#spanEmployerMedicareTaxAmount').html(accounting.formatMoney(dtoTax.EmployerMedicareTaxAmount));
    $('#spanEmployerMedicareTaxAmountYTD').html(accounting.formatMoney(parseFloat($('#spanEmployerMedicareTaxAmountYTD').attr('oldvalue')) - parseFloat($('#spanEmployerMedicareTaxAmount').attr('oldvalue')) + parseFloat($('#spanEmployerMedicareTaxAmount').html().replace('$', '').replace(',', ''))));
    $('#spanEmployerFUTATaxAmount').html(accounting.formatMoney(dtoTax.EmployerFUTATaxAmount));
    $('#spanEmployerFUTATaxAmountYTD').html(accounting.formatMoney(parseFloat($('#spanEmployerFUTATaxAmountYTD').attr('oldvalue')) - parseFloat($('#spanEmployerFUTATaxAmount').attr('oldvalue')) + parseFloat($('#spanEmployerFUTATaxAmount').html().replace('$', '').replace(',', ''))));

    var FederalTaxAmount = 0;
    if ($('#hdnSupplementalTaxRate').val() == 'true') {
        FederalTaxAmount = TaxableAmount * $('#hdnFederalTaxRate').val() * 0.01;
    }
    else {
        var params = { EmployeeId: $('#hdnEmployeeId').val(), TaxableAmount: TaxableAmount };
        FederalTaxAmount = CallService1('Client/PayCheckService.svc', 'GetFederalTax', params);
    }
    //var params = { EmployeeId: $('#hdnEmployeeId').val(), TaxableAmount: TaxableAmount };
    //var FederalTaxAmount = CallService1('Client/PayCheckService.svc', 'GetFederalTax', params);
    $('#txtFederalTaxAmount').val(accounting.formatMoney(FederalTaxAmount));
    $('#spanFederalTaxAmountYTD').html(accounting.formatMoney(parseFloat($('#spanFederalTaxAmountYTD').attr('oldvalue')) - parseFloat($('#txtFederalTaxAmount').attr('oldvalue')) + parseFloat($('#txtFederalTaxAmount').val().replace('$', '').replace(',', ''))));

    var params = { EmployeeId: $('#hdnEmployeeId').val(), TaxableAmount: TaxableAmount };
    var StateTaxAmount = CallService1('Client/PayCheckService.svc', 'GetStateTax', params);
    $('#txtStateTaxAmount').val(accounting.formatMoney(StateTaxAmount));
    $('#spanStateTaxAmountYTD').html(accounting.formatMoney(parseFloat($('#spanStateTaxAmountYTD').attr('oldvalue')) - parseFloat($('#txtStateTaxAmount').attr('oldvalue')) + parseFloat($('#txtStateTaxAmount').val().replace('$', '').replace(',', ''))));
    $('#spanCountyTaxAmountYTD').html(accounting.formatMoney(parseFloat($('#spanCountyTaxAmountYTD').attr('oldvalue')) - parseFloat($('#txtCountyTaxAmount').attr('oldvalue')) + parseFloat($('#txtCountyTaxAmount').val().replace('$', '').replace(',', ''))));
    $('#spanTax').html(accounting.formatMoney(parseFloat($('#txtFederalTaxAmount').val().replace('$', '').replace(',', '')) + parseFloat($('#spanSocialSecurityTaxAmount').html().replace('$', '').replace(',', '')) + parseFloat($('#spanMedicareTaxAmount').html().replace('$', '').replace(',', '')) + parseFloat($('#txtStateTaxAmount').val().replace('$', '').replace(',', '')) + parseFloat($('#txtCountyTaxAmount').val().replace('$', '').replace(',', ''))));
    $('#spanTaxYTD').html(accounting.formatMoney(parseFloat($('#spanFederalTaxAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanSocialSecurityTaxAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanMedicareTaxAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanStateTaxAmountYTD').html().replace('$', '').replace(',', '')) + + parseFloat($('#spanCountyTaxAmountYTD').html().replace('$', '').replace(',', ''))));
    $('#spanNetPayCheckSummary').html(accounting.formatMoney(parseFloat($('#spanTotalPaid').html().replace('$', '').replace(',', '')) - parseFloat($('#spanDeductions').html().replace('$', '').replace(',', '')) - parseFloat($('#spanTax').html().replace('$', '').replace(',', ''))));
    $('#spanNetPayCheck').html($('#spanNetPayCheckSummary').html());
    $('#spanTotalEmployerTax').html(accounting.formatMoney(parseFloat($('#spanEmployerFUTATaxAmount').html().replace('$', '').replace(',', '')) + parseFloat($('#spanEmployerSocialSecurityTaxAmount').html().replace('$', '').replace(',', '')) + parseFloat($('#spanEmployerMedicareTaxAmount').html().replace('$', '').replace(',', '')) + parseFloat($("#spanEmployerSUITaxAmount").html().replace('$', '').replace(',', ''))));
    $('#spanTotalEmployerTaxYTD').html(accounting.formatMoney(parseFloat($('#spanEmployerFUTATaxAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanEmployerSocialSecurityTaxAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanEmployerMedicareTaxAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($("#spanEmployerSUITaxAmountYTD").html().replace('$', '').replace(',', ''))));
    if ($('#hdnNetToGross').val() == 'true') {
        $('#spanPaidByEmployerAmount').html($('#spanTax').html());
        $('#spanPaidByEmployerAmountYTD').html(accounting.formatMoney(parseFloat($('#spanPaidByEmployerAmountYTD').attr('oldvalue')) - parseFloat($('#spanPaidByEmployerAmount').attr('oldvalue')) + parseFloat($('#spanPaidByEmployerAmount').html().replace('$', '').replace(',', ''))));
        $('#spanNetPayCheck').html(accounting.formatMoney(parseFloat($('#spanNetPayCheck').html().replace('$', '').replace(',', '')) + parseFloat($('#spanTax').html().replace('$', '').replace(',', ''))));
        $('#spanNetPayCheckSummary').html($('#spanNetPayCheck').html());
        $('#spanTotalPaid').html(accounting.formatMoney(parseFloat($('#spanTotalPaid').html().replace('$', '').replace(',', '')) + parseFloat($('#spanTax').html().replace('$', '').replace(',', ''))));
        var NetAmountYTD = parseFloat($('#spanRegularAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanOTAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanDoubleOTAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanSickAmountYTD').html().replace('$', '').replace(',', '')) + parseFloat($('#spanVacationAmountYTD').html().replace('$', '').replace(',', ''));
        var rowLength = document.getElementById('tblMain').rows.length;
        for (var i = 7; i < rowLength - 1; i++) {
            NetAmountYTD += parseFloat($('#' + $(document.getElementById('tblMain').rows[i]).attr('id') + '_YTD').html().replace('$', '').replace(',', ''));
        }
        NetAmountYTD += parseFloat($('#spanPaidByEmployerAmountYTD').html().replace('$', '').replace(',', ''))
        $('#spanTotalPaidYTD').html(accounting.formatMoney(NetAmountYTD));
    }
}
function CalculateNetAmount3()
{
    $('#txtOTRate').val(accounting.formatMoney(parseFloat($('#txtPayRate').val().replace('$', '').replace(',', '')) * 1.5));
    $('#txtDoubleOTRate').val(accounting.formatMoney(parseFloat($('#txtPayRate').val().replace('$', '').replace(',', '')) * 2));
    $('#txtSickRate').val(accounting.formatMoney(parseFloat($('#txtPayRate').val().replace('$', '').replace(',', ''))));
    $('#txtVacationRate').val(accounting.formatMoney(parseFloat($('#txtPayRate').val().replace('$', '').replace(',', ''))));
    var rowLength = document.getElementById('tblMain').rows.length;
    for (var i = 7; i < rowLength - 1; i++) {
        if ($(document.getElementById('tblMain').rows[i]).attr('valuein') == 'Hours') {
            $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(parseFloat($('#txtPayRate').val().replace('$', '').replace(',', ''))));
            //if ($(document.getElementById('tblMain').rows[i]).attr('paystubcode') == 'OT') {
            //    var PayRate = parseFloat($('#txtPayRate').val().replace('$', '').replace(',', '')) * 1.5;
            //    if ($('#spanPayType1').html() === 'Per Hour') {                    
            //        $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate));
            //    }
            //    else {
            //        if ($('#spanPayType1').html() === 'Per Day') {                        
            //            $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate / 8));
            //        }
            //        else if ($('#spanPayType1').html() === 'Per Week') {                        
            //            $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate / 40));
            //        }
            //        else if ($('#spanPayType1').html() === 'Per Bi-Week') {                       
            //            $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate / 80));
            //        }
            //        else if ($('#spanPayType1').html() === 'Per Semi-Month') {                        
            //            $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate / 88));
            //        }
            //        else if ($('#spanPayType1').html() === 'Per Month') {                        
            //            $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate / 176));
            //        }
            //        else if ($('#spanPayType1').html() === 'Per Quarter') {                        
            //            $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate / 528));
            //        }
            //        else if ($('#spanPayType1').html() === 'Per Semi-Annual') {                        
            //            $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate / 1056));
            //        }
            //        else if ($('#spanPayType1').html() === 'Per Year') {                       
            //            $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate / 2112));
            //        }
            //    }
            //    //$(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney($('#txtPayRate').val().replace('$', '').replace(',', '') * 1.5));
            //}
            //else if ($(document.getElementById('tblMain').rows[i]).attr('paystubcode') == 'Double OT') {
            //    var PayRate = parseFloat($('#txtPayRate').val().replace('$', '').replace(',', '')) * 2;
            //    if ($('#spanPayType1').html() === 'Per Hour') {
            //        $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate));
            //    }
            //    else {
            //        if ($('#spanPayType1').html() === 'Per Day') {
            //            $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate / 8));
            //        }
            //        else if ($('#spanPayType1').html() === 'Per Week') {
            //            $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate / 40));
            //        }
            //        else if ($('#spanPayType1').html() === 'Per Bi-Week') {
            //            $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate / 80));
            //        }
            //        else if ($('#spanPayType1').html() === 'Per Semi-Month') {
            //            $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate / 88));
            //        }
            //        else if ($('#spanPayType1').html() === 'Per Month') {
            //            $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate / 176));
            //        }
            //        else if ($('#spanPayType1').html() === 'Per Quarter') {
            //            $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate / 528));
            //        }
            //        else if ($('#spanPayType1').html() === 'Per Semi-Annual') {
            //            $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate / 1056));
            //        }
            //        else if ($('#spanPayType1').html() === 'Per Year') {
            //            $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate / 2112));
            //        }
            //    }
            //    //$(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney($('#txtPayRate').val().replace('$', '').replace(',', '') * 2));
            //}
            //else {
            //    var PayRate = parseFloat($('#txtPayRate').val().replace('$', '').replace(',', ''));
            //    if ($('#spanPayType1').html() === 'Per Hour') {
            //        $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate));
            //    }
            //    else {
            //        if ($('#spanPayType1').html() === 'Per Day') {
            //            $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate / 8));
            //        }
            //        else if ($('#spanPayType1').html() === 'Per Week') {
            //            $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate / 40));
            //        }
            //        else if ($('#spanPayType1').html() === 'Per Bi-Week') {
            //            $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate / 80));
            //        }
            //        else if ($('#spanPayType1').html() === 'Per Semi-Month') {
            //            $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate / 88));
            //        }
            //        else if ($('#spanPayType1').html() === 'Per Month') {
            //            $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate / 176));
            //        }
            //        else if ($('#spanPayType1').html() === 'Per Quarter') {
            //            $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate / 528));
            //        }
            //        else if ($('#spanPayType1').html() === 'Per Semi-Annual') {
            //            $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate / 1056));
            //        }
            //        else if ($('#spanPayType1').html() === 'Per Year') {
            //            $(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney(PayRate / 2112));
            //        }
            //    //}
            //    //$(document.getElementById('tblMain').rows[i]).find('.PayRate').val(accounting.formatMoney($('#txtPayRate').val().replace('$', '').replace(',', '')));
            //}
        }           
    }
    CalculateNetAmount();
}
function Save() {    
    var PayCheckDetails = $('#hdnPayCheckId').val() + String.fromCharCode(134) + $('#hdnPayCheckType').val() + String.fromCharCode(134) + $('#hdnSupplementalTaxRate').val() + String.fromCharCode(134) + $('#hdnFederalTaxRate').val() + String.fromCharCode(134) + $('#hdnNetToGross').val() + String.fromCharCode(134) + $('#hdnEmployeeId').val() + String.fromCharCode(134) + $('#spanPayDate').html() + String.fromCharCode(134) + '-2' + String.fromCharCode(134) + $('#txtRegularHours').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $('#spanRegularAmount').html().replace('$', '').replace(',', '') + String.fromCharCode(134) + $('#txtPayRate').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $('#txtPayRate').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $("#hdnPaymentMethod").val() + String.fromCharCode(134) + $("#hdnNotes").val() + String.fromCharCode(135);   
    PayCheckDetails += $('#hdnPayCheckId').val() + String.fromCharCode(134) + $('#hdnPayCheckType').val() + String.fromCharCode(134) + $('#hdnSupplementalTaxRate').val() + String.fromCharCode(134) + $('#hdnFederalTaxRate').val() + String.fromCharCode(134) + $('#hdnNetToGross').val() + String.fromCharCode(134) + $('#hdnEmployeeId').val() + String.fromCharCode(134) + $('#spanPayDate').html() + String.fromCharCode(134) + '-3' + String.fromCharCode(134) + $('#txtOTHours').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $('#spanOTAmount').html().replace('$', '').replace(',', '') + String.fromCharCode(134) + $('#txtOTRate').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $('#txtPayRate').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $("#hdnPaymentMethod").val() + String.fromCharCode(134) + $("#hdnNotes").val() + String.fromCharCode(135);   
    PayCheckDetails += $('#hdnPayCheckId').val() + String.fromCharCode(134) + $('#hdnPayCheckType').val() + String.fromCharCode(134) + $('#hdnSupplementalTaxRate').val() + String.fromCharCode(134) + $('#hdnFederalTaxRate').val() + String.fromCharCode(134) + $('#hdnNetToGross').val() + String.fromCharCode(134) + $('#hdnEmployeeId').val() + String.fromCharCode(134) + $('#spanPayDate').html() + String.fromCharCode(134) + '-4' + String.fromCharCode(134) + $('#txtDoubleOTHours').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $('#spanDoubleOTAmount').html().replace('$', '').replace(',', '') + String.fromCharCode(134) + $('#txtDoubleOTRate').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $('#txtPayRate').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $("#hdnPaymentMethod").val() + String.fromCharCode(134) + $("#hdnNotes").val() + String.fromCharCode(135);   
    PayCheckDetails += $('#hdnPayCheckId').val() + String.fromCharCode(134) + $('#hdnPayCheckType').val() + String.fromCharCode(134) + $('#hdnSupplementalTaxRate').val() + String.fromCharCode(134) + $('#hdnFederalTaxRate').val() + String.fromCharCode(134) + $('#hdnNetToGross').val() + String.fromCharCode(134) + $('#hdnEmployeeId').val() + String.fromCharCode(134) + $('#spanPayDate').html() + String.fromCharCode(134) + '-5' + String.fromCharCode(134) + $('#txtSickHours').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $('#spanSickAmount').html().replace('$', '').replace(',', '') + String.fromCharCode(134) + $('#txtSickRate').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $('#txtPayRate').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $("#hdnPaymentMethod").val() + String.fromCharCode(134) + $("#hdnNotes").val() + String.fromCharCode(135);   
    PayCheckDetails += $('#hdnPayCheckId').val() + String.fromCharCode(134) + $('#hdnPayCheckType').val() + String.fromCharCode(134) + $('#hdnSupplementalTaxRate').val() + String.fromCharCode(134) + $('#hdnFederalTaxRate').val() + String.fromCharCode(134) + $('#hdnNetToGross').val() + String.fromCharCode(134) + $('#hdnEmployeeId').val() + String.fromCharCode(134) + $('#spanPayDate').html() + String.fromCharCode(134) + '-6' + String.fromCharCode(134) + $('#txtVacationHours').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $('#spanVacationAmount').html().replace('$', '').replace(',', '') + String.fromCharCode(134) + $('#txtVacationRate').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $('#txtPayRate').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $("#hdnPaymentMethod").val() + String.fromCharCode(134) + $("#hdnNotes").val() + String.fromCharCode(135);   
    if ($('#hdnNetToGross').val() == 'true') {
        PayCheckDetails += $('#hdnPayCheckId').val() + String.fromCharCode(134) + $('#hdnPayCheckType').val() + String.fromCharCode(134) + $('#hdnSupplementalTaxRate').val() + String.fromCharCode(134) + $('#hdnFederalTaxRate').val() + String.fromCharCode(134) + $('#hdnNetToGross').val() + String.fromCharCode(134) + $('#hdnEmployeeId').val() + String.fromCharCode(134) + $('#spanPayDate').html() + String.fromCharCode(134) + '-19' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#spanPaidByEmployerAmount').html().replace('$', '').replace(',', '') + String.fromCharCode(134) + '0' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $("#hdnPaymentMethod").val() + String.fromCharCode(134) + $("#hdnNotes").val() + String.fromCharCode(135);
    }
    var rowLength = document.getElementById('tblMain').rows.length;
    for (var i = 7; i < rowLength - 1; i++) {
        var Hours = 0;
        var Amount = 0;
        var PayRatePerHour = 0;

        var cell = $(document.getElementById('tblMain').rows[i]).find('.Current');        
        if ($(document.getElementById('tblMain').rows[i]).attr('valuein') == 'Hours') {           
            PayRatePerHour = parseFloat($(document.getElementById('tblMain').rows[i]).find('.PayRate').val().replace('$', '').replace(',', ''));
            Hours = parseFloat($(document.getElementById('tblMain').rows[i]).find('.CurrentHours').val());
            Amount = parseFloat(cell.html().replace('$', '').replace(',', ''));
        }
        else {
            Amount = parseFloat(cell.val().replace('$', '').replace(',', ''));
        }      
       
        PayCheckDetails += $('#hdnPayCheckId').val() + String.fromCharCode(134) + $('#hdnPayCheckType').val() + String.fromCharCode(134) + $('#hdnSupplementalTaxRate').val() + String.fromCharCode(134) + $('#hdnFederalTaxRate').val() + String.fromCharCode(134) + $('#hdnNetToGross').val() + String.fromCharCode(134) +
            $('#hdnEmployeeId').val() + String.fromCharCode(134) +
            $('#spanPayDate').html() + String.fromCharCode(134) +
            $(document.getElementById('tblMain').rows[i]).attr('id') + String.fromCharCode(134) +
            Hours + String.fromCharCode(134) +
            Amount + String.fromCharCode(134) +
            PayRatePerHour + String.fromCharCode(134) +
            $('#txtPayRate').val().replace('$', '').replace(',', '') + String.fromCharCode(134)
            + $("#hdnPaymentMethod").val() + String.fromCharCode(134) +
            $("#hdnNotes").val() + String.fromCharCode(135);       
    }    
    rowLength = document.getElementById('tblDeduction').rows.length;
    for (var i = 1; i < rowLength-1; i++) {
        var cell = $(document.getElementById('tblDeduction').rows[i]).find('.form-control');
        PayCheckDetails += $('#hdnPayCheckId').val() + String.fromCharCode(134) + $('#hdnPayCheckType').val() + String.fromCharCode(134) + $('#hdnSupplementalTaxRate').val() + String.fromCharCode(134) + $('#hdnFederalTaxRate').val() + String.fromCharCode(134) + $('#hdnNetToGross').val() + String.fromCharCode(134) + $('#hdnEmployeeId').val() + String.fromCharCode(134) + $('#spanPayDate').html() + String.fromCharCode(134) + $(document.getElementById('tblDeduction').rows[i]).attr('id') + String.fromCharCode(134) + '0' + String.fromCharCode(134) + cell.val().replace('$', '').replace(',', '') + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#txtPayRate').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $("#hdnPaymentMethod").val() + String.fromCharCode(134) + $("#hdnNotes").val() + String.fromCharCode(135);
    }
    PayCheckDetails += $('#hdnPayCheckId').val() + String.fromCharCode(134) + $('#hdnPayCheckType').val() + String.fromCharCode(134) + $('#hdnSupplementalTaxRate').val() + String.fromCharCode(134) + $('#hdnFederalTaxRate').val() + String.fromCharCode(134) + $('#hdnNetToGross').val() + String.fromCharCode(134) + $('#hdnEmployeeId').val() + String.fromCharCode(134) + $('#spanPayDate').html() + String.fromCharCode(134) + '-7' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#txtFederalTaxAmount').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#txtPayRate').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $("#hdnPaymentMethod").val() + String.fromCharCode(134) + $("#hdnNotes").val() + String.fromCharCode(135);
    PayCheckDetails += $('#hdnPayCheckId').val() + String.fromCharCode(134) + $('#hdnPayCheckType').val() + String.fromCharCode(134) + $('#hdnSupplementalTaxRate').val() + String.fromCharCode(134) + $('#hdnFederalTaxRate').val() + String.fromCharCode(134) + $('#hdnNetToGross').val() + String.fromCharCode(134) + $('#hdnEmployeeId').val() + String.fromCharCode(134) + $('#spanPayDate').html() + String.fromCharCode(134) + '-8' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#txtStateTaxAmount').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#txtPayRate').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $("#hdnPaymentMethod").val() + String.fromCharCode(134) + $("#hdnNotes").val() + String.fromCharCode(135);
    PayCheckDetails += $('#hdnPayCheckId').val() + String.fromCharCode(134) + $('#hdnPayCheckType').val() + String.fromCharCode(134) + $('#hdnSupplementalTaxRate').val() + String.fromCharCode(134) + $('#hdnFederalTaxRate').val() + String.fromCharCode(134) + $('#hdnNetToGross').val() + String.fromCharCode(134) + $('#hdnEmployeeId').val() + String.fromCharCode(134) + $('#spanPayDate').html() + String.fromCharCode(134) + '-9' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#txtCountyTaxAmount').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#txtPayRate').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $("#hdnPaymentMethod").val() + String.fromCharCode(134) + $("#hdnNotes").val() + String.fromCharCode(135);
    PayCheckDetails += $('#hdnPayCheckId').val() + String.fromCharCode(134) + $('#hdnPayCheckType').val() + String.fromCharCode(134) + $('#hdnSupplementalTaxRate').val() + String.fromCharCode(134) + $('#hdnFederalTaxRate').val() + String.fromCharCode(134) + $('#hdnNetToGross').val() + String.fromCharCode(134) + $('#hdnEmployeeId').val() + String.fromCharCode(134) + $('#spanPayDate').html() + String.fromCharCode(134) + '-10' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#spanSocialSecurityTaxAmount').html().replace('$', '').replace(',', '') + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#txtPayRate').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $("#hdnPaymentMethod").val() + String.fromCharCode(134) + $("#hdnNotes").val() + String.fromCharCode(135);
    PayCheckDetails += $('#hdnPayCheckId').val() + String.fromCharCode(134) + $('#hdnPayCheckType').val() + String.fromCharCode(134) + $('#hdnSupplementalTaxRate').val() + String.fromCharCode(134) + $('#hdnFederalTaxRate').val() + String.fromCharCode(134) + $('#hdnNetToGross').val() + String.fromCharCode(134) + $('#hdnEmployeeId').val() + String.fromCharCode(134) + $('#spanPayDate').html() + String.fromCharCode(134) + '-11' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#spanMedicareTaxAmount').html().replace('$', '').replace(',', '') + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#txtPayRate').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $("#hdnPaymentMethod").val() + String.fromCharCode(134) + $("#hdnNotes").val() + String.fromCharCode(135);
    PayCheckDetails += $('#hdnPayCheckId').val() + String.fromCharCode(134) + $('#hdnPayCheckType').val() + String.fromCharCode(134) + $('#hdnSupplementalTaxRate').val() + String.fromCharCode(134) + $('#hdnFederalTaxRate').val() + String.fromCharCode(134) + $('#hdnNetToGross').val() + String.fromCharCode(134) + $('#hdnEmployeeId').val() + String.fromCharCode(134) + $('#spanPayDate').html() + String.fromCharCode(134) + '-12' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#spanEmployerFUTATaxAmount').html().replace('$', '').replace(',', '') + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#txtPayRate').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $("#hdnPaymentMethod").val() + String.fromCharCode(134) + $("#hdnNotes").val() + String.fromCharCode(135);
    PayCheckDetails += $('#hdnPayCheckId').val() + String.fromCharCode(134) + $('#hdnPayCheckType').val() + String.fromCharCode(134) + $('#hdnSupplementalTaxRate').val() + String.fromCharCode(134) + $('#hdnFederalTaxRate').val() + String.fromCharCode(134) + $('#hdnNetToGross').val() + String.fromCharCode(134) + $('#hdnEmployeeId').val() + String.fromCharCode(134) + $('#spanPayDate').html() + String.fromCharCode(134) + '-13' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#spanEmployerSUITaxAmount').html().replace('$', '').replace(',', '') + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#txtPayRate').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $("#hdnPaymentMethod").val() + String.fromCharCode(134) + $("#hdnNotes").val() + String.fromCharCode(135);
    PayCheckDetails += $('#hdnPayCheckId').val() + String.fromCharCode(134) + $('#hdnPayCheckType').val() + String.fromCharCode(134) + $('#hdnSupplementalTaxRate').val() + String.fromCharCode(134) + $('#hdnFederalTaxRate').val() + String.fromCharCode(134) + $('#hdnNetToGross').val() + String.fromCharCode(134) + $('#hdnEmployeeId').val() + String.fromCharCode(134) + $('#spanPayDate').html() + String.fromCharCode(134) + '-14' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#spanEmployerSocialSecurityTaxAmount').html().replace('$', '').replace(',', '') + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#txtPayRate').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $("#hdnPaymentMethod").val() + String.fromCharCode(134) + $("#hdnNotes").val() + String.fromCharCode(135);
    PayCheckDetails += $('#hdnPayCheckId').val() + String.fromCharCode(134) + $('#hdnPayCheckType').val() + String.fromCharCode(134) + $('#hdnSupplementalTaxRate').val() + String.fromCharCode(134) + $('#hdnFederalTaxRate').val() + String.fromCharCode(134) + $('#hdnNetToGross').val() + String.fromCharCode(134) + $('#hdnEmployeeId').val() + String.fromCharCode(134) + $('#spanPayDate').html() + String.fromCharCode(134) + '-15' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#spanEmployerMedicareTaxAmount').html().replace('$', '').replace(',', '') + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#txtPayRate').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $("#hdnPaymentMethod").val() + String.fromCharCode(134) + $("#hdnNotes").val() + String.fromCharCode(135);
    
    //PayCheckDetails += $('#hdnPayCheckId').val() + String.fromCharCode(134) + $('#hdnPayCheckType').val() + String.fromCharCode(134) + $('#hdnSupplementalTaxRate').val() + String.fromCharCode(134) + $('#hdnFederalTaxRate').val() + String.fromCharCode(134) + $('#hdnNetToGross').val() + String.fromCharCode(134) + $('#hdnEmployeeId').val() + String.fromCharCode(134) + $('#spanPayDate').html() + String.fromCharCode(134) + '-12' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#spanEmployerAdminAssessmentTaxAmount').html().replace('$', '').replace(',', '') + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#txtPayRate').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $("#hdnNotes").val() + String.fromCharCode(135);
    if (PayCheckDetails != '') {
        PayCheckDetails = PayCheckDetails.substring(0, PayCheckDetails.length - 1);
    }
    var params = {
        PayCheckMainId: $('#hdnPayCheckMainId').val(),
        PayScheduleId: $("#hdnPayScheduleId").val(),
        PayPeriod: $('#spanPayPeriod').html(),
        //Notes: $("#hdnNotes").val(),
        PayCheckDetails: PayCheckDetails
    };
    CallService('Client/PayCheckService.svc', 'Save', params, OnPayCheckSaveSuccess, false);  
};

function OnPayCheckSaveSuccess(PayCheckMainId) {
    if (PayCheckMainId > 0) {
        window.location = "/Client/Main.html#ViewAllPayChecks";
    }
}
function Close() {
    window.location = "/Client/Main.html#ViewAllPayChecks";
}
function FocusInFocusOut() {
    $('.textbox').off('focusout');
    $('.textbox').off('focusin');
    $('.textbox').focusout(function () {        
        $(this).val('$' + $(this).val());        
    })
    $('.textbox').focusin(function () {        
        $(this).val($(this).val().replace('$', '').replace(',', ''));        
    })
}
window.scrollTo(0, 0);
