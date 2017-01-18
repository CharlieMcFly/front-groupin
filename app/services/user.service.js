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

        var localhost = "http://localhost:8080/";
        var dev = "https://platine-groupin.herokuapp.com/";

        return $resource(localhost + 'users/:uid');

    }
})();