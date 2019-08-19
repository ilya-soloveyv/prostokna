jQuery(document).ready(function(){
	if(typeof jQuery.wp === "object" && typeof jQuery.wp.wpColorPicker === "function"){
		var options = {
			palettes: false
		};
		jQuery(".flow_styling_input_color").wpColorPicker(options);
	}
});