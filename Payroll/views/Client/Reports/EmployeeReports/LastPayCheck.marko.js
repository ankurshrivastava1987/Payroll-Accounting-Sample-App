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
      "</h2> <ul class=\"list-page-breadcrumb\"> <li class=\"active-page\">Last Pay Check</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> ");

    ___ReportToolbar.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <div style=\"width:100%; border: 1px solid #90949b;padding:2px\"> <table> <tr> <td>Employee:</td> <td><select width=\"200px\" id=\"ddlEmployee\" class=\"form-control\"></select></td> <td style=\"padding-left:5px;\"><button type=\"button\" class=\"btn btn-primary\" onclick=\"DisplayData()\"> <i class=\"fa fa-check\" aria-hidden=\"true\"></i> GO</button></td> </tr> </table> </div> <div id=\"divLastPayCheck\" class=\"widget-content\"> <div style=\"text-align:right;\"> Pay stub for period: <span id=\"spanPayPeriod\"></span>&nbsp;&nbsp;&nbsp; </div> <table style=\"width:100%; border: 1px solid #90949b;\"> <tr> <td colspan=\"3\" style=\"text-align:center; font-size:x-large;\"> <b>Advice of Deposit</b> </td> </tr> <tr> <td style=\"width:35%; margin-top:0px;\"> <div style=\"background-color:#e0ebeb;; border-style: ridge; border:1px solid gray; padding: 5px 10px 5px 10px; margin-left:5px;\"> <span id=\"spanClientFullName\"></span> <br> <span id=\"spanClientAddress1\"></span>&nbsp; <span id=\"spanClientAddress2\"></span>&nbsp; <span id=\"spanClientAddress3\"></span> <br> <span id=\"spanClientCity\"></span>&nbsp; <span id=\"spanClientStateCode\"></span>&nbsp;<span id=\"spanClientZipCode\"></span> <br> </div> </td> <td style=\"width:30%\"></td> <td style=\"width:35%; vertical-align:top; text-align:right; padding: 5px 0px 5px 0px\"> Date : &nbsp;<span id=\"spanPayDate\" style=\"margin-right:10px\"></span> <br> Net Pay :&nbsp; <span id=\"spanNetPayCheck\" style=\"margin-right:10px\"></span> </td> </tr> <tr> <td style=\"width:35%\"> <div style=\"margin-left:5px;margin-bottom:5px;margin-top:10px;background-color:#e0ebeb; border-style: ridge; border:1px solid gray; padding: 5px 10px 5px 10px;\"> <span id=\"spanEmployeeFullName\"></span> <br> <span id=\"spanEmployeeAddress1\"></span>&nbsp; <span id=\"spanEmployeeAddress2\"></span>&nbsp; <span id=\"spanEmployeeAddress3\"></span>&nbsp; <br> <span id=\"spanEmployeeCity\"></span>&nbsp; <span id=\"spanEmployeeStateCode\"></span>&nbsp; <span id=\"spanEmployeeZipCode\"></span> </div> </td> <td style=\"width:30%\"></td> <td style=\"width:35%\"> </td> </tr> </table> <br> <table width=\"100%\" align=\"top\" class=\"tableReport\"> <tr style=\"width:100%\" align=\"top\"> <td style=\"width:50%;  margin-top:0px; vertical-align:top;\"> <table style=\"width:100%; border: 1px solid #90949b;\"> <thead style=\"width:100%\" valign=\"top\"> <tr style=\"background-color:#4267b2;color:#fff\"> <th style=\"text-align:left; padding-left:5px;\"> Pay </th> <th style=\"text-align:right;\"> Hours </th> <th style=\"text-align:right;\"> Rate </th> <th style=\"text-align:right;\"> Current </th> <th style=\"text-align:right;\"> YTD&nbsp;&nbsp; </th> </tr> </thead> <tr> <td style=\"width:20%;text-align:left;padding-left:5px;\"> <span id=\"spanPayType\"></span> </td> <td style=\"padding: 5px 0px 5px 0px; text-align:right;\"> <span id=\"spanHours\"></span> </td> <td style=\"width:20%; text-align:right;\"> <span id=\"spanRate\"></span> </td> <td style=\"padding: 5px 0px 5px 0px; text-align:right;\"> <span id=\"spanRegularAmount\"></span> </td> <td style=\"padding: 5px 0px 5px 0px; text-align:right;\"> <span id=\"spanRegularAmountYTD\"></span>&nbsp;&nbsp; </td> </tr> </table> </td> <td style=\"width:1%\"></td> <td style=\"width:49%; margin-top:0px;\" align=\"top\"> <table style=\"width:100%; border: 1px solid #90949b;\"> <thead style=\"width:100%\"> <tr style=\"background-color:#4267b2;color:#fff\"> <th style=\"text-align:left; padding-left:5px;\"> Taxes WithHeld </th> <th style=\"text-align:right;\"> Current </th> <th style=\"text-align:right;\"> YTD </th> </tr> <tr> <td style=\"text-align:left; padding-left:5px;\">Federal Income Tax</td> <td style=\"text-align:right;\"> <span id=\"spanFederalTaxAmount\"></span> </td> <td style=\"text-align:right;\"> <span id=\"spanFederalTaxAmountYTD\"> </span> </td> </tr> <tr> <td style=\"text-align:left; padding-left:5px;\">Social Security</td> <td style=\"text-align:right;\"> <span id=\"spanSocialSecurityTaxAmount\"></span> </td> <td style=\"text-align:right;\"> <span id=\"spanSocialSecurityTaxAmountYTD\"> </span> </td> </tr> <tr> <td style=\"text-align:left; padding-left:5px;\">Medicare </td> <td style=\"text-align:right;\"> <span id=\"spanMedicareTaxAmountAmount\"></span> </td> <td style=\"text-align:right;\"> <span id=\"spanMedicareTaxAmountYTD\"> </span> </td> </tr> <tr> <td style=\"text-align:left; padding-left:5px;\"> <span style=\"text-align:left;\" class=\"state\"></span> Income Tax</td> <td style=\"text-align:right;\"> <span id=\"spanStateTaxAmount\"></span> </td> <td style=\"text-align:right;\"> <span id=\"spanStateTaxAmountYTD\"> </span> </td> </tr> </thead> </table> </td> </tr> <tr> <td style=\"width:51%\" colspan=\"2\"></td> <td style=\"width:49%\"> <table style=\"width:100%; border: 1px solid #90949b; margin-top: 5px;\"> <thead> <tr style=\"background-color:#4267b2;color:#fff\"> <th style=\"text-align:left; padding-left:5px;\"> <b>Summary</b> </th> <th style=\"text-align:right;\"> Current </th> <th style=\"text-align:right;\"> YTD </th> </tr> </thead> <tr> <td style=\"text-align:left; padding-left:5px;\">Total Pay</td> <td style=\"text-align:right;\"> <span style=\"text-align:right;\" id=\"spanTotalPaid\"></span> </td> <td style=\"text-align:right;\"> <span style=\"text-align:right;\" id=\"spanTotalPaidYTD\"> </span> </td> </tr> <tr> <td style=\"text-align:left; padding-left:5px;\">Additions </td> <td style=\"text-align:right;\"> <span id=\"spanAdditions\"></span> </td> <td style=\"text-align:right;\"> <span id=\"spanAdditionsYTD\"> </span> </td> </tr> <tr> <td style=\"text-align:left; padding-left:5px;\">Deductions </td> <td style=\"text-align:right;\"> <span id=\"spanDeductions\"></span> </td> <td style=\"text-align:right;\"> <span id=\"spanDeductionsYTD\"> </span> </td> </tr> <tr> <td style=\"text-align:left; padding-left:5px;\">Taxes </td> <td style=\"text-align:right;\"> <span id=\"spanTax\"></span> </td> <td style=\"text-align:right;\"> <span id=\"spanTaxYTD\"> </span> </td> </tr> <tr style=\"border-top : 1px solid #90949b;\"> <td> </td> <td style=\"text-align:right;\"> <b>Net This Check</b> </td> <td style=\"text-align:right;\"> <b> <span id=\"spanNetPayCheckSummary\"> </span> </b> </td> </tr> </table> </td> </tr> </table> <br> <table style=\"width:100%; border: 1px solid #90949b;\"> <tr> <td style=\"width:50%;\"> <table style=\"width:100%; margin: 5px; border: 1px solid #90949b;\"> <thead> <tr style=\"background-color:#4267b2;color:#fff\"> <th style=\"text-align:left; padding-left:5px;\"> <b>Employer Taxes</b> </th> <th style=\"text-align:right;\"> Current </th> <th style=\"text-align:right;\"> YTD </th> </tr> </thead> <tr> <td style=\"text-align:left;padding-left:5px;\">FUTA Employer </td> <td style=\"text-align:right;\"> <span id=\"spanEmployerFUTATaxAmount\"></span> </td> <td style=\"text-align:right;\"> <span id=\"spanEmployerFUTATaxAmountYTD\"> </span> </td> </tr> <tr> <td style=\"text-align:left;padding-left:5px;\">Social Security Employer </td> <td style=\"text-align:right;\"> <span id=\"spanEmployerSocialSecurityTaxAmount\"></span> </td> <td style=\"text-align:right;\"> <span id=\"spanEmployerSocialSecurityTaxAmountYTD\"> </span> </td> </tr> <tr> <td style=\"text-align:left;padding-left:5px;\">Medicare Employer </td> <td style=\"text-align:right;\"> <span id=\"spanEmployerMedicareTaxAmount\"></span> </td> <td style=\"text-align:right;\"> <span id=\"spanEmployerMedicareTaxAmountYTD\"> </span> </td> </tr> <tr> <td style=\"text-align:left;padding-left:5px;\"> <span style=\"text-align:left;\" class=\"state\"></span> SUI Employer </td> <td style=\"text-align:right;\"> <span id=\"spanEmployerSUITaxAmount\"></span> </td> <td style=\"text-align:right;\"> <span id=\"spanEmployerSUITaxAmountYTD\"> </span> </td> </tr> <tr> <td style=\"text-align:left;padding-left:5px;\">Admin Assessment Tax Employer </td> <td style=\"text-align:right;\"> <span id=\"spanEmployerAdminAssessmentTaxAmount\"></span> </td> <td style=\"text-align:right;\"> <span id=\"spanEmployerAdminAssessmentTaxAmountYTD\"> </span> </td> </tr> <tr style=\"background-color:#bfbfbf;\"> <td style=\"text-align:left;padding-left:5px;\"> <b>Total</b> </td> <td style=\"text-align:right;\"> <b> <span id=\"spanTotalEmployerTax\"></span> </b> </td> <td style=\"text-align:right;\"> <b> <span id=\"spanTotalEmployerTaxYTD\"> </span> </b> </td> </tr> </table> </td> <td></td> </tr> </table> </div> </div> </div> </div> </div> </div> ");

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
      "/javascripts/Client/Reports/EmployeeReports/LastPayCheck.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
