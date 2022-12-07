exports.ViewAllStateTaxSetup1s = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/StateTaxSetup1/ViewAllStateTaxSetup1s.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-State Tax Setup 1',
        PageHeading: 'State Tax Setup 1',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewStateTaxSetup1 = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/StateTaxSetup1/ViewStateTaxSetup1.marko'));
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

exports.EditStateTaxSetup1 = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/StateTaxSetup1/StateTaxSetup1.marko'));
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

exports.AddStateTaxSetup1 = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/StateTaxSetup1/StateTaxSetup1.marko'));
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