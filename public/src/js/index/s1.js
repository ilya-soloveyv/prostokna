if (screen.width < 800) {
    $('.s1 .slick').slick({
        dots: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        arrows: false,
    });

    $('.s1 .slick').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        let imgUrl = `url(${$('.s1 .slick-active > a').data().img})`;

        $(".s1 .bg-image").stop().animate({opacity: 0},300,function(){
            $(this).css({'background-image': imgUrl})
                       .animate({opacity: 0.5},{duration:300});
         });
    });
} else {
    $('.s1 .items a').hover(function() {
        if ($( this ).hasClass('is-hovered')) {
            return;
        }
        $('.s1 .items a').removeClass('is-hovered');
        $( this ).addClass('is-hovered');

        let imgUrl = `url(${$( this ).data().img})`;

        $(".s1 .bg-image").stop().animate({opacity: 0},300,function(){
            $(this).css({'background-image': imgUrl})
                       .animate({opacity: 0.5},{duration:300});
         });
    });
}

