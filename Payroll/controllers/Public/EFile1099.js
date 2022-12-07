exports.EFile1099Page = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Public/EFile1099.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-E-File 1099',
        PageHeading: 'E-File 1099',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}