CheckPageRequest();
$('#txtFromDate').val(FormatJSDate(new Date(), 'mm/dd/yy'));
$('#txtToDate').val(FormatJSDate(new Date(), 'mm/dd/yy'));
$('.input-date-picker').datepicker({
    format: 'mm/dd/yyyy',
    orientation: 'bottom',
    autoclose: true,
    todayHighlight: true
});

$("li:nth-child(3)").hide(); //To hide export to pdf button

function FillLocations() {
    var params = { ClientId: $.localStorage.get('ClientId') };
    CallService('Client/LocationService.svc', 'GetLookup', params, OnLocationGetLookupSuccess, false);
}

function OnLocationGetLookupSuccess(Locations) {
    var html = '<option value="0">All Locations</option>';
    if (Locations != undefined) {
        for (var i = 0; i < Locations.length; i++) {
            html += '<option value="' + Locations[i]['LocationId'] + '">' + Locations[i]['LocationName'] + '</option>';
        }
    }
    $('#cmbLocationName').append(html);
    $('#cmbLocationName').val("0");
}
FillLocations();

function FillEmployees() {
    var params = { ClientId: $.localStorage.get('ClientId') };
    CallService('Client/EmployeeService.svc', 'GetLookup', params, OnEmployeeGetLookupSuccess, false);
}

function OnEmployeeGetLookupSuccess(Employees) {
    var html = '<option value="0">All Checks</option><option value="-1">Summary By Employee</option>';
    if (Employees != undefined) {
        for (var i = 0; i < Employees.length; i++) {
            html += '<option value="' + Employees[i]['EmployeeId'] + '">' + Employees[i]['FullName'] + '</option>';
        }
    }
    $('#cmbEmployeeName').append(html);
    $('#cmbEmployeeName').val("0");
}
FillEmployees();

function FillGrid() {    
    $('#divPayrollDetails').html('');
    var params = {
        ClientID: $.localStorage.get('ClientId'),
        FromDate: $('#txtFromDate').val(),
        ToDate: $('#txtToDate').val(),
        LocationID: $('#cmbLocationName').val(),
        EmployeeID: $('#cmbEmployeeName').val()
    };
    CallService('Client/Reports/EmployeeReports/PayrollDetails.svc', 'PayrollDetails', params, OnPayrollDetailsGetAllSuccess, true);
}



function OnPayrollDetailsGetAllSuccess(arrPayrollDetails) {

    var html = '';
    var NetPayCheck = 0;
    var RegularHours = 0;
    var Tax = 0;
    var FinalDeductions = 0;
    var RegularAmount = 0;
    var EmployerTax = 0;
    var FIT = 0;
    var SS = 0;
    var MED = 0;
    var GA_PIT = 0;
    var FUTA = 0;
    var CompanySS = 0;
    var CompanyMED = 0;
    var GA_SUI = 0;
    var GA_ADMIN = 0;

    var PayType = new Array();
    var PayTypeHour = new Array();
    var PayTypeTotal = new Array();

    var IsAdded = false;
    var DeductionType = new Array();
    var DeductionTypeTotal = new Array();
    var IsDeductionAdded = false;
    var AdditionType = new Array();
    var AdditionTypeTotal = new Array();
    var IsAdditionAdded = false;
    var StateCode = '';
    var EmployeeID = $('#cmbEmployeeName').val();

    html += '<table border="1" id="tblPayrollDetails" style="width:100%; border: 1px solid #90949b;">';
    html += '<thead style="width:100%" valign="top">';
    html += '<tr style="background-color:#4267b2;color:#fff">';
    html += '<th style="width:15%; text-align:left; padding-left:5px;"><b>Employee</b> </th>';
    html += '<th style="width:25%; text-align:left; padding-left:5px;"><table width="100%"><tr width="100%"><td width="34%" style="text-align:left; padding-left:5px;"><b>Pay Type</b></td><td width="33%" style="text-align:left; padding-left:5px;"><b style="text-align:left"><b>Hours</b></td><td width="33%" style="text-align:right; padding-right:5px;"><b>Amount</b></td></tr></table></th>';
    html += '<th style="width:15%; padding-left:5px;"><table width="100%"><tr width="100%"><td width="50%" style="text-align:left; padding-left:5px;"><b>Taxes</b></td><td width="50%" style="text-align:right; padding-right:5px;"><b>Amount</b></td></tr></table></th>';
    html += '<th style="width:30%; padding-left:5px;"><table width="100%"><tr width="100%"><td width="50%" style="text-align:left; padding-left:5px;"><b>Deductions</b></td><td width="50%" style="text-align:right; padding-right:5px;"><b>Amount</b></td></tr></table></th>';
    html += '<th style="width:15%; padding-left:5px;"><table width="100%"><tr width="100%"><td width="50%" style="text-align:left; padding-left:5px;"><b>Company</b></td><td width="50%" style="text-align:right; padding-right:5px;"><b>Amount</b></td></tr></table></th>';
    html += '</tr>';
    html += '</thead>';

    if (arrPayrollDetails != undefined) {        
        if (parseInt(EmployeeID) >= 0) {            
            for (var i = 0; i < arrPayrollDetails.length; i++) {
                StateCode = (arrPayrollDetails[i].StateCode == null ? '' : arrPayrollDetails[i].StateCode);
                html += '<tr id="tr' + _.escape(i) + '" class="' + (i % 2 == 0 ? "footable-even" : "footable-odd") + '">';                
                html += '<td style="text-align:left; padding-left:5px; vertical-align:top;">' + _.escape(arrPayrollDetails[i].EmployeeFullName) + '<br> Net: ' + _.escape(accounting.formatMoney(arrPayrollDetails[i].NetPayCheck == null ? 0 : arrPayrollDetails[i].NetPayCheck)) + '<br>';               
                html += _.escape(FormatDateUTC(arrPayrollDetails[i].PayDate)) + '<br>';
                html += (arrPayrollDetails[i].PaymentMethod == 'Check'? 'C': 'DD') + ' : <br>';
                html += _.escape(arrPayrollDetails[i].PayPeriod);               
                html += '</td>';

                //Column-2
                html += '<td style="text-align:left; padding-left:5px; vertical-align:top;"><table width="100%"><tr width="100%"><td width="34%" style="text-align:left; padding-left:5px;">' + _.escape(arrPayrollDetails[i].PayType) + '</td><td width="33%" style="text-align:left; padding-left:5px;">' + _.escape(arrPayrollDetails[i].RegularHours.toFixed(2)) + '</td><td width="33%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(arrPayrollDetails[i].RegularAmount == null ? 0 : arrPayrollDetails[i].RegularAmount)) + '</td></tr>';
                IsAdded = false;
                for (var j = 0; j < PayType.length; j++) {
                    if (PayType.length == 0) {
                        PayType[j] = _.escape(arrPayrollDetails[i].PayType);
                        PayTypeHour[j] = parseFloat(arrPayrollDetails[i].RegularHours.toFixed(2));
                        PayTypeTotal[j] = arrPayrollDetails[i].RegularAmount == null ? 0 : arrPayrollDetails[i].RegularAmount + arrPayrollDetails[i].PaidByEmployer;
                        IsAdded = true;
                        break;
                    }
                    else if (_.escape(arrPayrollDetails[i].PayType) === PayType[j]) {
                        PayTypeHour[j] = parseFloat(PayTypeHour[j]) + parseFloat(arrPayrollDetails[i].RegularHours.toFixed(2));
                        PayTypeTotal[j] = parseFloat(PayTypeTotal[j]) + (arrPayrollDetails[i].RegularAmount == null ? 0 : arrPayrollDetails[i].RegularAmount);
                        IsAdded = true;
                        break;
                    }
                }
                if (IsAdded == false) {
                    var k = PayType.length;
                    PayType[k] = _.escape(arrPayrollDetails[i].PayType);
                    PayTypeHour[k] = parseFloat(arrPayrollDetails[i].RegularHours.toFixed(2));
                    PayTypeTotal[k] = arrPayrollDetails[i].RegularAmount == null ? 0 : arrPayrollDetails[i].RegularAmount;

                }
                //--- Additons Calculation start
                var xmlDocAdditions = $.parseXML(arrPayrollDetails[i].Additions);
                var $xmlAdditions = $(xmlDocAdditions);
                var $additions = $xmlAdditions.find("additions");
                var Addition;
                var AdditionAmount;

                for (var z = 0; z < $additions.length; z++) {

                    Addition = $additions[z].getAttribute("paystubname");
                    AdditionAmount = $additions[z].getAttribute('Amount');

                    html += '<tr><td style="text-align:left; padding-left:5px; width:34%">' + _.escape(Addition) + "</td>";
                    html += '<td style="text-align:left; padding-left:5px; width:33%"></td>';
                    html += '<td style="text-align:right; padding-right:5px; width:33%">' + _.escape(accounting.formatMoney(AdditionAmount)) + "</td></tr>";

                    IsAdditionAdded = false;
                    for (var j = 0; j < AdditionType.length; j++) {
                        if (AdditionType.length == 0) {

                            AdditionType[j] = _.escape(Addition);
                            AdditionTypeTotal[j] = AdditionAmount == null ? 0 : parseFloat(AdditionAmount);
                            IsAdditionAdded = true;
                            break;
                        }
                        else if (_.escape(Addition) == AdditionType[j]) {

                            AdditionTypeTotal[j] = parseFloat(AdditionTypeTotal[j]) + (AdditionAmount == null ? 0 : parseFloat(AdditionAmount));
                            IsAdditionAdded = true;
                            break;
                        }
                    }
                    if (IsAdditionAdded == false) {
                        var k = AdditionType.length;
                        AdditionType[k] = _.escape(Addition);
                        AdditionTypeTotal[k] = AdditionAmount == null ? 0 : parseFloat(AdditionAmount);
                    }
                }
                html += '</table ></td >';
                //end of array calculation

                //Column-3
                html += '<td style="text-align:right; padding-left:5px; vertical-align:top;">';
                html += '<table width="100%"><tr width="100%"><td width="50%" style="text-align:left; padding-left:5px;">FIT</td> <td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(arrPayrollDetails[i].FederalTaxAmount == null ? 0 : arrPayrollDetails[i].FederalTaxAmount)) + '</td></tr > '
                html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">SS</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(arrPayrollDetails[i].SocialSecurityTaxAmount == null ? 0 : arrPayrollDetails[i].SocialSecurityTaxAmount)) + '</td></tr>';
                html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">Med</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(arrPayrollDetails[i].MedicareTaxAmount == null ? 0 : arrPayrollDetails[i].MedicareTaxAmount)) + '</td></tr>';
                html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">' + _.escape(StateCode) + ' PIT</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(arrPayrollDetails[i].StateTaxAmount == null ? 0 : arrPayrollDetails[i].StateTaxAmount)) + '</td></tr></table>';
                html += '</td>';

                FIT = FIT + (arrPayrollDetails[i].FederalTaxAmount == null ? 0 : arrPayrollDetails[i].FederalTaxAmount);
                SS = SS + (arrPayrollDetails[i].SocialSecurityTaxAmount == null ? 0 : arrPayrollDetails[i].SocialSecurityTaxAmount);
                MED = MED + (arrPayrollDetails[i].MedicareTaxAmount == null ? 0 : arrPayrollDetails[i].MedicareTaxAmount);
                GA_PIT = GA_PIT + (arrPayrollDetails[i].StateTaxAmount == null ? 0 : arrPayrollDetails[i].StateTaxAmount);
                //Column-4

                html += '<td style="text-align:right; padding-left:5px; vertical-align:top;"><table style="width:100%; border: 0px solid #90949b;"><tr style="display:none;"><td colspan="2" ></td></tr>';


                var xmlDoc = $.parseXML(arrPayrollDetails[i].Deductions);
                var $xml = $(xmlDoc);
                var $deductions = $xml.find("deductions");
                var Deduction;
                var DeductionAmount;
                for (var z = 0; z < $deductions.length; z++) {

                    Deduction = $deductions[z].getAttribute("paystubname");
                    DeductionAmount = $deductions[z].getAttribute('Amount');

                    html += '<tr><td style="text-align:left; padding-left:5px; width:60%">' + _.escape(Deduction) + "</td>";
                    html += '<td style="text-align:right; padding-right:5px; width:40%">' + _.escape(accounting.formatMoney(DeductionAmount)) + "</td></tr>";

                    IsDeductionAdded = false;
                    for (var j = 0; j < DeductionType.length; j++) {
                        if (DeductionType.length == 0) {
                            //alert(_.escape(Deduction));
                            DeductionType[j] = _.escape(Deduction);
                            DeductionTypeTotal[j] = DeductionAmount == null ? 0 : parseFloat(DeductionAmount);
                            IsDeductionAdded = true;
                            break;
                        }
                        else if (_.escape(Deduction) == DeductionType[j]) {

                            DeductionTypeTotal[j] = parseFloat(DeductionTypeTotal[j]) + (DeductionAmount == null ? 0 : parseFloat(DeductionAmount));
                            IsDeductionAdded = true;
                            break;
                        }
                    }
                    if (IsDeductionAdded == false) {
                        var k = DeductionType.length;
                        DeductionType[k] = _.escape(Deduction);
                        DeductionTypeTotal[k] = DeductionAmount == null ? 0 : parseFloat(DeductionAmount);
                    }
                }
                html += '</table></td>';

                //Column-5
                html += '<td style="text-align:right; padding-right:5px; vertical-align:top;">';
                html += '<table width="100%"><tr width="50%" style="text-align:left; padding-left:5px;"><td style="text-align:left; padding-left:5px;">FUTA</td> <td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(arrPayrollDetails[i].EmployerFUTATaxAmount == null ? 0 : arrPayrollDetails[i].EmployerFUTATaxAmount)) + '</td></tr > '
                html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">SS</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(arrPayrollDetails[i].EmployerSocialSecurityTaxAmount == null ? 0 : arrPayrollDetails[i].EmployerSocialSecurityTaxAmount)) + '</td></tr>';
                html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">Med</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(arrPayrollDetails[i].EmployerMedicareTaxAmount == null ? 0 : arrPayrollDetails[i].EmployerMedicareTaxAmount)) + '</td></tr>';
                html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">' + _.escape(StateCode) + ' SUI</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(arrPayrollDetails[i].EmployerSUITaxAmount == null ? 0 : arrPayrollDetails[i].EmployerSUITaxAmount)) + '</td></tr>';
                html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">' + _.escape(StateCode) + ' ADMIN</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(arrPayrollDetails[i].EmployerAdminAssessmentTaxAmount == null ? 0 : arrPayrollDetails[i].EmployerAdminAssessmentTaxAmount)) + '</td></tr></table>';
                html += '</td>';
                html += '</tr>';

                FUTA = FUTA + (arrPayrollDetails[i].EmployerFUTATaxAmount == null ? 0 : arrPayrollDetails[i].EmployerFUTATaxAmount);
                CompanySS = CompanySS + (arrPayrollDetails[i].EmployerSocialSecurityTaxAmount == null ? 0 : arrPayrollDetails[i].EmployerSocialSecurityTaxAmount);
                CompanyMED = CompanyMED + (arrPayrollDetails[i].EmployerMedicareTaxAmount == null ? 0 : arrPayrollDetails[i].EmployerMedicareTaxAmount);
                GA_SUI = GA_SUI + (arrPayrollDetails[i].EmployerSUITaxAmount == null ? 0 : arrPayrollDetails[i].EmployerSUITaxAmount);
                GA_ADMIN = GA_ADMIN + (arrPayrollDetails[i].EmployerAdminAssessmentTaxAmount == null ? 0 : arrPayrollDetails[i].EmployerAdminAssessmentTaxAmount);

                //Grand total calculation
                NetPayCheck = NetPayCheck + (arrPayrollDetails[i].NetPayCheck == null ? 0 : arrPayrollDetails[i].NetPayCheck);
                RegularAmount = RegularAmount + (arrPayrollDetails[i].RegularAmount == null ? 0 : arrPayrollDetails[i].RegularAmount) + parseFloat(arrPayrollDetails[i].TotalAdditions) + + arrPayrollDetails[i].PaidByEmployer;
                RegularHours = RegularHours + (arrPayrollDetails[i].RegularHours == null ? 0 : arrPayrollDetails[i].RegularHours);
                Tax = Tax + (arrPayrollDetails[i].Tax == null ? 0 : arrPayrollDetails[i].Tax);
                FinalDeductions = FinalDeductions + (arrPayrollDetails[i].TotalDeductions == null ? 0 : arrPayrollDetails[i].TotalDeductions);
                EmployerTax = EmployerTax + (arrPayrollDetails[i].EmployerTax == null ? 0 : arrPayrollDetails[i].EmployerTax);

            }

            // Total Row html ...
            html += '<tr bgcolor="#ccddff">';
            html += '<td style="text-align:left; vertical-align:top; padding-left:5px;">Total <br><span style="text-align:left; vertical-align:top; padding-left:25px;"> Net: ' + _.escape(accounting.formatMoney(NetPayCheck)) + '</span></td>';
            html += '<td style="text-align:right; vertical-align:top; padding-right:5px;">';
            html += '<table width="100%">';
            for (var x = 0; x < PayType.length; x++) {
                html += '<tr width="100%"><td width="34%" style="text-align:left; padding-left:5px;">' + PayType[x] + '</td><td width="33%" style="text-align:left; padding-left:5px;">' + PayTypeHour[x] + '</td><td width="33%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(PayTypeTotal[x])) + '</td></tr>';
            }
            for (var x = 0; x < AdditionType.length; x++) {
                html += '<tr style="width:100%; border: 0px solid #90949b;"><td width="34%" style="text-align:left; padding-left:5px;">' + AdditionType[x] + '</td><td width="33%"></td><td width="33%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(AdditionTypeTotal[x])) + '</td></tr>';
            }
            html += '</table></td>';

            html += '<td style="text-align:right; vertical-align:top; padding-right:5px;">';
            html += '<table width="100%"><tr width="100%"><td width="50%" style="text-align:left; padding-left:5px;">FIT</td> <td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(FIT)) + '</td></tr > '
            html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">SS</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(SS)) + '</td></tr>';
            html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">Med</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(MED)) + '</td></tr>';
            html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">' + _.escape(StateCode) + ' PIT</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(GA_PIT)) + '</td></tr></table>';
            html += '</td>';

            html += '<td style="text-align:right; vertical-align:top; padding-right:5px;"><table style="width:100%; border: 0px solid #90949b;"><tr style="display:none;"><td colspan="2" ></td></tr>';
            for (var x = 0; x < DeductionType.length; x++) {
                html += '<tr style="width:100%; border: 0px solid #90949b;"><td width="70%" style="text-align:left; padding-left:5px;">' + DeductionType[x] + '</td><td width="30%" style="text-align:right; padding-left:5px;">' + _.escape(accounting.formatMoney(DeductionTypeTotal[x])) + '</td></tr>';
            }
            html += '</table></td>';

            html += '<td style="text-align:right; vertical-align:top; padding-left:5px;">';
            html += '<table width="100%"><tr width="50%" style="text-align:left; padding-left:5px;"><td style="text-align:left; padding-left:5px;">FUTA</td> <td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(FUTA)) + '</td></tr > '
            html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">SS</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(CompanySS)) + '</td></tr>';
            html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">Med</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(CompanyMED)) + '</td></tr>';
            html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">' + _.escape(StateCode) + ' SUI</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(GA_SUI)) + '</td></tr>';
            html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">' + _.escape(StateCode) + ' ADMIN</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(GA_ADMIN)) + '</td></tr></table>';
            html += '</td>';
            html += '</tr>';
            //Grand Total Row html ...
            html += '<tr id="trSummary">';
            html += '<td colspan="5"><b>&nbsp;Grand Total:</b></td></tr><tr>';
            html += '<td style="text-align:right;padding-right:5px;vertical-align:top;"><b>Net: ' + _.escape(accounting.formatMoney(NetPayCheck)) + '</b></td>';
            html += '<td style="text-align:right;vertical-align:top;padding-right:5px;"><table width="100%"><tr table width="100%"><td table width="34%"></td><td style="text-align:left;" width="33%"><b >' + _.escape(RegularHours.toFixed(2)) + '</b></td><td width="33%"><b style="text-align:left">' + _.escape(accounting.formatMoney(RegularAmount)) + '</b></td></tr></table></td>';
            html += '<td style="text-align:right;vertical-align:top;padding-right:5px;"><b>' + _.escape(accounting.formatMoney(Tax)) + '</b></td>';
            html += '<td style="text-align:right;vertical-align:top;padding-right:5px;"><b>' + _.escape(accounting.formatMoney(FinalDeductions)) + '</td>';
            html += '<td style="text-align:right;vertical-align:top;padding-right:5px;"><b>' + _.escape(accounting.formatMoney(EmployerTax)) + '</b></td>';
            html += '</tr></table>';
            $('#divPayrollDetails').html(html);

        }
        else  // Employee wise summary report
        {
            var m = 0
            var EmpID = 0;
            var EmployeeFullName = '';
            var EmpStateCode = '';

            var EmpNetPayCheck = 0;
            var EmpRegularHours = 0;
            var EmpTax = 0;
            var EmpFinalDeductions = 0;
            var EmpRegularAmount = 0;
            var EmpEmployerTax = 0;
            var EmpFIT = 0;
            var EmpSS = 0;
            var EmpMED = 0;
            var EmpGA_PIT = 0;

            var EmpFUTA = 0;
            var EmpCompanySS = 0;
            var EmpCompanyMED = 0;
            var EmpGA_SUI = 0;
            var EmpGA_ADMIN = 0;
            var EmpPayType = new Array();
            var EmpPayTypeHour = new Array();
            var EmpPayTypeTotal = new Array();

            //Last Row total variable
            var Total_EmpNetPayCheck = 0;
            var Total_EmpRegularHours = 0;
            var Total_EmpTax = 0;
            var Total_EmpFinalDeductions = 0;
            var Total_EmpRegularAmount = 0;
            var Total_EmpEmployerTax = 0;
            var Total_EmpFIT = 0;
            var Total_EmpSS = 0;
            var Total_EmpMED = 0;
            var Total_EmpGA_PIT = 0;
            var Total_EmpFUTA = 0;
            var Total_EmpCompanySS = 0;
            var Total_EmpCompanyMED = 0;
            var Total_EmpGA_SUI = 0;
            var Total_EmpGA_ADMIN = 0;

            var Total_PayType = new Array();
            var Total_PayTypeHour = new Array();
            var Total_PayTypeTotal = new Array();

            var Total_DeductionType = new Array();
            var Total_DeductionTypeTotal = new Array();

            var Total_AdditionType = new Array();
            var Total_AdditionTypeTotal = new Array();

            //Display employee summary
            for (var i = 0; i < arrPayrollDetails.length; i++) {
                if (EmpID != arrPayrollDetails[i].employeeID) {
                    EmpID = arrPayrollDetails[i].employeeID;
                    EmployeeFullName = arrPayrollDetails[i].EmployeeFullName == null ? '' : arrPayrollDetails[i].EmployeeFullName;
                    EmpStateCode = (arrPayrollDetails[i].StateCode == null ? '' : arrPayrollDetails[i].StateCode);

                    EmpNetPayCheck = arrPayrollDetails[i].NetPayCheck;
                    EmpRegularHours = arrPayrollDetails[i].RegularHours;
                    EmpTax = arrPayrollDetails[i].Tax;
                    EmpFinalDeductions = arrPayrollDetails[i].TotalDeductions;
                    EmpRegularAmount = arrPayrollDetails[i].RegularAmount;
                    EmpEmployerTax = arrPayrollDetails[i].EmployerTax;
                    EmpFIT = arrPayrollDetails[i].FederalTaxAmount;
                    EmpSS = arrPayrollDetails[i].SocialSecurityTaxAmount;
                    EmpMED = arrPayrollDetails[i].MedicareTaxAmount;
                    EmpGA_PIT = arrPayrollDetails[i].StateTaxAmount;
                    EmpFUTA = arrPayrollDetails[i].EmployerFUTATaxAmount;
                    EmpCompanySS = arrPayrollDetails[i].EmployerSocialSecurityTaxAmount;
                    EmpCompanyMED = arrPayrollDetails[i].EmployerMedicareTaxAmount;
                    EmpGA_SUI = arrPayrollDetails[i].EmployerSUITaxAmount;
                    EmpGA_ADMIN = arrPayrollDetails[i].EmployerAdminAssessmentTaxAmount;

                    var EmpPayType = new Array();
                    var EmpPayTypeHour = new Array();
                    var EmpPayTypeTotal = new Array();

                    //EmpPayType Calculation
                    IsAdded = false;
                    for (var j = 0; j < EmpPayType.length; j++) {
                        if (EmpPayType.length == 0) {
                            EmpPayType[j] = _.escape(arrPayrollDetails[i].PayType);
                            EmpPayTypeHour[j] = parseFloat(arrPayrollDetails[i].RegularHours.toFixed(2));
                            EmpPayTypeTotal[j] = arrPayrollDetails[i].RegularAmount == null ? 0 : arrPayrollDetails[i].RegularAmount;
                            IsAdded = true;
                            break;
                        }
                        else if (_.escape(arrPayrollDetails[i].PayType) === EmpPayType[j]) {
                            EmpPayTypeHour[j] = parseFloat(EmpPayTypeHour[j]) + parseFloat(arrPayrollDetails[i].RegularHours.toFixed(2));
                            EmpPayTypeTotal[j] = parseFloat(EmpPayTypeTotal[j]) + (arrPayrollDetails[i].RegularAmount == null ? 0 : arrPayrollDetails[i].RegularAmount);
                            IsAdded = true;
                            break;
                        }
                    }
                    if (IsAdded == false) {
                        var k = EmpPayType.length;
                        EmpPayType[k] = _.escape(arrPayrollDetails[i].PayType);
                        EmpPayTypeHour[k] = parseFloat(arrPayrollDetails[i].RegularHours.toFixed(2));
                        EmpPayTypeTotal[k] = arrPayrollDetails[i].RegularAmount == null ? 0 : arrPayrollDetails[i].RegularAmount;
                    }

                    //Emp_DeductionType Calculation
                    var xmlDoc = $.parseXML(arrPayrollDetails[i].Deductions);
                    var $xml = $(xmlDoc);
                    var $deductions = $xml.find("deductions");
                    var Deduction;
                    var DeductionAmount;
                    for (var z = 0; z < $deductions.length; z++) {

                        Deduction = $deductions[z].getAttribute("paystubname");
                        DeductionAmount = $deductions[z].getAttribute('Amount');

                        //html += '<tr><td style="text-align:left; padding-left:5px; width:60%">' + _.escape(Deduction) + "</td>";
                        //html += '<td style="text-align:right; padding-right:5px; width:40%">' + _.escape(accounting.formatMoney(DeductionAmount)) + "</td></tr>";

                        IsDeductionAdded = false;
                        for (var j = 0; j < DeductionType.length; j++) {
                            if (DeductionType.length == 0) {
                                //alert(_.escape(Deduction));
                                DeductionType[j] = _.escape(Deduction);
                                DeductionTypeTotal[j] = DeductionAmount == null ? 0 : parseFloat(DeductionAmount);
                                IsDeductionAdded = true;
                                break;
                            }
                            else if (_.escape(Deduction) == DeductionType[j]) {

                                DeductionTypeTotal[j] = parseFloat(DeductionTypeTotal[j]) + (DeductionAmount == null ? 0 : parseFloat(DeductionAmount));
                                IsDeductionAdded = true;
                                break;
                            }
                        }
                        if (IsDeductionAdded == false) {
                            var k = DeductionType.length;
                            DeductionType[k] = _.escape(Deduction);
                            DeductionTypeTotal[k] = DeductionAmount == null ? 0 : parseFloat(DeductionAmount);
                        }
                    }

                    //Emp_AdditionType Calculation Start
                    var xmlDocAdditions = $.parseXML(arrPayrollDetails[i].Additions);
                    var $xmlAdditions = $(xmlDocAdditions);
                    var $additions = $xmlAdditions.find("additions");
                    var Addition;
                    var AdditionAmount;
                    for (var z = 0; z < $additions.length; z++) {

                        Addition = $additions[z].getAttribute("paystubname");
                        AdditionAmount = $additions[z].getAttribute('Amount');

                        //html += '<tr><td style="text-align:left; padding-left:5px; width:34%">' + _.escape(Addition) + "</td>";
                        //html += '<td style="text-align:left; padding-left:5px; width:33%"></td>';
                        //html += '<td style="text-align:right; padding-right:5px; width:33%">' + _.escape(accounting.formatMoney(AdditionAmount)) + "</td></tr>";

                        IsAdditionAdded = false;
                        for (var j = 0; j < AdditionType.length; j++) {
                            if (AdditionType.length == 0) {
                                AdditionType[j] = _.escape(Addition);
                                AdditionTypeTotal[j] = AdditionAmount == null ? 0 : parseFloat(AdditionAmount);
                                IsAdditionAdded = true;
                                break;
                            }
                            else if (_.escape(Addition) == AdditionType[j]) {

                                AdditionTypeTotal[j] = parseFloat(AdditionTypeTotal[j]) + (AdditionAmount == null ? 0 : parseFloat(AdditionAmount));
                                IsAdditionAdded = true;
                                break;
                            }
                        }
                        if (IsAdditionAdded == false) {
                            var k = AdditionType.length;
                            AdditionType[k] = _.escape(Addition);
                            AdditionTypeTotal[k] = AdditionAmount == null ? 0 : parseFloat(AdditionAmount);
                        }
                    }
                }
                else if (EmpID == arrPayrollDetails[i].employeeID) {
                    EmpNetPayCheck = EmpNetPayCheck + arrPayrollDetails[i].NetPayCheck;
                    EmpRegularHours = EmpRegularHours + arrPayrollDetails[i].RegularHours;
                    EmpTax = EmpTax + arrPayrollDetails[i].Tax;
                    EmpFinalDeductions = EmpFinalDeductions + arrPayrollDetails[i].TotalDeductions;
                    EmpRegularAmount = EmpRegularAmount + arrPayrollDetails[i].RegularAmount;
                    EmpEmployerTax = EmpEmployerTax + arrPayrollDetails[i].EmployerTax;
                    EmpFIT = EmpFIT + arrPayrollDetails[i].FederalTaxAmount;
                    EmpSS = EmpSS + arrPayrollDetails[i].SocialSecurityTaxAmount;
                    EmpMED = EmpMED + arrPayrollDetails[i].MedicareTaxAmount;
                    EmpGA_PIT = EmpGA_PIT + arrPayrollDetails[i].StateTaxAmount;
                    EmpFUTA = EmpFUTA + arrPayrollDetails[i].EmployerFUTATaxAmount;
                    EmpCompanySS = EmpCompanySS + arrPayrollDetails[i].EmployerSocialSecurityTaxAmount;
                    EmpCompanyMED = EmpCompanyMED + arrPayrollDetails[i].EmployerMedicareTaxAmount;
                    EmpGA_SUI = EmpGA_SUI + arrPayrollDetails[i].EmployerSUITaxAmount;
                    EmpGA_ADMIN = EmpGA_ADMIN + arrPayrollDetails[i].EmployerAdminAssessmentTaxAmount;

                    //EmpPayType Calculation
                    IsAdded = false;
                    for (var j = 0; j < EmpPayType.length; j++) {
                        if (EmpPayType.length == 0) {
                            EmpPayType[j] = _.escape(arrPayrollDetails[i].PayType);
                            EmpPayTypeHour[j] = parseFloat(arrPayrollDetails[i].RegularHours.toFixed(2));
                            EmpPayTypeTotal[j] = arrPayrollDetails[i].RegularAmount == null ? 0 : arrPayrollDetails[i].RegularAmount;
                            IsAdded = true;
                            break;
                        }
                        else if (_.escape(arrPayrollDetails[i].PayType) === EmpPayType[j]) {
                            EmpPayTypeHour[j] = parseFloat(EmpPayTypeHour[j]) + parseFloat(arrPayrollDetails[i].RegularHours.toFixed(2));
                            EmpPayTypeTotal[j] = parseFloat(EmpPayTypeTotal[j]) + (arrPayrollDetails[i].RegularAmount == null ? 0 : arrPayrollDetails[i].RegularAmount);
                            IsAdded = true;
                            break;
                        }
                    }
                    if (IsAdded == false) {
                        var k = EmpPayType.length;
                        EmpPayType[k] = _.escape(arrPayrollDetails[i].PayType);
                        EmpPayTypeHour[k] = parseFloat(arrPayrollDetails[i].RegularHours.toFixed(2));
                        EmpPayTypeTotal[k] = arrPayrollDetails[i].RegularAmount == null ? 0 : arrPayrollDetails[i].RegularAmount;
                    }

                    //Emp_DeductionType Calculation
                    var xmlDoc = $.parseXML(arrPayrollDetails[i].Deductions);
                    var $xml = $(xmlDoc);
                    var $deductions = $xml.find("deductions");
                    var Deduction;
                    var DeductionAmount;
                    for (var z = 0; z < $deductions.length; z++) {

                        Deduction = $deductions[z].getAttribute("paystubname");
                        DeductionAmount = $deductions[z].getAttribute('Amount');

                        //html += '<tr><td style="text-align:left; padding-left:5px; width:60%">' + _.escape(Deduction) + "</td>";
                        //html += '<td style="text-align:right; padding-right:5px; width:40%">' + _.escape(accounting.formatMoney(DeductionAmount)) + "</td></tr>";

                        IsDeductionAdded = false;
                        for (var j = 0; j < DeductionType.length; j++) {
                            if (DeductionType.length == 0) {
                                //alert(_.escape(Deduction));
                                DeductionType[j] = _.escape(Deduction);
                                DeductionTypeTotal[j] = DeductionAmount == null ? 0 : parseFloat(DeductionAmount);
                                IsDeductionAdded = true;
                                break;
                            }
                            else if (_.escape(Deduction) == DeductionType[j]) {

                                DeductionTypeTotal[j] = parseFloat(DeductionTypeTotal[j]) + (DeductionAmount == null ? 0 : parseFloat(DeductionAmount));
                                IsDeductionAdded = true;
                                break;
                            }
                        }
                        if (IsDeductionAdded == false) {
                            var k = DeductionType.length;
                            DeductionType[k] = _.escape(Deduction);
                            DeductionTypeTotal[k] = DeductionAmount == null ? 0 : parseFloat(DeductionAmount);
                        }
                    }

                    //Emp_AdditionType Calculation Start
                    var xmlDocAdditions = $.parseXML(arrPayrollDetails[i].Additions);
                    var $xmlAdditions = $(xmlDocAdditions);
                    var $additions = $xmlAdditions.find("additions");
                    var Addition;
                    var AdditionAmount;
                    for (var z = 0; z < $additions.length; z++) {

                        Addition = $additions[z].getAttribute("paystubname");
                        AdditionAmount = $additions[z].getAttribute('Amount');

                        //html += '<tr><td style="text-align:left; padding-left:5px; width:34%">' + _.escape(Addition) + "</td>";
                        //html += '<td style="text-align:left; padding-left:5px; width:33%"></td>';
                        //html += '<td style="text-align:right; padding-right:5px; width:33%">' + _.escape(accounting.formatMoney(AdditionAmount)) + "</td></tr>";

                        IsAdditionAdded = false;
                        for (var j = 0; j < AdditionType.length; j++) {
                            if (AdditionType.length == 0) {
                                AdditionType[j] = _.escape(Addition);
                                AdditionTypeTotal[j] = AdditionAmount == null ? 0 : parseFloat(AdditionAmount);
                                IsAdditionAdded = true;
                                break;
                            }
                            else if (_.escape(Addition) == AdditionType[j]) {

                                AdditionTypeTotal[j] = parseFloat(AdditionTypeTotal[j]) + (AdditionAmount == null ? 0 : parseFloat(AdditionAmount));
                                IsAdditionAdded = true;
                                break;
                            }
                        }
                        if (IsAdditionAdded == false) {
                            var k = AdditionType.length;
                            AdditionType[k] = _.escape(Addition);
                            AdditionTypeTotal[k] = AdditionAmount == null ? 0 : parseFloat(AdditionAmount);
                        }
                    }
                }


                var d = parseInt(i) + 1;
                var nextEmpID = 0;
                if (i == (arrPayrollDetails.length - 1))
                    nextEmpID = arrPayrollDetails[i].employeeID;
                else
                    nextEmpID = arrPayrollDetails[d].employeeID;

                if (i == (arrPayrollDetails.length - 1) || EmpID != nextEmpID) {

                    html += '<tr id="tr' + _.escape(m) + '" class="' + (m % 2 == 0 ? "footable-even" : "footable-odd") + '">';
                    //Column-1
                    html += '<td style="text-align:left; padding-left:5px; vertical-align:top;">' + _.escape(EmployeeFullName) + '<br> Net: ' + _.escape(accounting.formatMoney(EmpNetPayCheck)) + '<br></td>';

                    //Column-2
                    //html += '<td style="text-align:left; padding-left:5px; vertical-align:top;"><table width="100%"><tr width="100%"><td width="34%" style="text-align:left; padding-left:5px;">' + _.escape(arrPayrollDetails[i].PayType) + '</td><td width="33%" style="text-align:left; padding-left:5px;">' + _.escape(arrPayrollDetails[i].RegularHours.toFixed(2)) + '</td><td width="33%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(arrPayrollDetails[i].RegularAmount == null ? 0 : arrPayrollDetails[i].RegularAmount)) + '</td></tr>';
                    html += '<td style="text-align:left; padding-left:5px; vertical-align:top;"><table width="100%"><tr width="100%" style="display:none;"><td width="100%" colspan="3"></tr>';
                    //alert(EmpPayType.length);
                    for (var x = 0; x < EmpPayType.length; x++) {
                        html += '<tr width="100%"><td width="34%" style="text-align:left; padding-left:5px;">' + EmpPayType[x] + '</td><td width="33%" style="text-align:left; padding-left:5px;">' + EmpPayTypeHour[x] + '</td><td width="33%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(EmpPayTypeTotal[x])) + '</td></tr>';
                        //alert(_.escape(EmpPayType[x]));
                        //Total_PayType Calculation
                        IsAdded = false;
                        for (var j = 0; j < Total_PayType.length; j++) {
                            if (Total_PayType.length == 0) {
                                Total_PayType[j] = _.escape(EmpPayType[x]);
                                Total_PayTypeHour[j] = parseFloat(EmpPayTypeHour[x]);
                                Total_PayTypeTotal[j] = parseFloat(EmpPayTypeTotal[x]);
                                IsAdded = true;
                                break;
                            }
                            else if (_.escape(Total_PayType[j]) === EmpPayType[x]) {
                                Total_PayTypeHour[j] = parseFloat(Total_PayTypeHour[j]) + parseFloat(EmpPayTypeHour[x]);
                                Total_PayTypeTotal[j] = parseFloat(Total_PayTypeTotal[j]) + parseFloat(EmpPayTypeTotal[x]);
                                IsAdded = true;
                                break;
                            }
                        }
                        if (IsAdded == false) {
                            var k = Total_PayType.length;
                            Total_PayType[k] = _.escape(EmpPayType[x]);
                            Total_PayTypeHour[k] = parseFloat(EmpPayTypeHour[x]);
                            Total_PayTypeTotal[k] = parseFloat(EmpPayTypeTotal[x]);
                        }
                    }
                    for (var x = 0; x < AdditionType.length; x++) {
                        html += '<tr style="width:100%; border: 0px solid #90949b;"><td width="34%" style="text-align:left; padding-left:5px;">' + AdditionType[x] + '</td><td width="33%"></td><td width="33%" style="text-align:right; padding-right:0px;">' + _.escape(accounting.formatMoney(AdditionTypeTotal[x])) + '</td></tr>';

                        Addition = AdditionType[x];
                        AdditionAmount = parseFloat(AdditionTypeTotal[x]);
                        IsAdditionAdded = false;

                        for (var j = 0; j < Total_AdditionType.length; j++) {
                            if (Total_AdditionType.length == 0) {
                                Total_AdditionType[j] = _.escape(Addition);
                                Total_AdditionTypeTotal[j] = AdditionAmount == null ? 0 : parseFloat(AdditionAmount);
                                IsAdditionAdded = true;
                                break;
                            }
                            else if (_.escape(Addition) == Total_AdditionType[j]) {

                                Total_AdditionTypeTotal[j] = parseFloat(Total_AdditionTypeTotal[j]) + (AdditionAmount == null ? 0 : parseFloat(AdditionAmount));
                                IsAdditionAdded = true;
                                break;
                            }
                        }
                        if (IsAdditionAdded == false) {
                            var k = Total_AdditionType.length;
                            Total_AdditionType[k] = _.escape(Addition);
                            Total_AdditionTypeTotal[k] = AdditionAmount == null ? 0 : parseFloat(AdditionAmount);
                        }
                    }
                    html += '</table ></td >';
                    //end of array calculation

                    //Column-3
                    html += '<td style="text-align:right; padding-left:5px; vertical-align:top;">';
                    html += '<table width="100%"><tr width="100%"><td width="50%" style="text-align:left; padding-left:5px;">FIT</td> <td width="50%" style="text-align:right; padding-right:0px;">' + _.escape(accounting.formatMoney(EmpFIT)) + '</td></tr > '
                    html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">SS</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(EmpSS)) + '</td></tr>';
                    html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">Med</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(EmpMED)) + '</td></tr>';
                    html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">' + _.escape(StateCode) + ' PIT</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(EmpGA_PIT)) + '</td></tr></table>';
                    html += '</td>';

                    Total_EmpFIT = Total_EmpFIT + EmpFIT;
                    Total_EmpSS = Total_EmpSS + EmpSS;
                    Total_EmpMED = Total_EmpMED + EmpMED;
                    Total_EmpGA_PIT = Total_EmpGA_PIT + EmpGA_PIT;
                    //Column-4

                    html += '<td style="text-align:right; padding-left:5px; vertical-align:top;"><table style="width:100%; border: 0px solid #90949b;"><tr style="display:none;"><td colspan="2" ></td></tr>';
                    for (var x = 0; x < DeductionType.length; x++) {
                        html += '<tr style="width:100%; border: 0px solid #90949b;"><td width="70%" style="text-align:left; padding-left:5px;">' + DeductionType[x] + '</td><td width="30%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(DeductionTypeTotal[x])) + '</td></tr>';

                        Deduction = DeductionType[x];
                        DeductionAmount = parseFloat(DeductionTypeTotal[x]);
                        IsDeductionAdded = false;

                        for (var j = 0; j < Total_DeductionType.length; j++) {
                            if (Total_DeductionType.length == 0) {
                                Total_DeductionType[j] = _.escape(Deduction);
                                Total_DeductionTypeTotal[j] = DeductionAmount == null ? 0 : parseFloat(DeductionAmount);
                                IsDeductionAdded = true;
                                break;
                            }
                            else if (_.escape(Deduction) == Total_DeductionType[j]) {
                                Total_DeductionTypeTotal[j] = parseFloat(Total_DeductionTypeTotal[j]) + (DeductionAmount == null ? 0 : parseFloat(DeductionAmount));
                                IsDeductionAdded = true;
                                break;
                            }
                        }
                        if (IsDeductionAdded == false) {
                            var k = Total_DeductionType.length;
                            Total_DeductionType[k] = _.escape(Deduction);
                            Total_DeductionTypeTotal[k] = DeductionAmount == null ? 0 : parseFloat(DeductionAmount);
                        }
                    }
                    html += '</table></td>';

                    //Column-5
                    html += '<td style="text-align:right; padding-right:5px; vertical-align:top;">';
                    html += '<table width="100%"><tr width="50%" style="text-align:left; padding-left:5px;"><td style="text-align:left; padding-left:5px;">FUTA</td> <td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(EmpFUTA)) + '</td></tr > '
                    html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">SS</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(EmpCompanySS)) + '</td></tr>';
                    html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">Med</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(EmpCompanyMED)) + '</td></tr>';
                    html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">' + _.escape(StateCode) + ' SUI</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(EmpGA_SUI)) + '</td></tr>';
                    html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">' + _.escape(StateCode) + ' ADMIN</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(EmpGA_ADMIN)) + '</td></tr></table>';
                    html += '</td>';
                    html += '</tr>';

                    Total_EmpFUTA = Total_EmpFUTA + EmpFUTA;
                    Total_EmpCompanySS = Total_EmpCompanySS + EmpCompanySS;
                    Total_EmpCompanyMED = Total_EmpCompanyMED + EmpCompanyMED;
                    Total_EmpGA_SUI = Total_EmpGA_SUI + EmpGA_SUI;
                    Total_EmpGA_ADMIN = Total_EmpGA_ADMIN + EmpGA_ADMIN;

                    //Grand total calculation
                    Total_EmpNetPayCheck = Total_EmpNetPayCheck + EmpNetPayCheck;
                    Total_EmpRegularHours = Total_EmpRegularHours + EmpRegularHours;
                    Total_EmpRegularAmount = Total_EmpRegularAmount + EmpRegularAmount;
                    Total_EmpTax = Total_EmpTax + EmpTax;
                    Total_EmpFinalDeductions = Total_EmpFinalDeductions + EmpFinalDeductions;
                    Total_EmpEmployerTax = Total_EmpEmployerTax + EmpEmployerTax;
                    m = m + 1; // counter for row color
                }
            }

            // Total Row html ...

            html += '<tr bgcolor="#ccddff">';
            html += '<td style="text-align:left; vertical-align:top; padding-left:5px;">Total <br><span style="text-align:left; vertical-align:top; padding-left:25px;"> Net: ' + _.escape(accounting.formatMoney(Total_EmpNetPayCheck)) + '</span></td>';
            html += '<td style="text-align:right; vertical-align:top; padding-right:5px;">';
            html += '<table width="100%">';
            // alert(Total_PayType.length);
            for (var x = 0; x < Total_PayType.length; x++) {
                //alert(Total_PayType[x]);
                html += '<tr width="100%"><td width="34%" style="text-align:left; padding-left:5px;">' + Total_PayType[x] + '</td><td width="33%" style="text-align:left; padding-left:5px;">' + Total_PayTypeHour[x] + '</td><td width="33%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(Total_PayTypeTotal[x])) + '</td></tr>';
            }
            for (var x = 0; x < Total_AdditionType.length; x++) {
                html += '<tr style="width:100%; border: 0px solid #90949b;"><td width="34%" style="text-align:left; padding-left:5px;">' + Total_AdditionType[x] + '</td><td width="33%"></td><td width="33%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(Total_AdditionTypeTotal[x])) + '</td></tr>';
            }
            html += '</table></td>';

            html += '<td style="text-align:right; vertical-align:top; padding-right:5px;">';
            html += '<table width="100%"><tr width="100%"><td width="50%" style="text-align:left; padding-left:5px;">FIT</td> <td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(Total_EmpFIT)) + '</td></tr > '
            html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">SS</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(Total_EmpSS)) + '</td></tr>';
            html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">Med</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(Total_EmpMED)) + '</td></tr>';
            html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">' + _.escape(StateCode) + ' PIT</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(Total_EmpGA_PIT)) + '</td></tr></table>';
            html += '</td>';

            html += '<td style="text-align:right; vertical-align:top; padding-right:5px;"><table style="width:100%; border: 0px solid #90949b;"><tr style="display:none;"><td colspan="2" ></td></tr>';
            for (var x = 0; x < Total_DeductionType.length; x++) {
                html += '<tr style="width:100%; border: 0px solid #90949b;"><td width="70%" style="text-align:left; padding-left:5px;">' + Total_DeductionType[x] + '</td><td width="30%" style="text-align:right; padding-left:5px;">' + _.escape(accounting.formatMoney(Total_DeductionTypeTotal[x])) + '</td></tr>';
            }
            html += '</table></td>';

            html += '<td style="text-align:right; vertical-align:top; padding-left:5px;">';
            html += '<table width="100%"><tr width="50%" style="text-align:left; padding-left:5px;"><td style="text-align:left; padding-left:5px;">FUTA</td> <td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(Total_EmpFUTA)) + '</td></tr > '
            html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">SS</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(Total_EmpCompanySS)) + '</td></tr>';
            html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">Med</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(Total_EmpCompanyMED)) + '</td></tr>';
            html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">' + _.escape(StateCode) + ' SUI</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(Total_EmpGA_SUI)) + '</td></tr>';
            html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">' + _.escape(StateCode) + ' ADMIN</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(Total_EmpGA_ADMIN)) + '</td></tr></table>';
            html += '</td>';
            html += '</tr>';

            //Grand Total Row html ...

            html += '<tr id="trSummary">';
            html += '<td colspan="5"><b>&nbsp;Grand Total:</b></td></tr><tr>';
            html += '<td style="text-align:right;padding-right:5px;vertical-align:top;"><b>Net: ' + _.escape(accounting.formatMoney(Total_EmpNetPayCheck)) + '</b></td>';
            html += '<td style="text-align:right;vertical-align:top;padding-right:5px;"><table width="100%"><tr table width="100%"><td table width="34%"></td><td style="text-align:left;" width="33%"><b >' + _.escape(Total_EmpRegularHours.toFixed(2)) + '</b></td><td width="33%"><b style="text-align:left">' + _.escape(accounting.formatMoney(Total_EmpRegularAmount)) + '</b></td></tr></table></td>';
            html += '<td style="text-align:right;vertical-align:top;padding-right:5px;"><b>' + _.escape(accounting.formatMoney(Total_EmpTax)) + '</b></td>';
            html += '<td style="text-align:right;vertical-align:top;padding-right:5px;"><b>' + _.escape(accounting.formatMoney(Total_EmpFinalDeductions)) + '</td>';
            html += '<td style="text-align:right;vertical-align:top;padding-right:5px;"><b>' + _.escape(accounting.formatMoney(Total_EmpEmployerTax)) + '</b></td>';
            html += '</tr>';
            html += '</table>';
            $('#divPayrollDetails').html(html);
        }
    }    
}
FillGrid();

function ExportToExcel() {
    var blob = new Blob([$('#divPayrollDetails').html()], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
    });
    saveAs(blob, "Report.xls");
}

function ExportToWord() {
    var word = '<html ';
    word += "xmlns:o='urn:schemas-microsoft-com:office:office' ";
    word += "xmlns:w='urn:schemas-microsoft-com:office:word'";
    word += "xmlns='http://www.w3.org/TR/REC-html40'>";
    word += "<head><title>Time</title>";

    word += "<!--[if gte mso 9]>";
    word += "<xml>";
    word += "<w:WordDocument>";
    word += "<w:View>Print</w:View>";
    word += "<w:Zoom>100</w:Zoom>";
    word += "<w:DoNotOptimizeForBrowser/>";
    word += "</w:WordDocument>";
    word += "</xml>";
    word += "<![endif]-->";

    word += "<style>";
    word += "<!-- /* Style Definitions */";
    word += "@page Section1";
    word += "   {size:8.5in 11.0in; ";
    word += "   margin:.5in .5in .5in .5in ; ";
    word += "   mso-header-margin:.5in; ";
    word += "   mso-footer-margin:.5in; mso-paper-source:0;}";
    word += " div.Section1";
    word += "   {page:Section1;}";
    word += "-->";
    word += "</style></head>";

    word += "<body lang=EN-US style='tab-interval:.5in'>";
    word += "<div class=Section1>";
    word += $('#divPayrollDetails').html();
    word += "</div></body></html>";
    var blob = new Blob([word], {
        type: "application/msword"
    });
    saveAs(blob, "Report.doc");
}


//function ExportToPDF() {
//    var params = {
//        FromDate: $('#txtFromDate').val(),
//        ToDate: $('#txtToDate').val(),
//        LocationID: $('#cmbLocationName').val(),
//        EmployeeID: $('#cmbEmployeeName').val()
//    };
//    var FileName = CallService('Client/Reports/EmployeeReports/PayrollDetails.svc', 'PayrollDetailsPDF', params);

//    var req = new XMLHttpRequest();
//    req.open("GET", '/temp/' + FileName, true);
//    req.responseType = "blob";

//    req.onload = function (event) {
//        var blob = req.response;
//        console.log(blob.size);
//        var link = document.createElement('a');
//        var URL = window.URL || window.webkitURL;
//        var downloadUrl = URL.createObjectURL(blob);
//        if (typeof link.download === 'undefined') {
//            window.location = downloadUrl;
//        } else {

//            link.href = window.URL.createObjectURL(blob);
//            document.body.appendChild(link);
//            link.target = "_blank";
//            link.download = "PayrollDetailsPDF.pdf";
//            link.click();
//        }
//    };
//    req.send();
//}
window.scrollTo(0, 0);