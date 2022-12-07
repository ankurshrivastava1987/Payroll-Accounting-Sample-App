exports.ViewAllPayChecks = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/PayCheck/ViewAllPayChecks.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Pay Checks',
        PageHeading: 'Pay Checks',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewPayCheck = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/PayCheck/ViewPayCheck.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Pay Check',
        PageHeading: 'View Pay Check',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        PayCheckId: req.params.PayCheckId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditPayCheck = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/PayCheck/EditPayCheck.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Pay Check',
        PageHeading: 'Edit Pay Check',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        PayCheckId: req.params.PayCheckId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddPayCheck = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/PayCheck/PayCheck.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Pay Check',
        PageHeading: 'Add Pay Check',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        PayCheckId: 0,
        Environment: Configuration.Environment
    }, res);
}