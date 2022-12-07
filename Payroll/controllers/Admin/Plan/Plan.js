exports.ViewAllPlans = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/Plan/ViewAllPlans.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Plans',
        PageHeading: 'Plans',
        reorderEnabled: false,        
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,            
        Environment: Configuration.Environment
    }, res);
}

exports.ViewPlan = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/Plan/ViewPlan.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Plan',
        PageHeading: 'View Plan',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,            
        PlanId: req.params.PlanId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditPlan = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/Plan/Plan.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Plan',
        PageHeading: 'Edit Plan',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        PlanId: req.params.PlanId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddPlan = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/Plan/Plan.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Plan',
        PageHeading: 'Add Plan',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        PlanId: 0,        
        Environment: Configuration.Environment
    }, res);
}