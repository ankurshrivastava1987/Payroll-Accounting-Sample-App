exports.GetPage = function (req, res) {
    var dtoFederalTaxSetupPage = new Object();
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
            request.execute('prcFederalTaxSetupGetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        dtoFederalTaxSetupPage.FederalTaxSetups = ValidateData(recordsets[0]);
                        dtoFederalTaxSetupPage.TotalRecords = recordsets[1][0].TotalRecords;
                        res.json(dtoFederalTaxSetupPage);
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

            var FederalTaxSetupDetails = new sql.Table()
            FederalTaxSetupDetails.columns.add('LowLimit', sql.Decimal(18, 2));
            FederalTaxSetupDetails.columns.add('HighLimit', sql.Decimal(18, 2));
            FederalTaxSetupDetails.columns.add('AdditionalTax', sql.Decimal(18, 2));
            FederalTaxSetupDetails.columns.add('TaxRate', sql.Decimal(18, 2));
            var arrFederalTaxSetupDetails = query.FederalTaxSetupDetails.split(String.fromCharCode(135));
            if (arrFederalTaxSetupDetails[0] == '') {
                arrFederalTaxSetupDetails.splice(0, 1);
            }
            for (var i = 0; i < arrFederalTaxSetupDetails.length; i++) {
                var arrFederalTaxSetupDetail = arrFederalTaxSetupDetails[i].split(String.fromCharCode(134));
                if (arrFederalTaxSetupDetail[5] == "0") {
                    FederalTaxSetupDetails.rows.add(parseFloat(arrFederalTaxSetupDetail[1]), parseFloat(arrFederalTaxSetupDetail[2]), parseFloat(arrFederalTaxSetupDetail[3]), parseFloat(arrFederalTaxSetupDetail[4]));
                }
            }          

            request.input('FederalTaxSetupId', sql.BigInt, query.FederalTaxSetupId);
            request.input('EffectiveDate', sql.VarChar(10), query.EffectiveDate);
            request.input('FederalFilingStatusId', sql.BigInt, query.FederalFilingStatusId);
            request.input('PayScheduleRecurrenceId', sql.BigInt, query.PayScheduleRecurrenceId);
            request.input('Allowance', sql.Decimal(18, 2), query.Allowance);
            request.input('FederalTaxSetupDetails', FederalTaxSetupDetails);           
            request.execute('prcFederalTaxSetupSave', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetFederalTaxSetupPage');
                        if (query.FederalTaxSetupId > 0) {
                            socketio.emit('GetFederalTaxSetupObject', query.FederalTaxSetupId);
                        }
                        res.json(err ? 0 : recordsets[0][0].FederalTaxSetupId);

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
            request.input('FederalTaxSetupId', sql.BigInt, query.FederalTaxSetupId);
            request.execute('prcFederalTaxSetupDelete', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetFederalTaxSetupPage');
                        socketio.emit('GetFederalTaxSetupObject', query.FederalTaxSetupId);
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
            request.input('FederalTaxSetupId', sql.BigInt, query.FederalTaxSetupId);
            request.execute('prcFederalTaxSetupDeletable', function (err, recordsets, returnValue, affected) {
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
    var dtoFederalTaxSetup = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('FederalTaxSetupId', sql.BigInt, query.FederalTaxSetupId);
            request.execute('prcFederalTaxSetupGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoFederalTaxSetup = ValidateData(recordsets[0])[0];
                        }
                        res.json(dtoFederalTaxSetup);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.GetFederalTaxSetupDetail = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('FederalTaxSetupId', sql.BigInt, query.FederalTaxSetupId);
            request.execute('prcFederalTaxSetupDetailGet', function (err, recordsets, returnValue, affected) {
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
        arrData[i].EffectiveDate = arrData[i].EffectiveDate == null ? new Date('1900-01-01') : arrData[i].EffectiveDate;
        arrData[i].FederalFilingStatusId = arrData[i].FederalFilingStatusId == null ? 0 : arrData[i].FederalFilingStatusId;
        arrData[i].FederalFilingStatusName = arrData[i].FederalFilingStatusName == null ? '' : arrData[i].FederalFilingStatusName;
        arrData[i].PayScheduleRecurrenceId = arrData[i].PayScheduleRecurrenceId == null ? 0 : arrData[i].PayScheduleRecurrenceId;
        arrData[i].PayScheduleRecurrenceName = arrData[i].PayScheduleRecurrenceName == null ? '' : arrData[i].PayScheduleRecurrenceName;
        arrData[i].Allowance = arrData[i].Allowance == null ? 0 : arrData[i].Allowance;
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

            var FederalTaxSetupImport = new sql.Table();
            //FederalTaxSetup.columns.add('FederalTaxSetupId', sql.BigInt);
            FederalTaxSetupImport.columns.add('EffectiveDate', sql.NVarChar(10));
            FederalTaxSetupImport.columns.add('FederalFilingStatus', sql.NVarChar(100));
            FederalTaxSetupImport.columns.add('PayScheduleRecurrence', sql.NVarChar(100));
            FederalTaxSetupImport.columns.add('Allowance', sql.Decimal(18,2));
            FederalTaxSetupImport.columns.add('LowLimit', sql.Decimal(18, 2));
            FederalTaxSetupImport.columns.add('HighLimit', sql.Decimal(18, 2));
            FederalTaxSetupImport.columns.add('AdditionalTax', sql.Decimal(18, 2));
            FederalTaxSetupImport.columns.add('TaxRate', sql.Decimal(18, 2));

            for (var i = 1; i < arrData.length; i++) {
                FederalTaxSetupImport.rows.add(arrData[i][0], arrData[i][1], arrData[i][2], arrData[i][3], arrData[i][4], arrData[i][5], arrData[i][6], arrData[i][7]); //, arrData[i][9], arrData[i][10], arrData[i][11], arrData[i][12], arrData[i][13], arrData[i][14], arrData[i][15], arrData[i][16], '', '', ClientId, arrData[i][17]);
            }

            var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
                if (err) {
                    winston.log('error', err);
                }
                else {
                    var request = new sql.Request(connection);
                    request.input('FederalTaxSetupImport', FederalTaxSetupImport);
                    request.execute('prcFederalTaxSetupBulkSave', function (err, recordsets, returnValue, affected) {
                        connection.close();
                        if (err) {
                            winston.log('error', err);
                        }
                        else {
                            try {
                                socketio.emit('GetFederalTaxSetupPage');
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