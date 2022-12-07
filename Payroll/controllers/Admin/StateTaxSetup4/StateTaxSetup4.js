exports.ViewAllStateTaxSetup4s = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/StateTaxSetup4/ViewAllStateTaxSetup4s.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-State Tax Setup 4',
        PageHeading: 'State Tax Setup 4',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewStateTaxSetup4 = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/StateTaxSetup4/ViewStateTaxSetup4.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View State Tax 4',
        PageHeading: 'View State Tax 4',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        StateTaxSetupId: req.params.StateTaxSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditStateTaxSetup4 = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/StateTaxSetup4/StateTaxSetup4.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit State Tax 4',
        PageHeading: 'Edit State Tax 4',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        StateTaxSetupId: req.params.StateTaxSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddStateTaxSetup4 = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/StateTaxSetup4/StateTaxSetup4.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add State Tax 4',
        PageHeading: 'Add State Tax 4',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        StateTaxSetupId: 0,
        Environment: Configuration.Environment
    }, res);
}