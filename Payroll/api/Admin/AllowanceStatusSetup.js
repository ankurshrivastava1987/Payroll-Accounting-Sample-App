exports.GetPage = function (req, res) {
    var dtoAllowanceStatusSetupPage = new Object();
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
            request.execute('prcAllowanceStatusSetupGetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        dtoAllowanceStatusSetupPage.AllowanceStatusSetups = ValidateData(recordsets[0]);
                        dtoAllowanceStatusSetupPage.TotalRecords = recordsets[1][0].TotalRecords;
                        res.json(dtoAllowanceStatusSetupPage);
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

            var StandardDeductions = new sql.Table()
            StandardDeductions.columns.add('PayScheduleRecurrenceId', sql.BigInt);
            StandardDeductions.columns.add('FilingStatusId', sql.BigInt);
            StandardDeductions.columns.add('Amount', sql.Decimal(18, 2));            
            var arrStandardDeductions = query.StandardDeductions.split(String.fromCharCode(135));
            if (arrStandardDeductions[0] == '') {
                arrStandardDeductions.splice(0, 1);
            }
            for (var i = 0; i < arrStandardDeductions.length; i++) {
                var arrStandardDeduction = arrStandardDeductions[i].split(String.fromCharCode(134));               
                StandardDeductions.rows.add(parseInt(arrStandardDeduction[0]), parseInt(arrStandardDeduction[1]), parseFloat(arrStandardDeduction[2]));               
            }

            var PersonalAllowances = new sql.Table()
            PersonalAllowances.columns.add('PayScheduleRecurrenceId', sql.BigInt);
            PersonalAllowances.columns.add('FilingStatusId', sql.BigInt);
            PersonalAllowances.columns.add('Amount', sql.Decimal(18, 2));
            var arrPersonalAllowances = query.PersonalAllowances.split(String.fromCharCode(135));
            if (arrPersonalAllowances[0] == '') {
                arrPersonalAllowances.splice(0, 1);
            }
            for (var i = 0; i < arrPersonalAllowances.length; i++) {
                var arrPersonalAllowance = arrPersonalAllowances[i].split(String.fromCharCode(134));
                PersonalAllowances.rows.add(parseInt(arrPersonalAllowance[0]), parseInt(arrPersonalAllowance[1]), parseFloat(arrPersonalAllowance[2]));
            }

            var DependentAllowances = new sql.Table()
            DependentAllowances.columns.add('PayScheduleRecurrenceId', sql.BigInt);           
            DependentAllowances.columns.add('Amount', sql.Decimal(18, 2));
            var arrDependentAllowances = query.DependentAllowances.split(String.fromCharCode(135));
            if (arrDependentAllowances[0] == '') {
                arrDependentAllowances.splice(0, 1);
            }
            for (var i = 0; i < arrDependentAllowances.length; i++) {
                var arrDependentAllowance = arrDependentAllowances[i].split(String.fromCharCode(134));
                DependentAllowances.rows.add(parseInt(arrDependentAllowance[0]), parseFloat(arrDependentAllowance[1]));
            }

            request.input('AllowanceStatusSetupId', sql.BigInt, query.AllowanceStatusSetupId);
            request.input('StateId', sql.BigInt, query.StateId);
            request.input('EffectiveDate', sql.VarChar(10), query.EffectiveDate);            
            request.input('StandardDeductions', StandardDeductions);
            request.input('PersonalAllowances', PersonalAllowances);
            request.input('DependentAllowances', DependentAllowances);
            request.execute('prcAllowanceStatusSetupSave', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetAllowanceStatusSetupPage');
                        if (query.AllowanceStatusSetupId > 0) {
                            socketio.emit('GetAllowanceStatusSetupObject', query.AllowanceStatusSetupId);
                        }
                        res.json(err ? 0 : recordsets[0][0].AllowanceStatusSetupId);

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
            request.input('AllowanceStatusSetupId', sql.BigInt, query.AllowanceStatusSetupId);
            request.execute('prcAllowanceStatusSetupDelete', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetAllowanceStatusSetupPage');
                        socketio.emit('GetAllowanceStatusSetupObject', query.AllowanceStatusSetupId);
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
            request.input('AllowanceStatusSetupId', sql.BigInt, query.AllowanceStatusSetupId);
            request.execute('prcAllowanceStatusSetupDeletable', function (err, recordsets, returnValue, affected) {
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
    var dtoAllowanceStatusSetup = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('AllowanceStatusSetupId', sql.BigInt, query.AllowanceStatusSetupId);
            request.execute('prcAllowanceStatusSetupGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoAllowanceStatusSetup = ValidateData(recordsets[0])[0];
                        }
                        res.json(dtoAllowanceStatusSetup);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.GetAllowanceStatusSetupStandardDeduction = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('AllowanceStatusSetupId', sql.BigInt, query.AllowanceStatusSetupId);
            request.execute('prcAllowanceStatusSetupStandardDeductionGet', function (err, recordsets, returnValue, affected) {
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
exports.GetAllowanceStatusSetupPersonalAllowance = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('AllowanceStatusSetupId', sql.BigInt, query.AllowanceStatusSetupId);
            request.execute('prcAllowanceStatusSetupPersonalAllowanceGet', function (err, recordsets, returnValue, affected) {
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
exports.GetAllowanceStatusSetupDependentAllowance = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('AllowanceStatusSetupId', sql.BigInt, query.AllowanceStatusSetupId);
            request.execute('prcAllowanceStatusSetupDependentAllowanceGet', function (err, recordsets, returnValue, affected) {
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

            Import.columns.add('StandardPaySchedule', sql.NVarChar(100));
            Import.columns.add('StandardTaxStatus', sql.NVarChar(100));
            Import.columns.add('StandardAmount', sql.Decimal(18, 2));

            Import.columns.add('PersonalPaySchedule', sql.NVarChar(100));
            Import.columns.add('PersonalTaxStatus', sql.NVarChar(100));
            Import.columns.add('PersonalAmount', sql.Decimal(18, 2));

            Import.columns.add('DependentPaySchedule', sql.NVarChar(100));
            Import.columns.add('DependentAmount', sql.Decimal(18, 2));

            for (var i = 1; i < arrData.length; i++) {
                Import.rows.add(arrData[i][0], arrData[i][1], arrData[i][2], arrData[i][3], arrData[i][4], arrData[i][5], arrData[i][6], arrData[i][7], arrData[i][8], arrData[i][9]); //, arrData[i][11], arrData[i][12], arrData[i][13], arrData[i][14], arrData[i][15], arrData[i][16], '', '', ClientId, arrData[i][17]);
            }

            var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
                if (err) {
                    winston.log('error', err);
                }
                else {
                    var request = new sql.Request(connection);
                    request.input('Import', Import);
                    request.execute('prcAllowanceStatusSetupBulkSave', function (err, recordsets, returnValue, affected) {
                        connection.close();
                        if (err) {
                            winston.log('error', err);
                        }
                        else {
                            try {
                                socketio.emit('GetAllowanceStatusSetupPage');
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