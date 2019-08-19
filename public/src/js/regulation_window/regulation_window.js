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
		$('.owl-item').on('click', function() {
			var centerSlide = $('.owl-item.active.center').index();
			var currentSlide = $(this).index();
			if (centerSlide < currentSlide) {
				regSlider.trigger('next.owl.carousel');
			} else {
				regSlider.trigger('prev.owl.carousel');
			}
		})
	

		regSlider.on('next.owl.carousel', function(){
			let active = $('.owl-item.active.center .regulation_window-checkitem'),
					activeIdx = active.attr('data-tab'),
					num = +activeIdx - 1,
					activeSld = $('.regulation_window-infolist .regulation_window-infoitem').eq(num),
					sld = $('.regulation_window-infolist .regulation_window-infoitem');			
			sld.fadeOut(100);
			activeSld.fadeIn(300);
		});
		regSlider.on('prev.owl.carousel', function(){
			let active = $('.owl-item.active.center .regulation_window-checkitem'),
					activeIdx = active.attr('data-tab'),
					num = +activeIdx - 1,
					activeSld = $('.regulation_window-infolist .regulation_window-infoitem').eq(num),
					sld = $('.regulation_window-infolist .regulation_window-infoitem');			
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