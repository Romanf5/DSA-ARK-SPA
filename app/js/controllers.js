'use strict';
angular.module('dsaArkTheme')


// Homepage controller
.controller('HomeCtrl', ['$scope', 'homeService', function($scope, homeService) {
    $scope.page_title = 'Home';


    // Retrieve category data
    homeService.getCategories().query(function(response) {
        $scope.categories = response;

        for (var i = 0; i < $scope.categories.length; i++) {
            // Retrieve category images from ACF
            //console.log($scope.categories[i].id);
            homeService.getCatImage().get({
                id: $scope.categories[i].id
            }, function(response) {
                $scope.catImg = response.acf;
                $scope.categories[i] = $scope.categories.concat($scope.catImg);
            }, function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });
        }

        console.log($scope.categories);

    }, function(response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
    });

}])


// Blog controller
.controller('DetailCtrl', ['$scope', '$stateParams', 'PostsByCat', function($scope, $stateParams, PostsByCat) {
    console.log($stateParams.categories);
    PostsByCat.query({
        ID: $stateParams.categories
    }, function(res) {
        $scope.posts = res;
    });
}])

// Single Post controller
.controller('SinglePostCtrl', ['$scope', 'Posts', function($scope, Posts) {
    console.log('ListCtrl');
    $scope.page_title = 'Blog Listing Page';

    Posts.query(function(res) {
        $scope.posts = res;
    });

}]);