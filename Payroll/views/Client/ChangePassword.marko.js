function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      __loadTag = __helpers.t,
      lasso_page = __loadTag(require("lasso/taglib/page-tag")),
      loadTemplate = __helpers.l,
      __MasterHeader = loadTemplate(require.resolve("./MasterHeader.marko")),
      lasso_head = __loadTag(require("lasso/taglib/head-tag")),
      __Header1 = loadTemplate(require.resolve("./Header1.marko")),
      __Footer = loadTemplate(require.resolve("./Footer.marko")),
      __MasterFooter = loadTemplate(require.resolve("./MasterFooter.marko")),
      escapeXmlAttr = __helpers.xa,
      lasso_body = __loadTag(require("lasso/taglib/body-tag")),
      init_widgets = __loadTag(require("marko-widgets/taglib/init-widgets-tag")),
      browser_refresh = __loadTag(require("browser-refresh-taglib/refresh-tag"));

  return function render(data, out) {
    lasso_page({
        dirname: __dirname,
        filename: __filename
      }, out);

    out.w("<!DOCTYPE html> <html lang=\"en\"> <head> ");

    __MasterHeader.render({
        title: data.title,
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" ");

    lasso_head({}, out);

    out.w(" </head> <body class=\"leftbar-view\"> ");

    __Header1.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <section class=\"main-container\"> <div class=\"container-fluid\"> <div class=\"page-header filled full-block light\"> <div class=\"row\"> <div class=\"col-md-6\"> <h2>" +
      escapeXml(data.PageHeading) +
      "</h2> <ul class=\"list-page-breadcrumb\"> <li class=\"active-page\"> Change Password</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> <form method=\"post\" class=\"j-forms\" id=\"frmEntry\"> <table class=\"tableEntry\"> <tr> <td> Old Password:<span class=\"required\">*</span> </td> <td style=\"width: 350px\"> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtPassword\" name=\"txtPassword\" type=\"password\" maxlength=\"20\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> New Password:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtNewPassword\" name=\"txtNewPassword\" type=\"password\" maxlength=\"20\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Confirm Password:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtConfirmPassword\" name=\"txtConfirmPassword\" type=\"password\" maxlength=\"20\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td></td> <td> <button id=\"btnSave\" type=\"button\" class=\"btn btn-primary\" onclick=\"Save()\"> <i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i> Save</button>&nbsp; <button id=\"btnClose\" type=\"button\" class=\"btn btn-primary\" onclick=\"Close()\"> <i class=\"fa fa-times\" aria-hidden=\"true\"></i> Close</button> </td> </tr> </table> </form> </div> </div> </div> </div> </div> </div> ");

    __Footer.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </section> ");

    __MasterFooter.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Client/ChangePassword.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
