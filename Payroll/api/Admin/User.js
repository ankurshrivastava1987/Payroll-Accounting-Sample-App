exports.GetPage = function (req, res) {
    var dtoUserPage = new Object();
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
            request.execute('prcUserGetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        dtoUserPage.Users = ValidateData(recordsets[0]);
                        dtoUserPage.TotalRecords = recordsets[1][0].TotalRecords;
                        res.json(dtoUserPage);
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
            request.input('UserId', sql.BigInt, query.UserId);
            request.input('FullName', sql.VarChar(100), query.FullName);
            request.input('Address1', sql.VarChar(50), query.Address1);
            request.input('Address2', sql.VarChar(50), query.Address2);           
            request.input('CityName', sql.VarChar(50), query.CityName);
            request.input('StateId', sql.BigInt, query.StateId);
            request.input('ZipCode', sql.VarChar(5), query.ZipCode);
            request.input('ZipCodeExt', sql.VarChar(4), query.ZipCodeExt);
            request.input('JobTitleName', sql.VarChar(50), query.JobTitleName);
            request.input('WorkPhoneNo', sql.VarChar(14), query.WorkPhoneNo);
            request.input('WorkPhoneNoExt', sql.VarChar(12), query.WorkPhoneNoExt);
            request.input('CellPhoneNo', sql.VarChar(14), query.CellPhoneNo);
            request.input('EMailId', sql.VarChar(250), query.EMailId);
            request.input('LoginId', sql.VarChar(20), query.LoginId);
            request.input('Password', sql.VarChar(50), query.Password);
            request.input('Status', sql.VarChar(10), query.Status);
            request.execute('prcUserSave', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetUserPage');
                        if (query.UserId > 0) {
                            socketio.emit('GetUserObject', query.UserId);
                        }
                        res.json(err?0:recordsets[0][0].UserId);
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
            request.input('UserId', sql.BigInt, query.UserId);
            request.execute('prcUserDelete', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetUserPage');
                        socketio.emit('GetUserObject', query.UserId);
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
            request.input('UserId', sql.BigInt, query.UserId);
            request.execute('prcUserDeletable', function (err, recordsets, returnValue, affected) {
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
    var dtoUser = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('UserId', sql.BigInt, query.UserId);
            request.execute('prcUserGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoUser = ValidateData(recordsets[0])[0];
                        }
                        res.json(dtoUser);
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
            request.input('UserId', sql.BigInt, query.UserId);
            request.input('LoginId', sql.VarChar(20), query.LoginId);
            request.execute('prcUserExist', function (err, recordsets, returnValue, affected) {
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
            request.input('UserId', sql.BigInt, query.UserId);
            request.input('EMailId', sql.VarChar(250), query.EMailId);
            request.execute('prcUserExist1', function (err, recordsets, returnValue, affected) {
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
            request.execute('prcUserGetLookup', function (err, recordsets, returnValue, affected) {
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
//exports.ValidateUser = function (req, res) {
//    var dtoUser = new Object();
//    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
//        if (err) {
//            winston.log('error', err);
//        }
//        else {
//            var request = new sql.Request(connection);
//            var query = req.body;
//            request.input('LoginId', sql.VarChar(20), query.LoginId);
//            request.input('Password', sql.VarChar(50), query.Password);
//            request.execute('prcUserValidateGet', function (err, recordsets, returnValue, affected) {
//                connection.close();
//                if (err) {
//                    winston.log('error', err);
//                }
//                else {
//                    try {
//                        if (recordsets[0].length > 0) {
//                            dtoUser = ValidateData(recordsets[0])[0];
//                        }
//                        res.json(dtoUser);
//                    }
//                    catch (err) {
//                        winston.log('error', err);
//                    }
//                }
//            });
//        }
//    });
//};
function ValidateData(arrData) {
    for (i = 0; i < arrData.length; i++) {
        arrData[i].UserCode = arrData[i].UserCode == null? '': arrData[i].UserCode;
        arrData[i].FullName = arrData[i].FullName == null? '': arrData[i].FullName;
        arrData[i].Address1 = arrData[i].Address1 == null? '': arrData[i].Address1;
        arrData[i].Address2 = arrData[i].Address2 == null? '': arrData[i].Address2;        
        arrData[i].CityName = arrData[i].CityName == null? '': arrData[i].CityName;
        arrData[i].StateId = arrData[i].StateId == null? 0: arrData[i].StateId;
        arrData[i].StateCode = arrData[i].StateCode == null? '': arrData[i].StateCode;
        arrData[i].StateName = arrData[i].StateName == null? '': arrData[i].StateName;
        arrData[i].ZipCode = arrData[i].ZipCode == null? '': arrData[i].ZipCode;
        arrData[i].ZipCodeExt = arrData[i].ZipCodeExt == null? '': arrData[i].ZipCodeExt;
        arrData[i].JobTitleName = arrData[i].JobTitleName == null? '': arrData[i].JobTitleName;
        arrData[i].WorkPhoneNo = arrData[i].WorkPhoneNo == null? '': arrData[i].WorkPhoneNo;
        arrData[i].WorkPhoneNoExt = arrData[i].WorkPhoneNoExt == null? '': arrData[i].WorkPhoneNoExt;
        arrData[i].CellPhoneNo = arrData[i].CellPhoneNo == null? '': arrData[i].CellPhoneNo;
        arrData[i].EMailId = arrData[i].EMailId == null? '': arrData[i].EMailId;
        arrData[i].LoginId = arrData[i].LoginId == null? '': arrData[i].LoginId;
        arrData[i].Password = arrData[i].Password == null? '': arrData[i].Password;
        arrData[i].Status = arrData[i].Status == null? 'Inactive': arrData[i].Status;
    }
    return arrData;
}