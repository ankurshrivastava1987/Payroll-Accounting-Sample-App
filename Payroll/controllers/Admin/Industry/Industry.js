exports.ViewAllIndustries = function (req, res) {    
    var template = Marko.load(require.resolve('../../../views/Admin/Industry/ViewAllIndustries.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Industries',
        PageHeading: 'Industries',
        reorderEnabled: false,        
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,            
        Environment: Configuration.Environment
    }, res);    
}

exports.ViewIndustry = function (req, res) {  
    var template = Marko.load(require.resolve('../../../views/Admin/Industry/ViewIndustry.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Industry',
        PageHeading: 'View Industry',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,            
        IndustryId: req.params.IndustryId,
        Environment: Configuration.Environment
    }, res);    
}

exports.EditIndustry = function (req, res) {   
    var template = Marko.load(require.resolve('../../../views/Admin/Industry/Industry.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Edit Industry',
        PageHeading: 'Edit Industry',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        IndustryId: req.params.IndustryId,
        Environment: Configuration.Environment
    }, res);    
}

exports.AddIndustry = function (req, res) {    
    var template = Marko.load(require.resolve('../../../views/Admin/Industry/Industry.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Add Industry',
        PageHeading: 'Add Industry',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        IndustryId: 0,        
        Environment: Configuration.Environment
    }, res);
}