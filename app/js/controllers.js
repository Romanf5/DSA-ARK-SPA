'use strict';
angular.module('dsaArkTheme')

.controller('OffCanvasCtrl', function($scope) {

})

// Homepage controller
.controller('HomeCtrl', ['$scope', 'homeService', '$http', 'homeObj', function($scope, homeService, $http, homeObj) {
    $scope.page_title = 'Home';
    $scope.categories = homeObj;
}])

// Blog controller
.controller('BlogCtrl', ['$scope', '$stateParams', 'PostsByCat', '$http', 'catObj', 'postObj', 'currCatObj', function($scope, $stateParams, PostsByCat, $http, catObj, postObj, currCatObj) {

    $scope.categories = catObj.data;

    $scope.posts = postObj;
    $scope.chunkedData = chunk($scope.posts, 3);

    $scope.currCat = currCatObj.data;

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
.controller('SinglePostCtrl', ['$scope', 'Post', '$stateParams', 'singlePostObj', function($scope, Posts, $stateParams, singlePostObj) {
    // Posts.get({
    //     ID: $stateParams.id
    // }, function(res) {
    //     $scope.post = res;
    // });
    
    $scope.post = singlePostObj;
    
    
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
                method: 'POST',
                url: appInfo.template_directory + 'contact-form.php',
                data: jQuery.param($scope.formData), //param method from jQuery
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                } //set the headers so angular passing info as form data (not request payload)
            }).success(function(data) {
                console.log(data);
                if (data.success) { //success comes from the return json object
                    $scope.submitButtonDisabled = true;
                    $scope.resultMessage = data.message;
                    $scope.result = 'bg-success';
                }
                else {
                    $scope.submitButtonDisabled = false;
                    $scope.resultMessage = data.message;
                    $scope.result = 'bg-danger';
                }
            });
        }
        else {
            $scope.submitButtonDisabled = false;
            $scope.resultMessage = 'Failed <img src="http://www.chaosm.net/blog/wp-includes/images/smilies/icon_sad.gif" alt=":(" class="wp-smiley">  Please fill out all the fields.';
            $scope.result = 'bg-danger';
        }
    };
}])

.controller('AboutCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
    $scope.imgPath = appInfo.template_directory + '/app/img';
}]);