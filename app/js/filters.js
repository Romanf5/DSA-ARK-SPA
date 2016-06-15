'use strict';

angular.module( 'dsaArkTheme' )

.filter( 'to_trusted', ['$sce', function( $sce ){
	return function( text ) {
		return $sce.trustAsHtml( text );
	};
}]);