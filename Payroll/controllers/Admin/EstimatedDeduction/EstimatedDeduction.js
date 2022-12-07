exports.ViewAllEstimatedDeductions = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/EstimatedDeduction/ViewAllEstimatedDeductions.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Estimated Deduction',
        PageHeading: 'Estimated Deduction',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewEstimatedDeduction = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/EstimatedDeduction/ViewEstimatedDeduction.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Estimated Deduction',
        PageHeading: 'View Estimated Deduction',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        EstimatedDeductionId: req.params.EstimatedDeductionId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditEstimatedDeduction = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/EstimatedDeduction/EstimatedDeduction.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Estimated Deduction',
        PageHeading: 'Edit Estimated Deduction',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        EstimatedDeductionId: req.params.EstimatedDeductionId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddEstimatedDeduction = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/EstimatedDeduction/EstimatedDeduction.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Estimated Deduction',
        PageHeading: 'Add Estimated Deduction',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        EstimatedDeductionId: 0,
        Environment: Configuration.Environment
    }, res);
}