exports.ViewAllAllowanceChartSetups = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/AllowanceChartSetup/ViewAllAllowanceChartSetups.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Allowance Chart Setup',
        PageHeading: 'Allowance Chart Setup',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewAllowanceChartSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/AllowanceChartSetup/ViewAllowanceChartSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Allowance Chart',
        PageHeading: 'View Allowance Chart',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        AllowanceChartSetupId: req.params.AllowanceChartSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditAllowanceChartSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/AllowanceChartSetup/AllowanceChartSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Allowance Chart',
        PageHeading: 'Edit Allowance Chart',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        AllowanceChartSetupId: req.params.AllowanceChartSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddAllowanceChartSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/AllowanceChartSetup/AllowanceChartSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Allowance Chart',
        PageHeading: 'Add Allowance Chart',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        AllowanceChartSetupId: 0,
        Environment: Configuration.Environment
    }, res);
}