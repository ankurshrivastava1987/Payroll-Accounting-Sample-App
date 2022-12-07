exports.GetThingsToDo = function (req, res) {
    var Items;
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            var query = req.body;
            request.input('ParentClientId', sql.BigInt, parseInt(req.headers['x-key'], 10));
            request.input('ClientId', sql.BigInt, query.ClientId);           
            request.execute('prcThingsToDo', function (err, recordsets, returnValue, affected) {
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

function ValidateData(arrData) {
    for (i = 0; i < arrData.length; i++) {       
        arrData[i].Item = arrData[i].Item == null ? '' : arrData[i].Item;
    }
    return arrData;
}