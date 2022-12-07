exports.W2FormPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Public/W2Form.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-W2-Form',
        PageHeading: 'W2-Form',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}