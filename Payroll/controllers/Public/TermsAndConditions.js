exports.TermsAndConditionsPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Public/TermsAndConditions.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Terms And Conditions',
        PageHeading: 'Terms And Conditions',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}