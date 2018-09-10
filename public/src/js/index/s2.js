$(document).on("mouseenter", "#fullpage_welcome .section.s2 ul li", function(){
    if (!$(this).hasClass('active')) {
        $(this).addClass('active');
    }
}).on("mouseleave", "#fullpage_welcome .section.s2 ul li", function(){
    $(this).removeClass('active');
}).on("click", "#fullpage_welcome .section.s2 ul li .i i", function(){
    $(this).parents('li').removeClass('active');
})