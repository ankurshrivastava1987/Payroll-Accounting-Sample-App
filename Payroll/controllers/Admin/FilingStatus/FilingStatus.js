exports.ViewAllFilingStatuses = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/FilingStatus/ViewAllFilingStatuses.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Filing Statuses',
        PageHeading: 'Filing Statuses',
        reorderEnabled: false,        
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,            
        Environment: Configuration.Environment
    }, res);
}

exports.ViewFilingStatus = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/FilingStatus/ViewFilingStatus.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Filing Status',
        PageHeading: 'View Filing Status',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,            
        FilingStatusId: req.params.FilingStatusId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditFilingStatus = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/FilingStatus/FilingStatus.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Filing Status',
        PageHeading: 'Edit Filing Status',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        FilingStatusId: req.params.FilingStatusId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddFilingStatus = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/FilingStatus/FilingStatus.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Filing Status',
        PageHeading: 'Add Filing Status',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        FilingStatusId: 0,        
        Environment: Configuration.Environment
    }, res);
}