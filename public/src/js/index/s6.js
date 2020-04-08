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
<<<<<<< HEAD
=======

	if (clientWidth() < 800) {
		const dropup = document.querySelector('.s6-dropup')

		dropup.addEventListener('click', event => {
			let target = event.currentTarget
			let sliderWrap = document.querySelector('.s6-slider-wrap')

			sliderWrap.classList.toggle('isOpen')
		})
	}
>>>>>>> 75b0d8e1c69a8cfab3f12bc9681ffbac8ae7cb90
}