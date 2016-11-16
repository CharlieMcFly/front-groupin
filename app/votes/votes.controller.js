/**
 * Created by charlie on 16/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('votesController', votesController);

    votesController.$inject = [];

    function votesController () {
        var vm = this;

        vm.hello = "hello";
    }
})();
