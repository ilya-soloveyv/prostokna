<?php
/* add_action('admin_menu', 'about_menu_remove');
function about_menu_remove(){
	remove_submenu_page('brisk-mainmenu', 'sub-page42');
} */
function add_about_menu(){
    if (!current_user_can('manage_options')){
		wp_die( __('You do not have sufficient permissions to access this page.', 'flowthemes') );
    }
?>
<div class="wrap">
	<h2></h2>
	<div class="flow-welcome-panel">
		<div style=" float: left; position: relative; width: 173px;">
			<img src="<?php bloginfo('template_directory'); ?>/screenshot.png" alt="" style="float: left; width: 173px;" />
			<p style="float: left; text-align: center; width: 100%;" class="description">
			<?php
				if(function_exists('wp_get_theme')){
					$my_theme = wp_get_theme();
					printf(__('%1$s is version %2$s', 'flowthemes'), $my_theme->Name, $my_theme->Version);
				}
			?>
			</p>
		</div>
		<div class="flow-welcome-panel-content">
			<h3><?php _e('Welcome to Daisho!', 'flowthemes'); ?></h3>
			<p class="flow-about-description"><?php _e('You are running Daisho theme. If you need help getting started, check out <a href="http://docs.devatic.com/daisho/" target="_blank">the documentation</a>. To begin with, below you will find some information about the first steps. If you need help or more information on how to setup and use your website please visit <a href="http://support.forcg.com/" target="_blank">our support forum</a>.', 'flowthemes'); ?></p>
			<div class="flow-welcome-panel-column-container">
				<div class="flow-welcome-panel-column">
					<h4><span class="icon16 icon-settings"></span> <?php _e('Demo Setup', 'flowthemes'); ?></h4>
					<?php _e('<p>The theme without any content will display only a text logo. When you first activate the theme on a fresh installation of WordPress, you\'ll have an opportunity to install the demo content.</p><p><b>"Install Demo"</b> button will delete all posts, pages, media, menus and other settings and will import demo setup. You can also use the "Clean Database" button if you ever decide to delete everything and start over. You can <a href="http://docs.devatic.com/daisho/#installingTheTheme" target="_blank">install the demo content</a> manually as well.</p>', 'flowthemes'); ?>
				</div>
				<div class="flow-welcome-panel-column">
					<h4><span class="icon16 icon-page"></span> <?php _e('Add Real Content', 'flowthemes'); ?></h4>
					<p><?php _e('Once the demo content is there, please check out sample pages, posts, portfolio projects and editors to see how it all works, then delete the default content and write your own!', 'flowthemes'); ?></p>
					<ul>
						<li><?php printf(__('View your <a href="%s/wp-admin/edit.php?post_type=page" target="_blank">pages</a> and <a href="%s/wp-admin/edit.php" target="_blank">blog posts</a>', 'flowthemes'), site_url(), site_url()); ?></li>
						<li><?php printf(__('View your <a href="%s/wp-admin/edit.php?post_type=portfolio" target="_blank">portfolio projects</a> and <a href="%s/wp-admin/edit.php?post_type=slideshow" target="_blank">slideshow slides</a>', 'flowthemes'), site_url(), site_url()); ?></li>			
						<li><?php _e('Go ahead and edit the demo content or remove it and add your own!', 'flowthemes'); ?></a></li>
					</ul>
				</div>
				<div class="flow-welcome-panel-column flow-welcome-panel-last">
					<h4><span class="icon16 icon-appearance"></span> <?php _e('Customize Your Site', 'flowthemes'); ?></h4>
					<p><?php _e('Daisho offers some customization options and there are a couple of resources to help you modify it. Here are a few ways to make your site look unique.', 'flowthemes'); ?></p>			
					<ul>
						<li><a href="<?php echo site_url(); ?>/wp-admin/admin.php?page=sub-page41" target="_blank"><?php _e('Styling Tool', 'flowthemes'); ?></a></li>
						<li><a href="http://docs.devatic.com/daisho/#customModifications" target="_blank"><?php _e('Custom Modifications', 'flowthemes'); ?></a></li>
						<li><a href="http://support.forcg.com/topic/daisho-common-changes" target="_blank"><?php _e('Daisho Common Changes', 'flowthemes'); ?></a></li>
					</ul>
					<p><?php _e('If you need more complex changes, our support forum is divided into two sections:', 'flowthemes'); ?></p>
					<table class="form-table about-table">
						<tr>
							<th><strong><?php _e('Support', 'flowthemes'); ?></strong></th>
							<th><strong><?php _e('Hire a Developer', 'flowthemes'); ?></strong></th>
						</tr>
						<tr>
							<td><?php _e('Installation, configuration, general questions, bug reports, suggestions', 'flowthemes'); ?></td>
							<td><a href="http://docs.devatic.com/daisho/index.html#customModifications" target="_blank"><?php _e('Custom Modifications', 'flowthemes'); ?></a></td>
						</tr>
						<tr>
							<td><?php _e('Go ahead and <a href="http://support.forcg.com/forum/daisho" target="_blank">let us know</a> if you have any questions!', 'flowthemes'); ?></td>
							<td><?php _e('<a href="http://support.forcg.com/forum/hire-developer" target="_blank">Find a developer</a> to configure the website for you or do custom code modifications!', 'flowthemes'); ?></td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
	<div style="margin: 0 8px 20px; padding: 0 10px 20px; line-height: 160%; font-size: 14px; color: #464646;">
		<div style="width: 30%; margin-right: 2%; float: left;">
			<?php if(current_user_can('manage_options')){
				$hidden_field_name2 = 'clean_submit_hidden';
				if(isset($_POST[ $hidden_field_name2 ]) && $_POST[ $hidden_field_name2 ] == 'Y'){
					check_admin_referer("flow_clean_nonce_security");
					if(flow_install_theme_settings(false, false, true)){
						echo '<div class="update-nag">Settings were removed!</div>';
					}
				}
				?>
				<h2><?php _e('Utilities', 'flowthemes'); ?></h2>
				<script type="text/javascript">
					jQuery(document).ready(function(){
						jQuery('#form-delete-database').on('submit', function(){
							return confirm("<?php _e('Do you really want to remove all theme settings from database? This can not be undone.', 'flowthemes'); ?>");
						});
					});
				</script>
				<div>
					<?php _e('<strong>Delete all theme settings from the database</strong><p>When you deactivate theme, settings aren\'t removed - just in case you wanted to re-activate it. To permanently remove them please click this button. This can not be undone. Demo settings will import again once you re-activate the theme. This does not remove posts, their meta data, pages, projects, media library items etc. It only removes theme settings.</p>', 'flowthemes'); ?>
					<form id="form-delete-database" name="form-delete-database" method="post" action="">
						<?php wp_nonce_field("flow_clean_nonce_security"); ?>
						<input type="hidden" name="<?php echo $hidden_field_name2; ?>" value="Y">
						<input type="submit" name="Submit" class="button-primary" value="<?php esc_attr_e('Clean Database', 'flowthemes') ?>" />
					</form>
				</div>
			<?php } ?>
		</div>
		<div style="width: 30%; margin-right: 2%; float: left;">
			<h2><?php _e('Information', 'flowthemes'); ?></h2>
			<ul class="flow-settings-checklist">
				<?php
				try{
					$max_upload = ini_get('upload_max_filesize');
					$max_post = ini_get('post_max_size');
					$memory_limit = ini_get('memory_limit');
					$max_execution_time = ini_get('max_execution_time');
					
					global $wp_version;
				?>
					
					<li><?php printf(__('Max Upload File Size Limit is set to <strong>%s</strong> - sets an upper limit on the size of uploaded files.', 'flowthemes'), $max_upload); ?></li>
					<li><?php printf(__('Max PHP POST Size Limit is set to <strong>%s</strong> - it limits the total size of posted data, including file data.', 'flowthemes'), $max_post); ?></li>
					<li><?php printf(__('PHP Memory Limit is set to <strong>%s</strong>.', 'flowthemes'), $memory_limit); ?></li>
					<li><?php printf(__('Max Execution Time is set to <strong>%s</strong>.', 'flowthemes'), $max_execution_time); ?></li>
					<li>
						<?php printf(__('Current PHP version: <strong>%s</strong>', 'flowthemes'), phpversion()); ?>
						<?php if(version_compare(PHP_VERSION, '5.2.4', '<')){ echo '<span style="color: #dd0000; font-weight: bold; font-size: 11px;">(Files require PHP 5.2.4 or greater!)</span>'; } ?>
					</li>
					<li>
						<?php printf(__('Current WP version: <strong>%s</strong>', 'flowthemes'), $wp_version); ?>
						<?php if(version_compare($wp_version, '3.4', '<')){ echo '<span style="color: #dd0000; font-weight: bold; font-size: 11px;">(Files require WordPress 3.4 or greater!)</span>'; } ?>
					</li>
				<?php }catch(Exception $e){} ?>
			</ul>
		</div>
		<div style="width: 30%; float: left; line-height: 160%; font-size: 14px; color: #464646;">
			<h2>Automatic Updates</h2>
			<p>This theme supports "one click" automatic updates. To take advantage of that feature please fill in your support forum username and password under [Daisho > General]. To update your theme please go to [Dashboard > Updates]. Please also check our <a href="http://docs.devatic.com/daisho/#updatingTheTheme" target="_blank">Updating Guide</a>.</p>
			<p><b>Currently Installed Version:</b> <?php echo $my_theme->Version; ?></p>
			<?php $theme_server_version = unserialize(getRemote_version()); ?>
			<?php if(!empty($theme_server_version)){ ?>
				<p><b>Version on Update Server:</b> <?php echo $theme_server_version->version; ?> (date: <?php echo $theme_server_version->date; ?>)</p>
			<?php } ?>
		</div>
	</div>
</div>
<?php } ?>