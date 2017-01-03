/**
 * Created by charlie on 30/12/16.
 */
(function() {
    'use strict';
    angular
        .module('app')
        .factory('ChatsService', ChatsService);

    ChatsService.$injection = ['$resource'];

    function ChatsService($resource) {

        var localhost = "http://localhost:8080/";
        var dev = "https://platine-groupin.herokuapp.com/";

        return $resource(localhost + 'chats');

    }
})();