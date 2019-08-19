<?php
function flow_default_post_content($post_content, $post){
    if($post->post_type){
		switch($post->post_type){
			case 'page':
				$post->comment_status = 'closed';
				$post->ping_status = 'closed';
				break;
		}
	}
    return $post_content;
}
add_filter('default_content', 'flow_default_post_content', 10, 2);
?>