function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x;

  return function render(data, out) {
    out.w("<div class=\"ct-preloader\"> <div class=\"ct-preloader-content\"></div> </div> <div class=\"ct-navbarMobile ct-u-bgBlack\"> <button type=\"button\" class=\"navbar-toggle\"> <span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> </button> </div> <div class=\"ct-menuMobile\"> <ul class=\"ct-menuMobile-navbar list-unstyled ct-u-backgroundDarkGray\"> <li> <a href=\"#\" class=\"btn btn-motive ct-btn-mobileMenu\"> <span>Login</span> </a> </li> <li class=\"active\"> <a href=\"/\">Home</a> </li> <li> <a href=\"/Plans\">Plans</a> </li> <li> <a href=\"/About-Us\">About Us</a> </li> <li> <a href=\"/FAQs\">FAQs</a> </li> <li> <a href=\"/Testimonials\">Testimonials</a> </li> <li> <a href=\"/Contact-Us\">Contact Us</a> </li> </ul> </div>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
