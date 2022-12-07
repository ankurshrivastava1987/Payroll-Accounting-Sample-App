exports.ViewAllAllowanceStatusSetup2s = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/AllowanceStatusSetup2/ViewAllAllowanceStatusSetup2s.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Allowance Status Setup 2',
        PageHeading: 'Allowance Status Setup 2',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewAllowanceStatusSetup2 = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/AllowanceStatusSetup2/ViewAllowanceStatusSetup2.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Allowance Status 2',
        PageHeading: 'View Allowance Status 2',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        AllowanceStatusSetupId: req.params.AllowanceStatusSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditAllowanceStatusSetup2 = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/AllowanceStatusSetup2/AllowanceStatusSetup2.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Allowance Status 2',
        PageHeading: 'Edit Allowance Status 2',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        AllowanceStatusSetupId: req.params.AllowanceStatusSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddAllowanceStatusSetup2 = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/AllowanceStatusSetup2/AllowanceStatusSetup2.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Allowance Status 2',
        PageHeading: 'Add Allowance Status 2',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        AllowanceStatusSetupId: 0,
        Environment: Configuration.Environment
    }, res);
}