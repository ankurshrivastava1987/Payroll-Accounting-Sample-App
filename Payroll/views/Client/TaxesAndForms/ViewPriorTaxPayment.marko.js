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

    out.w(" </head> <body class=\"leftbar-view\"> <input type=\"hidden\" id=\"hdnPriorTaxPaymentId\"" +
      attr("value", data.PriorTaxPaymentId) +
      "> ");

    ___Header.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <section class=\"main-container\"> <div class=\"container-fluid\"> <div class=\"page-header filled full-block light\"> <div class=\"row\"> <div class=\"col-md-6\"> <h2>" +
      escapeXml(data.PageHeading) +
      "</h2> <ul class=\"list-page-breadcrumb\"> <li> <a href=\"/Client/Location/ViewAllLocations\"> Contractor <i class=\"zmdi zmdi-chevron-right\"></i> </a> </li> <li class=\"active-page\"> " +
      escapeXml(data.PageHeading) +
      "</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> <table class=\"tableEntry\"> <tr> <td> Tax Type: </td> <td> <span id=\"spanTaxType\"> </span> </td> </tr> <tr> <td> <span id=\"spanSSN\">Liability Period: </span> </td> <td> <span id=\"spanLiabilityPeriod\"></span> </td> </tr> <tr id=\"trStartDate\"> <td> <span id=\"spanLine1\">Period Start Date:</span> </td> <td> <span id=\"spanPeriodStartDate\"></span> </td> </tr> <tr id=\"trEndDate\"> <td> <span id=\"spanLine1\">Period End Date:</span> </td> <td> <span id=\"spanPeriodEndDate\"></span> </td> </tr> <tr> <td> <span id=\"spanLine1\">Payment Date:</span> </td> <td> <span id=\"spanPaymentDate\"></span> </td> </tr> <tr id=\"trLine2\"> <td> Check Number: </td> <td> <span id=\"spanCheckNumber\"></span> </td> </tr> <tr> <td> Notes: </td> <td> <span id=\"spanNotes\"></span> </td> </tr> <tr id=\"trFederalIncomeTax\"> <td> Federal Income Tax: </td> <td> <span id=\"spanFederalIncomeTax\"></span> </td> </tr> <tr id=\"trSocialSecurity\"> <td> Social Security: </td> <td> <span id=\"spanSocialSecurity\"></span> </td> </tr> <tr id=\"trSocialSecurityEmployer\"> <td> Social Security Employer: </td> <td> <span id=\"spanSocialSecurityEmployer\"></span> </td> </tr> <tr id=\"trMedicare\"> <td> Medicare: </td> <td> <span id=\"spanMedicare\"></span> </td> </tr> <tr id=\"trMedicareEmployer\"> <td> Medicare Employer: </td> <td> <span id=\"spanMedicareEmployer\"> </span> </td> </tr> <tr id=\"trFutaEmployer\"> <td> Futa Employer.: </td> <td> <span id=\"spanFutaEmployer\"> </span> </td> </tr> <tr id=\"trTotalAmount\"> <td> Total Amount: </td> <td> <span id=\"spanTotalAmount\"> </span> </td> </tr> <tr> <td></td> <td> <button id=\"btnEdit\" type=\"button\" class=\"btn btn-primary\" onclick=\"Edit()\"> <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i> Edit </button>&nbsp; <button id=\"btnClose\" type=\"button\" class=\"btn btn-primary\" onclick=\"Close()\"> <i class=\"fa fa-times\" aria-hidden=\"true\"></i> Close </button> </td> </tr> </table> </div> </div> </div> </div> </div> </div> ");

    ___Footer.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </section> ");

    ___MasterFooter.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Client/TaxesAndForms/ViewPriorTaxPayment.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
