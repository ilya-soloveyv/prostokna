if (document.querySelector('.layout-index')) {
	if (clientWidth() < 800) {
		const dropup = document.querySelector('.s6-dropup')

		dropup.addEventListener('click', event => {
			let target = event.currentTarget
			let sliderWrap = document.querySelector('.s6-slider-wrap')

			sliderWrap.classList.toggle('isOpen')
		})
	} else {
		$('.s6-slider-windows').on('init', function(event, slick){
			let $progressBar = $('.s6-progress-bar div')
			let step = 100 / slick.slideCount
			let widthNum = step * (slick.currentSlide + 1)
			$progressBar.css('width', widthNum + '%')
		});
		
		$('.s6-slider-windows').on('beforeChange', function(event, slick, currentSlide, nextSlide){
			let $progressBar = $('.s6-progress-bar div')
			let step = 100 / slick.slideCount
			let widthNum = step * (nextSlide + 1)
			$progressBar.css('width', widthNum + '%')
		});
	}
	
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