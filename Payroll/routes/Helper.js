var dateformat = require('dateformat');
exports.GetPageCount = function (PageSize, TotalRecords) {
    return Math.ceil(TotalRecords / PageSize);
}
exports.FormatDate = function (value, format) {
    if (value == undefined) {
        return '';
    }
    return dateformat(value, format);
}
exports.SendMail = function (SMTPHost, SMTPPort, SMTPUserName, SMTPPassword, SMTPSecure, SMTPFrom, To, Subject, MessageBody) {
    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');
    var transporter = nodemailer.createTransport(smtpTransport({
        host: SMTPHost,
        port: SMTPPort,
        secure : SMTPSecure,
        auth: {
            user: SMTPUserName,
            pass: SMTPPassword
        }
    }));   
    var mailOptions = {
        from: SMTPFrom, // sender address
        to: To, // list of receivers
        subject: Subject, // Subject line
        //text: text //, // plaintext body
        html: MessageBody // You can choose to send an HTML body instead
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            winston.log('error', err);
        } 
    });
}
exports.ConnectToFTP = function()
{
    var JSFtp = require("jsftp"); 
    var ftp = new JSFtp({
        host: Configuration.FTPHost,
        port: Configuration.FTPPort, // defaults to 21
        user: Configuration.FTPUserName, // defaults to "anonymous"
        pass: Configuration.FTPPassword // defaults to "@anonymous"        
    });   
    ftp.on('error', function (err) {
        console.log('onFTPError: ' + err)
    })
    return ftp;
}
exports.ConnectToFTP1 = function()
{
    var jsFtp = require('jsftp');    
    jsFtp = require('jsftp-rmr')(jsFtp);
    ftp = new jsFtp({
        host: Configuration.FTPHost,
        port: Configuration.FTPPort, // defaults to 21
        user: Configuration.FTPUserName, // defaults to "anonymous"
        pass: Configuration.FTPPassword // defaults to "@anonymous"
    });
    ftp.on('error', function (err) {
        console.log('onFTPError: ' + err)
    })
    return ftp;
}
