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


$('.s2-secondary-card a.more').click(function() {
    $('.s2-secondary-card').removeClass('show');

    $( this ).closest('li').addClass('show');

    return false;
})

if (screen.width < 800) {
    $('.s2-secondary-list').slick();
    $('.s2-secondary-list').on('afterChange', function(event, slick, currentSlide, nextSlide) {
        $('.s2-secondary-card').removeClass('show');

        $('.slick-slide').removeClass('is-active show');

        $('.slick-active').addClass('is-active show');
    });


    $('.s2-menu').click(function() {
        $('.s2-secondary-list').removeClass('open');
        $('.s2-secondary-card').removeClass('show is-active');

        $('.s2-menu').removeClass('active');
    })

    $('.s2-primary-card').click(function() {
        $('.s2-secondary-list').addClass('open');

        $('.s2-menu').addClass('active');
        
        $('.s2-secondary-card').removeClass('is-active show');
        $('.s2-secondary-list > li').eq($(this).index()).addClass('is-active show');


        $('.s2-secondary-list').slick('slickGoTo', $(this).index());
    });
} else {
    $('.s2-primary-card').click(function(e) {
        if (e.target.classList.contains('card-close')) {
            return;
        }
        $('.s2-primary-card').removeClass('is-active').addClass('is-inactive');
        $( this ).removeClass('is-inactive').addClass('is-active');
    
        $('.s2-secondary-card').removeClass('is-active show');
        $('.s2-secondary-list > li').eq($(this).index()).addClass('is-active show');
    });

    $('.card-close').click(function() {
        $('.s2-primary-card').removeClass('is-active show is-inactive');
        $('.s2-secondary-card').removeClass('is-active show');
    })
}

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