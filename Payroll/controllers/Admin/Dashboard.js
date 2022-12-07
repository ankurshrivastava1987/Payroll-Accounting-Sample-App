exports.DashboardPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Admin/Dashboard.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Dashboard',
        PageHeading: 'Dashboard',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}