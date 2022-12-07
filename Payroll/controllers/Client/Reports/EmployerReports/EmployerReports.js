exports.ViewTaxLiability = function (req, res) {
    var template = Marko.load(require.resolve('../../../../views/Client/Reports/EmployerReports/ViewTaxLiability.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Tax Liability',
        PageHeading: 'View Tax Liability',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,        
        Environment: Configuration.Environment
    }, res);
}
exports.ViewTaxWageSummary = function (req, res) {
    var template = Marko.load(require.resolve('../../../../views/Client/Reports/EmployerReports/ViewTaxWageSummary.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Tax and Wage Summary',
        PageHeading: 'View Tax and Wage Summary',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}
exports.ViewTaxWageDetail = function (req, res) {
    var template = Marko.load(require.resolve('../../../../views/Client/Reports/EmployerReports/ViewTaxWageDetail.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Tax and Wage Detail',
        PageHeading: 'View Tax and Wage Detail',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        TaxId: req.params.TaxId,
        StateId: req.params.StateId,
        Environment: Configuration.Environment
    }, res);
}
exports.ViewTotalPay = function (req, res) {
    var template = Marko.load(require.resolve('../../../../views/Client/Reports/EmployerReports/ViewTotalPay.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Total Pay',
        PageHeading: 'View Total Pay',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,       
        Environment: Configuration.Environment
    }, res);
}
exports.ViewTotalCost = function (req, res) {
    var template = Marko.load(require.resolve('../../../../views/Client/Reports/EmployerReports/ViewTotalCost.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Total Cost',
        PageHeading: 'View Total Cost',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewBillingSummary = function (req, res) {
    var template = Marko.load(require.resolve('../../../../views/Client/Reports/EmployerReports/ViewBillingSummary.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Billing Summary',
        PageHeading: 'View Billing Summary',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewDeductionsAndContributions = function (req, res) {
    var template = Marko.load(require.resolve('../../../../views/Client/Reports/EmployerReports/ViewDeductionsAndContributions.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Deductions And Contributions',
        PageHeading: 'View Deductions And Contributions',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}