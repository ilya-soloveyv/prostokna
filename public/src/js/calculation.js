if ($('.calculation').length) {

	// $('.calc__list li').on('click', function () {		
	// 	$(this)
	// 		.addClass('active').siblings().removeClass('active')
	// 		.closest('.calculation').find('.calc-content').removeClass('active')
	// 		.eq($(this).index()).addClass('active');		
		
	// });
	if ($(window).width() >= '992') {
		$('.calc-content').hover(
			function () {

				$(this).closest('.calculation').find('.calc__item').removeClass('active')
					.eq($(this).index()).addClass('active');
			},
			function () {
				$(this).closest('.calculation').find('.calc__item').removeClass('active');
			});
	}	

	var calc = $('.calc__list li'),
			contents = $('.calc-content');	
	

	$('.calc-form__input').keyup(function (){
		$(this).siblings('.calc-form__label').css('transform', 'translateY(-150%)');
	});

	$('.calc-form__text').keyup(function (){
		$(this).siblings('.calc-form__label').css('transform', 'translateY(-150%)');
	});
	

	if ($(window).width() <= '992') {

		$('.calc__list li:first-child').addClass('active');

		$('.calc__list li').on('click', function () {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.calculation').find('.calc-content').removeClass('active')
				.eq($(this).index()).addClass('active');

		});

		$('.calc-wrapp').swipe({
			swipeLeft: leftSwipe,
			swipeRight: rightSwipe,
			threshold: 75
		});

		function leftSwipe(event) {

			if ($(calc[0]).hasClass('active')) {
				$(calc[0]).removeClass('active');
				$(calc[1]).addClass('active');

				$(contents[0]).removeClass('active');
				$(contents[1]).addClass('active');
			} else if ($(calc[1]).hasClass('active')) {
				$(calc[1]).removeClass('active');
				$(calc[2]).addClass('active');

				$(contents[1]).removeClass('active');
				$(contents[2]).addClass('active');
			} else if ($(calc[2]).hasClass('active')) {
				$(calc[2]).removeClass('active');
				$(calc[0]).addClass('active');

				$(contents[2]).removeClass('active');
				$(contents[0]).addClass('active');
			}
		}

		function rightSwipe(event) {			

			if ($(calc[2]).hasClass('active')) {
				$(calc[2]).removeClass('active');
				$(calc[1]).addClass('active');

				$(contents[2]).removeClass('active');
				$(contents[1]).addClass('active');
			} else if ($(calc[1]).hasClass('active')) {
				$(calc[1]).removeClass('active');
				$(calc[0]).addClass('active');

				$(contents[1]).removeClass('active');
				$(contents[0]).addClass('active');
			} else if ($(calc[0]).hasClass('active')) {
				$(calc[0]).removeClass('active');
				$(calc[2]).addClass('active');

				$(contents[0]).removeClass('active');
				$(contents[2]).addClass('active');
			}
		}
	}

	$('.calc-form__btn').on('click', function(e) {
		// e.preventDefault();
	});
	const uploadButton = document.querySelector('.browse-btn');
	const fileInfo = document.querySelector('.file-info');
	const realInput = document.getElementById('image');

	uploadButton.addEventListener('click', (e) => {
		e.preventDefault();
		realInput.click();
	});

	realInput.addEventListener('change', () => {
		const name = realInput.value.split(/\\|\//).pop();
		const truncated = name.length > 20
			? name.substr(name.length - 20)
			: name;

		fileInfo.innerHTML = truncated;
		fileInfo.style.color = "#fff";
		fileInfo.style.top = "9px";
	});
}