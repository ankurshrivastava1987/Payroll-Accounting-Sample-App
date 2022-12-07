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
      attr = __helpers.a,
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

    out.w(" </head> <body class=\"leftbar-view\"> <input type=\"hidden\" id=\"hdnClientId\"" +
      attr("value", data.ClientId) +
      "> ");

    __Header1.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <section class=\"main-container\"> <div class=\"container-fluid\"> <div class=\"page-header filled full-block light\"> <div class=\"row\"> <div class=\"col-md-6\"> <h2>" +
      escapeXml(data.PageHeading) +
      "</h2> <ul class=\"list-page-breadcrumb\"> <li class=\"active-page\"> " +
      escapeXml(data.PageHeading) +
      "</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> <form method=\"post\" class=\"j-forms\" id=\"frmEntry\"> <table class=\"tableEntry\"> <tr> <td> Account Type:<span class=\"required\">*</span> </td> <td style=\"width: 350px\"> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbClientType\" class=\"form-control\"> <option value=\"1\">Accountant</option> <option value=\"2\">Business</option> </select> </div> </div> </td> </tr> <tr> <td> Name:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtFullName\" name=\"txtFullName\" type=\"text\" maxlength=\"100\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Address: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtAddress1\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtAddress2\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtAddress3\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> City: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtCityName\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> State: </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbStateName\" class=\"form-control\"></select> </div> </div> </td> </tr> <tr> <td> Zip: </td> <td> <div class=\"unit\"> <div class=\"input\"> <div class=\"row\"> <div class=\"col-xs-6\"> <input id=\"txtZipCode\" type=\"text\" maxlength=\"5\" class=\"form-control\" style=\"width:158px\"> </div> <div class=\"col-xs-6\"> <input id=\"txtZipCodeExt\" maxlength=\"4\" placeholder=\"Extension\" class=\"form-control\" style=\"width:158px\"> </div> </div> </div> </div> </td> </tr> <tr> <td> Industry: </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbIndustryName\" class=\"form-control\"></select> </div> </div> </td> </tr> <tr> <td> Contact Person: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtContactName\" type=\"text\" maxlength=\"100\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Job Title: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtJobTitleName\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Work Phone #: </td> <td> <div class=\"unit\"> <div class=\"input\"> <div class=\"row\"> <div class=\"col-xs-6\"> <input id=\"txtWorkPhoneNo\" name=\"txtWorkPhoneNo\" type=\"text\" maxlength=\"14\" class=\"form-control phoneno\" style=\"width:158px\"> </div> <div class=\"col-xs-6\"> <input id=\"txtWorkPhoneNoExt\" maxlength=\"12\" placeholder=\"Extension No\" class=\"form-control\" style=\"width:158px\"> </div> </div> </div> </div> </td> </tr> <tr> <td> Cell Phone #: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtCellPhoneNo\" name=\"txtCellPhoneNo\" type=\"text\" maxlength=\"14\" class=\"form-control phoneno\"> </div> </div> </td> </tr> <tr> <td> Fax #: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtFaxNo\" type=\"text\" maxlength=\"12\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> E-Mail:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtEMailId\" name=\"txtEMailId\" type=\"text\" maxlength=\"250\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Status:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbStatus\" class=\"form-control\"> <option value=\"Active\">Active</option> <option value=\"Inactive\">Inactive</option> </select> </div> </div> </td> </tr> <tr> <td></td> <td> <button id=\"btnSave\" type=\"button\" class=\"btn btn-primary\" onclick=\"Save()\"> <i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i> Save</button>&nbsp; <button id=\"btnClose\" type=\"button\" class=\"btn btn-primary\" onclick=\"Close()\"> <i class=\"fa fa-times\" aria-hidden=\"true\"></i> Close</button> </td> </tr> </table> </form> </div> </div> </div> </div> </div> </div> ");

    __Footer.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </section> ");

    __MasterFooter.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.maskedinput.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.mask.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Client/MyProfile.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
