/**
 * Created by Charlie on 27/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('indexController', indexController);

    indexController.$inject = ['$state', 'Config'];



    function indexController ($state, Config) {
        var vm = this;
        var authObj = Config.auth;

        vm.logout = function () {
            authObj.$signOut();
            $state.go('home');
        }
    }
})();
