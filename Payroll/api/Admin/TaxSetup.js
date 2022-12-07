exports.GetPage = function (req, res) {
    var dtoTaxSetupPage = new Object();
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
            request.execute('prcTaxSetupGetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        dtoTaxSetupPage.TaxSetups = ValidateData(recordsets[0]);
                        dtoTaxSetupPage.TotalRecords = recordsets[1][0].TotalRecords;
                        res.json(dtoTaxSetupPage);
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
            request.input('TaxSetupId', sql.BigInt, query.TaxSetupId);
            request.input('EffectiveDate', sql.VarChar(10), query.EffectiveDate);
            request.input('SocialSecurityTaxEmployer', sql.Decimal(18, 2), query.SocialSecurityTaxEmployer);
            request.input('SocialSecurityTaxEmployee', sql.Decimal(18, 2), query.SocialSecurityTaxEmployee);
            request.input('MedicareTaxEmployer', sql.Decimal(18, 2), query.MedicareTaxEmployer);
            request.input('MedicareTaxEmployee', sql.Decimal(18, 2), query.MedicareTaxEmployee);
            request.input('FUTATax', sql.Decimal(18, 2), query.FUTATax);
            request.input('FUTATaxCreditReduction', sql.Decimal(18, 2), query.FUTATaxCreditReduction);
            request.execute('prcTaxSetupSave', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetTaxSetupPage');
                        if (query.TaxSetupId > 0) {
                            socketio.emit('GetTaxSetupObject', query.TaxSetupId);
                        }
                        res.json(err ? 0 : recordsets[0][0].TaxSetupId);
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
            request.input('TaxSetupId', sql.BigInt, query.TaxSetupId);
            request.execute('prcTaxSetupDelete', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetTaxSetupPage');
                        socketio.emit('GetTaxSetupObject', query.TaxSetupId);
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
            request.input('TaxSetupId', sql.BigInt, query.TaxSetupId);
            request.execute('prcTaxSetupDeletable', function (err, recordsets, returnValue, affected) {
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
    var dtoTaxSetup = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('TaxSetupId', sql.BigInt, query.TaxSetupId);
            request.execute('prcTaxSetupGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoTaxSetup = ValidateData(recordsets[0])[0];
                        }
                        res.json(dtoTaxSetup);
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
        arrData[i].SocialSecurityTaxEmployer = arrData[i].SocialSecurityTaxEmployer == null ? 0 : arrData[i].SocialSecurityTaxEmployer;
        arrData[i].SocialSecurityTaxEmployee = arrData[i].SocialSecurityTaxEmployee == null ? 0 : arrData[i].SocialSecurityTaxEmployee;
        arrData[i].MedicareTaxEmployer = arrData[i].MedicareTaxEmployer == null ? 0 : arrData[i].MedicareTaxEmployer;
        arrData[i].MedicareTaxEmployee = arrData[i].MedicareTaxEmployee == null ? 0 : arrData[i].MedicareTaxEmployee;
        arrData[i].FUTATax = arrData[i].FUTATax == null ? 0 : arrData[i].FUTATax;
        arrData[i].FUTATaxCreditReduction = arrData[i].FUTATaxCreditReduction == null ? 0 : arrData[i].FUTATaxCreditReduction;
    }
    return arrData;
}