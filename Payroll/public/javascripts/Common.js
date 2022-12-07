var APIUrl = "http://localhost:1338";
var CDNUrl = "http://localhost:1338";
var HostUrl = "http://localhost:1338";
var socket = io.connect('http://localhost:1338');
//this.LogError = function (error) {
//    var params = { "moduleName": "Web", "message": error.message, "stackTrace": error.stack, "requestedUrl": window.location.href, "queryString": window.location.search, "browserInfo": GetBrowserInfo() + ' ' + $.browser.version, "userIp": GetIPAddress() };
//    $.ajax({
//        type: 'POST',
//        contentType: 'application/json; charset=utf-8',
//        url: 'http://localhost/LMS.Services/ErrorService.svc/Add',
//        data: JSON.stringify(params),
//        processData: false,
//        dataType: 'json',
//        async: true,
//        cache: false,
//        success: function (response) {
//        },
//        error: function (a, b, c) {
//            alert('LogError : ' + a.responseText);
//        }
//    });
//    return false;
//}

//this.GetBrowserInfo = function () {
//    try {
//        var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
//        // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
//        var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
//        var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
//        // At least Safari 3+: "[object HTMLElementConstructor]"
//        var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
//        var isIE = /*@cc_on!@*/ false || !!document.documentMode; // At least IE6
//        var browserName = 'Unknown';
//        if (isOpera == true) {
//            browserName = "Opera";
//        }
//        else if (isFirefox == true) {
//            browserName = "Firefox";
//        }
//        else if (isSafari == true) {
//            browserName = "Safari";
//        }
//        else if (isChrome == true) {
//            browserName = "Chrome";
//        }
//        else if (isIE == true) {
//            browserName = "InternetExplorer";
//        }
//        return browserName;
//    } catch (e) {
//        LogError(e);
//    }

//}

//this.GetIPAddress = function () {
//    try {
//        var xmlhttp;
//        if (window.XMLHttpRequest)
//            xmlhttp = new XMLHttpRequest();
//        else
//            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

//        xmlhttp.open("GET", "http://api.hostip.info/get_html.php", false);
//        xmlhttp.send();

//        var hostipInfo = xmlhttp.responseText.split("\n");

//        for (var i = 0; hostipInfo.length >= i; i++) {
//            var ipAddress = hostipInfo[i].split(":");
//            if (ipAddress[0] == "IP")
//                return ipAddress[1];
//        }
//        return false;
//    } catch (e) {
//        LogError(e);
//    }
//}

//var sess_pollInterval = 60000;
//var sess_expirationMinutes = 20;
//var sess_warningMinutes = 5;
//var sess_intervalID;
//var sess_lastActivity;

//this.initSession = function () {
//    try {
//        sess_lastActivity = new Date();
//        sessSetInterval();
//        $(document).bind('keypress.session', function (ed, e) {
//            sessKeyPressed(ed, e);
//        });
//    } catch (e) {
//        LogError(e);
//    }
//}

//this.sessSetInterval = function () {
//    try {
//        sess_intervalID = setInterval('sessInterval()', sess_pollInterval);
//    } catch (e) {
//        LogError(e);
//    }
//}

//this.sessClearInterval = function () {
//    try {
//        clearInterval(sess_intervalID);
//    } catch (e) {
//        LogError(e);
//    }
//}

//this.sessKeyPressed = function (ed, e) {
//    try {
//        sess_lastActivity = new Date();
//    } catch (e) {
//        LogError(e);
//    }
//}

//this.sessLogOut = function () {
//    try {
//        window.location.href = '/Logout.aspx';
//    } catch (e) {
//        LogError(e);
//    }
//}

//this.sessInterval = function () {
//    try {
//        var now = new Date();
//        //get milliseconds of differneces
//        var diff = now - sess_lastActivity;
//        //get minutes between differences
//        var diffMins = (diff / 1000 / 60);
//        if (diffMins >= sess_warningMinutes) {
//            //warn before expiring
//            //stop the timer
//            sessClearInterval();
//            //prompt for attention
//            var active = confirm('Your session will expire in ' + (sess_expirationMinutes - sess_warningMinutes) + ' minutes (as of ' + now.toTimeString() + '), press OK to remain logged in ' + 'or press Cancel to log off. \nIf you are logged off any changes will be lost.');
//            if (active == true) {

//                now = new Date();
//                diff = now - sess_lastActivity;
//                diffMins = (diff / 1000 / 60);
//                if (diffMins > sess_expirationMinutes) {
//                    sessLogOut();
//                }
//                else {
//                    initSession();
//                    sessSetInterval();
//                    sess_lastActivity = new Date();
//                }
//            }
//            else {
//                sessLogOut();
//            }
//        }
//    } catch (e) {
//        LogError(e);
//    }
//}

//this.DateDiffDays = function (date1, date2) {
//    //Get 1 day in milliseconds
//    var oneDay = 1000 * 60 * 60 * 24;

//    // Convert both dates to milliseconds
//    var date1_ms = date1.getTime();
//    var date2_ms = date2.getTime();

//    // Calculate the difference in milliseconds
//    var difference_ms = date2_ms - date1_ms;

//    // Convert back to days and return
//    return Math.round(difference_ms / oneDay);
//}


function CallService(serviceName, methodName, parameters, successMethod, asyncValue) {
    $.ajax({
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: APIUrl + "/Payroll.Services/" + serviceName + "/" + methodName,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Key', parseInt($.localStorage.get('UserId'), 10));
            xhr.setRequestHeader('X-Access-Token', $.localStorage.get('Token'));
        },  
        data: JSON.stringify(parameters),
        processData: false,
        dataType: 'json',
        async: asyncValue,
        success: function (response) {
            successMethod(response);
        },
        error: function (a, b, c) {
            console.log(a);
            console.log(b);
            console.log(c);
            alert(a.responseText);           
        }
    });
}
function CallService1(serviceName, methodName, parameters) {
    var result;
    $.ajax({
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: APIUrl + "/Payroll.Services/" + serviceName + "/" + methodName,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Key', parseInt($.localStorage.get('UserId'), 10));
            xhr.setRequestHeader('X-Access-Token', $.localStorage.get('Token'));
        },  
        data: JSON.stringify(parameters),
        processData: false,
        dataType: 'json',
        async: false,        
        success: function (response) {
            result = response;
        },
        error: function (a, b, c) {            
        }
    });    
    return result;
}
//$(".integer").on("keypress keyup blur", function (event) {
//    $(this).val($(this).val().replace(/[^\d].+/, ""));
//    if ((event.which < 48 || event.which > 57)) {
//        event.preventDefault();
//    }
//    if ($(this).val() == '') {
//        $(this).val('0');
//    }
//});
$('.integer').keydown(function (event) {
    var kc, num, rt = false;
    kc = event.keyCode;
    if (kc == 8 || kc == 9 || ((kc > 47 && kc < 58) || (kc > 95 && kc < 106))) rt = true;
    return rt;
})
    .bind('blur', function () {
    num = parseInt($(this).val());
    num = isNaN(num) ? '0' : num;
    if (num && num < 0) num = num * -1;
    $(this).val(num);
});
$('.decimal').keypress(function (event) {
    return isNumber(event, this)
}).bind('blur', function () {
    var num;
    
    num = parseFloat($(this).val());
    
    num = isNaN(num) ? '0.00' : num;    
    if (num && num < 0) num = num * -1;
    $(this).val(parseFloat(num).toFixed(2));
});
function isNumber(evt, element) {
    
    var charCode = (evt.which) ? evt.which : event.keyCode
    
    if (
        //(charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
        (charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
        (charCode < 48 || charCode > 57))
        return false;
    
    return true;
}    
function GetQueryParameter(parameterName) {
    var queryString = window.location.search.substring(1);
    parameterName = parameterName + "=";
    if (queryString.length > 0) {
        var begin = queryString.indexOf(parameterName);
        if (begin != -1) {
            begin += parameterName.length;
            var end = queryString.indexOf("&", begin);
            if (end == -1) {
                end = queryString.length;
            }
            return unescape(queryString.substring(begin, end));
        }
    }
    return "";
}
function FormatDate(jsonFormat, dateFormat) {    
    return $.formatDateTime(dateFormat, new Date(Date(parseInt(jsonFormat.toString().replace('/Date(', '')))));  
}
function FormatDateUTC(UtcFormat) {    
    return (UtcFormat.substring(5, 7) + '/' + UtcFormat.substring(8, 10) + '/' + UtcFormat.substring(0, 4)) == '01/01/1900' ? '' : (UtcFormat.substring(5, 7) + '/' + UtcFormat.substring(8, 10) + '/' + UtcFormat.substring(0, 4));
}
function IntToDate(value)
{
    var myDate = new Date(value);
    return $.formatDateTime('mm/dd/yy gg:ii:ss a', myDate);
}
function FormatJSDate(value, format) {    
    return $.formatDateTime(format, value);
}