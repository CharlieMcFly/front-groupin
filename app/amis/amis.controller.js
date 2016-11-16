/**
 * Created by charlie on 15/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('amisController', amisController);

    amisController.$inject = [];

    function amisController () {
        var vm = this;

        vm.hello = "hello";
    }
})();
