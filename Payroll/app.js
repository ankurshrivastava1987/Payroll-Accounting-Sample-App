process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});
global.winston = require('winston');
winston.add(winston.transports.File, { filename: __dirname + '/public/Log.txt' });

global.Configuration = require('./routes/Configuration');
global.Helper = require('./routes/Helper');
global.accounting = require('accounting');
global.sql = require('mssql');
global.requestify = require('requestify');
global.Marko = require('marko');
require('marko/compiler').defaultOptions.preserveWhitespace = false;
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
http.globalAgent.maxSockets = Infinity;
var app = express();
var cookieSession = require('cookie-session');

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));

app.set('env', Configuration.Environment);
if (Configuration.Environment != 'development') {
    if (Configuration.EnableCompression) {
        var compression = require('compression');
        app.use(compression({ threshold: 0 }));
    }
    if (Configuration.EnableMinify) {
        var minify = require('express-minify');
        app.use(minify({ cache: false }));
    }
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

delete http.OutgoingMessage.prototype.flush;

app.all('/*', function (req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});
app.all('/Payroll.Services/Admin/*', [require('./middlewares/ValidateAdminAPIRequest')]);
app.all('/Payroll.Services/Client/*', [require('./middlewares/ValidateClientAPIRequest')]);
app.all('/Admin/*', [require('./middlewares/ValidateAdminRequest')]);
app.all('/Client/*', [require('./middlewares/ValidateClientRequest')]);
app.use('/', require('./routes'));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

app.set('port', process.env.PORT || 1339);
if (Configuration.ClusterMode == true) {
    var sticky = require('sticky-cluster'),
        options = {
            concurrency: require('os').cpus().length,
            port: app.get('port'),
            debug: true
        };
    
    function startFn(callback) {
        var server = http.createServer(app);
        global.socketio = require('socket.io')(server);
        process.env.REDISCLOUD_URL = "pub-redis-13472.us-east-1-4.2.ec2.garantiadata.com";
        var redis = require('redis').createClient;
        var adapter = require('socket.io-redis');
        var pub = redis(13472, process.env.REDISCLOUD_URL, { auth_pass: "sanjeeva" });
        var sub = redis(13472, process.env.REDISCLOUD_URL, { return_buffers: true, auth_pass: "sanjeeva" });
        socketio.adapter(adapter({ pubClient: pub, subClient: sub }));
        callback(server);
    }
    sticky(startFn, options);
}
else {
    var server = app.listen(app.get('port'), function () {
        console.log('Express server listening on port ' + server.address().port);
    });
    global.socketio = require('socket.io')().listen(server);
}
//var JSFtp = require("jsftp");                        
//var ftp = new JSFtp({
//    host: "takasoft.net",
//    port: 21, // defaults to 21
//    user: "takasbnq", // defaults to "anonymous"
//    pass: "sanjeevani143" // defaults to "@anonymous"
//});
//Ftp.ls("./httpdocs", function (err, res) {
//    res.forEach(function (file) {
//        console.log(file.name);
//    });
//});
//var base64Data = query.FileData.replace(/^data:text\/plain;base64,/, "");
//var binaryData = new Buffer(base64Data, 'base64');
//ftp.put(binaryData, './CDN/file.txt', function (hadError) {
//    if (!hadError)
//        console.log("File transferred successfully!");
//});
//Ftp.ls("./httpdocs", function (err, res) {
//Ftp.ls("./httpdocs", function (err, res) {
//ftp.raw.mkd("./httpdocs/Documents", function (err, data) {
//    if (err) return console.error(err);

//    console.log(data.text); // Show the FTP response text to the user
//    console.log(data.code); // Show the FTP response code to the user
//});       
//    var ftp = new JSFtp({
//    host: "takasoft.net",
//    port: 21, // defaults to 21
//    user: "takasbnq", // defaults to "anonymous"
//    pass: "sanjeevani143" // defaults to "@anonymous"
//});
//ftp.raw.mkd("./httpdocs/Documents/sanjeeva", function (err, data) {
//    if (err) return console.error(err);

//    console.log(data.text); // Show the FTP response text to the user
//    console.log(data.code); // Show the FTP response code to the user
//});   
module.exports = app;
