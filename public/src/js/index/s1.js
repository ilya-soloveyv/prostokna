if (screen.width < 800) {
    $('.s1 .slick').slick({
        dots: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        arrows: false,
    });
} else {
    $('.s1 .items a').hover(
        function() {
            $('.s1 .items a').removeClass('is-hovered');
            $( this ).addClass('is-hovered');
        }
    );
}

