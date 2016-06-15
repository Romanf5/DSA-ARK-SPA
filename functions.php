<?php

class dsa_ark_theme {
	
	function enqueue_scripts() {
		
	
		wp_enqueue_style( 'foundation.css', 'https://cdnjs.cloudflare.com/ajax/libs/foundation/6.2.3/foundation.min.css', array(), '6.2.3', 'all' );
		wp_enqueue_script( 'foundation.js', 'https://cdnjs.cloudflare.com/ajax/libs/foundation/6.2.3/foundation.min.js', array( 'jquery' ), '1.5.6', false );
		wp_enqueue_script( 'foundation.offcanvas.js', 'https://cdnjs.cloudflare.com/ajax/libs/foundation/6.2.3/plugins/foundation.offcanvas.js', array( 'jquery', 'foundation.js' ), '1.5.6', false );
		wp_enqueue_script( 'angular', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js', array( 'jquery' ), '1.5.6', false );
		wp_enqueue_script( 'angular-resource', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-resource.min.js', array('angular'), '1.5.6', false );
		wp_enqueue_script( 'ui-router', 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.3.1/angular-ui-router.min.js', array( 'angular' ), '0.3.1', false );
		wp_enqueue_script( 'ngApp', get_template_directory_uri() . '/app/js/app.js', array( 'ui-router' ), '1.0', false );
		wp_enqueue_script( 'ngControllers', get_template_directory_uri() . '/app/js/controllers.js', array( 'ngApp' ), '1.0', false );
		wp_enqueue_script( 'ngServices', get_template_directory_uri() . '/app/js/services.js', array( 'ngControllers' ), '1.0', false );
		wp_enqueue_script( 'ngFilters', get_template_directory_uri() . '/app/js/filters.js', array( 'ngServices' ), '1.0', false );
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

?>