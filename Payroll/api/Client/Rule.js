exports.GetAll = function (req, res) {   
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ClientId', sql.BigInt, query.ClientId);            
            request.execute('prcRuleGetAll', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {                                        
                        res.json(ValidateData(recordsets[0]));
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

            var Rules = new sql.Table()
            Rules.columns.add('RuleId', sql.BigInt);
            Rules.columns.add('PayStubId', sql.BigInt);           
            var arrRules = query.Rules.split(String.fromCharCode(135));
            if (arrRules[0] == '') {
                arrRules.splice(0, 1);
            }
            for (var i = 0; i < arrRules.length; i++) {
                var arrRule = arrRules[i].split(String.fromCharCode(134));
                if (arrRule[1] != "0") {
                    Rules.rows.add(arrRule[0], arrRule[1]);
                }
            } 
            request.input('ClientId', sql.BigInt, query.ClientId);           
            request.input('Rules', Rules);
            request.execute('prcRuleSave', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        res.json(true);
                        //socketio.emit('GetRulePage');
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
        arrData[i].RuleId = arrData[i].RuleId == null ? 0 : arrData[i].RuleId;
        arrData[i].RuleCode = arrData[i].RuleCode == null ? 0 : arrData[i].RuleCode;
        arrData[i].RuleName = arrData[i].RuleName == null ? '' : arrData[i].RuleName;
        arrData[i].PayStubId = arrData[i].PayStubId == null ? 0 : arrData[i].PayStubId;       
    }
    return arrData;
}