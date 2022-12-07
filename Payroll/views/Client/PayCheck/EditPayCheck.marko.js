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

    out.w(" </head> <body class=\"leftbar-view\"> <input type=\"hidden\" id=\"hdnPayCheckId\"" +
      attr("value", data.PayCheckId) +
      "> ");

    ___Header.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <section class=\"main-container\"> <div class=\"container-fluid\"> <div class=\"page-header filled full-block light\"> <div class=\"row\"> <div class=\"col-md-6\"> <h2>" +
      escapeXml(data.PageHeading) +
      "</h2> <ul class=\"list-page-breadcrumb\"> <li> <a href=\"/Client/PayCheck/ViewAllPayChecks\"> Pay Checks <i class=\"zmdi zmdi-chevron-right\"></i> </a> </li> <li class=\"active-page\"> " +
      escapeXml(data.PageHeading) +
      "</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> <form method=\"post\" class=\"j-forms\" id=\"frmEntry\"> <input id=\"hdnEmployeeId\" type=\"hidden\" value=\"0\"> <input id=\"hdnPayScheduleId\" type=\"hidden\" value=\"0\"> <input id=\"hdnPayScheduleRecurrenceCode\" type=\"hidden\"> <table class=\"tableEntry\"> <tr> <td> Employee Name:<span class=\"required\">*</span> </td> <td style=\"width: 350px\"> <span id=\"spanEmployeeName\"></span> </td> </tr> <tr> <td> Pay Schedule:<span class=\"required\">*</span> </td> <td style=\"width: 350px\"> <span id=\"spanPayScheduleName\"></span> </td> </tr> <tr> <td> Pay Period:<span class=\"required\">*</span> </td> <td> <span id=\"spanPayPeriod\"></span> </td> </tr> <tr> <td> Pay Date: </td> <td style=\"width:310px;\"> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtPayDate\" name=\"txtPayDate\" type=\"text\" class=\"form-control input-date-picker\"> </div> </div> </td> </tr> <tr> <td> Regular Hours: </td> <td> <input id=\"txtRegularHours\" class=\"form-control decimal\"> </td> </tr> <tr> <td> Pay Rate: </td> <td> <span id=\"spanPayRate\"></span> <span id=\"spanPayType\">Per Hour</span> </td> </tr> </table> <table> <tr> <td colspan=\"2\"> <table> <tr> <td style=\"vertical-align:top\"> <table class=\"table foo-data-table-filterable\"> <thead> <tr> <th>Pay Stub</th> <th>Amount($)</th> </tr> </thead> <tbody id=\"bodyAddition\"> </tbody> </table> </td> <td style=\"vertical-align:top\"> <table class=\"table foo-data-table-filterable\"> <thead> <tr> <th>Pay Stub</th> <th>Amount($)</th> </tr> </thead> <tbody id=\"bodyDeduction\"> </tbody> </table> </td> </tr> <tr> <td colspan=\"2\"> <table style=\"width:100%;font-weight:bold;border-top:1px solid #eee\"> <tr> <td>Net Amount:</td> <td style=\"text-align:right\"> <span id=\"spanNetAmount\">$0.00</span> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> <table style=\"width:100%\"> <tr> <td> <button id=\"btnSave\" type=\"button\" class=\"btn btn-primary\" onclick=\"Save()\"> <i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i> Save </button>&nbsp; <button id=\"btnClose\" type=\"button\" class=\"btn btn-primary\" onclick=\"Close()\"> <i class=\"fa fa-times\" aria-hidden=\"true\"></i> Close </button> </td> </tr> </table> </form> </div> </div> </div> </div> </div> </div> ");

    ___Footer.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </section> ");

    ___MasterFooter.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.maskedinput.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.mask.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/accounting.min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/jquery.formatDateTime.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Client/PayCheck/EditPayCheck.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
