/**
 * Created by Charlie on 27/10/2016.
 */
(function () {
'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);

    loginController.$inject = ['Auth'];

    function loginController (Auth) {

        var vm = this;

        vm.signIn = function(){
            Auth.register(vm.email, vm.password);
        }
        vm.googleLogin = function () {
            Auth.firebaseAuthLogin('google');
        }
        vm.facebookLogin = function () {
            Auth.firebaseAuthLogin('facebook');
        }

    }
})();
