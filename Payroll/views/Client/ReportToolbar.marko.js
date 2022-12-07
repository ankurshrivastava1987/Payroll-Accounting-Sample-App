function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x;

  return function render(data, out) {
    out.w("<table style=\"width: 100%; white-space: nowrap\"> <tr> <td style=\"padding: 5px 0px 5px 0px\" class=\"text-right\"> <div class=\"data-action-bar\"> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"data-align-right\"> <div class=\"tbl-action-toolbar\"> <ul> <li> <a href=\"javascript:void(0)\" class=\"btn btn-primary\" onclick=\"ExportToExcel()\"> <i class=\"fa fa-file-excel-o\" aria-hidden=\"true\"></i> Excel</a> </li> <li> <a href=\"javascript:void(0)\" class=\"btn btn-primary\" onclick=\"ExportToWord()\"><i class=\"fa fa-file-word-o\" aria-hidden=\"true\"></i> Word</a> </li> <li> <a href=\"javascript:void(0)\" class=\"btn btn-primary\" onclick=\"ExportToPDF()\"> <i class=\"fa fa-file-pdf-o\" aria-hidden=\"true\"></i> PDF</a> </li> </ul> </div> </div> </div> </div> </div> </td> </tr> </table>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
