<?php
function add_footer_menu(){

    // must check that the user has the required capability 
    if (!current_user_can('manage_options')){
		wp_die(__('You do not have sufficient permissions to access this page.', 'flowthemes'));
    }

    // variables for the field and option names
	$hidden_field_name = 'mt_submit_hidden';
	
    $opt_name = 'analytics_code';
    $data_field_name = 'custom_css_style';
	$opt_name2 = 'footer_col_countcustom';
    $data_field_name2 = 'footer_col_countcustom';
	$opt_name4 = 'footer_aff_link';
    $data_field_name4 = 'footer_aff_link';

    // Read in existing option value from database
    $opt_val = stripslashes(get_option( $opt_name ));
    $opt_val2 = get_option( $opt_name2 );
    $opt_val4 = get_option( $opt_name4 );

    // See if the user has posted us some information
    // If they did, this hidden field will be set to 'Y'
    if(isset($_POST[$hidden_field_name]) && $_POST[$hidden_field_name] == 'Y'){
        // Read their posted value
        $opt_val = stripslashes($_POST[$data_field_name]);
        $opt_val2 = $_POST[ $data_field_name2 ];
        $opt_val4 = $_POST[ $data_field_name4 ];

        // Save the posted value in the database
        update_option( $opt_name, $opt_val );
        update_option( $opt_name2, $opt_val2 );
        update_option( $opt_name4, $opt_val4 );

        // Put an settings updated message on the screen
?>
<div class="updated"><p><strong><?php _e('Settings Saved', 'flowthemes' ); ?></strong></p></div>
<?php } ?>
<div class="wrap">
	<h2><?php _e('Footer Settings', 'flowthemes'); ?></h2>
	<form name="form-footer-analytics" method="post" action="">
		<input type="hidden" name="<?php echo $hidden_field_name; ?>" value="Y">
		<table class="form-table flow-admin-table">
			<tr valign="top">
				<th scope="row" style="width: 12%;"><?php _e('Footer columns', 'flowthemes'); ?></th>
				<td>
					<textarea style="width: 100%;" rows="6" cols="70" name="<?php echo $data_field_name2; ?>"><?php echo $opt_val2; ?></textarea>
					<p><?php _e('Put here a list of comma-separated CSS classes to create footer columns and widget areas. For instance if you\'d like to create 4 equal columns (25% each) you would use: <code>grid_3,grid_3,grid_3,grid_3 last</code>. To create 3 columns (33% each) you would use <code>grid_4,grid_4,grid_4 last</code>. Each column is 8.(3)% wide. When you create a column, new widget area is created with <code>flow-footer-ID</code> ID (where ID is a number like 1, 2, 3 etc.). You can add widgets under [Appearance > Widgets]. Please refer to the <a href="http://docs.devatic.com/daisho/#footer" target="_blank">Footer Guide</a>.<br><br>Default: <code>grid_12 grid_not_responsive, grid_12, grid_6 push_6 last, grid_6 pull_6</code>', 'flowthemes'); ?></p>
				</td>
			</tr>
				
			<tr valign="top">
				<th scope="row" style="width: 12%;"><?php _e('Custom Footer Code', 'flowthemes'); ?></th>
				<td id="custom_css">
					<textarea id="custom_css_style" rows="6" cols="50" name="<?php echo $data_field_name; ?>"><?php echo stripslashes($opt_val); ?></textarea>
					<dl>
						<dt><?php _e('You may put here any code (HTML or JS) that should appear just before &lt;/body&gt; tag. Adding &lt;script&gt; tag is necessary in case of JS. Usage: <code>&lt;script&gt;code goes here&lt;/script&gt;</code>.', 'flowthemes'); ?></dt>
					</dl>
					<dl>
						<dt><?php _e('<a href="javascript:autoFormatSelection()">Autoformat Selected</a> - Select entire code and click this to clean it.', 'flowthemes'); ?></dt>
						<dt><?php _e('<a href="javascript:commentSelection(true)">Comment Selected</a> - Select a part of code and click this to comment it out.', 'flowthemes'); ?></dt>
						<dt><?php _e('<a href="javascript:commentSelection(false)">Uncomment Selected</a> - Select a part of commented out code and click this to uncomment.', 'flowthemes'); ?></dt>
					</dl>
					<dl>
						<?php _e('<dt>Matches Highlighter</dt><dd>Matches of selected text will highlight on select.</dd>', 'flowthemes'); ?>
						<?php _e('<dt>Ctrl-F / Cmd-F</dt><dd>Start searching</dd>', 'flowthemes'); ?>
						<?php _e('<dt>Ctrl-G / Cmd-G</dt><dd>Find next</dd>', 'flowthemes'); ?>
						<?php _e('<dt>Shift-Ctrl-G / Shift-Cmd-G</dt><dd>Find previous</dd>', 'flowthemes'); ?>
						<?php _e('<dt>Shift-Ctrl-F / Cmd-Option-F</dt><dd>Replace</dd>', 'flowthemes'); ?>
						<?php _e('<dt>Shift-Ctrl-R / Shift-Cmd-Option-F</dt><dd>Replace all</dd>', 'flowthemes'); ?>
						<?php _e('<dt>F11</dt><dd>Press F11 when cursor is in the editor to toggle full screen editing.</dd>', 'flowthemes'); ?>
						<?php _e('<dt>Esc</dt><dd>Esc can also be used to exit full screen editing.</dd>', 'flowthemes'); ?>
						<!-- <dt>Auto-close/complete</dt><dd>Type an html tag.  When you type '>' or '/', the tag will auto-close/complete.  Block-level tags will indent.</dd> -->
					</dl>
				</td>
			</tr>
		</table>
		<p class="submit" style="clear: both; float: left;"><input type="submit" name="Submit" class="button-primary" value="<?php esc_attr_e('Save Changes', 'flowthemes') ?>" /></p>
	</form>
</div>
<?php } ?>