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
      "</h2> <ul class=\"list-page-breadcrumb\"> <li> <a href=\"/Admin/Plan/ViewAllPlans\"> Plans <i class=\"zmdi zmdi-chevron-right\"></i> </a> </li> <li class=\"active-page\"> " +
      escapeXml(data.PageHeading) +
      "</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> <input type=\"hidden\" id=\"hdnPlanId\"" +
      attr("value", data.PlanId) +
      "> <input type=\"hidden\" id=\"hdnCharges\" value> <table class=\"tableEntry\"> <tr> <td> Plan Code:<span class=\"required\">*</span> </td> <td> <span id=\"spanPlanCode\"></span> </td> </tr> <tr> <td> Plan Name:<span class=\"required\">*</span> </td> <td> <span id=\"spanPlanName\"></span> </td> </tr> <tr> <td> Display Order:<span class=\"required\">*</span> </td> <td> <span id=\"spanDisplayOrder\"></span> </td> </tr> <tr> <td> Status: </td> <td> <span id=\"spanStatus\"></span> </td> </tr> </table> <table class=\"tableEntry\"> <tr> <td> <h3>Features</h3> </td> </tr> <tr> <td> <table class=\"tableEntry\"> <tbody id=\"bodyFeatures\"> </tbody> </table> </td> </tr> <tr> <td> <table class=\"table foo-data-table table-bordered \"> <thead> <tr class=\"footable-odd\"> <th> Effective Date </th> <th> Amount Per Month($) </th> <th> Amount Per Employee Per Month($) </th> </tr> </thead> <tbody id=\"bodyCharges\"> </tbody> </table> </td> </tr> </table> <table> <tr> <td></td> <td> <button id=\"btnEdit\" class=\"btn btn-primary\" onclick=\"Edit()\">Edit</button>&nbsp;&nbsp; <button id=\"btnClose\" class=\"btn btn-default\" onclick=\"Close()\">Close</button> </td> </tr> </table> </div> </div> </div> </div> </div> </div> ");

    ___Footer.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </section> ");

    ___MasterFooter.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Admin/Plan/ViewPlan.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
