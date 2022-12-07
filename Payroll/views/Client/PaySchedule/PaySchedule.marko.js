function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      __loadTag = __helpers.t,
      lasso_page = __loadTag(require("lasso/taglib/page-tag")),
      loadTemplate = __helpers.l,
      ___MasterHeader = loadTemplate(require.resolve("../MasterHeader.marko")),
      escapeXmlAttr = __helpers.xa,
      lasso_head = __loadTag(require("lasso/taglib/head-tag")),
      attr = __helpers.a,
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

    out.w(" <link type=\"text/css\" rel=\"stylesheet\" href=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/css/bootstrap-datepicker.min.css\"> ");

    lasso_head({}, out);

    out.w(" </head> <body class=\"leftbar-view\"> <input type=\"hidden\" id=\"hdnPayScheduleId\"" +
      attr("value", data.PayScheduleId) +
      "> ");

    ___Header.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <section class=\"main-container\"> <div class=\"container-fluid\"> <div class=\"page-header filled full-block light\"> <div class=\"row\"> <div class=\"col-md-6\"> <h2>" +
      escapeXml(data.PageHeading) +
      "</h2> <ul class=\"list-page-breadcrumb\"> <li> <a href=\"/Client/PaySchedule/ViewAllPaySchedules\"> Pay Schedules <i class=\"zmdi zmdi-chevron-right\"></i> </a> </li> <li class=\"active-page\"> " +
      escapeXml(data.PageHeading) +
      "</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> <form method=\"post\" class=\"j-forms\" id=\"frmEntry\"> <table class=\"tableEntry\"> <tr> <td> Pay Schedule Name:<span class=\"required\">*</span> </td> <td style=\"width: 350px\"> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtPayScheduleName\" name=\"txtPayScheduleName\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Pay: </td> <td> <div class=\"unit\"> <div class=\"input\"> <table> <tr> <td> <input id=\"txtDaysAfterClose\" class=\"form-control integer\" style=\"width:50px\" value=\"0\"> </td> <td>days after close of pay period</td> </tr> </table> </div> </div> </td> </tr> <tr> <td> Pay Period End Date:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtPayPeriodEndDate\" name=\"txtPayPeriodEndDate\" type=\"text\" class=\"form-control input-date-picker\"> </div> </div> </td> </tr> <tr> <td> Recurrence:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbPayScheduleRecurrenceName\" name=\"cmbPayScheduleRecurrenceName\" class=\"form-control\"> </select> </div> </div> </td> </tr> <tr id=\"trRecur\" class=\"hide\"> <td> Recur: </td> <td> <div id=\"divDaily\"> <div class=\"unit\"> <div class=\"input\"> <input name=\"daily\" id=\"chkDailyEveryWeekDay\" type=\"checkbox\"> Every weekday </div> </div> </div> </td> </tr> <tr> <td> Status:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbStatus\" class=\"form-control\"> <option value=\"Active\">Active</option> <option value=\"Inactive\">Inactive</option> </select> </div> </div> </td> </tr> <tr> <td> Default: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input name=\"daily\" id=\"chkDefault\" type=\"checkbox\"> </div> </div> </td> </tr> <tr> <td></td> <td> <button id=\"btnSave\" type=\"button\" class=\"btn btn-primary\" onclick=\"Save()\"> <i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i> Save </button>&nbsp; <button id=\"btnClose\" type=\"button\" class=\"btn btn-primary\" onclick=\"Close()\"> <i class=\"fa fa-times\" aria-hidden=\"true\"></i> Close </button> </td> </tr> </table> </form> </div> </div> </div> </div> </div> </div> ");

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
      "/js/bootstrap-datepicker.min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/jquery.formatDateTime.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Client/PaySchedule/PaySchedule.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
