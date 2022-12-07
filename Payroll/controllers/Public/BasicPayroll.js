exports.BasicPayrollPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Public/BasicPayroll.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Basic Payroll',
        PageHeading: 'Basic Payroll',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}