/**
 * Created by charlie on 14/12/16.
 */
(function() {
    'use strict';
    angular
        .module('app')
        .factory('NotifsGroupsService', NotifsGroupsService);

    NotifsGroupsService.$injection = ['$resource', 'mode'];

    function NotifsGroupsService($resource, mode) {

        return $resource(mode.dev + 'notifications/groups/:uid');

    }
})();