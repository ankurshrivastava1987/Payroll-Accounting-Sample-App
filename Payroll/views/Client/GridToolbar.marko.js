function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x;

  return function render(data, out) {
    out.w("<table style=\"width: 100%; white-space: nowrap\"> <tr> <td style=\"width:100px\"> <span id=\"spanSearch\">Search:</span> </td> <td style=\"width: 250px; padding: 5px 0px 5px 0px\"> <input id=\"txtSearch\" class=\"form-control\" placeholder=\"Search for...\" onkeypress=\"SearchKeypress()\"> </td> <td style=\"padding: 5px 0px 5px 0px\" class=\"text-right\"> <div class=\"data-action-bar\"> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"data-align-right\"> <div class=\"tbl-action-toolbar\"> <ul> <li id=\"liNewRecord\"> <a id=\"aNewRecord\" href=\"javascript:void(0)\" class=\"btn btn-primary\" onclick=\"NewRecord()\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i> Add New</a> </li> <li id=\"liDelete\"> <a id=\"aDelete\" href=\"javascript:void(0)\" class=\"btn btn-primary\" onclick=\"DeleteSelected()\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i> Delete</a> </li> <li id=\"liRefresh\"> <a id=\"aRefresh\" href=\"javascript:void(0)\" class=\"btn btn-primary\" onclick=\"RefreshGrid()\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i> Refresh</a> </li> <li id=\"liDownload\"> <a id=\"aDownload\" href=\"/templates/Client.xlsx\" class=\"btn btn-primary\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i> Download Template</a> </li> <li id=\"liUpload\"> <a id=\"aUpload\" style=\"display:none\" data-bb=\"custom_html\" href=\"javascript:void(0)\" class=\"btn btn-primary\"><i class=\"fa fa-upload\" aria-hidden=\"true\"></i> Upload</a> </li> </ul> </div> </div> </div> </div> </div> </td> </tr> </table>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
