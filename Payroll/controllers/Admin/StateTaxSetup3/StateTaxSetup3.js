exports.ViewAllStateTaxSetup3s = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/StateTaxSetup3/ViewAllStateTaxSetup3s.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-State Tax Setup 3',
        PageHeading: 'State Tax Setup 3',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewStateTaxSetup3 = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/StateTaxSetup3/ViewStateTaxSetup3.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View State Tax 3',
        PageHeading: 'View State Tax 3',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        StateTaxSetupId: req.params.StateTaxSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditStateTaxSetup3 = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/StateTaxSetup3/StateTaxSetup3.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit State Tax 3',
        PageHeading: 'Edit State Tax 3',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        StateTaxSetupId: req.params.StateTaxSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddStateTaxSetup3 = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/StateTaxSetup3/StateTaxSetup3.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add State Tax 3',
        PageHeading: 'Add State Tax 3',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        StateTaxSetupId: 0,
        Environment: Configuration.Environment
    }, res);
}