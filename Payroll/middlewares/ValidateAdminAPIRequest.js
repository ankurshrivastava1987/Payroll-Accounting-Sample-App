var Configuration = require('../routes/Configuration');
var jwt = require('jwt-simple');
module.exports = function (req, res, next) {
    // When performing a cross domain request, you will recieve
    // a preflighted request first. This is to check if our the app
    // is safe. 

    // We skip the token outh for [OPTIONS] requests.
    //if(req.method == 'OPTIONS') next();

    var token = req.headers['x-access-token'];
    var key = req.headers['x-key'];

    if (token || key) {
        try {
            var decoded = jwt.decode(token, Configuration.TokenSecret);
            if (decoded.UserId != key) {
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Invalid Key"
                });
                return;
            }
            if (decoded.Expires <= Date.now()) {
                res.status(400);
                res.json({
                    "status": 400,
                    "message": "Token Expired"
                });
                return;
            }

            // Authorize the user to see if s/he can access our resources           
            //var dtoUser = new Object();
            var connection = new sql.Connection(Configuration.ConnectionString, function (err) {
                if (err) {
                    winston.log('error', err);
                }
                else {
                    var request = new sql.Request(connection);
                    request.input('UserId', sql.BigInt, key);                   
                    request.execute('prcUserValidateByUserIdGet', function (err, recordsets, returnValue, affected) {
                        connection.close();
                        if (err) {
                            winston.log('error', err);
                        }
                        else {
                            try {
                                if (recordsets[0].length > 0) {
                                    //dtoUser = ValidateData(recordsets[0])[0];
                                    //if (dtoUser) {
                                    if (req.url.toLowerCase().indexOf('/payroll.services/admin') >= 0) {
                                            next(); // To move to next middleware
                                        } else {
                                            res.status(403);
                                            res.json({
                                                "status": 403,
                                                "message": "Not Authorized"
                                            });
                                            return;
                                        }
                                    //} else {
                                    //    // No user with this name exists, respond back with a 401
                                    //    res.status(401);
                                    //    res.json({
                                    //        "status": 401,
                                    //        "message": "Invalid User"
                                    //    });
                                    //    return;
                                    //}
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
            

        } catch (err) {
            res.status(500);
            res.json({
                "status": 500,
                "message": "Oops something went wrong",
                "error": err
            });
        }
    } else {
        if (req.url.toLowerCase().indexOf('/download/') >= 0) {
            next(); // To move to next middleware
        }
        else {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid Token or Key"
            });
        }
        return;
    }
};
