$(document).ready(function () {
  $('.btn-desc').click(function () { 
    $('.pop-up').fadeIn();    
  });
  $('.pop-up_close').click(function () { 
    $('.pop-up').fadeOut();    
  });

	if ($('#regulation_window').length) {
		let regSlider = $('.regulation_window-chekclist');

		regSlider.owlCarousel({
			items: 3,
			loop: true,
			center: true,
			dots: false
		});
		regSlider.on('click', '.owl-item', function () {
			//получить индекс
			var click = $(this).index() + 1;
			//по клику листаем к слайду на который кликнули
			regSlider.trigger('to.owl.carousel', [click]);
			// Или добавляем свою функцию вместо листания
		});
	

		regSlider.on('changed.owl.carousel', function(){
			let active = $('.owl-item.active.center .regulation_window-checkitem'),
					activeIdx = active.attr('data-tab'),
				num = +activeIdx - 1,
				activeSld = $('.regulation_window-infolist .regulation_window-infoitem').eq(num),
					sld = $('.regulation_window-infolist .regulation_window-infoitem');
			console.log(num);
			sld.fadeOut(100);
			activeSld.fadeIn(300);
		});

		$('.regulation_window-infolist').swipe({
			swipeLeft: workLeftSwipe,
			swipeRight: workRightSwipe,
			threshold: 75
		});

		function workLeftSwipe (e) {
			regSlider.trigger('next.owl.carousel');
		}
		function workRightSwipe (e) {
			regSlider.trigger('prev.owl.carousel');
		}

	}
});