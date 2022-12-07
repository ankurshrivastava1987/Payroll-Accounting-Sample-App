
exports.PayrollDetails = function (req, res) {
    var dtoPayCheck = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientID);
            request.input('FromDate', sql.VarChar(10), query.FromDate);
            request.input('ToDate', sql.VarChar(10), query.ToDate);
            request.input('LocationId', sql.BigInt, query.LocationID);
            request.input('EmployeeId', sql.BigInt, query.EmployeeID);
            request.execute('prcPayrollDetails', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        res.json(recordsets[0]);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};

//exports.PayrollDetailsPDF = function (req, res) {
//    var arrTables;
//    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
//        if (err) {
//            winston.log('error', err);
//        }
//        else {
//            var request = new sql.Request(connection);
//            var query = req.body;
//            request.input('FromDate', sql.VarChar(10), query.FromDate);
//            request.input('ToDate', sql.VarChar(10), query.ToDate);
//            request.input('LocationID', sql.BigInt, query.LocationID);
//            request.input('EmployeeID', sql.BigInt, query.EmployeeID);
//            request.execute('prcPayrollDetails', function (err, recordsets, returnValue, affected) {
//                connection.close();
//                if (err) {
//                    winston.log('error', err);
//                }
//                else {
//                    try {
//                        arrTables = recordsets;
//                        if (arrTables != undefined) {
//                            var EmployeeID = query.EmployeeID;
//                            var html = '';
//                            var NetPayCheck = 0;
//                            var RegularHours = 0;
//                            var Tax = 0;
//                            var Deductions = 0;
//                            var RegularAmount = 0;
//                            var EmployerTax = 0;

//                            var FIT = 0;
//                            var SS = 0;
//                            var MED = 0;
//                            var GA_PIT = 0;

//                            var FUTA = 0;
//                            var CompanySS = 0;
//                            var CompanyMED = 0;
//                            var GA_SUI = 0;
//                            var GA_ADMIN = 0;

//                            var PayType = new Array();
//                            var PayTypeHour = new Array();
//                            var PayTypeTotal = new Array();
//                            var IsAdded = false;


//                            var DeductionType = new Array();
//                            var DeductionTypeTotal = new Array();
//                            var IsDeductionAdded = false;

//                            html += '<table border="1" id="tblPayrollDetails" style="width:100%; border: 1px solid #90949b;">';
//                            html += '<thead style="width:100%" valign="top"> <tr style="background-color:#4267b2;color:#fff">';
//                            html += '<th style="text-align:left; padding-left:5px;"> Employee </th>';
//                            html += '<th style="text-align:left; padding-left:5px;"><table width="100%"><tr table width="100%"><td table width="34%">Pay Type</td><td table width="33%"><b style="text-align:left">Hours</td><td width="33%"><b style="text-align:left">Amount</td></tr></table></th>';
//                            html += '<th style="text-align:left; padding-left:5px;"> <span width="50%" style="text-align:left; padding-left:5px;">Taxes</span>&nbsp;<span width="50%" style="text-align:right; padding-right:5px;">Amount</span>    </th>';
//                            html += '<th style="text-align:left; padding-left:5px;"><span width="50%" style="text-align:left; padding-left:5px;">Deductions</span>&nbsp;<span width="50%" style="text-align:right; padding-right:5px;">Amount</span>     </th>';
//                            html += '<th style="text-align:left; padding-left:5px;"><span width="50%" style="text-align:left; padding-left:5px;">Company</span>&nbsp;<span width="50%" style="text-align:right; padding-right:5px;">Amount</span>     </th>';
//                            html += '</tr></thead>';

//                            for (var i = 0; i < arrPayrollDetails.length; i++) {
//                                html += '<tr id="tr' + _.escape(i) + '" class="' + (i % 2 == 0 ? "footable-even" : "footable-odd") + '">';
//                                //Column-1
//                                html += '<td style="text-align:left; padding-left:5px;">' + _.escape(arrPayrollDetails[i].EmployeeFullName) + '<br> Net: ' + _.escape(accounting.formatMoney(arrPayrollDetails[i].NetPayCheck == null ? 0 : arrPayrollDetails[i].NetPayCheck)) + '<br>';
//                                if (parseInt(EmployeeID) > 0) {
//                                    html += _.escape(FormatDateUTC(arrPayrollDetails[i].PayDate)) + '<br>';
//                                    html += 'DD : <br>';
//                                    html += _.escape(arrPayrollDetails[i].PayPeriod);
//                                }
//                                html += '</td>';

//                                //Column-2
//                                html += '<td style="text-align:left; padding-left:5px;"><table width="100%"><tr width="100%"><td width="34%">' + _.escape(arrPayrollDetails[i].PayType) + '</td><td width="33%">' + _.escape(arrPayrollDetails[i].RegularHours.toFixed(2)) + '</td><td width="33%">' + _.escape(accounting.formatMoney(arrPayrollDetails[i].RegularAmount == null ? 0 : arrPayrollDetails[i].RegularAmount)) + '</td></tr></table></td>';
//                                IsAdded = false;
//                                for (var j = 0; j < PayType.length; j++) {
//                                    if (PayType.length == 0) {
//                                        PayType[j] = _.escape(arrPayrollDetails[i].PayType);
//                                        PayTypeHour[j] = parseFloat(arrPayrollDetails[i].RegularHours.toFixed(2));
//                                        PayTypeTotal[j] = arrPayrollDetails[i].RegularAmount == null ? 0 : arrPayrollDetails[i].RegularAmount;
//                                        IsAdded = true;
//                                        break;
//                                    }
//                                    else if (_.escape(arrPayrollDetails[i].PayType) === PayType[j]) {
//                                        PayTypeHour[j] = parseFloat(PayTypeHour[j]) + parseFloat(arrPayrollDetails[i].RegularHours.toFixed(2));
//                                        PayTypeTotal[j] = parseFloat(PayTypeTotal[j]) + (arrPayrollDetails[i].RegularAmount == null ? 0 : arrPayrollDetails[i].RegularAmount);
//                                        IsAdded = true;
//                                        break;
//                                    }
//                                }
//                                if (IsAdded == false) {
//                                    var k = PayType.length;
//                                    PayType[k] = _.escape(arrPayrollDetails[i].PayType);
//                                    PayTypeHour[k] = parseFloat(arrPayrollDetails[i].RegularHours.toFixed(2));
//                                    PayTypeTotal[k] = arrPayrollDetails[i].RegularAmount == null ? 0 : arrPayrollDetails[i].RegularAmount;

//                                }
//                                //end of array calculation

//                                //Column-3
//                                html += '<td style="text-align:right; padding-left:5px;">';
//                                html += '<table width="100%"><tr width="100%"><td width="50%" style="text-align:left; padding-left:5px;">FIT</td> <td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(arrPayrollDetails[i].FederalTaxAmount == null ? 0 : arrPayrollDetails[i].FederalTaxAmount)) + '</td></tr > '
//                                html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">SS</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(arrPayrollDetails[i].SocialSecurityTaxAmount == null ? 0 : arrPayrollDetails[i].SocialSecurityTaxAmount)) + '</td></tr>';
//                                html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">Med</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(arrPayrollDetails[i].MedicareTaxAmount == null ? 0 : arrPayrollDetails[i].MedicareTaxAmount)) + '</td></tr>';
//                                html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">GA PIT</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(arrPayrollDetails[i].StateTaxAmount == null ? 0 : arrPayrollDetails[i].StateTaxAmount)) + '</td></tr></table>';
//                                html += '</td>';

//                                FIT = FIT + (arrPayrollDetails[i].FederalTaxAmount == null ? 0 : arrPayrollDetails[i].FederalTaxAmount);
//                                SS = SS + (arrPayrollDetails[i].SocialSecurityTaxAmount == null ? 0 : arrPayrollDetails[i].SocialSecurityTaxAmount);
//                                MED = MED + (arrPayrollDetails[i].MedicareTaxAmount == null ? 0 : arrPayrollDetails[i].MedicareTaxAmount);
//                                GA_PIT = GA_PIT + (arrPayrollDetails[i].StateTaxAmount == null ? 0 : arrPayrollDetails[i].StateTaxAmount);
//                                //Column-4

//                                html += '<td style="text-align:right; padding-left:5px;"><table style="width:100%; border: 0px solid #90949b;"><tr style="display:none;"><td colspan="2" ></td></tr>';

//                                var xmlDoc = $.parseXML(arrPayrollDetails[i].Deductions[1]);
//                                var $xml = $(xmlDoc);
//                                var $deductions = $xml.find("deductions");
//                                var Deduction;
//                                var DeductionAmount;

//                                for (var z = 0; z < $deductions.length; z++) {
//                                    Deduction = $deductions[z].getAttribute("paystubname");
//                                    DeductionAmount = $deductions[z].getAttribute('amount');
//                                    html += '<tr><td style="text-align:right; padding-left:5px; width:50%">' + _.escape(Deduction) + "</td>";
//                                    html += '<td style="text-align:right; padding-left:5px; width:50%">' + _.escape(accounting.formatMoney(DeductionAmount)) + "</td></tr>";
//                                    IsDeductionAdded = false;

//                                    for (var j = 0; j < DeductionType.length; j++) {
//                                        if (DeductionType.length == 0) {
//                                            DeductionType[j] = _.escape(Deduction);
//                                            DeductionTypeTotal[j] = DeductionAmount == null ? 0 : parseFloat(DeductionAmount);
//                                            IsDeductionAdded = true;
//                                            break;
//                                        }
//                                        else if (_.escape(Deduction) == DeductionType[j]) {

//                                            DeductionTypeTotal[j] = parseFloat(DeductionTypeTotal[j]) + (DeductionAmount == null ? 0 : parseFloat(DeductionAmount));
//                                            IsDeductionAdded = true;
//                                            break;
//                                        }
//                                    }
//                                    if (IsDeductionAdded == false) {
//                                        var k = DeductionType.length;
//                                        DeductionType[k] = _.escape(Deduction);
//                                        DeductionTypeTotal[k] = DeductionAmount == null ? 0 : parseFloat(DeductionAmount);

//                                    }
//                                }
//                                html += '</table></td>';

//                                //Column-5

//                                html += '<td style="text-align:right; padding-right:5px;">';
//                                html += '<table width="100%"><tr width="50%" style="text-align:left; padding-left:5px;"><td style="text-align:left; padding-left:5px;">FUTA</td> <td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(arrPayrollDetails[i].EmployerFUTATaxAmountYTD == null ? 0 : arrPayrollDetails[i].EmployerFUTATaxAmountYTD)) + '</td></tr > '
//                                html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">SS</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(arrPayrollDetails[i].EmployerSocialSecurityTaxAmountYTD == null ? 0 : arrPayrollDetails[i].EmployerSocialSecurityTaxAmountYTD)) + '</td></tr>';
//                                html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">Med</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(arrPayrollDetails[i].EmployerMedicareTaxAmountYTD == null ? 0 : arrPayrollDetails[i].EmployerMedicareTaxAmountYTD)) + '</td></tr>';
//                                html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">GA SUI</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(arrPayrollDetails[i].EmployerSUITaxAmountYTD == null ? 0 : arrPayrollDetails[i].EmployerSUITaxAmountYTD)) + '</td></tr>';
//                                html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">GA ADMIN</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(arrPayrollDetails[i].EmployerAdminAssessmentTaxAmountYTD == null ? 0 : arrPayrollDetails[i].EmployerAdminAssessmentTaxAmountYTD)) + '</td></tr></table>';
//                                html += '</td>';
//                                html += '</tr>';

//                                FUTA = FUTA + (arrPayrollDetails[i].EmployerFUTATaxAmountYTD == null ? 0 : arrPayrollDetails[i].EmployerFUTATaxAmountYTD);
//                                CompanySS = CompanySS + (arrPayrollDetails[i].EmployerSocialSecurityTaxAmountYTD == null ? 0 : arrPayrollDetails[i].EmployerSocialSecurityTaxAmountYTD);
//                                CompanyMED = CompanyMED + (arrPayrollDetails[i].EmployerMedicareTaxAmountYTD == null ? 0 : arrPayrollDetails[i].EmployerMedicareTaxAmountYTD);
//                                GA_SUI = GA_SUI + (arrPayrollDetails[i].EmployerSUITaxAmountYTD == null ? 0 : arrPayrollDetails[i].EmployerSUITaxAmountYTD);
//                                GA_ADMIN = GA_ADMIN + (arrPayrollDetails[i].EmployerAdminAssessmentTaxAmountYTD == null ? 0 : arrPayrollDetails[i].EmployerAdminAssessmentTaxAmountYTD);

//                                //Grand total calculation
//                                NetPayCheck = NetPayCheck + (arrPayrollDetails[i].NetPayCheck == null ? 0 : arrPayrollDetails[i].NetPayCheck);
//                                RegularAmount = RegularAmount + (arrPayrollDetails[i].RegularAmount == null ? 0 : arrPayrollDetails[i].RegularAmount);
//                                RegularHours = RegularHours + (arrPayrollDetails[i].RegularHours == null ? 0 : arrPayrollDetails[i].RegularHours);
//                                Tax = Tax + (arrPayrollDetails[i].Tax == null ? 0 : arrPayrollDetails[i].Tax);
//                                Deductions = Deductions + (arrPayrollDetails[i].Deductions == null ? 0 : arrPayrollDetails[i].Deductions);
//                                EmployerTax = EmployerTax + (arrPayrollDetails[i].EmployerTax == null ? 0 : arrPayrollDetails[i].EmployerTax);

//                            }

//                            // Total Row html ...
//                            html += '<tr bgcolor="#80a9cb">';
//                            html += '<td style="text-align:left; padding-left:5px;">Total: <br> Net: ' + _.escape(accounting.formatMoney(NetPayCheck)) + '</td>';
//                            html += '<td style="text-align:right">';
//                            html += '<table width="100%">';
//                            for (var x = 0; x < PayType.length; x++) {
//                                html += '<tr width="100%"><td width="34%" style="text-align:left; padding-left:5px;">' + PayType[x] + '</td><td width="33%" style="text-align:left; padding-left:5px;">' + PayTypeHour[x] + '</td><td width="33%" style="text-align:left; padding-left:5px;">' + _.escape(accounting.formatMoney(PayTypeTotal[x])) + '</td></tr>';
//                            }
//                            html += '</table></td>';

//                            html += '<td style="text-align:right">';
//                            html += '<table width="100%"><tr width="100%"><td width="50%" style="text-align:left; padding-left:5px;">FIT</td> <td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(FIT)) + '</td></tr > '
//                            html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">SS</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(SS)) + '</td></tr>';
//                            html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">Med</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(MED)) + '</td></tr>';
//                            html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">GA PIT</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(GA_PIT)) + '</td></tr></table>';
//                            html += '</td>';

//                            html += '<td><table style="width:100%; border: 1px solid #90949b;"><tr style="display:none;"><td colspan="2" ></td></tr>';
//                            for (var x = 0; x < DeductionType.length; x++) {
//                                html += '<tr style="width:100%; border: 1px solid #90949b;"><td width="50%" style="text-align:left; padding-left:5px;">' + DeductionType[x] + '</td><td width="50%" style="text-align:left; padding-left:5px;">' + _.escape(accounting.formatMoney(DeductionTypeTotal[x])) + '</td></tr>';
//                            }
//                            html += '</table></td>';

//                            html += '<td style="text-align:right;padding-right:5px;">';
//                            html += '<table width="100%"><tr width="50%" style="text-align:left; padding-left:5px;"><td style="text-align:left; padding-left:5px;">FUTA</td> <td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(FUTA)) + '</td></tr > '
//                            html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">SS</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(CompanySS)) + '</td></tr>';
//                            html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">Med</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(CompanyMED)) + '</td></tr>';
//                            html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">GA SUI</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(GA_SUI)) + '</td></tr>';
//                            html += '<tr><td width="50%" style="text-align:left; padding-left:5px;">GA ADMIN</td><td width="50%" style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(GA_ADMIN)) + '</td></tr></table>';
//                            html += '</td>';
//                            html += '</tr>';
//                            //Grand Total Row html ...
//                            html += '<tr id="trSummary">';
//                            html += '<td colspan="5"><b>Grand Total:</b></td></tr><tr>';
//                            html += '<td style="text-align:right;padding-left:5px;"><b>Net: ' + _.escape(accounting.formatMoney(NetPayCheck)) + '</b></td>';
//                            html += '<td style="text-align:right"><table width="100%"><tr table width="100%"><td table width="34%"></td><td table width="33%"><b style="text-align:left">' + _.escape(RegularHours.toFixed(2)) + '</b></td><td width="33%"><b style="text-align:left">' + _.escape(accounting.formatMoney(RegularAmount)) + '</b></td></tr></table></td>';
//                            html += '<td style="text-align:right"><b>' + _.escape(accounting.formatMoney(Tax)) + '</b></td>';
//                            html += '<td style="text-align:right"><b>' + _.escape(accounting.formatMoney(Deductions)) + '</td>';
//                            html += '<td style="text-align:right;padding-right:5px;"><b>' + _.escape(accounting.formatMoney(EmployerTax)) + '</b></td>';
//                            html += '</tr></table>';
//                            //$('#divPayrollDetails').html(html);
//                        }

//                        var fs = require('fs');
//                        var pdf = require('html-pdf');
//                        var options = { format: 'Letter' };
//                        const uuidv4 = require('uuid/v4');
//                        var FileName = uuidv4();
//                        pdf.create(html, options).toFile('./public/temp/' + FileName + '.pdf', function (err, response) {
//                            if (err) return console.log(err);
//                            console.log(response);
//                            res.json(FileName + '.pdf');
//                        });
//                    }
//                    catch (err) {
//                        winston.log('error', err);
//                    }
//                }
//            });
//        }
//    });
//};