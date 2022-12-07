exports.ThankYouPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Public/ThankYou.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Thank you',
        PageHeading: 'Thank you',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}