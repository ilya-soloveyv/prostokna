var html = document.documentElement; // html element
var path = 'http://prostokna.ru/wp-content/themes/daisho/'; // location scripts and styles


Modernizr.load([
    {   // if not supported attribute placeholder - load fix script
        test : Modernizr.input.placeholder,
        nope : [ path + 'js/jplaceholder.js'],
        callback : function() {

            $('[placeholder]').jplaceholder();
        }
    },
    {
        load: [ path + 'js/jrequired.js'],
        complete: function () {
            $('form.js-required').jrequired();
        }
    }
]);

$(function() {
  if ($('.js-nice').length)
    $('.js-nice').jnice();

	/*Anchor Scrolling*/
	$("a[href*='#']").click(function(event){
        var anchor_name = this.href.split("#")[1];
        var $trgt = $('#'+anchor_name);
        if (!$trgt.length)
          $trgt = $('a[name="'+anchor_name+'"]');
        if ($trgt.length){
          //event.preventDefault();
          $('html, body').animate({scrollTop: $trgt.offset().top });
        }
    });
	

});

