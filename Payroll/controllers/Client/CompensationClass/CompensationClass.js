exports.ViewAllCompensationClasses = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/CompensationClass/ViewAllCompensationClasses.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Compensation Classes',
        PageHeading: 'Compensation Classes',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewCompensationClass = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/CompensationClass/ViewCompensationClass.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Compensation Class',
        PageHeading: 'View Compensation Class',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        CompensationClassId: req.params.CompensationClassId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditCompensationClass = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/CompensationClass/CompensationClass.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Compensation Class',
        PageHeading: 'Edit Compensation Class',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        CompensationClassId: req.params.CompensationClassId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddCompensationClass = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/CompensationClass/CompensationClass.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Compensation Class',
        PageHeading: 'Add Compensation Class',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        CompensationClassId: 0,
        Environment: Configuration.Environment
    }, res);
}