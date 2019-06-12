if ($('#accessories').length) {

	// MENU

	$('.menu').on('click', function(){
		$('.menu .hamburger.hamburger--collapse').toggleClass('is-active');
		$(this).toggleClass('active');
		$('.content').toggleClass('blur');
		$('.menu-overlay').fadeToggle(300);
		$.each($('.menu-list li'), function(i, el) {
			setTimeout(function() {
				$(el).toggleClass('active');
			}, (i * 150));
		});		
	});

	// SELECT

	$('.select__list').on('click', function(){
		$(this).find('li:not(.active)').slideToggle(300);
		// $('.select li:not(.active)').slideToggle(300);	
		$(this).toggleClass('active');		
	});

	$('.select__item').on('click', function(){
		var opText = $(this).closest('.select__list').find('.select__item:first-child').text();	
		var opData = $(this).closest('.select__list').find('.select__item:first-child').attr('data-option');
		// var opText = $('.select__item:first-child').text();
		// var opData = $('.select__item:first-child').attr('data-option');	 	
		var text = $(this).text();		 	
		var data = $(this).attr('data-option');	

		$(this).closest('.select__list').find('.select__item:first-child').text(text).attr('data-option', data);
		// $('.select__item:first-child').text(text).attr('data-option', data);
		$(this).text(opText).attr('data-option', opData);
	});

	// COLORS

	$('.colors__item').on('click', function () {		
		$(this).addClass('active').siblings().removeClass('active');
	});

	// Carousell
	function setActive(index) {
		$('.circle li.i1').removeClass('i1')
		$('.circle li.i2').removeClass('i2')
		$('.circle li.i3').removeClass('i3')
		$('.circle li.i4').removeClass('i4')
		$('.circle li.i5').removeClass('i5')
		$('.circle li.active').removeClass('active')
		$('.circle li').eq(index).addClass('i3')
		$('.circle li').eq(index).addClass('active')
		var next = $('.circle li').eq(index).next('.item')
		var prev = $('.circle li').eq(index).prev('.item')
		if ($(next).length) {
			$(next).addClass('i4')
			$(next).next('.item').addClass('i5')
			if (!$(next).next('.item').length) {
				$('.circle li').filter(':first').addClass('i5')
			}
		} else {
			$('.circle li').filter(':first').addClass('i4').next('.item').addClass('i5')
		}

		if ($(prev).length) {
			$(prev).addClass('i2')
			$(prev).prev('.item').addClass('i1')
			if (!$(prev).prev('.item').length) {
				$('.circle li').filter(':last').addClass('i1')
			}
		} else {
			$('.circle li').filter(':last').addClass('i2').prev('.item').addClass('i1')
		}
	}	

	$(document).on("click", ".circle li", function () {
		if (!$(this).hasClass('i1') && !$(this).hasClass('i5')) {
			var index = $(this).index()
			setActive(index)
		} else if ($(this).hasClass('i1')) {
			$('.circle li.i2').trigger('click');
			setTimeout(function () {
				$('.circle li.i2').trigger('click');
			}, 250);						
		} else if ($(this).hasClass('i5')) {
			$('.circle li.i4').trigger('click');
			setTimeout(function () {
				$('.circle li.i4').trigger('click');
			}, 250);
		}
		
	})


	
	

	// Hover item circle

	$('.circle .item').hover(
		function () {
			$(this).find('.item__desc').css({ 'opacity': '1' });
			if ($(this).hasClass('active')) {
				$(this).find('.item__desc').css({ 'opacity': '1' });
			} else {
				$('.circle .item.active').find('.item__desc').css({ 'opacity': '0' });
			}
		}, function () {
			if ($(this).hasClass('active')) {
				$(this).find('.item__desc').css({ 'opacity': '1' });
			} else {
				$(this).find('.item__desc').css({ 'opacity': '0' });
				$('.circle .item.active').find('.item__desc').css({ 'opacity': '1' });
			}			
		}
	);
}