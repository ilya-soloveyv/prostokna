<?php
/**
 * One Click Automatic Installation Module
 *
 * 1. Adds "Install Demo Content" admin notice.
 * 2. Deletes posts, pages, menus, sidebars etc.
 * 3. Imports posts, pages, menus, sidebars etc.
 *
 * @author 		Flow
 * @category 	Admin
 * @package 	Daisho/Admin
 * @version     1.0
 */
 
if ( ! defined( 'ABSPATH' ) ) exit; // Exit on direct entrance

/**
 * Automatic installation admin panel notice.
 *
 * @return void
 */
function flow_auto_install_notice() {
	?>
	<div id="message" class="updated au-box">
		<div class="inner">
			<h2><?php _e( '<strong>Welcome to Daisho</strong> &#8211; your website is almost ready!', 'flowthemes' ); ?></h2>
			<p class="au-desc"><?php _e( 'Would you like to delete all current posts, pages, projects, categories, menus, widgets, media library items and import demo content? If this is a fresh installation of WordPress you can safely do that. Please skip setup otherwise.', 'flowthemes' ); ?></p>
			<p class="au-buttons">
				<a href="<?php echo add_query_arg( 'flow_install_demo', 'true' ); ?>" class="button-primary au-install-button"><?php _e( 'Install Demo', 'flowthemes' ); ?></a>
				<a class="au-skip-button button-primary" href="<?php echo add_query_arg( 'flow_hide_install_demo', 'true' ); ?>"><?php _e( 'Skip Setup', 'flowthemes' ); ?></a>
				<span class="au-small"><?php _e( '(Importer tested up to WP 3.5.1)', 'flowthemes' ); ?></span>
			</p>
		</div>
	</div>
	<script type="text/javascript">
		jQuery('.au-install-button').on('click', function(){
			var answer = confirm( '<?php _e( 'It is strongly recommended that you backup your database before proceeding. Are you sure you wish to run the installer now? It can not be undone.', 'flowthemes' ); ?>' );
			return answer;
		});
	</script>
<?php }

/**
 * Checks what template is being used and if it doesn't match saved one it offers a way to install demo configuration. 
 * Adds admin panel notice with "Install" button.
 *
 * @return void
 */
function flow_auto_install_print_notice() {
	$template = get_option( 'template' );
	//update_option( 'flow_hide_install_demo', ';3' );
	if ( ! empty( $_GET['flow_hide_install_demo'] ) ) {
		update_option( 'flow_hide_install_demo', $template );
		return;
	}
	if ( get_option( 'flow_hide_install_demo' ) !== $template ) {
		wp_enqueue_style( 'flow-auto-install-notice', get_template_directory_uri() . '/core/auto_install/style.css' );
		add_action( 'admin_notices', 'flow_auto_install_notice' );
	}
	return;
}
add_action( 'admin_print_styles', 'flow_auto_install_print_notice' );

/**
 * Installs theme settings only.
 * Adds admin panel notice with "Install" button.
 *
 * @param {boolean} True to install settings (2nd priority).
 * @param {boolean} True to return settings (1st priority).
 * @param {boolean} True to uninstall settings (3rd priority).
 * @return {array|boolean} True on success, false on failure or array of settings and their values.
 */
function flow_install_theme_settings($install = false, $return = false, $uninstall = false){
	$theme_settings = array(
		'flowessencethemeactivated' => 1,
		'flow_hide_install_demo' => 0,
		'flow_logo' => 'http://themes.devatic.com/daisho/wp-content/uploads/2012/05/logo.png',
		'flow_logo_svg' => 'http://themes.devatic.com/daisho/wp-content/uploads/2012/10/daisho.svg',
		'tagline_disable' => '0',
		'custom_favicon' => 'http://themes.devatic.com/daisho/wp-content/uploads/2012/06/favicon.png',
		'flow_mobile_app_icon' => 'http://themes.devatic.com/daisho/wp-content/uploads/2013/02/mobile-app-icon.png',
		'portfolio_mode' => '1',
		'flow_featured_slideshow' => '0',
		'portfolio_recent' => '0',
		'blog_recent' => '0',
		'front_page' => '3232',
		'info_box' => '3393',
		'flow_portfolio_page' => '3433',
		'flow_blog_page' => '2482',
		'flow_wpml_switcher' => 0,
		'custom_css_style' => '',
		'flow_support_login' => '',
		'flow_support_password' => '',
		'flow_styling' => array('.conatainer_language_selector' => array('top' => '5px', 'left' => '170px')),
		'analytics_code' => '',
		'blog_items_per_page' => '5',
		'blog_show_author' => '0',
		'blog_exclude_categories' => '',
		'footer_col_countcustom' => 'grid_12 grid_not_responsive, grid_12, grid_6 push_6 last, grid_6 pull_6'
	);
	if($return){
		return $theme_settings;
	}
	if($install && is_admin() && current_user_can('manage_options') && current_user_can('edit_theme_options')){
		foreach($theme_settings as $k => $v){
			update_option($k, $v);
		}
		return true;
	}	
	if($uninstall && is_admin() && current_user_can('manage_options') && current_user_can('edit_theme_options')){
		foreach($theme_settings as $k => $v){
			delete_option($k);
		}
		return true;
	}
	return false;
}

/**
 * Opationally installs settings on theme activate.
 *
 * @return void
 */
function flow_theme_activate(){
	global $pagenow;
	if(is_admin() && $pagenow == 'themes.php' && isset($_GET['activated'])){
		if(!get_option("flowessencethemeactivated")){
			flow_install_theme_settings(true, false, false);
		}
		wp_redirect(admin_url("admin.php?page=sub-page42"));
		exit();
	}
}
add_action('after_setup_theme', 'flow_theme_activate');

/**
 * 1. Deletes content.
 * 2. Imports demo content.
 * 3. Does this if 'flow_hide_install_demo' option doesn't contain the theme name yet and if user clicks "Install" button on the 'flow_auto_install_notice' notice.
 *
 * @return void
 */
function flow_auto_install_admin_init() {
	global $pagenow;

	function flow_delete_everything(){
	
		// Delete posts, pages, custom post types
		$post_types = get_post_types('', 'names');
		//unset($post_types['attachment']);
		$query = new WP_Query(array( 'post_status' => 'any', 'post_type' => $post_types, 'posts_per_page' => '-1' ));
		if($query->have_posts()){
			while($query->have_posts()){
				$query->the_post();
				$postid = get_the_ID();
				//echo 'Deleting... ' . $postid . ' (' . get_post_type($postid) . ')<br>';
				$force_delete = true;
				wp_delete_post( $postid, $force_delete );
			}
		}
		
		// Delete theme mods (nav_menu_locations, sidebars_widgets (backup sidebars for this theme that are restored when theme is re-activated, not in the current sidebars and widgets DB table), header color etc.)
		remove_theme_mods();
		
		// Delete menus
		$menu_list = wp_get_nav_menus();
		foreach($menu_list as $menu){
			wp_delete_nav_menu($menu->term_id);
		}
		
		// Delete categories
		$taxonomies = get_taxonomies('','names');
		$terms = get_terms($taxonomies, 'hide_empty=0');

		foreach($terms as $term){
			if(is_object($term) && $term->taxonomy != 'link_category' && $term->taxonomy != 'post_format' && $term->taxonomy != 'nav_menu'){
				if((is_object($term) &&  $term->taxonomy == 'category') && ($term->term_id == 1 || $term->term_taxonomy_id == 1)){
				}else{
					wp_delete_term($term->term_id, $term->taxonomy);
				}
			}
		}
		return;
	}
	
	function flow_import_everything(){
	
		// Load Importer API
		require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . 'wordpress-importer.php';
		
		if ( class_exists( 'WP_Import' ) ) {
		
			// Import demo posts, pages, menus, projects etc.
			$importer = new WP_Import;
			$file = dirname(__FILE__) . DIRECTORY_SEPARATOR . 'daishowordpresstheme.wordpress.2013-02-15.xml';
			$importer->flow_import($file);
			
			// Install demo settings
			flow_install_theme_settings(true, false, false);
			
			// Import Sidebars & Widgets
			$demo_widget_text = array(
				4 => array(
					'title' => 'Sidebar Heading',
					'text' => 'Search advertising focuses competitor, relying on insider information. Visualization of the concept of weakly transmits the consumer market, optimizing budgets.',
					'filter' => false,
				) ,
				5 => array(
					'title' => false,
					'text' => '<hr><div class="footer-client-logos"><img src="http://themes.devatic.com/daisho/wp-content/uploads/2012/09/client1.png" alt=""><img src="http://themes.devatic.com/daisho/wp-content/uploads/2012/09/client2y.png" alt=""><img src="http://themes.devatic.com/daisho/wp-content/uploads/2012/09/client3.png" alt=""> <img src="http://themes.devatic.com/daisho/wp-content/uploads/2012/09/client4.png" alt=""><img src="http://themes.devatic.com/daisho/wp-content/uploads/2012/09/client5.png" alt=""></div>',
					'filter' => false,
				) ,
				8 => array(
					'title' => false,
					'text' => '<hr>',
					'filter' => false,
				) ,
				10 => array(
					'title' => '',
					'text' => '<ul class="footer-social-icons"><li><a href="http://devatic.com/">y</a></li><li><a href="http://devatic.com/">t</a></li><li><a href="http://devatic.com/">s</a></li><li><a href="http://devatic.com/">f</a></li><li><a href="http://devatic.com/">m</a></li><li><a href="http://devatic.com/">r</a></li><li><a href="http://devatic.com/">l</a></li> </ul>',
					'filter' => false,
				) ,
				11 => array(
					'title' => false,
					'text' => '<div class="copyright_notice">&copy; 2013 Daisho Systems. All Rights Reserved.</div>',
					'filter' => false,
				) ,
				'_multiwidget' => 1,
			);
			update_option( 'widget_text', $demo_widget_text );
			
			$demo_widget_categories = array ( 2 => array ( 'title' => 'Categories', 'count' => 0, 'hierarchical' => 0, 'dropdown' => 0, ), '_multiwidget' => 1, );
			update_option( 'widget_categories', $demo_widget_categories );
			
			//$demo_widget_search = array ( 2 => array ( 'title' => 'Search', ), '_multiwidget' => 1, );
			//update_option( 'widget_search', $demo_widget_search );
			
			$demo_widget_nav_menu = array ( 2 => array ( 'title' => 'Pages', 'nav_menu' => 32, ), '_multiwidget' => 1, );
			update_option( 'widget_nav_menu', $demo_widget_nav_menu );
			
			$demo_widget_tag_cloud = array ( 2 => array ( 'title' => false, 'taxonomy' => 'post_tag', ), '_multiwidget' => 1, );
			update_option( 'widget_tag_cloud', $demo_widget_tag_cloud );
			
			$demo_sidebars = array ( 'wp_inactive_widgets' => array ( ), 'sidebar-1' => array ( 0 => 'nav_menu-2', 1 => 'text-4', 2 => 'categories-2', 3 => 'tag_cloud-2', ), 'flow-footer-1' => array ( 0 => 'text-5', ), 'flow-footer-2' => array ( 0 => 'text-8', ), 'flow-footer-3' => array ( 0 => 'text-10', ), 'flow-footer-4' => array ( 0 => 'text-11', ) );
			update_option( 'sidebars_widgets', $demo_sidebars );

			// Attach menus
			$menu_obj = get_terms( 'nav_menu' );
			$menu_locations = get_nav_menu_locations();
			if(is_array($menu_obj) && !empty($menu_obj)){
				foreach($menu_obj as $single_menu){
					if($single_menu->slug == 'main-menu'){
						$menu_locations['main_menu'] = $single_menu->term_id;
					}
					if($single_menu->slug == 'mobile-menu'){
						$menu_locations['mobile_menu'] = $single_menu->term_id;
					}
				}
				set_theme_mod( 'nav_menu_locations', $menu_locations );
			}
		}
	}
	
	$template = get_option( 'template' );
	if(!empty($_GET['flow_install_demo']) && (get_option( 'flow_hide_install_demo' ) !== $template) && current_user_can('manage_options') && current_user_can('edit_files') && current_user_can('delete_others_pages') && current_user_can('delete_others_posts') && current_user_can('import')){
		flow_delete_everything();
		flow_import_everything();
		
		// Flush rules after install
		flush_rewrite_rules();

		update_option( 'flow_hide_install_demo', $template );
	}
}
add_action('admin_init', 'flow_auto_install_admin_init');
?>