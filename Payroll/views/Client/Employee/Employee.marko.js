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
      ___GridToolbar = loadTemplate(require.resolve("../GridToolbar.marko")),
      ___GridToolbar1 = loadTemplate(require.resolve("../GridToolbar1.marko")),
      ___GridToolbar2 = loadTemplate(require.resolve("../GridToolbar2.marko")),
      ___GridToolbar4 = loadTemplate(require.resolve("../GridToolbar4.marko")),
      ___GridToolbar3 = loadTemplate(require.resolve("../GridToolbar3.marko")),
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
      "/stylesheets/progress-wizard.min.css\"> <link type=\"text/css\" rel=\"stylesheet\" href=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/css/bootstrap-datepicker.min.css\"> ");

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
      "</li> </ul> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"widget-wrap\"> <div class=\"widget-container\"> <div class=\"widget-content\"> <ul class=\"progress-indicator\"> <li id=\"liStep1\" class=\"completed\"> <span class=\"bubble\"></span> Employee Info </li> <li id=\"liStep2\"> <span class=\"bubble\"></span> Taxes &amp; Exemptions </li> <li id=\"liStep3\"> <span class=\"bubble\"></span> Compensation </li> <li id=\"liStep4\"> <span class=\"bubble\"></span> Paid Time Off </li> <li id=\"liStep5\"> <span class=\"bubble\"></span> Documents </li> <li id=\"liStep6\"> <span class=\"bubble\"></span> Year to date summary </li> </ul> <form method=\"post\" class=\"j-forms\" id=\"frmEntry\"> <div id=\"divStep1\"> <table class=\"tableEntry\"> <tr> <td> Employee Code: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtEmployeeCode\" name=\"txtEmployeeCode\" type=\"text\" maxlength=\"10\" class=\"form-control\"> </div> </div> </td> <td> </td> </tr> <tr> <td> Name:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtFullName\" name=\"txtFullName\" type=\"text\" maxlength=\"100\" class=\"form-control\"> </div> </div> </td> <td> </td> </tr> <tr> <td> Address:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtAddress1\" name=\"txtAddress1\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> <td> </td> </tr> <tr> <td> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtAddress2\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> <td> </td> </tr> <tr> <td> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtAddress3\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> <td> </td> </tr> <tr> <td> City:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtCityName\" name=\"txtCityName\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> <td> </td> </tr> <tr> <td> State:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbStateName\" name=\"cmbStateName\" class=\"form-control\"></select> </div> </div> </td> <td> </td> </tr> <tr> <td> County:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbCountyName\" name=\"cmbCountyName\" class=\"form-control\"></select> </div> </div> </td> <td> </td> </tr> <tr> <td> Zip:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <div class=\"row\"> <div class=\"col-xs-6\"> <input id=\"txtZipCode\" name=\"txtZipCode\" type=\"text\" maxlength=\"5\" class=\"form-control\" style=\"width:158px\"> </div> <div class=\"col-xs-6\"> <input id=\"txtZipCodeExt\" maxlength=\"4\" placeholder=\"Extension\" class=\"form-control\" style=\"width:158px\"> </div> </div> </div> </div> </td> <td> </td> </tr> <tr> <td> Gender:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbGender\" name=\"cmbGender\" class=\"form-control\"> <option value=\"Female\">Female</option> <option value=\"Male\">Male</option> </select> </div> </div> </td> <td> </td> </tr> <tr> <td> Date of Birth:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtDateOfBirth\" name=\"txtDateOfBirth\" type=\"text\" class=\"form-control input-date-picker\"> </div> </div> </td> <td> </td> </tr> <tr> <td> E-Mail: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtEMailId\" name=\"txtEMailId\" type=\"text\" maxlength=\"250\" class=\"form-control\"> </div> </div> </td> </tr> <td> </td> <tr> <td> Work Phone #: </td> <td> <div class=\"unit\"> <div class=\"input\"> <div class=\"row\"> <div class=\"col-xs-6\"> <input id=\"txtWorkPhoneNo\" name=\"txtWorkPhoneNo\" type=\"text\" maxlength=\"14\" class=\"form-control phoneno\" style=\"width:158px\"> </div> <div class=\"col-xs-6\"> <input id=\"txtWorkPhoneNoExt\" maxlength=\"12\" placeholder=\"Extension No\" class=\"form-control\" style=\"width:158px\"> </div> </div> </div> </div> </td> <td> </td> </tr> <tr> <td> Cell Phone #: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtCellPhoneNo\" name=\"txtCellPhoneNo\" type=\"text\" maxlength=\"14\" class=\"form-control phoneno\"> </div> </div> </td> <td> </td> </tr> <tr> <td> Fax #: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtFaxNo\" type=\"text\" maxlength=\"12\" class=\"form-control\"> </div> </div> </td> <td> </td> </tr> <tr> <td> Department: </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbDepartmentName\" name=\"cmbDepartmentName\" class=\"form-control\"></select> </div> </div> </td> <td> </td> </tr> <tr> <td> Location: </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbLocationName\" name=\"cmbLocationName\" class=\"form-control\"></select> </div> </div> </td> <td> </td> </tr> <tr> <td> Pay Schedule: </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbPayScheduleName\" name=\"cmbPayScheduleName\" class=\"form-control\"></select> </div> </div> </td> <td> </td> </tr> <tr> <td> Bank Name: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtBankName\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> <td> </td> </tr> <tr> <td> Routing #: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtRoutingNo\" maxlength=\"9\" class=\"form-control\"> </div> </div> </td> <td> </td> </tr> <tr> <td> Account #: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtAccountNo\" maxlength=\"20\" class=\"form-control\"> </div> </div> </td> <td> </td> </tr> <tr> <td> Account Type: </td> <td style=\"width: 350px\"> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbAccountTypeName\" class=\"form-control\"></select> </div> </div> </td> <td> </td> </tr> <tr> <td> Social Security #: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtSocialSecurityNo\" name=\"txtSocialSecurityNo\" maxlength=\"11\" class=\"form-control ssn\"> </div> </div> </td> <td> </td> </tr> <tr class=\"hide\"> <td> 1099 Contractor: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"chkContractor1099\" type=\"checkbox\"> </div> </div> </td> <td> </td> </tr> <tr> <td> New Hire Report: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"chkNewHireReport\" type=\"checkbox\">&nbsp;&nbsp;Filed with the state? </div> </div> </td> <td> </td> </tr> <tr> <td> Form I-9: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"chkFormI9\" type=\"checkbox\">&nbsp;&nbsp;Stored in your files? </div> </div> </td> <td> </td> </tr> <tr> <td> Hire Date:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtHireDate\" name=\"txtHireDate\" type=\"text\" class=\"form-control input-date-picker\"> </div> </div> </td> <td> </td> </tr> <tr> <td> Termination Date: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtTerminationDate\" name=\"txtTerminationDate\" type=\"text\" class=\"form-control input-date-picker\"> </div> </div> </td> <td> </td> </tr> <tr> <td> Notes: </td> <td> <div class=\"unit\"> <div class=\"input\"> <textarea id=\"txtNotes\" rows=\"10\" class=\"form-control\"></textarea> </div> </div> </td> <td> </td> </tr> <tr> <td> Workers' Compensation Class: </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbCompensationClassName\" name=\"cmbCompensationClassName\" class=\"form-control\"></select> </div> </div> </td> <td> </td> </tr> <tr> <td> Status:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbStatus\" class=\"form-control\"> <option value=\"Active\">Active</option> <option value=\"Inactive\">Inactive</option> </select> </div> </div> </td> <td> </td> </tr> </table> </div> <div id=\"divStep2\" class=\"hide\"> <table class=\"tableEntry\" style=\"width:100%\"> <tr> <td> <div class=\"widget-header margin-bottom-0 clearfix\"> <div class=\"pull-left\"> <h3>Federal Taxes</h3> </div> </div> </td> <td> ");

    ___GridToolbar.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </td> </tr> <tr> <td colspan=\"2\"> <table id=\"tblFederalTaxes\" class=\"table foo-data-table-filterable\"> <thead> <tr> <th> <a>Start Date</a> </th> <th> <a>Filing Status</a> </th> <th> <a>Allowances</a> </th> <th> <a>Additional Withholdings</a> </th> <th> <a>Allowance</a> </th> <th style=\"width: 100px\"> <a>Action</a> </th> </tr> </thead> <tbody id=\"bodyFederalTaxes\"> </tbody> </table> </td> </tr> </table> <table id=\"tblStateTax\" class=\"tableEntry\" style=\"width:100%\"> <tr> <td> <div class=\"widget-header margin-bottom-0 clearfix\"> <div class=\"pull-left\"> <h3>State Taxes</h3> </div> </div> </td> <td> ");

    ___GridToolbar1.render({
        CDNUrl: data.CDNUrl = ""
      }, out);

    out.w(" </td> </tr> <tr> <td colspan=\"2\"> <table id=\"tblStateTaxes\" class=\"table foo-data-table-filterable\"> <thead> <tr> <th> <a>Start Date</a> </th> <th id=\"thFilingStatus\" class=\"hide\"> <a>Filing Status</a> </th> <th id=\"thAllowanceStatus\" class=\"hide\"> <a>Allowance Status</a> </th> <th id=\"thAllowance\" class=\"hide\"> <a>Allowance</a> </th> <th id=\"thDependants\" class=\"hide\"> <a>Dependants</a> </th> <th id=\"thPersonalExemptions\" class=\"hide\"> <a>Personal Exemptions</a> </th> <th id=\"thDependentExemptions\" class=\"hide\"> <a>Dependent Exemptions</a> </th> <th id=\"thAgeExemptions\" class=\"hide\"> <a>Age Exemptions</a> </th> <th id=\"thBlindnessExemptions\" class=\"hide\"> <a>Blindness Exemptions</a> </th> <th id=\"thAdditionalAllowances\" class=\"hide\"> <a>Additional Allowances</a> </th> <th id=\"thBasicAllowances\" class=\"hide\"> <a>Basic Allowances</a> </th> <th id=\"thAdditionalAmount\" class=\"hide\"> <a>Additional Amount</a> </th> <th id=\"thIsDelawareWorkplace\" class=\"hide\"> <a>Is Delaware Workplace?</a> </th> <th style=\"width: 100px\"> <a>Action</a> </th> </tr> </thead> <tbody id=\"bodyStateTaxes\"> </tbody> </table> </td> </tr> </table> </div> <div id=\"divStep3\" class=\"hide\"> <table class=\"tableEntry\" style=\"width:100%\"> <tr> <td> <div class=\"widget-header margin-bottom-0 clearfix\"> <div class=\"pull-left\"> <h3>Compensation</h3> </div> </div> </td> <td> ");

    ___GridToolbar2.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </td> </tr> <tr> <td colspan=\"2\"> <table id=\"tblCompensations\" class=\"table foo-data-table-filterable\"> <thead> <tr> <th> <a>Start Date</a> </th> <th> <a>Pay Type</a> </th> <th> <a>Pay Rate</a> </th> <th> <a>Annual Vacation Days</a> </th> <th> <a>Annual Sick Days</a> </th> <th style=\"width: 100px\"> <a>Action</a></th> </tr> </thead> <tbody id=\"bodyCompensations\"> </tbody> </table> </td> </tr> </table> </div> <div id=\"divStep4\" class=\"hide\"> <div class=\"widget-header margin-bottom-0 clearfix\"> <div class=\"pull-left\"> <h3>Paid Time Off Before terragent</h3> </div> </div> <table class=\"tableEntry\"> <tr> <td> Vacation Hours Available: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtVacationHoursAvailable\" type=\"text\" maxlength=\"10\" class=\"form-control decimal\" value=\"0.00\"> </div> </div> </td> </tr> <tr> <td> Vacation Hours Used: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtVacationHoursUsed\" type=\"text\" maxlength=\"10\" class=\"form-control decimal\" value=\"0.00\"> </div> </div> </td> </tr> <tr> <td> Sick Leave Hours Available: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtSickLeaveHoursAvailable\" type=\"text\" maxlength=\"10\" class=\"form-control decimal\" value=\"0.00\"> </div> </div> </td> </tr> <tr> <td> Sick Leave Hours Used: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtSickLeaveHoursUsed\" type=\"text\" maxlength=\"10\" class=\"form-control decimal\" value=\"0.00\"> </div> </div> </td> </tr> </table> </div> <div id=\"divStep5\" class=\"hide\"> <table class=\"tableEntry\" style=\"width:100%\"> <tr> <td> <div class=\"widget-header margin-bottom-0 clearfix\"> <div class=\"pull-left\"> <h3>Documents</h3> </div> </div> </td> <td> ");

    ___GridToolbar4.render({
        CDNUrl: data.CDNUrl = ""
      }, out);

    out.w(" </td> </tr> <tr> <td colspan=\"2\"> <input id=\"hdnRootPath\" type=\"hidden\"> <input id=\"hdnCurrentPath\" type=\"hidden\"> <table id=\"tblFiles\" class=\"table foo-data-table-filterable\"> <thead> <tr> <th> <a>Name</a> </th> <th style=\"text-align:right;width: 100px\"> <a>Size</a> </th> <th class=\"hide\"> <a>Type</a> </th> <th style=\"width: 200px\"> <a>Date Modified</a> </th> <th style=\"text-align:center;width: 100px\"> <a>Action</a> </th> </tr> </thead> <tbody id=\"bodyFiles\"> </tbody> </table> </td> </tr> </table> </div> <div id=\"divStep6\" class=\"hide\"> <table class=\"tableEntry\" style=\"width:100%\"> <tr> <td> <div class=\"widget-header margin-bottom-0 clearfix\"> <div class=\"pull-left\"> <h3>Year to date summary before terragent</h3> </div> </div> </td> <td> ");

    ___GridToolbar3.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </td> </tr> <tr> <td colspan=\"2\"> <table id=\"tblSummaries\" class=\"table foo-data-table-filterable\"> <thead> <tr> <th> <a>Pay Stub Name</a> </th> <th> <a>Where To Show in Paystub</a> </th> <th> <a>Year to Date Amount</a> </th> <th> <a>Subject to Federal Income Tax</a> </th> <th> <a>Subject to Social Security</a> </th> <th> <a>Subject to Medicare</a> </th> <th> <a>Quarter</a> </th> <th style=\"width: 100px\"> <a>Action</a> </th> </tr> </thead> <tbody id=\"bodySummaries\"> </tbody> </table> </td> </tr> </table> </div> <table> <tr> <td></td> <td style=\"padding-top:20px\"> <button id=\"btnSaveAndContinue\" type=\"button\" class=\"btn btn-primary\" width=\"175px\"> <i class=\"fa fa-pencil-square\" aria-hidden=\"true\"></i> Save &amp; Continue</button>&nbsp; <button id=\"btnFinish\" type=\"button\" class=\"btn btn-primary\"> <i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i> Save</button>&nbsp; <button id=\"btnBack\" type=\"button\" class=\"btn btn-primary\" disabled=\"disabled\"> <i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i> Back</button>&nbsp; <button id=\"btnNext\" type=\"button\" class=\"btn btn-primary\"> <i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i> Next</button>&nbsp; <button id=\"btnClose\" type=\"button\" class=\"btn btn-primary\"> <i class=\"fa fa-times\" aria-hidden=\"true\"></i> Close</button> </td> </tr> </table> </form> </div> </div> </div> </div> </div> </div> ");

    ___Footer.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" </section> ");

    ___MasterFooter.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <div id=\"myModal\" class=\"modal fade\" role=\"dialog\"> <div class=\"modal-dialog\"> <div class=\"modal-content\"> <div class=\"modal-header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button> <h4 class=\"modal-title\">Add new department</h4> </div> <div class=\"modal-body\"> <form method=\"post\" class=\"j-forms\" id=\"frmEntry1\"> <table class=\"tableEntry\"> <tr> <td>Department Name:<span class=\"required\">*</span></td> <td style=\"width: 350px\"> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtDepartmentName\" name=\"txtDepartmentName\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> </table> </form> </div> <div class=\"modal-footer\"> <button id=\"btnSaveDepartment\" type=\"button\" class=\"btn btn-primary\"> <i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i> Save</button> <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\"> <i class=\"fa fa-times\" aria-hidden=\"true\"></i> Close</button> </div> </div> </div> </div> <div id=\"myModal1\" class=\"modal fade\" role=\"dialog\"> <div class=\"modal-dialog\"> <div class=\"modal-content\"> <div class=\"modal-header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button> <h4 class=\"modal-title\">Add new location</h4> </div> <div class=\"modal-body\"> <form method=\"post\" class=\"j-forms\" id=\"frmEntry2\"> <table class=\"tableEntry2\"> <tr> <td style=\"vertical-align:top\">Location Name:<span class=\"required\">*</span></td> <td style=\"width: 350px\"> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtLocationName\" name=\"txtLocationName\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td style=\"vertical-align:top\">Address:<span class=\"required\">*</span></td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtAddress11\" name=\"txtAddress11\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtAddress21\" name=\"txtAddress21\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtAddress31\" name=\"txtAddress31\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td style=\"vertical-align:top\">City:<span class=\"required\">*</span></td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtCityName1\" name=\"txtCityName1\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td style=\"vertical-align:top\">State:<span class=\"required\">*</span></td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbStateName1\" name=\"cmbStateName1\" class=\"form-control\"></select> </div> </div> </td> </tr> <tr> <td style=\"vertical-align:top\">Zip:<span class=\"required\">*</span></td> <td> <div class=\"unit\"> <div class=\"input\"> <div class=\"row\"> <div class=\"col-xs-6\"> <input id=\"txtZipCode1\" name=\"txtZipCode1\" type=\"text\" maxlength=\"5\" class=\"form-control\" style=\"width:158px\"> </div> <div class=\"col-xs-6\"> <input id=\"txtZipCodeExt1\" maxlength=\"4\" placeholder=\"Extension\" class=\"form-control\" style=\"width:158px\"> </div> </div> </div> </div> </td> </tr> </table> </form> </div> <div class=\"modal-footer\"> <button id=\"btnSaveLocation\" type=\"button\" class=\"btn btn-primary\"> <i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i> Save</button> <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\"> <i class=\"fa fa-times\" aria-hidden=\"true\"></i> Close</button> </div> </div> </div> </div> <div id=\"myModal2\" class=\"modal fade\" role=\"dialog\"> <div class=\"modal-dialog\"> <div class=\"modal-content\"> <div class=\"modal-header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button> <h4 class=\"modal-title\">Add new Workers' Compensation Class</h4> </div> <div class=\"modal-body\"> <form method=\"post\" class=\"j-forms\" id=\"frmEntry3\"> <table class=\"tableEntry\"> <tr> <td>Compensation Class Name:<span class=\"required\">*</span></td> <td style=\"width: 350px\"> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtCompensationClassName\" name=\"txtCompensationClassName\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> </table> </form> </div> <div class=\"modal-footer\"> <button id=\"btnSaveClass\" type=\"button\" class=\"btn btn-primary\"> <i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i> Save</button> <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\"> <i class=\"fa fa-times\" aria-hidden=\"true\"></i> Close</button> </div> </div> </div> </div> <div id=\"myModal3\" class=\"modal fade\" role=\"dialog\"> <div class=\"modal-dialog\"> <div class=\"modal-content\"> <div class=\"modal-header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button> <h4 class=\"modal-title\">Add new pay schedule</h4> </div> <div class=\"modal-body\"> <form method=\"post\" class=\"j-forms\" id=\"frmEntry4\"> <table class=\"tableEntry\"> <tr> <td> Pay Schedule Name:<span class=\"required\">*</span> </td> <td style=\"width: 350px\"> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtPayScheduleName\" name=\"txtPayScheduleName\" type=\"text\" maxlength=\"50\" class=\"form-control\"> </div> </div> </td> </tr> <tr> <td> Pay: </td> <td> <div class=\"unit\"> <div class=\"input\"> <table> <tr> <td> <input id=\"txtDaysAfterClose\" class=\"form-control integer\" style=\"width:50px\" value=\"0\"> </td> <td>days after close of pay period</td> </tr> </table> </div> </div> </td> </tr> <tr> <td> Pay Period End Date:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"txtPayPeriodEndDate\" name=\"txtPayPeriodEndDate\" type=\"text\" class=\"form-control input-date-picker\"> </div> </div> </td> </tr> <tr> <td> Recurrence:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbPayScheduleRecurrenceName\" name=\"cmbPayScheduleRecurrenceName\" class=\"form-control\"> </select> </div> </div> </td> </tr> <tr id=\"trRecur\" class=\"hide\"> <td> Recur: </td> <td> <div id=\"divDaily\"> <div class=\"unit\"> <div class=\"input\"> <input name=\"daily\" id=\"chkDailyEveryWeekDay\" type=\"checkbox\"> Every weekday </div> </div> </div> </td> </tr> <tr> <td> Status:<span class=\"required\">*</span> </td> <td> <div class=\"unit\"> <div class=\"input\"> <select id=\"cmbStatus1\" class=\"form-control\"> <option value=\"Active\">Active</option> <option value=\"Inactive\">Inactive</option> </select> </div> </div> </td> </tr> <tr> <td> Default: </td> <td> <div class=\"unit\"> <div class=\"input\"> <input id=\"chkDefault\" type=\"checkbox\"> </div> </div> </td> </tr> </table> </form> </div> <div class=\"modal-footer\"> <button id=\"btnSavePaySchedule\" type=\"button\" class=\"btn btn-primary\"> <i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i> Save</button> <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\"> <i class=\"fa fa-times\" aria-hidden=\"true\"></i> Close</button> </div> </div> </div> </div> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.maskedinput.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.mask.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/accounting.min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/bootstrap-datepicker.min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/jquery.formatDateTime.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/bootbox.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Client/Employee/Employee.js\"></script> ");

    lasso_body({}, out);

    out.w(" ");

    init_widgets({}, out);

    out.w(" ");

    browser_refresh({}, out);

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
