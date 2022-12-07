exports.FAQsPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Public/FAQs.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-FAQs',
        PageHeading: 'FAQs',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}