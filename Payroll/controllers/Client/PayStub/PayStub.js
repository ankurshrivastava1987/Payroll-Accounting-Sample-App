exports.ViewAllPayStubs = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/PayStub/ViewAllPayStubs.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Pay Stubs',
        PageHeading: 'Pay Stubs',
        reorderEnabled: false,        
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,            
        Environment: Configuration.Environment
    }, res);
}

exports.ViewPayStub = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/PayStub/ViewPayStub.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Pay Stub',
        PageHeading: 'View Pay Stub',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,            
        PayStubId: req.params.PayStubId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditPayStub = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/PayStub/PayStub.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Pay Stub',
        PageHeading: 'Edit Pay Stub',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        PayStubId: req.params.PayStubId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddPayStub = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/PayStub/PayStub.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Pay Stub',
        PageHeading: 'Add Pay Stub',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        PayStubId: 0,        
        Environment: Configuration.Environment
    }, res);
}