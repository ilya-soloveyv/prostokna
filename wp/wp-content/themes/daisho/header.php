<!DOCTYPE html>
<!--[if IE 7]>
<html class="no-js ie ie7" lang="ru"><![endif]-->
<!--[if IE 8]>
<html class="no-js ie ie8" lang="ru"><![endif]-->
<!--[if IE 9]>
<html class="no-js ie ie9" lang="ru"><![endif]-->
<!--[if gt IE 9]><!-->
<html class="no-js" lang="ru"><!--<![endif]-->
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta charset="<?php bloginfo('charset'); ?>" />
	<?php if($GLOBALS['tablet']){ ?>
		<meta name="viewport" content="width=980" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<!-- <meta name="apple-mobile-web-app-status-bar-style" content="black"> -->
		<meta name="apple-mobile-web-app-title" content="<?php bloginfo('name'); ?>">
		<link rel="apple-touch-icon-precomposed" href="<?php echo get_option('flow_mobile_app_icon'); ?>">
	<?php }else{ ?>
		<?php if($GLOBALS['mobile_android']){ // We need to detect this particular system because it behaves differently than iOS ?>
			<meta name="viewport" content="width=640, maximum-scale=0.5, initial-scale=0.5, minimum-scale=0.5" />
		<?php }else{ ?>
			<meta name="viewport" content="width=640, initial-scale=0.5" />
		<?php } ?>
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<!-- <meta name="apple-mobile-web-app-status-bar-style" content="black"> -->
		<meta name="apple-mobile-web-app-title" content="<?php bloginfo('name'); ?>">
		<link rel="apple-touch-icon-precomposed" href="<?php echo get_option('flow_mobile_app_icon'); ?>">
	<?php } ?>
	<title><?php
		if(is_singular() && ($flow_seo_title = get_post_meta($post->ID, 'flow_seo_title', true))){
			echo preg_replace('/\s+/', ' ', trim(esc_attr(strip_tags($flow_seo_title))));
		}else if(is_home()){
			//printf(_x('%s - Home', 'Homepage title', 'flowthemes'), get_bloginfo('name'));
			printf(__('%s - Home', 'flowthemes'), get_bloginfo('name'));
		}else if(is_category()){
			//printf(_x('Browsing the Category %s', 'Category page title', 'flowthemes'), wp_title(' ', false, ''));
			printf(__('Browsing the Category %s', 'flowthemes'), wp_title(' ', false, ''));
		}else if(is_archive()){
			//printf(_x('Browsing Archives of %s', 'Archives page title', 'flowthemes'), wp_title(' ', false, ''));
			printf(__('Browsing Archives of %s', 'flowthemes'), wp_title(' ', false, ''));
		}else if(is_search()){
			//printf(_x('Search Results for %s', 'Search page title', 'flowthemes'), esc_attr($s));
			printf(__('Search Results for %s', 'flowthemes'), esc_attr($s));
		}else if(is_404()){
			_e('404 - Page Not Found', 'flowthemes');
		}else{
			wp_title('-', true, 'right'); bloginfo('name');
		} ?></title>
	<link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="<?php bloginfo('rss2_url'); ?>" />
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
	<link rel="shortcut icon" type="image/x-icon" href="<?php $flow_favicon=get_option("flow_favicon"); print((($flow_favicon)?$flow_favicon:bloginfo('template_directory')."/images/favicon.ico")); ?>" />
	<!-- <link rel="stylesheet" type="text/css" media="screen" href="<?php //bloginfo('template_directory'); ?>/fonts.css" /> -->
	<link rel="stylesheet" type="text/css" media="screen" href="<?php bloginfo('stylesheet_url'); ?>" />
	<?php wp_head(); ?>
	<link href='http://fonts.googleapis.com/css?family=Dosis:400,800,700,600,500,300,200' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,800,800italic,700italic,700,600italic,600,400italic,300italic,300&amp;subset=latin,latin-ext' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Lato:400,700,400italic,900,300italic,300,100,700italic' rel='stylesheet' type='text/css'>

        <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,400&subset=latin,cyrillic-ext' rel='stylesheet' type='text/css'>

    <link href="/wp-content/themes/daisho/styles.css" rel="stylesheet"/>
    <link href="/wp-content/themes/daisho/jquery-ui-1.10.2.custom.css" rel="stylesheet"/>
    <link href="http://fonts.googleapis.com/css?family=Lobster&subset=latin,cyrillic" rel="stylesheet"/>

    <script src="/wp-content/themes/daisho/js/jquery-1.9.1.js"></script>
    <script src="/wp-content/themes/daisho/js/modernizr-2.6.2.js"></script>
    <script src="/wp-content/themes/daisho/js/jquery-ui-1.10.2.custom.min.js"></script>
    <script src="/wp-content/themes/daisho/js/jnice.js"></script>
    <script src="/wp-content/themes/daisho/js/jinit.js"></script>
    <script src="http://yandex.st/jquery/form/3.14/jquery.form.min.js"></script>
    <script src="/wp-content/plugins/calculate/calc.js"></script>


    <!-- Код запрета правой кнопки мыши !!!
    <script language=Javascript1.2> function ejs_nodroit() { alert('Что то пошло не так.. Попробуйте позже!');
    return(false); } document.oncontextmenu = ejs_nodroit; </script> -->



<script type="text/javascript" src="//vk.com/js/api/openapi.js?97"></script>

<script type="text/javascript">
  VK.init({apiId: 3736044, onlyWidgets: true});
</script>

</head>

	<!--[if lt IE 9]>
		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js" type="text/javascript"></script>
	<![endif]-->
	<!--[if IE]>
		<style type="text/css">
			.sidebar-left-shadow { border-left:1px solid #dcdcdc; }
			.sidebar-right-shadow { border-right:1px solid #dcdcdc; }
		</style>
	<![endif]-->
	
	<!--[if lt IE 9]>
	<script type="text/javascript">alert("<?php _e('It looks like your browser doesn\'t fully support HTML5 and CSS3. You need a recent version of Internet Explorer, Firefox, Chrome or Safari to display this website correctly.', 'flowthemes'); ?>");</script>
	<![endif]-->

	<?php
	/* This will return data of first found post on archives and search pages - to prevent that I use is_singular(). */
	if(is_singular() || is_home()){
		if(is_home()){
			$id = get_option('front_page');
		}else{
			$id = get_the_ID();
		}
		$page_image = get_post_meta($id, 'bg_image', true);
		$page_color = get_post_meta($id, 'bg_color', true);
		$page_repeat = get_post_meta($id, 'bg_repeat', true);
		$page_position = get_post_meta($id, 'bg_position', true);
		$page_attachment = get_post_meta($id, 'bg_attachment', true);
		$page_size = get_post_meta($id, 'bg_size', true);
		$page_fullscreen = get_post_meta($id, 'bg_fullscreen', true);
		$page_opacity = get_post_meta($id, 'bg_opacity', true);
		if($page_image){ $style_output = 'background-image: url("'.$page_image.'"); '; }
		if($page_color){ $style_output .= 'background-color: '.$page_color.'; '; }
		if($page_repeat){ $style_output .= 'background-repeat: '.$page_repeat.'; '; }
		if($page_position){ $style_output .= 'background-position: '.$page_position.'; '; }
		if($page_attachment){ $style_output .= 'background-attachment: '.$page_attachment.'; '; }
		if($page_size){ $style_output .= 'background-size: '.$page_size.'; '; }
		if(!empty($style_output) && empty($page_fullscreen)){ print("<style type=\"text/css\">body{ ".$style_output."}</style>"); }
	}
	?>

	<?php
	$custom_css_style = get_option("custom_css_style");
	if($custom_css_style){
		print("<style type=\"text/css\">".stripslashes($custom_css_style)."</style>");
	}
	?>
	<script type="text/javascript">
		jQuery(document).ready(function(){
			jQuery('body').addClass('body-visible');
		});
	</script>

        <noindex><script async src="data:text/javascript;charset=utf-8;base64,ZnVuY3Rpb24gbG9hZHNjcmlwdChlLHQpe3ZhciBuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNjcmlwdCIpO24uc3JjPSIvL2xwdHJhY2tlci5ydS9hcGkvIitlO24ub25yZWFkeXN0YXRlY2hhbmdlPXQ7bi5vbmxvYWQ9dDtkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKG4pO3JldHVybiAxfXZhciBpbml0X2xzdGF0cz1mdW5jdGlvbigpe2xzdGF0cy5zaXRlX2lkPTU5NTQ7bHN0YXRzLnJlZmVyZXIoKX07dmFyIGpxdWVyeV9sc3RhdHM9ZnVuY3Rpb24oKXtqUXN0YXQubm9Db25mbGljdCgpO2xvYWRzY3JpcHQoInN0YXRzX2F1dG8uanMiLGluaXRfbHN0YXRzKX07bG9hZHNjcmlwdCgianF1ZXJ5LTEuMTAuMi5taW4uanMiLGpxdWVyeV9sc3RhdHMp"></script></noindex>

</head>

<?php $class = array('responsive'); ?>
<body class="main_page">
<?php do_action('flow_after_body_open'); ?>
<div class="header-search-form"><?php get_template_part('searchform', 'header'); ?></div>

<?php if(!empty($page_fullscreen) && !empty($page_image)){ ?>
	<script type="text/javascript">
		jQuery(window).load(function(){
			resizeimageslide(jQuery("#myimage_original"),false,false);
			jQuery(window).resize(function(){
				resizeimageslide(jQuery("#myimage_original"),false,false);
			});
		});
	</script>
	<img src="<?php echo $page_image; ?>" alt="" id="myimage_original" style="<?php if($page_opacity or $page_opacity == 0){ echo 'opacity:'.$page_opacity.';'; } ?>">
<?php } ?>

<body class="main_page">
<!--// wrapper //-->
<div class="wrapper">
    <div class="inner">
        <!--// header //-->
        <header class="header">


<!--<div class="ask-adfg">
<div class="title">Внимание!</div>
<p>Дорогие клиенты, 05.10.2013, наша компания работать не будет в связи с техническими проблемами.
<br>
<strong>Принимаются заявки на расчеты по формам на сайте, а также по электронной почте.</strong>
<br>
Для тех, кто уже стал нашими клиентами, будет работать горячая линия по телефону 89067810801, а также по электронной почте <a href="mailto:prosto@prostokna.ru">prosto@prostokna.ru</a>
<strong>Приносим свои извинения за доставленные неудобства.</strong>
</p>
</div>-->


	<div class="logo2">
                <a title="Просто Окна" href="http://prostokna.ru" style="float: left; margin-top: 8px;"><img src="/wp-content/themes/daisho/images/logo.png" alt="Просто Окна"></a>
		<a class="link" href="/">просто<br/> окна</a>
            </div>

            <nav class="nav">
                <ul class="s ibs list">
                    <li class="item"><a class="link" href="#"></a>
			<a href="/warranties">
			<div class="nav-icon-block">
			<div class="nav-icon">
			<img src="/wp-content/uploads/2013/07/nav-icon-1.png">
			</div>
			<p>Гарантия</p>
			</div>
			</a>
		    </li>
                    <li class="item"><a class="link" href="#"></a>
			<a href="/#anchor_calc">
			<div class="nav-icon-block">
			<div class="nav-icon">
			<img src="/wp-content/uploads/2013/07/nav-icon-2.png">
			</div>
			<p>Калькулятор</p>
			</div>
			</a>
		    </li>
                    <li class="item"><a class="link" href="#"></a>
			<a href="#">
			<div class="nav-icon-block">
			<div class="nav-icon">
			<img src="/wp-content/uploads/2013/07/nav-icon-3.png">
			</div>
			<p>Доверие</p>
			</div>
			</a>
		    </li>
		    <li class="item"><a class="link" href="#"></a>
			<a href="/best-price">
			<div class="nav-icon-block">
			<div class="nav-icon">
			<img src="/wp-content/uploads/2013/07/nav-icon-4.png">
			</div>
			<p>Цена</p>
			</div>
			</a>
		    </li>
                    <li class="item">
			<div style="border-radius: 5px; width: 84px; height: 123px;border: 1px solid #e8e8e8;background-color: #fbfbf7;text-align: center; margin-left: 31px;margin-top: -16px;padding: 0;">
  			<img src="/wp-content/uploads/2013/07/nav-icon-menu.png">
  			<p style="margin-top: 22px;">МЕНЮ</p>
  		        </div>




<ul class="sub-menu">
  
<div class="main-nav-menu">
	<div class="grid-4 a1">
    	<p class="title">Сервисы:</p>
    	<ul>
        	<li><a href="/#anchor_calc">On-line калькулятор</a></li> 
		<li><a href="/calculation">Заказать детальный просчет</a></li> 
		<li><a href="/zamerschik">Вызвать замерщика</a></li>
		<li><a href="/mounting-kit/#montage-nabor">Купить монтажный набор</a></li> 
        	<li><a href="/installation-teams">Список монтажных бригад</a></li> 
		<li><a href="/installation">Монтаж</a></li> 
 		</ul>   
    </div>
    
    <div class="grid-4 a2">
    	<p class="title">Своими руками:</p>
    	<ul style="padding-left: 23px !important;">
        	<li><a href="/froze-window">Инструкция по замеру</a></li> 
			<li><a href="/manual-installation">Обучение монтажу</a></li> 
			<li><a href="/adjusting-windows">Регулировка окон</a></li>
			<li><a href="/window-encyclopedia">Оконная энциклопедия</a></li>
    	</ul>
    </div>
    
    <div class="grid-4 a3">
    	<p class="title">Бонусы:</p>
        <ul style="padding-left: 23px !important;">
        	<li><a href="/earn-with-us">Заработайте с нами</a></li> 
		<li><a href="/cheaper">Вместе еще дешевле</a></li> 
		<li><a href="/wholesalers">Оптовикам</a></li>
		<li><a href="/action-2"><span class="red">АКЦИЯ!</span> Найдёте дешевле?</a></li>
    	</ul>
    </div>
    
    <div class="grid-4 a4">
    	<p class="title">Дополнительно:</p>
    	<ul style="padding-left: 34px !important;">
		<li><a href="/best-price">Лучшая цена</a></li>
        	<li><a href="/about">О компании</a></li> 
		<li><a href="/warranties">Гарантии</a></li> 
		<li><a href="/work">Работа монтажным<br>бригадам</a></li>
		<li><a href="/contacts">Контакты</a></li>  
 	</ul>   
    </div>

</div>
  </ul>
</li>



                </ul>

<!-- Акция банер -->
<!-- <div class="info-action">
<div id="pfa-439" style="left: -53px; top: 72px; position: absolute;">
<script type="text/javascript">
       window._pfa = window._pfa || {'banners': []};
       window._pfa.banners = window._pfa.banners || [];
       window._pfa.banners.push({'id': 439, 'width': 26, 'height': 26, 'lang': 'ru', 'container': 'pfa-439', 'domain': 'prostokna.ru', 'widget': 417});
    </script>
</div>
<div id="pfa-440" style="left: 50px; top: 46px; position: absolute;">
    <script type="text/javascript">
       window._pfa = window._pfa || {'banners': []};
       window._pfa.banners = window._pfa.banners || [];
       window._pfa.banners.push({'id': 440, 'width': 26, 'height': 26, 'lang': 'ru', 'container': 'pfa-440', 'domain': 'prostokna.ru', 'widget': 418});
    </script>
</div>
</div> -->
<!-- Акция банер END -->

            </nav>
            <div class="contacts">
                <p><span class="number">+7(499) 391-22-21</span></p>

                <p class="work_time">с 10:00 до 19:00 с Пн. по Пт.</p>
            </div>

            <div class="more_info">Что-то еще...?? )</div>

            <div class="helper">
                <ul class="s list">
                    <li class="item"><a class="red" href="/zamerschik">Вызвать замерщика</a></li>
                    <li class="item"><a onclick="$(this).parent().toggleClass('active'); return false;" class="bubl" href="#">Обратный
                            звонок</a>

                        <div class="bubl">
                            <form class="ph-6" method="post" action="" id="backphoneform">
                                <p class="mb-18 i">Закажите бесплатный звонок<br/>
                                    прямо сейчас!<br/>
                                    Просто заполните форму.</p>

                                <p><input name="name" class="c-100 field" type="text" value="" placeholder="Имя"/></p>

                                <p><input name="phone" class="c-100 field" type="text" value="" placeholder="Телефон"/></p>

                                <p class="cx mb-10"><input name="t_from" class="fl w-88 field" type="text" value="" placeholder="с"/>
                                    <input name="t_to" class="fr w-88 field" type="text" value="" placeholder="до"/></p>

                                <p>
                                    <button class="btn_1" type="submit">Отправить</button>
                                </p>
                            </form>
                        </div>
                    </li>
                    <li class="item"><a class="bubl" href="/#anchor_calc">On-line калькулятор</a></li>
                </ul>
            </div>

            <div class="feedback">
                <a class="toggle" href="#"></a>
            </div>
        </header>
        <!--// end header //-->
<?php
$info_box_page = get_option('info_box');
	if($page_id = $info_box_page){
		$page_data = get_page($page_id);
?>
		<div class="info-box">
			<div class="info-box-inner clearfix container_12">
				<?php echo do_shortcode($page_data->post_content); ?>
				<img src="<?php bloginfo('template_directory'); ?>/images/header-arrow.png" class="header-arrow" alt="" />
				<!-- <svg version="1.1" class="compact-header-arrow-back-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="34px" height="19px" viewBox="0 0 34 19" enable-background="new 0 0 34 19" xml:space="preserve">
					<polyline fill="none" points="31,16.5 17,2.5 3,16.5 "/>
				</svg> -->
			</div>
		</div>
<?php } ?>

<?php
	if(is_page_template('template-blog.php') or is_archive() or is_singular('post') or is_singular('news') or is_search() or is_home() or is_page_template('template-portoflio.php') or is_singular('portfolio')){

		$back_link_class = '';
		$blog_page = get_option('flow_blog_page');

		$blog_page_link = get_permalink($blog_page);

		if(is_page_template('template-blog.php')){
			$blog_page_link = get_bloginfo('url');
		}
		if(is_page_template('template-news.php')){
			$blog_page_link = get_bloginfo('url');
		}
		if(is_post_type_archive('news')){
			$blog_page_link = get_bloginfo('url');
		}
		if(is_home() or is_page_template('template-portoflio.php')){
			$visible_or_not = '';
			$blog_page_link = 'javascript:void(null);';
		}else if(is_singular('portfolio')){
			$visible_or_not = 'compact_navigation_container-visible';
			$blog_page_link = 'javascript:void(null);';

			if(($portfolio_back_button = get_post_meta($post->ID, 'portfolio_back_button', true)) && $portfolio_back_button != 'none'){
				$page_portfolio_templatefile = get_post_meta($portfolio_back_button, '_wp_page_template', true);
				if(in_array(strtolower($page_portfolio_templatefile), array("template-portoflio.php"))){
					$blog_page_link = 'javascript:void(null);';
				}else{
					$blog_page_link = get_permalink($portfolio_back_button);
					$back_link_class = 'back-link-external';
				}
			}
		}else{
			$visible_or_not = 'compact_navigation_container-visible';
		}
?>
		<nav id="compact_navigation_container" class="compact_navigation_container <?php echo $visible_or_not; ?>">
			<div class="clearfix inner">
				<a class="header-back-to-blog-link <?php echo $back_link_class; ?>" href="<?php echo $blog_page_link; ?>">
					<div class="header-back-to-blog clearfix">
						<div class="header-back-to-blog-icon"></div>
						<div class="header-back-to-blog-icon-svg">
							<!-- <svg version="1.1" class="compact-header-arrow-back-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="34px" height="19px" viewBox="0 0 34 19" enable-background="new 0 0 34 19" xml:space="preserve">
								<polyline fill="none" points="31,16.5 17,2.5 3,16.5 "/>
							</svg> -->
							<!-- <svg version="1.1" class="compact-header-arrow-back-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="19px" height="34px" viewBox="0 0 19 34" enable-background="new 0 0 19 34" xml:space="preserve">
								<polyline fill="none" points="17, 2.5 3, 16.75 17, 31"/>
							</svg> -->
							 <svg version="1.1" class="compact-header-arrow-back-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="19.201px" height="34.2px" viewBox="0 0 19.201 34.2" enable-background="new 0 0 19.201 34.2" xml:space="preserve">
								<polyline fill="none" points="17.101,2.1 2.1,17.1 17.101,32.1 "/>
							</svg>
						</div>
						<div class="header-back-to-blog-message"><?php _e('Back', 'flowthemes'); ?></div>
					</div>
				</a>
				<div class="header-search">
					<div class="header-search-icon">L</div>
					<div class="header-search-text"><?php _e('Search', 'flowthemes'); ?></div>
				</div>
				<?php wp_nav_menu(array('sort_column' => 'menu_order', 'theme_location' => 'main_menu', 'menu_class' => 'flow_smart_menu', 'menu_id' => 'compact_menu', 'walker' => new compact_menu_walker())); ?>
			</div>
		</nav>
<?php } ?>