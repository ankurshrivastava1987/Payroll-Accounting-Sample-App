module.exports = function (req, res, next) {
    if (req.url.toLowerCase().indexOf('/download/')) {
        next();
    }
    else {
        if ((req.url.toLowerCase().indexOf('client/login') >= 0)
            || ((req.session.UserId > 0) && (req.session.UserType == 'Client'))) {
            if ((req.url.toLowerCase().indexOf('client/client') == -1)
                && ((req.session.ClientId == undefined) || (req.session.ClientId == 0))) {
                if ((req.url.toLowerCase().indexOf('client/login') >= 0)
                    || (req.url.toLowerCase().indexOf('client/logout') >= 0)
                    || (req.url.toLowerCase().indexOf('client/setsession') >= 0)
                    || (req.url.toLowerCase().indexOf('client/myprofile') >= 0)
                    || (req.url.toLowerCase().indexOf('client/changepassword') >= 0)
                    || (req.url.toLowerCase().indexOf('client/plans') >= 0)) {
                    next();
                }
                else {
                    res.redirect('/Client/Client/ViewAllClients');
                }
            }
            else {
                //var dtoClient;
                //requestify.request(Configuration.APIUrl + '/Payroll.Services/Client/ClientService.svc/GetObject',
                //    {
                //        method: 'POST',
                //        body: {
                //            ParentClientId: 0,
                //            ClientId: req.session.UserId
                //        },
                //        headers: {
                //            'X-Key': req.session.UserId,
                //            'X-Access-Token': req.session.Token
                //        }
                //    }).then(function (response) {
                //    dtoClient = response.getBody();
                //if (Helper.FormatDate(dtoClient.PaymentDueDate1, 'yyyy/mm/dd') < Helper.FormatDate(new Date(), 'yyyy/mm/dd'))
                //{
                //    res.redirect('/Client/Plans');
                //}
                //else
                //{
                next();
                //}               
                //});            
            }
        }
        else {
            res.redirect('/');
        }
    }
};
