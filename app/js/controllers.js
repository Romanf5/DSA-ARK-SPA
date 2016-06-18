'use strict';
angular.module('dsaArkTheme')

.controller('OffCanvasCtrl', function($scope) {

})

// Homepage controller
.controller('HomeCtrl', ['$scope', 'homeService', '$http', function($scope, homeService, $http) {
    $scope.page_title = 'Home';


    // Retrieve category data
    homeService.getCategories().query(function(response) {
        $scope.categories = response;

        $scope.chunkedData = chunk($scope.categories, 3);

        // Retrieve category image from ACF REST API
        for (var i = 0; i < $scope.categories.length; i++) {
            $http.get(appInfo.api_acf_url + "term/categories/" + $scope.categories[i].id).success((function(i) {
                return function(data) {
                    $scope.categories[i].category_image = data.acf.category_image; // ACF field: category_image
                };
            })(i));
        }
        $scope.cats = $scope.categories;
    }, function(response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
    });


    function chunk(arr, size) {
        var newArr = [];
        for (var i = 0; i < arr.length; i += size) {
            newArr.push(arr.slice(i, i + size));
        }
        return newArr;
    }



}])


// Blog controller
.controller('BlogCtrl', ['$scope', '$stateParams', 'PostsByCat', '$http', function($scope, $stateParams, PostsByCat, $http) {

    $scope.page_title = 'Blog';

    $http.get(appInfo.api_url + 'categories').success(function(res) {
        $scope.categories = res;
    });


    PostsByCat.query({
        ID: $stateParams.category
    }, function(res) {
        $scope.posts = res;
        $scope.chunkedData = chunk($scope.posts, 3);
    });


    $scope.selected = 0;
    $scope.select = function(index) {
        $scope.selected = index;
    };

    // Fix responsive grid
    function chunk(arr, size) {
        var newArr = [];
        for (var i = 0; i < arr.length; i += size) {
            newArr.push(arr.slice(i, i + size));
        }
        return newArr;
    }

}])

// Single Post controller
.controller('SinglePostCtrl', ['$scope', 'Post', '$stateParams', function($scope, Posts, $stateParams) {
    console.log($stateParams);
    Posts.get({
        ID: $stateParams.id
    }, function(res) {
        $scope.post = res;
    });
}]);