exports.PlansPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Public/Plans.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Plans',
        PageHeading: 'Plans',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        PlanId: req.params.PlanId,
        Environment: Configuration.Environment
    }, res);
}