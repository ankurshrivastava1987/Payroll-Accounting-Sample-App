exports.GetPage = function (req, res) {
    var dtoTaxSlabSetupPage = new Object();
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
            request.execute('prcTaxSlabSetupGetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        dtoTaxSlabSetupPage.TaxSlabSetups = ValidateData(recordsets[0]);
                        dtoTaxSlabSetupPage.TotalRecords = recordsets[1][0].TotalRecords;
                        res.json(dtoTaxSlabSetupPage);
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

            var TaxSlabSetupDetails = new sql.Table()
            TaxSlabSetupDetails.columns.add('LowLimit', sql.Decimal(18, 2));
            TaxSlabSetupDetails.columns.add('HighLimit', sql.Decimal(18, 2));
            TaxSlabSetupDetails.columns.add('AdditionalTax', sql.Decimal(18, 2));
            TaxSlabSetupDetails.columns.add('TaxRate', sql.Decimal(18, 2));
            var arrTaxSlabSetupDetails = query.TaxSlabSetupDetails.split(String.fromCharCode(135));
            if (arrTaxSlabSetupDetails[0] == '') {
                arrTaxSlabSetupDetails.splice(0, 1);
            }
            for (var i = 0; i < arrTaxSlabSetupDetails.length; i++) {
                var arrTaxSlabSetupDetail = arrTaxSlabSetupDetails[i].split(String.fromCharCode(134));
                if (arrTaxSlabSetupDetail[5] == "0") {
                    TaxSlabSetupDetails.rows.add(parseFloat(arrTaxSlabSetupDetail[1]), parseFloat(arrTaxSlabSetupDetail[2]), parseFloat(arrTaxSlabSetupDetail[3]), parseFloat(arrTaxSlabSetupDetail[4]));
                }
            }

            request.input('TaxSlabSetupId', sql.BigInt, query.TaxSlabSetupId);
            request.input('StateId', sql.BigInt, query.StateId);
            request.input('EffectiveDate', sql.VarChar(10), query.EffectiveDate);
            request.input('TaxSlabSetupDetails', TaxSlabSetupDetails);
            request.execute('prcTaxSlabSetupSave', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetTaxSlabSetupPage');
                        if (query.TaxSlabSetupId > 0) {
                            socketio.emit('GetTaxSlabSetupObject', query.TaxSlabSetupId);
                        }
                        res.json(err ? 0 : recordsets[0][0].TaxSlabSetupId);

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
            request.input('TaxSlabSetupId', sql.BigInt, query.TaxSlabSetupId);
            request.execute('prcTaxSlabSetupDelete', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetTaxSlabSetupPage');
                        socketio.emit('GetTaxSlabSetupObject', query.TaxSlabSetupId);
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
            request.input('TaxSlabSetupId', sql.BigInt, query.TaxSlabSetupId);
            request.execute('prcTaxSlabSetupDeletable', function (err, recordsets, returnValue, affected) {
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
    var dtoTaxSlabSetup = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('TaxSlabSetupId', sql.BigInt, query.TaxSlabSetupId);
            request.execute('prcTaxSlabSetupGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoTaxSlabSetup = ValidateData(recordsets[0])[0];
                        }
                        res.json(dtoTaxSlabSetup);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.GetTaxSlabSetupDetail = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('TaxSlabSetupId', sql.BigInt, query.TaxSlabSetupId);
            request.execute('prcTaxSlabSetupDetailGet', function (err, recordsets, returnValue, affected) {
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
            Import.columns.add('LowLimit', sql.Decimal(18, 2));
            Import.columns.add('HighLimit', sql.Decimal(18, 2));
            Import.columns.add('AdditionalTax', sql.Decimal(18, 2));
            Import.columns.add('TaxRate', sql.Decimal(18, 2));

            for (var i = 1; i < arrData.length; i++) {
                Import.rows.add(arrData[i][0], arrData[i][1], arrData[i][2], arrData[i][3], arrData[i][4], arrData[i][5]); //, arrData[i][6], arrData[i][7]); //, arrData[i][9], arrData[i][10], arrData[i][11], arrData[i][12], arrData[i][13], arrData[i][14], arrData[i][15], arrData[i][16], '', '', ClientId, arrData[i][17]);
            }

            var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
                if (err) {
                    winston.log('error', err);
                }
                else {
                    var request = new sql.Request(connection);
                    request.input('Import', Import);
                    request.execute('prcTaxSlabSetupBulkSave', function (err, recordsets, returnValue, affected) {
                        connection.close();
                        if (err) {
                            winston.log('error', err);
                        }
                        else {
                            try {
                                socketio.emit('GetTaxSlabSetupPage');
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