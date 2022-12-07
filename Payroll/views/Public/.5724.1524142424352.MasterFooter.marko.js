function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      escapeXmlAttr = __helpers.xa;

  return function render(data, out) {
    out.w("<script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/assets/bootstrap/js/bootstrap.min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/assets/js/dependencies.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/assets/form/js/contact-form.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/assets/js/ct-mediaSection/jquery.stellar.min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/assets/less/ButtonComponentMorph/js/mbMorphButton.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/assets/js/owl.carousel/owl.carousel.min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/assets/twitter/js/jquery.tweet.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/assets/js/main.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/assets/js/less-2.2.0.min.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Public/Login.js\"></script> <script src=\"" +
      escapeXmlAttr(data.CDNUrl) +
      "/javascripts/Common.js\"></script> <script>  \r\n  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\r\n  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\r\n  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\r\n  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');\r\n\r\n  ga('create', 'UA-77806944-1', 'auto');\r\n  ga('send', 'pageview');\r\n</script> <script type=\"text/javascript\">\r\nvar Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();\r\n(function(){\r\nvar s1=document.createElement(\"script\"),s0=document.getElementsByTagName(\"script\")[0];\r\ns1.async=true;\r\ns1.src='https://embed.tawk.to/58a56743a1e7630ada660239/default';\r\ns1.charset='UTF-8';\r\ns1.setAttribute('crossorigin','*');\r\ns0.parentNode.insertBefore(s1,s0);\r\n})();\r\n</script>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
