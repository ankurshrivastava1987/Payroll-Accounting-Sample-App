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
      "</h2> <ul class=\"list-page-breadcrumb\"> <li class=\"active-page\"> Tax and Wage Summary</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> This report shows total subject wages, excess wages, and taxable wages by tax type. Click the tax name to see the wages by employee. Also, it shows your tax payments according to the dates the taxes were withheld (not the tax payment date). <strong>Important:</strong> FUTA is an annual tax. To see the amount reported to the agency, choose a Range spanning a full year. <table style=\"width:100%\"> <tr> <td style=\"width:100px\"> From Date: </td> <td style=\"width: 250px; padding: 5px 0px 5px 0px\"> <input id=\"txtFromDate\" name=\"txtFromDate\" type=\"text\" class=\"form-control input-date-picker\" readonly> </td> <td style=\"width:100px\"> To Date: </td> <td style=\"width: 250px; padding: 5px 0px 5px 0px\"> <input id=\"txtToDate\" name=\"txtToDate\" type=\"text\" class=\"form-control input-date-picker\" readonly> </td> <td> <button id=\"btnGo\" type=\"button\" class=\"btn btn-primary\" onclick=\"FillGrid()\"> <i class=\"fa fa-check\" aria-hidden=\"true\"></i> Go</button> </td> </tr> </table> </div> </div> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> ");

    ___ReportToolbar.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <div id=\"divReport\"> </div> </div> </div> </div> </div> </div> </div> ");

    ___Footer.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </section> ");

    ___MasterFooter.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <script src=\"https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/accounting.min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/bootstrap-datepicker.min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/jquery.formatDateTime.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Client/Reports/EmployerReports/ViewTaxWageSummary.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
