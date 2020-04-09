if (document.querySelector('.layout-index')) {
    if (clientWidth() < 800) {
        $('.s1 .s1-items').slick({
            dots: true,
            appendDots: '.s1-dots',

            speed: 500,
            fade: true,
            cssEase: 'linear',
            arrows: false,
        });
    
        $('.s1 .s1-items').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            let activeLink = document.querySelectorAll('.s1-items .slick-slide')[nextSlide].querySelector('a')

            toggleImg(activeLink)
        })
    } else {
        s1CreateEventsForLinks()
    }
    
    toggleImg(document.querySelector('.s1-items .isActive'))
}
