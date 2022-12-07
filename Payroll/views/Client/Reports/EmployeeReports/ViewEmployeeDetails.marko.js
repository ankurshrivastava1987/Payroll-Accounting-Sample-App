function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      __loadTag = __helpers.t,
      lasso_page = __loadTag(require("lasso/taglib/page-tag")),
      loadTemplate = __helpers.l,
      ___MasterHeader = loadTemplate(require.resolve("../../MasterHeader.marko")),
      lasso_head = __loadTag(require("lasso/taglib/head-tag")),
      ___Header = loadTemplate(require.resolve("../../Header.marko")),
      ___ReportToolbar = loadTemplate(require.resolve("../../ReportToolbar.marko")),
      attr = __helpers.a,
      ___Footer = loadTemplate(require.resolve("../../Footer.marko")),
      ___MasterFooter = loadTemplate(require.resolve("../../MasterFooter.marko")),
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
      "</h2> <ul class=\"list-page-breadcrumb\"> <li class=\"active-page\"> View Employee Details</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> <table style=\"width:100%\"> <tr> <td style=\"width:100px\"> Location: </td> <td style=\"width: 250px; padding: 5px 0px 5px 0px\"> <select id=\"cmbLocationName\" class=\"form-control\"> </select> </td> <td style=\"width:100px\"> Employee: </td> <td style=\"width: 250px; padding: 5px 0px 5px 0px\"> <select id=\"cmbEmployeeName\" class=\"form-control\"> </select> </td> </tr> <tr> <td style=\"width:100px\"> Status: </td> <td style=\"width: 250px; padding: 5px 0px 5px 0px\"> <select id=\"cmbStatus\" class=\"form-control\"> <option value>All</option> <option value=\"Active\" selected=\"true\">Active</option> <option value=\"Inactive\">Inactive</option> </select> </td> </tr> </table> </div> </div> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> <table style=\"width:100%\"> <tr> <td colspan=\"2\"> <strong> <span id=\"spanClientName\"></span> </strong> </td> </tr> <tr> <td> Employee Details </td> <td> ");

    ___ReportToolbar.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </td> </tr> </table> <input type=\"hidden\" id=\"txtSortField\" value=\"EmployeeId\"> <input type=\"hidden\" id=\"txtSortDirection\" value=\"DESC\"> <input type=\"hidden\" id=\"txtCurrentPageIndex\" value=\"1\"> <input type=\"hidden\" id=\"txtPageSize\"" +
      attr("value", data.GridPageSize) +
      "> <input type=\"hidden\" id=\"txtTotalRecords\" value=\"0\"> <input type=\"hidden\" id=\"txtCurrentRecordCount\" value=\"0\"> <table style=\"width:100%;border:1px solid gray\"> <thead> <tr style=\"background-color:#4267b2;color:#fff\"> <th> Personal Info </th> <th> Pay Info </th> <th> Tax Info </th> </tr> </thead> <tbody id=\"bodyEmployees\"> </tbody> </table> <div id=\"divPager\"> </div> </div> </div> </div> </div> </div> </div> ");

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
      "/javascripts/jquery.formatDateTime.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Client/Reports/EmployeeReports/ViewEmployeeDetails.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
