exports.OurVisionPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Client/OurVision.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Our Vision',
        PageHeading: 'Our Vision',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}