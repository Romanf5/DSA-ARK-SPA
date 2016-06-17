'use strict';
angular.module('dsaArkTheme', ['ui.router', 'ngResource', 'mm.foundation'])


.config(function($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('/');
			$stateProvider
				.state('home', {
					url: '/',
					controller: 'HomeCtrl',
					templateUrl: appInfo.template_directory + 'app/views/home.html'
				})
				.state('blog', {
					url: '/posts?:categories',
					controller: 'BlogCtrl',
					templateUrl: appInfo.template_directory + 'app/views/blog.html'
				})
				.state('single-post', {
					url: '/posts/:id',
					controller: 'SinglePostCtrl',
					templateUrl: appInfo.template_directory + 'app/views/single-post.html'
				})
				.state('category', {
					url: '/categories',
					controller: 'BlogCtrl',
					templateUrl: appInfo.template_directory + 'app/views/blog.html'
				})
			    .state('category.list', {
			        url: '/:category',
			        controller: 'BlogCtrl',
			        templateUrl: appInfo.template_directory + 'app/views/case-filter.html'
			    });
});