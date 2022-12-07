exports.ViewAllEmployees = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/Employee/ViewAllEmployees.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Employees',
        PageHeading: 'Employees',
        reorderEnabled: false,        
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,            
        Environment: Configuration.Environment
    }, res);
}

exports.ViewEmployee = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/Employee/ViewEmployee.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Employee',
        PageHeading: 'View Employee',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,            
        EmployeeId: req.params.EmployeeId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditEmployee = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/Employee/Employee.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Employee',
        PageHeading: 'Edit Employee',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        EmployeeId: req.params.EmployeeId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddEmployee = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/Employee/Employee.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Employee',
        PageHeading: 'Add Employee',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        EmployeeId: 0,        
        Environment: Configuration.Environment
    }, res);
}