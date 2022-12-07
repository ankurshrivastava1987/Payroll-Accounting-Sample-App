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

    out.w(" ");

    lasso_head({}, out);

    out.w(" </head> <body class=\"leftbar-view\"> ");

    ___Header.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <section class=\"main-container\"> <div class=\"container-fluid\"> <div class=\"page-header filled full-block light\"> <div class=\"row\"> <div class=\"col-md-6\"> <h2>" +
      escapeXml(data.PageHeading) +
      "</h2> <ul class=\"list-page-breadcrumb\"> <li class=\"active-page\"> View State Tax Setup Menu</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> <div class=\"row\"> <div class=\"col-md-4 col-sm-4\"> <div class=\"stats-widget stats-widget tile\"> <div class=\"widget-header\"> <h3>Georgia</h3> </div> <div class=\"widget-stats-list\"> <ul> <li> <a href=\"/Admin/StateTaxSetup/ViewAllStateTaxSetups\" class=\"link1\"> <span class=\"list-label\">State Tax Setup</span> </a> </li> <li> <a href=\"/Admin/AllowanceStatusSetup/ViewAllAllowanceStatusSetups\" class=\"link1\"> <span class=\"list-label\">Allowance Status Setup</span> </a> </li> </ul> </div> </div> </div> <div class=\"col-md-4 col-sm-4\"> <div class=\"widget-wrap stats-widget tile\"> <div class=\"widget-header\"> <h3>Maryland</h3> </div> <div class=\"widget-stats-list\"> <ul> <li> <a href=\"/Admin/StateTaxSetup4/ViewAllStateTaxSetup4s\" class=\"link1\"> <span class=\"list-label\">State Tax Setup 4</span> </a> </li> <li> <a href=\"/Admin/AllowanceStatusSetup1/ViewAllAllowanceStatusSetup1s\" class=\"link1\"> <span class=\"list-label\">Allowance Status Setup 1</span> </a> </li> <li> <a href=\"/Admin/CountyTaxSetup/ViewAllCountyTaxSetups\" class=\"link1\"> <span class=\"list-label\">County Tax Setup</span> </a> </li> </ul> </div> </div> </div> <div class=\"col-md-4 col-sm-4\"> <div class=\"widget-wrap stats-widget tile\"> <div class=\"widget-header\"> <h3>California</h3> </div> <div class=\"widget-stats-list\"> <ul> <li> <a href=\"/Admin/StateTaxSetup/ViewAllStateTaxSetups\" class=\"link1\"> <span class=\"list-label\">State Tax Setup</span> </a> </li> <li> <a href=\"/Admin/StandardDeduction/ViewAllStandardDeductions\" class=\"link1\"> <span class=\"list-label\">Standard Deduction</span> </a> </li> <li> <a href=\"/Admin/LowIncomeExemption/ViewAllLowIncomeExemptions\" class=\"link1\"> <span class=\"list-label\">Low Income Exemption</span> </a> </li> <li> <a href=\"/Admin/ExemptionAllowance/ViewAllExemptionAllowances\" class=\"link1\"> <span class=\"list-label\">Exemption Allowance</span> </a> </li> <li> <a href=\"/Admin/EstimatedDeduction/ViewAllEstimatedDeductions\" class=\"link1\"> <span class=\"list-label\">Estimated Deduction</span> </a> </li> </ul> </div> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-4 col-sm-4\"> <div class=\"stats-widget stats-widget tile\"> <div class=\"widget-header\"> <h3>District of Columbia</h3> </div> <div class=\"widget-stats-list\"> <ul> <li> <a href=\"/Admin/StateTaxSetup/ViewAllStateTaxSetups\" class=\"link1\"> <span class=\"list-label\">State Tax Setup</span> </a> </li> <li> <a href=\"/Admin/AllowanceStatusSetup2/ViewAllAllowanceStatusSetup2s\" class=\"link1\"> <span class=\"list-label\">Allowance Status Setup 2</span> </a> </li> </ul> </div> </div> </div> <div class=\"col-md-4 col-sm-4\"> <div class=\"widget-wrap stats-widget tile\"> <div class=\"widget-header\"> <h3>Virginia</h3> </div> <div class=\"widget-stats-list\"> <ul> <li> <a href=\"/Admin/StateTaxSetup3/ViewAllStateTaxSetup3s\" class=\"link1\"> <span class=\"list-label\">State Tax Setup 3</span> </a> </li> </ul> </div> </div> </div> <div class=\"col-md-4 col-sm-4\"> <div class=\"widget-wrap stats-widget tile\"> <div class=\"widget-header\"> <h3>North Carolina</h3> </div> <div class=\"widget-stats-list\"> <ul> <li> <a href=\"/Admin/AllowanceChartSetup/ViewAllAllowanceChartSetups\" class=\"link1\"> <span class=\"list-label\">Allowance Chart Setup</span> </a> </li> <li> <a href=\"/Admin/StandardDeduction2/ViewAllStandardDeduction2s\" class=\"link1\"> <span class=\"list-label\">Standard Deduction 2</span> </a> </li> </ul> </div> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-4 col-sm-4\"> <div class=\"stats-widget stats-widget tile\"> <div class=\"widget-header\"> <h3>Indiana</h3> </div> <div class=\"widget-stats-list\"> <ul> <li> <a href=\"/Admin/DeductionConstantSetup/ViewAllDeductionConstantSetups\" class=\"link1\"> <span class=\"list-label\">Deduction Constant Setup</span> </a> </li> </ul> </div> </div> </div> <div class=\"col-md-4 col-sm-4\"> <div class=\"widget-wrap stats-widget tile\"> <div class=\"widget-header\"> <h3>Delaware</h3> </div> <div class=\"widget-stats-list\"> <ul> <li> <a href=\"/Admin/TaxSlabSetup/ViewAllTaxSlabSetups\" class=\"link1\"> <span class=\"list-label\">Tax Slab Setup</span> </a> </li> </ul> </div> </div> </div> <div class=\"col-md-4 col-sm-4\"> <div class=\"widget-wrap stats-widget tile\"> <div class=\"widget-header\"> <h3>Arkansas</h3> </div> <div class=\"widget-stats-list\"> <ul> <li> <a href=\"/Admin/TaxBracketSetup/ViewAllTaxBracketSetups\" class=\"link1\"> <span class=\"list-label\">Tax Bracket Setup</span> </a> </li> </ul> </div> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-4 col-sm-4\"> <div class=\"widget-wrap stats-widget tile\"> <div class=\"widget-header\"> <h3>South Carolina</h3> </div> <div class=\"widget-stats-list\"> <ul> <li> <a href=\"/Admin/StateTaxSetup3/ViewAllStateTaxSetup3s\" class=\"link1\"> <span class=\"list-label\">State Tax Setup 3</span> </a> </li> </ul> </div> </div> </div> </div> </div> </div> </div> </div> </div> </div> ");

    ___Footer.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </section> ");

    ___MasterFooter.render({
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
