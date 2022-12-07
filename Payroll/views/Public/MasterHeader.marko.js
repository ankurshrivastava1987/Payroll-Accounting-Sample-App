function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      escapeXmlAttr = __helpers.xa;

  return function render(data, out) {
    out.w("<title>" +
      escapeXml(data.title) +
      "</title> <meta charset=\"UTF-8\"> <meta name=\"description\" content=\"Payroll\"> <meta name=\"author\" content=\"CreateIT\"> <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1\"> <link rel=\"shortcut icon\" href=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/assets/images/favicon.ico\" type=\"image/x-icon\"> <link rel=\"icon\" href=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/assets/images/favicon.ico\" type=\"image/x-icon\"> <link rel=\"stylesheet\" type=\"text/css\" href=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/assets/css/style.css\"> <link rel=\"stylesheet\" type=\"text/css\" href=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/assets/css/motive.css\"> <!--[if lt IE 9]>\r\n        <script src=\"${data.CDNUrl}/assets/bootstrap/js/html5shiv.min.js\"></script>\r\n        <script src=\"${data.CDNUrl}/assets/bootstrap/js/respond.min.js\"></script>\r\n        <![endif]--> <link type=\"text/css\" rel=\"stylesheet\" href=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/css/components.css\"> <link rel=\"stylesheet\" type=\"text/css\" href=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/stylesheets/Stylesheet.css\"> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/assets/js/modernizr.custom.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/plugins/jQuery/jQuery-2.2.0.min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/underscore-min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/jquery.storageapi.min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/socket.io-1.3.5.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.validate.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.form.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/j-forms.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Common.js\"></script>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
