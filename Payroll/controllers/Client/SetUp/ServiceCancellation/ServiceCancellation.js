exports.CreateServiceCancellation = function (req, res) {
    var template = Marko.load(require.resolve('../../../../views/Client/SetUp/ServiceCancellation/ServiceCancellation.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Service Cancellation',
        PageHeading: 'Create Service Cancellation Request',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        ServiceCancellationId: 0,
        Environment: Configuration.Environment
    }, res);
}