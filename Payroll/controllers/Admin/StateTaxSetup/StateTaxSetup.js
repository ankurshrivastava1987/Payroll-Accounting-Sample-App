exports.ViewAllStateTaxSetups = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/StateTaxSetup/ViewAllStateTaxSetups.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-State Tax Setup',
        PageHeading: 'State Tax Setup',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewStateTaxSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/StateTaxSetup/ViewStateTaxSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View State Tax',
        PageHeading: 'View State Tax',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        StateTaxSetupId: req.params.StateTaxSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditStateTaxSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/StateTaxSetup/StateTaxSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit State Tax',
        PageHeading: 'Edit State Tax',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        StateTaxSetupId: req.params.StateTaxSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddStateTaxSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/StateTaxSetup/StateTaxSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add State Tax',
        PageHeading: 'Add State Tax',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        StateTaxSetupId: 0,
        Environment: Configuration.Environment
    }, res);
}