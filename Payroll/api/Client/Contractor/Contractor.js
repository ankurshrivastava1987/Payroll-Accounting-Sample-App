exports.GetPage = function (req, res) {
    var dtoContractorPage = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else { 
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('StartIndex', sql.Int, query.StartIndex);
            request.input('PageSize', sql.Int, query.PageSize);
            request.input('SortField', sql.VarChar(50), query.SortField);
            request.input('SortDirection', sql.VarChar(4), query.SortDirection);
            request.input('FilterText', sql.VarChar(50), query.FilterText);
            request.execute('prcContractorGetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        dtoContractorPage.Contractors = ValidateData(recordsets[0]);
                        dtoContractorPage.TotalRecords = recordsets[1][0].TotalRecords;
                        res.json(dtoContractorPage);
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

            var Compensations = new sql.Table()
            Compensations.columns.add('CompensationId', sql.BigInt);
            Compensations.columns.add('ContractorId', sql.BigInt);
            Compensations.columns.add('StartDate', sql.VarChar(10));
            Compensations.columns.add('PayRate', sql.Decimal(18, 2));
           
            var arrCompensations = query.Compensations.split(String.fromCharCode(135));
            if (arrCompensations[0] == '') {
                arrCompensations.splice(0, 1);
            }
            for (var i = 0; i < arrCompensations.length; i++) {
                var arrCompensation = arrCompensations[i].split(String.fromCharCode(134));
                if (arrCompensation[4] == "0") {
                    Compensations.rows.add(arrCompensation[1], arrCompensation[2], arrCompensation[3].replace('$', '').replace(',', ''));
                }
            }

            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ContractorId', sql.BigInt, query.ContractorId);
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('Type', sql.VarChar(50), query.Type);
            request.input('FederalEIN', sql.VarChar(50), query.FederalEIN);
            request.input('Line1', sql.VarChar(500), query.Line1);
            request.input('Line2', sql.VarChar(50), query.Line2);
            request.input('Address1', sql.VarChar(50), query.Address1);
            request.input('Address2', sql.VarChar(50), query.Address2);           
            request.input('CityName', sql.VarChar(50), query.CityName);
            request.input('StateId', sql.BigInt, query.StateId);
            request.input('ZipCode', sql.VarChar(50), query.ZipCode);
            request.input('ZipCodeExt', sql.VarChar(50), query.ZipCodeExt);
            request.input('Email', sql.VarChar(250), query.Email);
            request.input('Status', sql.VarChar(10), query.Status);
            request.input('PaymentMethod', sql.VarChar(50), query.PaymentMethod);
            request.input('AlreadyPaid', sql.Bit, query.AlreadyPaid);
            request.input('Compensations', Compensations);
            
            request.execute('prcContractorSave', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetContractorPage');
                        if (query.ContractorId > 0) {
                            socketio.emit('GetContractorObject', query.ContractorId);
                        }
                        res.json(err ? 0 : recordsets[0][0].ContractorId);
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
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('ContractorId', sql.BigInt, query.ContractorId);
            request.execute('prcContractorDelete', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetContractorPage');
                        socketio.emit('GetContractorObject', query.ContractorId);
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
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('ContractorId', sql.BigInt, query.ContractorId);
            request.execute('prcContractorDeletable', function (err, recordsets, returnValue, affected) {
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
    var dtoContractor = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('ContractorId', sql.BigInt, query.ContractorId);
            request.execute('prcContractorGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoContractor = ValidateData(recordsets[0])[0];
                        }
                        res.json(dtoContractor);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};

exports.Exists = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('ContractorId', sql.BigInt, query.ContractorId);
            request.input('FederalEIN', sql.VarChar(50), query.FederalEIN);
            request.execute('prcContractorExist', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        res.json(returnValue == 1 ? true : false);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};

exports.GetLookup = function (req, res) {
    var dtoContractor = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.execute('prcContractorGetLookup', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        res.json(ValidateData1(recordsets[0]));
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
}

exports.GetCount = function (req, res) {
    var dtoContractor = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);            
            request.execute('prcContractorGetCount', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {                       
                        res.json(recordsets[0][0].Count);
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
        arrData[i].ContractorId = arrData[i].ContractorId == null ? 0 : arrData[i].ContractorId;
        arrData[i].Type = arrData[i].Type == null ? '' : arrData[i].Type;
        arrData[i].Address1 = arrData[i].Address1 == null ? '' : arrData[i].Address1;
        arrData[i].Address2 = arrData[i].Address2 == null ? '' : arrData[i].Address2;       
        arrData[i].Line1 = arrData[i].Line1 == null ? '' : arrData[i].Line1;
        arrData[i].Line2 = arrData[i].Line2 == null ? '' : arrData[i].Line2;
        arrData[i].City = arrData[i].City == null ? '' : arrData[i].City;
        arrData[i].StateId = arrData[i].StateId == null ? 0 : arrData[i].StateId;
        arrData[i].StateCode = arrData[i].StateCode == null ? '' : arrData[i].StateCode; 
        arrData[i].StateName = arrData[i].StateName == null ? '' : arrData[i].StateName;
        arrData[i].ZipCode = arrData[i].ZipCode == null ? '' : arrData[i].ZipCode;
        arrData[i].ZipCodeExt = arrData[i].ZipCodeExt == null ? '' : arrData[i].ZipCodeExt;
        arrData[i].FederalEIN = arrData[i].FederalEIN == null ? '' : arrData[i].FederalEIN;
        arrData[i].PaymentMethod = arrData[i].PaymentMethod == null ? '' : arrData[i].PaymentMethod;
        arrData[i].AlreadyPaid = arrData[i].AlreadyPaid == null ? '' : arrData[i].AlreadyPaid;
        arrData[i].FederalEIN = arrData[i].FederalEIN == null ? '' : arrData[i].FederalEIN;
    }
    return arrData;
}

function ValidateData1(arrData) {
    for (i = 0; i < arrData.length; i++) {
        arrData[i].ContractorId = arrData[i].ContractorId == null ? 0 : arrData[i].ContractorId;
        arrData[i].Line1 = arrData[i].Line1 == null ? '' : arrData[i].Line1;
        arrData[i].LastPayDate = arrData[i].LastPayDate == null ? new Date('1900-01-01') : arrData[i].LastPayDate;
        arrData[i].Approved = arrData[i].Approved == null ? false : arrData[i].Approved;       
    }
    return arrData;
}