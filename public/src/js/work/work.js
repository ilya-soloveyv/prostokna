if ($(".work").length) {    

		$('.work-users li').on('click', function () {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('div.work-tabs').find('div.tabs-content').removeClass('active').eq($(this).index()).addClass('active');

				$('.bg').css('transform', 'translate(145%,-50%)');

				$('.stages__list .stages__item:first-child').addClass('active').siblings().removeClass('active');

				$('.all-wrap').find('.days-content:first').addClass('active').siblings().removeClass('active');

			if ($(window).width() <= '576') {
				$(this).removeClass('active').siblings().addClass('active').closest('div.work-tabs').find('div.tabs-content').addClass('active').eq($(this).index()).removeClass('active');
			}
		});

		$('.stages__list .stages__item').on('click', function () {
			$(this).addClass('active').siblings().removeClass('active')
				.closest('div.tabs-content').find('div.days-content').removeClass('active').eq($(this).index()).addClass('active');

			var attr = $(this).attr('data-target');
			
			if (attr == 1) {
				$('.bg').css('transform', 'translate(145%,-50%)');
			}							
			if (attr == 2) {
				$('.bg').css('transform', 'translate(341.25%,-50%)');
			}							
			if (attr == 3) {
				$('.bg').css('transform', 'translate(537%,-50%)');
			}							
			if (attr == 4) {
				$('.bg').css('transform', 'translate(733.75%,-50%)');
			}							
			if (attr == 5) {
				$('.bg').css('transform', 'translate(930%,-50%)');
			}						
		});


		$('.steps .steps__item').on('click', function () {
			$(this).addClass('active').siblings().removeClass('active')
				.closest('div.days-content').find('div.step-content').removeClass('active').eq($(this).index()).addClass('active');
			
		});	
		
}