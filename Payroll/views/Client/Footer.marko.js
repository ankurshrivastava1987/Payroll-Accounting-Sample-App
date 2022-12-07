function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x;

  return function render(data, out) {
    out.w("<footer class=\"footer-container\"> <div class=\"container-fluid\"> <div class=\"row\"> <div class=\"col-md-12 col-sm-12\"> <div class=\"footer-left\"> <span> terragent.com © 2016 All rights reserved.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Site designed and developed by <a href=\"http://www.codingcubicle.com\" target=\"_blank\" class=\"link\"><u>Coding Cubicle Pvt. Ltd.</u></a> </span> </div> </div> </div> </div> </footer> <div class=\"loading-panel\"></div>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
