exports.ViewDirectory = function (req, res) {
    var template = Marko.load(require.resolve('../../../../views/Client/Reports/EmployeeReports/ViewDirectory.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Directory',
        PageHeading: 'View Directory',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}
exports.ViewEmployeeDetails = function (req, res) {
    var template = Marko.load(require.resolve('../../../../views/Client/Reports/EmployeeReports/ViewEmployeeDetails.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Employee Details',
        PageHeading: 'View Employee Details',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewLastPayCheck = function (req, res) {
    var template = Marko.load(require.resolve('../../../../views/Client/Reports/EmployeeReports/LastPayCheck.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll - Last Pay Check',
        PageHeading: 'Last Pay Check',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.PayrollSummary = function (req, res) {
    var template = Marko.load(require.resolve('../../../../views/Client/Reports/EmployeeReports/PayrollSummary.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll - Payroll Summary',
        PageHeading: 'Payroll Summary',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.PayrollDetails = function (req, res) {
    var template = Marko.load(require.resolve('../../../../views/Client/Reports/EmployeeReports/PayrollDetails.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll - Payroll Details',
        PageHeading: 'Payroll Details',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}