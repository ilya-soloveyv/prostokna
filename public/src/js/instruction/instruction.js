if ($('.instruction').length) {

	// Tabs script

	$('.instruction__tabs .instruction__tabs_content').on('click', function () {
		$('.instruction__wrapp.active .num .num__item').removeClass('none').removeClass('active')
		$('.instruction__wrapp.active .acc__wrap .acc__content').slideUp()
		instructionPointOpenDescReset()
		$(this).addClass('active').siblings().removeClass('active').closest('.instruction').find('.instruction__wrapp').removeClass('active').eq($(this).index()).addClass('active');
	});

	// Accordion script

	$(document).on("click", ".instruction__accor .acc__wrap", function (){
		var index = $(this).index()
		instructionPointOpenDesc(index)
	}).on("click", ".instruction__wrapp .num .num__item", function () {
		var index = $(this).index()
		instructionPointOpenDesc(index)
	})


	function instructionPointOpenDescReset () {
		$('.part').removeClass('active')
		$('.op1').removeClass('active')
		$('.dn1').removeClass('active')
		$('.dn12').removeClass('active')
		$('.dc1').removeClass('color')
		$('.button-list').removeClass('disable');

		$('.dc2').removeClass('color')
		$('.dn2').removeClass('active')

		$('.line3').removeClass('color')
		$('.part3').removeClass('op3')
		$('#center').removeClass('op3')
		$('.line').removeClass('op3')
		$('.under').removeClass('op3')

		$('.line4').removeClass('db4');
		$('.part4').removeClass('op3');
		$('.block3').removeClass('op3');
		$('#center').removeClass('op3');
		$('.line').removeClass('op3');
		$('.under').removeClass('op3');
		$('#max-down').removeClass('op3');

		$('.line5').removeClass('db4');
		$('.part').removeClass('op3');
		$('#center').removeClass('op3');
		$('.line').removeClass('op3');
		$('.under').removeClass('op3');
		$('#max-down').removeClass('op3');
		$('.part5').removeClass('stroke');

		$('#balcony-top').removeClass('show');
		$('#balcony-center').removeClass('op3');
		$('#balcony-window').removeClass('op3');
		$('.b-line2').removeClass('none');
		$('.door').removeClass('op3');
		$('.top-line').removeClass('show');

		$('.b-line2').removeClass('color');
		$('#balcony-center').removeClass('op3');
		$('#balcony-window').removeClass('op3');

		$('#balcony-right').removeClass('show');
		$('#balcony-center').removeClass('op3');
		$('#balcony-window').removeClass('op3');
		$('.b-line2').removeClass('none');
		$('.door').removeClass('op3');
		$('.right-line').removeClass('show');

		$('.rain').removeClass('active');
		$('.dashdot').removeClass('active');

		
		$('.instruction__wrapp.active .text .text__item').removeClass('active')

		

	}
	function instructionPointOpenDesc (index) {
		instructionPointOpenDescReset()
		
		$('.instruction__wrapp.active .acc__content').not(":eq(" + index + ")").slideUp()
		$('.instruction__wrapp.active .acc__wrap').eq(index).find('.acc__content').slideToggle()

		

		if (!$('.instruction__wrapp.active .num .num__item').eq(index).hasClass('active')) {
			if (index == 0) {
				$.each($('.part'), function(i, el) {
					setTimeout(function() {
						$(el).toggleClass("active");
					}, 100 + (i * 150));
				});  
				$('.op1').addClass('active')
				$('.dn1').addClass('active')
				$('.dn12').addClass('active')
				$('.dc1').addClass('color')
				if ($(window).width() > 992) {
					$('.button-list').addClass('disable');
				}
				// b
				$('#balcony-top').addClass('show');
				$('#balcony-center').addClass('op3');
				$('#balcony-window').addClass('op3');
				$('.b-line2').addClass('none');
				$('.door').addClass('op3');
				$('.top-line').addClass('show');
			} else if (index == 1) {
				$.each($('.part'), function(i, el) {
					setTimeout(function() {
						$(el).toggleClass("active");
					}, 100 + (i * 100));
				});  
				$('.op1').addClass('active')
				$('.dn12').addClass('active')
				$('.dn2').addClass('active')
				$('.dc2').addClass('color')
				if ($(window).width() > 992) {
					$('.button-list').addClass('disable');
				}
				// b
				$('.b-line2').addClass('color');
				$('#balcony-center').addClass('op3');
				$('#balcony-window').addClass('op3');		
			} else if (index == 2) {
				$('.line3').addClass('color')
				$('.part3').addClass('op3')
				$('#center').addClass('op3')
				$('.line').addClass('op3')
				$('.under').addClass('op3')
				if ($(window).width() > 992) {
					$('.button-list').addClass('disable');
				}
				// b
				$('#balcony-right').addClass('show');
				$('#balcony-center').addClass('op3');
				$('#balcony-window').addClass('op3');
				$('.b-line2').addClass('none');
				$('.door').addClass('op3');
				$('.right-line').addClass('show');
			} else if (index == 3) {
				$('.line4').addClass('db4');
				$('.part4').addClass('op3');
				$('.block3').addClass('op3');
				$('#center').addClass('op3');
				$('.line').addClass('op3');
				$('.under').addClass('op3');
				$('#max-down').addClass('op3');
				if ($(window).width() > 992) {
					$('.button-list').addClass('disable');
				}
			} else if (index == 4) {
				$('.line5').addClass('db4');
				$('.part').addClass('op3');
				$('#center').addClass('op3');
				$('.line').addClass('op3');
				$('.under').addClass('op3');
				$('#max-down').addClass('op3');
				$('.part5').addClass('stroke');
				if ($(window).width() > 992) {
					$('.button-list').addClass('disable');
				}
			} else if (index == 5) {
				$('#max-down').addClass('op3');
				$('.block3').addClass('op3');
				$('.part3').addClass('op3')
				$('#center').addClass('op3')
				$('.line').addClass('op3')
				$('.under').addClass('op3')
				$('.rain').addClass('active');
				$('.dashdot').addClass('active');
				$('.dn1').addClass('active')
				$('.dn2').addClass('active')
				if ($(window).width() > 992) {
					$('.button-list').addClass('disable');
				}
			}

			$('.instruction__wrapp.active .num .num__item').eq(index).removeClass('none').addClass('active').siblings().removeClass('active').addClass('none')
			$('.instruction__wrapp.active .text .text__item').eq(index).addClass('active').siblings().removeClass('active')
		} else {
			$('.instruction__wrapp.active .num .num__item').removeClass('none').removeClass('active')
			$('.instruction__wrapp.active .text .text__item').removeClass('active')
			$('.instruction__wrapp.active .acc__wrap .acc__content').slideUp()
		}
	}


	$("a.go_to").click(function (e) {
		e.preventDefault();
		var id = $(this).attr('href'),
			top = $(id).offset().top;

		$('body,html').animate({ scrollTop: top }, 1500);
	});
	
	// Description more script

	$('.instruction__wrapp .instruction__btn').on('click',function(){
		$(this).toggleClass('active');
		$('.instruction__wrapp.active .instruction__more').slideToggle();
	});

	// Кнопки примеров шаблона
	if ($(window).width() > 993) {
		$('.button-show').hover(hoverIn, hoverOut);
		$('.button-download').hover(hoverIn, hoverOut);
	}
	
	if ($(window).width() < 992) {
		$('.button-show').find('span.active').text('Смотреть пример');
		$('.button-download').find('span.active').text('Cкачать шаблон');
	}

	window.onresize = function(event) {
		if ($(window).width() > 993) {
			$('.button-show').hover(hoverIn, hoverOut);
			$('.button-download').hover(hoverIn, hoverOut);
		}
		if ($(window).width() < 992) {
			$('.button-show').find('span.active').text('Смотреть пример');
			$('.button-download').find('span.active').text('Cкачать шаблон');
		} else {
			$('.button-show').find('span.active').text('Пример');
			$('.button-download').find('span.active').text('Шаблон');
		}
	};

	function hoverIn() {		
		$(this).find('span.active').removeClass('active').siblings().addClass('active');
	}
	function hoverOut() {		
		$(this).find('span.active').removeClass('active').siblings().addClass('active');
	}
}