function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      __loadTag = __helpers.t,
      lasso_page = __loadTag(require("lasso/taglib/page-tag")),
      loadTemplate = __helpers.l,
      ___MasterHeader = loadTemplate(require.resolve("../MasterHeader.marko")),
      lasso_head = __loadTag(require("lasso/taglib/head-tag")),
      ___Header = loadTemplate(require.resolve("../Header.marko")),
      attr = __helpers.a,
      ___GridToolbar = loadTemplate(require.resolve("../GridToolbar.marko")),
      ___Footer = loadTemplate(require.resolve("../Footer.marko")),
      ___MasterFooter = loadTemplate(require.resolve("../MasterFooter.marko")),
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

    ___MasterHeader.render({
        title: data.title,
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" ");

    lasso_head({}, out);

    out.w(" </head> <body class=\"leftbar-view\"> ");

    ___Header.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <section class=\"main-container\"> <div class=\"container-fluid\"> <div class=\"page-header filled full-block light\"> <div class=\"row\"> <div class=\"col-md-6\"> <h2>" +
      escapeXml(data.PageHeading) +
      "</h2> <ul class=\"list-page-breadcrumb\"> <li> <a href=\"/Admin/Plan/ViewAllPlans\"> Plans <i class=\"zmdi zmdi-chevron-right\"></i> </a> </li> <li class=\"active-page\"> " +
      escapeXml(data.PageHeading) +
      "</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> <form method=\"post\" class=\"j-forms\" id=\"frmEntry\"> <input type=\"hidden\" id=\"hdnPlanId\"" +
      attr("value", data.PlanId) +
      "> <input type=\"hidden\" id=\"hdnCharges\" value> <table class=\"tableEntry\"> <tr> <td> Plan Code:<span class=\"required\">*</span> </td> <td style=\"width:310px;\"> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtPlanCode\" name=\"txtPlanCode\" maxlength=\"4\" class=\"form-control integer\" value=\"0\"> </div> </div> </td> </tr> <tr> <td> Plan Name:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtPlanName\" name=\"txtPlanName\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Display Order: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtDisplayOrder\" maxlength=\"4\" class=\"form-control integer\" value=\"0\"> </div> </div> </td> </tr> <tr> <td> Status: </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbStatus\" class=\"form-control\"> <option value=\"Active\">Active</option> <option value=\"Inactive\">Inactive</option> </select> </div> </div> </td> </tr> </table> <table class=\"tableEntry\"> <tr> <tr> <td>Available Features:</td> <td></td> <td>Selected Features:</td> </tr> <td> <select id=\"lstAvailable\" multiple=\"multiple\" name=\"lstAvailable\" style=\"width:296px;height:250px\"></select> </td> <td style=\"vertical-align:middle\"> <table> <tr> <td> <button id=\"btnSelectAll\" onclick=\"move_list_items_all(&#39;lstAvailable&#39;,&#39;lstSelected&#39;);\" style=\"width:30px\">>></button> </td> </tr> <tr> <td> <button id=\"btnSelect\" onclick=\"move_list_items(&#39;lstAvailable&#39;,&#39;lstSelected&#39;);\" style=\"width:30px\">></button> </td> </tr> <tr> <td> <button id=\"btnDeselect\" onclick=\"move_list_items(&#39;lstSelected&#39;,&#39;lstAvailable&#39;);\" style=\"width:30px\"> <</button> </td> </tr> <tr> <td> <button id=\"btnDeselectAll\" onclick=\"move_list_items_all(&#39;lstSelected&#39;,&#39;lstAvailable&#39;);\" style=\"width:30px\"> <<</button> </td> </tr> </table> </td> <td> <select id=\"lstSelected\" multiple=\"multiple\" name=\"lstSelected\" style=\"width:296px;height:250px\"></select> </td> </tr> <tr> <td colspan=\"3\"> <table style=\"width:100%\"> <tr> <td> ");

    ___GridToolbar.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </td> </tr> <tr> <td> <table id=\"tblCharges\" class=\"table foo-data-table table-bordered \"> <thead> <tr class=\"footable-odd\"> <th style=\"width: 25px\"> <input type=\"checkbox\" name=\"0\"> </th> <th> Effective Date </th> <th> Amount Per Month($) </th> <th> Amount Per Employee Per Month($) </th> <th> Amount Per Year($) </th> <th style=\"width: 100px\"> Action </th> </tr> </thead> <tbody id=\"bodyCharges\"> </tbody> </table> </td> </tr> </table> </td> </tr> </table> <table> <tr> <td></td> <td> <button id=\"btnSave\" type=\"button\" class=\"btn btn-primary\" onclick=\"Save()\">Save</button>&nbsp;&nbsp; <button id=\"btnClose\" type=\"button\" class=\"btn btn-default\" onclick=\"Close()\">Close</button> </td> </tr> </table> </form> </div> </div> </div> </div> </div> </div> ");

    ___Footer.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </section> ");

    ___MasterFooter.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <div id=\"myModal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\"> <div class=\"modal-dialog\"> <div class=\"modal-content\"> <form method=\"post\" class=\"j-forms\" id=\"frmEntry1\"> <div class=\"modal-header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"> <span aria-hidden=\"true\">&times;</span> </button> <h4 class=\"modal-title\">Charges Setup</h4> </div> <div class=\"modal-body\"> <input type=\"hidden\" id=\"hdnRowNo\" value> <table class=\"tableEntry\"> <tr> <td> Effective Date: </td> <td style=\"width:310px;\"> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtEffectiveDate\" name=\"txtEffectiveDate\" type=\"text\" class=\"form-control input-date-picker\"> </div> </div> </td> </tr> <tr> <td> Amount Per Month($): </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtAmountPerMonth\" class=\"form-control decimal\"> </div> </div> </td> </tr> <tr> <td> Amount Per Employee Per Month($): </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtAmountPerEmployeePerMonth\" class=\"form-control decimal\"> </div> </div> </td> </tr> <tr> <td> Amount Per Year($): </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtAmountPerYear\" class=\"form-control decimal\"> </div> </div> </td> </tr> </table> </div> <div class=\"modal-footer\"> <button id=\"btnCancel\" type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button> <button id=\"btnOK\" type=\"button\" class=\"btn btn-primary\">OK</button> </div> </form> </div> </div> </div> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/bootstrap-datepicker.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/jquery.formatDateTime.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Admin/Plan/Plan.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
