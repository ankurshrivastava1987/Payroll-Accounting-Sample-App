exports.GetPage = function (req, res) {
    var dtoExemptionAllowancePage = new Object();
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
            request.execute('prcExemptionAllowanceGetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        dtoExemptionAllowancePage.ExemptionAllowances = ValidateData(recordsets[0]);
                        dtoExemptionAllowancePage.TotalRecords = recordsets[1][0].TotalRecords;
                        res.json(dtoExemptionAllowancePage);
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

            var ExemptionAllowanceDetails = new sql.Table()
            ExemptionAllowanceDetails.columns.add('PayScheduleRecurrenceId', sql.BigInt);
            ExemptionAllowanceDetails.columns.add('Allowances', sql.Int);
            ExemptionAllowanceDetails.columns.add('Amount', sql.Decimal(18, 2));
            var arrExemptionAllowanceDetails = query.ExemptionAllowanceDetails.split(String.fromCharCode(135));
            if (arrExemptionAllowanceDetails[0] == '') {
                arrExemptionAllowanceDetails.splice(0, 1);
            }
            for (var i = 0; i < arrExemptionAllowanceDetails.length; i++) {
                var arrExemptionAllowanceDetail = arrExemptionAllowanceDetails[i].split(String.fromCharCode(134));
                ExemptionAllowanceDetails.rows.add(parseInt(arrExemptionAllowanceDetail[0]), parseInt(arrExemptionAllowanceDetail[1]), parseFloat(arrExemptionAllowanceDetail[2]));
            }

            request.input('ExemptionAllowanceId', sql.BigInt, query.ExemptionAllowanceId);
            request.input('StateId', sql.BigInt, query.StateId);
            request.input('EffectiveDate', sql.VarChar(10), query.EffectiveDate);
            request.input('ExemptionAllowanceDetails', ExemptionAllowanceDetails);
            request.execute('prcExemptionAllowanceSave', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetExemptionAllowancePage');
                        if (query.ExemptionAllowanceId > 0) {
                            socketio.emit('GetExemptionAllowanceObject', query.ExemptionAllowanceId);
                        }
                        res.json(err ? 0 : recordsets[0][0].ExemptionAllowanceId);

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
            request.input('ExemptionAllowanceId', sql.BigInt, query.ExemptionAllowanceId);
            request.execute('prcExemptionAllowanceDelete', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetExemptionAllowancePage');
                        socketio.emit('GetExemptionAllowanceObject', query.ExemptionAllowanceId);
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
            request.input('ExemptionAllowanceId', sql.BigInt, query.ExemptionAllowanceId);
            request.execute('prcExemptionAllowanceDeletable', function (err, recordsets, returnValue, affected) {
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
    var dtoExemptionAllowance = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ExemptionAllowanceId', sql.BigInt, query.ExemptionAllowanceId);
            request.execute('prcExemptionAllowanceGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoExemptionAllowance = ValidateData(recordsets[0])[0];
                        }
                        res.json(dtoExemptionAllowance);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.GetExemptionAllowanceDetail = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ExemptionAllowanceId', sql.BigInt, query.ExemptionAllowanceId);
            request.execute('prcExemptionAllowanceDetailGet', function (err, recordsets, returnValue, affected) {
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
            Import.columns.add('Allowances', sql.Decimal(18, 2));
            Import.columns.add('Amount', sql.Decimal(18, 2));

            for (var i = 1; i < arrData.length; i++) {
                Import.rows.add(arrData[i][0], arrData[i][1], arrData[i][2], arrData[i][3], arrData[i][4]); //, arrData[i][5], arrData[i][6], arrData[i][7], arrData[i][8]); //, arrData[i][9], arrData[i][10], arrData[i][11], arrData[i][12], arrData[i][13], arrData[i][14], arrData[i][15], arrData[i][16]); //, '', '', ClientId, arrData[i][17]);
            }

            var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
                if (err) {
                    winston.log('error', err);
                }
                else {
                    var request = new sql.Request(connection);
                    request.input('Import', Import);
                    request.execute('prcExemptionAllowanceBulkSave', function (err, recordsets, returnValue, affected) {
                        connection.close();
                        if (err) {
                            winston.log('error', err);
                        }
                        else {
                            try {
                                socketio.emit('GetExemptionAllowancePage');
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