exports.ViewAllContractors = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/Contractor/ViewAllContractors.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Contractors',
        PageHeading: 'Contractors',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewContractor = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/Contractor/ViewContractor.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Contractor',
        PageHeading: 'View Contractor',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        ContractorId: req.params.ContractorId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditContractor = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/Contractor/Contractor.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Contractor',
        PageHeading: 'Edit Contractor',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        ContractorId: req.params.ContractorId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddContractor = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/Contractor/Contractor.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Contractor',
        PageHeading: 'Add Contractor',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        ContractorId: 0,
        Environment: Configuration.Environment
    }, res);
}