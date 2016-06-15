'use strict';
angular.module('dsaArkTheme')


// Homepage controller
.controller('HomeCtrl', ['$scope', 'homeService', '$http', function($scope, homeService, $http) {
    $scope.page_title = 'Home';


    // Retrieve category data
    homeService.getCategories().query(function(response) {
        $scope.categories = response;
        for (var i = 0; i < $scope.categories.length; i++) {
            $http.get(appInfo.api_acf_url + "term/categories/" + $scope.categories[i].id).success((function(i) {
                return function(data) {
                    $scope.categories[i].category_image = data.acf.category_image;
                };
            })(i));
        }
        $scope.cats = $scope.categories;
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