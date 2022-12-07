exports.ViewAllRules = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/Rule/ViewAllRules.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Rules',
        PageHeading: 'Rules',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}