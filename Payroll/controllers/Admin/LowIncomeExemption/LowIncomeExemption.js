exports.ViewAllLowIncomeExemptions = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/LowIncomeExemption/ViewAllLowIncomeExemptions.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Low Income Exemption',
        PageHeading: 'Low Income Exemption',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewLowIncomeExemption = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/LowIncomeExemption/ViewLowIncomeExemption.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Low Income Exemption',
        PageHeading: 'View Low Income Exemption',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        LowIncomeExemptionId: req.params.LowIncomeExemptionId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditLowIncomeExemption = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/LowIncomeExemption/LowIncomeExemption.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Low Income Exemption',
        PageHeading: 'Edit Low Income Exemption',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        LowIncomeExemptionId: req.params.LowIncomeExemptionId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddLowIncomeExemption = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/LowIncomeExemption/LowIncomeExemption.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Low Income Exemption',
        PageHeading: 'Add Low Income Exemption',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        LowIncomeExemptionId: 0,
        Environment: Configuration.Environment
    }, res);
}