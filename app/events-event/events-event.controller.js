/**
 * Created by charlie on 17/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('eventController', eventController);

    eventController.$inject = [];

    function eventController () {
        var vm = this;

        vm.hello = "hello";
    }
})();
