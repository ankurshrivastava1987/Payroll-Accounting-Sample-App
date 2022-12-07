exports.GetPage = function (req, res) {
    var dtoDeductionConstantSetupPage = new Object();
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
            request.execute('prcDeductionConstantSetupGetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        dtoDeductionConstantSetupPage.DeductionConstantSetups = ValidateData(recordsets[0]);
                        dtoDeductionConstantSetupPage.TotalRecords = recordsets[1][0].TotalRecords;
                        res.json(dtoDeductionConstantSetupPage);
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

            var DeductionConstantsA = new sql.Table()
            DeductionConstantsA.columns.add('PersonalExemptions', sql.Int);
            DeductionConstantsA.columns.add('PayScheduleRecurrenceId', sql.BigInt);            
            DeductionConstantsA.columns.add('Amount', sql.Decimal(18, 2));
            var arrDeductionConstantsA = query.DeductionConstantsA.split(String.fromCharCode(135));
            if (arrDeductionConstantsA[0] == '') {
                arrDeductionConstantsA.splice(0, 1);
            }
            for (var i = 0; i < arrDeductionConstantsA.length; i++) {
                var arrDeductionConstantA = arrDeductionConstantsA[i].split(String.fromCharCode(134));
                DeductionConstantsA.rows.add(parseInt(arrDeductionConstantA[0]), parseInt(arrDeductionConstantA[1]), parseFloat(arrDeductionConstantA[2]));
            }

            var DeductionConstantsB = new sql.Table()
            DeductionConstantsB.columns.add('DependentExemptions', sql.Int);
            DeductionConstantsB.columns.add('PayScheduleRecurrenceId', sql.BigInt);
            DeductionConstantsB.columns.add('Amount', sql.Decimal(18, 2));
            var arrDeductionConstantsB = query.DeductionConstantsB.split(String.fromCharCode(135));
            if (arrDeductionConstantsB[0] == '') {
                arrDeductionConstantsB.splice(0, 1);
            }
            for (var i = 0; i < arrDeductionConstantsB.length; i++) {
                var arrDeductionConstantB = arrDeductionConstantsB[i].split(String.fromCharCode(134));
                DeductionConstantsB.rows.add(parseInt(arrDeductionConstantB[0]), parseInt(arrDeductionConstantB[1]), parseFloat(arrDeductionConstantB[2]));
            }
            
            request.input('DeductionConstantSetupId', sql.BigInt, query.DeductionConstantSetupId);
            request.input('StateId', sql.BigInt, query.StateId);
            request.input('EffectiveDate', sql.VarChar(10), query.EffectiveDate);
            request.input('DeductionConstantsA', DeductionConstantsA);
            request.input('DeductionConstantsB', DeductionConstantsB);            
            request.execute('prcDeductionConstantSetupSave', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetDeductionConstantSetupPage');
                        if (query.DeductionConstantSetupId > 0) {
                            socketio.emit('GetDeductionConstantSetupObject', query.DeductionConstantSetupId);
                        }
                        res.json(err ? 0 : recordsets[0][0].DeductionConstantSetupId);

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
            request.input('DeductionConstantSetupId', sql.BigInt, query.DeductionConstantSetupId);
            request.execute('prcDeductionConstantSetupDelete', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetDeductionConstantSetupPage');
                        socketio.emit('GetDeductionConstantSetupObject', query.DeductionConstantSetupId);
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
            request.input('DeductionConstantSetupId', sql.BigInt, query.DeductionConstantSetupId);
            request.execute('prcDeductionConstantSetupDeletable', function (err, recordsets, returnValue, affected) {
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
    var dtoDeductionConstantSetup = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('DeductionConstantSetupId', sql.BigInt, query.DeductionConstantSetupId);
            request.execute('prcDeductionConstantSetupGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoDeductionConstantSetup = ValidateData(recordsets[0])[0];
                        }
                        res.json(dtoDeductionConstantSetup);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.GetDeductionConstantASetup = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('DeductionConstantSetupId', sql.BigInt, query.DeductionConstantSetupId);
            request.execute('prcDeductionConstantASetupGet', function (err, recordsets, returnValue, affected) {
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
exports.GetDeductionConstantBSetup = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('DeductionConstantSetupId', sql.BigInt, query.DeductionConstantSetupId);
            request.execute('prcDeductionConstantBSetupGet', function (err, recordsets, returnValue, affected) {
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
            Import.columns.add('PersonalExemptions', sql.Int);
            Import.columns.add('PayScheduleRecurrenceA', sql.NVarChar(100));
            Import.columns.add('AmountA', sql.Decimal(18, 2));
            Import.columns.add('DependentExemptions', sql.Int);
            Import.columns.add('PayScheduleRecurrenceB', sql.NVarChar(100));
            Import.columns.add('AmountB', sql.Decimal(18, 2));
            for (var i = 1; i < arrData.length; i++) {
                Import.rows.add(arrData[i][0], arrData[i][1], arrData[i][2], arrData[i][3], arrData[i][4], arrData[i][5], arrData[i][6], arrData[i][7]);  //, arrData[i][8], arrData[i][9]); //, arrData[i][11], arrData[i][12], arrData[i][13], arrData[i][14], arrData[i][15], arrData[i][16], '', '', ClientId, arrData[i][17]);
            }

            var connection = new sql.Connection(Configuration.ConnectionString, function (err) { 
                if (err) {
                    winston.log('error', err);
                }
                else {
                    var request = new sql.Request(connection);
                    request.input('Import', Import);
                    request.execute('prcDeductionConstantSetupBulkSave', function (err, recordsets, returnValue, affected) {
                        connection.close();
                        if (err) {
                            winston.log('error', err);
                        }
                        else {
                            try {
                                socketio.emit('GetDeductionConstantSetupPage');
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