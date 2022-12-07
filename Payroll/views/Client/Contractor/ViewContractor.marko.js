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

    out.w(" </head> <body class=\"leftbar-view\"> <input type=\"hidden\" id=\"hdnContractorId\"" +
      attr("value", data.ContractorId) +
      "> ");

    ___Header.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <section class=\"main-container\"> <div class=\"container-fluid\"> <div class=\"page-header filled full-block light\"> <div class=\"row\"> <div class=\"col-md-6\"> <h2>" +
      escapeXml(data.PageHeading) +
      "</h2> <ul class=\"list-page-breadcrumb\"> <li> <a href=\"/Client/Location/ViewAllLocations\"> Contractor <i class=\"zmdi zmdi-chevron-right\"></i> </a> </li> <li class=\"active-page\"> " +
      escapeXml(data.PageHeading) +
      "</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> <table class=\"tableEntry\"> <tr> <td> Contractor Type: </td> <td> <span id=\"spanType\"></span> </td> </tr> <tr> <td> <span id=\"spanSSN\">Contractor's Federal EIN:</span> </td> <td> <span id=\"spanFederalEIN\"></span> </td> </tr> <tr> <td> <span id=\"spanlblLine1\">Business Name (Line1):</span> </td> <td> <span id=\"spanLine1\"></span> </td> </tr> <tr id=\"trLine2\"> <td> (Line2): </td> <td> <span id=\"spanLine2\"></span> </td> </tr> <tr> <td> Address: </td> <td> <span id=\"spanAddress1\"></span> </td> </tr> <tr> <td> </td> <td> <span id=\"spanAddress2\"></span> </td> </tr> <tr> <td> </td> <td> <span id=\"spanAddress3\"></span> </td> </tr> <tr> <td> City: </td> <td> <span id=\"spanCity\"></span> </td> </tr> <tr> <td> State: </td> <td> <span id=\"spanStateName\"></span> </td> </tr> <tr> <td> Zip: </td> <td> <span id=\"spanZipCode\"></span> </td> </tr> <tr> <td> Zip Ext: </td> <td> <span id=\"spanZipCodeExt\"></span> </td> </tr> <tr> <td> E-Mail: </td> <td> <span id=\"spanEmail\"></span> </td> </tr> <tr> <td> Status: </td> <td> <span id=\"spanStatus\"></span> </td> </tr> <tr> <td> Payment method: </td> <td> <span id=\"spanPaymentMethod\"></span> </td> </tr> <tr> <td></td> <td> <button id=\"btnEdit\" type=\"button\" class=\"btn btn-primary\" onclick=\"Edit()\"> <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i> Edit </button>&nbsp; <button id=\"btnClose\" type=\"button\" class=\"btn btn-primary\" onclick=\"Close()\"> <i class=\"fa fa-times\" aria-hidden=\"true\"></i> Close </button> </td> </tr> </table> </div> </div> </div> </div> </div> </div> ");

    ___Footer.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </section> ");

    ___MasterFooter.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Client/Contractor/ViewContractor.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
