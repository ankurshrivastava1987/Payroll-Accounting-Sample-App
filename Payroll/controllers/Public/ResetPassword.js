exports.ResetPasswordPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Public/ResetPassword.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Reset Password',
        PageHeading: 'Reset Password',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}