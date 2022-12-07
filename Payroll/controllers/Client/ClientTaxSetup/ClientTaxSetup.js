exports.ViewAllClientTaxSetups = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/ClientTaxSetup/ViewAllClientTaxSetups.marko'));
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

exports.ViewClientTaxSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/ClientTaxSetup/ViewClientTaxSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Tax Setup',
        PageHeading: 'View Tax Setup',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        ClientTaxSetupId: req.params.ClientTaxSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditClientTaxSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/ClientTaxSetup/ClientTaxSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Tax Setup',
        PageHeading: 'Edit Tax Setup',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        ClientTaxSetupId: req.params.ClientTaxSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddClientTaxSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/ClientTaxSetup/ClientTaxSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Tax Setup',
        PageHeading: 'Add Tax Setup',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        ClientTaxSetupId: 0,
        Environment: Configuration.Environment
    }, res);
}