exports.ViewSetUpLink = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Client/SetUp/SetUp.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Set Up',
        PageHeading: 'Set up',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        //ServiceCancellationId: 0,
        Environment: Configuration.Environment
    }, res);
}