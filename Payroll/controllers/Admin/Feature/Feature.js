exports.ViewAllFeatures = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/Feature/ViewAllFeatures.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Features',
        PageHeading: 'Features',
        reorderEnabled: false,        
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,            
        Environment: Configuration.Environment
    }, res);
}

exports.ViewFeature = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/Feature/ViewFeature.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Feature',
        PageHeading: 'View Feature',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,            
        FeatureId: req.params.FeatureId,
        Environment: Configuration.Environment
    }, res);
}

exports.EditFeature = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/Feature/Feature.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Feature',
        PageHeading: 'Edit Feature',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        FeatureId: req.params.FeatureId,
        Environment: Configuration.Environment
    }, res);
}

exports.AddFeature = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/Feature/Feature.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Feature',
        PageHeading: 'Add Feature',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        FeatureId: 0,        
        Environment: Configuration.Environment
    }, res);
}