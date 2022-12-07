exports.GetPage = function (req, res) {
    var dtoLocationPage = new Object();
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
            request.execute('prcLocationGetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        dtoLocationPage.Locations = ValidateData(recordsets[0]);
                        dtoLocationPage.TotalRecords = recordsets[1][0].TotalRecords;
                        res.json(dtoLocationPage);
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
            request.input('LocationId', sql.BigInt, query.LocationId);        
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('LocationName', sql.VarChar(50), query.LocationName);
            request.input('Address1', sql.VarChar(50), query.Address1);
            request.input('Address2', sql.VarChar(50), query.Address2);           
            request.input('CityName', sql.VarChar(50), query.CityName);
            request.input('StateId', sql.BigInt, query.StateId);
            request.input('ZipCode', sql.VarChar(5), query.ZipCode);
            request.input('ZipCodeExt', sql.VarChar(4), query.ZipCodeExt);
            request.execute('prcLocationSave', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetLocationPage');
                        if (query.LocationId > 0) {
                            socketio.emit('GetLocationObject', query.LocationId);
                        }
                        res.json(err ? 0 : recordsets[0][0].LocationId);
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
            request.input('LocationId', sql.BigInt, query.LocationId);
            request.execute('prcLocationDelete', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetLocationPage');
                        socketio.emit('GetLocationObject', query.LocationId);
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
            request.input('LocationId', sql.BigInt, query.LocationId);
            request.execute('prcLocationDeletable', function (err, recordsets, returnValue, affected) {
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
    var dtoLocation = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('LocationId', sql.BigInt, query.LocationId);
            request.execute('prcLocationGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoLocation = ValidateData(recordsets[0])[0];
                        }
                        res.json(dtoLocation);
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
            request.input('LocationId', sql.BigInt, query.LocationId);
            request.input('LocationName', sql.VarChar(50), query.LocationName);
            request.execute('prcLocationExist', function (err, recordsets, returnValue, affected) {
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
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.execute('prcLocationGetLookup', function (err, recordsets, returnValue, affected) {
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
        arrData[i].LocationId = arrData[i].LocationId == null ? 0 : arrData[i].LocationId;       
        arrData[i].LocationName = arrData[i].LocationName == null ? '' : arrData[i].LocationName;
        arrData[i].Address1 = arrData[i].Address1 == null ? '' : arrData[i].Address1;
        arrData[i].Address2 = arrData[i].Address2 == null ? '' : arrData[i].Address2;       
        arrData[i].CityName = arrData[i].CityName == null ? '' : arrData[i].CityName;
        arrData[i].StateId = arrData[i].StateId == null ? 0 : arrData[i].StateId;
        arrData[i].StateCode = arrData[i].StateCode == null ? '' : arrData[i].StateCode;
        arrData[i].StateName = arrData[i].StateName == null ? '' : arrData[i].StateName;
        arrData[i].ZipCode = arrData[i].ZipCode == null ? '' : arrData[i].ZipCode;
        arrData[i].ZipCodeExt = arrData[i].ZipCodeExt == null ? '' : arrData[i].ZipCodeExt;
    }
    return arrData;
}