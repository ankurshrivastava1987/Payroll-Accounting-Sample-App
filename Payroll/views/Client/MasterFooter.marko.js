function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      escapeXmlAttr = __helpers.xa;

  return function render(data, out) {
    out.w("<script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery-migrate.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/bootstrap.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.ui.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jRespond.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/nav.accordion.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/hover.intent.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/hammerjs.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.hammer.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.fitvids.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/scrollup.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/smoothscroll.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.slimscroll.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.syntaxhighlighter.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/velocity.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/smart-resize.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.maskedinput.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.validate.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/jquery.form.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/lib/j-forms.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/js/apps.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/underscore-min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/jquery.storageapi.min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/socket.io-1.3.5.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Client/Common.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Client/Header.js\"></script> <script>\r\n  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\r\n  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\r\n  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\r\n  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');\r\n\r\n  ga('create', 'UA-77806944-1', 'auto');\r\n  ga('send', 'pageview');\r\n</script> <script type=\"text/javascript\">\r\n  var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();\r\n  (function(){\r\n  var s1=document.createElement(\"script\"),s0=document.getElementsByTagName(\"script\")[0];\r\n  s1.async=true;\r\n  s1.src='https://embed.tawk.to/58a56743a1e7630ada660239/default';\r\n  s1.charset='UTF-8';\r\n  s1.setAttribute('crossorigin','*');\r\n  s0.parentNode.insertBefore(s1,s0);\r\n  })();\r\n</script>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
