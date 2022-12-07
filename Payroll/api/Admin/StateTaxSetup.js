﻿exports.GetPage = function (req, res) {
    var dtoStateTaxSetupPage = new Object();
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
            request.execute('prcStateTaxSetupGetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        dtoStateTaxSetupPage.StateTaxSetups = ValidateData(recordsets[0]);
                        dtoStateTaxSetupPage.TotalRecords = recordsets[1][0].TotalRecords;
                        res.json(dtoStateTaxSetupPage);
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

            var StateTaxSetupDetails = new sql.Table()
            StateTaxSetupDetails.columns.add('LowLimit', sql.Decimal(18, 2));
            StateTaxSetupDetails.columns.add('HighLimit', sql.Decimal(18, 2));
            StateTaxSetupDetails.columns.add('AdditionalTax', sql.Decimal(18, 2));
            StateTaxSetupDetails.columns.add('TaxRate', sql.Decimal(18, 2));
            var arrStateTaxSetupDetails = query.StateTaxSetupDetails.split(String.fromCharCode(135));
            if (arrStateTaxSetupDetails[0] == '') {
                arrStateTaxSetupDetails.splice(0, 1);
            }
            for (var i = 0; i < arrStateTaxSetupDetails.length; i++) {
                var arrStateTaxSetupDetail = arrStateTaxSetupDetails[i].split(String.fromCharCode(134));
                if (arrStateTaxSetupDetail[5] == "0") {
                    StateTaxSetupDetails.rows.add(parseFloat(arrStateTaxSetupDetail[1]), parseFloat(arrStateTaxSetupDetail[2]), parseFloat(arrStateTaxSetupDetail[3]), parseFloat(arrStateTaxSetupDetail[4]));
                }
            }

            request.input('StateTaxSetupId', sql.BigInt, query.StateTaxSetupId);
            request.input('StateId', sql.BigInt, query.StateId);
            request.input('EffectiveDate', sql.VarChar(10), query.EffectiveDate);
            request.input('PayScheduleRecurrenceId', sql.BigInt, query.PayScheduleRecurrenceId);
            request.input('TaxStatusId', sql.BigInt, query.TaxStatusId);
            request.input('StateTaxSetupDetails', StateTaxSetupDetails);
            request.execute('prcStateTaxSetupSave', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetStateTaxSetupPage');
                        if (query.StateTaxSetupId > 0) {
                            socketio.emit('GetStateTaxSetupObject', query.StateTaxSetupId);
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
            request.input('StateTaxSetupId', sql.BigInt, query.StateTaxSetupId);
            request.execute('prcStateTaxSetupDelete', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetStateTaxSetupPage');
                        socketio.emit('GetStateTaxSetupObject', query.StateTaxSetupId);
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
            request.input('StateTaxSetupId', sql.BigInt, query.StateTaxSetupId);
            request.execute('prcStateTaxSetupDeletable', function (err, recordsets, returnValue, affected) {
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
    var dtoStateTaxSetup = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('StateTaxSetupId', sql.BigInt, query.StateTaxSetupId);
            request.execute('prcStateTaxSetupGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoStateTaxSetup = ValidateData(recordsets[0])[0];
                        }
                        res.json(dtoStateTaxSetup);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.GetStateTaxSetupDetail = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('StateTaxSetupId', sql.BigInt, query.StateTaxSetupId);
            request.execute('prcStateTaxSetupDetailGet', function (err, recordsets, returnValue, affected) {
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
        arrData[i].TaxStatusId = arrData[i].TaxStatusId == null ? 0 : arrData[i].TaxStatusId;
        arrData[i].FilingStatusName = arrData[i].FilingStatusName == null ? '' : arrData[i].FilingStatusName;        
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
            Import.columns.add('TaxStatus', sql.NVarChar(100));
            Import.columns.add('LowLimit', sql.Decimal(18, 2));
            Import.columns.add('HighLimit', sql.Decimal(18, 2));
            Import.columns.add('AdditionalTax', sql.Decimal(18, 2));
            Import.columns.add('TaxRate', sql.Decimal(18, 2));

            for (var i = 1; i < arrData.length; i++) {
                Import.rows.add(arrData[i][0], arrData[i][1], arrData[i][2], arrData[i][3], arrData[i][4], arrData[i][5], arrData[i][6], arrData[i][7]); //, arrData[i][9], arrData[i][10], arrData[i][11], arrData[i][12], arrData[i][13], arrData[i][14], arrData[i][15], arrData[i][16], '', '', ClientId, arrData[i][17]);
            }

            var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
                if (err) {
                    winston.log('error', err);
                }
                else {
                    var request = new sql.Request(connection);
                    request.input('StateTaxImport', Import);
                    request.execute('prcStateTaxSetupBulkSave', function (err, recordsets, returnValue, affected) {
                        connection.close();
                        if (err) {
                            winston.log('error', err);
                        }
                        else {
                            try {
                                socketio.emit('GetStateTaxSetupPage');
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