exports.ViewEmployeeReportsMenu = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/Reports/ViewEmployeeReportsMenu.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Employee Reports Menu',
        PageHeading: 'View Employee Reports Menu',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}
exports.ViewEmployerReportsMenu = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/Reports/ViewEmployerReportsMenu.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Employer Reports Menu',
        PageHeading: 'View Employer Reports Menu',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}