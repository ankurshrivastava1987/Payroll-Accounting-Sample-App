exports.GetPage = function (req, res) {
    var dtoClientTaxSetupPage = new Object();
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
            request.execute('prcClientTaxSetupGetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        dtoClientTaxSetupPage.ClientTaxSetups = ValidateData(recordsets[0]);
                        dtoClientTaxSetupPage.TotalRecords = recordsets[1][0].TotalRecords;
                        res.json(dtoClientTaxSetupPage);
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
            request.input('ClientTaxSetupId', sql.BigInt, query.ClientTaxSetupId);
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('StateId', sql.BigInt, query.StateId);
            request.input('EffectiveDate', sql.VarChar(10), query.EffectiveDate);
            request.input('SUITaxEmployer', sql.Decimal(18, 6), query.SUITaxEmployer);   
            request.input('MinLimit', sql.Decimal(18, 2), query.MinLimit.replace('$', '').replace(',', ''));   
            request.input('MaxLimit', sql.Decimal(18, 2), query.MaxLimit.replace('$', '').replace(',', ''));            
            request.execute('prcClientTaxSetupSave', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetClientTaxSetupPage');
                        if (query.ClientTaxSetupId > 0) {
                            socketio.emit('GetClientTaxSetupObject', query.ClientTaxSetupId);
                        }
                        res.json(err ? 0 : recordsets[0][0].ClientTaxSetupId);
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
            request.input('ClientTaxSetupId', sql.BigInt, query.ClientTaxSetupId);
            request.execute('prcClientTaxSetupDelete', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetClientTaxSetupPage');
                        socketio.emit('GetClientTaxSetupObject', query.ClientTaxSetupId);
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
            request.input('ClientTaxSetupId', sql.BigInt, query.ClientTaxSetupId);
            request.execute('prcClientTaxSetupDeletable', function (err, recordsets, returnValue, affected) {
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
    var dtoClientTaxSetup = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('ClientTaxSetupId', sql.BigInt, query.ClientTaxSetupId);
            request.execute('prcClientTaxSetupGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoClientTaxSetup = ValidateData(recordsets[0])[0];
                        }
                        res.json(dtoClientTaxSetup);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};

function ValidateData(arrData) {
    for (i = 0; i < arrData.length; i++) {
        arrData[i].ClientId = arrData[i].ClientId == null ? 0 : arrData[i].ClientId;  
        arrData[i].StateId = arrData[i].StateId == null ? 0 : arrData[i].StateId;
        arrData[i].StateCode = arrData[i].StateCode == null ? '' : arrData[i].StateCode;
        arrData[i].StateName = arrData[i].StateName == null ? '' : arrData[i].StateName; 
        arrData[i].EffectiveDate = arrData[i].EffectiveDate == null ? new Date('1900-01-01') : arrData[i].EffectiveDate;
        arrData[i].SUITaxEmployer = arrData[i].SUITaxEmployer == null ? 0 : arrData[i].SUITaxEmployer;  
        arrData[i].MinLimit = arrData[i].MinLimit == null ? 0 : arrData[i].MinLimit;  
        arrData[i].MaxLimit = arrData[i].MaxLimit == null ? 0 : arrData[i].MaxLimit;       
    }
    return arrData;
}