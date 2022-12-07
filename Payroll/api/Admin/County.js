exports.GetPage = function (req, res) {
    var dtoCountyPage = new Object();
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
            request.execute('prcCountyGetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        dtoCountyPage.Counties = ValidateData(recordsets[0]);
                        dtoCountyPage.TotalRecords = recordsets[1][0].TotalRecords;
                        res.json(dtoCountyPage);
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
            request.input('CountyId', sql.BigInt, query.CountyId);     
            request.input('CountyCode', sql.VarChar(5), query.CountyCode);       
            request.input('CountyName', sql.VarChar(50), query.CountyName);           
            request.input('StateId', sql.BigInt, query.StateId); 
            request.execute('prcCountySave', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetCountyPage');
                        if (query.CountyId > 0) {
                            socketio.emit('GetCountyObject', query.CountyId);
                        }
                        res.json(err ? 0 : recordsets[0][0].CountyId);
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
            request.input('CountyId', sql.BigInt, query.CountyId);
            request.execute('prcCountyDelete', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetCountyPage');
                        socketio.emit('GetCountyObject', query.CountyId);
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
            request.input('CountyId', sql.BigInt, query.CountyId);
            request.execute('prcCountyDeletable', function (err, recordsets, returnValue, affected) {
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
    var dtoCounty = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;          
            request.input('CountyId', sql.BigInt, query.CountyId);
            request.execute('prcCountyGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoCounty = ValidateData(recordsets[0])[0];
                        }
                        res.json(dtoCounty);
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
            request.input('CountyId', sql.BigInt, query.CountyId);
            request.input('CountyName', sql.VarChar(50), query.CountyName);
            request.execute('prcCountyExist', function (err, recordsets, returnValue, affected) {
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
exports.Exists1 = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('CountyId', sql.BigInt, query.CountyId);
            request.input('CountyCode', sql.VarChar(5), query.CountyCode);
            request.execute('prcCountyExist1', function (err, recordsets, returnValue, affected) {
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

exports.GetLookup = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body; 
            request.input('StateId', sql.BigInt, query.StateId);           
            request.execute('prcCountyGetLookup', function (err, recordsets, returnValue, affected) {
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

function ValidateData(arrData) {
    for (i = 0; i < arrData.length; i++) {
        arrData[i].CountyId = arrData[i].CountyId == null ? 0 : arrData[i].CountyId;
        arrData[i].CountyCode = arrData[i].CountyCode == null ? '' : arrData[i].CountyCode;
        arrData[i].CountyName = arrData[i].CountyName == null ? '' : arrData[i].CountyName;      
        arrData[i].StateId = arrData[i].StateId == null ? 0 : arrData[i].StateId;
        arrData[i].StateCode = arrData[i].StateCode == null ? '' : arrData[i].StateCode;
        arrData[i].StateName = arrData[i].StateName == null ? '' : arrData[i].StateName;       
    }
    return arrData;
}