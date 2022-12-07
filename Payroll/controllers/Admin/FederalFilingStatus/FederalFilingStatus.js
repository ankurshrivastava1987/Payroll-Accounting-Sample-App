exports.ViewAllFederalFilingStatuses = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/FederalFilingStatus/ViewAllFederalFilingStatuses.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Federal Filing Statuses',
        PageHeading: 'Federal Filing Statuses',
        reorderEnabled: false,        
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,            
        Environment: Configuration.Environment
    }, res);
}

exports.ViewFederalFilingStatus = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/FederalFilingStatus/ViewFederalFilingStatus.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Federal Filing Status',
        PageHeading: 'View Federal Filing Status',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,            
        FederalFilingStatusId: req.params.FederalFilingStatusId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditFederalFilingStatus = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/FederalFilingStatus/FederalFilingStatus.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Federal Filing Status',
        PageHeading: 'Edit Federal Filing Status',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        FederalFilingStatusId: req.params.FederalFilingStatusId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddFederalFilingStatus = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/FederalFilingStatus/FederalFilingStatus.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Federal Filing Status',
        PageHeading: 'Add Federal Filing Status',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        FederalFilingStatusId: 0,        
        Environment: Configuration.Environment
    }, res);
}