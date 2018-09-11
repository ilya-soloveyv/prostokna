function fullpage_welcome_color(i) {
    if (i == 1 || i == 3 || i == 8) {
        var fullpage_color_class = "white";
    } else {
        var fullpage_color_class = "black";
    }
    $("#fullpage_nav").removeClass("white").removeClass("black").addClass(fullpage_color_class);
    if ($(window).width() > 1200) {
        $("#fullpage_nav .lineprogress .line")
            .stop()
            .animate({width: '100%', height:(100/($("#fullpage_nav li").length)*i)+"%"}, 750);
    }
    else {
        $("#fullpage_nav .lineprogress .line")
            .stop()
            .animate({height: '100%', width:(100/($("#fullpage_nav li").length)*i)+"%"}, 750);
    }
}

$('#fullpage_welcome').fullpage({
    anchors: ['s1','s2','s3','s4','s5','s6','s7','s8','s9'],
    scrollingSpeed: 700,
    normalScrollElements: '#top, #fullpage_nav',
    onLeave: function (origin, destination, direction) {
        fullpage_welcome_color(destination);
        $("#fullpage_nav li").removeClass('active');
        $("#fullpage_nav li").eq(destination-1).addClass('active');
    },
    afterLoad: function (origin, destination, direction) {
        fullpage_welcome_color(destination);
    },
    afterResize: function () {
        var ww = $(window).width();
        console.log(ww);
    }
});

$("#fullpage_nav li").click(function(){
    var i = $(this).index();
    $.fn.fullpage.moveTo(i+1);
});

$('.owl-carousel').owlCarousel({
    loop:true,
    nav:false,
    items:1
})

$(document).on('click', '#fullpage_welcome .section.s5 .empty .down .c .button a', function(){
    $('#fullpage_welcome .section.s5 .empty, #fullpage_welcome .section.s5 .sravnenie').toggle();
    return false;
}).on('click', '#fullpage_welcome .section.s5 .sravnenie table thead tr th .r .remove i', function(){
    $('#fullpage_welcome .section.s5 .empty, #fullpage_welcome .section.s5 .sravnenie').toggle();
    return false;
})

$(document).on('click', '#fullpage_welcome .section.s5 .sravnenie table thead tr th:first-child img', function(){
    $("#fullpage_welcome .section.s5 .sravnenie table thead tr th:first-child img").removeClass('active')
    $(this).addClass('active')
})
$(document).on('click', '#fullpage_welcome .section.s5 .sravnenie table tfoot tr th:first-child a.linkmore', function(){
    $(this).toggleClass('active')
    if ($(this).hasClass('active')) {
        // console.log(1);
        $('#fullpage_welcome .section.s5 .sravnenie table tbody tr.basic').hide();
        $('#fullpage_welcome .section.s5 .sravnenie table tbody tr.more').show();
    } else {
        $('#fullpage_welcome .section.s5 .sravnenie table tbody tr.basic').show();
        $('#fullpage_welcome .section.s5 .sravnenie table tbody tr.more').hide();
    }
    return false
}).on('click', '#fullpage_welcome .section.s5 .sravnenie table tfoot tr th a.linkoriginal', function(){
    $(this).toggleClass('active')
    return false
})