'use strict';

angular.module('dsaArkTheme')

.factory('BlogService', ['$http', '$sce', function($http, $sce) {

    function allPosts() {
        return getData('posts?filter[category_name]=post');
    }

    function allPostsByTag(tag) {
        return getData('posts?filter[category_name]=post&filter[tag]=' + tag);
    }

    function allPostsBySearchTerm(searchTerm) {
        return getData('posts?filter[category_name]=post&filter[s]=' + searchTerm);
    }

    function featuredPosts() {
        return getData('posts?filter[category_name]=post%2Bfeatured');
    }

    function post(id) {
        return getData('posts/' + id);
    }

    function getData(url) {
        return $http
            .get(appInfo.api_url + url, {
                cache: true
            })
            .then(function(response) {
                if (response.data instanceof Array) {
                    var items = response.data.map(function(item) {
                        return decorateResult(item);
                    });
                    return items;
                }
                else {
                    return decorateResult(response.data);
                }
            });
    }

    /**
     * Decorate a post to make it play nice with AngularJS
     * @param result
     * @returns {*}
     */
    function decorateResult(result) {
        result.excerpt = $sce.trustAsHtml(result.excerpt);
        result.date = Date.parse(result.date);
        result.content = $sce.trustAsHtml(result.content);
        return result;
    }

    return {
        allPosts: allPosts,
        allPostsByTag: allPostsByTag,
        allPostsBySearchTerm: allPostsBySearchTerm,
        featuredPosts: featuredPosts,
        post: post
    };
}])

.service('MetadataService', function() {

    var title,
        description,
        defaultTitle = '%%DEFAULT_TITLE%%',
        defaultDescription = '%%DEFAULT_DESCRIPTION%%';

    this.setMetadata = function(metadata) {
        title = metadata.title ? metadata.title : defaultTitle;
        description = metadata.description ? metadata.description : defaultDescription;
    };

    this.getMetadata = function() {
        return {
            title: title,
            description: description
        };
    };
})

.factory('Categories', function($resource) {
    return $resource(appInfo.api_url + 'categories/:ID', {
        ID: '@id'
    });
})

.factory('PostsByCat', function($resource) {
    return $resource(appInfo.api_url + 'posts?categories=:ID', {
        ID: '@id'
    });
})

.factory('CatInfo', function($resource) {
    return $resource(appInfo.api_url + 'posts?categories=:ID', {
        ID: '@id'
    });
})

.factory('Post', function($resource) {
    return $resource(appInfo.api_url + 'posts/:ID', {
        ID: '@id'
    });
})

// Service for retriving categories for the main page.
.service('homeService', ['$resource', '$http', function($resource, $http) {


    this.getCategories = function() {
        return $resource(appInfo.api_url + 'categories/:ID', {
            ID: '@id'
        });
    };


    // this.getCatImage = function() {
    //     return $resource(appInfo.api_acf_url + "term/categories/:id");
    // };

    // this.getCatImage = function(id) {
    //     return $http(appInfo.api_acf_url + "term/categories/" + id );
    // };

}]);