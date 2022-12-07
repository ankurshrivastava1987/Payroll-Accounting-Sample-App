var jwt = require('jwt-simple');
exports.ValidateUser = function (req, res) {
    var LoginId = req.body.LoginId || '';
    var Password = req.body.Password || '';
    if (LoginId == '' || Password == '') {
        res.status(401);
        res.json({ "status": 401, "message": "Invalid credentials" });
        return;
    }
    // Fire a query to your DB and check if the credentials are valid
    var dtoUser = new Object();
    var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
        if (err) {
            winston.log('error', err);
        }
        else {
            var request = new sql.Request(connection);
            request.input('LoginId', sql.VarChar(20), LoginId);
            request.input('Password', sql.VarChar(50), Password);
            request.execute('prcUserValidateGet', function (err, recordsets, returnValue, affected) {
                connection.close();
                if (err) {
                    winston.log('error', err);
                }
                else {
                    try {
                        if (recordsets[0].length > 0) {
                            dtoUser = ValidateData(recordsets[0])[0];
                            // If authentication is success, we will generate a token
                            // and dispatch it to the client
                            res.json(GenerateToken(dtoUser));
                        }
                        else
                        {
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
function ValidateData(arrData) {
    for (i = 0; i < arrData.length; i++) {
        arrData[i].UserCode = arrData[i].UserCode == null ? '' : arrData[i].UserCode;
        arrData[i].FullName = arrData[i].FullName == null ? '' : arrData[i].FullName;
        arrData[i].Address1 = arrData[i].Address1 == null ? '' : arrData[i].Address1;
        arrData[i].Address2 = arrData[i].Address2 == null ? '' : arrData[i].Address2;        
        arrData[i].CityName = arrData[i].CityName == null ? '' : arrData[i].CityName;
        arrData[i].StateId = arrData[i].StateId == null ? 0 : arrData[i].StateId;
        arrData[i].StateCode = arrData[i].StateCode == null ? '' : arrData[i].StateCode;
        arrData[i].StateName = arrData[i].StateName == null ? '' : arrData[i].StateName;
        arrData[i].ZipCode = arrData[i].ZipCode == null ? '' : arrData[i].ZipCode;
        arrData[i].ZipCodeExt = arrData[i].ZipCodeExt == null ? '' : arrData[i].ZipCodeExt;
        arrData[i].JobTitleName = arrData[i].JobTitleName == null ? '' : arrData[i].JobTitleName;
        arrData[i].WorkPhoneNo = arrData[i].WorkPhoneNo == null ? '' : arrData[i].WorkPhoneNo;
        arrData[i].WorkPhoneNoExt = arrData[i].WorkPhoneNoExt == null ? '' : arrData[i].WorkPhoneNoExt;
        arrData[i].CellPhoneNo = arrData[i].CellPhoneNo == null ? '' : arrData[i].CellPhoneNo;
        arrData[i].EMailId = arrData[i].EMailId == null ? '' : arrData[i].EMailId;
        arrData[i].LoginId = arrData[i].LoginId == null ? '' : arrData[i].LoginId;
        arrData[i].Password = arrData[i].Password == null ? '' : arrData[i].Password;
        arrData[i].Status = arrData[i].Status == null ? 'Inactive' : arrData[i].Status;
    }
    return arrData;
}
// private method
function GenerateToken(dtoUser) {
    var expires = expiresIn(7); // 7 days
    var token = jwt.encode({UserId: dtoUser.UserId, Expires: expires }, Configuration.TokenSecret);
    return { Token: token, UserId: dtoUser.UserId };
}

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}