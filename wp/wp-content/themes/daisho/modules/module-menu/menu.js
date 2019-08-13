jQuery(document).ready(function(){
	jQuery('#mobile_menu').change(function(e){
		window.location = jQuery(this).val();
	})
	jQuery('#mobile_menu .mob-sub').hide();
	
	jQuery('.menu-item-has-submenu > a').on('mouseover', function(){
		var windowWidth = jQuery(window).width();
		
		var hoveredItemWidth = jQuery(this).parent().parent().width();
		var subMenuWidth = jQuery(this).next('ul').width();
		var subMenuOffset = jQuery(this).offset();
		
		var tt = hoveredItemWidth + subMenuWidth + subMenuOffset.left;

		if(tt >= windowWidth){
			jQuery(this).next('ul').addClass('menu-hover-left');
		}else if(subMenuOffset.left <= 0){
			//jQuery(this).next('ul').removeClass('menu-hover-left');
		}else{
		}
	});
	
	jQuery(window).on('resize', function(){
		if(jQuery('.sub-menu').hasClass('menu-hover-left')){
			jQuery('.sub-menu').removeClass('menu-hover-left');
		}
		if(jQuery('#menu > .menu-item-has-submenu > ul').hasClass('menu-reversed')){
			jQuery('#menu > .menu-item-has-submenu > ul').removeClass('menu-reversed');
		}
	});
	
	jQuery('#menu > .menu-item-has-submenu').on('hover.subMenuLeftOrRightTab', function(){
		subMenuLeftOrRightTab();
	});
});

function subMenuLeftOrRightTab(){
	var windowWidth, subMenuWidth, subMenuOffset, subMenuPosition;
	
	windowWidth = jQuery(window).width();
	
	jQuery('#menu > .menu-item-has-submenu > ul').each(function(){
		subMenuWidth = jQuery(this).width();
		subMenuOffset = jQuery(this).offset();
		subMenuPosition = subMenuWidth + subMenuOffset.left;
		
		if(subMenuPosition >= windowWidth){
			jQuery(this).addClass('menu-reversed');
		}else{
		}
	});
}