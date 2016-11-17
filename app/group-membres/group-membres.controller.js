/**
 * Created by charlie on 17/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('groupMembresController', groupMembresController);

    groupMembresController.$inject = [];

    function groupMembresController () {
        var vm = this;

        vm.hello = "hello";
    }
})();
