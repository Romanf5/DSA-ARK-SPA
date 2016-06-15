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
		.state( 'detail', {
			url: '/posts?:categories',
			controller: 'DetailCtrl',
			templateUrl: appInfo.template_directory + 'app/views/detail.html'
		})
		.state( 'single-post', {
			url: '/posts/:id',
			controller: 'PostCtrl',
			templateUrl: appInfo.template_directory + 'app/views/single-post.html'
		});
});