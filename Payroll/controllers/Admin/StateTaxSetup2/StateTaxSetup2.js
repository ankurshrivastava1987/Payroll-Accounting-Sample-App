exports.ViewAllStateTaxSetup2s = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/StateTaxSetup2/ViewAllStateTaxSetup2s.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-State Tax Setup 2',
        PageHeading: 'State Tax Setup 2',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewStateTaxSetup2 = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/StateTaxSetup2/ViewStateTaxSetup2.marko'));
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

exports.EditStateTaxSetup2 = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/StateTaxSetup2/StateTaxSetup2.marko'));
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

exports.AddStateTaxSetup2 = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/StateTaxSetup2/StateTaxSetup2.marko'));
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