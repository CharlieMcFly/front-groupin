/**
 * Created by charlie on 25/12/16.
 */
(function() {
    'use strict';
    angular
        .module('app')
        .factory('VotesService', VotesService);

    VotesService.$injection = ['$resource'];

    function VotesService($resource) {

        var localhost = "http://localhost:8080/";
        var dev = "https://platine-groupin.herokuapp.com/";

        return $resource(localhost + 'votes/:uid');

    }
})();