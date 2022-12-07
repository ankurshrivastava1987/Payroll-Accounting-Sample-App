exports.CareersPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Client/Careers.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Careers',
        PageHeading: 'Careers',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}