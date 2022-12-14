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
      escapeXmlAttr = __helpers.xa,
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

    out.w(" <section class=\"ct-u-paddingBoth50\"> <div class=\"container\"> <div class=\"text-center ct-u-marginBoth60\" style=\"padding-bottom:50px\"> <h5 class=\"text-uppercase page-heading\">Full Service Payroll</h5> </div> <div class=\"row\"> <div class=\"col-sm-6\"> <h4 class=\"ct-u-ls-2\">Payroll done for you. Payroll done right.</h4> <p class=\"ct-fs-i ct-fw-500\"> <ul class=\"ulleft\"> <li>We set up, run payroll &amp; file payroll taxes</li> <li>Error-free, accuracy guaranteed</li> <li>Free US-based live support</li> </ul> </p> <div style=\"text-align:center\"> <table class=\"badge1\" data-badge=\"30 DAY FREE TRIAL\"> <tr> <td style=\"background-color: #4267b2;color:#fff;font-size:20px\"> <b>Full Service Payroll</b> </td> </tr> <tr> <td style=\"border:1px solid #d3d3d3;padding-bottom:5px\"> <table style=\"width:356px\" border=\"0\"> <tr> <td> <sup>$</sup><span style=\"font-size:38px\"> <b>79.00</b> </span>/Month </td> </tr> <tr> <td> was $<strike>99.00</strike> </td> </tr> <tr> <td> <span style=\"color:red\">20% OFF</span> for 6 months </td> </tr> <tr> <td> + $2.00/Employee Per Month </td> </tr> <tr> <td> <a class=\"btn btn-motive btn-sm ct-btn-rounded ct-btn-transparent ct-hover--outlineOut\" href=\"javascript:void(0)\"> <i class=\"fa fa-file-text-o\"></i> <span>Contact Us</span> </a> </td> </tr> </table> </td> </tr> </table> </div> </div> <div class=\"col-sm-6\"> <a href=\"javascript:void(0)\"> <figure class=\"ct-imageBox effect-apollo\"> <div class=\"ct-imageBox-image\"> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/Payroll_Pic_11.jpg\" alt=\"img12\"> </div> <figcaption> <div> <header class=\"ct-imageBox-title\"> <h3> <small>Secretaries of Confucius</small> </h3> <p>Illustration</p> </header> </div> </figcaption> </figure> </a> </div> </div> <div style=\"height:50px\"></div> <div style=\"border-top: 1px solid #d3d3d3;height:50px\"></div> <table style=\"width:100%\"> <tr> <td colspan=\"2\" class=\"text-center\"> <h4 class=\"ct-u-ls-2\">Want us to handle all things payroll? We're on it.</h4> </td> </tr> <tr> <td> <table> <tr> <td> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/overview_basic.gif\"> </td> </tr> <tr> <td> <b>1. Just enter hours, we run payroll for you</b> </td> </tr> <tr> <td> Total pay and hours are instantly calculated for you???so you can print checks or use free direct deposit. Error detection technology ensures accuracy. </td> </tr> </table> </td> <td> <table> <tr> <td> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/overview_basic1.gif\"> </td> </tr> <tr> <td> <b>2. We do payroll taxes and filing for you</b> </td> </tr> <tr> <td> We handle your payroll tax payments and forms for you. Guaranteed accurate and on-time. If a tax issue comes up, we'll resolve it for you. </td> </tr> </table> </td> </tr> </table> <div style=\"height:50px\"></div> <div style=\"border-top: 1px solid #d3d3d3;height:50px\"></div> <table style=\"width:100%\"> <tr> <td colspan=\"2\" class=\"text-center\"> <h4 class=\"ct-u-ls-2\">Full Service Payroll Features</h4> <br> <h4 class=\"ct-u-ls-2\">Worry-free... you enter the hours and we do the rest.</h4> </td> </tr> <tr> <td> <ul class=\"ulleft\"> <li>We setup, run payroll, and file payroll taxes for you</li> <li>We calculate paychecks and all payroll taxes</li> <li>No tax forms included - create reports for your accountant for tax filings</li> <li>Free direct deposit &amp; year-end W-2s</li> <li>No tax pre-payment???pay only when it's due</li> <li>Instant alerts from our Error Detection Technology</li> <li>Guaranteed error-free paychecks &amp; payroll taxes</li> <li>Free live US-based support from experts</li> <li>Free new hire reporting for W-2 employees</li> <li>Run payroll from your iPad, iPhone or Android</li> <li>Works with or without QuickBooks</li> </ul> </td> <td> <div> <b>Additional Services</b> </div> <div> We do more than payroll. Learn about these important services: </div> <ul class=\"ulleft\"> <li>Hassle-free workers' compensation</li> <li>Automatic labor law posters</li> <li>Employee time tracking</li> </ul> <div> Get our FREE hiring guide. <a href=\"javascript:void(0)\">Download now</a> </div> </td> </tr> <tr> <td colspan=\"2\" style=\"text-align:center\"> <a class=\"btn btn-lg btn-motive ct-btn-rounded ct-hover--outlineOut\" href=\"/Plans\"> <i class=\"fa fa-briefcase\"></i> <span>Compare Products</span> </a> </td> </tr> </table> <div style=\"height:50px\"></div> <div style=\"border-top: 1px solid #d3d3d3;height:50px\"></div> <table style=\"width:100%\"> <tr> <td class=\"text-center\"> <h4 class=\"ct-u-ls-2\">So affordable</h4> </td> </tr> <tr> <td class=\"text-center\"> <h4 class=\"ct-u-ls-2\">You can't afford not to use it.</h4> </td> </tr> <tr style=\"height:40px\"> <td>&nbsp;</td> </tr> <tr> <td> <div class=\"row text-center\"> <table align=\"center\"> <tr> <td> <table class=\"badge1\" data-badge=\"30 DAY FREE TRIAL\"> <tr> <td style=\"background-color: #4267b2;color:#fff;font-size:20px\"> <b>Full Service Payroll</b> </td> </tr> <tr> <td style=\"border:1px solid #d3d3d3;padding-bottom:5px\"> <table style=\"width:356px\" border=\"0\"> <tr> <td> <sup>$</sup><span style=\"font-size:38px\"> <b>79.00</b> </span>/Month </td> </tr> <tr> <td> was $<strike>99.00</strike> </td> </tr> <tr> <td> <span style=\"color:red\">20% OFF</span> for 6 months </td> </tr> <tr> <td> + $2.00/Employee Per Month </td> </tr> <tr> <td> <a class=\"btn btn-motive btn-sm ct-btn-rounded ct-btn-transparent ct-hover--outlineOut\" href=\"javascript:void(0)\"> <i class=\"fa fa-file-text-o\"></i> <span>Contact Us</span> </a> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </div> </td> </tr> </table> <div style=\"height:50px\"></div> <div style=\"border-top: 1px solid #d3d3d3;height:50px\"></div> <table style=\"width:100%;\"> <tr> <td style=\"vertical-align:top;padding-right:5px;\"> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/icon_hire.png\"> </td> <td style=\"vertical-align:top\"> <b>Get your FREE hiring guide</b><br> Get valuable, easy-to-access advice on hiring, training & keeping great employees. Download now </td> <td style=\"vertical-align:top;padding-right:5px;\"> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/icon_calculator.png\"> </td> <td style=\"vertical-align:top\"> <b>Up-to-Date Accuracy</b><br> We automatically update the latest tax rates to guarantee accuracy on all calculations. Learn more </td> <td style=\"vertical-align:top;padding-right:5px;\"> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/icon_accountant.png\"> </td> <td style=\"vertical-align:top\"> <b>Are you an accountant?</b><br> Complete payroll solutions that help accounting professionals help their clients. Learn more </td> </tr> </table> </div> </section> ");

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
