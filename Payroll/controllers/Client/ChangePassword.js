exports.ChangePasswordPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Client/ChangePassword.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Change Password',
        PageHeading: 'Change Password',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}