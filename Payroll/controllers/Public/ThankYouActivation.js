exports.ThankYouActivationPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Public/ThankYouActivation.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Thank you Activation',
        PageHeading: 'Thank you Activation',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}