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
      ___GridToolbar = loadTemplate(require.resolve("../GridToolbar.marko")),
      attr = __helpers.a,
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
      "</h2> <ul class=\"list-page-breadcrumb\"> <li class=\"active-page\"> Tax Setup</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> ");

    ___GridToolbar.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <input type=\"hidden\" id=\"txtSortField\" value=\"TaxSetupId\"> <input type=\"hidden\" id=\"txtSortDirection\" value=\"DESC\"> <input type=\"hidden\" id=\"txtCurrentPageIndex\" value=\"1\"> <input type=\"hidden\" id=\"txtPageSize\"" +
      attr("value", data.GridPageSize) +
      "> <input type=\"hidden\" id=\"txtTotalRecords\" value=\"0\"> <input type=\"hidden\" id=\"txtCurrentRecordCount\" value=\"0\"> <table class=\"table foo-data-table-filterable\"> <thead> <tr> <th style=\"width: 25px\" data-sort-ignore=\"true\"> <input id=\"chkAll\" type=\"checkbox\" name=\"0\" onclick=\"CheckAll()\"> </th> <th> <a onclick=\"SortTable(&#39;EffectiveDate&#39;)\"> <u>Effective Date</u> </a> </th> <th> <a onclick=\"SortTable(&#39;SocialSecurityTaxEmployer&#39;)\"> <u>Social Security Tax Employer</u> </a> </th> <th> <a onclick=\"SortTable(&#39;SocialSecurityTaxEmployee&#39;)\"> <u>Social Security Tax Employee</u> </a> </th> <th> <a onclick=\"SortTable(&#39;MedicareTaxEmployer&#39;)\"> <u>Medicare Tax Employer</u> </a> </th> <th> <a onclick=\"SortTable(&#39;MedicareTaxEmployee&#39;)\"> <u>Medicare Tax Employee</u> </a> </th> <th style=\"width: 100px;text-align:center\" data-sort-ignore=\"true\"> <a>Action</a> </th> </tr> </thead> <tbody id=\"bodyTaxSetups\"> </tbody> </table> <div id=\"divPager\"> </div> </div> </div> </div> </div> </div> </div> ");

    ___Footer.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </section> ");

    ___MasterFooter.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/bootbox.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/jquery.formatDateTime.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Admin/TaxSetup/ViewAllTaxSetups.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/footable.all.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
