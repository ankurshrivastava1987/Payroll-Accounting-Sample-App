exports.AboutUsPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Client/AboutUs.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-About Us',
        PageHeading: 'About Us',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}