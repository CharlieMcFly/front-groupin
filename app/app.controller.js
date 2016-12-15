/**
 * Created by Charlie on 27/10/2016.
 */
(function () {
'use strict';

    angular
        .module('app')
        .controller('mainController', mainController);

    mainController.$inject = ['Config', '$state', 'User'];
    function mainController(Config, $state, User) {
        var vm = this;

        Config.init;
        var authObj = Config.auth;
        var ref = Config.ref;

        init();

        // Récupérer le current user
        function init (){
            authObj.$onAuthStateChanged(authDataCallback);
            if (authObj.$getAuth())
                $state.go('profile');
            else
                $state.go('login');
        }

        // Callback pour récupérer les données du user
        function authDataCallback(authData) {
            if (authData) {
                User.login(authData);
                $state.go('profile');
            }else{
                User.cleanUser();
                $state.go('login');
            }
        }

    }

})();