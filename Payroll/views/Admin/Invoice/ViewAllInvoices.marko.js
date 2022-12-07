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
      "</h2> <ul class=\"list-page-breadcrumb\"> <li class=\"active-page\"> Invoices</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> ");

    ___GridToolbar.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <input type=\"hidden\" id=\"txtSortField\" value=\"IndustryId\"> <input type=\"hidden\" id=\"txtSortDirection\" value=\"DESC\"> <input type=\"hidden\" id=\"txtCurrentPageIndex\" value=\"1\"> <input type=\"hidden\" id=\"txtPageSize\"" +
      attr("value", data.GridPageSize) +
      "> <input type=\"hidden\" id=\"txtTotalRecords\" value=\"0\"> <input type=\"hidden\" id=\"txtCurrentRecordCount\" value=\"0\"> <table class=\"table foo-data-table-filterable\"> <thead> <tr> <th> <a onclick=\"SortTable(&#39;InvoiceDate&#39;)\"> <u>Invoice Date</u> </a> </th> <th> <a onclick=\"SortTable(&#39;FullName&#39;)\"> <u>Client Name</u> </a> </th> <th> <a onclick=\"SortTable(&#39;PlanName&#39;)\"> <u>Plan Name</u> </a> </th> <th> <a onclick=\"SortTable(&#39;PlanType&#39;)\"> <u>Plan Type</u> </a> </th> <th> <a onclick=\"SortTable(&#39;FromDate&#39;)\"> <u>From Date</u> </a> </th> <th> <a onclick=\"SortTable(&#39;ToDate&#39;)\"> <u>To Date</u> </a> </th> </tr> </thead> <tbody id=\"bodyInvoices\"> </tbody> </table> <div id=\"divPager\"> </div> </div> </div> </div> </div> </div> </div> ");

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
      "/javascripts/Admin/Invoice/ViewAllInvoices.js\"></script> <script src=\"" +
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
