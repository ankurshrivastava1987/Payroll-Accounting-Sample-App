exports.ViewAllExemptionAllowances = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/ExemptionAllowance/ViewAllExemptionAllowances.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Exemption Allowance',
        PageHeading: 'Exemption Allowance',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewExemptionAllowance = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/ExemptionAllowance/ViewExemptionAllowance.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Exemption Allowance',
        PageHeading: 'View Exemption Allowance',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        ExemptionAllowanceId: req.params.ExemptionAllowanceId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditExemptionAllowance = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/ExemptionAllowance/ExemptionAllowance.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Exemption Allowance',
        PageHeading: 'Edit Exemption Allowance',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        ExemptionAllowanceId: req.params.ExemptionAllowanceId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddExemptionAllowance = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/ExemptionAllowance/ExemptionAllowance.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Exemption Allowance',
        PageHeading: 'Add Exemption Allowance',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        ExemptionAllowanceId: 0,
        Environment: Configuration.Environment
    }, res);
}