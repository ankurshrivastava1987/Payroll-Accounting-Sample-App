exports.ViewAllFederalTaxSetups = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/FederalTaxSetup/ViewAllFederalTaxSetups.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Federal Tax Setup',
        PageHeading: 'Federal Tax Setup',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewFederalTaxSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/FederalTaxSetup/ViewFederalTaxSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Federal Tax',
        PageHeading: 'View Federal Tax',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        FederalTaxSetupId: req.params.FederalTaxSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditFederalTaxSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/FederalTaxSetup/FederalTaxSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Federal Tax',
        PageHeading: 'Edit Federal Tax',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        FederalTaxSetupId: req.params.FederalTaxSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddFederalTaxSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/FederalTaxSetup/FederalTaxSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Federal Tax',
        PageHeading: 'Add Federal Tax',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        FederalTaxSetupId: 0,
        Environment: Configuration.Environment
    }, res);
}