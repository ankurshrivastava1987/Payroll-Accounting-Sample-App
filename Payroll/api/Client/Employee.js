//test comment by sanjeeva
exports.GetPage = function (req, res) {    
    var dtoEmployeePage = new Object();
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
            request.input('Status', sql.VarChar(10), query.Status);
            request.input('FilterText', sql.VarChar(50), query.FilterText);
            request.input('DepartmentId', sql.BigInt, query.DepartmentId);
            request.input('LocationId', sql.BigInt, query.LocationId);
            request.input('EmployeeId', sql.BigInt, query.EmployeeId);
            request.execute('prcEmployeeGetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        dtoEmployeePage.Employees = ValidateData(recordsets[0]);
                        dtoEmployeePage.TotalRecords = recordsets[1][0].TotalRecords;
                        res.json(dtoEmployeePage);
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
            
            var FederalTaxes = new sql.Table()
            FederalTaxes.columns.add('FederalTaxId', sql.BigInt);
            FederalTaxes.columns.add('StartDate', sql.VarChar(10));
            FederalTaxes.columns.add('FilingStatusId', sql.BigInt);   
            FederalTaxes.columns.add('Allowances', sql.Int);  
            FederalTaxes.columns.add('AdditionalWithholdings', sql.Decimal(18, 2));  
            FederalTaxes.columns.add('Allowance', sql.VarChar(1));
            FederalTaxes.columns.add('Exemption', sql.Int);  
            var arrFederalTaxes = query.FederalTaxes.split(String.fromCharCode(135));
            if (arrFederalTaxes[0] == '') {
                arrFederalTaxes.splice(0, 1);
            }
            for (var i = 0; i < arrFederalTaxes.length; i++) {
                var arrFederalTax = arrFederalTaxes[i].split(String.fromCharCode(134));
                if (arrFederalTax[11] == "0") {
                    FederalTaxes.rows.add(arrFederalTax[1], arrFederalTax[2], arrFederalTax[3], arrFederalTax[5], arrFederalTax[6].replace('$', '').replace(',', ''), arrFederalTax[7], arrFederalTax[9]);
                }
            }           
            
            var StateTaxes = new sql.Table()
            StateTaxes.columns.add('StateTaxId', sql.BigInt);
            StateTaxes.columns.add('StartDate', sql.VarChar(10));            
            StateTaxes.columns.add('FilingStatusId', sql.BigInt);
            StateTaxes.columns.add('AllowanceStatusId', sql.BigInt);           
            StateTaxes.columns.add('Allowance', sql.VarChar(1));
            StateTaxes.columns.add('Dependants', sql.Int);
            StateTaxes.columns.add('PersonalExemptions', sql.Int);
            StateTaxes.columns.add('DependentExemptions', sql.Int);
            StateTaxes.columns.add('AgeExemptions', sql.Int);
            StateTaxes.columns.add('BlindExemptions', sql.Int);
            StateTaxes.columns.add('AdditionalAllowances', sql.Int);
            StateTaxes.columns.add('BasicAllowances', sql.Int);
            StateTaxes.columns.add('AdditionalAmount', sql.Decimal(18, 2));
            StateTaxes.columns.add('IsDelawareWorkplace', sql.VarChar(1));
            StateTaxes.columns.add('Deleted', sql.Int);
            var arrStateTaxes = query.StateTaxes.split(String.fromCharCode(135));
            if (arrStateTaxes[0] == '') {
                arrStateTaxes.splice(0, 1);
            }
            for (var i = 0; i < arrStateTaxes.length; i++) {
                var arrStateTax = arrStateTaxes[i].split(String.fromCharCode(134));                
                StateTaxes.rows.add(arrStateTax[1], arrStateTax[2], arrStateTax[3], arrStateTax[5], arrStateTax[7], arrStateTax[9], arrStateTax[10], arrStateTax[11], arrStateTax[12], arrStateTax[13], arrStateTax[14], arrStateTax[15], arrStateTax[16], arrStateTax[17], arrStateTax[19]);               
            }            
            
            var Compensations = new sql.Table()
            Compensations.columns.add('CompensationId', sql.BigInt);
            Compensations.columns.add('StartDate', sql.VarChar(10));
            Compensations.columns.add('PayType', sql.VarChar(10));
            Compensations.columns.add('PayRate', sql.Decimal(18, 2));
            Compensations.columns.add('VacationDays', sql.Decimal(18, 2));
            Compensations.columns.add('SickDays', sql.Decimal(18, 2));           
            var arrCompensations = query.Compensations.split(String.fromCharCode(135));
            if (arrCompensations[0] == '') {
                arrCompensations.splice(0, 1);
            }
            for (var i = 0; i < arrCompensations.length; i++) {
                var arrCompensation = arrCompensations[i].split(String.fromCharCode(134));
                if (arrCompensation[7] == "0") {
                    Compensations.rows.add(arrCompensation[1], arrCompensation[2], arrCompensation[3], arrCompensation[4].replace('$','').replace(',', ''), arrCompensation[5], arrCompensation[6]);
                }
            }

            var Summaries = new sql.Table()
            Summaries.columns.add('SummaryId', sql.BigInt);
            Summaries.columns.add('PayStubId', sql.BigInt);
            Summaries.columns.add('PayStubSide', sql.Int);
            Summaries.columns.add('Amount', sql.Decimal(18, 2));
            Summaries.columns.add('FederalIncomeTax', sql.Bit);
            Summaries.columns.add('SocialSecurity', sql.Bit);
            Summaries.columns.add('Medicare', sql.Bit);
            Summaries.columns.add('Quarter', sql.Int);            
            var arrSummaries = query.Summaries.split(String.fromCharCode(135));
            if (arrSummaries[0] == '') {
                arrSummaries.splice(0, 1);
            }
            for (var i = 0; i < arrSummaries.length; i++) {
                var arrSummary = arrSummaries[i].split(String.fromCharCode(134));
                if (arrSummary[12] == "0") {
                    Summaries.rows.add(arrSummary[1], arrSummary[2], arrSummary[4], arrSummary[6].replace('$', '').replace(',', ''), (arrSummary[7] == 'Yes' ? true : false), (arrSummary[8] == 'Yes' ? true : false), (arrSummary[9] == 'Yes' ? true : false), arrSummary[10]);
                }
            }      
                  
            var EmployeePayStubs = new sql.Table()
            EmployeePayStubs.columns.add('PayStubId', sql.BigInt);
            var arrEmployeePayStubs = query.EmployeePayStubs.split(',');
            if (arrEmployeePayStubs[0] == '') {
                arrEmployeePayStubs.splice(0, 1);
            }
            for (var i = 0; i < arrEmployeePayStubs.length; i++) {                
                EmployeePayStubs.rows.add(arrEmployeePayStubs[i]);               
            }            

            request.input('EmployeeId', sql.BigInt, query.EmployeeId);
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);   
            request.input('EmployeeCode', sql.VarChar(10), query.EmployeeCode);
            request.input('FirstName', sql.VarChar(50), query.FirstName);
            request.input('MiddleNameInitial', sql.VarChar(1), query.MiddleNameInitial);
            request.input('LastName', sql.VarChar(50), query.LastName);
            request.input('Address1', sql.VarChar(50), query.Address1);
            request.input('Address2', sql.VarChar(50), query.Address2);           
            request.input('CityName', sql.VarChar(50), query.CityName);
            request.input('CountyId', sql.BigInt, query.CountyId);
            request.input('StateId', sql.BigInt, query.StateId);
            request.input('ZipCode', sql.VarChar(5), query.ZipCode);
            request.input('ZipCodeExt', sql.VarChar(4), query.ZipCodeExt);
            request.input('Gender', sql.VarChar(6), query.Gender);
            request.input('DateOfBirth', sql.VarChar(10), (query.DateOfBirth==''?'01/01/1900':query.DateOfBirth));
            request.input('EMailId', sql.VarChar(250), query.EMailId);
            request.input('WorkPhoneNo', sql.VarChar(14), query.WorkPhoneNo);
            request.input('WorkPhoneNoExt', sql.VarChar(12), query.WorkPhoneNoExt);
            request.input('CellPhoneNo', sql.VarChar(14), query.CellPhoneNo);
            request.input('FaxNo', sql.VarChar(12), query.FaxNo);
            request.input('DepartmentId', sql.BigInt, query.DepartmentId); 
            request.input('LocationId', sql.BigInt, query.LocationId); 
            request.input('PayScheduleId', sql.BigInt, query.PayScheduleId);           
            request.input('BankName', sql.VarChar(50), query.BankName);
            request.input('RoutingNo', sql.VarChar(9), query.RoutingNo);
            request.input('AccountNo', sql.VarChar(20), query.AccountNo);
            request.input('AccountTypeId', sql.BigInt, query.AccountTypeId);
            request.input('SocialSecurityNo', sql.VarChar(15), query.SocialSecurityNo);
            request.input('Contractor1099', sql.Bit, query.Contractor1099);
            request.input('NewHireReport', sql.Bit, query.NewHireReport);
            request.input('FormI9', sql.Bit, query.FormI9);
            request.input('HireDate', sql.VarChar(10), (query.HireDate == '' ? '01/01/1900' : query.HireDate));
            request.input('TerminationDate', sql.VarChar(10), (query.TerminationDate == '' ? '01/01/1900' : query.TerminationDate));
            request.input('Notes', sql.NVarChar(sql.MAX), query.Notes);
            request.input('VacationHoursAvailable', sql.Decimal(18, 2), query.VacationHoursAvailable);
            request.input('VacationHoursUsed', sql.Decimal(18, 2), query.VacationHoursUsed);
            request.input('SickLeaveHoursAvailable', sql.Decimal(18, 2), query.SickLeaveHoursAvailable);
            request.input('SickLeaveHoursUsed', sql.Decimal(18, 2), query.SickLeaveHoursUsed);
            request.input('CompensationClassId', sql.BigInt, query.CompensationClassId);
            request.input('PaymentMethod', sql.VarChar(50), query.PaymentMethod);
            request.input('Status', sql.VarChar(10), query.Status);
            request.input('FederalTaxes', FederalTaxes);
            request.input('StateTaxes', StateTaxes);
            request.input('Compensations', Compensations);
            request.input('Summaries', Summaries);
            request.input('EmployeePayStubs', EmployeePayStubs);
            request.execute('prcEmployeeSave', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetEmployeePage');
                        if (query.ClientId > 0) {
                            socketio.emit('GetEmployeeObject', query.EmployeeId);
                        }                        
                        var Helper = require('../../routes/Helper');                       
                        var ftp = Helper.ConnectToFTP();
                        ftp.raw.mkd(Configuration.FTPRootPath + '/Documents/Employees/' + recordsets[0][0].EmployeeId, function (err, data) {
                            if (err) {
                                if (err.code != 550) {
                                    return console.error(err);
                                }
                            }
                            ftp.raw.quit(function (err, data) {
                                if (err) return console.error(err);
                                res.json(recordsets[0][0].EmployeeId);
                            });
                        });    
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
            request.input('EmployeeId', sql.BigInt, query.EmployeeId);
            request.execute('prcEmployeeDelete', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetEmployeePage');
                        socketio.emit('GetEmployeeObject', query.EmployeeId);
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
            request.input('EmployeeId', sql.BigInt, query.ClientId);
            request.execute('prcEmployeeDeletable', function (err, recordsets, returnValue, affected) {
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
    var dtoEmployee = new Object();    
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('EmployeeId', sql.BigInt, query.EmployeeId);
            request.execute('prcEmployeeGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoEmployee = ValidateData(recordsets[0])[0];
                        }
                        res.json(dtoEmployee);
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
            request.input('ClientId', sql.BigInt, query.ClientId)
            request.input('EmployeeId', sql.BigInt, query.EmployeeId);
            request.input('EmployeeCode', sql.VarChar(10), query.EmployeeCode);
            request.execute('prcEmployeeExist', function (err, recordsets, returnValue, affected) {
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
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId)
            request.input('EmployeeId', sql.BigInt, query.EmployeeId);
            request.input('EMailId', sql.VarChar(250), query.EMailId);
            request.execute('prcEmployeeExist1', function (err, recordsets, returnValue, affected) {
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
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.execute('prcEmployeeGetLookup', function (err, recordsets, returnValue, affected) {
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
exports.GetByPayScheduleId = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('PayScheduleId', sql.BigInt, query.PayScheduleId);
            request.input('PayCheckMainId', sql.BigInt, query.PayCheckMainId);
            request.input('PayPeriod', sql.VarChar(23), query.PayPeriod);
            request.execute('prcEmployeeByPayScheduleIdGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        res.json(ValidateData4(recordsets[0]));
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.GetByPayStubCode = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('PayStubCode', sql.VarChar(10), query.PayStubCode);            
            request.execute('prcEmployeeByPayStubCodeGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        res.json(ValidateData4(recordsets[0]));
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};
exports.GetEmployeeFederalTaxes = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('EmployeeId', sql.BigInt, query.EmployeeId);
            request.execute('prcEmployeeFederalTaxGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        res.json(ValidateData2(recordsets[0]));
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};

exports.GetEmployeeStateTaxes = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('EmployeeId', sql.BigInt, query.EmployeeId);
            request.input('StateId', sql.BigInt, query.StateId);
            request.execute('prcEmployeeStateTaxGet', function (err, recordsets, returnValue, affected) {
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
};

exports.GetEmployeeCompensations = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('EmployeeId', sql.BigInt, query.EmployeeId);
            request.execute('prcEmployeeCompensationGet', function (err, recordsets, returnValue, affected) {
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

exports.GetEmployeeSummaries = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('EmployeeId', sql.BigInt, query.EmployeeId);
            request.execute('prcEmployeeSummaryGet', function (err, recordsets, returnValue, affected) {
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

exports.GetEmployeePayStubs = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);
            request.input('EmployeeId', sql.BigInt, query.EmployeeId);
            request.execute('prcEmployeePayStubGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        res.json(ValidateData3(recordsets[0]));
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
        arrData[i].EmployeeId = arrData[i].EmployeeId == null? 0: arrData[i].EmployeeId;
        arrData[i].ClientId = arrData[i].ClientId == null? 0: arrData[i].ClientId;
        arrData[i].ClientName = arrData[i].ClientName == null ? '' : arrData[i].ClientName;
        arrData[i].EmployeeCode = arrData[i].EmployeeCode == null ? '' : arrData[i].EmployeeCode;
        arrData[i].FullName = arrData[i].FullName == null ? '' : arrData[i].FullName;
        arrData[i].FirstName = arrData[i].FirstName == null ? '' : arrData[i].FirstName;
        arrData[i].MiddleNameInitial = arrData[i].MiddleNameInitial == null ? '' : arrData[i].MiddleNameInitial;
        arrData[i].LastName = arrData[i].LastName == null ? '' : arrData[i].LastName;
        arrData[i].Address1 = arrData[i].Address1 == null? '': arrData[i].Address1;
        arrData[i].Address2 = arrData[i].Address2 == null? '': arrData[i].Address2;        
        arrData[i].CityName = arrData[i].CityName == null ? '' : arrData[i].CityName; 
        arrData[i].CountyId = arrData[i].CountyId == null ? 0 : arrData[i].CountyId;  
        arrData[i].CountyName = arrData[i].CountyName == null ? '' : arrData[i].CountyName;    
        arrData[i].StateId = arrData[i].StateId == null ? 0 : arrData[i].StateId;    
        arrData[i].StateCode = arrData[i].StateCode == null? '': arrData[i].StateCode;
        arrData[i].StateName = arrData[i].StateName == null? '': arrData[i].StateName;
        arrData[i].ZipCode = arrData[i].ZipCode == null? '': arrData[i].ZipCode;
        arrData[i].ZipCodeExt = arrData[i].ZipCodeExt == null? '': arrData[i].ZipCodeExt;
        arrData[i].Gender = arrData[i].Gender == null? '': arrData[i].Gender;
        arrData[i].DateOfBirth = arrData[i].DateOfBirth == null? '01/01/1900': arrData[i].DateOfBirth;
        arrData[i].EMailId = arrData[i].EMailId == null? '': arrData[i].EMailId;
        arrData[i].WorkPhoneNo = arrData[i].WorkPhoneNo == null? '': arrData[i].WorkPhoneNo;
        arrData[i].WorkPhoneNoExt = arrData[i].WorkPhoneNoExt == null? '': arrData[i].WorkPhoneNoExt;
        arrData[i].CellPhoneNo = arrData[i].CellPhoneNo == null? '': arrData[i].CellPhoneNo;
        arrData[i].FaxNo = arrData[i].FaxNo == null ? '' : arrData[i].FaxNo;
        arrData[i].DepartmentId = arrData[i].DepartmentId == null ? 0 : arrData[i].DepartmentId;
        arrData[i].DepartmentName = arrData[i].DepartmentName == null ? '' : arrData[i].DepartmentName;
        arrData[i].LocationId = arrData[i].LocationId == null ? 0 : arrData[i].LocationId;
        arrData[i].LocationName = arrData[i].LocationName == null ? '' : arrData[i].LocationName;
        arrData[i].PayScheduleId = arrData[i].PayScheduleId == null? 0: arrData[i].PayScheduleId;        
        arrData[i].PayScheduleName = arrData[i].PayScheduleName == null? '': arrData[i].PayScheduleName;       
        arrData[i].BankName = arrData[i].BankName == null? '': arrData[i].BankName;
        arrData[i].RoutingNo = arrData[i].RoutingNo == null? '': arrData[i].RoutingNo;
        arrData[i].AccountNo = arrData[i].AccountNo == null? '': arrData[i].AccountNo;
        arrData[i].AccountTypeId = arrData[i].AccountTypeId == null? 0: arrData[i].AccountTypeId;
        arrData[i].AccountTypeCode = arrData[i].AccountTypeCode == null? 0: arrData[i].AccountTypeCode;
        arrData[i].AccountTypeName = arrData[i].AccountTypeName == null? '': arrData[i].AccountTypeName;
        arrData[i].SocialSecurityNo = arrData[i].SocialSecurityNo == null? '': arrData[i].SocialSecurityNo;
        arrData[i].Contractor1099 = arrData[i].Contractor1099 == null ? false : arrData[i].Contractor1099;
        arrData[i].NewHireReport = arrData[i].NewHireReport == null ? false : arrData[i].NewHireReport;
        arrData[i].FormI9 = arrData[i].FormI9 == null ? false : arrData[i].FormI9;
        arrData[i].HireDate = arrData[i].HireDate == null ? new Date('1900-01-01') : arrData[i].HireDate;
        arrData[i].TerminationDate = arrData[i].TerminationDate == null ? '01/01/1900' : arrData[i].TerminationDate;
        arrData[i].Notes = arrData[i].Notes == null ? '' : arrData[i].Notes;
        arrData[i].VacationHoursAvailable = arrData[i].VacationHoursAvailable == null ? 0 : arrData[i].VacationHoursAvailable;
        arrData[i].VacationHoursUsed = arrData[i].VacationHoursUsed == null ? 0 : arrData[i].VacationHoursUsed;
        arrData[i].SickLeaveHoursAvailable = arrData[i].SickLeaveHoursAvailable == null ? 0 : arrData[i].SickLeaveHoursAvailable;
        arrData[i].SickLeaveHoursUsed = arrData[i].SickLeaveHoursUsed == null ? 0 : arrData[i].SickLeaveHoursUsed;
        arrData[i].CompensationClassId = arrData[i].CompensationClassId == null ? 0 : arrData[i].CompensationClassId;        
        arrData[i].CompensationClassName = arrData[i].CompensationClassName == null ? '' : arrData[i].CompensationClassName;
        arrData[i].PaymentMethod = arrData[i].PaymentMethod == null ? '' : arrData[i].PaymentMethod;
        arrData[i].Status = arrData[i].Status == null ? 'Inactive' : arrData[i].Status;
        arrData[i].StateId1 = arrData[i].StateId1 == null ? 0 : arrData[i].StateId1;
        arrData[i].StateCode1 = arrData[i].StateCode1 == null ? '' : arrData[i].StateCode1;
        arrData[i].StateName1 = arrData[i].StateName1 == null ? '' : arrData[i].StateName1;
        arrData[i].FilingStatusId = arrData[i].FilingStatusId == null ? 0 : arrData[i].FilingStatusId;
        arrData[i].FilingStatusCode = arrData[i].FilingStatusCode == null ? '' : arrData[i].FilingStatusCode;
        arrData[i].FilingStatusName = arrData[i].FilingStatusName == null ? '' : arrData[i].FilingStatusName;
        arrData[i].FederalFilingStatusId = arrData[i].FederalFilingStatusId == null ? 0 : arrData[i].FederalFilingStatusId;
        arrData[i].FederalFilingStatusCode = arrData[i].FederalFilingStatusCode == null ? '' : arrData[i].FederalFilingStatusCode;
        arrData[i].FederalFilingStatusName = arrData[i].FederalFilingStatusName == null ? '' : arrData[i].FederalFilingStatusName;
    }
    return arrData;
}

function ValidateData1(arrData) {
    for (i = 0; i < arrData.length; i++) {
        arrData[i].StateTaxId = arrData[i].StateTaxId == null ? 0 : arrData[i].StateTaxId;
        arrData[i].EmployeeId = arrData[i].EmployeeId == null ? 0 : arrData[i].EmployeeId;
        arrData[i].StartDate = arrData[i].StartDate == null ? new Date('1900-01-01') : arrData[i].StartDate;        
        arrData[i].FilingStatusId = arrData[i].FilingStatusId == null ? 0 : arrData[i].FilingStatusId;
        arrData[i].AllowanceStatusId = arrData[i].AllowanceStatusId == null ? 0 : arrData[i].AllowanceStatusId;
        arrData[i].Allowance = arrData[i].Allowance == null ? '' : arrData[i].Allowance;
        arrData[i].Dependants = arrData[i].Dependants == null ? 0 : arrData[i].Dependants;
        arrData[i].PersonalExemptions = arrData[i].PersonalExemptions == null ? 0 : arrData[i].PersonalExemptions;
        arrData[i].DependentExemptions = arrData[i].DependentExemptions == null ? 0 : arrData[i].DependentExemptions;
        arrData[i].AgeExemptions = arrData[i].AgeExemptions == null ? 0 : arrData[i].AgeExemptions;
        arrData[i].BlindExemptions = arrData[i].BlindExemptions == null ? 0 : arrData[i].BlindExemptions;
        arrData[i].AdditionalAllowances = arrData[i].AdditionalAllowances == null ? 0 : arrData[i].AdditionalAllowances;
        arrData[i].BasicAllowances = arrData[i].BasicAllowances == null ? 0 : arrData[i].BasicAllowances;
        arrData[i].AdditionalAmount = arrData[i].AdditionalAmount == null ? 0 : arrData[i].AdditionalAmount;
        arrData[i].IsDelawareWorkplace = arrData[i].IsDelawareWorkplace == null ? '' : arrData[i].IsDelawareWorkplace;
        arrData[i].FilingStatusName = arrData[i].FilingStatusName == null ? '' : arrData[i].FilingStatusName;        
        arrData[i].FilingStatusName1 = arrData[i].FilingStatusName1 == null ? '' : arrData[i].FilingStatusName1;                 
    }
    return arrData;
}

function ValidateData2(arrData) {
    for (i = 0; i < arrData.length; i++) {
        arrData[i].FederalTaxId = arrData[i].FederalTaxId == null ? 0 : arrData[i].FederalTaxId;       
        arrData[i].StartDate = arrData[i].StartDate == null ? new Date('1900-01-01') : arrData[i].StartDate;
        arrData[i].FederalFilingStatusId = arrData[i].FederalFilingStatusId == null ? 0 : arrData[i].FederalFilingStatusId;
        arrData[i].FederalFilingStatusName = arrData[i].FederalFilingStatusName == null ? '' : arrData[i].FederalFilingStatusName;
        arrData[i].Allowances = arrData[i].Allowances == null ? 0 : arrData[i].Allowances;
        arrData[i].AdditionalWithholdings = arrData[i].AdditionalWithholdings == null ? 0 : arrData[i].AdditionalWithholdings;
        arrData[i].Allowance = arrData[i].Allowance == null ? '' : arrData[i].Allowance; 
        arrData[i].Exemption = arrData[i].Exemption == null ? 0 : arrData[i].Exemption;      
    }
    return arrData;
}

function ValidateData3(arrData) {
    for (i = 0; i < arrData.length; i++) {
        arrData[i].PayStubId = arrData[i].PayStubId == null ? 0 : arrData[i].PayStubId;
        arrData[i].ClientId = arrData[i].ClientId == null ? 0 : arrData[i].ClientId;
        arrData[i].PayStubName = arrData[i].PayStubName == null ? '' : arrData[i].PayStubName;
        arrData[i].PayStubDescription = arrData[i].PayStubDescription == null ? '' : arrData[i].PayStubDescription;
        arrData[i].PayStubType = arrData[i].PayStubType == null ? '' : arrData[i].PayStubType;
        arrData[i].Taxable = arrData[i].Taxable == null ? false : arrData[i].Taxable;
        arrData[i].PayStubId1 = arrData[i].PayStubId1 == null ? 0 : arrData[i].PayStubId1;
    }
    return arrData;
}
function ValidateData4(arrData) {
    for (i = 0; i < arrData.length; i++) {
        arrData[i].PayCheckId = arrData[i].PayCheckId == null ? 0 : arrData[i].PayCheckId;
        arrData[i].EmployeeId = arrData[i].EmployeeId == null ? 0 : arrData[i].EmployeeId;
        arrData[i].FullName = arrData[i].FullName == null ? '' : arrData[i].FullName;
        arrData[i].EMailId = arrData[i].EMailId == null ? '' : arrData[i].EMailId;
        arrData[i].PayCheckMainId = arrData[i].PayCheckMainId == null ? 0 : arrData[i].PayCheckMainId;
        arrData[i].LastPayDate = arrData[i].LastPayDate == null ? new Date('1900-01-01') : arrData[i].LastPayDate;
        arrData[i].PayDate = arrData[i].PayDate == null ? new Date('1900-01-01') : arrData[i].PayDate; 
        arrData[i].PayType = arrData[i].PayType == null ? '' : arrData[i].PayType;
        arrData[i].PayRate = arrData[i].PayRate == null ? 0 : arrData[i].PayRate;    
        arrData[i].Approved = arrData[i].Approved == null ? false : arrData[i].Approved;   
        arrData[i].NetPay = arrData[i].NetPay == null ? 0 : arrData[i].NetPay; 
    }
    return arrData;
}
var UploadFileName = '';
var CurrentPath = '';
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/../../tmp');
    },
    filename: function (req, file, callback) {
        CurrentPath = req.body.hdnCurrentPath2;
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
        var Helper = require('../../routes/Helper');
        var ftp = Helper.ConnectToFTP();        
        ftp.put(__dirname + '/../../tmp/' + UploadFileName, Configuration.FTPRootPath + '/' + CurrentPath + '/' + UploadFileName, function (hadError) {           
            if (!hadError) {
                console.log("File transferred successfully!");
            }
            ftp.raw.quit(function (err, data) {
                if (err) return console.error(err);
                res.json(true);
            });                     
        }); 
    });
};

exports.GetFiles = function (req, res) {    
    var Helper = require('../../routes/Helper');
    var ftp = Helper.ConnectToFTP();
    var arrFiles = [];
    ftp.ls(Configuration.FTPRootPath + '/' + req.body.Path, function (err, res1) {
        if (res1) {
            res1.forEach(function (file) {
                var MyFile = new Object();
                MyFile.Name = file.name;
                MyFile.Size = file.size;
                MyFile.Type = file.type;
                MyFile.Time = file.time;
                arrFiles.push(MyFile);
            });
        }
        ftp.raw.quit(function (err, data) {
            if (err) return console.error(err);          
            res.json(arrFiles);
        });        
    });   
};

exports.CreateFolder = function (req, res) {
    var Helper = require('../../routes/Helper'); 
    var ftp = Helper.ConnectToFTP();       
    ftp.raw.mkd(Configuration.FTPRootPath + '/' + req.body.hdnCurrentPath1 + '/' + req.body.txtFolderName, function (err, data) {            
        if (err) return console.error(err);
        ftp.raw.quit(function (err, data) {
            if (err) return console.error(err);
            res.json(true);
        });              
    });    
};

exports.RenameFile = function (req, res) {
    var Helper = require('../../routes/Helper');
    var ftp = Helper.ConnectToFTP();  
    ftp.rename(Configuration.FTPRootPath + '/' + req.body.hdnCurrentPath2 + '/' + req.body.hdnOldFileName, Configuration.FTPRootPath + '/' + req.body.hdnCurrentPath2 + '/' + req.body.txtNewFileName, function (err, res1) {       
        if (!err) {
            console.log("Renaming successful!");
        }
        ftp.raw.quit(function (err, data) {
            if (err) return console.error(err);
            res.json(true);
        });     
    });   
};

exports.DeleteFile = function (req, res) {
    var Helper = require('../../routes/Helper');
    var ftp = Helper.ConnectToFTP();   
    ftp.raw.dele(Configuration.FTPRootPath + '/' + req.body.Path, function (err, data) {       
        if (err) return console.error(err);
        console.log("Bye!");
        ftp.raw.quit(function (err, data) {
            if (err) return console.error(err);
            res.json(true);
        });     
    });  
};

exports.DeleteFolder = function (req, res) {
    var Helper = require('../../routes/Helper');
    var ftp = Helper.ConnectToFTP1();   
    ftp.rmr(Configuration.FTPRootPath + '/' + req.body.Path, function (err) {       
        var ftp1 = Helper.ConnectToFTP();       
        ftp1.raw.rmd(Configuration.FTPRootPath + '/' + req.body.Path, function (err1, data) {           
            ftp.raw.quit(function (err, data) {
                if (err) return console.error(err);
                res.json(true);
            });     
        });
    }); 
};

exports.DownloadFile = function (req, res, next) {
    var file = req.params.file;
    var Helper = require('../../routes/Helper');    
    var Path = Configuration.FTPRootPath + '/' + file;
    var ftp = Helper.ConnectToFTP();  
    var arrPath = Path.split('/');
    ftp.get(Path, __dirname + '/../../tmp/' + arrPath[arrPath.length - 1], function (hadErr) {       
        if (hadErr)
            console.error('There was an error retrieving the file.');
        else {
            console.log('File copied successfully!');
            ftp.raw.quit(function (err, data) {
                if (err) return console.error(err);
                var arrFile = file.split('/');
                var path = __dirname + '/../../tmp/' + arrFile[arrFile.length - 1];
                res.download(path);
            });
        }
    });   
};

exports.GetDirectoryPDF = function (req, res) {
    var dtoEmployeePage = new Object();
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
            request.input('Status', sql.VarChar(10), query.Status);
            request.input('FilterText', sql.VarChar(50), query.FilterText);
            request.input('DepartmentId', sql.BigInt, query.DepartmentId);
            request.input('LocationId', sql.BigInt, query.LocationId);
            request.input('EmployeeId', sql.BigInt, query.EmployeeId);
            request.execute('prcEmployeeGetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    
                    try {
                        dtoEmployeePage.Employees = ValidateData(recordsets[0]);
                        var html = '<table style="font-size:10px;font-family:"Courier New">';
                        html += '<thead>';
                        html += '<tr style="background-color:#4267b2;color:#fff">';
                        html += '<th>Name</th>';
                        html += '<th>E-Mail</th>';
                        html += '<th>Work Phone #</th>';
                        html += '<th>Cell Phone #</th>';
                        html += '<th>Fax #</th>';
                        html += '</tr>';
                        html += '</thead>';
                        html += '<tbody>';
                        for (var i = 0; i < dtoEmployeePage.Employees.length; i++) {
                            html += '<tr>';
                            html += '<td>' + dtoEmployeePage.Employees[i].FullName + '</td>';
                            html += '<td>' + dtoEmployeePage.Employees[i].EMailId + '</td>';
                            html += '<td>' + dtoEmployeePage.Employees[i].WorkPhoneNo + (dtoEmployeePage.Employees[i].WorkPhoneNoExt.trim() == '' ? '' : '-' + dtoEmployeePage.Employees[i].WorkPhoneNoExt.trim()) + '</td>';
                            html += '<td>' + dtoEmployeePage.Employees[i].CellPhoneNo + '</td>';
                            html += '<td>' + dtoEmployeePage.Employees[i].FaxNo + '</td>';
                            html += '</tr>';
                        }
                        html += '</tbody>';
                        html += '</table>';

                        var fs = require('fs');
                        var pdf = require('html-pdf');                        
                        var options = { format: 'Letter' };
                        const uuidv4 = require('uuid/v4');
                        var FileName = uuidv4();
                        pdf.create(html, options).toFile('./public/temp/' + FileName + '.pdf', function (err, response) {
                            if (err) return console.log(err);
                            console.log(response); 
                            res.json(FileName + '.pdf');
                        });
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};

exports.GetEmployeeDetailsPDF = function (req, res) {
    var dtoEmployeePage = new Object();
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
            request.input('Status', sql.VarChar(10), query.Status);
            request.input('FilterText', sql.VarChar(50), query.FilterText);
            request.input('DepartmentId', sql.BigInt, query.DepartmentId);
            request.input('LocationId', sql.BigInt, query.LocationId);
            request.input('EmployeeId', sql.BigInt, query.EmployeeId);
            request.execute('prcEmployeeGetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        dtoEmployeePage.Employees = ValidateData(recordsets[0]);
                        var html = '<table style="font-size:10px;font-family:"Courier New">';
                        html += '<thead>';
                        html += '<tr style="background-color:#4267b2;color:#fff">';
                        html += '<th>Personal Info</th>';
                        html += '<th>Pay Info</th>';
                        html += '<th>Tax Info</th>';                        
                        html += '</tr>';
                        html += '</thead>';
                        html += '<tbody>';
                        for (var i = 0; i < dtoEmployeePage.Employees.length; i++) {
                            html += '<tr>';
                            html += '<td style="border-top:1px solid gray;vertical-align:top">';
                            html += '<table>';
                            html += '<tr>';
                            html += '<td>' + (dtoEmployeePage.Employees[i].Status == 'Inactive' ? '*' : '') + dtoEmployeePage.Employees[i].FullName + '</td>';
                            html += '</tr>';
                            html += '<tr>';
                            html += '<td>' + dtoEmployeePage.Employees[i].Address1 + '</td>';
                            html += '</tr>';
                            html += '<tr>';
                            html += '<td>' + dtoEmployeePage.Employees[i].Address2 + '</td>';
                            html += '</tr>';                           
                            html += '<tr>';
                            html += '<td>' + dtoEmployeePage.Employees[i].CityName + '</td>';
                            html += '</tr>';
                            html += '<tr>';
                            html += '<td>' + dtoEmployeePage.Employees[i].StateCode + ' ' + dtoEmployeePage.Employees[i].ZipCode + (dtoEmployeePage.Employees[i].ZipCodeExt.trim() != '' ? '-' + dtoEmployeePage.Employees[i].ZipCodeExt : '') + '</td>';
                            html += '</tr>';
                            html += '<tr>';
                            html += '<td>' + dtoEmployeePage.Employees[i].EMailId + '</td>';
                            html += '</tr>';
                            if (Helper.FormatDate(dtoEmployeePage.Employees[i].HireDate, 'mm/dd/yyyy') != '01/01/1900') {
                                html += '<tr>';
                                html += '<td>Hired: ' + Helper.FormatDate(dtoEmployeePage.Employees[i].HireDate, 'mm/dd/yyyy') + '</td>';
                                html += '</tr>';
                            }
                            if (Helper.FormatDate(dtoEmployeePage.Employees[i].TerminationDate, 'mm/dd/yyyy') != '01/01/1900') {
                                html += '<tr>';
                                html += '<td>Termination: ' + Helper.FormatDate(dtoEmployeePage.Employees[i].TerminationDate, 'mm/dd/yyyy') + '</td>';
                                html += '</tr>';
                            }
                            if (Helper.FormatDate(dtoEmployeePage.Employees[i].DateOfBirth, 'mm/dd/yyyy') != '01/01/1900') {
                                html += '<tr>';
                                html += '<td>Born:' + Helper.FormatDate(dtoEmployeePage.Employees[i].DateOfBirth, 'mm/dd/yyyy') + '</td>';
                                html += '</tr>';
                            }
                            html += '</table>';
                            html += '</td>';
                            html += '<td style="border-top:1px solid gray;vertical-align:top">';
                            var Salary = '';
                            if (dtoEmployeePage.Employees[i].PayType === 'Hourly') {
                                Salary = 'Regular Pay: ' + accounting.formatMoney(dtoEmployeePage.Employees[i].PayRate) + ' Per Hour';
                            }
                            else {
                                Salary = 'Salary: ' + accounting.formatMoney(dtoEmployeePage.Employees[i].PayRate);
                                if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'DA') {
                                    Salary += ' Per Day';
                                }
                                else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'WW') {
                                    Salary += ' Per Week';
                                }
                                else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'BW') {
                                    Salary += ' Per Bi-Week';
                                }
                                else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'SM') {
                                    Salary += ' Per Semi-Month';
                                }
                                else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'MM') {
                                    Salary += ' Per Month';
                                }
                                else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'QQ') {
                                    Salary += ' Per Quarter';
                                }
                                else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'SA') {
                                    Salary += ' Per Semi-Annual';
                                }
                                else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'AA') {
                                    Salary += ' Per Year';
                                }
                            }
                            html += '<table>';
                            html += '<tr>';
                            html += '<td>' + Salary + '</td>';
                            html += '</tr>';
                            html += '</table>';
                            html += '</td>';
                            html += '<td style="border-top:1px solid gray;vertical-align:top">';
                            html += '<table>';
                            html += '<tr>';
                            html += '<td>SSN: ' + dtoEmployeePage.Employees[i].SocialSecurityNo + '</td>';
                            html += '</tr>';
                            if (dtoEmployeePage.Employees[i].FederalFilingStatusName.trim() != '') {
                                html += '<tr>';
                                html += '<td>Federal: ' + dtoEmployeePage.Employees[i].FederalFilingStatusName + '</td>';
                                html += '</tr>';
                            }
                            if (dtoEmployeePage.Employees[i].StateCode1.trim() != '') {
                                html += '<tr>';
                                html += '<td>' + dtoEmployeePage.Employees[i].StateCode1 + ': ' + dtoEmployeePage.Employees[i].FilingStatusName + '</td>';
                                html += '</tr>';
                            }
                            html += '</table>';
                            html += '</td>';
                            html += '</tr>';
                        }
                        html += '</tbody>';
                        html += '</table>';

                        var fs = require('fs');
                        var pdf = require('html-pdf');
                        var options = { format: 'Letter' };
                        const uuidv4 = require('uuid/v4');
                        var FileName = uuidv4();
                        pdf.create(html, options).toFile('./public/temp/' + FileName + '.pdf', function (err, response) {
                            if (err) return console.log(err);
                            console.log(response);
                            res.json(FileName + '.pdf');
                        });
                    }
                    catch (err) {
                        winston.log('error', err);
                    }
                }
            });
        }
    });
};



// Added by ankur for download template excel file
exports.ExportEmployee = function (req, res, next) {
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

//Import employee
exports.ImportEmployee = function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            winston.log('error', err);
            return res.end("Error uploading file.");
        }
        var excel = require('excel');
        excel(__dirname + '/../../tmp/' + UploadFileName, function (err, arrData) {
            if (err) { winston.log('error', err); };

            var Import = new sql.Table();

	 Import.columns.add('EmployeeCode' , sql.NVarChar(10)); 
     Import.columns.add('FirstName', sql.NVarChar(50)); 
     Import.columns.add('MiddleNameInitial', sql.NVarChar(1));
     Import.columns.add('LastName', sql.NVarChar(50));
	 Import.columns.add('Address1' , sql.NVarChar(50)); 
	 Import.columns.add('Address2' , sql.NVarChar(50)); 	
     Import.columns.add('CityName', sql.NVarChar(50));
     Import.columns.add('StateName', sql.NVarChar(50)); 
	 Import.columns.add('CountyName' , sql.NVarChar(50)); 	  
	 Import.columns.add('ZipCode' , sql.NVarChar(5)); 
	 Import.columns.add('ZipCodeExt' , sql.NVarChar(4)); 
	 Import.columns.add('Gender' , sql.NVarChar(6)); 
	 Import.columns.add('DateOfBirth' , sql.NVarChar(10)); 
	 Import.columns.add('EMailId' , sql.NVarChar(250)); 
	 Import.columns.add('WorkPhoneNo' , sql.NVarChar(14)); 
	 Import.columns.add('WorkPhoneNoExt' , sql.NVarChar(12)); 
	 Import.columns.add('CellPhoneNo' , sql.NVarChar(14)); 
	 Import.columns.add('FaxNo' , sql.NVarChar(12)); 
	 Import.columns.add('DepartmentName' , sql.NVarChar(50)); 
	 Import.columns.add('LocationName' , sql.NVarChar(50)); 
	 Import.columns.add('PayScheduleName' , sql.NVarChar(50)); 
	 Import.columns.add('BankName' , sql.NVarChar(50)); 
	 Import.columns.add('RoutingNo' , sql.NVarChar(9)); 
	 Import.columns.add('AccountNo' , sql.NVarChar(20)); 
	 Import.columns.add('AccountTypeName' , sql.NVarChar(50));
	 Import.columns.add('SocialSecurityNo' , sql.NVarChar(15)); 
	 Import.columns.add('NewHireReport' , sql.Bit); 
     Import.columns.add('FormI9', sql.Bit); 
	 Import.columns.add('HireDate' , sql.NVarChar(10)); 
	 Import.columns.add('TerminationDate' , sql.NVarChar(10)); 
     Import.columns.add('Notes', sql.VarChar(sql.MAX)); 
     Import.columns.add('CompensationClassName', sql.NVarChar(100));
	 Import.columns.add('Status', sql.NVarChar(10)); 

            for (var i = 1; i < arrData.length; i++) {
                Import.rows.add(
                    arrData[i][0],
                    arrData[i][1],
                    arrData[i][2],
                    arrData[i][3],
                    arrData[i][4],
                    arrData[i][5],
                    arrData[i][6],
                    arrData[i][7],
                    arrData[i][8],
                    arrData[i][9],
                    arrData[i][10],
                    arrData[i][11],
                    arrData[i][12],
                    arrData[i][13],
                    arrData[i][14],
                    arrData[i][15],
                    arrData[i][16],
                    arrData[i][17],
                    arrData[i][18],
                    arrData[i][19],
                    arrData[i][20],
                    arrData[i][21],
                    arrData[i][22],
                    arrData[i][23],
                    arrData[i][24],
                    arrData[i][25],
                    arrData[i][26],
                    arrData[i][27],
                    arrData[i][28],
                    arrData[i][29],
                    arrData[i][30],
                    arrData[i][31],
                    arrData[i][32]
                );
            }

            var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
                if (err) {
                    winston.log('error', err);
                }
                else {
                    var request = new sql.Request(connection);
                    request.input('ClientId', sql.BigInt, req.body.hdnClientID);
                    request.input('Employees', Import);
                    request.execute('prcEmployeesBulkSave', function (err, recordsets, returnValue, affected) {
                        connection.close();
                        if (err) {
                            winston.log('error', err);
                        }
                        else {
                            try {
                                socketio.emit('GetEmployeePage');
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