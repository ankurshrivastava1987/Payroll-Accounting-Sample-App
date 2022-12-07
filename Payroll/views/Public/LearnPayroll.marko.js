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

    out.w(" <section class=\"ct-u-paddingBoth50\"> <div class=\"container\"> <div class=\"text-center ct-u-marginBoth60\" style=\"padding-bottom:50px\"> <h5 class=\"text-uppercase page-heading\">Learn Payroll</h5> </div> <div class=\"row\"> <div class=\"col-sm-6\"> <h4 class=\"ct-u-ls-2\"> Payroll 101<br> What Every Employer Should Know </h4> Congratulations! Your business is growing and you need employees. Whether staffing up or looking for your first hire, we’re here to help. </div> <div class=\"col-sm-6\"> <a href=\"javascript:void(0)\"> <figure class=\"ct-imageBox effect-apollo\"> <div class=\"ct-imageBox-image\"> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/learn.jpg\" alt=\"img12\"> </div> </figure> </a> </div> </div> <div style=\"height:50px\"></div> <div style=\"border-top: 1px solid #d3d3d3;height:50px\"></div> <table style=\"width:100%\"> <tr> <td colspan=\"2\"> <h4 class=\"ct-u-ls-2\"> Three Basics of Payroll </h4> </td> <td colspan=\"2\"> <h4 class=\"ct-u-ls-2\"> Three Common Payroll Pitfalls </h4> </td> </tr> <tr> <td style=\"vertical-align:top;padding-right:10px\"><b>1.</b></td> <td style=\"vertical-align:top;padding-right:50px\"> <b>Pay Day!</b><br> Every week? Every other week? On an agreed upon schedule, just calculate your employees’ wages, withhold the correct amount of taxes & issue their paycheck. </td> <td style=\"vertical-align:top;padding-right:10px\"><b>1.</b></td> <td style=\"vertical-align:top;padding-right:50px\"> <b>Errors</b><br> Hours. Wages. Withholdings. Taxes. Health care benefits. Getting all those calculations right gets complicated. Fortunately you have software and service options to help. </td> </tr> <tr> <td style=\"vertical-align:top;padding-right:10px\"><b>2.</b></td> <td style=\"vertical-align:top;padding-right:50px\"> <b>Paying Payroll Taxes</b><br> You will need to pay the government the Federal & State taxes withheld from your employees’ paychecks — as well as payroll taxes your business owes. </td> <td style=\"vertical-align:top;padding-right:10px\"><b>2.</b></td> <td style=\"vertical-align:top;padding-right:50px\"> <b>Deadlines</b><br> It’s your responsibility to keep up with Federal & State tax deadlines. You can do it at the IRS website. Or use our payroll product that automatically sends you reminders when taxes are due. </td> </tr> <tr> <td style=\"vertical-align:top;padding-right:10px\"><b>3.</b></td> <td style=\"vertical-align:top;padding-right:50px\"> <b>Filing Tax Forms</b><br> Let’s face it. Forms are frustrating. But you’re required to fill & file them, so the government knows who’s been paid what, the taxes paid, & other details. Most businesses file quarterly and some file monthly or yearly. </td> <td style=\"vertical-align:top;padding-right:10px\"><b>3.</b></td> <td style=\"vertical-align:top;padding-right:50px\"> <b>Penalties</b><br> It happens… Deadlines get missed. Calculations have errors. But a reputable full service payroll option like ours takes complete ownership of all your tax responsibilities. </td> </tr> </table> <div style=\"height:50px\"></div> <div style=\"border-top: 1px solid #d3d3d3;height:50px\"></div> <div> <h4 class=\"ct-u-ls-2\"> Which payroll method would work best for you? </h4> </div> <div> <h5>Here are five ways small business owners calculate and report their payroll taxes.\u0003 Take a look—and decide for yourself.</h5> </div> <table style=\"width:100%;border:1px solid;\"> <tr> <td style=\"border:1px solid;padding:5px\"> <b>Methods</b></td> <td style=\"border:1px solid;padding:5px\"><b>Advantages</b></td> <td style=\"border:1px solid;padding:5px\"><b>Trade-Offs</b></td> <td style=\"border:1px solid;padding:5px\"><b>Payroll Options</b></td> </tr> <tr> <td style=\"border:1px solid;padding:5px;vertical-align:top\"> <b>Manual System</b><br> You use pen &amp; paper, or a calculator &amp; spreadsheet.</td> <td style=\"border:1px solid;padding:5px;vertical-align:top\"> <ul class=\"ulleft\"> <li>Most affordable</li> <li>Greatest control</li> <li>For some, most familiar</li> </ul> </td> <td style=\"border:1px solid;padding:5px;vertical-align:top\"><ul class=\"ulleft\"> <li>Most work</li> <li>Most time-consuming</li> <li>Highest chance for errors</li> </ul></td> <td style=\"border:1px solid;padding:5px;vertical-align:top\"> <a href=\"javascript:void(0)\" class=\"link\">Accurate Calculations</a> </td> </tr> <tr> <td style=\"border:1px solid;padding:5px;vertical-align:top\"> <b>Payroll Software</b><br> Run payroll yourself in a few clicks with the help of payroll software.</td> <td style=\"border:1px solid;padding:5px;vertical-align:top\"> <ul class=\"ulleft\"> <li> More control because you do it yourself </li> <li> Calculations done for you in just a few clicks </li> <li> Faster than manual methods </li> </ul> </td> <td style=\"border:1px solid;padding:5px;vertical-align:top\"> <ul class=\"ulleft\"> <li> Software learning curve </li> <li> You make bank deposits </li> <li> You report &amp; file taxes </li> </ul> </td> <td style=\"border:1px solid;padding:5px;vertical-align:top\"> <a href=\"javascript:void(0)\" class=\"link\">Payroll Software</a> </td> </tr> <tr> <td style=\"border:1px solid;padding:5px;vertical-align:top\"> <b>Payroll &amp; Accounting software together</b><br> Small business software, like Intuit Payroll &amp; QuickBooks, work seamlessly together.</td> <td style=\"border:1px solid;padding:5px;vertical-align:top\"> <ul class=\"ulleft\"> <li> Total control </li> <li> Payroll &amp; financial data at your fingertips </li> <li> Payroll expenses update automatically in QuickBooks—so no \"double entry\" </li> <li> Shared liability </li> <li> Saves time </li> </ul> </td> <td style=\"border:1px solid;padding:5px;vertical-align:top\"> <ul class=\"ulleft\"> <li> One time learning curve for accounting software </li> </ul> </td> <td style=\"border:1px solid;padding:5px;vertical-align:top\"><a href=\"javascript:void(0)\" class=\"link\">Accounting &amp; Payroll Solutions</a></td> </tr> <tr> <td style=\"border:1px solid;padding:5px;vertical-align:top\"> <b>Accountant</b><br> Your accountant helps with payroll &amp; payroll tax filings.</td> <td style=\"border:1px solid;padding:5px;vertical-align:top\"> <ul class=\"ulleft\"> <li> Payroll delegated to someone else </li> <li> Tax responsibilities handled </li> <li> Accountant knows your business </li> </ul> </td> <td style=\"border:1px solid;padding:5px;vertical-align:top\"> <ul class=\"ulleft\"> <li> Minimal or no control </li> <li> Greater expense </li> </ul> </td> <td style=\"border:1px solid;padding:5px;vertical-align:top\"> <a href=\"javascript:void(0)\" class=\"link\">Find an Accountant</a> </td> </tr> <tr> <td style=\"border:1px solid;padding:5px;vertical-align:top\"> <b>Full Service Payroll</b><br> Traditional payroll service with a payroll representative helping you with payroll and tax responsibilities.</td> <td style=\"border:1px solid;padding:5px;vertical-align:top\"> <ul class=\"ulleft\"> <li> Tax penalties covered (most vendors) </li> <li> Direct access to your account (with Intuit &amp; some vendors) </li> <li> Saves time </li> <li> Handles all deposits &amp; filings </li> </ul> </td> <td style=\"border:1px solid;padding:5px;vertical-align:top\"> <ul class=\"ulleft\"> <li> Depending on vendor, you may give up control (but not with Intuit Full Service) </li> <li> Slightly higher cost </li> </ul> </td> <td style=\"border:1px solid;padding:5px;vertical-align:top\"> <a href=\"javascript:void(0)\" class=\"link\">Full Service Payroll</a> </td> </tr> </table> <div style=\"height:50px\"></div> <div style=\"border-top: 1px solid #d3d3d3;height:50px\"></div> <table style=\"width:100%;\"> <tr> <td style=\"vertical-align:top;padding-right:5px;\"> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/icon_hire.png\"> </td> <td style=\"vertical-align:top\"> <b>Get your FREE hiring guide</b><br> Get valuable, easy-to-access advice on hiring, training &amp; keeping great employees. Download now </td> <td style=\"vertical-align:top;padding-right:5px;\"> <img src=\"" +
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
