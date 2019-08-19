<?php
	add_action('admin_head', 'flow_page_placeholder');
	function flow_page_placeholder(){
		$front_page_id = get_option('front_page');
		if(!empty($front_page_id)){
			echo '<style>#post-'.$front_page_id.' { background-color: #FFFFCC; } #post-'.$front_page_id.' .post-title strong:after { color: #999999; content: "'.__('(This page is a placeholder for front page)', 'flowthemes').'"; font-size: 11px; font-style: italic; font-weight: normal; text-decoration: none; margin-left: 10px;</style>';
		}
	}
?>