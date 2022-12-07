exports.GetPage = function (req, res) {
    var dtoStandardDeductionPage = new Object();
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
            request.execute('prcStandardDeduction1GetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        dtoStandardDeductionPage.StandardDeductions = ValidateData(recordsets[0]);
                        dtoStandardDeductionPage.TotalRecords = recordsets[1][0].TotalRecords;
                        res.json(dtoStandardDeductionPage);
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

            var StandardDeduction1Details = new sql.Table()
            StandardDeduction1Details.columns.add('PayScheduleRecurrenceId', sql.BigInt);
            StandardDeduction1Details.columns.add('S', sql.Decimal(18, 2));
            StandardDeduction1Details.columns.add('MJ', sql.Decimal(18, 2));
            StandardDeduction1Details.columns.add('MM', sql.Decimal(18, 2));
            StandardDeduction1Details.columns.add('M01', sql.Decimal(18, 2));
            StandardDeduction1Details.columns.add('M2', sql.Decimal(18, 2));
            StandardDeduction1Details.columns.add('HH', sql.Decimal(18, 2));
            var arrStandardDeductionDetails = query.StandardDeductionDetails.split(String.fromCharCode(135));
            if (arrStandardDeductionDetails[0] == '') {
                arrStandardDeductionDetails.splice(0, 1);
            }
            for (var i = 0; i < arrStandardDeductionDetails.length; i++) {
                var arrStandardDeductionDetail = arrStandardDeductionDetails[i].split(String.fromCharCode(134));
                StandardDeduction1Details.rows.add(parseInt(arrStandardDeductionDetail[0]), parseFloat(arrStandardDeductionDetail[1]), parseFloat(arrStandardDeductionDetail[2]), parseFloat(arrStandardDeductionDetail[3]), parseFloat(arrStandardDeductionDetail[4]), parseFloat(arrStandardDeductionDetail[5]), parseFloat(arrStandardDeductionDetail[6]));
            }

            request.input('StandardDeductionId', sql.BigInt, query.StandardDeductionId);
            request.input('StateId', sql.BigInt, query.StateId);
            request.input('EffectiveDate', sql.VarChar(10), query.EffectiveDate);
            request.input('StandardDeduction1Details', StandardDeduction1Details);
            request.execute('prcStandardDeduction1Save', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetStandardDeductionPage');
                        if (query.StandardDeductionId > 0) {
                            socketio.emit('GetStandardDeductionObject', query.StandardDeductionId);
                        }
                        res.json(err ? 0 : recordsets[0][0].StandardDeductionId);

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
            request.input('StandardDeductionId', sql.BigInt, query.StandardDeductionId);
            request.execute('prcStandardDeduction1Delete', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetStandardDeductionPage');
                        socketio.emit('GetStandardDeductionObject', query.StandardDeductionId);
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
            request.input('StandardDeductionId', sql.BigInt, query.StandardDeductionId);
            request.execute('prcStandardDeduction1Deletable', function (err, recordsets, returnValue, affected) {
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
    var dtoStandardDeduction = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('StandardDeductionId', sql.BigInt, query.StandardDeductionId);
            request.execute('prcStandardDeduction1Get', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoStandardDeduction = ValidateData(recordsets[0])[0];
                        }
                        res.json(dtoStandardDeduction);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.GetStandardDeductionDetail = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('StandardDeductionId', sql.BigInt, query.StandardDeductionId);
            request.execute('prcStandardDeduction1DetailGet', function (err, recordsets, returnValue, affected) {
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
            Import.columns.add('S', sql.Decimal(18, 2));
            Import.columns.add('MJ', sql.Decimal(18, 2));
            Import.columns.add('MM', sql.Decimal(18, 2));
            Import.columns.add('M01', sql.Decimal(18, 2));
            Import.columns.add('M2', sql.Decimal(18, 2));
            Import.columns.add('HH', sql.Decimal(18, 2));

            for (var i = 1; i < arrData.length; i++) {
                Import.rows.add(arrData[i][0], arrData[i][1], arrData[i][2], arrData[i][3], arrData[i][4], arrData[i][5], arrData[i][6], arrData[i][7], arrData[i][8]); //, arrData[i][9], arrData[i][10], arrData[i][11], arrData[i][12], arrData[i][13], arrData[i][14], arrData[i][15], arrData[i][16]); //, '', '', ClientId, arrData[i][17]);
            }

            var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
                if (err) {
                    winston.log('error', err);
                }
                else {
                    var request = new sql.Request(connection);
                    request.input('Import', Import);
                    request.execute('prcStandardDeduction1BulkSave', function (err, recordsets, returnValue, affected) {
                        connection.close();
                        if (err) {
                            winston.log('error', err);
                        }
                        else {
                            try {
                                socketio.emit('GetStandardDeductionPage');
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