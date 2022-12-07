exports.ViewAllTaxSetups = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/TaxSetup/ViewAllTaxSetups.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Tax Setup',
        PageHeading: 'Tax Setup',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewTaxSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/TaxSetup/ViewTaxSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Tax Setup',
        PageHeading: 'View Tax Setup',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        TaxSetupId: req.params.TaxSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditTaxSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/TaxSetup/TaxSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Tax Setup',
        PageHeading: 'Edit Tax Setup',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        TaxSetupId: req.params.TaxSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddTaxSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/TaxSetup/TaxSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Tax Setup',
        PageHeading: 'Add Tax Setup',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        TaxSetupId: 0,
        Environment: Configuration.Environment
    }, res);
}