exports.LoginPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Client/Login.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Login',       
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}

//exports.LoginMe = function (req, res) {
//    var body;
//    //body = MakeRequest(req.body.LoginId, req.body.Password);
//    requestify.post(Configuration.APIUrl + '/Payroll.Services/Client/ClientService.svc/ValidateClient', {
//        LoginId: req.body.LoginId,
//        Password: req.body.Password
//    }).then(function (response) {
//        body = response.getBody();
//        req.session.UserId = body.ClientId;
//        req.session.UserType = 'Client';
//        res.json(body);
//    });
   
//}
//function MakeRequest(LoginId, Password) { 
//    var body;
//    requestify.post(Configuration.APIUrl + '/Payroll.Services/Client/ClientService.svc/ValidateClient', {
//        LoginId: LoginId,
//        Password: Password
//    }).then(function (response) {
//        body = response.getBody();
//    });
//    while (body === undefined) {
//        require('deasync').runLoopOnce();
//    }
//    return (body);
//}
