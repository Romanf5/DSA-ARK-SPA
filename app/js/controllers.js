'use strict';
angular.module('dsaArkTheme')

.controller('OffCanvasCtrl', function($scope) {

})

// Homepage controller
.controller('HomeCtrl', [ '$scope', 'homeService', '$http', function($scope, homeService, $http) {
    $scope.page_title = 'Home';


    // Retrieve category data
    homeService.getCategories().query(function(response) {
        $scope.categories = response;
    }, function(response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
    });
}])


// Blog controller
.controller('BlogCtrl', ['$scope', '$stateParams', 'PostsByCat', '$http', function($scope, $stateParams, PostsByCat, $http) {


    $http.get(appInfo.api_url + 'categories').success(function(res) {
        $scope.categories = res;
    });
    
    PostsByCat.query({
        ID: $stateParams.category
    }, function(res) {
        $scope.posts = res;
        $scope.chunkedData = chunk($scope.posts, 3);
    });
    
    $http.get(appInfo.api_url + 'categories/' + $stateParams.category).success(function(res) {
        $scope.currCat = res;
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
    Posts.get({
        ID: $stateParams.id
    }, function(res) {
        $scope.post = res;
    });
}])


.controller('ContactCtrl', ['$scope', '$stateParams', '$http', function($scope, $stateParams, $http) {

$scope.contactImg = appInfo.template_directory + 'app/img/icons/Arkitekt-togo.png';

$scope.result = 'hidden';
    $scope.resultMessage;
    $scope.formData; //formData is an object holding the name, email, subject, and message
    $scope.submitButtonDisabled = false;
    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
    $scope.submit = function(contactform) {
        $scope.submitted = true;
        $scope.submitButtonDisabled = true;
        if (contactform.$valid) {
            $http({
                method  : 'POST',
                url     : appInfo.template_directory + 'contact-form.php',
                data    : jQuery.param($scope.formData),  //param method from jQuery
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
            }).success(function(data){
                console.log(data);
                if (data.success) { //success comes from the return json object
                    $scope.submitButtonDisabled = true;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-success';
                } else {
                    $scope.submitButtonDisabled = false;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-danger';
                }
            });
        } else {
            $scope.submitButtonDisabled = false;
            $scope.resultMessage = 'Failed <img src="http://www.chaosm.net/blog/wp-includes/images/smilies/icon_sad.gif" alt=":(" class="wp-smiley">  Please fill out all the fields.';
            $scope.result='bg-danger';
        }
    }

}])

.controller('AboutCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
    $scope.imgPath = appInfo.template_directory + '/app/img';
}]);