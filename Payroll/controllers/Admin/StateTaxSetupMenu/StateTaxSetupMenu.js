exports.ViewStateTaxSetupMenu = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/StateTaxSetupMenu/ViewStateTaxSetupMenu.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View State Tax Setup Menu',
        PageHeading: 'View State Tax Setup Menu',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,      
        Environment: Configuration.Environment
    }, res);
}