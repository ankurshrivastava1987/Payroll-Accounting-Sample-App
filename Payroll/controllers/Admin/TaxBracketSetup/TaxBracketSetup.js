exports.ViewAllTaxBracketSetups = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/TaxBracketSetup/ViewAllTaxBracketSetups.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Tax Bracket Setup',
        PageHeading: 'Tax Bracket Setup',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewTaxBracketSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/TaxBracketSetup/ViewTaxBracketSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Tax Bracket',
        PageHeading: 'View Tax Bracket',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        TaxBracketSetupId: req.params.TaxBracketSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditTaxBracketSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/TaxBracketSetup/TaxBracketSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Tax Bracket',
        PageHeading: 'Edit Tax Bracket',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        TaxBracketSetupId: req.params.TaxBracketSetupId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddTaxBracketSetup = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/TaxBracketSetup/TaxBracketSetup.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Tax Bracket',
        PageHeading: 'Add Tax Bracket',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        TaxBracketSetupId: 0,
        Environment: Configuration.Environment
    }, res);
}