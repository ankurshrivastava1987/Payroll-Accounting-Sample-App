exports.ViewAllPayScheduleRecurrences = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/PayScheduleRecurrence/ViewAllPayScheduleRecurrences.marko'));
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

exports.ViewPayScheduleRecurrence = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/PayScheduleRecurrence/ViewPayScheduleRecurrence.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Pay Schedule',
        PageHeading: 'View Pay Schedule',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,            
        PayScheduleRecurrenceId: req.params.PayScheduleRecurrenceId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditPayScheduleRecurrence = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/PayScheduleRecurrence/PayScheduleRecurrence.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Pay Schedule',
        PageHeading: 'Edit Pay Schedule',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        PayScheduleRecurrenceId: req.params.PayScheduleRecurrenceId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddPayScheduleRecurrence = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/PayScheduleRecurrence/PayScheduleRecurrence.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Pay Schedule',
        PageHeading: 'Add Pay Schedule',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        PayScheduleRecurrenceId: 0,        
        Environment: Configuration.Environment
    }, res);
}