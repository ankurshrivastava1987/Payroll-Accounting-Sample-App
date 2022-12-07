exports.ViewAllStates = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/State/ViewAllStates.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-States',
        PageHeading: 'States',
        reorderEnabled: false,        
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,            
        Environment: Configuration.Environment
    }, res);
}

exports.ViewState = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/State/ViewState.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View State',
        PageHeading: 'View State',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,            
        StateId: req.params.StateId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditState = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/State/State.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit State',
        PageHeading: 'Edit State',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        StateId: req.params.StateId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddState = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/State/State.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add State',
        PageHeading: 'Add State',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        StateId: 0,        
        Environment: Configuration.Environment
    }, res);
}