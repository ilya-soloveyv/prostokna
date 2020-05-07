if (document.querySelector('.layout-index')) {
    if (clientWidth() < 800) {
        $('.s1-items').slick({
            infinite: false,
            dots: true,
            appendDots: '.s1-dots',
            arrows: false,
            asNavFor: '.s1-slider-imgs',
        })
    }

	$('.s1-slider-imgs').slick({
        infinite: false,
		arrows: false,
        fade: true,
        swipe: false,
        responsive: [
			{
				breakpoint: 800,
				settings: {
                    asNavFor: '.s1-items',
                    swipe: true
				}
			}
		]
    })
    
    $('.s1-items').on('mouseenter', 'li', function (e) {
        let $currTarget = $(e.currentTarget);
        let index = $currTarget.data('slick-index') || $currTarget.index();
        let slickObj = $('.s1-slider-imgs').slick('getSlick');

        $('.s1-items a').removeClass('isActive')
        $currTarget.find('a').addClass('isActive')
        
        slickObj.slickGoTo(index);
        
    });
}
