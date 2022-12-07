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