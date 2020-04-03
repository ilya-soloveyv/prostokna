<?php
	add_action('parse_query', 'register_flow_vars');
	function register_flow_vars(){
		/* Detect Demo Server */
		if($_SERVER['SERVER_NAME'] == 'themes.devatic.com'){
			$demoServer = true; 
		}else{ 
			$demoServer = false;
		}
		
		/* Tablet */
		if(strpos($_SERVER['HTTP_USER_AGENT'],'iPad') !== false){
			$ipad = true; 
		}else{
			$ipad = false;
		}
		
		if($ipad || (strstr($_SERVER['HTTP_USER_AGENT'],'Android') && !strstr($_SERVER['HTTP_USER_AGENT'],'Mobile'))){
			$tablet = true;
		}else{
			$tablet = false;
		}
		
		/* Mobile Phone */
		if(strstr($_SERVER['HTTP_USER_AGENT'], 'iPhone') || strstr($_SERVER['HTTP_USER_AGENT'], 'iPod') || (strstr($_SERVER['HTTP_USER_AGENT'], 'Android') && strstr($_SERVER['HTTP_USER_AGENT'], 'Mobile'))){
			$mobile = true; 
		}else{ 
			$mobile = false;
		}
		
		if(strpos($_SERVER['HTTP_USER_AGENT'], 'Android') !== false){
			$mobile_android = true; 
		}else{ 
			$mobile_android = false;
		}
		
		if(strstr($_SERVER['HTTP_USER_AGENT'],'MSIE')){ $ie = true; }
		if(strstr($_SERVER['HTTP_USER_AGENT'],'MSIE 6')){ $ie6 = true; }
		if(strstr($_SERVER['HTTP_USER_AGENT'],'MSIE 7')){ $ie7 = true; }
		if(strstr($_SERVER['HTTP_USER_AGENT'],'MSIE 8')){ $ie8 = true; }
		
		if(!$mobile && !$ipad){ $desktop = true; }
		
		$portfolio_mode = get_option('portfolio_mode'); /* 1 = thumbnail grid, 0 = classic */
		if(!empty($_GET['prj']) && $_GET['prj'] == 'classic'){ $portfolio_mode = 0; }
		if(!empty($_GET['prj']) && $_GET['prj'] == 'thumb'){ $portfolio_mode = 1; }
		
		if(($portfolio_mode == '1' && is_home()) || is_page_template('template-portoflio.php') || ($portfolio_mode == '1' && is_singular('portfolio'))){ /* THUMBNAIL VIEW */
			$daisho_portfolio = true;
			$daisho_classic = false;
		}else if(($portfolio_mode == '0' && is_home()) || ($portfolio_mode == '0' && is_singular('portfolio'))){ /* CLASSIC VIEW */
			$daisho_portfolio = false;
			$daisho_classic = true;
		}else{
			$daisho_portfolio = false;
			$daisho_classic = false;
		}
		
		$GLOBALS['mobile'] = $mobile;
		$GLOBALS['mobile_android'] = $mobile_android;
		$GLOBALS['ipad'] = $ipad;
		$GLOBALS['tablet'] = $tablet;
		$GLOBALS['desktop'] = $desktop;
		$GLOBALS['demoServer'] = $demoServer;
		$GLOBALS['ie'] = $ie;
		$GLOBALS['ie6'] = $ie6;
		$GLOBALS['ie7'] = $ie7;
		$GLOBALS['ie8'] = $ie8;
		$GLOBALS['daisho_portfolio'] = $daisho_portfolio;
		$GLOBALS['daisho_classic'] = $daisho_classic;
	}
?>