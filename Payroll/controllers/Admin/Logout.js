exports.LogoutPage = function (req, res) {
    req.session = null;
    res.redirect('/Admin/Login');
}
