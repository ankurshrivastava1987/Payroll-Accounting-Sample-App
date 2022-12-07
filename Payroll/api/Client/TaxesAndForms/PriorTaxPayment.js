exports.GetPage = function (req, res) {
    var dtoPriorTaxPaymentPage = new Object();
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

            request.execute('prcPriorTaxPaymentGetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        dtoPriorTaxPaymentPage.PriorTaxPayments = ValidateData(recordsets[0]);
                        dtoPriorTaxPaymentPage.TotalRecords = recordsets[1][0].TotalRecords;
                        res.json(dtoPriorTaxPaymentPage);
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
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('PriorTaxPaymentId', sql.BigInt, query.PriorTaxPaymentId);
            request.input('TaxType', sql.VarChar(200), query.TaxType);
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('LiabilityPeriod', sql.VarChar(200), query.LiabilityPeriod);
            request.input('PeriodStartDate', sql.VarChar(10), query.PeriodStartDate);
            request.input('PeriodEndDate', sql.VarChar(10), query.PeriodEndDate);
            request.input('PaymentDate', sql.VarChar(10), query.PaymentDate);
            request.input('CheckNumber', sql.VarChar(50), query.CheckNumber);
            request.input('Notes', sql.VarChar(200), query.Notes);
            request.input('FederalIncome', sql.Decimal(18, 2), query.FederalIncome);
            request.input('SocialSecurity', sql.Decimal(18, 2), query.SocialSecurity);
            request.input('SocialSecurityEmployer', sql.Decimal(18, 2), query.SocialSecurityEmployer);
            request.input('Medicare', sql.Decimal(18, 2), query.Medicare);
            request.input('MedicareEmployer', sql.Decimal(18, 2), query.MedicareEmployer);
            request.input('FutaEmployer', sql.Decimal(18, 2), query.FutaEmployer);
            request.input('TotalAmount', sql.Decimal(18, 2), query.TotalAmount);

            request.execute('prcPriorTaxPaymentSave', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetPriorTaxPaymentPage');
                        if (query.PriorTaxPaymentId > 0) {
                            socketio.emit('GetPriorTaxPaymentObject', query.PriorTaxPaymentId);
                        }
                        res.json(err ? 0 : recordsets[0][0].PriorTaxPaymentId);
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
            request.input('PriorTaxPaymentId', sql.BigInt, query.PriorTaxPaymentId);
            request.execute('prcPriorTaxPaymentDelete', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetPriorTaxPaymentPage');
                        socketio.emit('GetPriorTaxPaymentObject', query.PriorTaxPaymentId);
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
            request.input('PriorTaxPaymentId', sql.BigInt, query.PriorTaxPaymentId);
            request.execute('prcPriorTaxPaymentDeletable', function (err, recordsets, returnValue, affected) {
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
    var dtoPriorTaxPayment = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('PriorTaxPaymentId', sql.BigInt, query.PriorTaxPaymentId);
            request.execute('prcPriorTaxPaymentGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoPriorTaxPayment = ValidateData(recordsets[0])[0];
                        }
                        res.json(dtoPriorTaxPayment);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};

exports.Exists = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('TaxType', sql.VarChar(200), query.FederalEIN);
            request.input('LiabilityPeriod', sql.VarChar(200), query.FederalEIN);
            request.input('PeriodStartDate', sql.VarChar(10), query.PeriodStartDate);
            request.input('PeriodEndDate', sql.VarChar(10), query.PeriodEndDate);
            request.execute('prcPriorTaxPaymentExist', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        res.json(returnValue == 1 ? true : false);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};

//exports.GetLookup = function (req, res) {
//    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
//        if (err) {
//            winston.log('error', err);
//        }
//        else {
//            var request = new sql.Request(connection);
//            var query = req.body;
//            request.input('ClientId', sql.BigInt, query.ClientId);
//            request.execute('prcLocationGetLookup', function (err, recordsets, returnValue, affected) {
//                connection.close();
//                if (err) {
//                    winston.log('error', err);
//                }
//                else {
//                    try {
//                        res.json(recordsets[0]);
//                    }
//                    catch (err) {
//                        winston.log('error', err);
//                    }
//                }
//            });
//        }
//    });
//};

function ValidateData(arrData) {
    for (i = 0; i < arrData.length; i++) {
        arrData[i].PriorTaxPaymentId = arrData[i].PriorTaxPaymentId == null ? 0 : arrData[i].PriorTaxPaymentId;
        arrData[i].TaxType = arrData[i].TaxType == null ? '' : arrData[i].TaxType;
        arrData[i].ClientId = arrData[i].ClientId == null ? '' : arrData[i].ClientId;
        arrData[i].LiabilityPeriod = arrData[i].LiabilityPeriod == null ? '' : arrData[i].LiabilityPeriod;
        arrData[i].PeriodStartDate = arrData[i].PeriodStartDate == null ? '' : arrData[i].PeriodStartDate;
        arrData[i].PeriodEndDate = arrData[i].PeriodEndDate == null ? '' : arrData[i].PeriodEndDate;
        arrData[i].PaymentDate = arrData[i].PaymentDate == null ? '' : arrData[i].PaymentDate;
        arrData[i].CheckNumber = arrData[i].CheckNumber == null ? '' : arrData[i].CheckNumber;
        arrData[i].Notes = arrData[i].Notes == null ? 0 : arrData[i].Notes;
        arrData[i].FederalIncome = arrData[i].FederalIncome == null ? '' : arrData[i].FederalIncome;
        arrData[i].SocialSecurity = arrData[i].SocialSecurity == null ? '' : arrData[i].SocialSecurity;
        arrData[i].SocialSecurityEmployer = arrData[i].SocialSecurityEmployer == null ? '' : arrData[i].SocialSecurityEmployer;
        arrData[i].Medicare = arrData[i].Medicare == null ? '' : arrData[i].Medicare;
        arrData[i].MedicareEmployer = arrData[i].MedicareEmployer == null ? '' : arrData[i].MedicareEmployer;
        arrData[i].PaymentMethod = arrData[i].PaymentMethod == null ? '' : arrData[i].PaymentMethod;
        arrData[i].FutaEmployer = arrData[i].FutaEmployer == null ? '' : arrData[i].FutaEmployer;
        arrData[i].TotalAmount = arrData[i].TotalAmount == null ? '' : arrData[i].TotalAmount;
    }
    return arrData;
}