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
      attr = __helpers.a,
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

    out.w("<!DOCTYPE html> <!--[if IE 8 ]>\r\n<html class=\"no-js ie8\" lang=\"en\"> <![endif]--> <!--[if IE 9 ]>\r\n<html class=\"no-js ie9\" lang=\"en\"> <![endif]--> <html class=\"no-js\" lang=\"en\"> <head lang=\"en\"> ");

    __MasterHeader.render({
        title: data.title,
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <script src=\"https://www.google.com/recaptcha/api.js\"></script> ");

    lasso_head({}, out);

    out.w(" </head> <body class=\"cssAnimate ct-headroom--scrollUpMenu\"> ");

    __MobileHeader.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <div id=\"ct-js-wrapper\"> ");

    __Header.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <section class=\"ct-u-paddingBoth50\"> <div class=\"container\"> <div class=\"text-center ct-u-marginBoth60\"> <h5 class=\"text-uppercase page-heading\">Sign Up</h5> </div> <div> <form method=\"post\" id=\"frmEntry\" class=\"form-inline  j-forms\" role=\"form\" action=\"/SignUp\" novalidate> <input id=\"txtPlanId\" name=\"txtPlanId\" type=\"hidden\"" +
      attr("value", data.PlanId) +
      "> <input id=\"txtPlanType\" name=\"txtPlanType\" type=\"hidden\"" +
      attr("value", data.PlanType) +
      "> <input id=\"txtAmount\" name=\"txtAmount\" type=\"hidden\" value=\"0.00\"> <table class=\"tableEntry\"> <tr> <td> Account Type:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbClientType\" name=\"cmbClientType\" style=\"width:310px\" class=\"form-control\"> <option value=\"1\">Accountant</option> <option value=\"2\">Business</option> </select> </div> </div> </td> </tr> <tr> <td> Name:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtFullName\" name=\"txtFullName\" type=\"text\" maxlength=\"100\" style=\"width:310px\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Address: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtAddress1\" name=\"txtAddress1\" type=\"text\" maxlength=\"50\" style=\"width:310px\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtAddress2\" name=\"txtAddress2\" type=\"text\" maxlength=\"50\" style=\"width:310px\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> City: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtCityName\" name=\"txtCityName\" type=\"text\" maxlength=\"50\" style=\"width:310px\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> State: </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbStateName\" name=\"cmbStateName\" style=\"width:310px\" class=\"form-control\"></select> </div> </div> </td> </tr> <tr> <td> Zip: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtZipCode\" name=\"txtZipCode\" type=\"text\" maxlength=\"5\" class=\"form-control\" style=\"width:152px\">-<input id=\"txtZipCodeExt\" type=\"text\" maxlength=\"4\" placeholder=\"Extension\" class=\"form-control\" style=\"width:152px\"> </div> </div> </td> </tr> <tr> <td> Industry: </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbIndustryName\" name=\"cmbIndustryName\" style=\"width:310px\" class=\"form-control\"></select> </div> </div> </td> </tr> <tr> <td> Contact Person: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtContactName\" name=\"txtContactName\" type=\"text\" maxlength=\"100\" style=\"width:310px\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Job Title: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtJobTitleName\" name=\"txtJobTitleName\" type=\"text\" maxlength=\"50\" style=\"width:310px\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Work Phone #: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtWorkPhoneNo\" name=\"txtWorkPhoneNo\" type=\"text\" maxlength=\"14\" style=\"width:152px\" class=\"form-control phoneno\">-<input id=\"txtWorkPhoneNoExt\" type=\"text\" maxlength=\"12\" placeholder=\"Extension No\" style=\"width:152px\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Cell Phone #: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtCellPhoneNo\" name=\"txtCellPhoneNo\" type=\"text\" maxlength=\"14\" style=\"width:310px\" class=\"form-control phoneno\"> </div> </div> </td> </tr> <tr> <td> Fax #: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtFaxNo\" name=\"txtFaxNo\" type=\"text\" maxlength=\"12\" style=\"width:310px\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> E-Mail:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtEMailId\" name=\"txtEMailId\" type=\"text\" maxlength=\"250\" style=\"width:310px\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Username:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtLoginId\" name=\"txtLoginId\" type=\"text\" maxlength=\"20\" style=\"width:310px\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Password:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtPassword\" name=\"txtPassword\" type=\"password\" maxlength=\"20\" style=\"width:310px\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Confirm Password:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtConfirmPassword\" name=\"txtConfirmPassword\" type=\"password\" maxlength=\"20\" style=\"width:310px\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td></td> <td> <div class=\"unit\"> <div class=\"input\"> <div id=\"recaptcha\" name=\"recaptcha\" class=\"g-recaptcha\" data-sitekey=\"6Lc2QAkUAAAAAEiQ68NNTIA3KO4IyuacfgrPS2Yb\"></div> <span id=\"spanRequiredCaptcha\" style=\"color:#ef5350\" class=\"hide\">Please select captcha</span> </div> </div> </td> </tr> <tr> <td></td> <td> <table> <tr> <td> <input id=\"btnSubmit\" type=\"submit\" class=\"btn-block btn btn-primary\" value=\"Submit\"> </td> </tr> </table> </td> </tr> </table> </form> </div> </div> </section> ");

    __Footer.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </div> <a href=\"#\" class=\"ct-js-btnScrollUp\"> <i class=\"fa fa-angle-up\"></i> </a> ");

    __MasterFooter.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.maskedinput.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.mask.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Public/SignUp.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
