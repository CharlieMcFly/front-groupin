/**
 * Created by charlie on 17/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('groupEventController', groupEventController);

    groupEventController.$inject = [];

    function groupEventController () {
        var vm = this;

        vm.hello = "hello";
    }
})();
