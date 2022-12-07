exports.PayrollTaxFormsPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Public/PayrollTaxForms.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Tax Forms',
        PageHeading: 'Payroll Tax Forms',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}