exports.Save = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            
            request.input('ServiceCancellationId', sql.BigInt, query.ServiceCancellationId);
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('ServiceCancellationReasonId', sql.BigInt, query.ServiceCancellationReasonId);
            request.input('OtherReason', sql.VarChar(500), query.OtherReason);
            request.input('OtherPaymentMethodId', sql.BigInt, query.OtherPaymentMethodId);
            request.input('OtherPaymentMethod', sql.VarChar(500), query.OtherPaymentMethod);
            request.input('Rating', sql.BigInt, query.Rating);
            request.input('ReasonOfRating', sql.VarChar(500), query.ReasonOfRating);
            request.execute('prcCreateServiceCancellation', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        //socketio.emit('GetPriorTaxPaymentPage');
                        //if (recordsets[0][0].ServiceCancellationId > 0) {
                            //socketio.emit('GetPriorTaxPaymentObject', query.ServiceCancellationId);
                        //}
                        res.json(err ? 0 : recordsets[0][0].ServiceCancellationId);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};

exports.GetServiceCancellationReason = function (req, res) {
    var ServiceCancellationReasons = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.execute('prcGetAllServiceCancellationReason', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            ServiceCancellationReasons = recordsets[0];
                        }
                        res.json(ServiceCancellationReasons);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};

exports.GetOtherPaymentMethod = function (req, res) {
    var OtherPaymentMethods = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.execute('prcGetAllOtherPaymentMethod', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            OtherPaymentMethods = recordsets[0];
                        }
                        res.json(OtherPaymentMethods);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
