exports.ViewAllTaxSlabSetups = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/TaxSlabSetup/ViewAllTaxSlabSetups.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Tax Slab Setup',
        PageHeading: 'Tax Slab Setup',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewTaxSlabSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/TaxSlabSetup/ViewTaxSlabSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Tax Slab',
        PageHeading: 'View Tax Slab',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        TaxSlabSetupId: req.params.TaxSlabSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditTaxSlabSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/TaxSlabSetup/TaxSlabSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Tax Slab',
        PageHeading: 'Edit Tax Slab',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        TaxSlabSetupId: req.params.TaxSlabSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddTaxSlabSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/TaxSlabSetup/TaxSlabSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Tax Slab',
        PageHeading: 'Add Tax Slab',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        TaxSlabSetupId: 0,
        Environment: Configuration.Environment
    }, res);
}