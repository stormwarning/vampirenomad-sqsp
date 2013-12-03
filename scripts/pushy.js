/**! Pushy - v0.9.1 - 2013-9-16
 * Pushy is a responsive off-canvas navigation menu using CSS transforms & transitions.
 * https://github.com/christophery/pushy/
 * by Christopher Yee 
 */

$(function() {
    var body = $('body'),
        pushy = $('.pushy'),                        //menu css class
        container = $('.layout'),                   //container css class
        push = $('.js-push'),                       //css class to add pushy capability
        siteOverlay = $('.pushy-overlay'),          //site overlay
        menuBtn = $('.pushy-trigger, .pushy a'),    //css classes to toggle the menu
        
        pushyClass = "pushy--open",                 //menu open class
        pushyActiveClass = "pushy--is-active",      //css class to toggle site overlay
        containerClass = "is-pushed",               //container open class
        pushClass = "is-pushed",                    //css class to add pushy capability
        
        menuSpeed = 200,                            //jQuery fallback menu speed
        menuWidth = pushy.width() + "px";           //jQuery fallback menu width

    function togglePushy(){
        body.toggleClass(pushyActiveClass); //toggle site overlay
        pushy.toggleClass(pushyClass);
        container.toggleClass(containerClass);
        push.toggleClass(pushClass); //css class to add pushy capability
    }

    function openPushyFallback(){
        body.addClass(pushyActiveClass);
        pushy.animate({left: "0px"}, menuSpeed);
        container.animate({left: menuWidth}, menuSpeed);
        push.animate({left: menuWidth}, menuSpeed); //css class to add pushy capability
    }

    function closePushyFallback(){
        body.removeClass(pushyActiveClass);
        pushy.animate({left: "-" + menuWidth}, menuSpeed);
        container.animate({left: "0px"}, menuSpeed);
        push.animate({left: "0px"}, menuSpeed); //css class to add pushy capability
    }

    if(Modernizr.csstransforms3d){
        //toggle menu
        menuBtn.click(function() {
            togglePushy();
        });
        //close menu when clicking site overlay
        siteOverlay.click(function(){ 
            togglePushy();
        });
    }else{
        //jQuery fallback
        pushy.css({left: "-" + menuWidth}); //hide menu by default
        container.css({"overflow-x": "hidden"}); //fixes IE scrollbar issue

        //keep track of menu state (open/close)
        var state = true;

        //toggle menu
        menuBtn.click(function() {
            if (state) {
                openPushyFallback();
                state = false;
            } else {
                closePushyFallback();
                state = true;
            }
        });

        //close menu when clicking site overlay
        siteOverlay.click(function(){ 
            if (state) {
                openPushyFallback();
                state = false;
            } else {
                closePushyFallback();
                state = true;
            }
        });
    }
});