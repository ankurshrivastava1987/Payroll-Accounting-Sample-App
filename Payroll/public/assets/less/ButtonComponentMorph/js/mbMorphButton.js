(function ($) {
    "use strict";
    $(window).on("load", function(){
        var $morphButtons = $(".ct-js-mbMorphButton");
        var px = "px";
        $.browser.chrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());

        $morphButtons.each(function(){

            var $this = $(this);
            var $button = $this.find("> button");
            var $wrapperOuter = $this.find(".ct-mbMorphButton-wrapper-outer");
            var $wrapperInner = $wrapperOuter.find(".ct-mbMorphButton-wrapper-inner");
            var $closeIcon = $wrapperInner.find('.ct-mbMorphIconClose');
            var $overlay = $this.find(".ct-mbMorphButton-overlay");
            var $wrapperOuterHeight = 400;
            //var $wrapperOuterHeight = $wrapperOuter.height(); sanjeeva
            var $wrapperOuterWidth = $wrapperOuter.width();

            $wrapperOuter.addClass("morph-open");
            var $wrapperOuterNewHeight = 400;
            //var $wrapperOuterNewHeight = $wrapperOuter.height(); sanjeeva
            var $wrapperOuterNewWidth = $wrapperOuter.width();
            $wrapperOuter.removeClass("morph-open");

            var delta = 0;


            if($this.hasClass("ct-menu-morph")){
                if(jQuery.browser.mozilla || jQuery.browser.chrome){
                    if($bodyel.hasClass('ct-headroom--scrollUpMenu') ||  $bodyel.hasClass('ct-headroom--scrollUpBoth')) {

                        var $topBarHeight = $('.ct-topBar').height();
                        var scrollTest = false;

                        $(window).on("scroll", function () {
                            if ($(window).scrollTop() < 37 && scrollTest) {
                                delta = -$topBarHeight;
                            }
                            else {
                                delta = 0;
                                scrollTest = true;
                            }
                        });
                    }

                    else if($bodyel.hasClass('ct-headroom--hideMenu')){
                        $(window).on("scroll", function () {
                            if (scrollTest) {
                                delta = -37;
                            }
                            else {
                                delta = 0;
                                scrollTest = true;
                            }
                        });
                    }
                }
            }

            $button.on("click", function(e){

                $overlay.fadeIn(800);

                $wrapperOuter.css("display", "block");
                $button.css("display", "none");

                var $leftOffset = $this.offset().left;
                var $topOffset = $this.offset().top;

                var $leftScroll = $(window).scrollLeft();
                var $topScroll = $(window).scrollTop();

                var left = Math.round($leftOffset - $leftScroll);
                var top = Math.round($topOffset - $topScroll) + delta;

                if($deviceheight <= 480){
                    var newLeft = 0;
                    var newTop = 0 ;
                }
                else{
                    var newLeft = ($devicewidth / 2) - ($wrapperOuterNewWidth / 2);
                    var newTop = ($deviceheight / 2) - ($wrapperOuterNewHeight / 2) ;
                }

                $wrapperOuter.addClass("morph-open");

                $wrapperOuter.css({
                    "position": "fixed",
                    "left": left  + px,
                    "top": top  + px,
                    "width": $wrapperOuterWidth + px,                    
                    "height": $wrapperOuterHeight  + px,
                    "border-radius": 30 + px
                });



                $wrapperOuter
                    .stop()
                    .animate(
                    {
                        "left": newLeft + px,
                        "top": newTop + px,
                        "width": $wrapperOuterNewWidth + px,                        
                        "height": $wrapperOuterNewHeight  + px,
                        "border-radius": 5 + px
                    },
                    800,
                    function(){
                        if($this.find('.ct-js-owl-morph').length > 0) {
                            $('.ct-js-owl-morph').owlCarousel({
                                items: 1,
                                navigationText: ['Login', 'Register'],
                                navigation: true,
                                pagination: false,
                                rewindNav: false,
                                singleItem: true
                            });
                        }
                    });

                $wrapperInner.fadeIn(500);
            });

            $overlay.on("click", function(){

                var $leftOffset = $this.offset().left;
                var $topOffset = $this.offset().top;

                var $leftScroll = $(window).scrollLeft();
                var $topScroll = $(window).scrollTop();

                var left = $leftOffset - $leftScroll;
                var top = $topOffset - $topScroll + delta;


                if($deviceheight <= 480){
                    var newLeft = 0;
                    var newTop = 0 ;
                }
                else{
                    var newLeft = ($devicewidth / 2) - ($wrapperOuterNewWidth / 2);
                    var newTop = ($deviceheight / 2) - ($wrapperOuterNewHeight / 2) ;
                }

                $wrapperInner.fadeOut(500);
                $wrapperOuter
                    .stop()
                    .animate(
                    {
                        "left": left  + px,
                        "top": top  + px,
                        "width": $wrapperOuterWidth  + px,
                        "height": $wrapperOuterHeight  + px,
                        "border-radius": 30 + px
                    },
                    800,
                    function()
                    {
                        $wrapperOuter.removeClass("morph-open");
                        $wrapperOuter.css({
                           "position": "absolute",
                           "left": 0,
                           "top": 0,
                           "display": "none",
                           "width": $wrapperOuterWidth  + px,
                           "height": $wrapperOuterHeight  + px
                        });

                        $button.css("display", "block");
                        $wrapperInner.find(".item").css("opacity", "1");
                    });
                $overlay.fadeOut(800);
            });

            $closeIcon.on("click", function(){
                $overlay.click();
            });
        });
    });
}(jQuery));
