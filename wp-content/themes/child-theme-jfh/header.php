<?php
/**
 * The Header for our theme
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */
?><!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) & !(IE 8)]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<!--[if lt IE 9]>
	<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>
	<![endif]-->
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="hfeed site">
	<?php if ( get_header_image() ) : ?>

		<div class="dropshadowimg"><img src="<?php header_image(); ?>" width="100%" height="auto" alt="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>"></div>
	
	<?php endif; ?>



	<header id="masthead" class="site-header" role="banner">
             
		<div class="header-main">
	

			<div class="search-toggle">
				<a href="#search-container" class="screen-reader-text" aria-expanded="false" aria-controls="search-container">

<?php _e( 'Search', 'twentyfourteen' ); ?></a>
			</div>



			<nav id="primary-navigation" class="site-navigation primary-navigation" role="navigation">
				<button class="menu-toggle"><?php _e( 'Primary Menu', 'twentyfourteen' ); ?></button>
				<a class="screen-reader-text skip-link" href="#content"><?php _e( 'Skip to content', 'twentyfourteen' ); ?></a>
				<?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_class' => 'nav-menu', 'menu_id' => 'primary-menu' ) ); ?>
			</nav>

		</div>


		<div id="search-container" class="search-box-wrapper hide">
			<div class="search-box">
				<?php get_search_form(); ?>

			</div>
		</div>

	</header><!-- #masthead -->
<div id="site-header">
<div class="top-header">
	
<div class="logo">
 <a href="https://www.johnfhuntpower.co.uk/"><img src="/wp-content/uploads/2021/04/John-F-Hunt-power-under-e1617985889662.png" alt="John F Hunt Power Logo" height="69" width="300" /></a>
</div>
</div>

<div class="footer-social-icons">
    <ul class="social-icons">
        <li><a href="https://www.facebook.com/John-F-Hunt-Power-410937762994761/" target="_blank" class="social-icon"> <i class="fa fa-facebook"></i></a></li>
        <li><a href="https://twitter.com/JohnFHuntPower" target="_blank" class="social-icon"> <i class="fa fa-twitter"></i></a></li>
        <li><a href="https://www.linkedin.com/company/john-f-hunt-power" target="_blank" class="social-icon"> <i class="fa fa-linkedin"></i></a></li>
		 <li><a href="https://www.instagram.com/johnfhuntpower/" target="_blank" class="social-icon"> <i class="fa fa-instagram"></i></a></li>
    </ul>
</div>


</div>

	<div id="main" class="site-main">
