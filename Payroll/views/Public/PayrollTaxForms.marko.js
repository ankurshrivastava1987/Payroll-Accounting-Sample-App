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

    out.w(" <script>\r\n      function OpenForm() {\r\n        var selectedForm = document.getElementById('cmbForms').options[document.getElementById('cmbForms').options.selectedIndex].value;\r\n        if (selectedForm != '')\r\n        {\r\n          window.open(selectedForm.toString());\r\n        }\r\n      }\r\n    </script> ");

    lasso_head({}, out);

    out.w(" </head> <body class=\"cssAnimate ct-headroom--scrollUpMenu\"> ");

    __MobileHeader.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <div id=\"ct-js-wrapper\"> ");

    __Header.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <section class=\"ct-u-paddingBoth50\"> <div class=\"container\"> <div class=\"text-center ct-u-marginBoth60\" style=\"padding-bottom:50px\"> <h5 class=\"text-uppercase page-heading\">Payroll Tax Forms</h5> </div> <div class=\"row\"> <div class=\"col-sm-6\"> <h4 class=\"ct-u-ls-2\"> Payroll taxes can be confusing. We help you sort it all out. </h4> <h5> Easy explanations of tax laws, tax codes &amp; tax forms to help you stay on top of Federal &amp; State payroll taxes </h5> </div> <div class=\"col-sm-6\"> <a href=\"javascript:void(0)\"> <figure class=\"ct-imageBox effect-apollo\"> <div class=\"ct-imageBox-image\"> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/Payroll_Pic_12.jpg\" alt=\"img12\"> </div> <figcaption> <div> <header class=\"ct-imageBox-title\"> <h3> <small>Secretaries of Confucius</small> </h3> <p>Illustration</p> </header> </div> </figcaption> </figure> </a> </div> </div> <div style=\"height:50px\"></div> <div style=\"border-top: 1px solid #d3d3d3;height:50px\"></div> <table style=\"width:100%\"> <tr> <td style=\"vertical-align:top;width:33.3%\"> <table> <tr> <td style=\"vertical-align:top\"> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/tax_forms1.jpg\"> </td> </tr> <tr> <td> <b>Get an overview of state specific tax requirements</b> </td> </tr> <tr> <td style=\"vertical-align:top;padding-right:20px\"> <ul class=\"ulleft\"> <li> Up-to-date state-specific tax requirements </li> <li> Links to IRS, Social Security, &amp; FUTA websites for complying with payroll tax requirements </li> </ul> </td> </tr> <tr> <td> <a href=\"javascript:void(0)\">View Tax Requirements</a> </td> </tr> </table> </td> <td style=\"vertical-align:top;width:33.3%\"> <table> <tr> <td style=\"vertical-align:top\"> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/tax_forms2.jpg\"> </td> </tr> <tr> <td> <b>Understand the details of Federal tax rules &amp; IRS responsibilities</b> </td> </tr> <tr> <td style=\"vertical-align:top;padding-right:20px\"> <ul class=\"ulleft\"> <li> IRS instructions &amp; forms </li> <li> Payroll tax reporting tips </li> <li> Immigration information </li> <li> Address change &amp; business closure instructions </li> </ul> </td> </tr> <tr> <td> <a href=\"javascript:void(0)\">Federal Tax Resources</a> </td> </tr> </table> </td> <td style=\"vertical-align:top;width:33.3%\"> <table> <tr> <td style=\"vertical-align:top\"> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/tax_forms3.jpg\"> </td> </tr> <tr> <td> <b>Access state-by-state forms, deadlines &amp; tax resources</b> </td> </tr> <tr> <td style=\"vertical-align:top;padding-right:20px\"> <ul class=\"ulleft\"> <li> State-specific phone numbers &amp; websites </li> <li> Payroll tax forms for your state </li> <li> Links to state agencies &amp; resources </li> </ul> </td> </tr> <tr> <td> <a href=\"javascript:void(0)\" class=\"link\">State Tax Agencies</a> </td> </tr> </table> </td> </tr> </table> <div style=\"height:50px\"></div> <div style=\"border-top: 1px solid #d3d3d3;height:50px\"></div> <table style=\"width:100%\"> <tr> <td style=\"text-align:center\"> <h4 class=\"ct-u-ls-2\"> Two ways we handle payroll taxes for you </h4> </td> </tr> <tr> <td> <table align=\"center\"> <tr> <td style=\"padding-right:100px;vertical-align:top\"> <table> <tr> <td style=\"background-color: #5eb55b;color:#fff;font-size:20px;text-align:center\"> <b>Enhanced Payroll</b> </td> </tr> <tr> <td style=\"border:1px solid #d3d3d3;padding-bottom:5px\"> <table style=\"width:370px;text-align:center\" border=\"0\"> <tr> <td> <h4>Assure accuracy. Avoid penalties.</h4> </td> </tr> <tr> <td style=\"padding-left:20px;padding-right:20px;text-align:left\"> <table class=\"listbox\" style=\"width:100%\"> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>You enter the hours.</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>We calculate wages, withholdings &amp; taxes</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>You run payroll (paychecks or direct deposit)</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>You file Federal &amp; State taxes</td> </tr> </table> </td> </tr> <tr> <td style=\"padding:10px\"> <a class=\"btn btn-motive btn-sm ct-btn-rounded ct-btn-transparent ct-hover--outlineOut\" href=\"/Enhanced-Payroll\"> <i class=\"fa fa-file-text-o\"></i> <span>Learn More</span> </a> </td> </tr> </table> </td> </tr> </table> </td> <td style=\"vertical-align:top\"> <table> <tr> <td style=\"background-color: #5eb55b;color:#fff;font-size:20px;text-align:center\"> <b>Full Service Payroll</b> </td> </tr> <tr> <td style=\"border:1px solid #d3d3d3;padding-bottom:5px\"> <table style=\"width:370px;text-align:center\" border=\"0\"> <tr> <td> <h4>Payroll (&amp; compliance) done for you.</h4> </td> </tr> <tr> <td style=\"padding-left:20px;padding-right:20px;text-align:left\"> <table class=\"listbox\" style=\"width:100%\"> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>All features in Enhanced Payroll</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>We setup payroll for you</td> </tr> <tr style=\"border-bottom:1px solid #d3d3d3;\"> <td> <i class=\"fa fa-check active\"></i> </td> <td>We file Federal &amp; State taxes for you</td> </tr> </table> </td> </tr> <tr> <td style=\"padding:10px\"> <a class=\"btn btn-motive btn-sm ct-btn-rounded ct-btn-transparent ct-hover--outlineOut\" href=\"/Full-Service-Payroll\"> <i class=\"fa fa-file-text-o\"></i> <span>Learn More</span> </a> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> <div style=\"height:50px\"></div> <div style=\"border-top: 1px solid #d3d3d3;height:50px\"></div> <table style=\"100%\"> <tr> <td style=\"padding-right:10px\"> <table style=\"border:1px solid #d3d3d3;padding-bottom:5px\"> <tr> <td style=\"background-color: #5eb55b;color:#fff;font-size:20px;text-align:center\">Payee Form</td> </tr> <tr> <td style=\"padding:10px\"> Use the Payee Form for basic Employee or Contractor information. </td> </tr> <tr> <td style=\"padding:10px;text-align:center;border-top:1px solid #d3d3d3\"> <a class=\"btn btn-motive btn-sm ct-btn-rounded ct-btn-transparent ct-hover--outlineOut\" href=\"/Payroll.Services/Client/ClientService.svc/Download/Employee_Contractor_Payroll_Form_150627.pdf\"> <i class=\"fa fa-file-text-o\"></i> <span>Download</span> </a> </td> </tr> </table> </td> <td style=\"padding-right:10px\"> <table style=\"border:1px solid #d3d3d3;padding-bottom:5px\"> <tr> <td style=\"background-color: #5eb55b;color:#fff;font-size:20px;text-align:center\">W4</td> </tr> <tr> <td style=\"padding:10px\"> All employees must fill out a W4 for federal tax withholdings. </td> </tr> <tr> <td style=\"padding:10px;text-align:center;border-top:1px solid #d3d3d3\"> <a class=\"btn btn-motive btn-sm ct-btn-rounded ct-btn-transparent ct-hover--outlineOut\" href=\"/Payroll.Services/Client/ClientService.svc/Download/IRS_W4_2015.pdf\"> <i class=\"fa fa-file-text-o\"></i> <span>Download</span> </a> </td> </tr> </table> </td> <td style=\"padding-right:10px\"> <table style=\"border:1px solid #d3d3d3;padding-bottom:5px\"> <tr> <td style=\"background-color: #5eb55b;color:#fff;font-size:20px;text-align:center\">I9</td> </tr> <tr> <td style=\"padding:10px\"> All employees must fill out an I-9 for employment verification. </td> </tr> <tr> <td style=\"padding:10px;text-align:center;border-top:1px solid #d3d3d3\"> <a class=\"btn btn-motive btn-sm ct-btn-rounded ct-btn-transparent ct-hover--outlineOut\" href=\"/Payroll.Services/Client/ClientService.svc/Download/I-9_Expires_160331.pdf\"> <i class=\"fa fa-file-text-o\"></i> <span>Download</span> </a> </td> </tr> </table> </td> <td style=\"padding-right:10px\"> <table style=\"border:1px solid #d3d3d3;padding-bottom:5px\"> <tr> <td style=\"background-color: #5eb55b;color:#fff;font-size:20px;text-align:center\">W9</td> </tr> <tr> <td style=\"padding:10px\"> All contractors must fill out a W9 for 1099 tax purposes. </td> </tr> <tr> <td style=\"padding:10px;text-align:center;border-top:1px solid #d3d3d3\"> <a class=\"btn btn-motive btn-sm ct-btn-rounded ct-btn-transparent ct-hover--outlineOut\" href=\"/Payroll.Services/Client/ClientService.svc/Download/IRS_W9_2014.pdf\"> <i class=\"fa fa-file-text-o\"></i> <span>Download</span> </a> </td> </tr> </table> </td> <td> <table style=\"border:1px solid #d3d3d3;padding-bottom:5px\"> <tr> <td style=\"background-color: #5eb55b;color:#fff;font-size:20px;text-align:center\">Application</td> </tr> <tr> <td style=\"padding:10px\"> Use the Application Form for new staff. </td> </tr> <tr> <td style=\"padding:10px;text-align:center;border-top:1px solid #d3d3d3\"> <a class=\"btn btn-motive btn-sm ct-btn-rounded ct-btn-transparent ct-hover--outlineOut\" href=\"/Payroll.Services/Client/ClientService.svc/Download/Employment_Application_130507.pdf\"> <i class=\"fa fa-file-text-o\"></i> <span>Download</span> </a> </td> </tr> </table> </td> </tr> <tr> <td colspan=\"5\" style=\"padding-top:20px;padding-bottom:20px\"> Select State Withholding form from the list below<br> <select id=\"cmbForms\" style=\"width:310px\" class=\"form-control\" onchange=\"OpenForm()\"> <option value selected=\"true\">Select you state</option> <option value=\"http://revenue.alabama.gov/withholding/FA4(3_14).pdf\">AL:(A-4)</option> <option value=\"http://www.edd.ca.gov/pdf_pub_ctr/de4.pdf\">CA:(DE-4)</option> <option value=\"http://www.ct.gov/drs/lib/drs/forms/2016withholding/ct-w4.pdf\">CT:(CT-W4)</option> <option value=\"https://dor.georgia.gov/sites/dor.georgia.gov/files/related_files/document/TSD_Employees_Withholding_Allowance_Certificate_G-4.pdf\">GA:(G-4)</option> <option value=\"http://forms.marylandtaxes.com/16_forms/MW507.pdf\">MD:(MW-507)</option> <option value=\"http://www.michigan.gov/documents/taxes/MI-W4_370050_7.pdf\">MI:(MI-W4)</option> <option value=\"http://www.dor.state.nc.us/downloads/nc4.pdf\">NC:(NC-4)</option> <option value=\"http://www.state.nj.us/treasury/taxation/pdf/current/njw4.pdf\">NJ:(NJ-W4)</option> <option value=\"https://www.tax.ny.gov/pdf/current_forms/it/it2104_fill_in.pdf\">NY:(IT-2104)</option> <option value=\"http://www.tax.ohio.gov/portals/0/forms/employer_withholding/Generic/WTH_IT4.pdf\">OH:(IT-4)</option> <option value=\"https://www.irs.gov/pub/irs-pdf/fw4.pdf\">SC:(IRS-W4)</option> <option value=\"http://www.tax.virginia.gov/sites/tax.virginia.gov/files/taxforms/withholding-tax/any/va-4-any.pdf\">VA:(VA-4)</option> </select> </td> </tr> <tr> <td colspan=\"5\"> If you don???t see a form you want or would like us to create one for you, please contact our team for assistance. </td> </tr> <tr> <td colspan=\"5\" style=\"font-weight:bold\"> Have a question or need services?<br> Call us at (888) 821-1696 or send an email <a href=\"mailto:contact@terragent.com\" class=\"link\">here</a>. </td> </tr> </table> </div> </section> ");

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
