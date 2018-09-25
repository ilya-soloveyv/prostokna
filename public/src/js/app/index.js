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
    }
});

$("#fullpage_nav li").click(function(){
    var i = $(this).index();
    $.fn.fullpage.moveTo(i+1);
});