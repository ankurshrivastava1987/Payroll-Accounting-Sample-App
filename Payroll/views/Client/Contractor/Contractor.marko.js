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
      ___Header = loadTemplate(require.resolve("../Header.marko")),
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

    out.w(" </head> <body class=\"leftbar-view\"> <input type=\"hidden\" id=\"hdnContractorId\"" +
      attr("value", data.ContractorId) +
      "> ");

    ___Header.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <section class=\"main-container\"> <div class=\"container-fluid\"> <div class=\"page-header filled full-block light\"> <div class=\"row\"> <div class=\"col-md-6\"> <h2>" +
      escapeXml(data.PageHeading) +
      "</h2> <ul class=\"list-page-breadcrumb\"> <li> <a href=\"/Client/Contractor/ViewAllContractors\"> Contractors <i class=\"zmdi zmdi-chevron-right\"></i> </a> </li> <li class=\"active-page\"> " +
      escapeXml(data.PageHeading) +
      "</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> <form method=\"post\" class=\"j-forms\" id=\"frmEntry\"> <table class=\"tableEntry\"> <tr> <td> Contractor Type:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input type=\"radio\" id=\"radioBusiness\" onclick=\"TypeChange()\" name=\"Type\" groupname=\"Type\" value=\"1\" checked=\"checked\">&nbsp; Business &nbsp; <input type=\"radio\" id=\"radioIndividual\" onclick=\"TypeChange()\" name=\"Type\" value=\"2\" groupname=\"Type\">&nbsp; Individual </div> </div> </td> </tr> <tr> <td> <span id=\"spanSSN\">Contractor's Federal EIN:</span> <span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtFederalEIN\" name=\"txtFederalEIN\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> <span id=\"spanLine1\">Business Name (Line1):</span> <span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtLine1\" name=\"txtLine1\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr id=\"trLine2\"> <td> Line2: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtLine2\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Address:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtAddress1\" name=\"txtAddress1\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtAddress2\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtAddress3\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> City:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtCity\" name=\"txtCity\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> State:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbStateName\" name=\"cmbStateName\" class=\"form-control\"></select> </div> </div> </td> </tr> <tr> <td> Zip:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <div class=\"row\"> <div class=\"col-xs-6\"> <input id=\"txtZipCode\" name=\"txtZipCode\" type=\"text\" maxlength=\"5\" class=\"form-control\" style=\"width:158px\"> </div> <div class=\"col-xs-6\"> <input id=\"txtZipCodeExt\" maxlength=\"4\" placeholder=\"Extension\" class=\"form-control\" style=\"width:158px\"> </div> </div> </div> </div> </td> </tr> <tr> <td> E-Mail: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtEmail\" name=\"txtEmail\" type=\"text\" maxlength=\"250\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Current Status: </td> <td> <select id=\"cmbStatus\" class=\"form-control\"> <option value=\"Active\">Active</option> <option value=\"Inactive\">Inactive</option> </select> </td> </tr> <tr> <td> Payment Method: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input type=\"radio\" id=\"radioCheck\" name=\"PaymentMethod\" groupname=\"PaymentMethod\" value=\"Check\" checked=\"checked\">&nbsp; Check &nbsp; <input type=\"radio\" id=\"radioDeposit\" name=\"PaymentMethod\" groupname=\"PaymentMethod\" value=\"Deposit\">&nbsp; Direct deposit </div> </div> </td> </tr> <tr style=\"display:none;\"> <td> Other: </td> <td> <input id=\"chkAlreadyPaid\" name=\"chkAlreadyPaid\" type=\"checkbox\"> <b>Important:</b> I have already paid this contractor in 2017 outside our payroll service. </td> </tr> </table> <table> <tr> <td></td> <td style=\"padding-top:20px\"> <button id=\"btnSave\" type=\"button\" class=\"btn btn-primary\"> <i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i> Save </button>&nbsp; <button id=\"btnClose\" type=\"button\" class=\"btn btn-primary\"> <i class=\"fa fa-times\" aria-hidden=\"true\"></i> Close </button> </td> </tr> </table> </form> </div> </div> </div> </div> </div> </div> ");

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
      "/javascripts/accounting.min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/bootbox.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Client/Contractor/Contractor.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
