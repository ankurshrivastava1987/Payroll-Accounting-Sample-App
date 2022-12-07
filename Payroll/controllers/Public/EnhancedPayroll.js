exports.EnhancedPayrollPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Public/EnhancedPayroll.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Enhanced Payroll',
        PageHeading: 'Enhanced Payroll',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}