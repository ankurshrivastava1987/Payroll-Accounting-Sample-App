exports.ViewAllDepartments = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/Department/ViewAllDepartments.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Departments',
        PageHeading: 'Departments',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewDepartment = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/Department/ViewDepartment.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Department',
        PageHeading: 'View Department',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        DepartmentId: req.params.DepartmentId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditDepartment = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/Department/Department.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Department',
        PageHeading: 'Edit Department',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        DepartmentId: req.params.DepartmentId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddDepartment = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/Department/Department.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Department',
        PageHeading: 'Add Department',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        DepartmentId: 0,
        Environment: Configuration.Environment
    }, res);
}