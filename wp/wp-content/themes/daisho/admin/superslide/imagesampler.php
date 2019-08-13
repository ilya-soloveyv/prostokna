<?php
/* Check if image URL can be accessed via AJAX. Used in Image ColorPicker Module. */
function flow_check_image_callback(){
	if(!check_ajax_referer('flow-check-image-nonce', 'flow-check-image-security', false)){
		die('{"jsonrpc" : "2.0", "error" : {"code": 112, "message": "WordPress nonce verification failed. Please login to save this page."}, "id" : "id"}');
	}
	if(!is_user_logged_in()){
		die('{"jsonrpc" : "2.0", "error" : {"code": 104, "message": "You need to be logged in to send messages."}, "id" : "id"}');
	}
	if(!isset($_POST['check-image-content'])){
		die('{"jsonrpc" : "2.0", "error" : null, "id" : "id", "result" : "not valid"}');
	}
	
	$image_src = $_POST['check-image-content'];
	$imageArray = @getimagesize($image_src);
	if(is_array($imageArray)){
		die('{"jsonrpc" : "2.0", "error" : null, "id" : "id", "result" : "valid"}');
	}else{
		die('{"jsonrpc" : "2.0", "error" : null, "id" : "id", "result" : "not valid"}');
	}
}
add_action('wp_ajax_flow_check_image', 'flow_check_image_callback');

function get_meta_imagesampler( $args = array(), $value = false ){ 
	global $nonce_name;
	extract($args); ?>
	<tr>
	<th style="width:20%;">
		<label for="<?php echo $name; ?>"><?php echo $title; ?></label>
	</th>
	<td>
		<div class="imagesampler-uploader" style="position:relative;">
			<div class="flowuploader">
				<input class="flowuploader_media_url" type="text" name="<?php echo $name; ?>" id="<?php echo $name; ?>" value="<?php echo esc_html( $value ); ?>" />
				<span class="flowuploader_upload_button button">Upload</span>
				<!-- <div class="flowuploader_media_preview_image"></div> -->
			</div>
			
			<input type="hidden" name="<?php echo $name; ?>_noncename" id="<?php echo $name; ?>_noncename" value="<?php echo wp_create_nonce( $nonce_name ); ?>" />

			<div class="ims_canvas_wrapper" style="width: 100%;">
				<div class="ims_column1" style="width: auto;">
					<canvas id="panel" width="390" height="292"></canvas>
				</div>
				<div class="ims_column2">
					<input class="ims_color" type="text" name="<?php echo 'thumbnail_hover_color'; ?>" placeholder="" value="" />
					<p style="width:94px;line-height:16px;">(Thumbnail highlight color on front page)</p>
					<script>
					jQuery(document).ready(function(){
						if(typeof jQuery.wp === "object" && typeof jQuery.wp.wpColorPicker === "function"){
							var options = {
								palettes: false,
								change: function(event, ui) {
									// event = standard jQuery event, produced by whichever control was changed.
									// ui = standard jQuery UI object, with a color member containing a Color.js object
									jQuery('#thumbnail_hover_color').val( ui.color.toString() );
								}
							};
							jQuery(".ims_color").wpColorPicker(options);
						}
					});
					</script>
				</div>
				<div style="clear:both;"></div>
			</div>
		</div>
		<?php
			$image_path = esc_html( $value );
			
			$parsed_url = parse_url( $image_path );
			$parsed_site_url = parse_url(get_site_url());
			if(is_array($parsed_site_url)){
				$site_host = $parsed_site_url['host'];
				$site_protocol = $parsed_site_url['scheme'];
			}
			if(is_array($parsed_url) && is_array($parsed_site_url)){
			
				$host = $parsed_url['host'];
				$protocol = $parsed_url['scheme'];
				
				if(($host == $site_host) && ($protocol == $site_protocol)){

				}else{
					if(strlen(end(explode('.', $parsed_url['path']))) >= 1 && strlen(end(explode('.', $parsed_url['path']))) <= 5){
						$image_path = get_bloginfo('template_directory') . '/admin/superslide/flow_get_image.php?image='.esc_html($value);
					}
				}
			}
		?>
		<script type="text/javascript">
			var site_host = '<?php echo $site_host; ?>';
			var site_protocol = '<?php echo $site_protocol; ?>';
			var site_image_getter = '<?php echo get_bloginfo('template_directory') . '/admin/superslide/flow_get_image.php?image='; ?>';
			<?php $ajax_nonce = wp_create_nonce("flow-check-image-nonce"); ?>
			function urlExists(img_src){
				var ajaxurl = '<?php echo admin_url('admin-ajax.php'); ?>';
				var http = jQuery.ajax({
					type: "POST",
					url: ajaxurl,
					data: {
							"action": "flow_check_image",
							"flow-check-image-security": '<?php echo $ajax_nonce; ?>',
							//"check-image-content": img_src.attr('src')
							"check-image-content": img_src
						},
					global: false,
					success: function(data, textStatus, jqXHR){
						var cr = JSON.parse(data);
						if(cr.result == 'valid'){
							//jQuery('<img />').attr('src', img_src.attr('src')).one('load', function(){
							jQuery('<img />').attr('src', img_src).one('load', function(){
								jQuery('.empty-canvas').remove();
								jQuery('.ims_column1').append('<canvas id="panel" width="390" height="292"></canvas>');
								init_image_sampler_flow();
							});
							return true;
						}
						if(cr.result == 'not valid'){
							jQuery('.empty-canvas').html('<p>Image will appear here if its URL above is valid.</p>');
							return true;
						}
						return false;
					},
					error: function(jqXHR, textStatus, errorThrown){
						console.log(jqXHR.status + ' ' + textStatus + ': ' + errorThrown);
						return false;
					}
				});
				return;
			}
			jQuery(document).ready(function(){
				
				// Update color picker with current color
				var currentcolor = jQuery('#thumbnail_hover_color').val();
				jQuery('.ims_color').wpColorPicker('color', currentcolor);

				if(jQuery('#<?php echo $name; ?>').parent().find('.flowuploader_media_preview_image').find('img').attr("src") != ''){
					init_image_sampler_flow('<?php echo $image_path; ?>');
				}
				jQuery('#<?php echo $name; ?>').on('change', function(){
					jQuery('canvas').remove();
					jQuery('.empty-canvas').remove();
					if(jQuery(this).val() != ''){
						jQuery('.ims_column1').append('<div class="empty-canvas"><p>Loading...</p></div>');
						var img_src = jQuery('#<?php echo $name; ?>').val();
						urlExists(img_src);
					}else{
						jQuery('.ims_column1').append('<div class="empty-canvas"><p>Image will appear here if its URL above is present.</p></div>');
					}
				});
			});

			/* Copyright (c) 2011 Andrey Prikaznov (aramisgc@gmail.com || http://www.script-tutorials.com/)
			 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
			 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
			 * Image sampler only (uploader + colorpicker and integration scripts are licensed differently).
			 *
			 * Version: 1.0
			 *
			 */
			 
			function init_image_sampler_flow(img_src){
				var canvas;
				var ctx;
				
				if(img_src == '' || typeof(img_src) === 'undefined'){ // perhaps replace undefined with img_src == false and add "false" as an argument everywhere - seems more solid
					var img_src = jQuery('#<?php echo $name; ?>').parent().find('.flowuploader_media_preview_image').find('img').attr("src");
					var img_src = jQuery('#<?php echo $name; ?>').val();
					var myURL = parseURL(img_src);
					if(myURL.host == site_host && myURL.protocol == site_protocol){
						// ok...
					}else{
						img_src = site_image_getter + img_src;
					}
				}
				var images = [ // predefined array of used images
					img_src
				];
				var iActiveImage = 0;

				jQuery(function(){
						jQuery('#panel').off();
					// drawing active image
					var image = new Image();
					image.onload = function (){
						var image_height = image.height;
						var image_width = image.width;
						var image_ratio = image_width/image_height;
						if(image_width < image_height){
							if(image_height <= 292){ var image_height2 = image_height; var image_width2 = image_width; }else{ var image_height2 = 292; var image_width2 = image_height*image_ratio; }
						}else{
							if(image_width <= 390){ var image_height2 = image_height; var image_width2 = image_width; }else{ var image_width2 = 390; var image_height2 = (image_width2*image_height)/image_width; }
						}
						jQuery('#<?php echo $name; ?>').parent().find('.flowuploader_media_preview_image').find('img').css({'display':'none'});
						//jQuery('#<?php echo $name; ?>').parent().find('.flowuploader_media_preview_image').css({'width':'390px'});
						//ctx.drawImage(image, 0, 0, image.width, image.height); // draw the image on the canvas
						ctx.drawImage(image, 0, 0, image_width2, image_height2); // draw the image on the canvas
					}
					image.src = images[iActiveImage];

					// creating canvas object
					canvas = document.getElementById('panel');
					ctx = canvas.getContext('2d');
					
					// Delete handler
					jQuery('#<?php echo $name; ?>').parent().find('.briskuploader_remove').on('click', function(){
						canvas.width = canvas.width;
						//jQuery('#panel').remove();
					});

					jQuery('#panel').live("mousemove", function(e) { // mouse move handler
						var canvasOffset = jQuery(canvas).offset();
						var canvasX = Math.floor(e.pageX - canvasOffset.left);
						var canvasY = Math.floor(e.pageY - canvasOffset.top);

						var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
						var pixel = imageData.data;

						var pixelColor = "rgba("+pixel[0]+", "+pixel[1]+", "+pixel[2]+", "+pixel[3]+")";
						jQuery('.wp-color-result').css('backgroundColor', pixelColor);
					});
					jQuery('#panel').mouseleave(function(){
						var currentcolor = jQuery('#thumbnail_hover_color').val();
						jQuery('.wp-color-result').css('backgroundColor', currentcolor);
					});

					jQuery('#panel').live("click",function(e) { // mouse click handler
						var canvasOffset = jQuery(canvas).offset();
						var canvasX = Math.floor(e.pageX - canvasOffset.left);
						var canvasY = Math.floor(e.pageY - canvasOffset.top);

						var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
						var pixel = imageData.data;

						var dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
						var convstr = dColor.toString(16);
						while (convstr.length < 6) {
							convstr = '0' + convstr;
						}
						jQuery('.ims_color').wpColorPicker('color', convstr);
						
					}); 

					jQuery('#swImage').live("click",function(e) { // switching images
						iActiveImage++;
						if (iActiveImage >= 10) iActiveImage = 0;
						image.src = images[iActiveImage];
					});
				});
			}
		</script>
		<input type="hidden" name="<?php echo $name; ?>_noncename" id="<?php echo $name; ?>_noncename" value="<?php echo wp_create_nonce( $nonce_name ); ?>" />
		<p><?php echo $desc; ?></p>
	</td>
	</tr>
<?php } ?>