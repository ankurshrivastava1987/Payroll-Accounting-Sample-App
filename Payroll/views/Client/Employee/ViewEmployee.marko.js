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
      attr = __helpers.a,
      ___Header = loadTemplate(require.resolve("../Header.marko")),
      ___GridToolbar4 = loadTemplate(require.resolve("../GridToolbar4.marko")),
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

    out.w(" </head> <body class=\"leftbar-view\"> <input type=\"hidden\" id=\"hdnEmployeeId\"" +
      attr("value", data.EmployeeId) +
      "> <input type=\"hidden\" id=\"hdnFederalTaxes\" value> <input type=\"hidden\" id=\"hdnStateTaxes\" value> <input type=\"hidden\" id=\"hdnCompensations\" value> <input type=\"hidden\" id=\"hdnSummaries\" value> ");

    ___Header.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <section class=\"main-container\"> <div class=\"container-fluid\"> <div class=\"page-header filled full-block light\"> <div class=\"row\"> <div class=\"col-md-6\"> <h2>" +
      escapeXml(data.PageHeading) +
      "</h2> <ul class=\"list-page-breadcrumb\"> <li> <a href=\"/Client/Employee/ViewAllEmployees\"> Employees <i class=\"zmdi zmdi-chevron-right\"></i> </a> </li> <li class=\"active-page\"> " +
      escapeXml(data.PageHeading) +
      "</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> <div> <ul class=\"nav nav-tabs\" role=\"tablist\"> <li role=\"presentation\" class=\"active\"> <a href=\"#Step1\" aria-controls=\"Step1\" role=\"tab\" data-toggle=\"tab\" onclick=\"StepClick(1)\" class=\"link\"> <strong>Employee Info</strong></a> </li> <li role=\"presentation\"> <a href=\"#Step2\" aria-controls=\"Step2\" role=\"tab\" data-toggle=\"tab\" onclick=\"StepClick(2)\" class=\"link\"> <strong>Taxes &amp; Exemptions</strong> </a> </li> <li role=\"presentation\"> <a href=\"#Step3\" aria-controls=\"Step4\" role=\"tab\" data-toggle=\"tab\" onclick=\"StepClick(3)\" class=\"link\"> <strong>Compensation</strong> </a> </li> <li role=\"presentation\"> <a href=\"#Step4\" aria-controls=\"Step6\" role=\"tab\" data-toggle=\"tab\" onclick=\"StepClick(4)\" class=\"link\"> <strong>Paid Time Off</strong> </a> </li> <li role=\"presentation\"> <a href=\"#Step5\" aria-controls=\"Step7\" role=\"tab\" data-toggle=\"tab\" onclick=\"StepClick(5)\" class=\"link\"> <strong>Documents</strong> </a> </li> <li role=\"presentation\"> <a href=\"#Step6\" aria-controls=\"Step5\" role=\"tab\" data-toggle=\"tab\" onclick=\"StepClick(6)\" class=\"link\"> <strong>Year to date summary</strong> </a> </li> </ul> <div class=\"tab-content\"> <div role=\"tabpanel\" class=\"tab-pane active\" id=\"Step1\" style=\"padding-top:20px\"> <table class=\"tableEntry\"> <tr> <td> Employee Code: </td> <td> <span id=\"spanEmployeeCode\"></span> </td> </tr> <tr> <td> Name:<span class=\"required\">*</span> </td> <td> <span id=\"spanFullName\"></span> </td> </tr> <tr> <td> Address:<span class=\"required\">*</span> </td> <td> <span id=\"spanAddress1\"></span> </td> </tr> <tr> <td> </td> <td> <span id=\"spanAddress2\"></span> </td> </tr> <tr> <td> </td> <td> <span id=\"spanAddress3\"></span> </td> </tr> <tr> <td> City:<span class=\"required\">*</span> </td> <td> <span id=\"spanCityName\"></span> </td> </tr> <tr> <td> County Name:<span class=\"required\">*</span> </td> <td> <span id=\"spanCountyName\"></span> </td> </tr> <tr> <td> State:<span class=\"required\">*</span> </td> <td> <span id=\"spanStateName\"></span> </td> </tr> <tr> <td> Zip:<span class=\"required\">*</span> </td> <td> <span id=\"spanZipCode\"></span> </td> </tr> <tr> <td> Gender:<span class=\"required\">*</span> </td> <td> <span id=\"spanGender\"></span> </td> </tr> <tr> <td> Date of Birth:<span class=\"required\">*</span> </td> <td> <span id=\"spanDateOfBirth\"></span> </td> </tr> <tr> <td> E-Mail: </td> <td> <span id=\"spanEMailId\"></span> </td> </tr> <tr> <td> Work Phone #: </td> <td> <span id=\"spanWorkPhoneNo\"></span> </td> </tr> <tr> <td> Cell Phone #: </td> <td> <span id=\"spanCellPhoneNo\"></span> </td> </tr> <tr> <td> Fax #: </td> <td> <span id=\"spanFaxNo\"></span> </td> </tr> <tr> <td> Department: </td> <td> <span id=\"spanDepartmentName\"></span> </td> </tr> <tr> <td> Location: </td> <td> <span id=\"spanLocationName\"></span> </td> </tr> <tr> <td> Pay Schedule: </td> <td> <span id=\"spanPayScheduleName\"></span> </td> </tr> <tr> <td> Bank Name: </td> <td> <span id=\"spanBankName\"></span> </td> </tr> <tr> <td> Routing #: </td> <td> <span id=\"spanRoutingNo\"></span> </td> </tr> <tr> <td> Account #: </td> <td> <span id=\"spanAccountNo\"></span> </td> </tr> <tr> <td> Account Type: </td> <td> <span id=\"spanAccountTypeName\"></span> </td> </tr> <tr> <td> Social Security #: </td> <td> <span id=\"spanSocialSecurityNo\"></span> </td> </tr> <tr class=\"hide\"> <td> 1099 Contractor: </td> <td> <span id=\"spanContractor1099\"></span> </td> </tr> <tr> <td> New Hire Report: </td> <td> Filed with the state?&nbsp;&nbsp;<span id=\"spanNewHireReport\"></span> </td> </tr> <tr> <td> Form I-9: </td> <td> Stored in your files?&nbsp;&nbsp;<span id=\"spanFormI9\"></span> </td> </tr> <tr> <td> Hire Date:<span class=\"required\">*</span> </td> <td> <span id=\"spanHireDate\"></span> </td> </tr> <tr> <td> Termination Date: </td> <td> <span id=\"spanTerminationDate\"></span> </td> </tr> <tr> <td> Notes: </td> <td> <span id=\"spanNotes\"></span> </td> </tr> <tr> <td> Workers' Compensation Class: </td> <td> <span id=\"spanCompensationClassName\"></span> </td> </tr> <tr> <td> Status:<span class=\"required\">*</span> </td> <td> <span id=\"spanStatus\"></span> </td> </tr> </table> </div> <div role=\"tabpanel\" class=\"tab-pane\" id=\"Step2\" style=\"padding-top:20px\"> <div class=\"widget-header margin-bottom-0 clearfix\"> <div class=\"pull-left\"> <h3>Federal Taxes</h3> </div> </div> <table class=\"tableEntry\" style=\"width:100%\"> <tr> <td> <table id=\"tblFederalTaxes\" class=\"table foo-data-table-filterable\"> <thead> <tr> <th> <a>Start Date</a> </th> <th> <a>Filing Status</a> </th> <th> <a>Allowances</a> </th> <th> <a>Additional Withholdings</a> </th> <th> <a>Allowance</a> </th> </tr> </thead> <tbody id=\"bodyFederalTaxes\"> </tbody> </table> </td> </tr> </table> <table id=\"tblStateTax\" class=\"tableEntry\" style=\"width:100%\"> <tr> <td> <div class=\"widget-header margin-bottom-0 clearfix\"> <div class=\"pull-left\"> <h3>State Taxes</h3> </div> </div> </td> </tr> <tr> <td> <table class=\"table foo-data-table-filterable hide\"> <thead> <tr> <th> <a>Start Date</a> </th> <th id=\"thFilingStatus\" class=\"hide\"> <a>Filing Status</a> </th> <th id=\"thAllowanceStatus\" class=\"hide\"> <a>Allowance Status</a> </th> <th id=\"thAllowance\" class=\"hide\"> <a>Allowance</a> </th> <th id=\"thDependants\" class=\"hide\"> <a>Dependants</a> </th> <th id=\"thPersonalExemptions\" class=\"hide\"> <a>Personal Exemptions</a> </th> <th id=\"thDependentExemptions\" class=\"hide\"> <a>Dependent Exemptions</a> </th> <th id=\"thAgeExemptions\" class=\"hide\"> <a>Age Exemptions</a> </th> <th id=\"thBlindnessExemptions\" class=\"hide\"> <a>Blindness Exemptions</a> </th> <th id=\"thAdditionalAllowances\" class=\"hide\"> <a>Additional Allowances</a> </th> <th id=\"thBasicAllowances\" class=\"hide\"> <a>Basic Allowances</a> </th> <th id=\"thAdditionalAmount\" class=\"hide\"> <a>Additional Amount</a> </th> <th id=\"thIsDelawareWorkplace\" class=\"hide\"> <a>Is Delaware Workplace?</a> </th> </tr> </thead> <tbody id=\"bodyStateTaxes\"> </tbody> </table> </td> </tr> </table> </div> <div role=\"tabpanel\" class=\"tab-pane\" id=\"Step3\" style=\"padding-top:20px\"> <div class=\"widget-header  margin-bottom-0 clearfix\"> <div class=\"pull-left\"> <h3>Compensation</h3> </div> </div> <table class=\"tableEntry\" style=\"width:100%\"> <tr> <td> <table id=\"tblCompensations\" class=\"table foo-data-table-filterable\"> <thead> <tr> <th> <a>Start Date</a> </th> <th> <a>Pay Type</a> </th> <th> <a>Pay Rate</a> </th> <th> <a>Annual Vacation Days</a> </th> <th> <a>Annual Sick Days</a> </th> </tr> </thead> <tbody id=\"bodyCompensations\"> </tbody> </table> </td> </tr> </table> </div> <div role=\"tabpanel\" class=\"tab-pane\" id=\"Step4\" style=\"padding-top:20px\"> <div class=\"widget-header margin-bottom-0 clearfix\"> <div class=\"pull-left\"> <h3>Paid Time Off Before Terragent</h3> </div> </div> <table class=\"tableEntry\"> <tr> <td> Vacation Hours Available: </td> <td> <span id=\"spanVacationHoursAvailable\"></span> </td> </tr> <tr> <td> Vacation Hours Used: </td> <td> <span id=\"spanVacationHoursUsed\"></span> </td> </tr> <tr> <td> Sick Leave Hours Available: </td> <td> <span id=\"spanSickLeaveHoursAvailable\"></span> </td> </tr> <tr> <td> Sick Leave Hours Used: </td> <td> <span id=\"spanSickLeaveHoursUsed\"></span> </td> </tr> </table> </div> <div role=\"tabpanel\" class=\"tab-pane\" id=\"Step5\" style=\"padding-top:20px\"> <table class=\"tableEntry\" style=\"width:100%\"> <tr> <td> <div class=\"widget-header margin-bottom-0 clearfix\"> <div class=\"pull-left\"> <h3>Documents</h3> </div> </div> </td> <td> ");

    ___GridToolbar4.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </td> </tr> <tr> <td colspan=\"2\"> <input id=\"hdnRootPath\" type=\"hidden\"> <input id=\"hdnCurrentPath\" type=\"hidden\"> <table id=\"tblFiles\" class=\"table foo-data-table-filterable\"> <thead> <tr> <th> <a>Name</a> </th> <th style=\"text-align:right;width: 100px\"> <a>Size</a> </th> <th class=\"hide\"> <a>Type</a> </th> <th style=\"width: 200px\"> <a>Date Modified</a> </th> <th style=\"text-align:center;width: 100px\"> <a>Action</a></th> </tr> </thead> <tbody id=\"bodyFiles\"> </tbody> </table> </td> </tr> </table> </div> <div role=\"tabpanel\" class=\"tab-pane\" id=\"Step6\" style=\"padding-top:20px\"> <div class=\"widget-header margin-bottom-0 clearfix\"> <div class=\"pull-left\"> <h3>Year to date summary before terragent</h3> </div> </div> <table class=\"tableEntry\" style=\"width:100%\"> <tr> <td> <table id=\"tblSummaries\" class=\"table foo-data-table-filterable\"> <thead> <tr> <th> <a>Pay Stub Name</a> </th> <th> <a>Where To Show in Paystub</a> </th> <th> <a>Year to Date Amount</a> </th> <th> <a>Subject to Federal Income Tax</a> </th> <th> <a>Subject to Social Security</a> </th> <th> <a>Subject to Medicare</a> </th> <th> <a>Quarter</a> </th> </tr> </thead> <tbody id=\"bodySummaries\"> </tbody> </table> </td> </tr> </table> </div> </div> </div> <table> <tr> <td></td> <td style=\"padding-top:10px;\"> <button id=\"btnEdit\" type=\"button\" class=\"btn btn-primary\" onclick=\"Edit()\"> <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i> Edit </button>&nbsp; <button id=\"btnClose\" type=\"button\" class=\"btn btn-primary\" onclick=\"Close()\"> <i class=\"fa fa-times\" aria-hidden=\"true\"></i> Close </button> </td> </tr> </table> </div> </div> </div> </div> </div> </div> ");

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
      "/javascripts/accounting.min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/jquery.formatDateTime.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Client/Employee/ViewEmployee.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
