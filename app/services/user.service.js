/**
 * Created by charlie on 14/11/16.
 */
(function() {
    'use strict';
    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$injection = ['$resource', 'mode'];

    function UserService($resource, mode){

        return $resource(mode.dev + 'users/:uid');

    }
})();