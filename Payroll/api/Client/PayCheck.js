exports.GetPage = function (req, res) {
    var dtoPayCheckPage = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('StartIndex', sql.Int, query.StartIndex);
            request.input('PageSize', sql.Int, query.PageSize);
            request.input('SortField', sql.VarChar(50), query.SortField);
            request.input('SortDirection', sql.VarChar(4), query.SortDirection);
            request.input('FilterText', sql.VarChar(50), query.FilterText);
            request.execute('prcPayCheckGetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        dtoPayCheckPage.PayChecks = ValidateData(recordsets[0]);
                        dtoPayCheckPage.TotalRecords = recordsets[1][0].TotalRecords;
                        res.json(dtoPayCheckPage);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};

exports.Save = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;

            var PayCheckDetails = new sql.Table()
            PayCheckDetails.columns.add('PayCheckId', sql.BigInt);
            PayCheckDetails.columns.add('PayCheckType', sql.Int);
            PayCheckDetails.columns.add('SupplementalTaxRate', sql.Bit);
            PayCheckDetails.columns.add('FederalTaxRate', sql.Decimal(18, 2));
            PayCheckDetails.columns.add('NetToGross', sql.Bit);
            PayCheckDetails.columns.add('EmployeeId', sql.BigInt); 
            PayCheckDetails.columns.add('PayDate', sql.VarChar(10));           
            PayCheckDetails.columns.add('PayStubId', sql.BigInt);   
            PayCheckDetails.columns.add('Hours', sql.Decimal(18, 2));
            PayCheckDetails.columns.add('Amount', sql.Decimal(18, 2));
            PayCheckDetails.columns.add('PayRatePerHour', sql.Decimal(18, 2));
            PayCheckDetails.columns.add('PayRate', sql.Decimal(18, 2));
            PayCheckDetails.columns.add('PaymentMethod', sql.VarChar(50));   
            PayCheckDetails.columns.add('Notes', sql.VarChar(sql.MAX));
            if (query.PayCheckDetails != '') {
                var arrPayCheckDetails = query.PayCheckDetails.split(String.fromCharCode(135));
                for (var i = 0; i < arrPayCheckDetails.length; i++) {
                    var arrPayCheckDetail = arrPayCheckDetails[i].split(String.fromCharCode(134));
                    PayCheckDetails.rows.add(arrPayCheckDetail[0], arrPayCheckDetail[1], (arrPayCheckDetail[2] == '0' || arrPayCheckDetail[2] == 'false' ? false : true), arrPayCheckDetail[3], (arrPayCheckDetail[4] == '0' || arrPayCheckDetail[4] == 'false' ? false : true), arrPayCheckDetail[5], arrPayCheckDetail[6], arrPayCheckDetail[7], arrPayCheckDetail[8], arrPayCheckDetail[9], arrPayCheckDetail[10], arrPayCheckDetail[11], arrPayCheckDetail[12], arrPayCheckDetail[13]);
                }
            }     
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('PayCheckMainId', sql.BigInt, query.PayCheckMainId);            
            request.input('PayScheduleId', sql.BigInt, query.PayScheduleId);
            request.input('PayPeriod', sql.VarChar(23), query.PayPeriod);           
            request.input('PayCheckDetails', PayCheckDetails);
            request.execute('prcPayCheckMainSave', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetPayCheckPage');
                        if (query.PayCheckMainId > 0) {
                            socketio.emit('GetPayCheckObject', query.PayCheckMainId);
                        }
                        res.json(err ? 0 : recordsets[0][0].PayCheckMainId);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.SaveCheckNo = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;

            var PayChecks = new sql.Table()
            PayChecks.columns.add('EmployeeId', sql.BigInt);
            PayChecks.columns.add('CheckNo', sql.VarChar(20));          
            if (query.PayChecks != '') {
                var arrPayChecks = query.PayChecks.split(String.fromCharCode(135));
                for (var i = 0; i < arrPayChecks.length; i++) {
                    var arrPayCheck = arrPayChecks[i].split(String.fromCharCode(134));
                    PayChecks.rows.add(arrPayCheck[0], arrPayCheck[1]);
                }
            }
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);            
            request.input('PayChecks', PayChecks);
            request.execute('prcPayCheckSave', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        //socketio.emit('GetPayCheckPage');
                        //if (query.PayCheckMainId > 0) {
                        //    socketio.emit('GetPayCheckObject', query.PayCheckMainId);
                        //}
                        res.json(true);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.Delete = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('PayCheckId', sql.BigInt, query.PayCheckId);
            request.execute('prcPayCheckDelete', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetPayCheckPage');
                        socketio.emit('GetPayCheckObject', query.PayCheckId);
                        res.json(true);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.Deletable = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('PayCheckId', sql.BigInt, query.PayCheckId);
            request.execute('prcPayCheckDeletable', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        res.json(recordsets[0].length > 0 ? false : true);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.GetObject = function (req, res) {
    var dtoPayCheck = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;       
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);     
            request.input('PayCheckId', sql.BigInt, query.PayCheckId);
            request.execute('prcPayCheckGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoPayCheck = ValidateData2(recordsets[0])[0];
                        }
                        res.json(dtoPayCheck);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.GetObjectContractor = function (req, res) {
    var dtoPayCheck = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('PayCheckId', sql.BigInt, query.PayCheckId);
            request.execute('prcPayCheckContractorGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoPayCheck = recordsets[0][0];
                        }
                        res.json(dtoPayCheck);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.GetObjectMain = function (req, res) {
    var dtoPayCheckMain = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('PayScheduleId', sql.BigInt, query.PayScheduleId);
            request.input('PayPeriod', sql.VarChar(23), query.PayPeriod);
            request.execute('prcPayCheckMainGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoPayCheckMain = ValidateData1(recordsets[0])[0];
                        }
                        res.json(dtoPayCheckMain);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.GetDetail = function (req, res) {    
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);  
            request.input('PayCheckId', sql.BigInt, query.PayCheckId);
            request.execute('prcPayCheckDetailGet', function (err, recordsets, returnValue, affected) {
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
exports.GetPayPeriod = function (req, res) {
    var PayPeriod = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId); 
            request.input('PayScheduleId', sql.BigInt, query.PayScheduleId);
            request.execute('prcPayPeriodGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            PayPeriod = recordsets[0];
                        }
                        res.json(PayPeriod);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};

exports.GetTax = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;     
            request.input('EmployeeId', sql.BigInt, query.EmployeeId);       
            request.input('TaxableAmount', sql.Decimal(18, 2), query.TaxableAmount);
            request.execute('prcTaxGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {                        
                        res.json(recordsets[0][0]);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.GetFederalTax = function (req, res) {
    var FederalTaxAmount = 0;    
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('EmployeeId', sql.BigInt, query.EmployeeId);
            request.input('TaxableAmount', sql.Decimal(18, 2), query.TaxableAmount);
            request.execute('prcFederalTaxGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            FederalTaxAmount = recordsets[0][0].FederalTaxAmount;
                        }
                        res.json(FederalTaxAmount);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.GetStateTax = function (req, res) {
    var StateTaxAmount = 0;
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('EmployeeId', sql.BigInt, query.EmployeeId);
            request.input('TaxableAmount', sql.Decimal(18, 2), query.TaxableAmount);
            request.execute('prcStateTaxGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            StateTaxAmount = recordsets[0][0].StateTaxAmount;
                        }
                        res.json(StateTaxAmount);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.GetSUITax = function (req, res) {
    var TaxAmount = 0;
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;            
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('EmployeeId', sql.BigInt, query.EmployeeId);
            request.input('PayCheckId', sql.BigInt, query.PayCheckId);
            request.input('TaxableAmount', sql.Decimal(18, 2), query.TaxableAmount);
            request.execute('prcSUITaxGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            TaxAmount = recordsets[0][0].SUITaxEmployer;
                        }
                        res.json(TaxAmount);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.GetTaxLiability = function (req, res) {    
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.VarChar(10), query.ClientId);
            request.input('FromDate', sql.VarChar(10), query.FromDate);
            request.input('ToDate', sql.VarChar(10), query.ToDate);
            request.execute('prcTaxLiabilityGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {                        
                        res.json(recordsets);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.GetTaxLiabilityPDF = function (req, res) {
    var arrTables;
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.VarChar(10), query.ClientId);
            request.input('FromDate', sql.VarChar(10), query.FromDate);
            request.input('ToDate', sql.VarChar(10), query.ToDate);
            request.execute('prcTaxLiabilityGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    //requestify.request(Configuration.APIUrl + '/Payroll.Services/Client/ClientService.svc/GetObject', {                        
                    //    method: 'POST',
                    //    body: {
                    //        ParentClientId: req.body.ParentClientId,
                    //        ClientId: req.body.ClientId
                    //    },
                    //    headers: {
                    //        'X-Key': req.session.UserId,
                    //        'X-Access-Token': req.session.Token
                    //    },
                    //}).then(function (response) {
                    //    var body = response.getBody();
                    //    try {
                            arrTables = recordsets;
                            if (arrTables != undefined) {
                                var TaxAmount = 0;
                                var TaxPaid = 0;
                                //var html = '<table style="width:100%">';
                                //html += '<tr><td colspan="4"><strong>' + body.FullName + '</strong></td></tr>';
                                //html += '<tr><td colspan="4">Tax Liability</td></tr>';
                                //html += '</table>';  
                                var html = '<table style="width:100%;font-size:10px;font-family:"Courier New">';
                                html += '<tr>';
                                html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Federal Taxes(941/944)</th>';
                                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Amount</th>';
                                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Paid</th>';
                                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Owed</th>';
                                html += '</tr>';
                                html += '<tbody>';
                                for (var i = 0; i < arrTables[0].length; i++) {
                                    html += '<tr>';
                                    html += '<td style="text-align:left">' + arrTables[0][i].TaxName + '</td>';
                                    html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[0][i].TaxAmount) + '</td>';
                                    html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[0][i].TaxPaid) + '</td>';
                                    html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[0][i].TaxOwed) + '</td>';
                                    html += '</tr>';
                                    TaxAmount += arrTables[0][i].TaxAmount;
                                    TaxPaid += arrTables[0][i].TaxPaid;
                                }
                                html += '<tr>';
                                html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Total</th>';
                                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
                                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxPaid) + '</th>';
                                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount - TaxPaid) + '</th>';
                                html += '</tr>';
                                html += '<tr>';
                                html += '<th>&nbsp;</th>';
                                html += '<th style="text-align:right"></th>';
                                html += '<th style="text-align:right"></th>';
                                html += '<th style="text-align:right"></th>';
                                html += '</tr>';
                                TaxAmount = 0;
                                TaxPaid = 0;
                                html += '<tr>';
                                html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Federal Unemployment(940)</th>';
                                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Amount</th>';
                                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Paid</th>';
                                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Owed</th>';
                                html += '</tr>';
                                for (var i = 0; i < arrTables[1].length; i++) {
                                    html += '<tr>';
                                    html += '<td style="text-align:left">' + arrTables[1][i].TaxName + '</td>';
                                    html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[1][i].TaxAmount) + '</td>';
                                    html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[1][i].TaxPaid) + '</td>';
                                    html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[1][i].TaxOwed) + '</td>';
                                    html += '</tr>';
                                    TaxAmount += arrTables[1][i].TaxAmount;
                                    TaxPaid += arrTables[1][i].TaxPaid;
                                }
                                html += '<tr>';
                                html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Total</th>';
                                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
                                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxPaid) + '</th>';
                                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount - TaxPaid) + '</th>';
                                html += '</tr>';
                                html += '<tr>';
                                html += '<th>&nbsp;</th>';
                                html += '<th style="text-align:right"></th>';
                                html += '<th style="text-align:right"></th>';
                                html += '<th style="text-align:right"></th>';
                                html += '</tr>';
                                TaxAmount = 0;
                                TaxPaid = 0;
                                html += '<tr>';
                                html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Income Tax</th>';
                                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Amount</th>';
                                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Paid</th>';
                                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Owed</th>';
                                html += '</tr>';
                                for (var i = 0; i < arrTables[2].length; i++) {
                                    html += '<tr>';
                                    html += '<td style="text-align:left">' + arrTables[2][i].TaxName + '</td>';
                                    html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[2][i].TaxAmount) + '</td>';
                                    html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[2][i].TaxPaid) + '</td>';
                                    html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[2][i].TaxOwed) + '</td>';
                                    html += '</tr>';
                                    TaxAmount += arrTables[2][i].TaxAmount;
                                    TaxPaid += arrTables[2][i].TaxPaid;
                                }
                                html += '<tr>';
                                html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Total</th>';
                                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
                                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxPaid) + '</th>';
                                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount - TaxPaid) + '</th>';
                                html += '</tr>';
                                html += '<tr>';
                                html += '<th>&nbsp;</th>';
                                html += '<th style="text-align:right"></th>';
                                html += '<th style="text-align:right"></th>';
                                html += '<th style="text-align:right"></th>';
                                html += '</tr>';
                                if (arrTables[3].length > 0) {
                                    var StateCode = '';
                                    var i = 0;
                                    while (i < arrTables[3].length) {
                                        StateCode = arrTables[3][i].StateCode;
                                        TaxAmount = 0;
                                        TaxPaid = 0;
                                        html += '<tr>';
                                        html += '<th style="background-color:#4267b2;color:#fff;text-align:left">' + StateCode + ' Unemployment Tax</th>';
                                        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Amount</th>';
                                        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Paid</th>';
                                        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Owed</th>';
                                        html += '</tr>';
                                        while (StateCode == arrTables[3][i].StateCode) {
                                            html += '<tr>';
                                            html += '<td style="text-align:left">' + arrTables[3][i].TaxName + '</td>';
                                            html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[3][i].TaxAmount) + '</td>';
                                            html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[3][i].TaxPaid) + '</td>';
                                            html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[3][i].TaxOwed) + '</td>';
                                            html += '</tr>';
                                            TaxAmount += arrTables[3][i].TaxAmount;
                                            TaxPaid += arrTables[3][i].TaxPaid;
                                            i++;
                                            if (i == arrTables[3].length) {
                                                break;
                                            }
                                        }
                                        html += '<tr>';
                                        html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Total</th>';
                                        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
                                        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxPaid) + '</th>';
                                        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount - TaxPaid) + '</th>';
                                        html += '</tr>';
                                        if (i < arrTables[3].length) {
                                            html += '<tr>';
                                            html += '<th>&nbsp;</th>';
                                            html += '<th style="text-align:right"></th>';
                                            html += '<th style="text-align:right"></th>';
                                            html += '<th style="text-align:right"></th>';
                                            html += '</tr>';
                                        }
                                    }
                                }
                                html += '</tbody>';
                                html += '</table>';
                            }

                            var fs = require('fs');
                            var pdf = require('html-pdf');
                            var options = { format: 'Letter' };
                            const uuidv4 = require('uuid/v4');
                            var FileName = uuidv4();
                            pdf.create(html, options).toFile('./public/temp/' + FileName + '.pdf', function (err, response) {
                                if (err) return console.log(err);
                                console.log(response);
                                res.json(FileName + '.pdf');
                            });
                    //    }
                    //    catch (err) {
                    //        winston.log('error', err);
                    //    }
                    //}).fail(function (response) {
                    //    var body = response.getBody(); // Some error code such as, for example, 404 
                    //    return res.json(body.message);
                    //});
                    
                }
            });
        }
    });
};
exports.GetTaxWageSummary = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.VarChar(10), query.ClientId);
            request.input('FromDate', sql.VarChar(10), query.FromDate);
            request.input('ToDate', sql.VarChar(10), query.ToDate);
            request.execute('prcTaxWageSummaryGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        res.json(recordsets);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.GetTaxWageSummaryPDF = function (req, res) {
    var arrTables;
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.VarChar(10), query.ClientId);
            request.input('FromDate', sql.VarChar(10), query.FromDate);
            request.input('ToDate', sql.VarChar(10), query.ToDate);
            request.execute('prcTaxWageSummaryGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        arrTables = recordsets;
                        if (arrTables != undefined) {
                            var TaxAmount = 0
                            var html = '<table style="width:100%;border:1px solid gray">';
                            html += '<tr style="background-color:#4267b2;color:#fff">';
                            html += '<th style="text-align:left">Federal Taxes(941/944)</th>';
                            html += '<th style="text-align:right">Total Wages</th>';
                            html += '<th style="text-align:right">Excess Wages</th>';
                            html += '<th style="text-align:right">Taxable Wages</th>';
                            html += '<th style="text-align:right">Tax Amount</th>';
                            html += '</tr>';
                            html += '<tbody>';
                            for (var i = 0; i < arrTables[0].length; i++) {
                                html += '<tr>';
                                html += '<td style="text-align:left">' + arrTables[0][i].TaxName + '</td>';
                                html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[0][i].TotalWages) + '</td>';
                                html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[0][i].ExcessWages) + '</td>';
                                html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[0][i].TaxableWages) + '</td>';
                                html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[0][i].TaxAmount) + '</td>';
                                html += '</tr>';
                                TaxAmount += arrTables[0][i].TaxAmount;
                            }
                            html += '<tr style="background-color:#4267b2;color:#fff">';
                            html += '<th style="text-align:left">Total</th>';
                            html += '<th></th>';
                            html += '<th></th>';
                            html += '<th></th>';
                            html += '<th style="text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
                            html += '</tr>';
                            html += '<tr>';
                            html += '<th>&nbsp;</th>';
                            html += '<th style="text-align:right"></th>';
                            html += '<th style="text-align:right"></th>';
                            html += '<th style="text-align:right"></th>';
                            html += '<th style="text-align:right"></th>';
                            html += '</tr>';
                            TaxAmount = 0;
                            html += '<tr style="background-color:#4267b2;color:#fff">';
                            html += '<th style="text-align:left">Federal Unemployment(940)</th>';
                            html += '<th style="text-align:right">Total Wages</th>';
                            html += '<th style="text-align:right">Excess Wages</th>';
                            html += '<th style="text-align:right">Taxable Wages</th>';
                            html += '<th style="text-align:right">Tax Amount</th>';
                            html += '</tr>';
                            for (var i = 0; i < arrTables[1].length; i++) {
                                html += '<tr>';
                                html += '<td style="text-align:left">' + arrTables[1][i].TaxName + '</td>';
                                html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[1][i].TotalWages) + '</td>';
                                html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[1][i].ExcessWages) + '</td>';
                                html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[1][i].TaxableWages) + '</td>';
                                html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[1][i].TaxAmount) + '</td>';
                                html += '</tr>';
                                TaxAmount += arrTables[1][i].TaxAmount;
                            }
                            html += '<tr style="background-color:#4267b2;color:#fff">';
                            html += '<th style="text-align:left">Total</th>';
                            html += '<th></th>';
                            html += '<th></th>';
                            html += '<th></th>';
                            html += '<th style="text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
                            html += '</tr>';
                            html += '<tr>';
                            html += '<th>&nbsp;</th>';
                            html += '<th style="text-align:right"></th>';
                            html += '<th style="text-align:right"></th>';
                            html += '<th style="text-align:right"></th>';
                            html += '<th style="text-align:right"></th>';
                            html += '</tr>';
                            //if (arrTables[2].length > 0) {
                            TaxAmount = 0;
                            html += '<tr style="background-color:#4267b2;color:#fff">';
                            html += '<th style="text-align:left">Income Tax</th>';
                            html += '<th style="text-align:right">Total Wages</th>';
                            html += '<th style="text-align:right">Excess Wages</th>';
                            html += '<th style="text-align:right">Taxable Wages</th>';
                            html += '<th style="text-align:right">Tax Amount</th>';
                            html += '</tr>';
                            for (var i = 0; i < arrTables[2].length; i++) {
                                html += '<tr>';
                                html += '<td style="text-align:left">' + arrTables[2][i].TaxName + '</td>';
                                html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[2][i].TotalWages) + '</td>';
                                html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[2][i].ExcessWages) + '</td>';
                                html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[2][i].TaxableWages) + '</td>';
                                html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[2][i].TaxAmount) + '</td>';
                                html += '</tr>';
                                TaxAmount += arrTables[2][i].TaxAmount;
                            }
                            html += '<tr style="background-color:#4267b2;color:#fff">';
                            html += '<th style="text-align:left">Total</th>';
                            html += '<th></th>';
                            html += '<th></th>';
                            html += '<th></th>';
                            html += '<th style="text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
                            html += '</tr>';
                            html += '<tr>';
                            html += '<th>&nbsp;</th>';
                            html += '<th style="text-align:right"></th>';
                            html += '<th style="text-align:right"></th>';
                            html += '<th style="text-align:right"></th>';
                            html += '<th style="text-align:right"></th>';
                            html += '</tr>';
                            //}
                            if (arrTables[3].length > 0) {
                                var StateCode = '';
                                var i = 0;
                                while (i < arrTables[3].length) {
                                    StateCode = arrTables[3][i].StateCode;
                                    TaxAmount = 0;
                                    TaxPaid = 0;
                                    html += '<tr style="background-color:#4267b2;color:#fff">';
                                    html += '<th style="text-align:left">' + StateCode + ' Unemployment Tax</th>';
                                    html += '<th style="text-align:right">Total Wages</th>';
                                    html += '<th style="text-align:right">Excess Wages</th>';
                                    html += '<th style="text-align:right">Taxable Wages</th>';
                                    html += '<th style="text-align:right">Tax Amount</th>';
                                    html += '</tr>';
                                    while (StateCode == arrTables[3][i].StateCode) {
                                        html += '<tr>';
                                        html += '<td style="text-align:left">' + arrTables[3][i].TaxName + '</td>';
                                        html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[3][i].TotalWages) + '</td>';
                                        html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[3][i].ExcessWages) + '</td>';
                                        html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[3][i].TaxableWages) + '</td>';
                                        html += '<td style="text-align:right">' + accounting.formatMoney(arrTables[3][i].TaxAmount) + '</td>';
                                        html += '</tr>';
                                        TaxAmount += arrTables[3][i].TaxAmount;
                                        i++;
                                        if (i == arrTables[3].length) {
                                            break;
                                        }
                                    }
                                    html += '<tr style="background-color:#4267b2;color:#fff">';
                                    html += '<th style="text-align:left">Total</th>';
                                    html += '<th></th>';
                                    html += '<th></th>';
                                    html += '<th></th>';
                                    html += '<th style="text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
                                    html += '</tr>';
                                    if (i < arrTables[3].length) {
                                        html += '<tr>';
                                        html += '<th>&nbsp;</th>';
                                        html += '<th style="text-align:right"></th>';
                                        html += '<th style="text-align:right"></th>';
                                        html += '<th style="text-align:right"></th>';
                                        html += '<th style="text-align:right"></th>';
                                        html += '</tr>';
                                    }
                                }
                            }
                            html += '</tbody>';
                            html += '</table>';
                        }

                        var fs = require('fs');
                        var pdf = require('html-pdf');
                        var options = { format: 'Letter' };
                        const uuidv4 = require('uuid/v4');
                        var FileName = uuidv4();
                        pdf.create(html, options).toFile('./public/temp/' + FileName + '.pdf', function (err, response) {
                            if (err) return console.log(err);
                            console.log(response);
                            res.json(FileName + '.pdf');
                        });
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.GetTaxWageDetail = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.VarChar(10), query.ClientId);
            request.input('TaxId', sql.Int, query.TaxId);
            request.input('StateId', sql.BigInt, query.StateId);
            request.input('FromDate', sql.VarChar(10), query.FromDate);
            request.input('ToDate', sql.VarChar(10), query.ToDate);
            request.execute('prcTaxWageDetailGet', function (err, recordsets, returnValue, affected) {
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
exports.GetTotalPay = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;     
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.VarChar(10), query.ClientId);      
            request.input('FromDate', sql.VarChar(10), query.FromDate);
            request.input('ToDate', sql.VarChar(10), query.ToDate);
            request.execute('prcTotalPayGet', function (err, recordsets, returnValue, affected) {
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
exports.GetTotalCost = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.VarChar(10), query.ClientId); 
            request.input('FromDate', sql.VarChar(10), query.FromDate);
            request.input('ToDate', sql.VarChar(10), query.ToDate);
            request.execute('prcTotalCostGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        res.json(recordsets);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.GetPayCheckPDF = function (req, res) {
    var dtoPayCheck = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.VarChar(10), query.ClientId); 
            request.input('PayCheckId', sql.BigInt, query.PayCheckId);
            request.execute('prcPayCheckGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoPayCheck = ValidateData(recordsets[0])[0];
                            //var asyncToSync = syncFunc();
                            //function syncFunc() {
                            //    var sync = true;
                            //    var data = null;
                            //    query(params, function (result) {
                            //        data = result;
                            //        sync = false;
                            //    });
                            //    while (sync) { require('deasync').sleep(100); }
                            //    return data;
                            //}


                            const uuidv4 = require('uuid/v4');
                            var FileName = uuidv4();
                            var PDFDocument = require('pdfkit');                            
                            var doc = new PDFDocument({
                                margin: 36,
                                size: 'letter',
                                layout: 'portrait' // options are portrait and landscape. default is portrait
                            });
                            const fs = require('fs');
                            doc.on('end', function () {
                                res.json(FileName + '.pdf');
                            });                             
                            doc.pipe(fs.createWriteStream('./public/temp/' + FileName + '.pdf'))                            
                            doc.fontSize(8).text(Helper.FormatDate(dtoPayCheck.PayDate, 'mm/dd/yyyy'), 500, 50); 
                            doc.text(dtoPayCheck.EmployeeFullName, 50, 77);
                            doc.text('****This is not a check. *****Advice of deposit only****', 50, 104);
                            doc.text('***NON-NEGOTIABLE***', 400, 104);

                            doc.text(dtoPayCheck.EmployeeFullName, 50, 155);
                            doc.text(dtoPayCheck.EmployeeAddress1, 50, 170);
                            doc.text(dtoPayCheck.EmployeeAddress2, 50, 185);                            
                            doc.text(dtoPayCheck.EmployeeCityName.trim() + ' ' + dtoPayCheck.EmployeeStateCode.trim() + ' ' + dtoPayCheck.EmployeeZipCode, 50, 215);

                            doc.text('Pay Period: ' + dtoPayCheck.PayPeriod, 50, 240);

                            doc.text(dtoPayCheck.EmployeeFullName, 20, 300);
                            doc.text(dtoPayCheck.EmployeeAddress1, 20, 315);
                            doc.text(dtoPayCheck.EmployeeAddress2, 20, 330);                           
                            doc.text(dtoPayCheck.EmployeeCityName.trim() + ' ' + dtoPayCheck.EmployeeStateCode.trim() + ' ' + dtoPayCheck.EmployeeZipCode, 20, 360);

                            doc.text('Pay', 150, 300);
                            doc.text('Hours', 200, 300);
                            doc.text('Rate', 250, 300);
                            doc.text('Current', 290, 300);
                            doc.text('YTD', 350, 300);
                            doc.moveTo(150, 315)
                                .lineTo(365, 315)
                                .stroke();
                            doc.text(dtoPayCheck.PayType, 150, 330);
                            //doc.moveTo(175, 300);
                            doc.text(dtoPayCheck.RegularHours.toFixed(2), 150, 330, { width: 70, align: 'right' });
                            doc.text(accounting.formatMoney(dtoPayCheck.PayRate), 200, 330, { width: 70, align: 'right' });
                            doc.text(accounting.formatMoney(dtoPayCheck.RegularAmount), 250, 330, { width: 70, align: 'right' });
                            doc.text(accounting.formatMoney(dtoPayCheck.AmountPaidYTD), 300, 330, { width: 70, align: 'right' });                            

                            doc.text('Taxes', 400, 300);                            
                            doc.text('Current', 500, 300);
                            doc.text('YTD', 550, 300);
                            doc.moveTo(400, 315)
                                .lineTo(565, 315)
                                .stroke();

                            //doc.addPage()
                            //    .fontSize(25)
                            //    .text('Here is some vector graphics...', 100, 100);
                           
                            //doc.save()
                            //    .moveTo(100, 150)
                            //    .lineTo(100, 250)
                            //    .lineTo(200, 250)
                            //    .fill("#FF3300");
                            
                            //doc.addPage()
                            //    .fillColor("blue")
                            //    .text('Here is a link!', 100, 100)
                            //    .link(100, 100, 160, 27, 'http://google.com/');
                                                       
                            doc.end();             
                        }                       
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
function ValidateData(arrData)
{
    for (i = 0; i < arrData.length; i++) {
        arrData[i].PayCheckId = arrData[i].PayCheckId == null ? 0 : arrData[i].PayCheckId;
        arrData[i].PayDate = arrData[i].PayDate == null ? new Date('1900-01-01') : arrData[i].PayDate;
        arrData[i].CheckNo = arrData[i].CheckNo == null ? '' : arrData[i].CheckNo;
        arrData[i].EmployeeId = arrData[i].EmployeeId == null ? 0 : arrData[i].EmployeeId;
        arrData[i].FullName = arrData[i].FullName == null ? '' : arrData[i].FullName;
        arrData[i].TotalPay = arrData[i].TotalPay == null ? 0 : arrData[i].TotalPay;
        arrData[i].NetPay = arrData[i].NetPay == null ? 0 : arrData[i].NetPay;
        arrData[i].TotalTaxes = arrData[i].TotalTaxes == null ? 0 : arrData[i].TotalTaxes;
    }
    return arrData;
}
function ValidateData1(arrData) {
    for (i = 0; i < arrData.length; i++) {
        arrData[i].PayCheckMainId = arrData[i].PayCheckMainId == null ? 0 : arrData[i].PayCheckMainId;
        arrData[i].PayScheduleId = arrData[i].PayScheduleId == null ? 0 : arrData[i].PayScheduleId;
        arrData[i].PayScheduleName = arrData[i].PayScheduleName == null ? '' : arrData[i].PayScheduleName;
        arrData[i].PayPeriod = arrData[i].PayPeriod == null ? '' : arrData[i].PayPeriod;       
        arrData[i].Notes = arrData[i].Notes == null ? '' : arrData[i].Notes;        
    }
    return arrData;
}
function ValidateData2(arrData) {
    for (i = 0; i < arrData.length; i++) {
        arrData[i].PayCheckMainId = arrData[i].PayCheckMainId == null ? 0 : arrData[i].PayCheckMainId;
        arrData[i].PayCheckId = arrData[i].PayCheckId == null ? 0 : arrData[i].PayCheckId;
        arrData[i].PayPeriod = arrData[i].PayPeriod == null ? '' : arrData[i].PayPeriod;
        arrData[i].PayDate = arrData[i].PayDate == null ? new Date('1900-01-01') : arrData[i].PayDate; 
        arrData[i].PayScheduleId = arrData[i].PayScheduleId == null ? 0 : arrData[i].PayScheduleId;       
        arrData[i].PayScheduleName = arrData[i].PayScheduleName == null ? '' : arrData[i].PayScheduleName;
        arrData[i].Notes = arrData[i].Notes == null ? '' : arrData[i].Notes;
        arrData[i].RegularHours = arrData[i].RegularHours == null ? 0 : arrData[i].RegularHours;
        arrData[i].RegularAmount = arrData[i].RegularAmount == null ? 0 : arrData[i].RegularAmount;
        arrData[i].AmountPaidYTD = arrData[i].AmountPaidYTD == null ? 0 : arrData[i].AmountPaidYTD;
        arrData[i].FederalTaxAmount = arrData[i].FederalTaxAmount == null ? 0 : arrData[i].FederalTaxAmount;
        arrData[i].SocialSecurityTaxAmount = arrData[i].SocialSecurityTaxAmount == null ? 0 : arrData[i].SocialSecurityTaxAmount;
        arrData[i].MedicareTaxAmount = arrData[i].MedicareTaxAmount == null ? 0 : arrData[i].MedicareTaxAmount;
        arrData[i].StateTaxAmount = arrData[i].StateTaxAmount == null ? 0 : arrData[i].StateTaxAmount;
        arrData[i].FederalTaxAmountYTD = arrData[i].FederalTaxAmountYTD == null ? 0 : arrData[i].FederalTaxAmountYTD;
        arrData[i].SocialSecurityTaxAmountYTD = arrData[i].SocialSecurityTaxAmountYTD == null ? 0 : arrData[i].SocialSecurityTaxAmountYTD;
        arrData[i].MedicareTaxAmountYTD = arrData[i].MedicareTaxAmountYTD == null ? 0 : arrData[i].MedicareTaxAmountYTD;
        arrData[i].StateTaxAmountYTD = arrData[i].StateTaxAmountYTD == null ? 0 : arrData[i].StateTaxAmountYTD;
        arrData[i].Additions = arrData[i].Additions == null ? 0 : arrData[i].Additions;
        arrData[i].Deductions = arrData[i].Deductions == null ? 0 : arrData[i].Deductions;
        arrData[i].AdditionsYTD = arrData[i].AdditionsYTD == null ? 0 : arrData[i].AdditionsYTD;
        arrData[i].DeductionsYTD = arrData[i].DeductionsYTD == null ? '' : arrData[i].DeductionsYTD;
        arrData[i].Tax = arrData[i].Tax == null ? 0 : arrData[i].Tax;
        arrData[i].TaxYTD = arrData[i].TaxYTD == null ? 0 : arrData[i].TaxYTD;
        arrData[i].NetPayCheck = arrData[i].NetPayCheck == null ? 0 : arrData[i].NetPayCheck;
        arrData[i].EmployerFUTATaxAmount = arrData[i].EmployerFUTATaxAmount == null ? 0 : arrData[i].EmployerFUTATaxAmount;
        arrData[i].EmployerSocialSecurityTaxAmount = arrData[i].EmployerSocialSecurityTaxAmount == null ? 0 : arrData[i].EmployerSocialSecurityTaxAmount;
        arrData[i].EmployerMedicareTaxAmount = arrData[i].EmployerMedicareTaxAmount == null ? 0 : arrData[i].EmployerMedicareTaxAmount;
        arrData[i].EmployerSUITaxAmount = arrData[i].EmployerSUITaxAmount == null ? 0 : arrData[i].EmployerSUITaxAmount;
        arrData[i].EmployerAdminAssessmentTaxAmount = arrData[i].EmployerAdminAssessmentTaxAmount == null ? 0 : arrData[i].EmployerAdminAssessmentTaxAmount;
        arrData[i].TotalEmployerTax = arrData[i].TotalEmployerTax == null ? 0 : arrData[i].TotalEmployerTax;
        arrData[i].TotalEmployerTaxYTD = arrData[i].TotalEmployerTaxYTD == null ? 0 : arrData[i].TotalEmployerTaxYTD;       
        arrData[i].EmployeeId = arrData[i].EmployeeId == null ? 0 : arrData[i].EmployeeId;
        arrData[i].EmployeeFullName = arrData[i].EmployeeFullName == null ? '' : arrData[i].EmployeeFullName;
        arrData[i].EmployeeAddress1 = arrData[i].EmployeeAddress1 == null ? 0 : arrData[i].EmployeeAddress1;
        arrData[i].EmployeeAddress2 = arrData[i].EmployeeAddress2 == null ? '' : arrData[i].EmployeeAddress2;       
        arrData[i].EmployeeCityName = arrData[i].EmployeeCityName == null ? '' : arrData[i].EmployeeCityName;
        arrData[i].EmployeeStateCode = arrData[i].EmployeeStateCode == null ? '' : arrData[i].EmployeeStateCode;
        arrData[i].EmployeeZipCode = arrData[i].EmployeeZipCode == null ? '' : arrData[i].EmployeeZipCode;
        arrData[i].ClientFullName = arrData[i].ClientFullName == null ? 0 : arrData[i].ClientFullName;
        arrData[i].ClientAddress1 = arrData[i].ClientAddress1 == null ? '' : arrData[i].ClientAddress1;
        arrData[i].ClientAddress2 = arrData[i].ClientAddress2 == null ? '' : arrData[i].ClientAddress2;       
        arrData[i].ClientCity = arrData[i].ClientCity == null ? '' : arrData[i].ClientCity;
        arrData[i].ClientStateCode = arrData[i].ClientStateCode == null ? '' : arrData[i].ClientStateCode;
        arrData[i].ClientZipCode = arrData[i].ClientZipCode == null ? 0 : arrData[i].ClientZipCode;
        arrData[i].PayRate = arrData[i].PayRate == null ? 0 : arrData[i].PayRate;
        arrData[i].PayType = arrData[i].PayType == null ? '' : arrData[i].PayType;        
        arrData[i].StateId = arrData[i].StateId == null ? 0 : arrData[i].StateId;
        arrData[i].StateCode = arrData[i].StateCode == null ? '' : arrData[i].StateCode;
        arrData[i].StateName = arrData[i].StateName == null ? '' : arrData[i].StateName; 
        //arrData[i].Approved = arrData[i].Approved == null ? false : arrData[i].Approved;  
        arrData[i].Addition = arrData[i].Addition == null ? '' : arrData[i].Addition; 
        arrData[i].Deduction = arrData[i].Deduction == null ? '' : arrData[i].Deduction;
        arrData[i].TotalPay = arrData[i].TotalPay == null ? 0 : arrData[i].TotalPay;
        arrData[i].TotalPayYTD = arrData[i].TotalPayYTD == null ? 0 : arrData[i].TotalPayYTD;
        arrData[i].PayScheduleRecurrenceCode = arrData[i].PayScheduleRecurrenceCode == null ? '' : arrData[i].PayScheduleRecurrenceCode;         
    }
    return arrData;
}
exports.GetObjectLastPayCheck = function (req, res) {
    var dtoPayCheck = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.VarChar(10), query.ClientId); 
            request.input('EmployeeID', sql.BigInt, query.EmployeeID);
            request.execute('prcLastPayCheck', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoPayCheck = ValidateData2(recordsets[0])[0];
                        }
                        res.json(dtoPayCheck);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.GetUnApprovedPayCheck = function (req, res) {    
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);                       
            request.execute('prcPayCheckUnApprovedGet', function (err, recordsets, returnValue, affected) {
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
exports.GetPayCheckList = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);           
            request.execute('prcPayCheckListGet', function (err, recordsets, returnValue, affected) {
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
exports.Approve = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('PayCheckId', sql.BigInt, query.PayCheckId);
            request.execute('prcPayCheckApprove', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        //socketio.emit('GetPayCheckPage');
                        //socketio.emit('GetPayCheckObject', query.PayCheckId);
                        res.json(true);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};