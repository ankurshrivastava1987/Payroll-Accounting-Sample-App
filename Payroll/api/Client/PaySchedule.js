exports.GetPage = function (req, res) {
    var dtoPaySchedulePage = new Object();
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
            request.execute('prcPayScheduleGetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        dtoPaySchedulePage.PaySchedules = ValidateData(recordsets[0]);
                        dtoPaySchedulePage.TotalRecords = recordsets[1][0].TotalRecords;
                        res.json(dtoPaySchedulePage);
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
            request.input('PayScheduleId', sql.BigInt, query.PayScheduleId);
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('PayScheduleName', sql.VarChar(50), query.PayScheduleName);
            request.input('DaysAfterClose', sql.Int, query.DaysAfterClose);
            request.input('PayPeriodEndDate', sql.VarChar(10), query.PayPeriodEndDate);
            request.input('PayScheduleRecurrenceId', sql.VarChar(10), query.PayScheduleRecurrenceId);
            request.input('DailyEveryWeekDay', sql.Bit, query.DailyEveryWeekDay);            
            request.input('Status', sql.VarChar(10), query.Status);
            request.input('Default', sql.Bit, query.Default); 
            request.execute('prcPayScheduleSave', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetPaySchedulePage');
                        if (query.PayScheduleId > 0) {
                            socketio.emit('GetPayScheduleObject', query.PayScheduleId);
                        }
                        res.json(err ? 0 : recordsets[0][0].PayScheduleId);
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
            request.input('PayScheduleId', sql.BigInt, query.PayScheduleId);
            request.execute('prcPayScheduleDelete', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetPaySchedulePage');
                        socketio.emit('GetPayScheduleObject', query.PayScheduleId);
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
            request.input('PayScheduleId', sql.BigInt, query.PayScheduleId);
            request.execute('prcPayScheduleDeletable', function (err, recordsets, returnValue, affected) {
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
    var dtoPaySchedule = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('PayScheduleId', sql.BigInt, query.PayScheduleId);
            request.execute('prcPayScheduleGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoPaySchedule = ValidateData(recordsets[0])[0];
                        }
                        res.json(dtoPaySchedule);
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
            request.input('PayScheduleId', sql.BigInt, query.PayScheduleId);
            request.input('PayScheduleName', sql.VarChar(50), query.PayScheduleName);
            request.execute('prcPayScheduleExist', function (err, recordsets, returnValue, affected) {
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
            request.execute('prcPayScheduleGetLookup', function (err, recordsets, returnValue, affected) {
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
        arrData[i].PayScheduleId = arrData[i].PayScheduleId == null ? 0 : arrData[i].PayScheduleId;
        arrData[i].ClientId = arrData[i].ClientId == null ? 0 : arrData[i].ClientId;
        arrData[i].PayScheduleName = arrData[i].PayScheduleName == null ? '' : arrData[i].PayScheduleName;
        arrData[i].DaysAfterClose = arrData[i].DaysAfterClose == null ? 0 : arrData[i].DaysAfterClose;
        arrData[i].PayPeriodEndDate = arrData[i].PayPeriodEndDate == null ? '01/01/1900' : arrData[i].PayPeriodEndDate;
        arrData[i].PayScheduleRecurrenceId = arrData[i].PayScheduleRecurrenceId == null ? 0 : arrData[i].PayScheduleRecurrenceId;
        arrData[i].PayScheduleRecurrenceCode = arrData[i].PayScheduleRecurrenceCode == null ? '' : arrData[i].PayScheduleRecurrenceCode;
        arrData[i].PayScheduleRecurrenceName = arrData[i].PayScheduleRecurrenceName == null ? '' : arrData[i].PayScheduleRecurrenceName;
        arrData[i].DailyEveryWeekDay = arrData[i].DailyEveryWeekDay == null ? false : arrData[i].DailyEveryWeekDay;        
        arrData[i].Status = arrData[i].Status == null ? 'Inactive' : arrData[i].Status;
        arrData[i].Default = arrData[i].Default == null ? false : arrData[i].Default;
    }
    return arrData;
}