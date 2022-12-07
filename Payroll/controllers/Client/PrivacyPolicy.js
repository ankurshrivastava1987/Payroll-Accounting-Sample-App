exports.PrivacyPolicyPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Client/PrivacyPolicy.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Privacy Policy',
        PageHeading: 'Privacy Policy',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}