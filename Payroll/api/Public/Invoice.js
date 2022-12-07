exports.Save = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('InvoiceId', sql.BigInt, query.InvoiceId);
            request.input('InvoiceDate', sql.VarChar(10), query.InvoiceDate);
            request.input('FromDate', sql.VarChar(10), query.FromDate);
            request.input('ToDate', sql.VarChar(10), query.ToDate);
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('PlanId', sql.BigInt, query.PlanId);
            request.input('PlanType', sql.VarChar(10), query.PlanType);
            request.input('EmployeeCount', sql.Int, query.EmployeeCount);
            request.input('Amount', sql.Decimal(18, 2), query.Amount);
            request.input('DiscountPercentage', sql.Decimal(18, 2), query.DiscountPercentage);
            request.input('EmployeeRate', sql.Decimal(18, 2), query.EmployeeRate);
            request.input('CardNo', sql.VarChar(4), query.CardNo);
            request.input('StripeId', sql.VarChar(50), query.StripeId);
            request.input('PaidDate', sql.VarChar(10), query.PaidDate);
            request.input('Status', sql.VarChar(20), query.Status);
            request.execute('prcInvoiceSave', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetInvoicePage');
                        if (query.InvoiceId > 0) {
                            socketio.emit('GetInvoiceObject', query.InvoiceId);
                        }
                        res.json(err ? 0 : recordsets[0][0].InvoiceId);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};