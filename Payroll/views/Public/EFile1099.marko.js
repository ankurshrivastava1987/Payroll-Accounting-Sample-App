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

    out.w(" <section class=\"ct-u-paddingBoth50\"> <div class=\"container\"> <div class=\"text-center ct-u-marginBoth60\" style=\"padding-bottom:50px\"> <h5 class=\"text-uppercase page-heading\">E-file 1099</h5> </div> <div class=\"row\"> <div class=\"col-sm-6\"> <h4 class=\"ct-u-ls-2\">Easy, Accurate &amp; On Time</h4> <p class=\"ct-fs-i ct-fw-500\"> <ul class=\"ulleft\"> <li>Forms filled-in with your data</li> <li>Email or print copies for contractors</li> <li>Flexible pricing, pay only when you use</li> </ul> </p> <div style=\"text-align:center\"> <table> <tr> <td style=\"background-color: #0086fe;color:#fff;font-size:20px\"> <b>1099 E-File Service</b> </td> </tr> <tr> <td style=\"border:1px solid #d3d3d3;padding-bottom:5px\"> <table style=\"width:356px\" border=\"0\"> <tr> <td> Starting at <sup>$</sup><span style=\"font-size:38px\"> <b>14.00</b> </span> </td> </tr> <tr> <td> included 3 forms </td> </tr> <tr> <td> Additional forms $3.99 each </td> </tr> </table> </td> </tr> </table> </div> </div> <div class=\"col-sm-6\"> <a href=\"javascript:void(0)\"> <figure class=\"ct-imageBox effect-apollo\"> <div class=\"ct-imageBox-image\"> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/1099.png\" alt=\"img12\"> </div> </figure> </a> </div> </div> <div style=\"height:50px\"></div> <div style=\"border-top: 1px solid #d3d3d3;height:50px\"></div> <table style=\"width:100%\"> <tr> <td colspan=\"3\" class=\"text-center\"> <h4 class=\"ct-u-ls-2\">Avoid late nights and late forms</h4> </td> </tr> <tr> <td> <table border=\"0\"> <tr> <td> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/efile_overview_1.gif\"> </td> </tr> <tr> <td> <b>1. Fill in forms</b> </td> </tr> <tr> <td> <ul class=\"ulleft\"> <li>Use our step-by-step system</li> <li>Import from Quickbooks</li> <li>Auto-fill with Intuit Payroll</li> </ul> </td> </tr> </table> </td> <td> <table> <tr> <td> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/efile_overview_2.gif\"> </td> </tr> <tr> <td> <b>2. Provide contractor forms</b> </td> </tr> <tr> <td> <ul class=\"ulleft\"> <li>Create 1099 forms for contractors</li> <li>Email or print contractor copies</li> <li>Download for your records</li> </ul> </td> </tr> </table> </td> <td> <table> <tr> <td> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/efile_overview_3.gif\"> </td> </tr> <tr> <td> <b>3. E-file with the IRS</b> </td> </tr> <tr> <td> <ul class=\"ulleft\"> <li>E-file on time - even on deadline day</li> <li>No paper, stamps or mailings</li> </ul> </td> </tr> </table> </td> </tr> </table> <div style=\"height:50px\"></div> <div style=\"border-top: 1px solid #d3d3d3;height:50px\"></div> <h4 class=\"ct-u-ls-2\">Frequently Asked Questions</h4> <div class=\"panel-group\" id=\"accordion\" role=\"tablist\" aria-multiselectable=\"true\"> <div class=\"panel panel-default\"> <div class=\"panel-heading\" role=\"tab\" id=\"heading1\"> <h4 class=\"panel-title\"> <a role=\"button\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse1\" aria-expanded=\"true\" aria-controls=\"collapse1\"> Q. What does 1099 E-file cost? </a> </h4> </div> <div id=\"collapse1\" class=\"panel-collapse collapse in\" role=\"tabpanel\" aria-labelledby=\"heading1\"> <div class=\"panel-body\"> A: The service starts at $14.99, and includes creation and e-filing of up to three 1099-MISC forms. After three, the price is $3.99 for each additional form. If you have more than 20 forms, we???ll include them at no additional charge. (Prior to January 17th, we offer an early bird discount starting at $12.99 and $2.99 for each additional form). </div> </div> </div> <div class=\"panel panel-default\"> <div class=\"panel-heading\" role=\"tab\" id=\"heading2\"> <h4 class=\"panel-title\"> <a class=\"collapsed\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse2\" aria-expanded=\"false\" aria-controls=\"collapse2\"> Q. What are the key 1099 deadlines? </a> </h4> </div> <div id=\"collapse2\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"heading2\"> <div class=\"panel-body\"> A: January 1, 2016: 1099 E-File service opens<br> February 1, 2016: Deadline for providing contractors with 1099-MISC copies<br> February 29, 2016: IRS deadline for submitting paper 1099-MISC forms (does not apply to e-filers)<br> March 31, 2016: IRS deadline for e-filing 1099-MISC forms </div> </div> </div> <div class=\"panel panel-default\"> <div class=\"panel-heading\" role=\"tab\" id=\"heading3\"> <h4 class=\"panel-title\"> <a class=\"collapsed\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse3\" aria-expanded=\"false\" aria-controls=\"collapse3\"> Q. How do I get copies to my contractors? </a> </h4> </div> <div id=\"collapse3\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"heading3\"> <div class=\"panel-body\"> A. Intuit 1099 E-file service creates PDF copies of all your forms. Once completed, you can email them or print and mail them to your contractors. Note: In order send a 1099 form electronically, the IRS requires you to get the contractor???s permission. </div> </div> </div> <div class=\"panel panel-default\"> <div class=\"panel-heading\" role=\"tab\" id=\"heading4\"> <h4 class=\"panel-title\"> <a class=\"collapsed\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse4\" aria-expanded=\"false\" aria-controls=\"collapse4\"> Q. How is my copy sent to the IRS? </a> </h4> </div> <div id=\"collapse4\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"heading4\"> <div class=\"panel-body\"> A. We are an approved IRS e-file provider, and we will transmit the form securely and electronically for you. </div> </div> </div> <div class=\"panel panel-default\"> <div class=\"panel-heading\" role=\"tab\" id=\"heading5\"> <h4 class=\"panel-title\"> <a class=\"collapsed\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse5\" aria-expanded=\"false\" aria-controls=\"collapse5\"> Q. What if I use QuickBooks? Can I bring over my data? </a> </h4> </div> <div id=\"collapse5\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"heading5\"> <div class=\"panel-body\"> A. Great question! QuickBooks Windows (versions 2013 and newer) and QuickBooks Online Plus users can access the 1099 center from the Vendors tab. With other versions of QuickBooks, you can still use the service, but you???ll need to key in your data using our easy entry form. </div> </div> </div> <div class=\"panel panel-default\"> <div class=\"panel-heading\" role=\"tab\" id=\"heading6\"> <h4 class=\"panel-title\"> <a role=\"button\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse6\" aria-expanded=\"false\" aria-controls=\"collapse6\"> Q. What if I???m an Intuit Online Payroll customer? </a> </h4> </div> <div id=\"collapse6\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"heading6\"> <div class=\"panel-body\"> A. We love our Payroll customers! If you pay your contractors through Payroll, simply log in and go to Taxes &amp; Forms to get started on your 1099 E-filing. Your data imports automatically. </div> </div> </div> <div class=\"panel panel-default\"> <div class=\"panel-heading\" role=\"tab\" id=\"heading7\"> <h4 class=\"panel-title\"> <a class=\"collapsed\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse7\" aria-expanded=\"false\" aria-controls=\"collapse7\"> Q. As an accountant, can I file for multiple clients? </a> </h4> </div> <div id=\"collapse7\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"heading7\"> <div class=\"panel-body\"> A. Accountants who use Intuit Online Payroll for Accounting Professionals can file for multiple clients at the discounted price of $15 per client. This includes unlimited 1099-MISC forms for each client on the online payroll service. In addition to filing for current payroll clients, accountants can add ???1099-only??? clients during the tax filing season. </div> </div> </div> <div class=\"panel panel-default\"> <div class=\"panel-heading\" role=\"tab\" id=\"heading8\"> <h4 class=\"panel-title\"> <a class=\"collapsed\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse8\" aria-expanded=\"false\" aria-controls=\"collapse8\"> Q. Which 1099 forms and are supported? </a> </h4> </div> <div id=\"collapse8\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"heading8\"> <div class=\"panel-body\"> A. At this time, we only support 1099-MISC forms. We include support for boxes 1-14. </div> </div> </div> <div class=\"panel panel-default\"> <div class=\"panel-heading\" role=\"tab\" id=\"heading9\"> <h4 class=\"panel-title\"> <a class=\"collapsed\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse9\" aria-expanded=\"false\" aria-controls=\"collapse9\"> Q. What about state forms? </a> </h4> </div> <div id=\"collapse9\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"heading9\"> <div class=\"panel-body\"> A. There is a combined federal / state filing program for 1099s, so many states will receive the forms along with the IRS. However, always double check with your state to see which specific requirements will apply to you, as there may be additional filing needs. </div> </div> </div> <div class=\"panel panel-default\"> <div class=\"panel-heading\" role=\"tab\" id=\"heading10\"> <h4 class=\"panel-title\"> <a class=\"collapsed\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse10\" aria-expanded=\"false\" aria-controls=\"collapse10\"> Q. What about the 1096? </a> </h4> </div> <div id=\"collapse10\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"heading10\"> <div class=\"panel-body\"> A. Great news???the 1096 is not required when you e-file. One less piece of paper! </div> </div> </div> <div class=\"panel panel-default\"> <div class=\"panel-heading\" role=\"tab\" id=\"heading11\"> <h4 class=\"panel-title\"> <a class=\"collapsed\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse11\" aria-expanded=\"false\" aria-controls=\"collapse11\"> Q. Don???t I need to buy those special pre-printed forms with the red ink? </a> </h4> </div> <div id=\"collapse11\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"heading11\"> <div class=\"panel-body\"> A. Nope! That???s a big advantage of e-filing???you can send your forms electronically. </div> </div> </div> </div> <div style=\"height:50px\"></div> <div style=\"border-top: 1px solid #d3d3d3;height:50px\"></div> <table style=\"width:100%;\"> <tr> <td style=\"vertical-align:top;padding-right:5px;\"> <img src=\"" +
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
