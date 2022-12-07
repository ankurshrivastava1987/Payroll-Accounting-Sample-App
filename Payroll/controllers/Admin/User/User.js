exports.ViewAllUsers = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/User/ViewAllUsers.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Users',
        PageHeading: 'Users',
        reorderEnabled: false,        
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,            
        Environment: Configuration.Environment
    }, res);
}

exports.ViewUser = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/User/ViewUser.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View User',
        PageHeading: 'View User',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,            
        UserId: req.params.UserId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditUser = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/User/User.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit User',
        PageHeading: 'Edit User',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        UserId: req.params.UserId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddUser = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/User/User.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add User',
        PageHeading: 'Add User',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        UserId: 0,        
        Environment: Configuration.Environment
    }, res);
}