<?php
	add_action('admin_menu', 'create_admin_menu');
	add_action('admin_menu', 'create_footer_menu');
	add_action('admin_menu', 'create_blog_menu');
	add_action('admin_menu', 'create_slideshow_menu');
	add_action('admin_menu', 'create_background_menu');
	add_action('admin_menu', 'create_install_menu');

	/* add_submenu_page( $parent_slug, $page_title, $menu_title, $capability, $menu_slug, $function ); */
	// A tricky method to add scripts only on particular admin sub pages
	//add_action( "admin_print_scripts-options.php", 'my_admin_scripts' );
	//function my_admin_scripts(){ }

	function create_admin_menu() {
		add_menu_page(__('Daisho','flowthemes'), __('Daisho','flowthemes'), 'manage_options', 'brisk-mainmenu', 'add_main_menu2', '', 40 );
		add_submenu_page('brisk-mainmenu', __( 'General', 'flowthemes' ), __( 'General', 'flowthemes' ), 'manage_options', 'brisk-mainmenu', 'add_main_menu2');
	}

	function create_footer_menu() {
		add_submenu_page('brisk-mainmenu', __('Footer','flowthemes'), __('Footer','flowthemes'), 'manage_options', 'sub-page', 'add_footer_menu');
	}

	function create_slideshow_menu() {
		add_submenu_page('brisk-mainmenu', __('Slideshow','flowthemes'), __('Slideshow','flowthemes'), 'manage_options', 'sub-page3', 'add_slideshow_menu');
	}

	function create_blog_menu() {
		add_submenu_page('brisk-mainmenu', __('Blog','flowthemes'), __('Blog','flowthemes'), 'manage_options', 'sub-page4', 'add_blog_menu');
	}

	function create_background_menu() {
	   $background_settings_page = add_submenu_page('brisk-mainmenu', __('Styling','flowthemes'), __('Styling','flowthemes'), 'manage_options', 'sub-page41', 'add_bg_menu');
	   add_action( "load-{$background_settings_page}", 'flow_styling_init' );
	}

	function create_install_menu(){
	   $about_settings_page = add_submenu_page('brisk-mainmenu', __('About','flowthemes'), __('About','flowthemes'), 'manage_options', 'sub-page42', 'add_about_menu');
	}	
	
	require_once dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'menu-main.php';
	require_once dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'menu-blog.php';
	require_once dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'menu-footer.php';
	require_once dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'menu-slideshow.php';
	require_once dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'menu-background.php';
	require_once dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'menu-about.php';
?>