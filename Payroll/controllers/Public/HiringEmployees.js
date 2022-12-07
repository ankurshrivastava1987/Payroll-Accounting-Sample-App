exports.HiringEmployeesPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Public/HiringEmployees.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Hiring Employees',
        PageHeading: 'Hiring Employees',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}