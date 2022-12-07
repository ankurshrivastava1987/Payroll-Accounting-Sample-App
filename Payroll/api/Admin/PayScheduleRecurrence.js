exports.GetPage = function (req, res) {
    var dtoPayScheduleRecurrencePage = new Object();
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
            request.execute('prcPayScheduleRecurrenceGetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        dtoPayScheduleRecurrencePage.PayScheduleRecurrences = ValidateData(recordsets[0]);
                        dtoPayScheduleRecurrencePage.TotalRecords = recordsets[1][0].TotalRecords;
                        res.json(dtoPayScheduleRecurrencePage);
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
            request.input('PayScheduleRecurrenceId', sql.BigInt, query.PayScheduleRecurrenceId);
            request.input('PayScheduleRecurrenceCode', sql.VarChar(5), query.PayScheduleRecurrenceCode);
            request.input('PayScheduleRecurrenceName', sql.VarChar(50), query.PayScheduleRecurrenceName);
            request.input('DisplayOrder', sql.BigInt, query.DisplayOrder);
            request.execute('prcPayScheduleRecurrenceSave', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetPayScheduleRecurrencePage');
                        if (query.PayScheduleRecurrenceId > 0) {
                            socketio.emit('GetPayScheduleRecurrenceObject', query.PayScheduleRecurrenceId);
                        }
                        res.json(err ? 0 : recordsets[0][0].PayScheduleRecurrenceId);
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
            request.input('PayScheduleRecurrenceId', sql.BigInt, query.PayScheduleRecurrenceId);
            request.execute('prcPayScheduleRecurrenceDelete', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetPayScheduleRecurrencePage');
                        socketio.emit('GetPayScheduleRecurrenceObject', query.PayScheduleRecurrenceId);
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
            request.input('PayScheduleRecurrenceId', sql.BigInt, query.PayScheduleRecurrenceId);
            request.execute('prcPayScheduleRecurrenceDeletable', function (err, recordsets, returnValue, affected) {
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
    var dtoPayScheduleRecurrence = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('PayScheduleRecurrenceId', sql.BigInt, query.PayScheduleRecurrenceId);
            request.execute('prcPayScheduleRecurrenceGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoPayScheduleRecurrence = ValidateData(recordsets[0])[0];
                        }
                        res.json(dtoPayScheduleRecurrence);
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
            request.input('PayScheduleRecurrenceId', sql.BigInt, query.PayScheduleRecurrenceId);
            request.input('PayScheduleRecurrenceName', sql.VarChar(50), query.PayScheduleRecurrenceName);
            request.execute('prcPayScheduleRecurrenceExist', function (err, recordsets, returnValue, affected) {
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
            request.input('PayScheduleRecurrenceId', sql.BigInt, query.PayScheduleRecurrenceId);
            request.input('PayScheduleRecurrenceCode', sql.VarChar(5), query.PayScheduleRecurrenceCode);
            request.execute('prcPayScheduleRecurrenceExist1', function (err, recordsets, returnValue, affected) {
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
            request.execute('prcPayScheduleRecurrenceGetLookup', function (err, recordsets, returnValue, affected) {
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
        arrData[i].PayScheduleRecurrenceCode = arrData[i].PayScheduleRecurrenceCode == null ? '' : arrData[i].PayScheduleRecurrenceCode;
        arrData[i].PayScheduleRecurrenceName = arrData[i].PayScheduleRecurrenceName == null ? '' : arrData[i].PayScheduleRecurrenceName;
        arrData[i].DisplayOrder = arrData[i].DisplayOrder == null ? 0 : arrData[i].DisplayOrder;
    }
    return arrData;
}