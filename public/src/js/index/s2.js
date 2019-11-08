var s2_speed = 250
$(document).on("mouseenter", "#fullpage_welcome .section.s2 ul.level1 li.level1", function(){
    s2_menu_open(this)
}).on("click", "#fullpage_welcome .section.s2 ul.level1 li.level1 .front", function(){
    s2_menu_open($(this).parents('li.level1'))
}).on("mouseleave", "#fullpage_welcome .section.s2 ul.level1 li.level1", function(){
    s2_menu_close(this)
}).on("click", "#fullpage_welcome .section.s2 ul.level1 li.level1 i.material-icons.material-icons-clear", function(){
    s2_menu_close($(this).parent().parent())
}).on("click", "#fullpage_welcome .section.s2 ul.level1 li.level1 i.material-icons.material-icons-arrow_left", function(){
    $(this).parent().find('.list').animate({left: 0}, s2_speed)
    $(this).parents('.back').find('i.material-icons.material-icons-arrow_left').animate({left: "100%"}, s2_speed, function () {
        $("#fullpage_welcome .section.s2 ul.level1 li.level1 ul li ul").hide()
    })    
}).on("click", "#fullpage_welcome .section.s2 ul.level1 li.level1 ul li a.disabled", function(){
    $('#modal_development').modal()
    return false;
}).on("click", "#fullpage_welcome .section.s2 ul.level1 li.level1 ul li a.more", function(){
    $(this).next().show()
    $(this).parents('.list').animate({left: "-=100%"}, s2_speed)
    $(this).parents('.back').find('i.material-icons.material-icons-arrow_left').animate({left: "14px"}, s2_speed)
    return false;
})

function s2_menu_open(_this) {
    $(_this).css({"z-index": 2});
    var front = $(_this).find('.front')
    var back = $(_this).find('.back')
    if ($(window).width() < 800) {
        $("#fullpage_welcome .section.s2 ul.level1 li.level1").css({position: 'static'});
        front.css({left: "-100%"})
        back.css({left: 0})
    } else {
        front.stop().animate({left: "-100%"}, s2_speed)
        back.stop().animate({left: 0}, s2_speed)
    }
}

function s2_menu_close(_this) {
    $('#fullpage_welcome .section.s2 ul.level1 li.level1 .list').css({left: 0})
    $('#fullpage_welcome .section.s2 ul.level1 li.level1 ul li ul').hide();
    $('#fullpage_welcome .section.s2 ul.level1 li.level1 i.material-icons.material-icons-arrow_left').css({left: '100%'});

    $(_this).css({"z-index": 1});
    var front = $(_this).find('.front')
    var back = $(_this).find('.back')
    if ($(window).width() < 800) {
        $("#fullpage_welcome .section.s2 ul.level1 li.level1").css({position: 'relative'});
        front.css({left: 0})
        back.css({left: "100%"})
    } else {
        front.stop().animate({left: 0}, s2_speed)
        back.stop().animate({left: "100%"}, s2_speed)
    }    
}

// }).on("click", "#fullpage_welcome .section.s2 ul li .i i", function(){
//     $(this).parents('li').removeClass('active');
// })