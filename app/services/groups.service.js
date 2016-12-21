/**
 * Created by charlie on 21/12/16.
 */
(function() {
    'use strict';
    angular
        .module('app')
        .factory('GroupsService', GroupsService);

    GroupsService.$injection = ['$resource'];

    function GroupsService($resource) {

        var localhost = "http://localhost:8080/";
        var dev = "https://platine-groupin.herokuapp.com/";

        return $resource(localhost + 'groups/:uid');

    }
})();