exports.GetPage = function (req, res) { 
    var dtoClientPage = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('StartIndex', sql.Int, query.StartIndex);
            request.input('PageSize', sql.Int, query.PageSize);
            request.input('SortField', sql.VarChar(50), query.SortField);
            request.input('SortDirection', sql.VarChar(4), query.SortDirection);
            request.input('Status', sql.VarChar(10), query.Status);
            request.input('FilterText', sql.VarChar(50), query.FilterText);
            request.execute('prcClientGetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        dtoClientPage.Clients = ValidateData(recordsets[0]);
                        dtoClientPage.TotalRecords = recordsets[1][0].TotalRecords;
                        res.json(dtoClientPage);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
    //var stripe = require('stripe')(Configuration.StripeKey);
    //stripe.customers.createSource('cus_B9sJAsM4omnMee', {
    //        source: {
    //            object: 'card',
    //            exp_month: 10,
    //            exp_year: 2018,
    //            number: '4242 4242 4242 4242',
    //            cvc: 100
    //        }
   
    //}).then(function (source) {
    //    return stripe.charges.create({
    //        amount: 1985,
    //        currency: 'usd',
    //        customer: source.customer
    //    });
    //}).then(function (charge) {
    //   var s = '' // New charge created on a new customer 
    //}).catch(function (err) {
    //    var s = '' // Deal with an error 
    //});


    //var stripe = require('stripe')(Configuration.StripeKey);
    //stripe.customers.retrieve(
    //    "cus_B7KYquhXbORU6s",
    //    function (err, customer) {
    //        var s = '';  // asynchronously called
    //    }
    //);


    //stripe.customers.create({
    //    email: 'info@takasoft.net'
    //}).then(function (customer) {
    //    return stripe.customers.createSource(customer.id, {
    //        source: {
    //            object: 'card',
    //            exp_month: 10,
    //            exp_year: 2018,
    //            number: '4242 4242 4242 4242',
    //            cvc: 100
    //        }
    //    });
    //}).then(function (source) {
    //    return stripe.charges.create({
    //        amount: 985,
    //        currency: 'usd',
    //        customer: source.customer
    //    });
    //}).then(function (charge) {
    //   var s = '' // New charge created on a new customer 
    //}).catch(function (err) {
    //    var s = '' // Deal with an error 
    //});
};

exports.Save = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;            
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('ClientType', sql.BigInt, query.ClientType);
            request.input('FullName', sql.VarChar(100), query.FullName);
            request.input('Address1', sql.VarChar(50), query.Address1);
            request.input('Address2', sql.VarChar(50), query.Address2);           
            request.input('CityName', sql.VarChar(50), query.CityName);
            request.input('StateId', sql.BigInt, query.StateId);
            request.input('ZipCode', sql.VarChar(5), query.ZipCode);
            request.input('ZipCodeExt', sql.VarChar(4), query.ZipCodeExt);
            request.input('IndustryId', sql.BigInt, query.IndustryId);
            request.input('ContactName', sql.VarChar(100), query.ContactName);
            request.input('JobTitleName', sql.VarChar(50), query.JobTitleName);
            request.input('WorkPhoneNo', sql.VarChar(14), query.WorkPhoneNo);
            request.input('WorkPhoneNoExt', sql.VarChar(12), query.WorkPhoneNoExt);
            request.input('CellPhoneNo', sql.VarChar(14), query.CellPhoneNo);
            request.input('FaxNo', sql.VarChar(12), query.FaxNo);
            request.input('EMailId', sql.VarChar(250), query.EMailId);
            request.input('LoginId', sql.VarChar(20), query.LoginId);
            request.input('Password', sql.VarChar(50), query.Password);
            request.input('Status', sql.VarChar(10), query.Status);            
            request.input('ActivationCode', sql.VarChar(100), query.ActivationCode);
            request.input('StripeId', sql.VarChar(50), query.StripeId);
            request.input('EmployeeRange', sql.Int, query.EmployeeRange);
            request.input('ServiceType', sql.Int, query.ServiceType);
            request.input('AccessLevel', sql.Int, query.AccessLevel);
            request.input('DirectDeposit', sql.VarChar(1), query.DirectDeposit);
            request.input('PaidEmployee', sql.VarChar(1), query.PaidEmployee);
            request.input('PaidVacation', sql.VarChar(1), query.PaidVacation);
            request.input('MoreThanOneLocation', sql.VarChar(1), query.MoreThanOneLocation);
            request.input('PayContractor', sql.VarChar(1), query.PayContractor);
            request.input('PayEmployee', sql.VarChar(1), query.PayEmployee);
            request.input('CompanyType', sql.Int, query.CompanyType);
            request.input('FilingName', sql.VarChar(100), query.FilingName);
            request.input('FilingAddress1', sql.VarChar(50), query.FilingAddress1);
            request.input('FilingAddress2', sql.VarChar(50), query.FilingAddress2);            
            request.input('FilingCityName', sql.VarChar(50), query.FilingCityName);
            request.input('FilingStateId', sql.BigInt, query.FilingStateId);
            request.input('FilingZipCode', sql.VarChar(5), query.FilingZipCode);
            request.input('FilingZipCodeExt', sql.VarChar(4), query.FilingZipCodeExt);
            request.input('EIN', sql.VarChar(20), query.EIN);
            request.input('DepositSchedule', sql.Int, query.DepositSchedule);
            request.execute('prcClientSave', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetClientClientPage');
                        if (query.ClientId > 0) {
                            socketio.emit('GetClientClientObject', query.ClientId);
                        }
                        res.json(err ? 0 : recordsets[0][0].ClientId);
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
            request.execute('prcClientDelete', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetClientClientPage');
                        socketio.emit('GetClientClientObject', query.ClientId);
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
            request.execute('prcClientClientDeletable', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        res.json(recordsets[0].length > 0? false: true);
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
    var dtoClient = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.execute('prcClientGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoClient = ValidateData(recordsets[0])[0];
                        }
                        res.json(dtoClient);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.GetObject1 = function (req, res) {
    var dtoClient = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, 0);
            request.input('ClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.execute('prcClientGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoClient = ValidateData(recordsets[0])[0];
                        }
                        res.json(dtoClient);
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
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('LoginId', sql.VarChar(20), query.LoginId);
            request.execute('prcClientExist', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        res.json(returnValue == 1?true:false);
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.Exists1 = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('EMailId', sql.VarChar(250), query.EMailId);
            request.execute('prcClientExist1', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        res.json(returnValue == 1?true:false);
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
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.execute('prcClientGetLookup', function (err, recordsets, returnValue, affected) {
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


exports.ValidatePassword = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('Password', sql.NVarChar(20), query.Password);
            request.execute('prcClientValidatePassword', function (err, recordsets, returnValue, affected) {
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

function ValidateData(arrData) {
    for (i = 0; i < arrData.length; i++) {
        arrData[i].ClientType = arrData[i].ClientType == null? 0: arrData[i].ClientType;
        arrData[i].FullName = arrData[i].FullName == null? '': arrData[i].FullName;
        arrData[i].Address1 = arrData[i].Address1 == null? '': arrData[i].Address1;
        arrData[i].Address2 = arrData[i].Address2 == null? '': arrData[i].Address2;        
        arrData[i].CityName = arrData[i].CityName == null? '': arrData[i].CityName;
        arrData[i].StateId = arrData[i].StateId == null? 0: arrData[i].StateId;
        arrData[i].StateCode = arrData[i].StateCode == null? '': arrData[i].StateCode;
        arrData[i].StateName = arrData[i].StateName == null? '': arrData[i].StateName;
        arrData[i].ZipCode = arrData[i].ZipCode == null? '': arrData[i].ZipCode;
        arrData[i].ZipCodeExt = arrData[i].ZipCodeExt == null? '': arrData[i].ZipCodeExt;
        arrData[i].IndustryId = arrData[i].IndustryId == null? 0: arrData[i].IndustryId;
        arrData[i].ContactName = arrData[i].ContactName == null? '': arrData[i].ContactName;
        arrData[i].JobTitleName = arrData[i].JobTitleName == null? '': arrData[i].JobTitleName;
        arrData[i].WorkPhoneNo = arrData[i].WorkPhoneNo == null? '': arrData[i].WorkPhoneNo;
        arrData[i].WorkPhoneNoExt = arrData[i].WorkPhoneNoExt == null? '': arrData[i].WorkPhoneNoExt;
        arrData[i].CellPhoneNo = arrData[i].CellPhoneNo == null? '': arrData[i].CellPhoneNo;
        arrData[i].EMailId = arrData[i].EMailId == null? '': arrData[i].EMailId;
        arrData[i].LoginId = arrData[i].LoginId == null? '': arrData[i].LoginId;
        arrData[i].Password = arrData[i].Password == null? '': arrData[i].Password;
        arrData[i].Status = arrData[i].Status == null? 'Inactive': arrData[i].Status;
        arrData[i].ParentClientId = arrData[i].ParentClientId == null ? 0 : arrData[i].ParentClientId; 
        arrData[i].ActivationCode = arrData[i].ActivationCode == null ? '' : arrData[i].ActivationCode; 
        arrData[i].StripeId = arrData[i].StripeId == null ? '' : arrData[i].StripeId;       
        arrData[i].CreatedDate = arrData[i].CreatedDate == null ? new Date('1900-01-01') : arrData[i].CreatedDate;
        arrData[i].PaymentDueDate1 = arrData[i].PaymentDueDate1 == null ? new Date('1900-01-01') : arrData[i].PaymentDueDate1;
        arrData[i].PaymentDueDate2 = arrData[i].PaymentDueDate2 == null ? new Date('1900-01-01') : arrData[i].PaymentDueDate2;
        arrData[i].EmployeeRange = arrData[i].EmployeeRange == null ? 0 : arrData[i].EmployeeRange;
        arrData[i].ServiceType = arrData[i].ServiceType == null ? 0 : arrData[i].ServiceType;
        arrData[i].AccessLevel = arrData[i].AccessLevel == null ? 0 : arrData[i].AccessLevel;
        arrData[i].DirectDeposit = arrData[i].DirectDeposit == null ? '' : arrData[i].DirectDeposit;
        arrData[i].PaidEmployee = arrData[i].PaidEmployee == null ? '' : arrData[i].PaidEmployee;
        arrData[i].PaidVacation = arrData[i].PaidVacation == null ? '' : arrData[i].PaidVacation;
        arrData[i].MoreThanOneLocation = arrData[i].MoreThanOneLocation == null ? '' : arrData[i].MoreThanOneLocation;
        arrData[i].PayContractor = arrData[i].PayContractor == null ? '' : arrData[i].PayContractor; 
        arrData[i].PayEmployee = arrData[i].PayEmployee == null ? '' : arrData[i].PayEmployee; 
        arrData[i].CompanyType = arrData[i].CompanyType == null ? 0 : arrData[i].CompanyType;
        arrData[i].FilingName = arrData[i].FilingName == null ? '' : arrData[i].FilingName;
        arrData[i].FilingAddress1 = arrData[i].FilingAddress1 == null ? '' : arrData[i].FilingAddress1;
        arrData[i].FilingAddress2 = arrData[i].FilingAddress2 == null ? '' : arrData[i].FilingAddress2;        
        arrData[i].FilingCityName = arrData[i].FilingCityName == null ? '' : arrData[i].FilingCityName;
        arrData[i].FilingStateId = arrData[i].FilingStateId == null ? 0 : arrData[i].FilingStateId;
        arrData[i].FilingStateCode = arrData[i].FilingStateCode == null ? '' : arrData[i].FilingStateCode;
        arrData[i].FilingStateName = arrData[i].FilingStateName == null ? '' : arrData[i].FilingStateName;
        arrData[i].FilingZipCode = arrData[i].FilingZipCode == null ? '' : arrData[i].FilingZipCode;
        arrData[i].FilingZipCodeExt = arrData[i].FilingZipCodeExt == null ? '' : arrData[i].FilingZipCodeExt;
        arrData[i].EIN = arrData[i].EIN == null ? '' : arrData[i].EIN;
        arrData[i].DepositSchedule = arrData[i].DepositSchedule == null ? 0 : arrData[i].DepositSchedule;
        arrData[i].DepositScheduleName = arrData[i].DepositScheduleName == null ? '' : arrData[i].DepositScheduleName;
    }
    return arrData;
}


exports.DownloadFile = function (req, res, next) {
    var file = req.params.file
    var path = './templates/' + file;
    res.download(path);    
};

var UploadFileName = '';
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/../../tmp');
    },
    filename: function (req, file, callback) {        
        UploadFileName = file.originalname;
        callback(null, file.originalname);
    }
});
var upload = multer({ storage : storage }).single('fileUpload');

exports.UploadFile = function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            winston.log('error', err);
            return res.end("Error uploading file.");
        }
        var excel = require('excel');
        excel(__dirname + '/../../tmp/' + UploadFileName, function (err, arrData) {
            if (err) { winston.log('error', err); };
            var clients = new sql.Table()
            clients.columns.add('ClientType', sql.BigInt);
            clients.columns.add('FullName', sql.NVarChar(100));
            clients.columns.add('Address1', sql.NVarChar(50));
            clients.columns.add('Address2', sql.NVarChar(50));           
            clients.columns.add('CityName', sql.NVarChar(50));
            clients.columns.add('StateCode', sql.NVarChar(10));
            clients.columns.add('ZipCode', sql.NVarChar(5));
            clients.columns.add('ZipCodeExt', sql.NVarChar(4));
            clients.columns.add('IndustryName', sql.NVarChar(50));
            clients.columns.add('ContactName', sql.NVarChar(100));
            clients.columns.add('JobTitleName', sql.NVarChar(50));
            clients.columns.add('WorkPhoneNo', sql.NVarChar(12));
            clients.columns.add('WorkPhoneNoExt', sql.NVarChar(12));
            clients.columns.add('CellPhoneNo', sql.NVarChar(12));
            clients.columns.add('FaxNo', sql.NVarChar(12));
            clients.columns.add('EMailId', sql.NVarChar(250));
            clients.columns.add('LoginId', sql.NVarChar(20));
            clients.columns.add('Password', sql.NVarChar(50));
            clients.columns.add('ParentClientId', sql.BigInt);
            clients.columns.add('Status', sql.NVarChar(10));
            
            for (var i = 1; i < arrData.length; i++) {
                var ClientType;
                if (arrData[i][0].toLowerCase() == 'accountant') {
                    ClientType = 1;
                }
                else if (arrData[i][0].toLowerCase() == 'business') {
                    ClientType = 2;
                }
                else {
                    ClientType = 3;
                }
                clients.rows.add(ClientType, arrData[i][1], arrData[i][2], arrData[i][3], arrData[i][4], arrData[i][5], arrData[i][6], arrData[i][7], arrData[i][8], arrData[i][9], arrData[i][10], arrData[i][11], arrData[i][12], arrData[i][13], arrData[i][14], arrData[i][15], arrData[i][16], '', '', parseInt(req.headers['x-key'], 10), arrData[i][17]);                
            }
            
            var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
                if (err) {
                    winston.log('error', err);
                }
                else {
                    var request = new sql.Request(connection);
                    request.input('Clients', clients);
                    request.execute('prcClientBulkSave', function (err, recordsets, returnValue, affected) {
                        connection.close();
                        if (err) {
                            winston.log('error', err);
                        }
                        else {
                            try {
                                socketio.emit('GetClientClientPage');
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