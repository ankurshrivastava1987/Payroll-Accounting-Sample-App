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
      __MobileHeader = loadTemplate(require.resolve("./MobileHeader.marko")),
      __Header = loadTemplate(require.resolve("./Header.marko")),
      __Footer = loadTemplate(require.resolve("./Footer.marko")),
      __MasterFooter = loadTemplate(require.resolve("./MasterFooter.marko")),
      lasso_body = __loadTag(require("lasso/taglib/body-tag")),
      init_widgets = __loadTag(require("marko-widgets/taglib/init-widgets-tag")),
      browser_refresh = __loadTag(require("browser-refresh-taglib/refresh-tag"));

  return function render(data, out) {
    lasso_page({
        dirname: __dirname,
        filename: __filename
      }, out);

    out.w("<!DOCTYPE html> <!--[if IE 8 ]>\r\n<html class=\"no-js ie8\" lang=\"en\"> <![endif]--> <!--[if IE 9 ]>\r\n<html class=\"no-js ie9\" lang=\"en\"> <![endif]--> <html class=\"no-js\" lang=\"en\"> <head lang=\"en\"> ");

    __MasterHeader.render({
        title: data.title,
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" ");

    lasso_head({}, out);

    out.w(" </head> <body class=\"cssAnimate ct-headroom--scrollUpMenu\"> ");

    __MobileHeader.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <div id=\"ct-js-wrapper\"> ");

    __Header.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <section class=\"ct-u-paddingBoth50\"> <div class=\"container\"> <div class=\"text-center ct-u-marginBoth60\" style=\"padding-bottom:50px\"> <h5 class=\"text-uppercase page-heading\">Plans</h5> </div> <div id=\"divPlans\"> <table align=\"center\"> <tr> <td style=\"padding-right:50px\"> <table> <tr> <td style=\"background-color: #4267b2;color:#fff;font-size:20px;text-align:center\"> <b>Basic Payroll</b> </td> </tr> <tr> <td style=\"border:1px solid #d3d3d3;padding-bottom:5px\"> <table style=\"width:356px;text-align:center\" border=\"0\"> <tr> <td> <sup>$</sup><span style=\"font-size:38px\"> <b>20.00</b> </span>/Month </td> </tr> <tr> <td> was $<strike>25.00</strike> </td> </tr> <tr> <td> <span style=\"color:red\">20% OFF</span> for 6 months </td> </tr> <tr> <td> + $2.00/Employee Per Month </td> </tr> <tr> <td> <a class=\"btn btn-lg btn-motive ct-btn-rounded ct-hover--outlineOut\" href=\"/SignUp/1/Monthly\"> <i class=\"fa fa-briefcase\"></i> <span>Try it Free</span> </a> </td> </tr> <tr> <td style=\"padding-left:20px;padding-right:20px;text-align:left\"> <table class=\"listbox\" style=\"width:100%\"> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Easily pay W2 employees</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Easily pay 1099 contractors</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Click to print checks for free</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Use free direct deposit</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Phone support</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Chat support</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Email support</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Free Year End Help</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>Print W-2's for employees</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>Federal tax forms included</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>State tax forms included</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>Local tax forms included</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>Click for payroll tax E-File &amp; E-Pay</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>We file and pay taxes for you</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>No tax penalties, guaranteed</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>Payroll setup completed for you</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>Free year-end forms included</td> </tr> </table> </td> </tr> <tr> <td style=\"padding:10px\"> <a class=\"btn btn-motive btn-sm ct-btn-rounded ct-btn-transparent ct-hover--outlineOut\" href=\"/Basic-Payroll\"> <i class=\"fa fa-file-text-o\"></i> <span>Learn More</span> </a> </td> </tr> </table> </td> </tr> </table> </td> <td style=\"padding-right:50px\"> <table class=\"badge1\" data-badge=\"MOST POPULAR\"> <tr> <td style=\"background-color: #4267b2;color:#fff;font-size:20px;text-align:center\"> <b>Enhanced Payroll</b> </td> </tr> <tr> <td style=\"border:1px solid #d3d3d3;padding-bottom:5px\"> <table style=\"width:356px;text-align:center\" border=\"0\"> <tr> <td> <sup>$</sup><span style=\"font-size:38px\"> <b>31.20</b> </span>/Month </td> </tr> <tr> <td> was $<strike>39.00</strike> </td> </tr> <tr> <td> <span style=\"color:red\">20% OFF</span> for 6 months </td> </tr> <tr> <td> + $2.00/Employee Per Month </td> </tr> <tr> <td> <a class=\"btn btn-lg btn-motive ct-btn-rounded ct-hover--outlineOut\" href=\"/SignUp/2/Monthly\"> <i class=\"fa fa-briefcase\"></i> <span>Try it Free</span> </a> </td> </tr> <tr> <td style=\"padding-left:20px;padding-right:20px;text-align:left\"> <table class=\"listbox\" style=\"width:100%\"> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Easily pay W2 employees</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Easily pay 1099 contractors</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Click to print checks for free</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Use free direct deposit</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Phone support</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Chat support</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Email support</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Free Year End Help</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Print W-2's for employees</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Federal tax forms included</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>State tax forms included</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>Local tax forms included</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>Click for payroll tax E-File &amp; E-Pay</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>We file and pay taxes for you</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>No tax penalties, guaranteed</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>Payroll setup completed for you</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check inactive\"></i> </td> <td>Free year-end forms included</td> </tr> </table> </td> </tr> <tr> <td style=\"padding:10px\"> <a class=\"btn btn-motive btn-sm ct-btn-rounded ct-btn-transparent ct-hover--outlineOut\" href=\"/Enhanced-Payroll\"> <i class=\"fa fa-file-text-o\"></i> <span>Learn More</span> </a> </td> </tr> </table> </td> </tr> </table> </td> <td> <table> <tr> <td style=\"background-color: #4267b2;color:#fff;font-size:20px;text-align:center\"> <b>Full Service Payroll</b> </td> </tr> <tr> <td style=\"border:1px solid #d3d3d3;padding-bottom:5px\"> <table style=\"width:356px;text-align:center\" border=\"0\"> <tr> <td> <sup>$</sup><span style=\"font-size:38px\"> <b>79.00</b> </span>/Month </td> </tr> <tr> <td> was $<strike>99.00</strike> </td> </tr> <tr> <td> <span style=\"color:red\">20% OFF</span> for 6 months </td> </tr> <tr> <td> + $2.00/Employee Per Month </td> </tr> <tr> <td style=\"padding:10px\"> <a class=\"btn btn-lg btn-motive ct-btn-rounded ct-hover--outlineOut\" href=\"javascript:void(0)\"> <i class=\"fa fa-briefcase\"></i> <span>Contact Us</span> </a> </td> </tr> <tr> <td style=\"padding-left:20px;padding-right:20px;text-align:left\"> <table class=\"listbox\" style=\"width:100%\"> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Easily pay W2 employees</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Easily pay 1099 contractors</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Click to print checks for free</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Use free direct deposit</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Phone support</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Chat support</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Email support</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Free Year End Help</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Print W-2's for employees</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Federal tax forms included</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>State tax forms included</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Local tax forms included</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Click for payroll tax E-File &amp; E-Pay</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>We file and pay taxes for you</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>No tax penalties, guaranteed</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Payroll setup completed for you</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>Free year-end forms included</td> </tr> </table> </td> </tr> <tr> <td style=\"padding:10px\"> <a class=\"btn btn-motive btn-sm ct-btn-rounded ct-btn-transparent ct-hover--outlineOut\" href=\"/Full-Service-Payroll\"> <i class=\"fa fa-file-text-o\"></i> <span>Learn More</span> </a> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </div> </div> </section> ");

    __Footer.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </div> <a href=\"#\" class=\"ct-js-btnScrollUp\"> <i class=\"fa fa-angle-up\"></i> </a> ");

    __MasterFooter.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
