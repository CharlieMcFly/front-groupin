/**
 * Created by charlie on 17/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('groupVotesController', groupVotesController);

    groupVotesController.$inject = [];

    function groupVotesController () {
        var vm = this;

        vm.hello = "hello";
    }
})();
