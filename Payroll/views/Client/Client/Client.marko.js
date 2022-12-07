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
      ___Header1 = loadTemplate(require.resolve("../Header1.marko")),
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
      "/stylesheets/progress-wizard.min.css\"> ");

    lasso_head({}, out);

    out.w(" </head> <body class=\"leftbar-view\"> <input type=\"hidden\" id=\"hdnClientId\"" +
      attr("value", data.ClientId) +
      "> ");

    ___Header1.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <section class=\"main-container\"> <div class=\"container-fluid\"> <div class=\"page-header filled full-block light\"> <div class=\"row\"> <div class=\"col-md-6\"> <h2>" +
      escapeXml(data.PageHeading) +
      "</h2> <ul class=\"list-page-breadcrumb\"> <li> <a href=\"/Client/Client/ViewAllClients\"> Clients <i class=\"zmdi zmdi-chevron-right\"></i> </a> </li> <li class=\"active-page\"> " +
      escapeXml(data.PageHeading) +
      "</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> <ul class=\"progress-indicator\"> <li id=\"liStep1\" onclick=\"StepClick(1)\" class=\"completed\"> <span class=\"bubble\"></span> Step 1 </li> <li id=\"liStep2\" onclick=\"StepClick(2)\"> <span class=\"bubble\"></span> Step 2 </li> <li id=\"liStep3\" onclick=\"StepClick(3)\"> <span class=\"bubble\"></span> Step 3 </li> </ul> <div id=\"divStep1\"> <form method=\"post\" class=\"j-forms\" id=\"frmEntry\"> <table class=\"tableEntry\"> <tr> <td> Account Type:<span class=\"required\">*</span> </td> <td style=\"width: 350px\"> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbClientType\" class=\"form-control\"> <option value=\"3\">Individual</option> <option value=\"2\">Business</option> </select> </div> </div> </td> </tr> <tr> <td> Name:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtFullName\" name=\"txtFullName\" type=\"text\" maxlength=\"100\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Address: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtAddress1\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtAddress2\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtAddress3\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> City: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtCityName\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> State:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbStateName\" name=\"cmbStateName\" class=\"form-control\"></select> </div> </div> </td> </tr> <tr> <td> Zip: </td> <td> <div class=\"unit\"> <div class=\"input\"> <div class=\"row\"> <div class=\"col-xs-6\"> <input id=\"txtZipCode\" type=\"text\" maxlength=\"5\" class=\"form-control\" style=\"width:158px\"> </div> <div class=\"col-xs-6\"> <input id=\"txtZipCodeExt\" maxlength=\"4\" placeholder=\"Extension\" class=\"form-control\" style=\"width:158px\"> </div> </div> </div> </div> </td> </tr> <tr> <td> Industry: </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbIndustryName\" class=\"form-control\"></select> </div> </div> </td> </tr> <tr> <td> Contact Person: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtContactName\" type=\"text\" maxlength=\"100\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Job Title: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtJobTitleName\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Work Phone #: </td> <td> <div class=\"unit\"> <div class=\"input\"> <div class=\"row\"> <div class=\"col-xs-6\"> <input id=\"txtWorkPhoneNo\" name=\"txtWorkPhoneNo\" type=\"text\" maxlength=\"14\" class=\"form-control phoneno\" style=\"width:158px\"> </div> <div class=\"col-xs-6\"> <input id=\"txtWorkPhoneNoExt\" maxlength=\"12\" placeholder=\"Extension No\" class=\"form-control\" style=\"width:158px\"> </div> </div> </div> </div> </td> </tr> <tr> <td> Cell Phone #: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtCellPhoneNo\" name=\"txtCellPhoneNo\" type=\"text\" maxlength=\"14\" class=\"form-control phoneno\"> </div> </div> </td> </tr> <tr> <td> Fax #: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtFaxNo\" type=\"text\" maxlength=\"12\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> E-Mail:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtEMailId\" name=\"txtEMailId\" type=\"text\" maxlength=\"250\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Username: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtLoginId\" name=\"txtLoginId\" type=\"text\" maxlength=\"20\" class=\"form-control\" autocomplete=\"new-password\"> </div> </div> </td> </tr> <tr> <td> Password: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtPassword\" name=\"txtPassword\" type=\"password\" maxlength=\"20\" class=\"form-control\" autocomplete=\"new-password\"> </div> </div> </td> </tr> <tr> <td> Status:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbStatus\" class=\"form-control\"> <option value=\"Active\">Active</option> <option value=\"Inactive\">Inactive</option> </select> </div> </div> </td> </tr> </table> </form> </div> <div id=\"divStep2\" class=\"hide\"> <form method=\"post\" class=\"j-forms\" id=\"frmEntry1\"> <table class=\"tableEntry\"> <tr> <td> Number of Employees:<span class=\"required\">*</span> </td> <td style=\"width: 350px\"> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbEmployeeRange\" name=\"cmbEmployeeRange\" class=\"form-control\"> <option value=\"0\"></option> <option value=\"1\">None yet</option> <option value=\"2\">1-25</option> <option value=\"3\">26-50</option> <option value=\"4\">51-100</option> <option value=\"5\">101-150</option> <option value=\"6\">More than 150</option> </select> </div> </div> </td> </tr> <tr> <td> Service Type:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbServiceType\" name=\"cmbServiceType\" class=\"form-control\"> <option value=\"0\"></option> <option value=\"1\">Accountant wholesale service</option> <option value=\"2\">Client Retail Service</option> </select> </div> </div> </td> </tr> <tr> <td> Access Level:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbAccessLevel\" name=\"cmbAccessLevel\" class=\"form-control\"> <option value=\"0\"></option> <option value=\"1\">No Access</option> <option value=\"2\">Full</option> <option value=\"3\">Setup and Payroll</option> <option value=\"4\">Payroll Only</option> </select> </div> </div> </td> </tr> </table> </form> </div> <div id=\"divStep3\" class=\"hide\"> <form method=\"post\" class=\"j-forms\" id=\"frmEntry2\"> <table class=\"tableEntry\"> <tr> <td> <strong>How will you pay employees?</strong><br> We need to know how you will be paying the people who are part of your regular payroll </td> </tr> <tr> <td> Do you plan to pay any of your employees through direct deposit?<span class=\"required\">*</span> <br> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbDirectDeposit\" name=\"cmbDirectDeposit\" class=\"form-control\" style=\"width:100px\"> <option value></option> <option value=\"Y\">Yes</option> <option value=\"N\">No</option> </select> </div> </div> </td> </tr> <tr> <td> Have you paid any employee this year?<span class=\"required\">*</span> <br> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbPaidEmployee\" name=\"cmbPaidEmployee\" class=\"form-control\" style=\"width:100px\"> <option value></option> <option value=\"Y\">Yes</option> <option value=\"N\">No</option> </select> </div> </div> </td> </tr> <tr> <td> Do your employees earn paid vacation or sick time?<span class=\"required\">*</span> <br> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbPaidVacation\" name=\"cmbPaidVacation\" class=\"form-control\" style=\"width:100px\"> <option value></option> <option value=\"Y\">Yes</option> <option value=\"N\">No</option> </select> </div> </div> </td> </tr> <tr> <td> Do you have more than one office location with employees?<span class=\"required\">*</span> <br> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbMoreThanOneLocation\" name=\"cmbMoreThanOneLocation\" class=\"form-control\" style=\"width:100px\"> <option value></option> <option value=\"Y\">Yes</option> <option value=\"N\">No</option> </select> </div> </div> </td> </tr> <tr> <td> Do you plan to pay independent contractors as part of your payroll?<span class=\"required\">*</span> <br> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbPayContractor\" name=\"cmbPayContractor\" class=\"form-control\" style=\"width:100px\"> <option value></option> <option value=\"Y\">Yes</option> <option value=\"N\">No</option> </select> </div> </div> </td> </tr> </table> </form> </div> <table> <tr> <td></td> <td style=\"padding-top:20px\"> <button id=\"btnSave\" type=\"button\" class=\"btn btn-primary\"> <i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i> Save</button>&nbsp; <button id=\"btnBack\" type=\"button\" class=\"btn btn-primary\" disabled=\"disabled\"> <i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i> Back</button>&nbsp; <button id=\"btnNext\" type=\"button\" class=\"btn btn-primary\"><i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i> Next</button>&nbsp; <button id=\"btnClose\" type=\"button\" class=\"btn btn-primary\"> <i class=\"fa fa-times\" aria-hidden=\"true\"></i> Close</button> </td> </tr> </table> </div> </div> </div> </div> </div> </div> ");

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
      "/javascripts/Client/Client/Client.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
