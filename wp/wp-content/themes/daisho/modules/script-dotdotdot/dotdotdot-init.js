jQuery(document).ready(function(){
	setTimeout(function(){
		jQuery(".element .symbol").each(function(){
			jQuery(this).dotdotdot({
				watch: "window",
				height : '2em',
				wrap : 'letter'
			});
		});
	}, 1500);
	
	jQuery('#toggle-sizes').find('a').click(function(){
		setTimeout(function(){ // we need to be in the new thread
			jQuery(".element .symbol").trigger("update.dot");
		}, 10);
	});
});