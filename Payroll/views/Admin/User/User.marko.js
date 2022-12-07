function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      __loadTag = __helpers.t,
      lasso_page = __loadTag(require("lasso/taglib/page-tag")),
      loadTemplate = __helpers.l,
      ___MasterHeader = loadTemplate(require.resolve("../MasterHeader.marko")),
      lasso_head = __loadTag(require("lasso/taglib/head-tag")),
      ___Header = loadTemplate(require.resolve("../Header.marko")),
      attr = __helpers.a,
      ___Footer = loadTemplate(require.resolve("../Footer.marko")),
      ___MasterFooter = loadTemplate(require.resolve("../MasterFooter.marko")),
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

    ___MasterHeader.render({
        title: data.title,
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" ");

    lasso_head({}, out);

    out.w(" </head> <body class=\"leftbar-view\"> ");

    ___Header.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <section class=\"main-container\"> <div class=\"container-fluid\"> <div class=\"page-header filled full-block light\"> <div class=\"row\"> <div class=\"col-md-6\"> <h2>" +
      escapeXml(data.PageHeading) +
      "</h2> <ul class=\"list-page-breadcrumb\"> <li> <a href=\"/Admin/User/ViewAllUsers\"> Users <i class=\"zmdi zmdi-chevron-right\"></i> </a> </li> <li class=\"active-page\"> " +
      escapeXml(data.PageHeading) +
      "</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> <form method=\"post\" class=\"j-forms\" id=\"frmEntry\"> <input type=\"hidden\" id=\"hdnUserId\"" +
      attr("value", data.UserId) +
      "> <table class=\"tableEntry\"> <tr id=\"trUserCode\"> <td> User Code:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtUserCode\" class=\"form-control\" disabled=\"disabled\"> </div> </div> </td> </tr> <tr> <td> Full Name:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtFullName\" name=\"txtFullName\" maxlength=\"100\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Address: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtAddress1\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtAddress2\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtAddress3\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> City Name: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtCityName\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> State Name: </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbStateName\" class=\"form-control\"></select> </div> </div> </td> </tr> <tr> <td> Zip Code: </td> <td> <div class=\"unit\"> <div class=\"input\"> <div class=\"row\"> <div class=\"col-xs-6\"> <input id=\"txtZipCode\" type=\"text\" maxlength=\"5\" class=\"form-control\" style=\"width:158px\"> </div> <div class=\"col-xs-6\"> <input id=\"txtZipCodeExt\" maxlength=\"4\" placeholder=\"Extension\" class=\"form-control\" style=\"width:158px\"> </div> </div> </div> </div> </td> </tr> <tr> <td> Job Title: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtJobTitleName\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Work Phone No: </td> <td> <div class=\"unit\"> <div class=\"input\"> <div class=\"row\"> <div class=\"col-xs-6\"> <input id=\"txtWorkPhoneNo\" name=\"txtWorkPhoneNo\" type=\"text\" maxlength=\"14\" class=\"form-control phoneno\" style=\"width:158px\"> </div> <div class=\"col-xs-6\"> <input id=\"txtWorkPhoneNoExt\" maxlength=\"12\" placeholder=\"Extension No\" class=\"form-control\" style=\"width:158px\"> </div> </div> </div> </div> </td> </tr> <tr> <td> Cell Phone No: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtCellPhoneNo\" name=\"txtCellPhoneNo\" maxlength=\"14\" class=\"form-control phoneno\"> </div> </div> </td> </tr> <tr> <td> E-Mail:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtEMailId\" name=\"txtEMailId\" maxlength=\"250\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Username:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtLoginId\" name=\"txtLoginId\" maxlength=\"20\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Password:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtPassword\" name=\"txtPassword\" type=\"password\" maxlength=\"20\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Status:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbStatus\" class=\"form-control\"> <option value=\"Active\">Active</option> <option value=\"Inactive\">Inactive</option> </select> </div> </div> </td> </tr> <tr> <td></td> <td> <button id=\"btnSave\" type=\"button\" class=\"btn btn-primary\" onclick=\"Save()\"> <i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i> Save </button>&nbsp;&nbsp; <button id=\"btnClose\" type=\"button\" class=\"btn btn-primary\" onclick=\"Close()\"> <i class=\"fa fa-times\" aria-hidden=\"true\"></i> Close </button> </td> </tr> </table> </form> </div> </div> </div> </div> </div> </div> ");

    ___Footer.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </section> ");

    ___MasterFooter.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.maskedinput.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.mask.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Admin/User/User.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
