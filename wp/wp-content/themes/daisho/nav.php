<?php
if(is_single()){ ?>
<div class="navigation clearfix">
	<div class="alignright older_entries"><?php next_post_link('<div class="older_entries_text">%link </div><div class="older_entries_icon">></div>', __('Next', 'flowthemes')); ?></div>
	<div class="alignleft newer_entries"><?php previous_post_link('<div class="newer_entries_icon"><</div><div class="newer_entries_text"> %link</div>', __('Previous', 'flowthemes')); ?></div>
</div>
<?php }else if(is_page()){ ?>
	<?php if(wp_link_pages('echo=0')){ ?>
		<div class="navigation page-nav clearfix">
			<?php $args = array(
				'before'           => '<div class="page-nav-wrapper"><div class="page-nav-label">' . __('Pages:') . '</div>',
				'after'            => '</div>',
				'link_before'      => '<div class="page-nav-item">',
				'link_after'       => '</div>',
				'next_or_number'   => 'number',
				'nextpagelink'     => __('Next page'),
				'previouspagelink' => __('Previous page'),
				'pagelink'         => '%',
				'echo'             => 1
			); 
			wp_link_pages($args); ?>
		</div>
	<?php } ?>
<?php }else{
	$prev_link = get_previous_posts_link(__('&laquo; Older Entries'));
	$next_link = get_next_posts_link(__('Newer Entries &raquo;'));
	if($prev_link || $next_link){ ?>
		<div class="navigation clearfix">
			<?php if(function_exists('wp_pagenavi')){ wp_pagenavi(); }else{ ?>
				<?php if($next_link){ ?>
					<div class="alignright older_entries"><?php next_posts_link('<div class="older_entries_text">'.__('Older Entries ', 'flowthemes').'</div><div class="older_entries_icon">></div>'); ?></div>
				<?php } ?>
				<?php if($prev_link){ ?>
					<div class="alignleft newer_entries"><?php previous_posts_link('<div class="newer_entries_icon"><</div><div class="newer_entries_text">'.__(' Newer Entries', 'flowthemes').'</div>'); ?></div>
				<?php } ?>
			<?php } ?>
		</div>
	<?php }
} ?>