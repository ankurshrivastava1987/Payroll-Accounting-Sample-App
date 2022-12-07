exports.ViewAllStandardDeductions = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/StandardDeduction/ViewAllStandardDeductions.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Standard Deduction',
        PageHeading: 'Standard Deduction',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewStandardDeduction = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/StandardDeduction/ViewStandardDeduction.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Standard Deduction',
        PageHeading: 'View Standard Deduction',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        StandardDeductionId: req.params.StandardDeductionId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditStandardDeduction = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/StandardDeduction/StandardDeduction.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Standard Deduction',
        PageHeading: 'Edit Standard Deduction',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        StandardDeductionId: req.params.StandardDeductionId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddStandardDeduction = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/StandardDeduction/StandardDeduction.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Standard Deduction',
        PageHeading: 'Add Standard Deduction',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        StandardDeductionId: 0,
        Environment: Configuration.Environment
    }, res);
}