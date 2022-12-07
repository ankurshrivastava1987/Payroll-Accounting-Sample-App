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
      "/stylesheets/progress-wizard.min.css\"> <link type=\"text/css\" rel=\"stylesheet\" href=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/css/bootstrap-datepicker.min.css\"> ");

    lasso_head({}, out);

    out.w(" </head> <body class=\"leftbar-view\"> <input type=\"hidden\" id=\"hdnPriorTaxPaymentId\"" +
      attr("value", data.PriorTaxPaymentId) +
      "> ");

    ___Header.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <section class=\"main-container\"> <div class=\"container-fluid\"> <div class=\"page-header filled full-block light\"> <div class=\"row\"> <div class=\"col-md-6\"> <h2>" +
      escapeXml(data.PageHeading) +
      "</h2> <ul class=\"list-page-breadcrumb\"> <li> <a href=\"/Client/Contractor/ViewAllContractors\"> Prior Tax Payments <i class=\"zmdi zmdi-chevron-right\"></i> </a> </li> <li class=\"active-page\"> " +
      escapeXml(data.PageHeading) +
      "</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> <form method=\"post\" class=\"j-forms\" id=\"frmEntry\"> <table class=\"tableEntry\"> <tr> <td> Tax Type:<span class=\"required\">*</span> </td> <td style=\"width: 350px\"> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbTaxType\" name=\"cmbTaxType\" class=\"form-control\" onchange=\"TaxTypeChange()\"></select> </div> </div> </td> </tr> <tr> <td> <span id=\"spanSSN\">Liability Period: </span> <span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbLiabilityPeriod\" name=\"cmbLiabilityPeriod\" class=\"form-control\" onchange=\"LiabilityPeriodChange()\"></select> </div> </div> </td> </tr> <tr id=\"trStartDate\"> <td> <span id=\"spanLine1\">Period Start Date:</span> <span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtPeriodStartDate\" name=\"txtPeriodStartDate\" type=\"text\" maxlength=\"50\" class=\"form-control input-date-picker\"> </div> </div> </td> </tr> <tr id=\"trEndDate\"> <td> <span id=\"spanLine1\">Period End Date:</span> <span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtPeriodEndDate\" name=\"txtPeriodEndDate\" type=\"text\" maxlength=\"50\" class=\"form-control input-date-picker\"> </div> </div> </td> </tr> <tr> <td> <span id=\"spanLine1\">Payment Date:</span> <span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtPaymentDate\" name=\"txtPaymentDate\" type=\"text\" maxlength=\"50\" class=\"form-control input-date-picker\"> </div> </div> </td> </tr> <tr id=\"trLine2\"> <td> Check Number: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtCheckNumber\" name=\"txtCheckNumber\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Notes: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtNotes\" name=\"txtNotes\" type=\"text\" maxlength=\"200\" class=\"form-control\"> </div> </div> </td> </tr> <tr id=\"trFederalIncomeTax\"> <td> Federal Income Tax: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtFederalIncomeTax\" name=\"txtFederalIncomeTax\" type=\"text\" maxlength=\"50\" class=\"form-control decimal FederalTax\"> </div> </div> </td> </tr> <tr id=\"trSocialSecurity\"> <td> Social Security: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtSocialSecurity\" name=\"txtSocialSecurity\" type=\"text\" maxlength=\"50\" class=\"form-control decimal FederalTax\"> </div> </div> </td> </tr> <tr id=\"trSocialSecurityEmployer\"> <td> Social Security Employer:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtSocialSecurityEmployer\" name=\"txtSocialSecurityEmployer\" type=\"text\" maxlength=\"50\" class=\"form-control decimal FederalTax\"> </div> </div> </td> </tr> <tr id=\"trMedicare\"> <td> Medicare:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtMedicare\" name=\"txtMedicare\" type=\"text\" maxlength=\"50\" class=\"form-control decimal FederalTax\"> </div> </div> </td> </tr> <tr id=\"trMedicareEmployer\"> <td> Medicare Employer:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtMedicareEmployer\" name=\"txtMedicareEmployer\" type=\"text\" maxlength=\"50\" class=\"form-control decimal FederalTax\"> </div> </div> </td> </tr> <tr id=\"trFutaEmployer\"> <td> FUTA Employer.: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtFutaEmployer\" name=\"txtFutaEmployer\" type=\"text\" maxlength=\"5\" class=\"form-control decimal FederalTax\"> </div> </div> </td> </tr> <tr id=\"trTotalAmount\"> <td> Total Amount: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtTotalAmount\" name=\"txtTotalAmount\" type=\"text\" maxlength=\"250\" readonly=\"true\" class=\"form-control decimal readonly\"> </div> </div> </td> </tr> </table> <table> <tr> <td></td> <td style=\"padding-top:20px\"> <button id=\"btnSave\" type=\"button\" class=\"uibutton large confirm\" onclick=\"Save()\">Save</button>&nbsp; <button id=\"btnClose\" type=\"button\" class=\"uibutton large\" onclick=\"Close()\">Close</button> </td> </tr> </table> </form> </div> </div> </div> </div> </div> </div> ");

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
      "/js/lib/bootbox.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/bootstrap-datepicker.min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/jquery.formatDateTime.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Client/TaxesAndForms/PriorTaxPayment.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
