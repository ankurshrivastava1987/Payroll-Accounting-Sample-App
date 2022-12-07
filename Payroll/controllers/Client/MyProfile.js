exports.MyProfilePage = function (req, res) {
    var template = Marko.load(require.resolve('../../views/Client/MyProfile.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-My Profile',
        PageHeading: 'My Profile',
        reorderEnabled: false,       
        CDNUrl: Configuration.CDNUrl,
        Environment: Configuration.Environment
    }, res);
}