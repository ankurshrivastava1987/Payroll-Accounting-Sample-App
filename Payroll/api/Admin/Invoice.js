exports.GetPage = function (req, res) {
    var dtoInvoicePage = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('StartIndex', sql.Int, query.StartIndex);
            request.input('PageSize', sql.Int, query.PageSize);
            request.input('SortField', sql.VarChar(50), query.SortField);
            request.input('SortDirection', sql.VarChar(4), query.SortDirection);
            request.input('FilterText', sql.VarChar(50), query.FilterText);
            request.execute('prcInvoiceGetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        dtoInvoicePage.Invoices = ValidateData(recordsets[0]);
                        dtoInvoicePage.TotalRecords = recordsets[1][0].TotalRecords;
                        res.json(dtoInvoicePage);
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
            if ((query.InvoiceId == 0) && (query.CardNo.trim() != '')) {
                var stripe = require('stripe')(Configuration.StripeKey);
                stripe.customers.createSource(query.ClientStripeId, {
                    source: {
                        object: 'card',
                        exp_month: query.ExpiryMonth,
                        exp_year: query.ExpiryYear,
                        number: query.CardNo,
                        cvc: query.CVC
                    }

                }).then(function (source) {
                    return stripe.charges.create({
                        amount: query.NetAmount,
                        currency: 'usd',
                        customer: source.customer
                    });
                }).then(function (charge) {
                    request.input('InvoiceId', sql.BigInt, query.InvoiceId);
                    request.input('InvoiceDate', sql.DateTime, query.InvoiceDate);
                    request.input('FromDate', sql.DateTime, query.FromDate);
                    request.input('ToDate', sql.DateTime, query.ToDate);
                    request.input('ClientId', sql.BigInt, query.ClientId);
                    request.input('PlanId', sql.BigInt, query.PlanId);
                    request.input('PlanType', sql.Int, query.PlanType);
                    request.input('EmployeeCount', sql.Int, query.EmployeeCount);
                    request.input('Amount', sql.Decimal(18, 2), query.Amount);
                    request.input('DiscountPercentage', sql.Decimal(18, 2), query.DiscountPercentage);
                    request.input('EmployeeRate', sql.Decimal(18, 2), query.EmployeeRate);
                    request.input('CardNo', sql.VarChar(4), query.CardNo);
                    request.input('StripeId', sql.VarChar(50), query.StripeId);
                    request.input('PaidDate', sql.DateTime, query.PaidDate);
                    request.input('Status', sql.VarChar(20), query.Status);
                    request.execute('prcInvoiceSave', function (err, recordsets, returnValue, affected) {
                        connection.close();
                        if (err) {
                            winston.log('error', err);
                        }
                        else {
                            try {
                                socketio.emit('GetClientClientPage');
                                res.json(err ? 0 : recordsets[0][0].InvoiceId);
                            }
                            catch (err) {
                                winston.log('error', err);
                            }
                        }
              });
                
            }).catch(function (err) {
                winston.log('error', err);
            });

            }
            else {
                request.input('InvoiceId', sql.BigInt, query.InvoiceId);
                request.input('InvoiceDate', sql.DateTime, query.InvoiceDate);
                request.input('FromDate', sql.DateTime, query.FromDate);
                request.input('ToDate', sql.DateTime, query.ToDate);
                request.input('ClientId', sql.BigInt, query.ClientId);
                request.input('PlanId', sql.BigInt, query.PlanId);
                request.input('PlanType', sql.Int, query.PlanType);
                request.input('EmployeeCount', sql.Int, query.EmployeeCount);
                request.input('Amount', sql.Decimal(18, 2), query.Amount);
                request.input('DiscountPercentage', sql.Decimal(18, 2), query.DiscountPercentage);
                request.input('EmployeeRate', sql.Decimal(18, 2), query.EmployeeRate);
                request.input('CardNo', sql.VarChar(4), query.CardNo);
                request.input('StripeId', sql.VarChar(50), query.StripeId);
                request.input('PaidDate', sql.DateTime, query.PaidDate);
                request.input('Status', sql.VarChar(20), query.Status);     
                request.execute('prcInvoiceSave', function (err, recordsets, returnValue, affected) {
                    connection.close();
                    if (err) {
                        winston.log('error', err);
                    }
                    else {
                        try {
                            socketio.emit('GetClientClientPage');
                            if (query.InvoiceId > 0) {
                                socketio.emit('GetClientClientObject', query.InvoiceId);
                            }
                            res.json(err ? 0 : recordsets[0][0].ClientId);
                        }
                        catch (err) {
                            winston.log('error', err);
                        }
                    }
                });
            }
        }
    });
};

function ValidateData(arrData) {
    for (i = 0; i < arrData.length; i++) {
        arrData[i].InvoiceId = arrData[i].InvoiceId == null ? 0 : arrData[i].InvoiceId;
        arrData[i].InvoiceDate = arrData[i].InvoiceDate == null ? new Date('1900/01/01') : arrData[i].InvoiceDate;
        arrData[i].FromDate = arrData[i].FromDate == null ? new Date('1900/01/01') : arrData[i].FromDate;
        arrData[i].ToDate = arrData[i].ToDate == null ? new Date('1900/01/01') : arrData[i].ToDate;
        arrData[i].ClientId = arrData[i].ClientId == null ? 0 : arrData[i].ClientId;
        arrData[i].FullName = arrData[i].FullName == null ? '' : arrData[i].FullName;
        arrData[i].PlanId = arrData[i].PlanId == null ? 0 : arrData[i].PlanId;
        arrData[i].PlanCode = arrData[i].PlanCode == null ? 0 : arrData[i].PlanCode;
        arrData[i].PlanType = arrData[i].PlanType == null ? '' : arrData[i].PlanType;
        arrData[i].PlanName = arrData[i].PlanName == null ? '' : arrData[i].PlanName;
        arrData[i].EmployeeCount = arrData[i].EmployeeCount == null ? 0 : arrData[i].EmployeeCount;
        arrData[i].Amount = arrData[i].Amount == null ? 0 : arrData[i].Amount;
        arrData[i].DiscountPercentage = arrData[i].DiscountPercentage == null ? 0 : arrData[i].DiscountPercentage;
        arrData[i].EmployeeRate = arrData[i].EmployeeRate == null ? 0 : arrData[i].EmployeeRate;
        arrData[i].CardNo = arrData[i].CardNo == null ? '' : arrData[i].CardNo;
        arrData[i].StripeId = arrData[i].StripeId == null ? '' : arrData[i].StripeId;
        arrData[i].PaidDate = arrData[i].PaidDate == null ? new Date('1900/01/01') : arrData[i].PaidDate;
        arrData[i].Status = arrData[i].Status == null ? '' : arrData[i].Status;
    }
    return arrData;
}