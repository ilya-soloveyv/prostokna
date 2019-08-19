<?php
	if(get_option("flow_featured_slideshow") == 0){ ?>
		<script type="text/javascript">
			var myScroll;
			var current_slide = 0; // Initial slide is always 0
			var number_of_slides; // each slide has id="slide_0", id="slide_1" etc.
			var mobile = <?php echo json_encode($GLOBALS['mobile']); ?>;
			var tablet = <?php echo json_encode($GLOBALS['tablet']); ?>;
			var autoplayTime = <?php echo json_encode(get_option('flow_slideshow_autoplay')); ?>; // False, (empty string) or Integer (or anything that user put here)
			var mouseWheel = <?php echo json_encode(get_option('flow_slideshow_mousewheel')); ?>; // False, (empty string) or Integer (0 = enabled, 1 = disabled)
			var slideshowWidth = jQuery(window).width();
			var newVals = [];
			
			// Define correct height() for iPhone (jQuery 1.7.2 FIX). Announced to be repaired in jQuery 1.8
			//var winheight = window.innerHeight ? window.innerHeight : jQuery(window).height();
			
			/**			 * Setup iScroll 4			 * @return {void} Updates myScroll variable 			 */
			function setup_iscroll(){
				myScroll = new iScroll('flow_slideshow_wrapper', {
					snap: 'li',
					bounce: false,
					bounceLock: false,
					momentum: false,
					hScrollbar: false,
					vScrollbar: false,
					hScroll: true,
					vScroll: false,
					wheelAction: 'none',
					onScrollMove: function(){ },
					onScrollEnd: function(){ },
					onRefresh: function(){ },
				});
				number_of_slides = myScroll.pagesX.length;
				return;
			}
			document.addEventListener('DOMContentLoaded', setup_iscroll, false);

			/**
			 * Scroll left or right.
			 * @TODO(Flow): invent better name and method for handling this.
			 * @return {void}
			 */
			function scrollSlides(){
				if(jQuery('#slide_' + current_slide).hasClass('fit')){
					//if(current_slide == 0 || current_slide == number_of_slides){ // TODO(Flow): if first or last slide then "fit screen" doesn't do anything
					//}else{
					
						var nextSlide = current_slide + 1;
						//if(nextSlide >= slidesLength){ // last slide has .fit
						//	nextSlide = liPosition;
						//}
						//przesun¹æ o: (n-1)slajdow.width() + (window width - ostatni element)
						//if(liPosition >= slidesLength || nextSlide == 1){ // we can't do this for the first and the last slide TODO(Flow): well... we shouldn't
							//var dlugosc_slajda = Math.abs(myScroll.pagesX[nextSlide - 1]) - Math.abs(myScroll.pagesX[liPosition]);
						//}else{
							var dlugosc_slajda = Math.abs(myScroll.pagesX[nextSlide]) - Math.abs(myScroll.pagesX[current_slide]);
						//}
						var offset = Math.abs(myScroll.pagesX[current_slide]) - ((jQuery(window).width() - dlugosc_slajda)/2); // scroll to the next and subtract half of remaining space (windowW-slideW) to make it centered
						if(nextSlide >= number_of_slides){ // last slide has .fit
							var dlugosc_slajda = Math.abs(myScroll.pagesX[current_slide]) - Math.abs(myScroll.pagesX[current_slide - 1]);
							var offset = Math.abs(myScroll.pagesX[current_slide]) - (jQuery(window).width() - dlugosc_slajda);
						}
					
						///var nextSlide = current_slide + 1;
						//var dlugosc_slajda = Math.abs(myScroll.pagesX[nextSlide]) - Math.abs(myScroll.pagesX[current_slide]);
						//var offset = Math.abs(myScroll.pagesX[current_slide])  - ((jQuery(window).width() - dlugosc_slajda)/2); // scroll to the next and subtract half of remaining space (windowW-slideW) to make it centered
						
						
						
						
						
						myScroll.scrollTo(~offset, 0, 300);
					//}
				}else{
					if(tablet || mobile){
						myScroll.scrollToPage(current_slide, 0, 300);
					}else{
						if(jQuery(window).width() <= 1024){
							myScroll.scrollToPage(current_slide, 0, 300);
						}else{
							myScroll.scrollToPage(current_slide, 0, 0);
							sliderAnimationsFlow();
						}
					}
				}
				return;
			}
			
			function isInt(number){
				var intRegex = /^\d+$/;
				if(intRegex.test(number)){
					return true;
				}
				return false;
			}
			function slideshow_next_slide(){
				pauseVideos(current_slide);
				current_slide++; 
				if(current_slide == number_of_slides){ 
					current_slide = 0; 
				}
				playVideos(current_slide);
				scrollSlides();
			}
			function slideshow_prev_slide(){
				pauseVideos(current_slide);
				current_slide--;
				if(current_slide == -1){
					current_slide = number_of_slides-1;
				}
				playVideos(current_slide);
				scrollSlides();
			}
			function autoplay_flow(){
				if(autoplayTime){
					if(!isInt(autoplayTime) || autoplayTime == 0){
						autoplayTime = 12000;
					}
					setTimeout(function(){
						slideshow_next_slide();
						autoplay_flow();
					}, autoplayTime);
				}
			}
			
			/**
			 * Utility functions.
			 */
			function pauseVideos(current_slide){
				if(jQuery('#slide_' + current_slide).hasClass('video-slidex')){
					jQuery('#slide_' + current_slide + ' video').get(0).pause();
				}
			}	
			function playVideos(current_slide){
				if(jQuery('#slide_' + current_slide).hasClass('video-slidex')){
					jQuery('#slide_' + current_slide + ' video').get(0).play();
				}
			}
			function sliderAnimationsFlow(){
				/* Animation - Flow */
				var button_margin = '0.4em';
				var rand_no = (Math.floor(Math.random()*10000000))%3+1;
				var padding_type = 'padding-left';
				if(rand_no == 1){ padding_type = 'padding-left'; }else if(rand_no == 2){ padding_type = 'padding-right'; }else if(rand_no == 3){ padding_type = 'padding-top'; }
				var img_margin = 0;
				jQuery("#slide_"+current_slide).find('.slideshow-project-title').css({ 'opacity': 0, 'margin-top' : 40+'px' });
				jQuery("#slide_"+current_slide).find('.project-description-home').css({ 'opacity': 0, 'margin-top' : 40+'px' });
				jQuery("#slide_"+current_slide).find('.button').css({ 'opacity': 0, 'margin-top' : -40+'px' });
				jQuery("#slide_"+current_slide).find('.slide-img').css({ 'opacity': 0}).css(padding_type,240+'px');
				
				jQuery("#slide_"+current_slide).find('.slideshow-project-title').animate({ 'opacity': 1, 'margin-top' : 0+'px' }, 600);
				jQuery("#slide_"+current_slide).find('.project-description-home').animate({ 'opacity': 1, 'margin-top' : 0+'px' }, 600);
				jQuery("#slide_"+current_slide).find('.button').animate({ 'opacity': 1, 'margin-top' : button_margin }, 700, 'easeOutBounce');
				var amap = {'opacity': 1};
				amap[padding_type] = img_margin;
				jQuery("#slide_"+current_slide).find('.slide-img').animate(amap, 300, 'easeInOutCirc');
			}

		jQuery(document).ready(function(){

			// Set dimensions
			jQuery(".slideshow-slide").css({ 'width' : jQuery(window).width() });
			jQuery('#thelist').css({ 'width' : (jQuery('.slideshow-slide').length * jQuery(window).width()) });


			// Window resizing adjustments
			function resizeSlideshow(){
				//winheight = window.innerHeight ? window.innerHeight:jQuery(window).height();
				//jQuery(".slideshow-slide").css({ 'height' : winheight, 'width' : jQuery(window).width() });
				jQuery(".slideshow-slide").css({ 'width' : jQuery(window).width() });
				//jQuery(".slideshow-slide.fit").css({ 'width' : '' });
				//jQuery(".slideshow-slide:nth-child(2)").css({ 'width' : jQuery(window).width()-400 });
				
				jQuery('.slideshow-slide.fit').each(function(index, element){
					var fitToWidth = jQuery(this).find('img').width();
					jQuery(this).css({ 'max-width' : fitToWidth });
				});
				// TODO(Flow): Here go all functions that set "fit screen" etc. because below this line width is recalculated
				
				setTimeout(function (){
				
					// This is used in myScroll.maxScrollX
					var totalWidth = 0;
					jQuery('.slideshow-slide').each(function(){
						totalWidth += jQuery(this).width();
					});
					jQuery('#thelist').css({ 'width' : totalWidth });
					
					// Refresh!
					myScroll.refresh();
					
					// Post-refresh fixes to consider "fit screen" mode etc.
					jQuery('.slideshow-slide.fit').each(function(index, element){
						var slidesLength = jQuery('.slideshow-slide').length;
						var liPosition = jQuery('.slideshow-slide').index(jQuery(this));
						var nextSlide = liPosition + 1;
						
						//if(nextSlide >= slidesLength){ // last slide has .fit
						//	nextSlide = liPosition;
						//}
						//przesun¹æ o: (n-1)slajdow.width() + (window width - ostatni element)
						//if(liPosition >= slidesLength || nextSlide == 1){ // we can't do this for the first and the last slide TODO(Flow): well... we shouldn't
							//var dlugosc_slajda = Math.abs(myScroll.pagesX[nextSlide - 1]) - Math.abs(myScroll.pagesX[liPosition]);
						//}else{
							var dlugosc_slajda = Math.abs(myScroll.pagesX[nextSlide]) - Math.abs(myScroll.pagesX[liPosition]);
						//}
						var offset = Math.abs(myScroll.pagesX[liPosition]) - ((jQuery(window).width() - dlugosc_slajda)/2); // scroll to the next and subtract half of remaining space (windowW-slideW) to make it centered
						if(nextSlide >= slidesLength){ // last slide has .fit
							//var dlugosc_slajda = Math.abs(myScroll.pagesX[liPosition]) - Math.abs(myScroll.pagesX[liPosition - 1]);
							//var offset = Math.abs(myScroll.pagesX[liPosition]) - (jQuery(window).width() - dlugosc_slajda);
						}else{
							myScroll.pagesX[liPosition] = ~offset;
						}
					});
					
					// Make sure to center the slideshow in the correct place after resize
					myScroll.scrollTo(myScroll.pagesX[myScroll.currPageX], 0, 0);
					//myScroll.scrollTo(myScroll.pagesX[current_slide], 0, 0);
					
				}, 0);
				
			}
			jQuery(window).bind("resize.resizeSlideshow", function(){
				resizeSlideshow();
			});
			
			// Autoplay
			autoplay_flow();
			
			// Create controls (keyboard, mousewheel, mouse click)
			// Mouse click
			if(Modernizr.touch){
				jQuery(".konzept_arrow_left").remove();
				jQuery(".konzept_arrow_right").remove();
			}
			jQuery(".konzept_arrow_left").on('click.flow_slideshow_arrow_left', function(){
				slideshow_prev_slide();
			});
			jQuery(".konzept_arrow_right").on('click.flow_slideshow_arrow_right', function(){
				slideshow_next_slide();
			});
			
			// Mousewheel
			if(mouseWheel != 1){
				jQuery("#flow_slideshow").mousewheel(function(event, delta){
					var dir = delta > 0 ? slideshow_prev_slide() : slideshow_next_slide();
					event.preventDefault();
				});
			}
			
			// Keyboard
			jQuery(window).keydown(function(e){
				if(e.keyCode == 37 || e.keyCode == 38){
					slideshow_prev_slide();
				}else if(e.keyCode == 39 || e.keyCode == 40){
					slideshow_next_slide();
				}
			});
			
			// Mouse drag & drop and touch drag & drop are a part of iScroll 4.

		});
		</script>
		<div id="flow_slideshow">
			<div class="konzept_arrow_left"></div>
					<div class="konzept_arrow_right"></div>
			<div id="flow_slideshow_wrapper">
				<div id="scroller">
					<ul id="thelist">
						<?php 
						$args = array('post_type' => 'slideshow');
						$recent = new WP_Query($args);
						while($recent->have_posts()){
							$recent->the_post();
							
							// Set variables
							if(get_post_meta($post->ID, 'slide-link', true)){ $slide_link = get_post_meta($post->ID, 'slide-link', true); }else{ $slide_link = get_permalink(); }
							if(get_post_meta($post->ID, 'slide-link-name', true)){ $slide_link_name = get_post_meta($post->ID, 'slide-link-name', true); }else{ $slide_link_name = ''; }
							
							// Title
							if(get_post_meta($post->ID, 'flow_post_title', true)){
								$page_title = get_post_meta($post->ID, 'flow_post_title', true); 
							}else if(get_post_meta($post->ID, 'Title', true)){
								$page_title = get_post_meta($post->ID, 'Title', true);
							}else{
								$page_title = get_the_title();
							}
							
							// Description
							if(get_post_meta($post->ID, 'flow_post_description', true)){
								$page_description = get_post_meta($post->ID, 'flow_post_description', true); 
							}else if(get_post_meta($post->ID, 'Description', true)){
								$page_description = get_post_meta($post->ID, 'Description', true); 
							}else{ 
								$page_description = '';
							}
							
							if(get_post_meta($post->ID, 'slide-image', true)){ $slide_image = get_post_meta($post->ID, 'slide-image', true); }else{ $slide_image = ''; }
							
							if(!($slide_custom_code = get_post_meta($post->ID, 'slide-custom-code', true))){
								$slide_custom_code = '';
							}
							
							if(get_post_meta($post->ID, 'slide-image-x-offset', true)){ $slide_image_x_offset = 'left:'.get_post_meta($post->ID, 'slide-image-x-offset', true).';'; }else{ $slide_image_x_offset = ''; }
							if(get_post_meta($post->ID, 'slide-image-y-offset', true)){ $slide_image_y_offset = 'top:'.get_post_meta($post->ID, 'slide-image-y-offset', true).';'; }else{ $slide_image_y_offset = ''; }
							if(get_post_meta($post->ID, 'slide-button-x-offset', true)){ $slide_button_x_offset = get_post_meta($post->ID, 'slide-button-x-offset', true); }else{ $slide_button_x_offset = '0px'; }
							if(get_post_meta($post->ID, 'slide-button-y-offset', true)){ $slide_button_y_offset = get_post_meta($post->ID, 'slide-button-y-offset', true); }else{ $slide_button_y_offset = '0px'; }
							if(get_post_meta($post->ID, 'slide-button-icon', true)){ $slide_button_icon = get_post_meta($post->ID, 'slide-button-icon', true); }else{ $slide_button_icon = ''; }
							
							if(!($slide_button_text_color = get_post_meta($post->ID, 'slide-button-text-color', true))){ $slide_button_text_color = '#f1f1f1'; }
							if(!($slide_title_text_color = get_post_meta($post->ID, 'slide-title-text-color', true))){ $slide_title_text_color = '#ffffff'; }
							if(!($slide_description_text_color = get_post_meta($post->ID, 'slide-description-text-color', true))){ $slide_description_text_color = '#ffffff'; }
							
							if(get_post_meta($post->ID, 'slide-color', true)){ $slide_color = get_post_meta($post->ID, 'slide-color', true); }else{ $slide_color = '#00a4a7'; }
							if(isset($slide_id)){ $slide_id++; }else{ $slide_id = 0; }
							
							//Display slides
							if($slide_image){ ?>
								<li id="slide_<?php echo $slide_id; ?>" class="slideshow-slide">
									<?php echo $slide_custom_code; ?>
									<div class="slideshow-meta-wrapper">
										<div class="slideshow-meta-inner">
											<div class="slideshow-meta-inner-2">
												<h1 class="slideshow-meta-title" style="color: <?php echo $slide_title_text_color; ?>;"><?php echo $page_title; ?></h1>
												<h4 class="slideshow-meta-description" style="color: <?php echo $slide_description_text_color; ?>;"><?php echo summarise_excerpt($page_description,70); ?></h4>
											</div>
										</div>
									</div>
									<?php if($slide_link_name != ''){ ?>
										<div class="slideshow-button-wrapper">
											<a href="<?php echo $slide_link; ?>" data-icon="<?php echo $slide_button_icon; ?>" class="slideshow-button" style="top: <?php echo $slide_button_y_offset; ?>; right: <?php echo $slide_button_x_offset; ?>; color: <?php echo $slide_button_text_color; ?>; text-shadow: 0px -1px 0px <?php echo hexDarker($slide_color, 8); ?>; background-color: <?php echo $slide_color; ?>;"><?php echo $slide_link_name; ?></a>
										</div>
									<?php } ?>
									<img class="slide-img" style="position: absolute; clear: both; <?php echo $slide_image_x_offset.$slide_image_y_offset; ?>" src="<?php echo $slide_image; ?>" alt="<?php echo $page_title; ?>" />
									<div class="slideshow-background" style="background-color: <?php echo $slide_color; ?>;"></div>
								</li>
							<?php } ?>
						<?php } // endwhile; ?>
					</ul>
				</div> <!-- /#scroller -->
			</div> <!-- /#flow_slideshow_wrapper -->
			<?php
				//$pager = '<div class="flow_slideshow_pager" style="display:none;"><ul class="inner">';
				//for($i=0;$i<=$slide_id;$i++){ $pager .= '<li class="flow_slideshow_pager_'.$i.'"></li>'; }
				//$pager .= '</ul></div>';
				//echo $pager;
			?>
		</div> <!-- /#flow_slideshow -->
<?php } ?>