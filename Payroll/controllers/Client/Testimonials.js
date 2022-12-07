exports.TestimonialsPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Client/Testimonials.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Testimonials',
        PageHeading: 'Testimonials',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}