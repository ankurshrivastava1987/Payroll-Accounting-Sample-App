exports.SignUpPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Public/SignUp.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Sign Up',
        PageHeading: 'Sign Up',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        PlanId: req.params.PlanId,
        PlanType: req.params.PlanType,
        Environment: Configuration.Environment
    }, res);
}