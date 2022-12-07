exports.HomePage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Public/Home.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Home',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);       
}