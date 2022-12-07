exports.ViewAllClients = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/Client/ViewAllClients.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Clients',
        PageHeading: 'Clients',
        reorderEnabled: false,        
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,            
        Environment: Configuration.Environment
    }, res);
}

exports.ViewClient = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/Client/ViewClient.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Client',
        PageHeading: 'View Client',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,            
        ClientId: req.params.ClientId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditClient = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/Client/Client.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Client',
        PageHeading: 'Edit Client',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        ClientId: req.params.ClientId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddClient = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/Client/Client.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Client',
        PageHeading: 'Add Client',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        ClientId: 0,        
        Environment: Configuration.Environment
    }, res);
}