exports.GetPage = function (req, res) {
    var dtoStateTaxSetup1Page = new Object();
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
            request.execute('prcStateTaxSetup1GetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        dtoStateTaxSetup1Page.StateTaxSetup1s = ValidateData(recordsets[0]);
                        dtoStateTaxSetup1Page.TotalRecords = recordsets[1][0].TotalRecords;
                        res.json(dtoStateTaxSetup1Page);
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

            var StateTaxSetup1Details = new sql.Table()
            StateTaxSetup1Details.columns.add('LowLimit', sql.Decimal(18, 2));
            StateTaxSetup1Details.columns.add('HighLimit', sql.Decimal(18, 2));
            StateTaxSetup1Details.columns.add('AC0', sql.Decimal(18, 2));
            StateTaxSetup1Details.columns.add('AC1', sql.Decimal(18, 2));
            StateTaxSetup1Details.columns.add('AC2', sql.Decimal(18, 2));
            StateTaxSetup1Details.columns.add('AC3', sql.Decimal(18, 2));
            StateTaxSetup1Details.columns.add('AC4', sql.Decimal(18, 2));
            StateTaxSetup1Details.columns.add('AC5', sql.Decimal(18, 2));
            StateTaxSetup1Details.columns.add('AC6', sql.Decimal(18, 2));
            StateTaxSetup1Details.columns.add('AC7', sql.Decimal(18, 2));
            StateTaxSetup1Details.columns.add('AC8', sql.Decimal(18, 2));
            StateTaxSetup1Details.columns.add('AC9', sql.Decimal(18, 2));
            StateTaxSetup1Details.columns.add('AC10', sql.Decimal(18, 2));
            var arrStateTaxSetup1Details = query.StateTaxSetup1Details.split(String.fromCharCode(135));
            if (arrStateTaxSetup1Details[0] == '') {
                arrStateTaxSetup1Details.splice(0, 1);
            }
            for (var i = 0; i < arrStateTaxSetup1Details.length; i++) {
                var arrStateTaxSetup1Detail = arrStateTaxSetup1Details[i].split(String.fromCharCode(134));
                if (arrStateTaxSetup1Detail[14] == "0") {
                    StateTaxSetup1Details.rows.add(parseFloat(arrStateTaxSetup1Detail[1]), parseFloat(arrStateTaxSetup1Detail[2]), parseFloat(arrStateTaxSetup1Detail[3]), parseFloat(arrStateTaxSetup1Detail[4]), parseFloat(arrStateTaxSetup1Detail[5]), parseFloat(arrStateTaxSetup1Detail[6]), parseFloat(arrStateTaxSetup1Detail[7]), parseFloat(arrStateTaxSetup1Detail[8]), parseFloat(arrStateTaxSetup1Detail[9]), parseFloat(arrStateTaxSetup1Detail[10]), parseFloat(arrStateTaxSetup1Detail[11]), parseFloat(arrStateTaxSetup1Detail[12]), parseFloat(arrStateTaxSetup1Detail[13]));
                }
            }

            request.input('StateTaxSetupId', sql.BigInt, query.StateTaxSetupId);
            request.input('StateId', sql.BigInt, query.StateId);
            request.input('EffectiveDate', sql.VarChar(10), query.EffectiveDate);
            request.input('PayScheduleRecurrenceId', sql.BigInt, query.PayScheduleRecurrenceId);
            request.input('SubtractForEachAllowanceClaimed', sql.Decimal(18, 2), query.SubtractForEachAllowanceClaimed);                       
            request.input('StateTaxSetup1Details', StateTaxSetup1Details);
            request.execute('prcStateTaxSetup1Save', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetStateTaxSetup1Page');
                        if (query.StateTaxSetupId > 0) {
                            socketio.emit('GetStateTaxSetup1Object', query.StateTaxSetupId);
                        }
                        res.json(err ? 0 : recordsets[0][0].StateTaxSetupId);
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
            request.input('StateTaxSetupId', sql.BigInt, query.StateTaxSetup1Id);
            request.execute('prcStateTaxSetup1Delete', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetStateTaxSetup1Page');
                        socketio.emit('GetStateTaxSetup1Object', query.StateTaxSetup1Id);
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
            request.input('StateTaxSetupId', sql.BigInt, query.StateTaxSetup1Id);
            request.execute('prcStateTaxSetup1Deletable', function (err, recordsets, returnValue, affected) {
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
    var dtoStateTaxSetup1 = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('StateTaxSetupId', sql.BigInt, query.StateTaxSetupId);
            request.execute('prcStateTaxSetup1Get', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoStateTaxSetup1 = ValidateData(recordsets[0])[0];
                        }
                        res.json(dtoStateTaxSetup1);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.GetStateTaxSetup1Detail = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('StateTaxSetupId', sql.BigInt, query.StateTaxSetupId);
            request.execute('prcStateTaxSetup1DetailGet', function (err, recordsets, returnValue, affected) {
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
        arrData[i].StateId = arrData[i].StateId == null ? 0 : arrData[i].StateId;
        arrData[i].StateName = arrData[i].StateName == null ? '' : arrData[i].StateName;
        arrData[i].EffectiveDate = arrData[i].EffectiveDate == null ? new Date('1900-01-01') : arrData[i].EffectiveDate;
        arrData[i].PayScheduleRecurrenceId = arrData[i].PayScheduleRecurrenceId == null ? 0 : arrData[i].PayScheduleRecurrenceId;
        arrData[i].PayScheduleRecurrenceName = arrData[i].PayScheduleRecurrenceName == null ? '' : arrData[i].PayScheduleRecurrenceName;        
        arrData[i].SubtractForEachAllowanceClaimed = arrData[i].SubtractForEachAllowanceClaimed == null ? 0 : arrData[i].SubtractForEachAllowanceClaimed;        
    }
    return arrData;
}


// Added by ankur for download template excel file
exports.DownloadFile = function (req, res, next) {
    var file = req.params.file
    var path = './templates/' + file;
    res.download(path);
};

// Added by ankur for uploading bulk data
var UploadFileName = '';
//var ClientId = '';
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/../../tmp');
    },
    filename: function (req, file, callback) {
        //ClientId = req.body.hdnClientId;
        UploadFileName = file.originalname;
        callback(null, file.originalname);
    }
});
var upload = multer({ storage: storage }).single('fileUpload');

exports.UploadFile = function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            winston.log('error', err);
            return res.end("Error uploading file.");
        }
        var excel = require('excel');
        excel(__dirname + '/../../tmp/' + UploadFileName, function (err, arrData) {
            if (err) { winston.log('error', err); };

            var Import = new sql.Table();
            Import.columns.add('StateName', sql.NVarChar(100));
            Import.columns.add('EffectiveDate', sql.NVarChar(10));
            Import.columns.add('PayScheduleRecurrence', sql.NVarChar(100));
            Import.columns.add('SubtractForEachAllowanceClaimed', sql.Decimal(18, 2));
            Import.columns.add('LowLimit', sql.Decimal(18, 2));
            Import.columns.add('HighLimit', sql.Decimal(18, 2));
            Import.columns.add('AC0', sql.Decimal(18, 2));
            Import.columns.add('AC1', sql.Decimal(18, 2));
            Import.columns.add('AC2', sql.Decimal(18, 2));
            Import.columns.add('AC3', sql.Decimal(18, 2));
            Import.columns.add('AC4', sql.Decimal(18, 2));
            Import.columns.add('AC5', sql.Decimal(18, 2));
            Import.columns.add('AC6', sql.Decimal(18, 2));
            Import.columns.add('AC7', sql.Decimal(18, 2));
            Import.columns.add('AC8', sql.Decimal(18, 2));
            Import.columns.add('AC9', sql.Decimal(18, 2));
            Import.columns.add('AC10', sql.Decimal(18, 2));

            for (var i = 1; i < arrData.length; i++) {
                Import.rows.add(arrData[i][0], arrData[i][1], arrData[i][2], arrData[i][3], arrData[i][4], arrData[i][5], arrData[i][6], arrData[i][7], arrData[i][8], arrData[i][9], arrData[i][10], arrData[i][11], arrData[i][12], arrData[i][13], arrData[i][14], arrData[i][15], arrData[i][16]); //, '', '', ClientId, arrData[i][17]);
            }

            var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
                if (err) {
                    winston.log('error', err);
                }
                else {
                    var request = new sql.Request(connection);
                    request.input('StateTaxImport', Import);
                    request.execute('prcStateTaxSetup1BulkSave', function (err, recordsets, returnValue, affected) {
                        connection.close();
                        if (err) {
                            winston.log('error', err);
                        }
                        else {
                            try {
                                socketio.emit('GetStateTaxSetup1Page');
                                res.json(true);
                            }
                            catch (err) {
                                winston.log('error', err);
                            }
                        }
                    });
                }
            });
        });
    });
};