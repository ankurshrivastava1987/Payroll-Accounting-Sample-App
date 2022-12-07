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
      ___Footer = loadTemplate(require.resolve("../Footer.marko")),
      ___MasterFooter = loadTemplate(require.resolve("../MasterFooter.marko")),
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
      "</h2> <ul class=\"list-page-breadcrumb\"> <li class=\"active-page\"> Employee Reports</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> <div class=\"row\"> <div class=\"col-md-4 col-sm-4\"> <div class=\"stats-widget stats-widget tile\"> <div class=\"widget-stats-list\"> <a href=\"/Client/Reports/EmployeeReports/ViewDirectory\" class=\"link1\"> <span class=\"list-label\">Directory</span> </a> </div> </div> <div class=\"stats-widget stats-widget tile\"> <div class=\"widget-stats-list\"> <a href=\"/Client/Reports/EmployeeReports/ViewEmployeeDetails\" class=\"link1\"> <span class=\"list-label\">Employee Details</span> </a> </div> </div> <div class=\"stats-widget stats-widget tile\"> <div class=\"widget-stats-list\"> <a href=\"/Client/Reports/EmployeeReports/ViewLastPayCheck\" class=\"link1\"> <span class=\"list-label\">Last Pay Check</span> </a> </div> </div> <div class=\"stats-widget stats-widget tile\"> <div class=\"widget-stats-list\"> <a href=\"/Client/Reports/EmployeeReports/PayrollSummary\" class=\"link1\"> <span class=\"list-label\">Payroll Summary</span> </a> </div> </div> <div class=\"stats-widget stats-widget tile\"> <div class=\"widget-stats-list\"> <a href=\"/Client/Reports/EmployeeReports/PayrollDetails\" class=\"link1\"> <span class=\"list-label\">Payroll Details</span> </a> </div> </div> </div> </div> </div> </div> </div> </div> </div> </div> ");

    ___Footer.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </section> ");

    ___MasterFooter.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
