/**
 * Created by Charlie on 27/10/2016.
 */
(function () {
'use strict';

    angular
        .module('app')
        .controller('mainController', mainController);

    mainController.$inject = ['$state'];
    function mainController($state) {

        var vm = this;
        vm.navigateTo = function (state) {
            $state.go(state);
        }
    }

})();