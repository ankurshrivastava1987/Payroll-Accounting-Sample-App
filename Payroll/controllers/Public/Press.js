exports.PressPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Public/Press.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Press',
        PageHeading: 'Press',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}