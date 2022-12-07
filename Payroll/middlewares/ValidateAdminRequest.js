module.exports = function (req, res, next) {   
    if ((req.url.toLowerCase().indexOf('admin/login') >= 0) ||((req.session.UserId > 0) && (req.session.UserType == 'Admin'))) {
        next();
    }
    else {
        res.redirect('/Admin/Login');
    }
};
