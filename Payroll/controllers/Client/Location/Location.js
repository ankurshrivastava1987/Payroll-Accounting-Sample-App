exports.ViewAllLocations = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/Location/ViewAllLocations.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Locations',
        PageHeading: 'Locations',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewLocation = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/Location/ViewLocation.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Location',
        PageHeading: 'View Location',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        LocationId: req.params.LocationId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditLocation = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/Location/Location.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Location',
        PageHeading: 'Edit Location',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        LocationId: req.params.LocationId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddLocation = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/Location/Location.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Location',
        PageHeading: 'Add Location',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        LocationId: 0,
        Environment: Configuration.Environment
    }, res);
}