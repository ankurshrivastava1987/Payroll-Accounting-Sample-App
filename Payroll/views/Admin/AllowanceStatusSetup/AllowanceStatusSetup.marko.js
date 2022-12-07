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
      "</h2> <ul class=\"list-page-breadcrumb\"> <li> <a href=\"/Admin/AllowanceStatusSetup/ViewAllAllowanceStatusSetups\"> Allowance Status Setup<i class=\"zmdi zmdi-chevron-right\"></i> </a> </li> <li class=\"active-page\"> " +
      escapeXml(data.PageHeading) +
      "</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> <ul class=\"progress-indicator\"> <li id=\"liStep1\" onclick=\"StepClick(1)\" class=\"completed\"> <span class=\"bubble\"></span> Primary Info </li> <li id=\"liStep2\" onclick=\"StepClick(2)\"> <span class=\"bubble\"></span> Standard Deduction </li> <li id=\"liStep3\" onclick=\"StepClick(3)\"> <span class=\"bubble\"></span> Personal Allowance </li> <li id=\"liStep4\" onclick=\"StepClick(4)\"> <span class=\"bubble\"></span> Dependent Allowance </li> </ul> <form method=\"post\" class=\"j-forms\" id=\"frmEntry\"> <input type=\"hidden\" id=\"hdnAllowanceStatusSetupId\"" +
      attr("value", data.AllowanceStatusSetupId) +
      "> <div id=\"divStep1\"> <table class=\"tableEntry\"> <tr> <td> State:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbStateName\" name=\"cmbStateName\" class=\"form-control\"> </select> </div> </div> </td> </tr> <tr> <td> Effective Date:<span class=\"required\">*</span> </td> <td style=\"width:310px;\"> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtEffectiveDate\" name=\"txtEffectiveDate\" type=\"text\" class=\"form-control\" readonly> </div> </div> </td> </tr> </table> </div> <div id=\"divStep2\" class=\"hide\"> <table id=\"tblStandardDeduction\" class=\"table foo-data-table table-bordered\"> <thead> </thead> <tbody id=\"bodyStandardDeduction\"> </tbody> </table> </div> <div id=\"divStep3\" class=\"hide\"> <table id=\"tblPersonalAllowance\" class=\"table foo-data-table table-bordered\"> <thead> </thead> <tbody id=\"bodyPersonalAllowance\"> </tbody> </table> </div> <div id=\"divStep4\" class=\"hide\"> <table id=\"tblDependentAllowance\" class=\"table foo-data-table table-bordered\"> <thead> </thead> <tbody id=\"bodyDependentAllowance\"> </tbody> </table> </div> <table> <tr> <td></td> <td style=\"padding-top:20px\"> <button id=\"btnSave\" type=\"button\" class=\"btn btn-primary\" onclick=\"Save()\"> <i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i> Save </button>&nbsp; <button id=\"btnBack\" type=\"button\" class=\"btn btn-primary\" disabled=\"disabled\"> <i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i> Back </button>&nbsp; <button id=\"btnNext\" type=\"button\" class=\"btn btn-primary\"> <i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i> Next </button>&nbsp; <button id=\"btnClose\" type=\"button\" class=\"btn btn-primary\" onclick=\"Close()\"> <i class=\"fa fa-times\" aria-hidden=\"true\"></i> Close </button> </td> </tr> </table> </form> </div> </div> </div> </div> </div> </div> ");

    ___Footer.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </section> ");

    ___MasterFooter.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/bootstrap-datepicker.min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/jquery.formatDateTime.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Admin/AllowanceStatusSetup/AllowanceStatusSetup.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
