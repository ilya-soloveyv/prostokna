if ($('.instruction').length) {	

	$('.instruction__accor .acc__title').on('click', f_acc);

	function f_acc() {
		$('.instruction__wrapp.active .instruction__accor .acc__content').not($(this).next()).slideUp();

		$(this).next().slideToggle();
	}

	$('.num .num__item').on('click', function(){
		$(this).addClass('active').siblings().removeClass('active').closest('.instruction__wrapp').find('.instruction__accor .acc__title').eq($(this).index()).click();

	});
	
	

	var it = $('.instruction__wrapp.active .num__item');
	if ($(it).hasClass('active') == true) {
		$('.instruction__wrapp.active .instruction__accor .acc__title:first-child').click();
	}
	
	$('input').on('change', function(){
		var trg = $('.instruction__wrapp');
		var check = $(this).data('check');

		if (check == 1) {
			$(trg).first().addClass('active');
			$(trg).last().removeClass('active');
		} else if (check == 2) {
			$(trg).first().removeClass('active');
			$(trg).last().addClass('active');
		}
	})

	$('.instruction__wrapp .instruction__btn').on('click',function(){
		$(this).toggleClass('active');
		$('.instruction__wrapp.active .instruction__more').slideToggle();
	});
	
	
}