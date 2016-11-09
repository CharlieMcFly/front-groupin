/**
 * Created by Charlie on 27/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('profileController', profileController);

    profileController.$inject = ['$state', 'Config'];



    function profileController ($state, Config) {
        var vm = this;
        var authObj = Config.auth;

        vm.logout = function () {
            authObj.$signOut();
            $state.go('login');
        }
    }
})();
