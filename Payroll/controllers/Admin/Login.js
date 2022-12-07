exports.LoginPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Admin/Login.marko'));
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
//    requestify.post(Configuration.APIUrl + '/Payroll.Services/Admin/UserService.svc/ValidateUser', {
//        LoginId: req.body.LoginId,
//        Password: req.body.Password
//    }).then(function (response) {
//        body = response.getBody();
//        req.session.UserId = body.UserId;
//        req.session.UserType = 'Admin';
//        res.json(body);
//    });
   
//}
//function MakeRequest(LoginId, Password) {
//    var body;
//    requestify.post(Configuration.APIUrl + '/Payroll.Services/Admin/UserService.svc/ValidateUser', {
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
