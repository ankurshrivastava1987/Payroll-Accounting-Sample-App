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
      attr = __helpers.a,
      ___Header = loadTemplate(require.resolve("../Header.marko")),
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

    out.w(" </head> <body class=\"leftbar-view\"> <input type=\"hidden\" id=\"hdnClientId\"" +
      attr("value", data.ClientId) +
      "> ");

    ___Header.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <section class=\"main-container\"> <div class=\"container-fluid\"> <div class=\"page-header filled full-block light\"> <div class=\"row\"> <div class=\"col-md-6\"> <h2>" +
      escapeXml(data.PageHeading) +
      "</h2> <ul class=\"list-page-breadcrumb\"> <li> <a href=\"/Admin/Client/ViewAllClients\"> Clients <i class=\"zmdi zmdi-chevron-right\"></i> </a> </li> <li class=\"active-page\"> " +
      escapeXml(data.PageHeading) +
      "</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> <table class=\"tableEntry\"> <tr> <td> Account Type:<span class=\"required\">*</span> </td> <td> <span id=\"spanClientTypeName\"></span> </td> </tr> <tr> <td> Name:<span class=\"required\">*</span> </td> <td> <span id=\"spanFullName\"></span> </td> </tr> <tr> <td> Address: </td> <td> <span id=\"spanAddress1\"></span> </td> </tr> <tr> <td> </td> <td> <span id=\"spanAddress2\"></span> </td> </tr> <tr> <td> </td> <td> <span id=\"spanAddress3\"></span> </td> </tr> <tr> <td> City: </td> <td> <span id=\"spanCityName\"></span> </td> </tr> <tr> <td> State: </td> <td> <span id=\"spanStateName\"></span> </td> </tr> <tr> <td> Zip: </td> <td> <span id=\"spanZipCode\"></span> </td> </tr> <tr> <td> Industry: </td> <td> <span id=\"spanIndustryName\"></span> </td> </tr> <tr> <td> Contact Person: </td> <td> <span id=\"spanContactName\"></span> </td> </tr> <tr> <td> Job Title: </td> <td> <span id=\"spanJobTitleName\"></span> </td> </tr> <tr> <td> Work Phone #: </td> <td> <span id=\"spanWorkPhoneNo\"></span> </td> </tr> <tr> <td> Cell Phone #: </td> <td> <span id=\"spanCellPhoneNo\"></span> </td> </tr> <tr> <td> Fax #: </td> <td> <span id=\"spanFaxNo\"></span> </td> </tr> <tr> <td> E-Mail<span class=\"required\">*</span>: </td> <td> <span id=\"spanEMailId\"></span> </td> </tr> <tr> <td> Username:<span class=\"required\">*</span> </td> <td> <span id=\"spanLoginId\"></span> </td> </tr> <tr> <td> Status:<span class=\"required\">*</span> </td> <td> <span id=\"spanStatus\"></span> </td> </tr> <tr> <td></td> <td> <button id=\"btnEdit\" type=\"button\" class=\"btn btn-primary\" onclick=\"Edit()\"> <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i> Edit </button>&nbsp; <button id=\"btnClose\" type=\"button\" class=\"btn btn-primary\" onclick=\"Close()\"> <i class=\"fa fa-times\" aria-hidden=\"true\"></i> Close </button> </td> </tr> </table> </div> </div> </div> </div> </div> </div> ");

    ___Footer.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </section> ");

    ___MasterFooter.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Admin/Client/ViewClient.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
