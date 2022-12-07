exports.SetSessionPage = function (req, res) {
    req.session.ClientId = req.query.ClientId;
    res.redirect('/Client/Main.html#Dashboard');
}