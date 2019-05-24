if ($('.instruction').length) {

	// Tabs script

	$('.instruction__tabs .instruction__tabs_content').on('click', function () {
		$(this)
			.addClass('active').siblings().removeClass('active').closest('.instruction').find('.instruction__wrapp').removeClass('active').eq($(this).index()).addClass('active');
	});

	// Accordion script

	$('.instruction__accor .acc__title').on('click', f_acc);

	function f_acc() {
		$('.instruction__wrapp.active .instruction__accor .acc__content').not($(this).next()).slideUp();

		$(this).next().slideToggle();
    

		// TEST		

    // var title = $(this).attr('data-title');

		// $(this).closest('.instruction').find('.instruction__img .num__item').eq(title).click();

		

	}		

	$("a.go_to").click(function (e) {
		e.preventDefault();
		var id = $(this).attr('href'),
			top = $(id).offset().top;

		$('body,html').animate({ scrollTop: top }, 1500);
	});

	// Window nums script

	$('.instruction__wrapp .num .num__item').on('click', function(){
    var item  = $(this).index();
		$(this).toggleClass('active').siblings().removeClass('active').toggleClass('none').closest('.instruction__wrapp').find('.instruction__accor .acc__title').eq($(this).index()).click();

		$(this).closest('.instruction__img').find('.text .text__item').eq($(this).index()).toggleClass('active');

		$('.up').toggleClass('active');

    if (item == 0) {
			$.each($('.part'), function(i, el) {
        setTimeout(function() {
          $(el).toggleClass("active");
        }, 100 + (i * 100));

      });      
			// window
			$('.op1').toggleClass('active');
			$('.dn1').toggleClass('active');
			$('.dn12').toggleClass('active');
			$('.dc1').toggleClass('color');
			// balcony
      $('#balcony-top').toggleClass('show');
      $('#balcony-center').toggleClass('op3');
      $('#balcony-window').toggleClass('op3');
      $('.b-line2').toggleClass('none');
      $('.door').toggleClass('op3');
      $('.top-line').toggleClass('show');
		  
		}
    if (item == 1) {
			$.each($('.part'), function(i, el) {
        setTimeout(function() {
          $(el).toggleClass("active");
        }, 100 + (i * 100));

      });      

			$('.op1').toggleClass('active');
			$('.dn12').toggleClass('active');
			$('.dn2').toggleClass('active');
			$('.dc2').toggleClass('color');
      // balcony
			$('.b-line2').toggleClass('color');
      $('#balcony-center').toggleClass('op3');
      $('#balcony-window').toggleClass('op3');

		  
		}
    if (item == 2) {			     

			$('.line3').toggleClass('color');
			$('.part3').toggleClass('op3');
			$('#center').toggleClass('op3');
			$('.line').toggleClass('op3');
			$('.under').toggleClass('op3');
			// balcony
      $('#balcony-right').toggleClass('show');
      $('#balcony-center').toggleClass('op3');
      $('#balcony-window').toggleClass('op3');
      $('.b-line2').toggleClass('none');
      $('.door').toggleClass('op3');
      $('.right-line').toggleClass('show');
		  
		}
    if (item == 3) {			     
   
			$('.line4').toggleClass('db4');
			$('.part4').toggleClass('op3');
			$('.block3').toggleClass('op3');
			$('#center').toggleClass('op3');
			$('.line').toggleClass('op3');
			$('.under').toggleClass('op3');
			$('#max-down').toggleClass('op3');
		  
		}
    if (item == 4) {			     
   
			$('.line5').toggleClass('db4');
			$('.part').toggleClass('op3');
			$('#center').toggleClass('op3');
			$('.line').toggleClass('op3');
			$('.under').toggleClass('op3');
			$('#max-down').toggleClass('op3');
			$('.part5').toggleClass('stroke');
		  
		}


	});
	
	// Description more script

	$('.instruction__wrapp .instruction__btn').on('click',function(){
		$(this).toggleClass('active');
		$('.instruction__wrapp.active .instruction__more').slideToggle();
	});
	
	
}