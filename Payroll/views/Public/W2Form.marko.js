function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      __loadTag = __helpers.t,
      lasso_page = __loadTag(require("lasso/taglib/page-tag")),
      loadTemplate = __helpers.l,
      __MasterHeader = loadTemplate(require.resolve("./MasterHeader.marko")),
      escapeXmlAttr = __helpers.xa,
      lasso_head = __loadTag(require("lasso/taglib/head-tag")),
      __MobileHeader = loadTemplate(require.resolve("./MobileHeader.marko")),
      __Header = loadTemplate(require.resolve("./Header.marko")),
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

    out.w(" <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/jquery.maphilight.js\"></script> <script type=\"text/javascript\">$(function() {\r\n        $('.map').maphilight();\r\n        $('#squidheadlink').mouseover(function(e) {\r\n            $('#squidhead').mouseover();\r\n        }).mouseout(function(e) {\r\n            $('#squidhead').mouseout();\r\n        }).click(function(e) { e.preventDefault(); });\r\n    });</script> ");

    lasso_head({}, out);

    out.w(" </head> <body class=\"cssAnimate ct-headroom--scrollUpMenu\"> ");

    __MobileHeader.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <div id=\"ct-js-wrapper\"> ");

    __Header.render({
        CDNUrl: data.CDNUrl
      }, out);

    out.w(" <section class=\"ct-u-paddingBoth50\"> <div class=\"container\"> <div class=\"text-center ct-u-marginBoth60\"> <h5 class=\"text-uppercase page-heading\">W2 Form</h5> </div> <table style=\"width:100%\"> <tr> <td style=\"text-align:center\">MOVE MOUSE ON A BOX BELOW FOR MORE INFORMATION</td> </tr> <tr> <td style=\"padding-left:12px\"> <table> <tr> <td style=\"padding:5px;vertical-align:top\"> <div style=\"width:20px;height:20px;background-color:#ff0000\"></div> </td> <td>Employee-related data</td> <td style=\"padding:5px;vertical-align:top\"> <div style=\"width:20px;height:20px;background-color:#00ff00\"></div> </td> <td>Employer-related data</td> <td style=\"padding:5px;vertical-align:top\"><div style=\"width:20px;height:20px;background-color:#0000ff\"></div></td> <td>Rarely filled out or optional data</td> </tr> </table></td> </tr> <tr> <td> <img src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/img/home/W2Form.png\" class=\"map\" usemap=\"#simple\"> <map name=\"simple\"> <area href=\"javascript:void(0)\" shape=\"poly\" coords=\"221,13,451,13,451,56,221,56\" alt=\"Link\" data-maphilight=\"{&quot;strokeColor&quot;:&quot;ff0000&quot;,&quot;strokeWidth&quot;:5,&quot;fillColor&quot;:&quot;ff0000&quot;,&quot;fillOpacity&quot;:0.6}\" title=\"Your employee’s social security number. Tip: The SSA lets you verify employee names and SSNs online or by phone.\"></area> <area href=\"javascript:void(0)\" shape=\"poly\" coords=\"17,56,540,56,540,99,17,99\" alt=\"Link\" data-maphilight=\"{&quot;strokeColor&quot;:&quot;00ff00&quot;,&quot;strokeWidth&quot;:5,&quot;fillColor&quot;:&quot;00ff00&quot;,&quot;fillOpacity&quot;:0.6}\" title=\"This is your IRS-assigned Employer Identification Number (00-0000000), which you used on your federal employment tax returns. Tip: If you do not have an EIN when filing, write “Applied For” in box b. You can get an EIN online at irs.gov.\"></area> <area href=\"javascript:void(0)\" shape=\"poly\" coords=\"17,226,540,226,540,269,17,269\" alt=\"Link\" data-maphilight=\"{&quot;strokeColor&quot;:&quot;0000ff&quot;,&quot;strokeWidth&quot;:5,&quot;fillColor&quot;:&quot;0000ff&quot;,&quot;fillOpacity&quot;:0.6}\" title=\"Be sure to only use this box to identify or archive individual Forms W-2. Tip: You do not have to use this box.\"></area> <area href=\"javascript:void(0)\" shape=\"poly\" coords=\"17,461,298,461,298,546,17,546\" alt=\"Link\" data-maphilight=\"{&quot;strokeColor&quot;:&quot;00ff00&quot;,&quot;strokeWidth&quot;:5,&quot;fillColor&quot;:&quot;00ff00&quot;,&quot;fillOpacity&quot;:0.6}\" title=\"This is your state identification number. Tip: Don’t forget to keep information for each state and locality separated by the broken line. If you need to report more than two states or localities, you can always use a second W-2 form.\"></area> <area href=\"javascript:void(0)\" shape=\"poly\" coords=\"298,461,451,461,451,546,298,546\" alt=\"Link\" data-maphilight=\"{&quot;strokeColor&quot;:&quot;ff0000&quot;,&quot;strokeWidth&quot;:5,&quot;fillColor&quot;:&quot;ff0000&quot;,&quot;fillOpacity&quot;:0.6}\" title=\"Your employee’s total state taxable pay, if it applies. This may or may not be the same as box 1.\"></area> <area href=\"javascript:void(0)\" shape=\"poly\" coords=\"451,461,592,461,592,546,451,546\" alt=\"Link\" data-maphilight=\"{&quot;strokeColor&quot;:&quot;ff0000&quot;,&quot;strokeWidth&quot;:5,&quot;fillColor&quot;:&quot;ff0000&quot;,&quot;fillOpacity&quot;:0.6}\" title=\"Your employee’s total state income tax withheld.\"></area> <area href=\"javascript:void(0)\" shape=\"poly\" coords=\"592,461,745,461,745,546,592,546\" alt=\"Link\" data-maphilight=\"{&quot;strokeColor&quot;:&quot;ff0000&quot;,&quot;strokeWidth&quot;:5,&quot;fillColor&quot;:&quot;ff0000&quot;,&quot;fillOpacity&quot;:0.6}\" title=\"Your employee’s total locally taxable gross pay, if it applies. This may or may not be the same as box 1 or 16.\"></area> <area href=\"javascript:void(0)\" shape=\"poly\" coords=\"745,461,885,461,885,546,745,546\" alt=\"Link\" data-maphilight=\"{&quot;strokeColor&quot;:&quot;ff0000&quot;,&quot;strokeWidth&quot;:5,&quot;fillColor&quot;:&quot;ff0000&quot;,&quot;fillOpacity&quot;:0.6}\" title=\"The local tax withheld from your employee’s pay, if any.\"></area> <area href=\"javascript:void(0)\" shape=\"poly\" coords=\"885,461,975,461,975,546,885,546\" alt=\"Link\" data-maphilight=\"{&quot;strokeColor&quot;:&quot;00ff00&quot;,&quot;strokeWidth&quot;:5,&quot;fillColor&quot;:&quot;00ff00&quot;,&quot;fillOpacity&quot;:0.6}\" title=\"The name or code from where the local area wages and/or tax is being reported.\"></area> <area href=\"javascript:void(0)\" shape=\"poly\" coords=\"540,56,758,56,758,99,540,99\" alt=\"Link\" data-maphilight=\"{&quot;strokeColor&quot;:&quot;ff0000&quot;,&quot;strokeWidth&quot;:5,&quot;fillColor&quot;:&quot;ff0000&quot;,&quot;fillOpacity&quot;:0.6}\" title=\"This amount is everything you paid your employees during the tax year (before payroll deductions), such as wages, tips, bonuses, and commissions. Tip: Remember: Do not include employee contributions to a section 401(k) or 403(b) plan.\"></area> <area href=\"javascript:void(0)\" shape=\"poly\" coords=\"540,99,758,99,758,141,540,141\" alt=\"Link\" data-maphilight=\"{&quot;strokeColor&quot;:&quot;ff0000&quot;,&quot;strokeWidth&quot;:5,&quot;fillColor&quot;:&quot;ff0000&quot;,&quot;fillOpacity&quot;:0.6}\" title=\"This is all of your employee’s wages that are subject to employee social security tax, but not including tips. Tip: Keep in mind that social security wages top out at $113,700, so the total of boxes 3 and 7 should not be more than this amount.\"></area> <area href=\"javascript:void(0)\" shape=\"poly\" coords=\"540,141,758,141,758,183,540,183\" alt=\"Link\" data-maphilight=\"{&quot;strokeColor&quot;:&quot;ff0000&quot;,&quot;strokeWidth&quot;:5,&quot;fillColor&quot;:&quot;ff0000&quot;,&quot;fillOpacity&quot;:0.6}\" title=\"The same wages and tips in box 3 are also subject to Medicare taxes. The only difference is that there’s no wage base limit for Medicare tax. Tip: Remember to include any tips that employees reported, whether or not you have the employee funds to collect the Medicare taxes on them.\"></area> <area href=\"javascript:void(0)\" shape=\"poly\" coords=\"540,183,758,183,758,225,540,225\" alt=\"Link\" data-maphilight=\"{&quot;strokeColor&quot;:&quot;ff0000&quot;,&quot;strokeWidth&quot;:5,&quot;fillColor&quot;:&quot;ff0000&quot;,&quot;fillOpacity&quot;:0.6}\" title=\"This is the total amount of tips your employee reported to you, regardless of whether you have enough employee funds to collect the social security tax for the tips. Tip: Remember that social security wages top out at $113,700, so the total of boxes 3 and 7 shouldn’t exceed this amount.\"></area> <area href=\"javascript:void(0)\" shape=\"poly\" coords=\"540,225,758,225,758,268,540,268\" alt=\"Link\" data-maphilight=\"{&quot;strokeColor&quot;:&quot;0000ff&quot;,&quot;strokeWidth&quot;:5,&quot;fillColor&quot;:&quot;0000ff&quot;,&quot;fillOpacity&quot;:0.6}\" title=\"Ignore box 9, as you do not need to enter anything.\"></area> <area href=\"javascript:void(0)\" shape=\"poly\" coords=\"540,268,758,268,758,310,540,310\" alt=\"Link\" data-maphilight=\"{&quot;strokeColor&quot;:&quot;ff0000&quot;,&quot;strokeWidth&quot;:5,&quot;fillColor&quot;:&quot;ff0000&quot;,&quot;fillOpacity&quot;:0.6}\" title=\"This box allows the SSA to decide if any of the amounts reported in boxes 1, 3, or 5 were earned in a prior year—just to make sure they have paid the right amount. Tip: This is where you should include distributions made to an employee from a nonqualified plan or nongovernmental section 457(b) plan in box 1. Leave out anything related to special wage payments, such as sick or vacation pay.\"></area> <area href=\"javascript:void(0)\" shape=\"poly\" coords=\"540,310,758,310,758,353,540,353\" alt=\"Link\" data-maphilight=\"{&quot;strokeColor&quot;:&quot;ff0000&quot;,&quot;strokeWidth&quot;:5,&quot;fillColor&quot;:&quot;ff0000&quot;,&quot;fillOpacity&quot;:0.6}\" title=\"Check all that apply. Statutory employees: These are full-time employees who pay social security and Medicare taxes, but no federal income tax. Third-party sick pay: Check this only if you are an employer reporting third-party sick pay payments. Retirement plan: Check this only if an employee is participating in your retirement plan.\"></area> <area href=\"javascript:void(0)\" shape=\"poly\" coords=\"540,353,758,353,758,460,540,460\" alt=\"Link\" data-maphilight=\"{&quot;strokeColor&quot;:&quot;0000ff&quot;,&quot;strokeWidth&quot;:5,&quot;fillColor&quot;:&quot;0000ff&quot;,&quot;fillOpacity&quot;:0.6}\" title=\"This is for additional taxes or deductions that are not covered elsewhere. Tip: These are things such as withheld state disability insurance taxes, union dues, nontaxable income, educational assistance payments, etc.\"></area> <area href=\"javascript:void(0)\" shape=\"poly\" coords=\"758,56,975,56,975,99,758,99\" alt=\"Link\" data-maphilight=\"{&quot;strokeColor&quot;:&quot;ff0000&quot;,&quot;strokeWidth&quot;:5,&quot;fillColor&quot;:&quot;ff0000&quot;,&quot;fillOpacity&quot;:0.6}\" title=\"This is the total federal income tax held from your employee&#39;s wages for the year.\"></area> <area href=\"javascript:void(0)\" shape=\"poly\" coords=\"758,99,975,99,975,141,758,141\" alt=\"Link\" data-maphilight=\"{&quot;strokeColor&quot;:&quot;ff0000&quot;,&quot;strokeWidth&quot;:5,&quot;fillColor&quot;:&quot;ff0000&quot;,&quot;fillOpacity&quot;:0.6}\" title=\"Your employee’s portion of all social security tax withheld, including social security tax on tips. Tip: Remember that the tax rate for social security is 6.2%.\"></area> <area href=\"javascript:void(0)\" shape=\"poly\" coords=\"758,141,975,141,975,183,758,183\" alt=\"Link\" data-maphilight=\"{&quot;strokeColor&quot;:&quot;ff0000&quot;,&quot;strokeWidth&quot;:5,&quot;fillColor&quot;:&quot;ff0000&quot;,&quot;fillOpacity&quot;:0.6}\" title=\"For this box, include all of your employee’s withheld Medicare tax, as well as any extra Medicare tax. Be sure to exclude your share.\"></area> <area href=\"javascript:void(0)\" shape=\"poly\" coords=\"758,183,975,183,975,225,758,225\" alt=\"Link\" data-maphilight=\"{&quot;strokeColor&quot;:&quot;ff0000&quot;,&quot;strokeWidth&quot;:5,&quot;fillColor&quot;:&quot;ff0000&quot;,&quot;fillOpacity&quot;:0.6}\" title=\"If your business is in the food or beverage industry, show the tips allocated to the employee. Tip: Don’t include this amount in boxes 1, 3, 5, or 7.\"></area> <area href=\"javascript:void(0)\" shape=\"poly\" coords=\"758,225,975,225,975,268,758,268\" alt=\"Link\" data-maphilight=\"{&quot;strokeColor&quot;:&quot;00ff00&quot;,&quot;strokeWidth&quot;:5,&quot;fillColor&quot;:&quot;00ff00&quot;,&quot;fillOpacity&quot;:0.6}\" title=\"Complete this box only if you have paid for benefits, such as child care, to your employee. Tip: Include any amounts more than $5,000 in boxes 1, 3, and 5.\"></area> <area href=\"javascript:void(0)\" shape=\"poly\" coords=\"758,268,975,268,975,440,758,440\" alt=\"Link\" data-maphilight=\"{&quot;strokeColor&quot;:&quot;ff0000&quot;,&quot;strokeWidth&quot;:5,&quot;fillColor&quot;:&quot;ff0000&quot;,&quot;fillOpacity&quot;:0.6}\" title=\"Use this box to record compensation with special tax qualifications, such as 401(k) contributions. Keep in mind that you must use the IRS code designated for that item. Tip: You should not write more than four items in this box. If you need more space to record more than four items, use a separate W-2 form.\"></area> </map> </td> </tr> </table> <table style=\"width:100%\"> <tr> <td style=\"text-align:center;font-size:18px;border:1px dotted\"> <b>1.</b></td> <td style=\"text-align:center;font-size:18px;border:1px dotted\"> <b>2.</b></td> <td style=\"text-align:center;font-size:18px;border:1px dotted\"> <b>3.</b></td> </tr> <tr> <td style=\"border:1px dotted;vertical-align:top;padding:5px\">Remember to file. If you don't file a W-2, you can face some very steep penalties-up to $500,000, depending on how late you submit.</td> <td style=\"border:1px dotted;vertical-align:top;padding:5px\">Check your work. It's extremely important that you make sure all of your employee records, including names and social security numbers, are accurate and match the Social Security Administration's records. Double-check everything.</td> <td style=\"border:1px dotted;vertical-align:top;padding:5px\">Hit the deadline. You don't want to miss the deadline, so make sure you are aware of the correct deadline for submission, as dates are subject to change. Visit <a href=\"www.irs.gov\">www.irs.gov</a> for up-to-date deadlines.</td> </tr> </table> <br> <div> Who gets a W2? Any employee you've paid within the previous tax year, between January 1st and December 31st. The W2 form is important because it's how you report the total wages and compensation for the year to both your employee and the IRS. Your employee will use the W2 form you provide as they prepare their own personal tax return for the year. <br><br> As an employer, it's your responsibility to make sure the form is accurate and delivered by the IRS deadline. Otherwise you could face stiff penalties! A payroll service can help you get all the information you need to prepare your W2s correctly and with plenty of time. Do you want to learn more about the difference between a W2 and a 1099 form? Click Here. </div> </div> </section> ");

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
