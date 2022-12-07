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
      "/css/bootstrap-datepicker.min.css\"> ");

    lasso_head({}, out);

    out.w(" </head> <body class=\"leftbar-view\"> ");

    ___Header.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <section class=\"main-container\"> <div class=\"container-fluid\"> <div class=\"page-header filled full-block light\"> <div class=\"row\"> <div class=\"col-md-6\"> <h2>" +
      escapeXml(data.PageHeading) +
      "</h2> <ul class=\"list-page-breadcrumb\"> <li> <a href=\"/Admin/TaxSetup/ViewAllTaxSetups\"> Tax Setup <i class=\"zmdi zmdi-chevron-right\"></i> </a> </li> <li class=\"active-page\"> " +
      escapeXml(data.PageHeading) +
      "</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> <form method=\"post\" class=\"j-forms\" id=\"frmEntry\"> <input type=\"hidden\" id=\"hdnTaxSetupId\"" +
      attr("value", data.TaxSetupId) +
      "> <table class=\"tableEntry\"> <tr> <td> Effective Date:<span class=\"required\">*</span> </td> <td style=\"width:310px;\"> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtEffectiveDate\" name=\"txtEffectiveDate\" type=\"text\" class=\"form-control\" readonly> </div> </div> </td> </tr> <tr> <td> Social Security Tax(Employer) %: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtSocialSecurityTaxEmployer\" class=\"form-control decimal\" value=\"0.00\"> </div> </div> </td> </tr> <tr> <td> Social Security Tax(Employee) %: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtSocialSecurityTaxEmployee\" class=\"form-control decimal\" value=\"0.00\"> </div> </div> </td> </tr> <tr> <td> Medicare Tax(Employer) %: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtMedicareTaxEmployer\" class=\"form-control decimal\" value=\"0.00\"> </div> </div> </td> </tr> <tr> <td> Medicare Tax(Employee) %: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtMedicareTaxEmployee\" class=\"form-control decimal\" value=\"0.00\"> </div> </div> </td> </tr> <tr> <td> FUTA Tax %: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtFUTATax\" class=\"form-control decimal\" value=\"0.00\"> </div> </div> </td> </tr> <tr> <td> Credit Reduction %: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtFUTATaxCreditReduction\" class=\"form-control decimal\" value=\"0.00\"> </div> </div> </td> </tr> </table> <table> <tr> <td></td> <td style=\"padding-top:20px\"> <button id=\"btnSave\" type=\"button\" class=\"btn btn-primary\" onclick=\"Save()\"> <i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i> Save</button>&nbsp;&nbsp; <button id=\"btnClose\" type=\"button\" class=\"btn btn-primary\" onclick=\"Close()\"> <i class=\"fa fa-times\" aria-hidden=\"true\"></i> Close</button> </td> </tr> </table> </form> </div> </div> </div> </div> </div> </div> ");

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
      "/javascripts/Admin/TaxSetup/TaxSetup.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
