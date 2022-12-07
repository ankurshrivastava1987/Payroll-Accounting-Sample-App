function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      __loadTag = __helpers.t,
      lasso_page = __loadTag(require("lasso/taglib/page-tag")),
      loadTemplate = __helpers.l,
      __MasterHeader = loadTemplate(require.resolve("./MasterHeader.marko")),
      lasso_head = __loadTag(require("lasso/taglib/head-tag")),
      __Header1 = loadTemplate(require.resolve("./Header1.marko")),
      __Footer = loadTemplate(require.resolve("./Footer.marko")),
      __MasterFooter = loadTemplate(require.resolve("./MasterFooter.marko")),
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

    __MasterHeader.render({
        title: data.title,
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" ");

    lasso_head({}, out);

    out.w(" </head> <body class=\"leftbar-view\"> ");

    __Header1.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <section class=\"main-container\"> <div class=\"container-fluid\"> <div class=\"page-header filled full-block light\"> <div class=\"row\"> <div class=\"col-md-6\"> <h2>" +
      escapeXml(data.PageHeading) +
      "</h2> <ul class=\"list-page-breadcrumb\"> <li class=\"active-page\"> " +
      escapeXml(data.PageHeading) +
      "</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> <form method=\"post\" class=\"j-forms\" id=\"frmEntry\"> <table> <tr> <td style=\"vertical-align:top;\"> <table> <tr style=\"background-color:#4267b2;color:#fff;font-size:20px\"> <td> Plan </td> <td> 1 Month </td> <td> 1 Year </td> </tr> <tr> <td style=\"border:1px solid #d3d3d3\"> Basic </td> <td style=\"border:1px solid #d3d3d3\"> <input id=\"optBasicMonth\" type=\"radio\" name=\"Plans\" checked><span id=\"spanBasicMonth\">$20.00</span> <br> + $2.00/Employee Per Month </td> <td style=\"border:1px solid #d3d3d3\"> <input id=\"optBasicYear\" type=\"radio\" name=\"Plans\"><span id=\"spanBasicYear\">$225.00 </span><br> + $2.00/Employee Per Month </td> </tr> <tr> <td style=\"border:1px solid #d3d3d3\"> Enhanced </td> <td style=\"border:1px solid #d3d3d3\"> <input id=\"optEnhancedMonth\" type=\"radio\" name=\"Plans\"><span id=\"spanEnhancedMonth\">$31.20</span> <br> + $2.00/Employee Per Month </td> <td style=\"border:1px solid #d3d3d3\"> <input id=\"optEnhancedYear\" type=\"radio\" name=\"Plans\"><span id=\"spanEnhancedYear\">$351.00</span> <br> + $2.00/Employee Per Month </td> </tr> <tr> <td style=\"border:1px solid #d3d3d3\"> Full Service </td> <td style=\"border:1px solid #d3d3d3\"> <input id=\"optFullServiceMonth\" type=\"radio\" name=\"Plans\"><span id=\"spanFullServiceMonth\">$79.00</span> <br> + $2.00/Employee Per Month </td> <td style=\"border:1px solid #d3d3d3\"> &nbsp; </td> </tr> </table> <br> <table class=\"tableEntry\"> <tr> <td>Card No.</td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtCardNo\" name=\"txtCardNo\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td>Expiry Date</td> <td> <div class=\"unit\"> <div class=\"input\"> <div class=\"row\"> <div class=\"col-xs-6\"> <select id=\"cmbMonth\" name=\"cmbMonth\" class=\"form-control\" style=\"width:120px\"> <option value=\"0\" selected=\"true\"></option> <option value=\"1\">January</option> <option value=\"2\">February</option> <option value=\"3\">March</option> <option value=\"4\">April</option> <option value=\"5\">May</option> <option value=\"6\">June</option> <option value=\"7\">July</option> <option value=\"8\">August</option> <option value=\"9\">September</option> <option value=\"10\">October</option> <option value=\"11\">November</option> <option value=\"12\">December</option> </select> </div> <div class=\"col-xs-6\"> <select id=\"cmbYear\" name=\"cmbYear\" class=\"form-control\"> </select> </div> </div> </div> </div> </td> </tr> <tr> <td>CVC</td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtCVC\" name=\"txtCVC\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td></td> <td> <button id=\"btnPayNow\" type=\"button\" class=\"btn btn-primary\" onclick=\"PayNow()\">Pay Now</button> </td> </tr> </table> </td> <td style=\"padding-left:50px;\"> <table id=\"tblBasic\"> <tr> <td style=\"background-color: #4267b2;color:#fff;font-size:20px;text-align:center\"> <b>Basic Payroll</b> </td> </tr> <tr> <td style=\"border:1px solid #d3d3d3;padding-bottom:5px\"> <table style=\"width:356px;text-align:center\" border=\"0\"> <tr> <td style=\"padding-left:20px;padding-right:20px;text-align:left\"> <table class=\"listbox\" style=\"width:100%\"> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Easily pay W2 employees</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Easily pay 1099 contractors</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Click to print checks for free</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Use free direct deposit</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Phone support</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Chat support</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Email support</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Free Year End Help</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>Print W-2's for employees</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>Federal tax forms included</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>State tax forms included</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>Local tax forms included</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>Click for payroll tax E-File &amp; E-Pay</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>We file and pay taxes for you</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>No tax penalties, guaranteed</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>Payroll setup completed for you</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>Free year-end forms included</td> </tr> </table> </td> </tr> </table> </td> </tr> </table> <table id=\"tblEnhanced\" class=\"badge1 hide\" data-badge=\"MOST POPULAR\"> <tr> <td style=\"background-color: #4267b2;color:#fff;font-size:20px;text-align:center\"> <b>Enhanced Payroll</b> </td> </tr> <tr> <td style=\"border:1px solid #d3d3d3;padding-bottom:5px\"> <table style=\"width:356px;text-align:center\" border=\"0\"> <tr> <td style=\"padding-left:20px;padding-right:20px;text-align:left\"> <table class=\"listbox\" style=\"width:100%\"> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Easily pay W2 employees</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Easily pay 1099 contractors</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Click to print checks for free</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Use free direct deposit</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Phone support</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Chat support</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Email support</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Free Year End Help</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Print W-2's for employees</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Federal tax forms included</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>State tax forms included</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>Local tax forms included</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>Click for payroll tax E-File &amp; E-Pay</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>We file and pay taxes for you</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>No tax penalties, guaranteed</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>Payroll setup completed for you</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>Free year-end forms included</td> </tr> </table> </td> </tr> </table> </td> </tr> </table> <table id=\"tblFullService\" class=\"hide\"> <tr> <td style=\"background-color: #4267b2;color:#fff;font-size:20px;text-align:center\"> <b>Full Service Payroll</b> </td> </tr> <tr> <td style=\"border:1px solid #d3d3d3;padding-bottom:5px\"> <table style=\"width:356px;text-align:center\" border=\"0\"> <tr> <td style=\"padding-left:20px;padding-right:20px;text-align:left\"> <table class=\"listbox\" style=\"width:100%\"> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Easily pay W2 employees</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Easily pay 1099 contractors</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Click to print checks for free</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Use free direct deposit</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Phone support</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Chat support</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Email support</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Free Year End Help</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Print W-2's for employees</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Federal tax forms included</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>State tax forms included</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Local tax forms included</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Click for payroll tax E-File &amp; E-Pay</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>We file and pay taxes for you</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>No tax penalties, guaranteed</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Payroll setup completed for you</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Free year-end forms included</td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </form> </div> </div> </div> </div> </div> </div> ");

    __Footer.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </section> ");

    __MasterFooter.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Client/Plans.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
