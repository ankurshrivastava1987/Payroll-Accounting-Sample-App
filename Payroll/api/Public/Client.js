var jwt = require('jwt-simple');
var Helper = require('../../routes/Helper');
exports.Save = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            require('crypto').randomBytes(48, function (err, buffer) {
                var ActivationCode = buffer.toString('hex');
                var request = new sql.Request(connection);
                var query = req.body;
                var stripe = require('stripe')(Configuration.StripeKey);
                stripe.customers.create({
                    email: query.EMailId
                }).then(function (customer) {
                    request.input('ClientId', 0);
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
                    request.input('ParentClientId', sql.BigInt, query.ParentClientId);
                    request.input('ActivationCode', sql.VarChar(100), ActivationCode);
                    request.input('StripeId', sql.VarChar(100), customer.id);
                    request.input('EmployeeRange', sql.Int, 0);
                    request.input('ServiceType', sql.Int, 0);
                    request.input('AccessLevel', sql.Int, 0);
                    request.input('DirectDeposit', sql.VarChar(1), '');
                    request.input('PaidEmployee', sql.VarChar(1), '');
                    request.input('PaidVacation', sql.VarChar(1), '');
                    request.input('MoreThanOneLocation', sql.VarChar(1), '');
                    request.input('PayContractor', sql.VarChar(1), '');
                    request.input('PayEmployee', sql.VarChar(1), '');
                    request.input('CompanyType', sql.Int, 0);
                    request.input('FilingName', sql.VarChar(100), '');
                    request.input('FilingAddress1', sql.VarChar(50), '');
                    request.input('FilingAddress2', sql.VarChar(50), '');                   
                    request.input('FilingCityName', sql.VarChar(50), '');
                    request.input('FilingStateId', sql.BigInt, 0);
                    request.input('FilingZipCode', sql.VarChar(5), '');
                    request.input('FilingZipCodeExt', sql.VarChar(4), '');
                    request.input('EIN', sql.VarChar(20), '');
                    request.input('DepositSchedule', sql.Int, 0);
                    request.execute('prcClientSave', function (err, recordsets, returnValue, affected) {
                        connection.close();
                        if (err) {
                            winston.log('error', err);
                        }
                        else {
                            try {
                                var MessageBody;
                                var fs = require('fs');
                                var filename = './templates/AccountActivation.html';
                                fs.readFile(filename, 'utf8', function (err, data) {
                                    if (err) {
                                        winston.log('error', err);
                                    };
                                    MessageBody = data;
                                    MessageBody = MessageBody.replace('@UserName', query.FullName);
                                    var ActivationLink = Configuration.APIUrl + '/Payroll.Services/Public/Client/ActivateAccount?ActivationCode=' + ActivationCode;
                                    MessageBody = MessageBody.replace('@ActivationLink', '<a href="' + ActivationLink + '">' + ActivationLink + '</a>');
                                    try {
                                        Helper.SendMail(Configuration.SMTPHost, Configuration.SMTPPort, Configuration.SMTPUserName, Configuration.SMTPPassword, Configuration.SMTPSecure, Configuration.SMTPFrom, query.EMailId, "Payroll Account Activation", MessageBody);
                                    }
                                    catch (err) {
                                        winston.log('error', err);
                                    }
                                    socketio.emit('GetClientPage');
                                    res.json(err ? 0 : recordsets[0][0].ClientId);
                                });
                            }
                            catch (err) {
                                winston.log('error', err);
                            }
                        }
                    })
                });
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
exports.ActivateAccount = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.query;
            request.input('ActivationCode', sql.VarChar(100), query.ActivationCode);
            request.execute('prcClientActivate', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        res.redirect('/Thank-You-Activation')                        
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.ForgotPassword = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            if (query.LoginId != '') {
                require('crypto').randomBytes(48, function (err, buffer) {
                    var ActivationCode = buffer.toString('hex');
                    request.input('LoginId', sql.NVarChar(20), query.LoginId);
                    request.execute('prcClientGetByLoginId', function (err, recordsets, returnValue, affected) {
                        connection.close();
                        if (err) {
                            winston.log('error', err);
                        }
                        else {
                            try {
                                UpdateActivationCode(recordsets[0][0].ClientId, ActivationCode);
                                var MessageBody;
                                var fs = require('fs');
                                var filename = './templates/ForgotPassword.html';
                                fs.readFile(filename, 'utf8', function (err, data) {
                                    if (err) {
                                        winston.log('error', err);
                                    };
                                    MessageBody = data;
                                    MessageBody = MessageBody.replace('@UserName', recordsets[0][0].FullName);
                                    MessageBody = MessageBody.replace('@LoginId', recordsets[0][0].LoginId);
                                    var ResetLink = Configuration.APIUrl + '/Reset-Password?Code=' + ActivationCode;
                                    MessageBody = MessageBody.replace('@ResetLink', '<a href="' + ResetLink + '">' + ResetLink + '</a>');
                                    Helper.SendMail(Configuration.SMTPHost, Configuration.SMTPPort, Configuration.SMTPUserName, Configuration.SMTPPassword, Configuration.SMTPSecure, Configuration.SMTPFrom, recordsets[0][0].EMailId, "Payroll Reset Password", MessageBody);                                   
                                    res.json(true);
                                });
                            }
                            catch (err) {
                                winston.log('error', err);
                            }
                        }
                    });
                });
            }
            else {
                require('crypto').randomBytes(48, function (err, buffer) {
                    var ActivationCode = buffer.toString('hex');
                    request.input('EMailId', sql.NVarChar(250), query.EMailId);
                    request.execute('prcClientGetByEMailId', function (err, recordsets, returnValue, affected) {
                        connection.close();
                        if (err) {
                            winston.log('error', err);
                        }
                        else {
                            try {
                                UpdateActivationCode(recordsets[0][0].ClientId, ActivationCode);
                                var MessageBody;
                                var fs = require('fs');
                                var filename = './templates/ForgotPassword.html';
                                fs.readFile(filename, 'utf8', function (err, data) {
                                    if (err) {
                                        winston.log('error', err);
                                    };
                                    MessageBody = data;
                                    MessageBody = MessageBody.replace('@UserName', recordsets[0][0].FullName);
                                    MessageBody = MessageBody.replace('@LoginId', recordsets[0][0].LoginId);
                                    var ResetLink = Configuration.APIUrl + '/Reset-Password?Code=' + ActivationCode;
                                    MessageBody = MessageBody.replace('@ResetLink', '<a href="' + ResetLink + '">' + ResetLink + '</a>');
                                    Helper.SendMail(Configuration.SMTPHost, Configuration.SMTPPort, Configuration.SMTPUserName, Configuration.SMTPPassword, Configuration.SMTPSecure, Configuration.SMTPFrom, recordsets[0][0].EMailId, "Payroll Reset Password", MessageBody);                                   
                                    res.json(true);
                                });
                            }
                            catch (err) {
                                winston.log('error', err);
                            }
                        }
                    });
                });
            }
        }
    });
};
function UpdateActivationCode(ClientId, ActivationCode) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);            
            request.input('ClientId', sql.BigInt, ClientId);
            request.input('ActivationCode', sql.VarChar(100), ActivationCode);
            request.execute('prcClientUpdateActivationCode', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                         
            });
        }
    });
};
exports.ResetPassword = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;            
            request.input('ActivationCode', sql.VarChar(100), query.ActivationCode);
            request.input('Password', sql.VarChar(20), query.Password);
            request.execute('prcClientUpdatePassword', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    res.json(true);
                }     
            });
        }
    });
};
exports.ValidateClient = function (req, res) {
    var LoginId = req.body.LoginId || '';
    var Password = req.body.Password || '';
    if (LoginId == '' || Password == '') {
        res.status(401);
        res.json({ "status": 401, "message": "Invalid credentials" });
        return;
    }
    var dtoClient = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('LoginId', sql.VarChar(20), query.LoginId);
            request.input('Password', sql.VarChar(50), query.Password);
            request.execute('prcClientValidateGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoClient = ValidateData(recordsets[0])[0];
                            res.json(GenerateToken(dtoClient));
                        }
                        else {
                            res.status(401);
                            res.json({ "status": 401, "message": "Invalid credentials" });
                        }                        
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
function GenerateToken(dtoClient) {
    var expires = expiresIn(7); // 7 days
    var token = jwt.encode({ ClientId: dtoClient.ClientId, Expires: expires }, Configuration.TokenSecret);
    return { Token: token, ClientId: dtoClient.ClientId };
}

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}
function ValidateData(arrData) {
    for (i = 0; i < arrData.length; i++) {
        arrData[i].ClientType = arrData[i].ClientType == null ? 0 : arrData[i].ClientType;
        arrData[i].FullName = arrData[i].FullName == null ? '' : arrData[i].FullName;
        arrData[i].Address1 = arrData[i].Address1 == null ? '' : arrData[i].Address1;
        arrData[i].Address2 = arrData[i].Address2 == null ? '' : arrData[i].Address2;        
        arrData[i].CityName = arrData[i].CityName == null ? '' : arrData[i].CityName;
        arrData[i].StateId = arrData[i].StateId == null ? 0 : arrData[i].StateId;
        arrData[i].StateCode = arrData[i].StateCode == null ? '' : arrData[i].StateCode;
        arrData[i].StateName = arrData[i].StateName == null ? '' : arrData[i].StateName;
        arrData[i].ZipCode = arrData[i].ZipCode == null ? '' : arrData[i].ZipCode;
        arrData[i].ZipCodeExt = arrData[i].ZipCodeExt == null ? '' : arrData[i].ZipCodeExt;
        arrData[i].IndustryId = arrData[i].IndustryId == null ? 0 : arrData[i].IndustryId;
        arrData[i].ContactName = arrData[i].ContactName == null ? '' : arrData[i].ContactName;
        arrData[i].JobTitleName = arrData[i].JobTitleName == null ? '' : arrData[i].JobTitleName;
        arrData[i].WorkPhoneNo = arrData[i].WorkPhoneNo == null ? '' : arrData[i].WorkPhoneNo;
        arrData[i].WorkPhoneNoExt = arrData[i].WorkPhoneNoExt == null ? '' : arrData[i].WorkPhoneNoExt;
        arrData[i].CellPhoneNo = arrData[i].CellPhoneNo == null ? '' : arrData[i].CellPhoneNo;
        arrData[i].EMailId = arrData[i].EMailId == null ? '' : arrData[i].EMailId;
        arrData[i].LoginId = arrData[i].LoginId == null ? '' : arrData[i].LoginId;
        arrData[i].Password = arrData[i].Password == null ? '' : arrData[i].Password;
        arrData[i].Status = arrData[i].Status == null ? 'Inactive' : arrData[i].Status;
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
    }
    return arrData;
}