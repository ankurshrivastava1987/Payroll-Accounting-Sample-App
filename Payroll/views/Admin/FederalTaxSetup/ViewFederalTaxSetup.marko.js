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
      "</h2> <ul class=\"list-page-breadcrumb\"> <li> <a href=\"/Admin/FederalTaxSetup/ViewAllFederalTaxSetups\"> Federal Tax Setup <i class=\"zmdi zmdi-chevron-right\"></i> </a> </li> <li class=\"active-page\"> " +
      escapeXml(data.PageHeading) +
      "</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> <ul class=\"nav nav-tabs\" role=\"tablist\"> <li role=\"presentation\" class=\"active\"> <a href=\"#Step1\" aria-controls=\"Step1\" role=\"tab\" data-toggle=\"tab\" class=\"link\"> <strong>Primary Info</strong> </a> </li> <li role=\"presentation\"> <a href=\"#Step2\" aria-controls=\"Step2\" role=\"tab\" data-toggle=\"tab\" class=\"link\"> <strong>Slabs</strong> </a> </li> </ul> <input type=\"hidden\" id=\"hdnFederalTaxSetupId\"" +
      attr("value", data.FederalTaxSetupId) +
      "> <input type=\"hidden\" id=\"hdnCharges\" value> <div class=\"tab-content\"> <div role=\"tabpanel\" class=\"tab-pane active\" id=\"Step1\" style=\"padding-top:20px\"> <table class=\"tableEntry\"> <tr> <td> Effective Date:<span class=\"required\">*</span> </td> <td> <span id=\"spanEffectiveDate\"></span> </td> </tr> <tr> <td> Federal Filing Status:<span class=\"required\">*</span> </td> <td> <span id=\"spanFederalFilingStatusName\"></span> </td> </tr> <tr> <td> Pay Schedule:<span class=\"required\">*</span> </td> <td> <span id=\"spanPayScheduleRecurrenceName\"></span> </td> </tr> <tr> <td> Allowance: </td> <td> <span id=\"spanAllowance\"></span> </td> </tr> </table> </div> <div role=\"tabpanel\" class=\"tab-pane\" id=\"Step2\" style=\"padding-top:20px\"> <table id=\"tblFederalTaxSetupDetails\" class=\"table foo-data-table table-bordered\"> <thead> <tr class=\"footable-odd\"> <th class=\"text-right\"> Over </th> <th class=\"text-right\"> But Not Over </th> <th class=\"text-right\"> Additional Tax </th> <th class=\"text-right\"> Tax Rate </th> </tr> </thead> <tbody id=\"bodyFederalTaxSetupDetails\"> </tbody> </table> </div> </div> <table> <tr> <td></td> <td style=\"padding-top:20px\"> <button id=\"btnEdit\" type=\"button\" class=\"btn btn-primary\" onclick=\"Edit()\"> <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i> Edit </button>&nbsp; <button id=\"btnClose\" type=\"button\" class=\"btn btn-primary\" onclick=\"Close()\"> <i class=\"fa fa-times\" aria-hidden=\"true\"></i> Close </button> </td> </tr> </table> </div> </div> </div> </div> </div> </div> ");

    ___Footer.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </section> ");

    ___MasterFooter.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/accounting.min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/jquery.formatDateTime.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Admin/FederalTaxSetup/ViewFederalTaxSetup.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);