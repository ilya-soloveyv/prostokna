

// $(document).ready(function() {
// 	//custom slider javascript
// 	$(function() {
// 	  $(document).on('input', 'input[type="range"]', function(e) {
// 	  	var range_val = $(this).val();
// 	  	var output_target = $(this).closest('p').find('output');
// 	  	var input_target = $(this).closest('p').find('input.edit');

// 	  	output_target.val(range_val);
// 	  	input_target.val(range_val);
// 	    // output_target.innerHTML = e.currentTarget.value;
// 	  });

// 	  $('input[type=range]').rangeslider({
// 	    polyfill: false
// 	  });
// 	});
// });


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








// var calc_data = {}
// if ($('.section.s6').length) {
// 	$.ajax({
// 		url: "/calc_data",
// 		type: "GET"
// 	}).done(function(json) {
// 		calc_data = json
// 		console.log(calc_data)
// 		calculator ()
// 	});
// }

$("#calc_user_x").change(function(){
	calculator ()
})
$("#calc_user_y").change(function(){
	calculator ()
})
$("#calc_camera").change(function(){
	calculator ()
})

function calculator () {
	return true
	// console.log(json)

	var user_x = $("#calc_user_x").val()
	var user_y = $("#calc_user_y").val()
	var user_camera = $("#calc_camera").val()

	var shape = calc_data[user_camera]
	
	var resp = {}
		resp.minX = (shape[1][0] < shape[2][0] ? shape[1][0] : shape[2][0])
		resp.maxX = (shape[3][0] > shape[4][0] ? shape[3][0] : shape[4][0])
		resp.minY = (shape[1][1] < shape[4][1] ? shape[1][1] : shape[4][1])
		resp.maxY = (shape[2][1] > shape[3][1] ? shape[2][1] : shape[3][1])

	var tri = getTriangle(shape, [user_x, user_y])
		resp.price = Math.ceil(TriangleIterpolate(tri, [user_x, user_y]) * 1)
		// resp.price = Math.ceil(TriangleIterpolate(tri, [user_x, user_y]) * 1.2305)
	
	$('.calc_result').html(resp.price)
}

function getTriangle (shape, point) {
    var max = shape.length - 1;
    for (var i = 1; i < max; i++) {
        if (isInTriangle([shape[0], shape[i+1], shape[i]], point)) {
            return [shape[0], shape[i+1],shape[i]]
        }
    }
    if (isInTriangle([shape[0], shape[1], shape[4]], point)) {
        return [shape[0], shape[1], shape[4]]
    }
}

function isInTriangle(triangle, point) {
    var x1 = triangle[0][0]
    var y1 = triangle[0][1]
    var x2 = triangle[1][0]
    var y2 = triangle[1][1]
    var x3 = triangle[2][0]
    var y3 = triangle[2][1]
    var tx = point[0]
    var ty = point[1]

    var a = (tx-x1)*(y1-y2)-(ty-y1)*(x1-x2);
    var b = (tx-x2)*(y2-y3)-(ty-y2)*(x2-x3);
    var c = (tx-x3)*(y3-y1)-(ty-y3)*(x3-x1);

    if (a >=0 && b >=0 && c >= 0)
        return true
    return false
}

function TriangleIterpolate (triangle, point) {
    var x1 = triangle[0][0]
    var y1 = triangle[0][1]
    var z1 = triangle[0][2]
    var x2 = triangle[1][0]
    var y2 = triangle[1][1]
    var z2 = triangle[1][2]
    var x3 = triangle[2][0]
    var y3 = triangle[2][1]
    var z3 = triangle[2][2]
    var x = point[0]
    var y = point[1]

    var d  = Math.abs (getDet3( [[x1, x2, x3], [y1, y2, y3]] ))
    var d1 = Math.abs (getDet3( [[x, x2, x3], [y, y2, y3]] ))
    var d2 = Math.abs (getDet3( [[x1, x, x3], [y1, y, y3]] ))
    var a = d1/d;
    var b = d2/d;
    var g = 1-a-b;
    
    return ( a*z1 + b*z2 + g*z3 );
}

function getDet3(matrix){
    var a21 = matrix[0][0]
    var a22 = matrix[0][1]
    var a23 = matrix[0][2]
    var a31 = matrix[1][0]
    var a32 = matrix[1][1]
    var a33 = matrix[1][2]
    return ( (a22*a33-a23*a32)-(a21*a33-a23*a31)+(a21*a32-a22*a31) )
} 
