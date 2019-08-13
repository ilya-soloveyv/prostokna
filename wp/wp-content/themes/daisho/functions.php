<?php
	/* Load Core */
	require_once (TEMPLATEPATH . '/core/updater.php');
	require_once (TEMPLATEPATH . '/core/excerpt.php');
	require_once (TEMPLATEPATH . '/core/usefulvariables.php');
	require_once (TEMPLATEPATH . '/core/post_types/portfolio-post-type.php');
	require_once (TEMPLATEPATH . '/core/post_types/slideshow-post-type.php');
	require_once (TEMPLATEPATH . '/core/post_types/news-post-type.php');
	require_once (TEMPLATEPATH . '/core/auto_install/auto_install.php');
	require_once (TEMPLATEPATH . '/core/add_theme_support.php');
	require_once (TEMPLATEPATH . '/core/allowed_mimes.php');
	require_once (TEMPLATEPATH . '/core/body_class.php');
	require_once (TEMPLATEPATH . '/core/content_width.php');
	require_once (TEMPLATEPATH . '/core/is_.php');
	require_once (TEMPLATEPATH . '/core/nav.php');
	require_once (TEMPLATEPATH . '/core/lang.php');
	require_once (TEMPLATEPATH . '/core/menus.php');
	require_once (TEMPLATEPATH . '/core/sidebars-generator.php');
	require_once (TEMPLATEPATH . '/core/sidebars.php');
	require_once (TEMPLATEPATH . '/core/search.php');
	require_once (TEMPLATEPATH . '/core/comments.php');
	require_once (TEMPLATEPATH . '/core/hexdarker.php');
	require_once (TEMPLATEPATH . '/core/default_post_content.php');
	require_once (TEMPLATEPATH . '/core/highlight_placeholder_pages.php');
	require_once (TEMPLATEPATH . '/core/unregister_widgets.php');
	
	/* Load Admin */
	require_once (TEMPLATEPATH . '/admin/menu_pages/admin-menu.php');
	require_once (TEMPLATEPATH . '/admin/meta_boxes/shortcodes/shortcode-generator.php');
	require_once (TEMPLATEPATH . '/admin/meta_boxes/seo/seo.php');
	require_once (TEMPLATEPATH . '/admin/meta-boxes.php');
	require_once (TEMPLATEPATH . '/admin/libs/codemirror/codemirror.php');

	function flow_wp_admin_scripts(){
		wp_enqueue_script('jquery');
		wp_enqueue_script('jquery-ui-core');
		wp_enqueue_script('jquery-ui-widget');
		
		// WP3.5 Media Library
		wp_enqueue_media();
		wp_register_script( 'flow-uploader', get_bloginfo( 'template_directory').'/admin/libs/flow_uploader/flow-uploader.js', array('jquery', 'media-upload'));
		wp_register_style( 'flow-uploader', get_bloginfo( 'template_directory').'/admin/libs/flow_uploader/flow-uploader.css');
		wp_enqueue_script('thickbox');
		wp_enqueue_style('thickbox');
		wp_enqueue_script('flow-uploader');
		wp_enqueue_style('flow-uploader');
		
		// WordPress Module
		wp_enqueue_style( 'wp-color-picker' );
		wp_enqueue_script( 'wp-color-picker' );
		
		// Admin Styles
		wp_register_style( 'admin-css', get_bloginfo('template_directory') . '/admin/style.css' );
		wp_enqueue_style( 'admin-css' );
		
		// Parse URL (SuperSlide, ImageSampler)
		wp_register_script( 'flow_parse_url', get_template_directory_uri() . '/admin/libs/parseurl.js', false, '1.0', true );
		wp_enqueue_script( 'flow_parse_url' );
		
		wp_enqueue_style( 'FlowTypographyLayoutStylesheet' );
		wp_enqueue_style( 'FlowTypographyMainStylesheet' );
		
		// SuperSlide, ImageSampler
		wp_register_style( 'superslide-style', get_bloginfo('template_directory') . '/admin/superslide/style.css' );
		wp_enqueue_style( 'superslide-style' );
		wp_register_script('image_sampler', get_bloginfo('template_directory') . '/admin/superslide/imagesampler/jquery.ImageColorPicker.js', array('jquery', 'jquery-ui-widget'), '1.0', true);
		wp_enqueue_script('image_sampler');
	}
	add_action('admin_enqueue_scripts', 'flow_wp_admin_scripts');
	
	/* Load Front-end */
	function init_loadshortcodes(){
		require_once (TEMPLATEPATH . '/modules/loader.php');
	}
	add_action('init', 'init_loadshortcodes');

	function flow_scripts(){
		wp_enqueue_script('jquery');
		wp_enqueue_script('jquery-ui-core');
		wp_enqueue_script('jquery-ui-widget');
		wp_enqueue_script('jquery-ui-accordion');
		wp_enqueue_script('jquery-ui-tabs');

		if(is_singular()){
			wp_enqueue_script('comment-reply');
		}
	}
	add_action('wp_enqueue_scripts', 'flow_scripts');
?>