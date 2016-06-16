'use strict';

angular.module( 'dsaArkTheme', ['ui.router', 'ngResource'] )


.config( function( $stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state( 'home', {
			url: '/',
			controller: 'HomeCtrl',
			templateUrl: appInfo.template_directory + 'app/views/home.html'
		})
		.state( 'blog', {
			url: '/posts?:categories',
			controller: 'BlogCtrl',
			templateUrl: appInfo.template_directory + 'app/views/blog.html'
		})
		.state( 'single-post', {
			url: '/posts/:id',
			controller: 'SinglePostCtrl',
			templateUrl: appInfo.template_directory + 'app/views/single-post.html'
		});
});