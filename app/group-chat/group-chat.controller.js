/**
 * Created by charlie on 17/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('groupChatController', groupChatController);

    groupChatController.$inject = [];

    function groupChatController () {
        var vm = this;

        vm.hello = "hello";
    }
})();
