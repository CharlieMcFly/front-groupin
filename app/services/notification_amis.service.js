/**
 * Created by charlie on 14/12/16.
 */
(function() {
    'use strict';
    angular
        .module('app')
        .factory('NotifsAmisService', NotifsAmisService);

    NotifsAmisService.$injection = ['$resource', 'mode'];

    function NotifsAmisService($resource, mode) {

        return $resource(mode.dev + 'notifications/amis/');

    }
})();