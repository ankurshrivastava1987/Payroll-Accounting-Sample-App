exports.LearnPayrollPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Public/LearnPayroll.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Learn Payroll',
        PageHeading: 'Learn Payroll',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}