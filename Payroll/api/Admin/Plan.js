exports.GetPage = function (req, res) {
    var dtoPlanPage = new Object();
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
            request.execute('prcPlanGetPage', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        dtoPlanPage.Plans = ValidateData(recordsets[0]);
                        dtoPlanPage.TotalRecords = recordsets[1][0].TotalRecords;
                        res.json(dtoPlanPage);
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

            var features = new sql.Table()
            features.columns.add('FeatureId', sql.BigInt); 
            var arrFeatures = query.Features.split(',');
            if (arrFeatures[0] == '') { 
                arrFeatures.splice(0, 1);
            }
            for (var i = 0; i < arrFeatures.length; i++)
            {
                features.rows.add(arrFeatures[i]); 
            }
            
            var planCharges = new sql.Table()
            planCharges.columns.add('EffectiveDate', sql.VarChar(10));
            planCharges.columns.add('AmountPerMonth', sql.Decimal(18,2));
            planCharges.columns.add('AmountPerEmployeePerMonth', sql.Decimal(18, 2));
            planCharges.columns.add('AmountPerYear', sql.Decimal(18, 2));
            var arrPlanCharges = query.PlanCharges.split(String.fromCharCode(135));
            if (arrPlanCharges[0] == '') {
                arrPlanCharges.splice(0, 1);
            }
            for (var i = 0; i < arrPlanCharges.length; i++) {
                var arrPlanCharge = arrPlanCharges[i].split(String.fromCharCode(134));
                if (arrPlanCharge[5] == "0") {
                    planCharges.rows.add(arrPlanCharge[1], parseFloat(arrPlanCharge[2]), parseFloat(arrPlanCharge[3]), parseFloat(arrPlanCharge[4]));
                }
            }

            request.input('PlanId', sql.BigInt, query.PlanId);
            request.input('PlanCode', sql.BigInt, query.PlanCode);
            request.input('PlanName', sql.VarChar(50), query.PlanName);
            request.input('DisplayOrder', sql.BigInt, query.DisplayOrder);
            request.input('Status', sql.VarChar(10), query.Status);
            request.input('Features', features);
            request.input('PlanCharges', planCharges);
            request.execute('prcPlanSave', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);                    
                }
                else {
                    try {
                        socketio.emit('GetPlanPage');
                        if (query.PlanId > 0) {
                            socketio.emit('GetPlanObject', query.PlanId);
                        }
                        res.json(err?0:recordsets[0][0].PlanId);

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
            request.input('PlanId', sql.BigInt, query.PlanId);
            request.execute('prcPlanDelete', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        socketio.emit('GetPlanPage');
                        socketio.emit('GetPlanObject', query.PlanId);
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
            request.input('PlanId', sql.BigInt, query.PlanId);
            request.execute('prcPlanDeletable', function (err, recordsets, returnValue, affected) {
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
    var dtoPlan = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('PlanId', sql.BigInt, query.PlanId);
            request.execute('prcPlanGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoPlan = ValidateData(recordsets[0])[0];
                        }
                        res.json(dtoPlan);
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
            request.input('PlanId', sql.BigInt, query.PlanId);
            request.input('PlanName', sql.VarChar(50), query.PlanName);
            request.execute('prcPlanExist', function (err, recordsets, returnValue, affected) {
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
            request.input('PlanId', sql.BigInt, query.PlanId);
            request.input('PlanCode', sql.BigInt, query.PlanCode);
            request.execute('prcPlanExist1', function (err, recordsets, returnValue, affected) {
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
            request.execute('prcPlanGetLookup', function (err, recordsets, returnValue, affected) {
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

exports.GetAvailableFeatures = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('PlanId', sql.BigInt, query.PlanId);
            request.execute('prcPlanFeatureAvailableGet', function (err, recordsets, returnValue, affected) {
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

exports.GetSelectedFeatures = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('PlanId', sql.BigInt, query.PlanId);
            request.execute('prcPlanFeatureSelectedGet', function (err, recordsets, returnValue, affected) {
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
exports.GetFeatures = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('PlanId', sql.BigInt, query.PlanId);
            request.execute('prcPlanFeatureGet', function (err, recordsets, returnValue, affected) {
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
exports.GetPlanCharges = function (req, res) {
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('PlanId', sql.BigInt, query.PlanId);
            request.execute('prcPlanChargeGet', function (err, recordsets, returnValue, affected) {
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
        arrData[i].PlanCode = arrData[i].PlanCode == null? 0: arrData[i].PlanCode;
        arrData[i].PlanName = arrData[i].PlanName == null? '': arrData[i].PlanName;
        arrData[i].DisplayOrder = arrData[i].DisplayOrder == null? 0: arrData[i].DisplayOrder;
        arrData[i].Status = arrData[i].Status == null? 'Inactive': arrData[i].Status;
    }
    return arrData;
}