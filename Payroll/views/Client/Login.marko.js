function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      __loadTag = __helpers.t,
      lasso_page = __loadTag(require("lasso/taglib/page-tag")),
      escapeXmlAttr = __helpers.xa,
      lasso_head = __loadTag(require("lasso/taglib/head-tag")),
      lasso_body = __loadTag(require("lasso/taglib/body-tag")),
      init_widgets = __loadTag(require("marko-widgets/taglib/init-widgets-tag")),
      browser_refresh = __loadTag(require("browser-refresh-taglib/refresh-tag"));

  return function render(data, out) {
    lasso_page({
        dirname: __dirname,
        filename: __filename
      }, out);

    out.w("<!DOCTYPE html> <html lang=\"en\"> <head> <title>Login</title> <meta charset=\"utf-8\"> <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1\"> <link type=\"text/css\" rel=\"stylesheet\" href=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/css/font-awesome.css\"> <link type=\"text/css\" rel=\"stylesheet\" href=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/css/material-design-iconic-font.css\"> <link type=\"text/css\" rel=\"stylesheet\" href=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/css/bootstrap.css\"> <link type=\"text/css\" rel=\"stylesheet\" href=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/css/animate.css\"> <link type=\"text/css\" rel=\"stylesheet\" href=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/css/layout.css\"> <link type=\"text/css\" rel=\"stylesheet\" href=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/css/components.css\"> <link type=\"text/css\" rel=\"stylesheet\" href=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/css/widgets.css\"> <link type=\"text/css\" rel=\"stylesheet\" href=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/css/plugins.css\"> <link type=\"text/css\" rel=\"stylesheet\" href=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/css/pages.css\"> <link type=\"text/css\" rel=\"stylesheet\" href=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/css/bootstrap-extend.css\"> <link type=\"text/css\" rel=\"stylesheet\" href=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/css/common.css\"> <link type=\"text/css\" rel=\"stylesheet\" href=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/css/responsive.css\"> <script src=\"https://www.google.com/recaptcha/api.js\"></script> ");

    lasso_head({}, out);

    out.w(" </head> <body class=\"login-page\"> <section class=\"login-container boxed-login\"> <div class=\"container\"> <div class=\"col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4\"> <div class=\"login-form-container\"> <form class=\"j-forms\" id=\"forms-login\" action=\"/ClientLogin\" novalidate method=\"post\"> <div class=\"login-form-header\"> <div class=\"logo\"> <a href=\"/\"> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/images/Logo.png\" alt=\"logo\"> </a> </div> </div> <div class=\"login-form-content\"> <div class=\"unit\"> <div class=\"input login-input\"> <label class=\"icon-left\" for=\"login\"> <i class=\"zmdi zmdi-account\"></i> </label> <input class=\"form-control login-frm-input\" type=\"text\" id=\"txtLoginId\" name=\"txtLoginId\" placeholder=\"Username\"> </div> </div> <div class=\"unit\"> <div class=\"input login-input\"> <label class=\"icon-left\" for=\"password\"> <i class=\"zmdi zmdi-key\"></i> </label> <input class=\"form-control login-frm-input\" type=\"password\" id=\"txtPassword\" name=\"txtPassword\" placeholder=\"Password\"> <br> <table style=\"width:100%\"> <tr> <td> <span class=\"hint\"><a id=\"aForgotPassword\" href=\"javascript:void(0)\" class=\"link\">Forgot password?</a> </span> </td> <td style=\"text-align:right\"> <span class=\"hint\"><a id=\"aSignUp\" href=\"javascript:void(0)\" class=\"link\">Sign Up</a> </span> </td> </tr> </table> </div> </div> </div> <div class=\"login-form-footer\"> <input id=\"btnLogin\" type=\"submit\" class=\"btn-block btn btn-primary\" value=\"Sign in\"> </div> </form> </div> </div> </div> <footer class=\"login-page-footer\"> <div class=\"container\"> <div class=\"row\"> <div class=\"col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4\"> <div class=\"footer-content\"> <span class=\"footer-meta\"> terragent.com © 2016 All rights reserved.<br> Site designed and developed by <a href=\"http://www.codingcubicle.com\" target=\"_blank\" style=\"color:#fff\"> <u>Coding Cubicle Pvt. Ltd.</u> </a> </span> </div> </div> </div> </div> </footer> </section> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery-migrate.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/bootstrap.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jRespond.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/hammerjs.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.hammer.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/smoothscroll.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/smart-resize.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.validate.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.form.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/j-forms.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/jquery.storageapi.min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/socket.io-1.3.5.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Client/Common.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Client/Login.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
