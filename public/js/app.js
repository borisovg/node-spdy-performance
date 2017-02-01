/*jshint browser:true*/
/*global angular*/

angular.module('app', [])
    .config(['$compileProvider', function ($compileProvider) {
        'use strict';
        $compileProvider.debugInfoEnabled(false);
    }])

    .controller('mainCtrl', ['$scope', function ($scope) {
        'use strict';
        $scope.loaded = true;
    }]);

angular.element(document).ready(function () {
    'use strict';
    angular.bootstrap(document.body, ['app']);
});
