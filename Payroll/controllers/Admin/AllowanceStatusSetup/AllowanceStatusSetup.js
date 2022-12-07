exports.ViewAllAllowanceStatusSetups = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/AllowanceStatusSetup/ViewAllAllowanceStatusSetups.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Allowance Status Setup',
        PageHeading: 'Allowance Status Setup',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewAllowanceStatusSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/AllowanceStatusSetup/ViewAllowanceStatusSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Allowance Status',
        PageHeading: 'View Allowance Status',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        AllowanceStatusSetupId: req.params.AllowanceStatusSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditAllowanceStatusSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/AllowanceStatusSetup/AllowanceStatusSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Allowance Status',
        PageHeading: 'Edit Allowance Status',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        AllowanceStatusSetupId: req.params.AllowanceStatusSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddAllowanceStatusSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/AllowanceStatusSetup/AllowanceStatusSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Allowance Status',
        PageHeading: 'Add Allowance Status',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        AllowanceStatusSetupId: 0,
        Environment: Configuration.Environment
    }, res);
}