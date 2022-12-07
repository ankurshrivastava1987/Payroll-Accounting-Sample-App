exports.ContactUsPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Public/ContactUs.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Contact Us',
        PageHeading: 'Contact Us',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}