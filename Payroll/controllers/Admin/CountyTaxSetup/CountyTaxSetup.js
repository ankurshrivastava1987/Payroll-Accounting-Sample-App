exports.ViewAllCountyTaxSetups = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/CountyTaxSetup/ViewAllCountyTaxSetups.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-County Tax Setup',
        PageHeading: 'County Tax Setup',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewCountyTaxSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/CountyTaxSetup/ViewCountyTaxSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View County Tax',
        PageHeading: 'View County Tax',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        CountyTaxSetupId: req.params.CountyTaxSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditCountyTaxSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/CountyTaxSetup/CountyTaxSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit County Tax',
        PageHeading: 'Edit County Tax',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        CountyTaxSetupId: req.params.CountyTaxSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddCountyTaxSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/CountyTaxSetup/CountyTaxSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add County Tax',
        PageHeading: 'Add County Tax',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        CountyTaxSetupId: 0,
        Environment: Configuration.Environment
    }, res);
}