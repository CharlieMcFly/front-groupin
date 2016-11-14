/**
 * Created by charlie on 14/11/16.
 */
(function() {
    'use strict';
    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$injection = ['$resource'];

    function UserService($resource) {
        return $resource('https://platine-groupin.herokuapp.com/users');

    }
})();