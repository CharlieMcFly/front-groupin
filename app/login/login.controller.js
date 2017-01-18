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
            angular.element('#logo').css('-webkit-animation', 'spin 8s linear infinite');
            angular.element('#logo').css('-moz-animation', 'spin 8s linear infinite');
            angular.element('#logo').css('animation', 'spin 8s linear infinite');
            Auth.register(vm.email, vm.password);
        }
        vm.googleLogin = function () {
            angular.element('#logo').css('-webkit-animation', 'spin 8s linear infinite');
            angular.element('#logo').css('-moz-animation', 'spin 8s linear infinite');
            angular.element('#logo').css('animation', 'spin 8s linear infinite');
            Auth.firebaseAuthLogin('google');
        }
        vm.facebookLogin = function () {
            angular.element('#logo').css('-webkit-animation', 'spin 8s linear infinite');
            angular.element('#logo').css('-moz-animation', 'spin 8s linear infinite');
            angular.element('#logo').css('animation', 'spin 8s linear infinite');
            Auth.firebaseAuthLogin('facebook');
        }

    }
})();
