$('document').ready(function () {
    var trigger = $('#hamburger'),
        topmenu = $("#top .l .menu"),
        isClosed = false;
    trigger.click(function () {
        burgerTime();
    });
    function burgerTime() {
        if (isClosed == true) {
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            topmenu.removeClass('opened');
            isClosed = false;
        } else {
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            topmenu.addClass('opened');
            isClosed = true;
        }
    }
});

$(document).on('mouseenter', '#fullpage_nav ul', function(){
    if ($(window).width() > 1200) {
        $(this).addClass('open');
    }    
}).on('mouseleave', '#fullpage_nav ul', function(){
    if ($(window).width() > 1200) {
        $(this).removeClass('open');
    }    
    
});