exports.OurMissionPage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Client/OurMission.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Our Mission',
        PageHeading: 'Our Mission',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}