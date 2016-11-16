/**
 * Created by Charlie on 27/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('profileController', profileController);

    profileController.$inject = ['$state','Config', 'User'];

    function profileController ($state, Config, User) {
        var vm = this;
        var authObj = Config.auth;

        if(User.getUser().name == undefined)
            vm.name = User.getUser().email;
        else
            vm.name = User.getUser().name;

        vm.logout = function () {
            authObj.$signOut();
            $state.go('login');
        }

    }
})();
