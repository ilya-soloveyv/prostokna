<?php
	function hashCacheList($list){
		$cachestr = "";
		foreach($list as $scloader_key => $scloader_value){
			$cachestr .= $scloader_key.(($scloader_value && is_array($scloader_value)) ? $scloader_value[0] : "");
		}
		return md5($cachestr);
	}
	/* $disabledFiles = get_option('flow_disabled_files');
	if(is_array($disabledFiles)){
		
	}else{
		$disabledFiles = array();
	} */
	//if((!is_admin() || stristr($_SERVER['REQUEST_URI'], 'admin-ajax')) && !stristr($_SERVER['REQUEST_URI'], 'wp-login')){
	if((!stristr($_SERVER['REQUEST_URI'], 'admin-ajax')) && !stristr($_SERVER['REQUEST_URI'], 'wp-login')){
	
		$abs_path = TEMPLATEPATH . '/modules/';
		$rel_path = get_bloginfo('template_directory') . '/modules/';
		$scloader_csscachelist = array();
		$scloader_cssCachingEnabled = true;
		$jsCachingEnabled = true;
		$files = scandir( $abs_path );
		
		for($i = 0; $i< count($files); $i++){
			if($files[$i] != "." && $files[$i] != ".." && $files[$i] != "loader.php" && $files[$i] != "stylecache.css"){ //
				if(is_dir( $abs_path . $files[$i])){
					$files_sub = scandir( $abs_path . $files[$i] . '/' );
					for($j=0;$j<count($files_sub);$j++){
						if($files_sub[$j] != "." && $files_sub[$j] != ".."){
							if(!is_dir( $abs_path . $files[$i]."/".$files_sub[$j])){
								$scloader_scnameelex = explode(".", $files_sub[$j]);
								$scloader_scnameelex_ext = $scloader_scnameelex[count($scloader_scnameelex )-1];
								if($scloader_scnameelex_ext == "php"){
									//require_once( $abs_path . $files[$i]."/".$files_sub[$j]);
									require_once(dirname(__FILE__).'/'.$files[$i]."/".$files_sub[$j]);
								}else if($scloader_scnameelex_ext == "css"){
									//wp_register_style(md5( $rel_path . $files[$i]."/".$files_sub[$j]),  $rel_path . $files[$i]."/".$files_sub[$j]);
									//wp_enqueue_style(md5( $rel_path . $files[$i]."/".$files_sub[$j]));
									$scloader_csscachelist[ $rel_path . $files[$i]."/".$files_sub[$j]] = false;
									if($scloader_cssCachingEnabled && is_readable(dirname(__FILE__)."/".$files[$i]."/".$files_sub[$j])){
										$scloader_filemoddate = @filemtime(dirname(__FILE__)."/".$files[$i]."/".$files_sub[$j]);
										if($scloader_filemoddate){
											$scloader_csscachelist[ $rel_path . $files[$i]."/".$files_sub[$j]] = array($scloader_filemoddate, dirname(__FILE__)."/".$files[$i]."/".$files_sub[$j], $files[$i]);
										}else{
											$scloader_cssCachingEnabled = false;
										}
									}else{
										$scloader_cssCachingEnabled = false;
									}
								}else if($scloader_scnameelex_ext == "js"){
									//wp_register_script(md5( $rel_path . $files[$i]."/".$files_sub[$j]),  $rel_path . $files[$i]."/".$files_sub[$j], array("jquery"));
									//wp_enqueue_script(md5( $rel_path . $files[$i]."/".$files_sub[$j]));
									
									$jscachelist[ $rel_path . $files[$i]."/".$files_sub[$j]] = false;
									if($jsCachingEnabled && is_readable(dirname(__FILE__)."/".$files[$i]."/".$files_sub[$j])){
										$scloader_filemoddate = @filemtime(dirname(__FILE__)."/".$files[$i]."/".$files_sub[$j]);
										if($scloader_filemoddate){
											$jscachelist[ $rel_path . $files[$i]."/".$files_sub[$j]] = array($scloader_filemoddate, dirname(__FILE__)."/".$files[$i]."/".$files_sub[$j], $files[$i]);
										}else{
											$jsCachingEnabled = false;
										}
									}
								}
							}
						}
					}
				}else{
					$scloader_scnameex = explode(".", $files[$i]);
					if($scloader_scnameex[count($scloader_scnameex )-1] == "php"){
						require_once( $abs_path . $files[$i]);
					}
				}
			}
		}
		if($scloader_cssCachingEnabled){
			$csscachelisthash = hashCacheList($scloader_csscachelist);
			if(!file_exists(dirname(__FILE__)."/stylecache.css") || $csscachelisthash != get_option('flow_shortcodescsscachehash')){
				$fcachehandle = @fopen(dirname(__FILE__)."/stylecache.css","w");
				if($fcachehandle){
					foreach($scloader_csscachelist as $scloader_key => $scloader_value){
						//$fsrctmp = fread(fopen($scloader_value[1],"r"),filesize($scloader_value[1]));
						$fsrctmp = file_get_contents($scloader_value[1]);
						$fsrctmp = preg_replace('/url\(([\'"]?)/i','url(\1'.$scloader_value[2].'/',$fsrctmp);
						fwrite($fcachehandle, $fsrctmp."\n");
					}
					fclose($fcachehandle);
					update_option('flow_shortcodescsscachehash', $csscachelisthash);
				}else{
					$scloader_cssCachingEnabled = false;
				}
			}
			if($scloader_cssCachingEnabled && !is_admin()){
				wp_register_style("shortcodesstylecache", $rel_path . '/stylecache.css');
				wp_enqueue_style("shortcodesstylecache");
			}
		}
		if(!$scloader_cssCachingEnabled && !is_admin()){
			foreach($scloader_csscachelist as $scloader_key => $scloader_value){
				wp_register_style(md5($scloader_key), $scloader_key);
				wp_enqueue_style(md5($scloader_key));
			}
		}
		
		if($jsCachingEnabled){
			$jscachelisthash = hashCacheList($jscachelist);
			if(!file_exists(dirname(__FILE__)."/jscache.js") || $jscachelisthash != get_option('flow_shortcodesjscachehash')){
				$fcachehandle = @fopen(dirname(__FILE__)."/jscache.js","w");
				if($fcachehandle){
					foreach($jscachelist as $scloader_key => $scloader_value){
						//$fsrctmp = fread(fopen($scloader_value[1],"r"),filesize($scloader_value[1]));
						$fsrctmp = file_get_contents($scloader_value[1]);
						$fsrctmp = preg_replace('/url\(([\'"]?)/i','url(\1'.$scloader_value[2].'/',$fsrctmp);
						fwrite($fcachehandle, $fsrctmp."\n");
					}
					fclose($fcachehandle);
					update_option('flow_shortcodesjscachehash', $jscachelisthash);
				}else{
					$jsCachingEnabled = false;
				}
			}
			if($jsCachingEnabled && !is_admin()){
				wp_register_script("shortcodesjscache", $rel_path . '/jscache.js', array("jquery"), false, true);
				wp_enqueue_script("shortcodesjscache");
			}
		}
		if(!$jsCachingEnabled && !is_admin()){
			foreach($jscachelist as $scloader_key => $scloader_value){
				wp_register_script(md5($scloader_key), $scloader_key, array("jquery"), false, true);
				wp_enqueue_script(md5($scloader_key));
			}
		}
	}
?>