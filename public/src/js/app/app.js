// $('document').ready(function () {
//     var trigger = $('#hamburger'),
//         topmenu = $("#top .l .menu"),
//         isClosed = false;
//     trigger.click(function () {
//         burgerTime();
//     });
//     function burgerTime() {
//         if (isClosed == true) {
//             trigger.removeClass('is-open');
//             trigger.addClass('is-closed');
//             topmenu.removeClass('opened');
//             isClosed = false;
//         } else {
//             trigger.removeClass('is-closed');
//             trigger.addClass('is-open');
//             topmenu.addClass('opened');
//             isClosed = true;
//         }
//     }
// });

$(document).on("click", "#top .hamburger", function () {
    topmenu = $("#top .l .menu")
    if (!$(this).hasClass('is-active')) {
        $(this).addClass('is-active')
        topmenu.addClass('opened')
    } else {
        $(this).removeClass('is-active')
        topmenu.removeClass('opened')
    }
})
$(document).on('mouseenter', '#top .l .menu', function(){
    $("#top .hamburger").addClass('is-active')
    $(this).addClass('opened')
}).on('mouseleave', '#top .l .menu', function(){
    $("#top .hamburger").removeClass('is-active')
    $(this).removeClass('opened')
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
