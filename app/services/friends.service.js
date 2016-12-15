/**
 * Created by charlie on 12/12/16.
 */
(function() {
    'use strict';
    angular
        .module('app')
        .factory('FriendsService', FriendsService);

    FriendsService.$injection = ['$resource'];

    function FriendsService($resource) {

        var localhost = "http://localhost:8080/";
        var dev = "https://platine-groupin.herokuapp.com/";

        return $resource(localhost + 'friends/:uid/:ami');

    }
})();
