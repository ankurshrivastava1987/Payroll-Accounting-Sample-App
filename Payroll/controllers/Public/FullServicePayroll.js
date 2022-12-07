exports.FullServicePayrollPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Public/FullServicePayroll.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Full Service Payroll',
        PageHeading: 'Full Service Payroll',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}