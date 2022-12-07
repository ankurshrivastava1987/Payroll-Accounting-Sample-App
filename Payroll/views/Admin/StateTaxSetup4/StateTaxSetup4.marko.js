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
      ___Header = loadTemplate(require.resolve("../Header.marko")),
      attr = __helpers.a,
      ___GridToolbar = loadTemplate(require.resolve("../GridToolbar.marko")),
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
      "/stylesheets/progress-wizard.min.css\"> <link type=\"text/css\" rel=\"stylesheet\" href=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/css/bootstrap-datepicker.min.css\"> ");

    lasso_head({}, out);

    out.w(" </head> <body class=\"leftbar-view\"> ");

    ___Header.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <section class=\"main-container\"> <div class=\"container-fluid\"> <div class=\"page-header filled full-block light\"> <div class=\"row\"> <div class=\"col-md-6\"> <h2>" +
      escapeXml(data.PageHeading) +
      "</h2> <ul class=\"list-page-breadcrumb\"> <li> <a href=\"/Admin/StateTaxSetup4/ViewAllStateTaxSetup4s\"> State Tax Setup 4<i class=\"zmdi zmdi-chevron-right\"></i> </a> </li> <li class=\"active-page\"> " +
      escapeXml(data.PageHeading) +
      "</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> <ul class=\"progress-indicator\"> <li id=\"liStep1\" onclick=\"StepClick(1)\" class=\"completed\"> <span class=\"bubble\"></span> Primary Info </li> <li id=\"liStep2\" onclick=\"StepClick(2)\"> <span class=\"bubble\"></span> Slabs </li> </ul> <form method=\"post\" class=\"j-forms\" id=\"frmEntry\"> <input type=\"hidden\" id=\"hdnStateTaxSetupId\"" +
      attr("value", data.StateTaxSetupId) +
      "> <input type=\"hidden\" id=\"hdnStateTaxSetupDetails\" value> <div id=\"divStep1\"> <table class=\"tableEntry\"> <tr> <td> State:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbStateName\" name=\"cmbStateName\" class=\"form-control\"> </select> </div> </div> </td> </tr> <tr> <td> Effective Date:<span class=\"required\">*</span> </td> <td style=\"width:310px;\"> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtEffectiveDate\" name=\"txtEffectiveDate\" type=\"text\" class=\"form-control\" readonly> </div> </div> </td> </tr> <tr> <td> Pay Schedule:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbPayScheduleRecurrenceName\" name=\"cmbPayScheduleRecurrenceName\" class=\"form-control\"> </select> </div> </div> </td> </tr> <tr> <td> Tax Status:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbFilingStatusName\" name=\"cmbFilingStatusName\" class=\"form-control\"> </select> </div> </div> </td> </tr> <tr> <td> Local Tax %:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtLocalTaxPercentage\" class=\"form-control decimal\" value=\"0.00\"> </div> </div> </td> </tr> <tr> <td> Is Delaware Workplace?:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbIsDelawareWorkplace\" name=\"cmbIsDelawareWorkplace\" class=\"form-control\"> <option value=\"Y\">Yes</option> <option value=\"N\" selected=\"true\">No</option> </select> </div> </div> </td> </tr> </table> </div> <div id=\"divStep2\" class=\"hide\"> <table style=\"width:100%\"> <tr> <td> ");

    ___GridToolbar.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </td> </tr> <tr> <td> <table id=\"tblStateTaxSetupDetails\" class=\"table foo-data-table table-bordered\"> <thead> <tr class=\"footable-odd\"> <th style=\"width: 25px\"> <input type=\"checkbox\" name=\"0\"> </th> <th class=\"text-right\"> Over </th> <th class=\"text-right\"> But Not Over </th> <th class=\"text-right\"> Additional Tax </th> <th class=\"text-right\"> Tax Rate </th> <th style=\"width: 100px\"> Action </th> </tr> </thead> <tbody id=\"bodyStateTaxSetupDetails\"> </tbody> </table> </td> </tr> </table> </div> <table> <tr> <td></td> <td style=\"padding-top:20px\"> <button id=\"btnSave\" type=\"button\" class=\"btn btn-primary\" onclick=\"Save()\"> <i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i> Save </button>&nbsp; <button id=\"btnBack\" type=\"button\" class=\"btn btn-primary\" disabled=\"disabled\"> <i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i> Back </button>&nbsp; <button id=\"btnNext\" type=\"button\" class=\"btn btn-primary\"> <i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i> Next </button>&nbsp; <button id=\"btnClose\" type=\"button\" class=\"btn btn-primary\" onclick=\"Close()\"> <i class=\"fa fa-times\" aria-hidden=\"true\"></i> Close </button> </td> </tr> </table> </form> </div> </div> </div> </div> </div> </div> ");

    ___Footer.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </section> ");

    ___MasterFooter.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <div id=\"myModal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\"> <div class=\"modal-dialog\"> <div class=\"modal-content\"> <form method=\"post\" class=\"j-forms\" id=\"frmEntry1\"> <div class=\"modal-header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"> <span aria-hidden=\"true\">&times;</span> </button> <h4 class=\"modal-title\">State Tax</h4> </div> <div class=\"modal-body\"> <input type=\"hidden\" id=\"hdnRowNo\" value> <table class=\"tableEntry\"> <tr> <td> Over($): </td> <td style=\"width:310px;\"> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtLowLimit\" class=\"form-control decimal\"> </div> </div> </td> </tr> <tr> <td> But Not Over($): </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtHighLimit\" name=\"txtHighLimit\" class=\"form-control decimal\"> </div> </div> </td> </tr> <tr> <td> Additional Tax($): </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtAdditionalTax\" class=\"form-control decimal\"> </div> </div> </td> </tr> <tr> <td> Tax Rate(%): </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtTaxRate\" class=\"form-control decimal\"> </div> </div> </td> </tr> </table> </div> <div class=\"modal-footer\"> <button id=\"btnOK\" type=\"button\" class=\"btn btn-primary\"> <i class=\"fa fa-check\" aria-hidden=\"true\"></i> OK</button> <button id=\"btnCancel\" type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\"> <i class=\"fa fa-times\" aria-hidden=\"true\"></i> Close</button> </div> </form> </div> </div> </div> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/accounting.min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/bootstrap-datepicker.min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/jquery.formatDateTime.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Admin/StateTaxSetup4/StateTaxSetup4.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
