/**
 * Created by createit on 2015-01-08.
 */


var $devicewidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var $deviceheight = (window.innerHeight > 0) ? window.innerHeight : screen.height;

var $bodyel = jQuery("body");

var $navbarel = jQuery(".navbar");
var $topbarel = jQuery(".ct-topBar");


/* ========================== */
/* ==== HELPER FUNCTIONS ==== */

function validatedata($attr, $defaultValue) {
    "use strict";
    if ($attr !== undefined) {
        return $attr
    }
    return $defaultValue;
}

function parseBoolean(str, $defaultValue) {
    "use strict";
    if (str == 'true') {
        return true;
    } else if (str == "false") {
        return false;
    }
    return $defaultValue;
}


///////////Kenburn////////////////////////

function makekenburns($element) {
    // we set the 'fx' class on the first image
    // when the page loads
    $element.find('img')[0].className = "fx";

    // the third variable is to keep track of
    // where we are in the loop
    // if it is set to *1* (instead of 0)
    // it is because the first image is styled
    // when the page loads
    var images = $element.find('img'), numberOfImages = images.length, i = 1;
    if (numberOfImages == 1) {
        images[0].className = "singlefx";
    }
    // this calls the kenBurns function every
    // 4 seconds. You can increase or decrease
    // this value to get different effects
    window.setInterval(kenBurns, 7000);

    function kenBurns() {
        if (numberOfImages != 1) {
            if (i == numberOfImages) {
                i = 0;
            }
            images[i].className = "fx";
            // we can't remove the class from the previous
            // element or we'd get a bouncing effect so we
            // clean up the one before last
            // (there must be a smarter way to do this though)
            if (i === 0) {
                images[numberOfImages - 2].className = "";
            }
            if (i === 1) {
                images[numberOfImages - 1].className = "";
            }
            if (i > 1) {
                images[i - 2].className = "";
            }
            i++;
        }
    }
}



////////////////////////////////gMap///////////////////////////////////////////////////////////


var $maphelp = $('.ct-googleMap--accordion .ct-googleMap');
$(".ct-googleMap--accordion .ct-js-mapToogle").on("click", function () {
    "use strict";
    var $this = $(this);
    var $map = $this.parent().find('.ct-googleMap-container');
    $this.html($this.html() == '<i class="fa fa-map-marker"></i> Hide map' ? '<i class="fa fa-map-marker"></i> Show map' : '<i class="fa fa-map-marker"></i> Hide map');

    if ($map.height() != "0") {
        $map.animate({height: '0px'}, 500);
    } else {
        $map.animate({height: $maphelp.data("height") + "px"}, 500);
        setTimeout(function () {
            $('html, body').animate({
                scrollTop: $map.offset().top - 180
            }, 2000);
        }, 500);
    }
});
/* ============================================= */
/* ==== GOOGLE MAP ==== */

function initmap() {
    "use strict";
    var draggable = true;

    if (device.mobile() || device.tablet())
    {
        draggable = false;
    }

    if (($(".ct-googleMap").length > 0) && (typeof google === 'object' && typeof google.maps === 'object')) {
        $('.ct-googleMap').each(function () {
            var atcenter = "";
            var $this = $(this);
            var location = $this.data("location");
            var zoom = $this.data("zoom");

            var offset = -30;

            if (validatedata($this.data("offset"))) {
                offset = $this.data("offset");
            }

            if (validatedata(location)) {
                $this.gmap3({
                    marker: {
                        //latLng: [40.616439, -74.035540],
                        address: location, options: {
                            //visible: false
                            icon: new google.maps.MarkerImage("assets/images/marker.png")
                        }, callback: function (marker) {
                            atcenter = marker.getPosition();
                        }
                    },
                    map: {
                        options: {
                            //maxZoom:11,
                            zoom: zoom,
                            mapTypeId: google.maps.MapTypeId.ROADMAP,
                            // ('ROADMAP', 'SATELLITE', 'HYBRID','TERRAIN');
                            scrollwheel: false,
                            disableDoubleClickZoom: false,
                            draggable: draggable,
                            //disableDefaultUI: true,
                            mapTypeControlOptions: {
                                //mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID],
                                //style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                                //position: google.maps.ControlPosition.RIGHT_CENTER
                                mapTypeIds: []
                            },
                            styles: [

                                {
                                    "featureType": "landscape",
                                    "stylers": [
                                        {"saturation": -100},
                                        {"lightness": 65},
                                        {"visibility": "on"}
                                    ]
                                },
                                {
                                    "featureType": "poi",
                                    "stylers": [
                                        {"saturation": -100},
                                        {"lightness": 51}, {"visibility": "simplified"}
                                    ]
                                },
                                {
                                    "featureType": "road.highway",
                                    "stylers": [
                                        {"saturation": -100},
                                        {"visibility": "simplified"},

                                    ]
                                },
                                {
                                    "featureType": "road.arterial",
                                    "stylers": [
                                        {"saturation": -100},
                                        {"lightness": 30},
                                        {"visibility": "on"}
                                    ]
                                },
                                {
                                    "featureType": "road.local",
                                    "stylers": [
                                        {"saturation": -100},
                                        {"lightness": 40},
                                        {"visibility": "on"},

                                    ]
                                },
                                {
                                    "featureType": "transit",
                                    "stylers": [
                                        {"saturation": -100},
                                        {"visibility": "simplified"}
                                    ]
                                },
                                {
                                    "featureType": "administrative.province",
                                    "stylers": [
                                        {"visibility": "off"}
                                    ]
                                },
                                {
                                    "featureType": "water",
                                    "elementType": "labels",
                                    "stylers": [
                                        {"visibility": "on"},
                                        {"lightness": -25}, {"saturation": -100}
                                    ]
                                },
                                {
                                    "featureType": "water",
                                    "elementType": "geometry",
                                    "stylers": [{"hue": "#ffff00"},
                                        {"lightness": -25},
                                        {"saturation": -97}
                                    ]
                                }
                            ]

                        },
                        events: {
                            idle: function () {
                                if (!$this.data('idle')) {
                                    $this.gmap3('get').panBy(0, offset);
                                    $this.data('idle', true);
                                }
                            }
                        }
                    },
                    overlay: {
                        //latLng: [40.616439, -74.035540],
                        address: location,
                        options: {
                            //content: '<div class="customMarker"><div class="address">' + location + '</div><div class="marker"><img src="assets/images/custom-marker.png"></div></div>',
                            offset: {
                                y: -100,
                                x: -25
                            }
                        }
                    }
                    //},"autofit"
                });

                // center on resize
                google.maps.event.addDomListener(window, "resize", function () {
                    //var userLocation = new google.maps.LatLng(53.8018,-1.553);
                    setTimeout(function () {
                        $this.gmap3('get').setCenter(atcenter);
                        $this.gmap3('get').panBy(0, offset);
                    }, 400);

                });

                // set height
                $this.css("min-height", $this.data("height") + "px");
            }

            if ($this.parent().parent().hasClass('hidemap')) {
                $this.parent().animate({height: '0px'}, 500);
            }

        })
    }
}

initmap();

(function ($) {
    "use strict";

    // Preloader
    $(window).on('load', function(){

        var $preloader = $('.ct-preloader');
        var $content = $('.ct-preloader-content');

        var $timeout = setTimeout(function(){
            $($preloader).addClass('animated').addClass('fadeOut');
            $($content).addClass('animated').addClass('fadeOut');
        }, 0);
        var $timeout2 = setTimeout(function(){
            $($preloader).css('display', 'none').css('z-index', '-9999');
        }, 500);
    });


    $(document).ready(function(){

        $(".twitterContainer, .ct-js-owl").attr("data-snap-ignore", true)

        // Add Color // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $(".ct-js-color").each(function(){
            $(this).css("color", '#' + $(this).attr("data-color"))
        })


        //======================================================== Morph =================================================================================

        if(jQuery.browser.iOS) {
            $('.ct-personBox-email').css("display", "none");
            $('.ct-personBox-emailSimple').css("display", "inline-block");
        }

        //======================================================== Menu ================================================================================================================================

        // Snap Navigation in Mobile // ----------------------------------------------------------------------------------------------------------------------------------------------------------------

        var snapper = new Snap({
            element: document.getElementById('ct-js-wrapper')
        });

        if ($devicewidth < 768 && !$bodyel.hasClass("ct-js-snapperClose")) {

            snapper.settings({
                disable: 'left',
                addBodyClasses: true
            });
        }

        else{
            snapper.close();
            snapper.disable();
        }

        $(window).on('resize', function() {

            if ($(window).width() < 768) {
                snapper.enable();
            } else{
                snapper.close();
                snapper.disable();
            }
        });

        $(".navbar-toggle").on("click", function () {

            if($bodyel.hasClass('snapjs-right')){
                snapper.close();
            } else{
                snapper.open('right');
            }
        });


        // Snap Navigation in Mobile open // -----------------------------------------------------------------------------------------------------------------------------------------------------------


        $('.ct-menuMobile .ct-menuMobile-navbar .dropdown > a').on("click", function() {
            return false; // iOS SUCKS
        });
        $('.ct-menuMobile .ct-menuMobile-navbar .dropdown > a').on("click", function(){
            var $this = $(this);
            if($this.parent().hasClass('open')){
                $(this).parent().removeClass('open');
            } else{
                $('.ct-menuMobile .ct-menuMobile-navbar .dropdown.open').toggleClass('open');
                $(this).parent().addClass('open');
            }
        });

        // To Top Button // -----------------------------------------------------------------------------------------------------------------------------------------------------------

        $('.ct-js-btnScrollUp').on("click", function (e) {
            e.preventDefault();
            $("body,html").animate({scrollTop: 0}, 1200);
            console.log($navbarel);
            $navbarel.find('.onepage').removeClass('active');
            $navbarel.find('.onepage:first-child').addClass('active');
            return false;
        });

        $(window).on("scroll", function(){

            var scroll = $(window).scrollTop();

            if (scroll > 300) {
                jQuery('.ct-js-btnScrollUp').addClass('is-active');
            } else {
                jQuery('.ct-js-btnScrollUp').removeClass('is-active');
            }
        });

        // Alerts // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $(".ct-alert .ct-alert-closeIcon i").each(function(){
            $(this).on("click", function(){
                $(this).parent().parent().parent().fadeOut();
            });
        });

        // Tooltip init // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $("[data-toggle='tooltip']").tooltip();


        // Animations Init // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        if ($().appear) {
            if (device.mobile() || device.tablet()) {
                $("body").removeClass("cssAnimate");
            } else {
                $('.cssAnimate .animated').appear(function () {
                    var $this = $(this);
                    $this.each(function () {
                        if ($this.data('time') != undefined) {
                            setTimeout(function () {
                                $this.addClass('activate');
                                $this.addClass($this.data('fx'));
                            }, $this.data('time'));
                        } else {
                            $this.addClass('activate');
                            $this.addClass($this.data('fx'));
                        }
                    });
                }, {accX: 50, accY: -350});
            }
        }




        // list Switcher // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


        //blog

        var $blogSwitcher = $('#ct-js-blogType');

        var $blogMasonry = $blogSwitcher.find('#ct-js-blogType-masonry');
        var $blogSingle = $blogSwitcher.find('#ct-js-blogType-single');

        var $blogContainer = $('.ct-blog-container');
        var $blogItems = $blogContainer.find('.ct-blog-item');

        $blogMasonry.on("click", function(){
            if(!$blogContainer.hasClass('ct-blog-masonry'))
            {
                $blogContainer.addClass('ct-blog-masonry').addClass('ct-blog-masonry--col2');;
                if(!$portfolioContainer.hasClass('ct-blog-masonry--col3') && !$portfolioContainer.hasClass('ct-blog-masonry--col3') && !$portfolioContainer.hasClass('ct-blog-masonry--col4'))
                {
                    $blogContainer.addClass('ct-blog-masonry--col2');
                }

                $blogItems.each(function(){
                    $(this).addClass('ct-gallery-item');
                });

                $blogContainer.isotope();

                $(this).addClass('active');
                $blogSingle.removeClass('active')
            }
        });

        $blogSingle.on("click", function(){
            if($blogContainer.hasClass('ct-blog-masonry'))
            {
                $blogContainer.removeClass('ct-blog-masonry').removeClass('ct-blog-masonry--col2');
                $blogItems.each(function(){
                    $(this).addClass('ct-gallery-item');
                });

                $blogContainer.isotope();

                $(this).addClass('active');
                $blogMasonry.removeClass('active');
            }
        });

        //portfolio

        var $portfolioSwitcher = $('#ct-js-portfolioType');

        var $portfolioMasonry = $portfolioSwitcher.find('#ct-js-portfolioType-masonry');
        var $portfolioSingle = $portfolioSwitcher.find('#ct-js-portfolioType-single');

        var $portfolioContainer = $('.ct-portfolio-container');
        var $portfolioItems = $portfolioContainer.find('.ct-portfolio-item');

        $portfolioMasonry.on("click", function(){
            if(!$portfolioContainer.hasClass('ct-portfolio-masonry'))
            {
                $portfolioContainer.addClass('ct-portfolio-masonry');
                if(!$portfolioContainer.hasClass('ct-portfolio-masonry--col3') && !$portfolioContainer.hasClass('ct-portfolio-masonry--col3') && !$portfolioContainer.hasClass('ct-portfolio-masonry--col4'))
                {
                    $portfolioContainer.addClass('ct-portfolio-masonry--col2');
                }

                $portfolioItems.each(function(){
                    $(this).addClass('ct-gallery-item');
                });
                $portfolioContainer.each(function(){
                    $(this).isotope();
                });

                $(this).addClass('active');
                $portfolioSingle.removeClass('active')
            }
        })

        $portfolioSingle.on("click", function(){
            if($portfolioContainer.hasClass('ct-portfolio-masonry'))
            {
                $portfolioContainer.removeClass('ct-portfolio-masonry').removeClass('ct-portfolio-masonry--col2');
                $portfolioItems.each(function(){
                    $(this).addClass('ct-gallery-item');
                });

                $portfolioContainer.each(function(){
                    $(this).isotope();
                });

                $(this).addClass('active');
                $portfolioMasonry.removeClass('active');
            }
        })

        //======================================================== Other =================================================================================================================================


        // Progress Bar // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        //$('.progress-bar').progressbar();

        if (jQuery().appear && jQuery("body").hasClass("cssAnimate")) {
            jQuery('.progress').appear(function () {
                var $this = jQuery(this);
                $this.each(function () {
                    var $innerbar = $this.find(".progress-bar");
                    var percentage = $innerbar.attr("data-percentage");
                    $innerbar.addClass("animating").css("width", percentage + "%");

                    $innerbar.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
                        $innerbar.find(".pull-right").fadeIn(900);
                    });

                });
            }, {accY: -100});
        } else {
            jQuery('.progress').each(function () {
                var $this = jQuery(this);
                var $innerbar = $this.find(".progress-bar");
                var percentage = $innerbar.attr("data-percentage");
                $innerbar.addClass("animating").css("width", percentage + "%");

                $innerbar.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
                    $innerbar.find(".pull-right").fadeIn(900);
                });

            });
        }

        /* =================================== COUNT TO ===================================== */


        if (($().countTo) && ($().appear) && ($("body").hasClass("cssAnimate"))) {
            $('.ct-js-counter').data('countToOptions', {
                formatter: function (value, options) {
                    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
                }
            }).appear(function () {
                $(this).each(function (options) {
                    var $this = $(this);
                    var $speed = validatedata($this.attr('data-speed'), 700);
                    options = $.extend({}, options || {
                        speed: $speed
                    }, $this.data('countToOptions') || {});
                    $this.countTo(options);
                });
            });
        } else if(($().countTo)){
            $('.ct-js-counter').data('countToOptions', {
                formatter: function (value, options) {
                    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
                }
            });
            $('.ct-js-counter').each(function (options) {
                var $this = $(this);
                var $speed = validatedata($this.attr('speed'), 1200);
                options = $.extend({}, options || {
                    speed: $speed
                }, $this.data('countToOptions') || {});
                $this.countTo(options);
            });
        }



        //====================== Media Section =================================================



        // Page Section DEFAULTS // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $(".ct-mediaSection").each(function () {
            var $this = $(this);
            var $height = $this.attr("data-height");

            // Page Section HEIGHT // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            if(!(typeof $height === 'undefined')){
                if ($height.indexOf("%") > -1) {
                    $this.css('min-height', $deviceheight);
                    $this.css('height', $deviceheight);
                } else if($devicewidth > 768){
                    $this.css('min-height', $height + "px");
                    $this.css('height', $height + "px");
                }
            }

            // Page Section BACKGROUND COLOR // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            if($this.attr('data-type')=="color"){
                var $bg_color = $this.attr("data-bg-color");
                $this.css('background-color', $bg_color);
            }

            // Page Section BACKGROUND IMAGE // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            if($this.attr('data-type')=="pattern" || $this.attr('data-type')=="parallax" || $this.attr('data-type')=="video" || $this.attr('data-type')=="kenburns"){
                var $bg_image_fallback = $this.attr("data-bg-image-mobile");
                if (!(device.mobile() || device.ipad() || device.androidTablet())){
                    if($this.attr('data-type')=="pattern" || $this.attr('data-type')=="parallax") {
                        var $bg_image = $this.attr("data-bg-image");
                        $this.css('background-image', 'url("' + $bg_image + '")');
                    }
                } else{
                    $this.css('background-image', 'url("' + $bg_image_fallback + '")');
                }

                // Page Section BACKGROUND POSITION FOR iDevices // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

                if (device.mobile() || device.ipad() || device.androidTablet() || device.isIE8) {
                    $this.css('background-attachment', 'scroll'); // iOS SUCKS
                }
            }

            // Page Section KENBURNS // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            if($this.attr('data-type')=="kenburns"){
                var images = $this.find('.ct-mediaSection-kenburnsImageContainer img');

                if (!(device.mobile() || device.ipad() || device.androidTablet())) {
                    makekenburns($this.find('.ct-mediaSection-kenburnsImageContainer'));
                } else {
                    images.each(function () {
                        $(this).remove();
                    })
                }
            }

            // Page Section VIDEO // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            if($this.attr('data-type')=="video"){
                var $this = $(this);
                var $height = $this.attr("data-height");
                var $time = 1;

                if ($height.indexOf("%") > -1) {
                    $this.css('min-height', $deviceheight);
                    $this.find('> .ct-u-displayTable').css('height', $deviceheight);
                } else {
                    if($devicewidth >= 768){
                        $this.css('min-height', $height + "px");
                        $this.find('> .ct-u-displayTable').css('height', $height + "px");
                    }
                    else{
                        $this.css('min-height', 300 + "px");
                        $this.css('height', 300 + "px");
                        $this.find(".ct-mediaSection-inner").css("padding-top", "60px");
                    }
                }
                if (!$this.hasClass("html5")) {
                    var $videoframe = $this.find('iframe')
                    if ($videoframe.attr('data-startat')) {
                        $time = $videoframe.attr('data-startat');
                    }
                    if (!($devicewidth < 992) && !device.mobile()) {
                        if (typeof $f != 'undefined') {
                            var $video = '#' + $videoframe.attr('id');
                            var iframe = $($video)[0], player = $f(iframe), status = $('.status');


                            player.addEvent('ready', function () {
                                player.api('setVolume', 0);
                                player.api('seekTo', $time);
                            })
                        }
                    }
                } else {
                    //THIS IS WHERE YOU CALL THE VIDEO ID AND AUTO PLAY IT. CHROME HAS SOME KIND OF ISSUE AUTOPLAYING HTML5 VIDEOS, SO THIS IS NEEDED
                    document.getElementById('video1').play();
                }
                if ($devicewidth < 992 || device.mobile() || device.ipad() || device.androidTablet()) {
                    $this.find(".ct-mediaSection-video").css('display', 'none');
                }
            }

        })

        // Page Section PARALLAX // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        if ($().stellar && !device.isIE8) {
            if (!device.mobile() && !device.ipad() && !device.androidTablet()) {
                $(window).stellar({
                    horizontalScrolling: false, responsive: true, positionProperty: 'transform'
                });
            }
        }

        // Page Section PARALLAX // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $(".stellar-object").each(function () {
            var $this = $(this);
            var $bg = $this.attr("data-image");
            var $height = $this.attr("data-height") + 'px';
            var $width = $this.attr("data-width") + 'px';
            var $top = $this.attr("data-top");
            var $left = $this.attr("data-left");

            $this.css('background-image', 'url("' + $bg + '")');
            $this.css('width', $width);
            $this.css('height', $height);
            $this.css('top', $top);
            $this.css('left', $left);
        })


        // ============================= Headroom ============================================

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
                $(window).on("scroll", function(){
                    var scrollPos = $(window).scrollTop();

                    if ($this.hasClass($topBarStr)){
                        if (scrollPos > 50){
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




        /* ============================== OWL CAROUSEL ============================= */

        if($().owlCarousel){
            if ($(".ct-js-owl").length > 0) {
                $(".ct-js-owl").each(function (){
                    var $this = $(this);

                    var ctanimations = validatedata($this.attr("data-animations"), false);

                    $this.find(".item").each(function () {
                        var $slide_item = $(this);
                        var bg = validatedata($slide_item.attr('data-bg'), false);
                        if (bg) {
                            $slide_item.css('background-image', 'url("' + bg + '")');
                        }
                    })

                    if($devicewidth < 768 || device.mobile() || device.ipad() || device.androidTablet()){
                        ctanimations = false;
                        $('.owl-item [data-fx]').addClass('activate');
                    }

                    var $lgWidth = 1199;
                    var $mdWidth = 991;
                    var $smWidth = 767;
                    var $xsWidth = 479;

                    var ctitems = parseInt(validatedata($this.attr("data-items"), 5), 10);
                    var ctsingleitem = parseBoolean($this.attr("data-single"), true);
                    var ctscaleitems = parseBoolean($this.attr("data-scaleUp"), false);

                    var ctslidespeed = parseInt(validatedata($this.attr("data-slideSpeed"), 200), 10);
                    var ctpagspeed = parseInt(validatedata($this.attr("data-paginationSpeed"), 800), 10);
                    var ctrewindspeed = parseInt(validatedata($this.attr("data-rewindSpeed"), 1000), 10);

                    var ctautoplay = parseBoolean($this.attr("data-autoPlay"), false);
                    if($this.attr("data-autoPlaySpeed") != null){
                        ctautoplay = parseInt(validatedata($this.attr("data-autoPlaySpeed"), 5000), 10);
                    }
                    var ctstophover = parseBoolean($this.attr("data-stopOnHover"), false);

                    var ctnavigation = parseBoolean($this.attr("data-navigation"), false);
                    //var ctnavigationText = validatedata($this.attr("data-navigationText"), "fade");
                    var ctrewindnav = parseBoolean($this.attr("data-rewindNav"), true);
                    var ctscrollperpage = parseBoolean($this.attr("data-scrollPerPage"), false)

                    var ctpagination = parseBoolean($this.attr("data-pagination"), true);
                    var ctpaginationnumbers = parseBoolean($this.attr("data-paginationNumbers"), false);

                    var ctresponsive = parseBoolean($this.attr("data-responsive"), true);

                    var ctlazyload = parseBoolean($this.attr("data-lazyLoad"), false);

                    var ctautoheight = parseBoolean($this.attr("data-autoHeight"), false);

                    var ctmouse = parseBoolean($this.attr("data-mouse"), true);
                    var cttouch = parseBoolean($this.attr("data-touch"), true);

                    var cttransition = validatedata($this.attr("data-cttransition"), "fade");

                    $this.owlCarousel({
                        // Most important owl features
                        items : ctitems, //This variable allows you to set the maximum amount of items displayed at a time with the widest browser width
                        itemsDesktop : [$lgWidth,4], //This allows you to preset the number of slides visible with a particular browser width. The format is [x,y] whereby x=browser width and y=number of slides displayed. For example [1199,4] means that if(window<=1199){ show 4 slides per page} Alternatively use itemsDesktop: false to override these settings.
                        itemsDesktopSmall : [$mdWidth,3], //As above.
                        itemsTablet: [$smWidth,2], // As above.
                        itemsMobile : [$xsWidth,1], // As above.
                        singleItem : ctsingleitem, // Display only one item.
                        itemsScaleUp : ctscaleitems, // Option to not stretch items when it is less than the supplied items.

                        //Basic Speeds
                        slideSpeed : ctslidespeed, // Slide speed in milliseconds
                        paginationSpeed : ctpagspeed, // Pagination speed in milliseconds
                        rewindSpeed : ctrewindspeed, // Rewind speed in milliseconds

                        //Autoplay
                        autoPlay : ctautoplay, // Change to any integrer for example autoPlay : 5000 to play every 5 seconds. If you set autoPlay: true default speed will be 5 seconds.
                        stopOnHover : ctstophover, // Stop autoplay on mouse hover

                        // Navigation
                        navigation : ctnavigation, // Display "next" and "prev" buttons.

                        navigationText : ['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>'], // You can customize your own text for navigation. To get empty buttons use navigationText : false. Also HTML can be used here
                        rewindNav : ctrewindnav, // Slide to first item. Use rewindSpeed to change animation speed.
                        scrollPerPage : ctscrollperpage, // Scroll per page not per item. This affect next/prev buttons and mouse/touch dragging.

                        //Pagination
                        pagination : ctpagination, // Show pagination.
                        paginationNumbers: ctpaginationnumbers, // Show numbers inside pagination buttons

                        // Responsive
                        responsive: ctresponsive, // You can use Owl Carousel on desktop-only websites too! Just change that to "false" to disable resposive capabilities
                        responsiveRefreshRate : 200, // Check window width changes every 200ms for responsive actions
                        responsiveBaseWidth: window, // Owl Carousel check window for browser width changes. You can use any other jQuery element to check width changes for example ".owl-demo". Owl will change only if ".owl-demo" get new width.

                        // CSS Styles
                        baseClass : "owl-carousel", // Automaticly added class for base CSS styles. Best not to change it if you don't need to.
                        theme : "owl-theme", // Default Owl CSS styles for navigation and buttons. Change it to match your own theme

                        //Lazy load
                        lazyLoad : ctlazyload, // Delays loading of images. Images outside of viewport won't be loaded before user scrolls to them. Great for mobile devices to speed up page loadings. IMG need special markup class="lazyOwl" and data-src="your img path". See example.
                        lazyFollow : true, // When pagination used, it skips loading the images from pages that got skipped. It only loads the images that get displayed in viewport. If set to false, all images get loaded when pagination used. It is a sub setting of the lazy load function.
                        lazyEffect : "fade", // Default is fadeIn on 400ms speed. Use false to remove that effect.

                        //Auto height
                        autoHeight : ctautoheight,

                        //JSON
                        jsonPath : false,
                        jsonSuccess : false,

                        //Mouse Events
                        dragBeforeAnimFinish : true,
                        mouseDrag : ctmouse,
                        touchDrag : cttouch,

                        //Transitions
                        transitionStyle : cttransition, // Add CSS3 transition style. Works only with one item on screen.

                        // Other
                        addClassActive : true, // Add "active" classes on visible items. Works with any numbers of items on screen.
                        loop: true,

                        //Callbacks
                        beforeUpdate : false,
                        afterUpdate : false,
                        beforeInit: function () {

                        },
                        afterInit: function(){

                            if(ctanimations) {
                                //$this.css('min-height', $this.attr('data-height'));
                                //$this.css('height', $this.attr('data-height'));
                                //$this.find('.owl-wrapper-outer').css('min-height', $this.attr('data-height'));
                                //$this.find('.owl-wrapper-outer').css('height', $this.attr('data-height'));
                                //$this.find('.owl-wrapper').css('min-height', $this.attr('data-height'));
                                //$this.find('.owl-wrapper').css('height', $this.attr('data-height'));

                                setTimeout(function () {
                                    $this.find(".owl-item.active > .item [data-fx]").each(function () {
                                        var $content = $(this);
                                        if ($content.data('time') != undefined) {
                                            setTimeout(function () {
                                                $content.addClass($content.data('fx')).addClass("activate");
                                            }, $content.data('time'));
                                        } else{
                                            $content.addClass($content.data('fx')).addClass("activate");
                                        }
                                    })
                                }, 650);
                            }
                        },
                        beforeMove: false,
                        afterMove: false,
                        afterAction:  function(){
                            if(ctanimations){
                                $this.find(".owl-item > .item [data-fx]").each(function () {
                                    var $content = $(this);
                                    $content.removeClass($content.data('fx')).removeClass("activate");
                                })
                                setTimeout(function () {
                                    $this.find(".owl-item.active > .item [data-fx]").each(function () {
                                        var $content = $(this);
                                        if ($content.data('time') != undefined) {
                                            setTimeout(function () {
                                                $content.addClass($content.data('fx')).addClass("activate");
                                            }, $content.data('time'));
                                        } else{
                                            $content.addClass($content.data('fx')).addClass("activate");
                                        }
                                    })
                                }, 150);
                            }
                        },
                        startDragging : false,
                        afterLazyLoad : false
                    })
                })
            }
        }


        // owl height // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        var $owls = $(".ct-js-owl[data-height]");

        $owls.each(function(){
            var $owlHeight = $(this).attr('data-height');
            var heightForOwl = 0;

            if($owlHeight.indexOf("%") > -1){
                if(!$bodyel.hasClass("ct-navbar--transparent"))
                {

                    var $mainNavHeight = $('.mainHeader').height();
                    heightForOwl = $deviceheight - $mainNavHeight;
                }

                else{
                    heightForOwl = $deviceheight;
                }
            }

            else{
                if($devicewidth < 768){
                    heightForOwl = 300;
                }
                else{
                    heightForOwl = $owlHeight;
                }
            }


            $(this).css("height", heightForOwl + "px");
            $(this).css("min-height", heightForOwl + "px");

            var $owlWrapperOuter = $(this).find('.owl-wrapper-outer');

            $owlWrapperOuter.css("height", heightForOwl + "px");
            $owlWrapperOuter.css("min-height", heightForOwl + "px");

            var $owlWrapper = $owlWrapperOuter.find('.owl-wrapper');

            $owlWrapper.css("height", heightForOwl + "px");
            $owlWrapper.css("min-height", heightForOwl + "px");

            var $owlItem = $owlWrapper.find('.owl-item');

            $owlItem.css("height", heightForOwl + "px");
            $owlItem.css("min-height", heightForOwl + "px");

            var $item = $owlItem.find('.item');

            $item.css("height", heightForOwl + "px");
            $item.css("min-height", heightForOwl + "px");
        });


        // Progress Icons // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $('.progress-icons').each(function () {
            var $this = $(this);
            var $total = $this.attr("data-total");
            var $icon = $this.attr("data-icon");
            var htmldata = "";

            $this.css("font-size", ($this.attr("data-font-size") + "px"));

            var i;
            for (i = 0; i < $total; i++) {
                htmldata += '<i class="fa ' + $icon + '"></i> ';
            }

            $this.html(htmldata);

            if (($().appear) && ($("body").hasClass("cssAnimate"))) {
                $('.progress-icons').appear(function () {
                    var $this = $(this);
                    var $active = $this.attr("data-active");
                    var $icons = $this.find('i:lt(' + $active + ')');
                    var $delay = parseInt(validatedata($this.attr("data-delay"), 20), 10)

                    var delay = $delay;
                    for (i = 0; i < $icons.length; i++) {
                        setTimeout((function (i) {
                            return function () {
                                i.style.color = $this.attr("data-icon-color");
                            }
                        })($icons[i]), delay);
                        delay += $delay;
                    }
                }, {accY: -100});
            } else {
                $this.each(function () {
                    var $active = $this.attr("data-active");
                    var $icons = $this.find('i:lt(' + $active + ')');
                    $icons.css('color', $this.attr("data-icon-color"))
                });
            }
        })







    })
    var isTransparent = false;

    if($bodyel.hasClass("ct-navbar--transparent")){
        isTransparent = true;
    }

    $(window).on("scroll", function() {
        var scroll = $(window).scrollTop();
        var $bodyColor = $bodyel.css("background-color");

        if (scroll > 200) {
            jQuery('nav.navbar').addClass('navbar-makeSmaller');
            if(isTransparent){
                //$bodyel.removeClass("ct-navbar--transparent");

                $(".ct-navbar--transparent nav").css("background-color", $bodyColor);
            }

            if($bodyel.hasClass("ct-navbar-fixed-top")){
                $bodyel.find("nav").css("top", "0");
            }
        } else {
            jQuery('nav.navbar').removeClass('navbar-makeSmaller');
            if(isTransparent){
                $(".ct-navbar--transparent nav").css("background-color", "transparent");
            }
        }
    });


    //MAGNIFIC POPUP

    $.fn.magnificinfinitescroll = function(options) {
        if(jQuery().magnificPopup){
            jQuery('.ct-js-magnificPortfolioPopupGroup').each(function() { // the containers for all your galleries
                jQuery(this).magnificPopup({

                    type: 'ajax',
                    delegate: '.ct-js-magnificPortfolioPopup',
                    //mainClass: 'ct-magnificPopup-bottomArrows',
                    fixedContentPos: false,
                    closeBtnInside: true,
                    closeOnContentClick: false,
                    closeOnBgClick: true,
                    gallery: {
                        enabled: false
                    },
                    callbacks: {
                        ajaxContentAdded: function() {
                            var $container = $('.ct-slider-afterANDbefore');

                            imagesLoaded( $container, function() {
                                $container.twentytwenty();
                            });
                        }
                    }
                });
            });

            $('.ct-js-magnificPopupMedia').magnificPopup({
                //disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: true,

                fixedContentPos: false
            });
            $('.ct-js-magnificPopupImage').magnificPopup({
                //disableOn: 700,
                type: 'image',
                mainClass: 'ct-magnificPopup--image',
                removalDelay: 160,
                preloader: true,

                fixedContentPos: false,
                gallery:{
                    enabled: true
                }
            });
        }
    };
    $(window).on("load", function(){

        $('.ct-gallery').magnificinfinitescroll();


        /* ==================== */
        /* ==== PIE CHARTS ==== */


        $('.ct-js-pieChart').each(function () {
            var $this = $(this);
            var $color = validatedata($(this).attr('data-ct-firstColor'), "#2b8be9");
            var $color2 = validatedata($(this).attr('data-ct-secondColor'), "#eeeeee");
            var $cutout = validatedata($(this).attr('data-ct-middleSpace'), 90);
            var $stroke = validatedata($(this).attr('data-ct-showStroke'), false);
            var $margin = validatedata($(this).attr('data-ct-margin'), false);
            $(this).parent().css('margin-left',$margin + 'px');
            $(this).parent().css('margin-right',$margin + 'px');
            var options = {
                responsive: true, percentageInnerCutout: $cutout, segmentShowStroke: $stroke, showTooltips: false
            }
            var doughnutData = [{
                value: parseInt($this.attr('data-ct-percentage'), 10), color: $color, label: false
            }, {
                value: parseInt(100 - $this.attr('data-ct-percentage'), 10), color: $color2
            }];

            if (($().appear) && ($("body").hasClass("cssAnimate"))) {
                $('.ct-js-pieChart').appear(function () {
                    var ctx = $this[0].getContext("2d");
                    window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, options);
                });
            } else {
                var ctx = $this[0].getContext("2d");
                window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, options);
            }
        })



        //============================== Portfolio ======================================

        if ($().isotope && ($('.ct-gallery').length > 0)) {

            var $container = $('.ct-gallery'), // object that will keep track of options
                isotopeOptions = {}, // defaults, used if not explicitly set in hash
                defaultOptions = {
                    filter: '*', itemSelector: '.ct-gallery-item', // set columnWidth to a percentage of container width
                    masonry: {
                    }
                };

            $container.imagesLoaded().progress(function (instance, image) {
                if (!image.isLoaded) {
                    return;
                }

                var p = $(image.img).closest('.hidden');
                p.removeClass('hidden');
                $container.addClass('is-loaded')

                // set up Isotope
                $container.each(function () {
                    $(this).isotope(defaultOptions);
                });

                $container.isotope('layout');
            }).always(function (instance) {
                if($().infinitescroll){
                    $container.infinitescroll({
                        loading: {
                            finished: undefined,
                            //img: "data:image/gif;base64,R0lGODlhHgAeAJEDAP///5mZmU1NTQAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkNTZiNzRiZC1lOTVmLTIyNDUtYmNhMS00Y2M2YjdlOTNlZmYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkE1QTAxRUJGNDhBMTFFMkFGNTNBNDUzMDREQkY3QjUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkE1QTAxRUFGNDhBMTFFMkFGNTNBNDUzMDREQkY3QjUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjgwYzk2NDRjLWJhYTktNGQ0Yy1hYTc2LTk3NjY0MGI5ZjUwYyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpkNTZiNzRiZC1lOTVmLTIyNDUtYmNhMS00Y2M2YjdlOTNlZmYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQFCgADACwAAAAAHgAeAAACa4Rvo8LNOpxDCMpmr6AnXy9xyaKBk2hi5CUC6bOGaOy82xyVtAr1/g8MCofEojGATCKNuYtSydQInsmohro0SrEBqxPrlXDDjrFWx0yr1+yg1GZ772BNqQQ+t+Prdp6c3yewF3iXF4f2J1UAACH5BAUKAAMALAAAAAATABMAAAIzjG+jwM2I1HAOHkmbTSuDHWAeKGZkZ24lJbXuC8fy7Ar2bdM4ru/57PvJgoKez7hD8mYFACH5BAUKAAMALAAAAAAeAAgAAAIrlG+jwc06gJwSIegcpNQenD0KN3nJEgYbCZgCGK6kC2cyR6PxyOZDquKRCgAh+QQFCgADACwLAAAAEwATAAACM5Rvo8HNiNRwDh5Jm00rhy1gHihmZGduJSW17gvH8ky7wI3fdJ7vvD77AWVCgO935CVzBQAh+QQFCgADACwWAAAACAAeAAACHZSPqcvtPaKctMqAs968+w9+1kgC5omm6sq2blsAACH5BAUKAAMALAsACwATABMAAAI3nI8jy5vf2kuRTVTdNVlsnn1K+HXiiaYTwLbsEcRy7LrwLNftjQf6a+jRfjzcD1CcHZM5YlBYAAAh+QQFCgADACwAABYAHgAIAAACK4Rvo8HNOoScEiHoHKTUHpw9Cjd5yRIGGymYABiupAtnMkej8cjmQ6rikQoAIfkEBQoAAwAsAAALABMAEwAAAjeEb6PLg9jiO7HNVNcFWd+ubKDzjeaJpkrAtuwixHLsuvAs1+2NC/qr6NF+PNwvUJwdkzliUFgAADs=",
                            finishedMsg: "<div class='gallerymessage'>No more images</div>",
                            msg: null,
                            msgText: "<div class='gallerymessage'>Loading</div>",
                            selector: null,
                            speed: 'fast',
                            start: undefined
                        },
                        navSelector: ".wp-pagenavi",
                        nextSelector: ".nextpostslink",
                        itemSelector: ".ct-gallery-item",
                        extraScrollPx: 0,
                        prefill: true
                    }, function( newElements ) {
                        $container.imagesLoaded(function(){
                            $(newElements).removeClass('hidden');
                            $container.isotope('appended', $(newElements));
                        });
                    });
                }
            });

            $('.ct-gallery-filters a').on("click", function () {
                $('.ct-gallery-filters .active').removeClass('active');
                $(this).addClass('active');

                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter: selector, animationOptions: {
                        duration: 750, easing: 'linear', queue: false
                    }
                });
                return false;
            });
        }

    });

}(jQuery));


