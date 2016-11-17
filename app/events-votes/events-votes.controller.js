/**
 * Created by charlie on 16/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('eventsVotesController', eventsVotesController);

    eventsVotesController.$inject = [];

    function eventsVotesController () {
        var vm = this;

        vm.hello = "hello";
    }
})();
