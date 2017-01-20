/**
 * Created by charlie on 14/12/16.
 */
(function() {
    'use strict';
    angular
        .module('app')
        .factory('NotifsAmisService', NotifsAmisService);

    NotifsAmisService.$injection = ['$resource'];

    function NotifsAmisService($resource) {

        var localhost = "http://localhost:8080/";
        var dev = "https://platine-groupin.herokuapp.com/";

        return $resource(dev + 'notifications/amis/');

    }
})();