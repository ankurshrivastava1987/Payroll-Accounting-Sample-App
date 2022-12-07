/*
By Lucas Fajger
With this script we need:

 {{CSS}}
 .navbar-scroll-top {
 position: fixed;
 left: 0;
 top: 0;
 width: 100%;
 z-index: 9999;
 }

 //headroom styles for fixed headers and menus
 .headroom {
 transition: transform 200ms linear;
 z-index: 9998;
 }
 .headroom--pinned {
 transform: translateY(0%);
 display: block;
 }
 .headroom--unpinned {
 transform: translateY(-100%);
 display: none;
 }

 {{CLASSES inside tags}}
 For topBar - ct-topBar
 For menu - navbar


 if you dont have in your main.js $topbarel and $navbarel variables then copy them at the beggining in this function:

 var $navbarel = jQuery(".navbar");
 var $topbarel = jQuery(".ct-topBar");

 */




$(document).ready(function () {

    var $headroomStr = "ct-js-headroom";
    var $headroomCla = ".ct-js-headroom";
    var $topBarStr = "ct-topBar";
    var $navBarStr = "navbar";

    if($bodyel.hasClass("ct-headroom--scrollUpMenu")){
        $navbarel.addClass($headroomStr);
    }
    else if($bodyel.hasClass("ct-headroom--scrollUpTopBar")){
        $topbarel.addClass($headroomStr);
    }
    else if($bodyel.hasClass("ct-headroom--scrollUpBoth")){
        var $scrollUpBoth = true;
        $topbarel.addClass($headroomStr);
        $navbarel.addClass($headroomStr);
    }
    else if($bodyel.hasClass("ct-headroom--fixedTopBar")){
        var $fixedTopBar = true;
        $topbarel.addClass($headroomStr);
    }
    else if($bodyel.hasClass("ct-headroom--fixedMenu")){
        var $fixedMenu = true;
        $navbarel.addClass($headroomStr);
    }
    else if($bodyel.hasClass("ct-headroom--fixedBoth")){
        var $fixedBoth = true;
        var $scrollUpBoth = true;
        $topbarel.addClass($headroomStr);
        $navbarel.addClass($headroomStr);
    }
    else if($bodyel.hasClass("ct-headroom--hideMenu")){
        var $fixedScrollUpTopBar = true;
        var $scrollUpTopBar = true;
        $topbarel.addClass($headroomStr);
        $navbarel.addClass($headroomStr);
    }
    else{
        return;
    }

    if($($headroomCla).length > 0){
        $($headroomCla).each(function(){
            var $this = $(this);
            $(window).scroll(function(){
                var scrollPos = $(window).scrollTop();

                if ($this.hasClass($topBarStr)){
                    if (scrollPos > 100){
                        $this.addClass("navbar-scroll-top");
                    }
                    else{
                        $this.removeClass("navbar-scroll-top");
                    }
                }
                else if($this.hasClass($navBarStr)){
                    if (scrollPos > 37){
                        $this.addClass("navbar-scroll-top");

                        if($scrollUpBoth || $scrollUpTopBar){
                            $this.css("top","37px"); //add 50px for menu coz topbar has 50px, we want to put it below
                        }
                    }
                    else{
                        $this.removeClass("navbar-scroll-top");
                        if($scrollUpBoth || $scrollUpTopBar){
                            $this.css("top","auto");
                        }
                    }
                }
            });

            var ctoffset = validatedata($this.attr("data-offset"), 200);

            var cttolerance = validatedata($this.attr("data-tolerance"),5) ;
            var ctinitiial = validatedata($this.attr("data-initial"), "animatedDif");
            var cttop = validatedata($this.attr("data-top"), "headroom--top");
            var ctnotTop = validatedata($this.attr("data-top"), "headroom--not-top");

            if($fixedScrollUpTopBar){
                if($this.hasClass("ct-topBar")){
                    var $fixedScrollUpTopBarConfirmed = true;
                }
            }

            if($fixedBoth || $fixedTopBar || $fixedMenu || $fixedScrollUpTopBarConfirmed){
                //if you want to fix elements for good, then we should change variables so that they are with the same name, no matter what
                var ctpinned = validatedata($this.attr("data-pinned"), "IAmFixed");
                var ctunpinned = validatedata($this.attr("data-unpinned"), "IAmFixed");
            }
            else{
                var ctpinned = validatedata($this.attr("data-pinned"), "fadeInDown");
                var ctunpinned = validatedata($this.attr("data-unpinned"), "fadeOutUp");
            }

            $this.headroom({ //do this for each element use  add .ct-js-headroom

                "offset": ctoffset,// vertical offset in px before element is first unpinned
                "tolerance": cttolerance, // scroll tolerance in px before state changes
                "top": cttop, // when above offset
                "notTop": ctnotTop, // when below offset

                "classes": {
                    "initial": ctinitiial, // when element is initialised
                    "pinned": ctpinned, // when scrolling up
                    "unpinned": ctunpinned // when scrolling down
                }
            });
        });
    }
});
