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
      attr = __helpers.a,
      ___Header = loadTemplate(require.resolve("../../Header.marko")),
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
      "/stylesheets/progress-wizard.min.css\"> ");

    lasso_head({}, out);

    out.w(" </head> <body class=\"leftbar-view\"> <input type=\"hidden\" id=\"hdnServiceCancellationId\"" +
      attr("value", data.ServiceCancellationId) +
      "> ");

    ___Header.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <section class=\"main-container\"> <div class=\"container-fluid\"> <div class=\"page-header filled full-block light\"> <div class=\"row\"> <div class=\"col-md-6\"> <h2>" +
      escapeXml(data.PageHeading) +
      "</h2> <ul class=\"list-page-breadcrumb\"> <li> <a href=\"#\"> Service Cancellation <i class=\"zmdi zmdi-chevron-right\"></i> </a> </li> <li class=\"active-page\"> " +
      escapeXml(data.PageHeading) +
      "</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> <form method=\"post\" class=\"j-forms\" id=\"frmEntry\"> <table class=\"tableEntry\"> <tr> <td> Service Cancellation:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbServiceCancellation\" name=\"cmbServiceCancellation\" class=\"form-control\" onchange=\"ServiceCancellationChange()\"></select> </div> </div> </td> </tr> <tr> <td> Other: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtReason\" name=\"txtReason\" type=\"text\" maxlength=\"500\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> <span id=\"spanSSN\">Other Payment Method: </span> <span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbOtherPaymentMethod\" name=\"cmbOtherPaymentMethod\" class=\"form-control\" onchange=\"OtherPaymentMethodChange()\"></select> </div> </div> </td> </tr> <tr> <td> Other Payment Method, Please describe: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtOtherPaymentMethod\" name=\"txtOtherPaymentMethod\" type=\"text\" maxlength=\"500\" class=\"form-control\"> </div> </div> </td> </tr> <tr id=\"trFederalIncomeTax\"> <td> Rating : </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbRating\" name=\"cmbRating\" class=\"form-control\"> <option value=\"1\">1</option> <option value=\"2\">2</option> <option value=\"3\">3</option> <option value=\"4\">4</option> <option value=\"5\">5</option> </select> </div> </div> </td> </tr> <tr id=\"trSocialSecurity\"> <td> Reason of Rating: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtReasonOfRating\" name=\"txtReasonOfRating\" type=\"text\" maxlength=\"500\" class=\"form-control\"> </div> </div> </td> </tr> </table> <table> <tr> <td></td> <td style=\"padding-top:20px\"> <button id=\"btnSave\" type=\"button\" class=\"uibutton large confirm\" onclick=\"Save()\">Cancel Service</button>&nbsp; </td> </tr> </table> </form> </div> </div> </div> </div> </div> </div> ");

    ___Footer.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </section> ");

    ___MasterFooter.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.mask.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/bootbox.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Client/SetUp/ServiceCancellation/ServiceCancellation.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
