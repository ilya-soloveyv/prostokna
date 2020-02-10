if (screen.width < 800) {
    s1Slider();

    window.addEventListener('orientationchange', s1Slider())
}

function s1Slider() {
    $('.s1 .slick').slick({
        dots: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        arrows: false,
    });
}