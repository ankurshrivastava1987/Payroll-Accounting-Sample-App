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

    out.w(" <section class=\"ct-u-paddingBoth50\"> <div class=\"container\"> <div class=\"text-center ct-u-marginBoth60\" style=\"padding-bottom:50px\"> <h5 class=\"text-uppercase page-heading\">Hiring Employees</h5> </div> <div class=\"row\"> <div class=\"col-sm-6\"> <h4 class=\"ct-u-ls-2\">Here to help you hire, whenever you're ready.</h4> <h5>Tools and tips for everything from posting ads &amp; interviewing to setting up payroll taxes and employee benefits.</h5> </div> <div class=\"col-sm-6\"> <a href=\"javascript:void(0)\"> <figure class=\"ct-imageBox effect-apollo\"> <div class=\"ct-imageBox-image\"> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/Payroll_Pic_12.jpg\" alt=\"img12\"> </div> </figure> </a> </div> </div> <div style=\"height:50px\"></div> <div style=\"border-top: 1px solid #d3d3d3;height:50px\"></div> <table style=\"width:100%\"> <tr> <td style=\"vertical-align:top;width:33.3%;padding-right:20px;\"> <table> <tr> <td> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/hiring1.jpg\"> </td> </tr> <tr> <td> <b>Thinking about Hiring?</b> </td> </tr> <tr> <td> No time for the paperwork? Or worse? Falling behind on orders? We help you decide when-and how-to hire. </td> </tr> <tr> <td> <a href=\"javascript:void(0)\" class=\"link\">Why it pays to hire</a> </td> </tr> </table> </td> <td style=\"vertical-align:top;width:33.3%;padding-right:20px;\"> <table> <tr> <td> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/hiring2.jpg\"> </td> </tr> <tr> <td> <b>Ready to Hire?</b> </td> </tr> <tr> <td> You know you're ready. You also know there's a lot you don't know. Relax. We break it all down for you. </td> </tr> <tr> <td> <a href=\"javascript:void(0)\" class=\"link\">1099 contractor or W2?</a> </td> </tr> </table> </td> <td style=\"vertical-align:top;width:33.3%\"> <table> <tr> <td> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/hiring3.jpg\"> </td> </tr> <tr> <td> <b>You've Hired. Now what?</b> </td> </tr> <tr> <td> Check out ways to keep employees motivated-and keep current with all the tax and government stuff. </td> </tr> <tr> <td> <a href=\"javascript:void(0)\" class=\"link\">Make payroll easy</a> </td> </tr> <tr> <td> <a href=\"javascript:void(0)\">Government Stuff</a> </td> </tr> </table> </td> </tr> </table> <div style=\"height:50px\"></div> <div style=\"border-top: 1px solid #d3d3d3;height:50px\"></div> <table style=\"width:100%\"> <tr> <td colspan=\"3\" style=\"text-align:center\"> <h4 class=\"ct-u-ls-2\">Hiring Facts &amp; Insights</h4> </td> </tr> <tr> <td style=\"padding-right:20px;\"> <table> <tr> <td style=\"padding-right:5px\"> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/hiring_icon_umbrella.jpg\"> </td> <td> Businesses with employees are three times more likely to survive. </td> </tr> </table> </td> <td style=\"padding-right:20px;\"> <table> <tr> <td style=\"padding-right:5px\"> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/hiring_icon_80_graph.jpg\"> </td> <td> The best time to hire is when your business is working at 80% capacity. </td> </tr> </table> </td> <td> <table> <tr> <td style=\"padding-right:5px\"> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/hiring_icon_gavel.jpg\"> </td> <td> IRS stats show nearly 30% of businesses misclassify contractors, a known penalty-risk. </td> </tr> </table> </td> </tr> </table> <div style=\"height:50px\"></div> <div style=\"border-top: 1px solid #d3d3d3;height:50px\"></div> <table style=\"width:100%;\"> <tr> <td style=\"vertical-align:top;padding-right:5px;\"> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/icon_hire.png\"> </td> <td style=\"vertical-align:top;padding-right:20px\"> <b>Get your FREE hiring guide</b><br> Get valuable, easy-to-access advice on hiring, training &amp; keeping great employees. Download now </td> <td style=\"vertical-align:top;padding-right:5px;\"> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/icon_calculator.png\"> </td> <td style=\"vertical-align:top;padding-right:20px\"> <b>Up-to-Date Accuracy</b><br> We automatically update the latest tax rates to guarantee accuracy on all calculations. Learn more </td> <td style=\"vertical-align:top;padding-right:5px;\"> <img src=\"" +
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
