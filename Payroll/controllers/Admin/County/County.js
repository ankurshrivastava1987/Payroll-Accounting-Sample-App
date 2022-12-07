exports.ViewAllCounties = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/County/ViewAllCounties.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Counties',
        PageHeading: 'Counties',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewCounty = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/County/ViewCounty.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View County',
        PageHeading: 'View County',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        CountyId: req.params.CountyId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditCounty = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/County/County.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit County',
        PageHeading: 'Edit County',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        CountyId: req.params.CountyId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddCounty = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/County/County.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add County',
        PageHeading: 'Add County',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        CountyId: 0,
        Environment: Configuration.Environment
    }, res);
}