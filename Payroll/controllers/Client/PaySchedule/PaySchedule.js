exports.ViewAllPaySchedules = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/PaySchedule/ViewAllPaySchedules.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Pay Schedules',
        PageHeading: 'Pay Schedules',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewPaySchedule = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/PaySchedule/ViewPaySchedule.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Pay Schedule',
        PageHeading: 'View Pay Schedule',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        PayScheduleId: req.params.PayScheduleId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditPaySchedule = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/PaySchedule/PaySchedule.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Pay Schedule',
        PageHeading: 'Edit Pay Schedule',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        PayScheduleId: req.params.PayScheduleId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddPaySchedule = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/PaySchedule/PaySchedule.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Pay Schedule',
        PageHeading: 'Add Pay Schedule',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        PayScheduleId: 0,
        Environment: Configuration.Environment
    }, res);
}