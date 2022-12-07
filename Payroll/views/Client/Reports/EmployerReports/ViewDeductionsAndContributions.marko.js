function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      __loadTag = __helpers.t,
      lasso_page = __loadTag(require("lasso/taglib/page-tag")),
      loadTemplate = __helpers.l,
      ___MasterHeader = loadTemplate(require.resolve("../../MasterHeader.marko")),
      escapeXmlAttr = __helpers.xa,
      lasso_head = __loadTag(require("lasso/taglib/head-tag")),
      ___Header = loadTemplate(require.resolve("../../Header.marko")),
      ___ReportToolbar = loadTemplate(require.resolve("../../ReportToolbar.marko")),
      ___Footer = loadTemplate(require.resolve("../../Footer.marko")),
      ___MasterFooter = loadTemplate(require.resolve("../../MasterFooter.marko")),
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

    out.w(" <link type=\"text/css\" rel=\"stylesheet\" href=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/css/bootstrap-datepicker.min.css\"> ");

    lasso_head({}, out);

    out.w(" </head> <body class=\"leftbar-view\"> ");

    ___Header.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <section class=\"main-container\"> <div class=\"container-fluid\"> <div class=\"page-header filled full-block light\"> <div class=\"row\"> <div class=\"col-md-6\"> <h2>" +
      escapeXml(data.PageHeading) +
      "</h2> <ul class=\"list-page-breadcrumb\"> <li class=\"active-page\">Deductions And Contributions</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> ");

    ___ReportToolbar.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <div id=\"divPayrollSummary\" class=\"widget-content\"> <div style=\"width:100%; border: 1px solid #90949b;\"> <table style=\"width:100%\"> <tr> <td style=\"width: 100px; text-align:left; padding-left:5px;\"> From Date: </td> <td style=\"width: 250px; padding: 5px 0px 5px 0px;\"> <input id=\"txtFromDate\" name=\"txtFromDate\" type=\"text\" class=\"form-control input-date-picker\" readonly> </td> <td style=\"width:100px;padding-left:5px;\"> To Date: </td> <td style=\"width: 250px; padding: 5px 0px 5px 0px\"> <input id=\"txtToDate\" name=\"txtToDate\" type=\"text\" class=\"form-control input-date-picker\" readonly> </td> <td style=\"padding: 5px 5px 5px 5px\"> <button id=\"btnGo\" type=\"button\" class=\"btn btn-primary\" onclick=\"FillGrid()\"> <i class=\"fa fa-check\" aria-hidden=\"true\"></i> Go</button> </td> </tr> </table> </div> <br> <div id=\"divSummary\" style=\"width:100%; border: 1px solid #90949b;\"> </div> </div> </div> </div> </div> </div> </div> ");

    ___Footer.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </section> ");

    ___MasterFooter.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/accounting.min.js\"></script> <script src=\"https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/bootstrap-datepicker.min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/jquery.formatDateTime.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Client/Reports/EmployerReports/ViewDeductionsAndContributions.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);