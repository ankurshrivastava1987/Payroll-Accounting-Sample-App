exports.ForgotPasswordPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Public/ForgotPassword.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Forgot Password',
        PageHeading: 'Forgot Password',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}