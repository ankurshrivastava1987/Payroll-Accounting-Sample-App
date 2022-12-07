exports.GetPage = function (req, res) {
    var dtoAllowanceStatusSetup1Page = new Object();
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
            request.execute('prcAllowanceStatusSetup1GetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        dtoAllowanceStatusSetup1Page.AllowanceStatusSetup1s = ValidateData(recordsets[0]);
                        dtoAllowanceStatusSetup1Page.TotalRecords = recordsets[1][0].TotalRecords;
                        res.json(dtoAllowanceStatusSetup1Page);
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

            var AllowanceStatusSetup1Details = new sql.Table()
            AllowanceStatusSetup1Details.columns.add('PayScheduleRecurrenceId', sql.BigInt);
            AllowanceStatusSetup1Details.columns.add('OneExemption', sql.Decimal(18, 2));
            AllowanceStatusSetup1Details.columns.add('MinimumStandardDeduction', sql.Decimal(18, 2));
            AllowanceStatusSetup1Details.columns.add('MaximumStandardDeduction', sql.Decimal(18, 2));
            var arrAllowanceStatusSetup1Details = query.AllowanceStatusSetup1Details.split(String.fromCharCode(135));
            if (arrAllowanceStatusSetup1Details[0] == '') {
                arrAllowanceStatusSetup1Details.splice(0, 1);
            }
            for (var i = 0; i < arrAllowanceStatusSetup1Details.length; i++) {
                var arrAllowanceStatusSetup1Detail = arrAllowanceStatusSetup1Details[i].split(String.fromCharCode(134));               
                AllowanceStatusSetup1Details.rows.add(parseFloat(arrAllowanceStatusSetup1Detail[0]), parseFloat(arrAllowanceStatusSetup1Detail[1]), parseFloat(arrAllowanceStatusSetup1Detail[2]), parseFloat(arrAllowanceStatusSetup1Detail[3]));
               
            }

            request.input('AllowanceStatusSetupId', sql.BigInt, query.AllowanceStatusSetupId);
            request.input('StateId', sql.BigInt, query.StateId);
            request.input('AllowancePercentage', sql.Decimal(18, 2), query.AllowancePercentage);
            request.input('EffectiveDate', sql.VarChar(10), query.EffectiveDate);           
            request.input('AllowanceStatusSetup1Details', AllowanceStatusSetup1Details);
            request.execute('prcAllowanceStatusSetup1Save', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetAllowanceStatusSetup1Page');
                        if (query.AllowanceStatusSetupId > 0) {
                            socketio.emit('GetAllowanceStatusSetup1Object', query.AllowanceStatusSetupId);
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
            request.execute('prcAllowanceStatusSetup1Delete', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetAllowanceStatusSetup1Page');
                        socketio.emit('GetAllowanceStatusSetup1Object', query.AllowanceStatusSetup1Id);
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
            request.execute('prcAllowanceStatusSetup1Deletable', function (err, recordsets, returnValue, affected) {
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
    var dtoAllowanceStatusSetup1 = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('AllowanceStatusSetupId', sql.BigInt, query.AllowanceStatusSetupId);
            request.execute('prcAllowanceStatusSetup1Get', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoAllowanceStatusSetup1 = ValidateData(recordsets[0])[0];
                        }
                        res.json(dtoAllowanceStatusSetup1);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.GetAllowanceStatusSetup1Detail = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('AllowanceStatusSetupId', sql.BigInt, query.AllowanceStatusSetupId);
            request.execute('prcAllowanceStatusSetup1DetailGet', function (err, recordsets, returnValue, affected) {
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
        arrData[i].AllowancePercentage = arrData[i].AllowancePercentage == null ? 0 : arrData[i].AllowancePercentage;
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
            Import.columns.add('AllowancePercentage', sql.Decimal(18, 2));

            Import.columns.add('PaySchedule', sql.NVarChar(100));
            Import.columns.add('OneExemption', sql.Decimal(18, 2));
            Import.columns.add('MinimumStandardDeduction', sql.Decimal(18, 2));
            Import.columns.add('MaximumStandardDeduction', sql.Decimal(18, 2));
          

            for (var i = 1; i < arrData.length; i++) {
                Import.rows.add(arrData[i][0], arrData[i][1], arrData[i][2], arrData[i][3], arrData[i][4], arrData[i][5], arrData[i][6]); //, arrData[i][7], arrData[i][8], arrData[i][9]); //, arrData[i][11], arrData[i][12], arrData[i][13], arrData[i][14], arrData[i][15], arrData[i][16], '', '', ClientId, arrData[i][17]);
            }

            var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
                if (err) {
                    winston.log('error', err);
                }
                else {
                    var request = new sql.Request(connection);
                    request.input('Import', Import);
                    request.execute('prcAllowanceStatusSetup1BulkSave', function (err, recordsets, returnValue, affected) {
                        connection.close();
                        if (err) {
                            winston.log('error', err);
                        }
                        else {
                            try {
                                socketio.emit('GetAllowanceStatusSetup1Page');
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