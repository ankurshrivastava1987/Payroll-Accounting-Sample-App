exports.ViewAllAllowanceStatusSetup1s = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/AllowanceStatusSetup1/ViewAllAllowanceStatusSetup1s.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Allowance Status Setup 1',
        PageHeading: 'Allowance Status Setup 1',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewAllowanceStatusSetup1 = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/AllowanceStatusSetup1/ViewAllowanceStatusSetup1.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Allowance Status 1',
        PageHeading: 'View Allowance Status 1',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        AllowanceStatusSetupId: req.params.AllowanceStatusSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditAllowanceStatusSetup1 = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/AllowanceStatusSetup1/AllowanceStatusSetup1.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Allowance Status 1',
        PageHeading: 'Edit Allowance Status 1',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        AllowanceStatusSetupId: req.params.AllowanceStatusSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddAllowanceStatusSetup1 = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/AllowanceStatusSetup1/AllowanceStatusSetup1.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Allowance Status 1',
        PageHeading: 'Add Allowance Status 1',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        AllowanceStatusSetupId: 0,
        Environment: Configuration.Environment
    }, res);
}