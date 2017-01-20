/**
 * Created by charlie on 14/12/16.
 */
(function() {
    'use strict';
    angular
        .module('app')
        .factory('NotifsGroupsService', NotifsGroupsService);

    NotifsGroupsService.$injection = ['$resource'];

    function NotifsGroupsService($resource) {

        var localhost = "http://localhost:8080/";
        var dev = "https://platine-groupin.herokuapp.com/";

        return $resource(dev + 'notifications/groups/:uid');

    }
})();