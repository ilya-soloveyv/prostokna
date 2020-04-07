if (document.querySelector('.layout-index')) {
	$('.s6-slider-imgs').slick({
		infinite: false,
		arrows: false,
		fade: true,
		asNavFor: '.s6-slider-windows',
	})

	$('.s6-slider-windows').slick({
		infinite: false,

		prevArrow: '.s6-slider-wrap .slick-prev',
		nextArrow: '.s6-slider-wrap .slick-next',

		dots: true,
		appendDots: '.s6-slider-wrap .slick-pagination',
		customPaging: function (slider, i) {
			return (i + 1) + ' / ' + slider.slideCount;
		},
		
		asNavFor: '.s6-slider-imgs',

		responsive: [
			{
				breakpoint: 800,
				settings: {
					arrows: false,
					fade: true
				}
			}
		]
	})
}