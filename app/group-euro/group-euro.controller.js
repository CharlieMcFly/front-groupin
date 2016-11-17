/**
 * Created by charlie on 17/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('groupEuroController', groupEuroController);

    groupEuroController.$inject = [];

    function groupEuroController () {
        var vm = this;

        vm.hello = "hello";
    }
})();
