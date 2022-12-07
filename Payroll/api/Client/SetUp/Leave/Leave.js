exports.GetPage = function (req, res) {
    var dtoLeavePage = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
         
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('StartIndex', sql.Int, query.StartIndex);
            request.input('PageSize', sql.Int, query.PageSize);
            request.input('SortField', sql.VarChar(50), query.SortField);
            request.input('SortDirection', sql.VarChar(4), query.SortDirection);
            request.input('FilterText', sql.VarChar(50), query.FilterText);
            request.execute('prcLeaveAndVacationGetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        dtoLeavePage.Leaves = ValidateData(recordsets[0]);
                        dtoLeavePage.TotalRecords = recordsets[1][0].TotalRecords;
                        res.json(dtoLeavePage);
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
            request.input('LeaveId', sql.BigInt, query.LeaveId);
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('Category', sql.VarChar(50), query.Category);
            request.input('Description', sql.VarChar(500), query.Description);
            request.input('Frequency', sql.VarChar(50), query.Frequency);
            request.input('HoursEarnedPerYear', sql.Decimal(18,2), query.HoursEarnedPerYear);
            request.input('MaxAvailableHours', sql.Decimal(18, 2), query.MaxAvailableHours);

            request.execute('prcLeaveAndVacationSave', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetLeavePage');
                        if (query.LeaveId > 0) {
                            socketio.emit('GetLeaveObject', query.LeaveId);
                        }
                        res.json(err ? 0 : recordsets[0][0].LeaveId);
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
            request.input('LeaveId', sql.BigInt, query.LeaveId);
            request.execute('prcLeaveAndVacationDelete', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetLeavePage');
                        socketio.emit('GetLeaveObject', query.LeaveId);
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
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('LeaveId', sql.BigInt, query.LeaveId);
            request.execute('prcLeaveAndVacationDeletable', function (err, recordsets, returnValue, affected) {
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
    var dtoLeave = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            //request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            //request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('LeaveId', sql.BigInt, query.LeaveId);
            request.execute('prcLeaveAndVacationGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoLeave = ValidateData(recordsets[0])[0];
                        }
                        res.json(dtoLeave);
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
            request.input('LeaveId', sql.BigInt, query.LeaveId);
            request.input('LeaveName', sql.VarChar(50), query.LeaveName);
            request.execute('prcLeaveAndVacationExist', function (err, recordsets, returnValue, affected) {
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
            request.execute('prcLeaveAndVacationGetLookup', function (err, recordsets, returnValue, affected) {
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
        arrData[i].LeaveId = arrData[i].LeaveId == null ? 0 : arrData[i].LeaveId;
        arrData[i].Category = arrData[i].Category == null ? '' : arrData[i].Category;
        arrData[i].Description = arrData[i].Description == null ? '' : arrData[i].Description;
        arrData[i].Frequency = arrData[i].Frequency == null ? '' : arrData[i].Frequency;
        arrData[i].HoursEarnedPerYear = arrData[i].HoursEarnedPerYear == null ? 0 : arrData[i].HoursEarnedPerYear;
        arrData[i].MaxAvailableHours = arrData[i].MaxAvailableHours == null ? '' : arrData[i].MaxAvailableHours;
    }
    return arrData;
}