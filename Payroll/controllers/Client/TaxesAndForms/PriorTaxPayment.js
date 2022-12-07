//router.get('/Client/TaxesAndForms/ViewAllPriorTaxPayment', ClientPriorTaxPayment.ViewAllPriorTaxPayment);

exports.ViewAllPriorTaxPayment = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/TaxesAndForms/ViewAllPriorTaxPayment.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'View All Prior Tax Payments',
        PageHeading: 'View All Prior Tax Payments',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.AddPriorTaxPayment = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/TaxesAndForms/PriorTaxPayment.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Prior Tax Payment',
        PageHeading: 'Add Prior Tax Payment',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        PriorTaxPaymentId: 0,
        Environment: Configuration.Environment
    }, res);
}

exports.EditPriorTaxPayment = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/TaxesAndForms/PriorTaxPayment.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll - Prior Tax Payment',
        PageHeading: 'Edit Prior Tax Payment',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        PriorTaxPaymentId: req.params.PriorTaxPaymentId,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewPriorTaxPayment = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/TaxesAndForms/ViewPriorTaxPayment.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Prior Tax Payment',
        PageHeading: 'View Prior Tax Payment',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        PriorTaxPaymentId: req.params.PriorTaxPaymentId,
        Environment: Configuration.Environment
    }, res);
}