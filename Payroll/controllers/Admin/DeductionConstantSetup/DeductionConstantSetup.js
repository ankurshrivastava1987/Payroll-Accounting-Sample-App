exports.ViewAllDeductionConstantSetups = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/DeductionConstantSetup/ViewAllDeductionConstantSetups.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Deduction Constant Setup',
        PageHeading: 'Deduction Constant Setup',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewDeductionConstantSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/DeductionConstantSetup/ViewDeductionConstantSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Deduction Constant',
        PageHeading: 'View Deduction Constant',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        DeductionConstantSetupId: req.params.DeductionConstantSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditDeductionConstantSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/DeductionConstantSetup/DeductionConstantSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Deduction Constant',
        PageHeading: 'Edit Deduction Constant',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        DeductionConstantSetupId: req.params.DeductionConstantSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddDeductionConstantSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/DeductionConstantSetup/DeductionConstantSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Deduction Constant',
        PageHeading: 'Add Deduction Constant',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        DeductionConstantSetupId: 0,
        Environment: Configuration.Environment
    }, res);
}