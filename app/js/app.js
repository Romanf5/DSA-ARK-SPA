'use strict';
angular.module('dsaArkTheme', ['ui.router', 'ngResource', 'ngAnimate', 'mm.foundation', 'angular-loading-bar'])

.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
	cfpLoadingBarProvider.includeSpinner = false;
	//cfpLoadingBarProvider.includeBar = false;
	//cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
	//cfpLoadingBarProvider.spinnerTemplate = '<div><img src="' + appInfo.template_directory + 'app/img/dsa-animation-active-waiting.gif" /></div>';
}])

.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('home', {
			url: '/',
			controller: 'HomeCtrl',
			templateUrl: appInfo.template_directory + 'app/views/home.html',
			resolve: {
				homeObj: function(homeService, $q) {
					var deferred = $q.defer();
					homeService.getCategories().query(function(response) {
						deferred.resolve(response);
					}, function(response) {
						deferred.reject();
					});
					return deferred.promise;
				}
			}
		})
		.state('category', {
			url: '/kategori',
			controller: 'BlogCtrl',
			templateUrl: appInfo.template_directory + 'app/views/blog.html',
			resolve: {
				catObj: function($http) {
					return $http({
							method: 'GET',
							url: appInfo.api_url + 'categories'
						})
						.then(function(data) {
							return data;
						});
				},
				postObj: function(PostsByCat, $q, $stateParams) {
					var deferred = $q.defer();
					PostsByCat.query({
						ID: $stateParams.category_name
					}, function(res) {
						deferred.resolve(res);
					}, function(response) {
						deferred.reject();
					});
					return deferred.promise;
				},
				currCatObj: function($http, $stateParams) {
					return $http.get(appInfo.api_url + 'categories?slug=' + $stateParams.category_name).success(function(res) {
						return res;
					});
				}
			}
		})
		.state('category.list', {
			url: '/:category_name',
			controller: 'BlogCtrl',
			templateUrl: appInfo.template_directory + 'app/views/case-filter.html',
			resolve: {
				postObj: function(PostsByCat, $q, $stateParams) {
					var deferred = $q.defer();
					PostsByCat.query({
						ID: $stateParams.category_name
					}, function(res) {
						deferred.resolve(res);
					}, function(response) {
						deferred.reject();
					});
					return deferred.promise;
				},
				currCatObj: function($http, $stateParams) {
					return $http.get(appInfo.api_url + 'categories?slug=' + $stateParams.category_name).success(function(res) {
						return res;
					});
				}
			}
		})
		.state('single-post', {
			url: '/posts/:name',
			controller: 'SinglePostCtrl',
			templateUrl: appInfo.template_directory + 'app/views/single-post.html',
			resolve: {
				singlePostObj: function(Post, $q, $stateParams) {
					var deferred = $q.defer();
					Post.query({
						ID: $stateParams.name
					}, function(res) {
						deferred.resolve(res[0]);
					}, function(response) {
						deferred.reject();
					});
					return deferred.promise;
				}
			}
		})
		.state('contact', {
			url: '/contact',
			controller: 'ContactCtrl',
			templateUrl: appInfo.template_directory + 'app/views/contactus.html'
		})
		.state('about', {
			url: '/about',
			controller: 'AboutCtrl',
			templateUrl: appInfo.template_directory + 'app/views/aboutus.html'
		})
		.state('partners', {
			url: '/partners',
			controller: 'PartnersCtrl',
			templateUrl: appInfo.template_directory + 'app/views/partners.html'
		});


	// use the HTML5 History API
	$locationProvider.html5Mode(true);

});