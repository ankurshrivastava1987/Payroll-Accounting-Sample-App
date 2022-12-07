exports.PlansPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Client/Plans.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Plans',
        PageHeading: 'Plans',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}