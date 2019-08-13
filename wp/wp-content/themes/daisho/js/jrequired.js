/*
 * version: jrequired 1.0.5 10.02.2013
 * author: hmelii
 * email: anufry@inbox.ru
 */
 (function($){
	var settings;
	$.fn.jrequired = function( options ) {
		return this.each(function()	{
			settings = $.extend({
				regexp_tel : /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
				regexp_email : /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/,  /* [^ @]*@[^ @]* */
				error_message_empty : 'error',
				correct_message : 'good',
				error_message_correct : 'error'
			},options||{});
			
			var $form = $(this).attr('novalidate','novalidate');
			

			$form.on('submit',function() {
				
				var $fields = $('[required]',$form);
				
				var err = 0;
				
				$fields.each(function(index, element) {
					
					var $element = $(element);
					
					var $element_value = $element.val();
					var $element_width = $element.width() + parseInt($element.css('paddingLeft')) + parseInt($element.css('paddingRight'))  + parseInt($element.css('marginLeft')) + parseInt($element.css('marginRight'));
					
					$element.attr('data-width',$element_width);
					
					if ( $element.hasClass('error_field') ) {
						remove_error_message($element);
					} else if ( $element.hasClass('correct_field') ) {
						remove_correct_message($element);
					}
					
					if( $element_value == '' || $element_value == $element.attr('placeholder') ) {						
						add_error_message_empty($element);
						err++;
						return;
					} else if ( $element_value != '' && element.type == 'tel' && !$element_value.match( settings.regexp_tel ) ) {
						add_error_message_correct($element);
						err++;
						return;
					} else if ( $element_value != '' && element.type == 'email' && !$element_value.match( settings.regexp_email )) {
						add_error_message_correct($element);
						err++;
						return;
					} else if ( $element_value != ''  && $element.data('type') == 'repassword' && $element_value != $fields.filter('[type=password]').val() ) {
						add_error_message_correct($element);
						err++;
						return;
					} else {
						add_correct_message($element);
					}				
				});
				
				if ( err ) {
					$fields.filter('.error_field').eq(0).focus();
					return false;
				}

			});
			
			function remove_error_message(element){
				element.removeClass('error_field').siblings('span.error_message').remove();
				element.unwrap();
			}
			
			function remove_correct_message(element){
				element.removeClass('correct_field').siblings('span.correct_message').remove();
				element.unwrap();
			}
			
			function add_error_message_empty(element) {
				var error_message_empty = element.data('error-message-empty') ? element.data('error-message-empty') : settings.error_message_empty;
				element.focus().addClass('error_field').wrap('<span class="parent_field" style="width:'+element.data('width')+'px" />').parent().append('<span class="error_message">'+error_message_empty+'</span>');
			}
			
			function add_error_message_correct(element) {
				var error_message_correct = element.data('error-message-correct') ? element.data('error-message-correct') : settings.error_message_correct;
				element.focus().addClass('error_field').wrap('<span class="parent_field" style="width:'+element.data('width')+'px" />').parent().append('<span class="error_message">'+error_message_correct+'</span>');
			}
			
			function add_correct_message(element) {
				var correct_message = element.data('correct-message') ? element.data('correct-message') : settings.correct_message;
				element.addClass('correct_field').wrap('<span class="parent_field" style="width:'+element.data('width')+'px" />').parent().append('<span class="correct_message">'+correct_message+'</span>');
			}
			
		});
	};
})(jQuery);