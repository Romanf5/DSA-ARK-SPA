<?php

class dsa_ark_theme {
	
	function enqueue_scripts() {
		
		// Site custom styles / Foundation CSS framework
		wp_enqueue_style( 'main.css', get_template_directory_uri() . '/app/css/main.css', '1.0.0', 'all' );
		
		// AngularJS
		wp_enqueue_script( 'angular', get_template_directory_uri() . '/bower_components/angular/angular.min.js', array( 'jquery' ), '1.5.7', false );
		wp_enqueue_script( 'angular-resource', get_template_directory_uri() . '/bower_components/angular-resource/angular-resource.min.js', array('angular'), '1.5.7', false );
		wp_enqueue_script( 'angular-animate', get_template_directory_uri() . '/bower_components/angular-animate/angular-animate.min.js', array('angular'), '1.5.7', false );
		wp_enqueue_script( 'ui-router', get_template_directory_uri() . '/bower_components/angular-ui-router/release/angular-ui-router.min.js', array( 'angular' ), '0.3.1', false );
		
		// Angular-Foundation
		wp_enqueue_script( 'angular-foundation', get_template_directory_uri() . '/bower_components/angular-foundation/mm-foundation-tpls.min.js', array( 'angular' ), '0.3.1', false );
		
		// Angular Loading Bar
		wp_enqueue_script( 'angular-loading-bar', get_template_directory_uri() . '/bower_components/angular-loading-bar/build/loading-bar.min.js', array( 'angular' ), '0.9.0', false );
		wp_enqueue_style( 'angular-loading-bar.css', get_template_directory_uri() . '/bower_components/angular-loading-bar/build/loading-bar.min.css', '0.9.0', 'all' );
		
		// App
		wp_enqueue_script( 'ngApp', get_template_directory_uri() . '/app/js/app.js', array( 'ui-router' ), '1.0', false );
		wp_enqueue_script( 'ngControllers', get_template_directory_uri() . '/app/js/controllers.js', array( 'ngApp' ), '1.0', false );
		wp_enqueue_script( 'ngServices', get_template_directory_uri() . '/app/js/services.js', array( 'ngControllers' ), '1.0', false );
		wp_enqueue_script( 'ngFilters', get_template_directory_uri() . '/app/js/filters.js', array( 'ngServices' ), '1.0', false );
		wp_enqueue_script( 'ngDirectives', get_template_directory_uri() . '/app/js/directives.js', array( 'ngFilters' ), '1.0', false );
		wp_localize_script( 'ngApp', 'appInfo',
			array(
				
				'api_url'			 => rest_get_url_prefix() . '/wp/v2/',
				'api_acf_url'		 => rest_get_url_prefix() . '/acf/v2/',
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


// Category Thumbnail
add_action( 'rest_api_init', 'register_category_image' );
function register_category_image() {
	register_api_field( 'category',
		'category_image',
		array(
			'get_callback' => 'category_image_field'
		)
	);
}

function category_image_field( $object, $field_name, $request ) {
	$thumbnail_id = get_field('category_image', 'category_' . $object['id'] );
	$thumbnail = wp_get_attachment_image_src( $thumbnail_id );
	return $thumbnail[0];
}


// Category Color
add_action( 'rest_api_init', 'register_category_color' );
function register_category_color() {
	register_api_field( 'category',
		'category_color',
		array(
			'get_callback' => 'category_color_field'
		)
	);
}

function category_color_field( $object, $field_name, $request ) {
	return get_field('category_color', 'category_' . $object['id'] );
}

// Category Icon
add_action( 'rest_api_init', 'register_category_icon' );
function register_category_icon() {
	register_api_field( 'category',
		'category_icon',
		array(
			'get_callback' => 'category_icon_field'
		)
	);
}

function category_icon_field( $object, $field_name, $request ) {
	return get_field('category_icon', 'category_' . $object['id'] );
}


// // Post cat colors
// add_action( 'rest_api_init', 'register_post_cat_col' );
// function register_post_cat_col() {
// 	register_api_field( 'post',
// 		'cat_url.cat_color',
// 		array(
// 			'get_callback' => 'post_cat_col_field'
// 		)
// 	);
// }

// function post_cat_col_field( $data, $post, $request ) {
	
// 	//var_dump($data->data);
// 	//$_data = $data->data;
	
	
// 	return get_field('category_color', 'category_' . $data['id'] );
// }

// function rest_prepare_cat( $data, $post, $request ) {
// 	$_data = $data->data;
// 	$cat = get_the_category();
// 	$_data['cat_url'] = $cat;
// 	$data->data = $_data;
// 	return $data;
// }





	
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


// Thumbnail
function rest_prepare_thumbnail( $data, $post, $request ) {
	$_data = $data->data;
	$thumbnail_id = get_post_thumbnail_id( $post->ID );
	$thumbnail = wp_get_attachment_image_src( $thumbnail_id );
	$_data['featured_image_thumbnail_url'] = $thumbnail[0];
	$data->data = $_data;
	return $data;
}
add_filter( 'rest_prepare_post', 'rest_prepare_thumbnail', 10, 3 );


// Category Data
function rest_prepare_cat( $data, $post, $request ) {
	$_data = $data->data;
	$cat = get_the_category();
	$_data['cat_url'] = $cat;
	$cat_color = get_field('category_icon', 'category_' . $cat['id'] );
	var_dump($cat->ID);
	$data->data = $_data;
	return $data;
}
add_filter( 'rest_prepare_post', 'rest_prepare_cat', 10, 3 );

// Excerpt length
function new_excerpt_length($length) {
	return 17;
}
add_filter('excerpt_length', 'new_excerpt_length');

	
?>