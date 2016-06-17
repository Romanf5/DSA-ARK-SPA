<?php

class dsa_ark_theme {
	
	function enqueue_scripts() {
		
		// Foundation CSS framework
		wp_enqueue_style( 'foundation.css', get_template_directory_uri() . '/bower_components/foundation/css/foundation.min.css', array(), '5.5.2', 'all' );
		// wp_enqueue_script( 'foundation.js', get_template_directory_uri() . '/bower_components/foundation/js/foundation.min.js', array( 'jquery' ), '5.5.2', false );
		// wp_enqueue_script( 'foundation.offcanvas.js', get_template_directory_uri() . '/bower_components/foundation/js/foundation/foundation.offcanvas.js', array( 'jquery', 'foundation.js' ), '5.5.2', false );
		
		// Site custom styles
		wp_enqueue_style( 'main.css', get_template_directory_uri() . '/app/css/main.css', array('foundation.css'), '1.0.0', 'all' );
		
		// AngularJS
		wp_enqueue_script( 'angular', get_template_directory_uri() . '/bower_components/angular/angular.min.js', array( 'jquery' ), '1.4.6', false );
		wp_enqueue_script( 'angular-resource', get_template_directory_uri() . '/bower_components/angular-resource/angular-resource.min.js', array('angular'), '1.4.6', false );
		wp_enqueue_script( 'ui-router', get_template_directory_uri() . '/bower_components/angular-ui-router/release/angular-ui-router.min.js', array( 'angular' ), '0.3.1', false );
		
		// Angular-Foundation
		wp_enqueue_script( 'angular-foundation', get_template_directory_uri() . '/bower_components/angular-foundation/mm-foundation-tpls.min.js', array( 'angular' ), '0.3.1', false );
		
		// App
		wp_enqueue_script( 'ngApp', get_template_directory_uri() . '/app/js/app.js', array( 'ui-router' ), '1.0', false );
		wp_enqueue_script( 'ngControllers', get_template_directory_uri() . '/app/js/controllers.js', array( 'ngApp' ), '1.0', false );
		wp_enqueue_script( 'ngServices', get_template_directory_uri() . '/app/js/services.js', array( 'ngControllers' ), '1.0', false );
		wp_enqueue_script( 'ngFilters', get_template_directory_uri() . '/app/js/filters.js', array( 'ngServices' ), '1.0', false );
		wp_enqueue_script( 'ngDirectives', get_template_directory_uri() . '/app/js/directives.js', array( 'ngFilters' ), '1.0', false );
		wp_localize_script( 'ngApp', 'appInfo',
			array(
				
				'api_url'			 => rest_get_url_prefix() . '/wp/v2/',
				'api_acf_url'			 => rest_get_url_prefix() . '/acf/v2/',
				'template_directory' => get_template_directory_uri() . '/',
				'nonce'				 => wp_create_nonce( 'wp_rest' ),
				'is_admin'			 => current_user_can('administrator')
				
			)
		);
		
	}

}

$dsaArk = new dsa_ark_theme();
add_action( 'wp_enqueue_scripts', array( $dsaArk, 'enqueue_scripts' ) );

add_theme_support('post-thumbnails');
set_post_thumbnail_size( 400, 200, true );

function dsa_ark_theme_setup() {
	if ( function_exists( 'add_theme_support' ) ) { 
	    add_theme_support( 'post-thumbnails' );
	    set_post_thumbnail_size( 400, 200, true );
	    add_image_size( 'category-thumb', 300, 9999 );
	}
}

add_action( 'after_setup_theme', 'dsa_ark_theme_setup' );

// next/previous post

add_action( 'rest_api_init', 'slug_register_siglings' );
function slug_register_siglings() {
	register_api_field( 'post',
		'siblings',
		array(
			'get_callback'    => 'slug_get_siglings',
			'update_callback' => null,
			'schema'          => null,
		)
	);
}

function slug_get_siglings( $object, $field_name, $request ) {
	$next_post = get_adjacent_post( false, '', false );
	$prev_post = get_adjacent_post( false, '', true );
	return array(
		'next'            => $next_post->ID,
		'next_post_title' => $next_post->post_title,
		'prev'            => $prev_post->ID,
		'prev_post_title' => $prev_post->post_title,
	);
}

// add_action( 'rest_api_init', 'register_category_image' );
// function register_category_image() {
// 	register_api_field( 'category',
// 		'category_image',
// 		array(
// 			'get_callback' => 'category_image_field'
// 		)
// 	);
// }

// function category_image_field( $object, $field_name, $request ) {

// 	return get_field('category_image', 'category_3');
// }

	// $terms = get_terms( array(
 //   'taxonomy' => 'category',
 //   //'hide_empty' => false,
	// ) );
	// echo '<pre>';
	// var_dump(  );
	// echo '</pre>';
	
	
// add_action( 'rest_api_init', 'slug_register_acf' );
// function slug_register_acf() {
//   $terms = get_terms( array(
//     'taxonomy' => 'category',
// 	));

//     register_api_field( 'category',
//         'category_image',
//         array(
//             'get_callback'    => 'slug_get_acf',
//             'update_callback' => null,
//             'schema'          => null,
//         )
//     );
  
// }
// function slug_get_acf( $object, $field_name, $request ) {
// 	//var_dump($object);
//     return get_field('category_image');
// }




	
?>