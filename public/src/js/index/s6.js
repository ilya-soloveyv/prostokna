

$(document).ready(function() {
	//custom slider javascript
	$(function() {
	  $(document).on('input', 'input[type="range"]', function(e) {
	  	var range_val = $(this).val();
	  	var output_target = $(this).closest('p').find('output');
	  	var input_target = $(this).closest('p').find('input.edit');

	  	output_target.val(range_val);
	  	input_target.val(range_val);
	    // output_target.innerHTML = e.currentTarget.value;
	  });

	  $('input[type=range]').rangeslider({
	    polyfill: false
	  });
	});
});


// js-input type="number" (increment/decrement)
$('[data-El="inc"]').click(function() {
	var inputParent = $(this).offsetParent();
	var targetInput = inputParent.find('input[type="number"]');
	var targetOutput = inputParent.find('output');
	var current_val = targetInput.val();
	var current_val_max = targetInput.attr("max");
	if (current_val !== current_val_max) {
		current_val++;
		targetInput.val(current_val);
		targetOutput.val(current_val);
	};
});
$('[data-El="dec"]').click(function() {
	var inputParent = $(this).offsetParent();
	var targetInput = inputParent.find('input[type="number"]');
	var targetOutput = inputParent.find('output');
	var current_val = targetInput.val();
	var current_val_min = targetInput.attr("min");
	if (current_val >= current_val_min) {
		current_val--;
		targetInput.val(current_val);
		targetOutput.val(current_val);
	}
});


// colors
$('[data-color]').each(function() {
	var item_color = $(this);
	var item_color_val = item_color.attr("data-color");
	item_color.css({"background":item_color_val});

});

// color-details popup
$('[data-El="list-colors"] > *').click(function() {
	var thisColor = $(this).attr("data-color");
	$(this).closest('figure').find('[data-El="color-details"]').show().find('i').css({"background":thisColor});
});
$('[data-El="color-details"]').click(function(event) {
	var thisDetail = $(this);
	setTimeout(function() {
		thisDetail.slideUp(150);
	}, 100);
});

// height parent of colors
// var height_item_color = $('[data-color]').innerHeight();
// $('[data-El="list-colors"]').each(function() {
// 	if ($(this).hasClass('lines-2')) {
// 			var height_parent_colors = (height_item_color*2.0)+(height_item_color*0.437*2);
// 		}
// 		else {
// 			var height_parent_colors = (height_item_color*3.0)+(height_item_color*0.437*3);
// 		}
// 	$(this).height(height_parent_colors);
// });

// sizes Single color
// $('[data-El="single-color"]').each(function() {
// 	$(this).width(height_item_color).height(height_item_color);
// });
	
// insert color to [data-El="single-color"]
$('[data-color]').click(function() {
	// var buffer_color = $(this).attr("data-color");
	// alert(buffer_color);
	// $(this).next()$('[name="target-color"]').attr("data-color", buffer_color).css({"background":buffer_color});
});

// choose RAL color
$('[data-El="input-color"]').click({});



// scrollbar
$(document).ready(function(){
    $('.scrollbar-outer').scrollbar({
    	// "scrolly": $('.external-scroll_y')
    });
});

// close "module-result"
$('[data-Module="module-result"] [data-El="close"]').click(function() {
	$('[data-Module="module-result"]').slideUp(200);
});

// Tabs - module-result
$('[data-El="tab-1"]').click(function() {
	$('[data-El="tabpanel-1"]').attr("data-showed","true");
	$('[data-El="tabpanel-2"]').attr("data-showed", "false");
	$(this).attr("data-active","true");
	$('[data-El="tab-2"]').attr("data-active","false");
});

$('[data-El="tab-2"]').click(function() {
	$('[data-El="tabpanel-2"]').attr("data-showed", "true");
	$('[data-El="tabpanel-1"]').attr("data-showed", "false");
	$(this).attr("data-active","true");
	$('[data-El="tab-1"]').attr("data-active","false");
});


$('[data-El="control-1"]').click(function() {
	$('[data-Module="module-result"]').slideDown(300);
	$('[data-El="tab-1"]').click();
});
$('[data-El="control-2"]').click(function() {
	$('[data-Module="module-result"]').slideDown(300);
	$('[data-El="tab-2"]').click();
});


// tabs as a popup
$('[data-El="open-tabs-entry"]').click(function() {
	$(this).closest('.group-options').find('[data-Module="tabs-entry"]').slideDown(100);
	return false;
});
// close tabs popup
$('[data-El="close-tabs-entry"]').click(function() {
	$(this).closest('[data-Module="tabs-entry"]').slideUp(100);
});


// close modal-form
$('.modal-form [data-El="close"]').click(function() {
	$('.body-modal').slideUp(200);
	setTimeout(function() {
		$('.modal-form').fadeOut(200);
	}, 200);
	return false;
});

$('[data-toggle="modal-form"]').click(function() {
	$('.modal-form').css({"display":"block"});
	setTimeout(function() {
		$('.body-modal').fadeIn(200);
	}, 200);
	return false;
});