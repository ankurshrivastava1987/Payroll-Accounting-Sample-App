function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x;

  return function render(data, out) {
    out.w("<footer class=\"footer-container\"> <div class=\"container-fluid\"> <div class=\"row\"> <div class=\"col-md-6 col-sm-6\"> <div class=\"footer-left\"> <span> © 2016 <a href=\"https://www.terragent.com\">terragent</a> </span> </div> </div> <div class=\"col-md-6 col-sm-6\"> <div class=\"footer-right\"> <span class=\"footer-meta\"> Crafted with&nbsp;<i class=\"fa fa-heart\"></i>&nbsp;by&nbsp;<a href=\"https://www.terragent.com\">terragent</a> </span> </div> </div> </div> </div> </footer> <div class=\"loading-panel\"></div>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
