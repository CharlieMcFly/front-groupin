/**
 * Created by Charlie on 27/10/2016.
 */
(function () {
'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);

    loginController.$inject = ['$firebaseAuth', '$firebaseObject', '$state', 'Config'];

    function loginController ($firebaseAuth, $firebaseObject, $state, Config) {

        var vm = this;
        vm.isLoggedIn  = false;

        // Configuration
        Config.init;
        var ref = Config.ref;
        var authObj = Config.auth;


        //initialize and get current authenticated state:
        init();

        function init(){
            authObj.$onAuthStateChanged(authDataCallback);
            if (authObj.$getAuth()){
                console.log(authObj.$getAuth());
                vm.isLoggedIn  = true;
            }
        }

        function authDataCallback(authData) {
            if (authData) {
                console.log("User " + authData.uid + " is logged in with " + authData.providerData[0].providerId);
                vm.isLoggedIn = true;
                // Retrieve User
                console.log(authData);
                var user = $firebaseObject(ref.child('users').child(authData.uid));
                user.$loaded().then(function () {
                    if (user.displayName == undefined) {
                        var newUser = authData.providerData[0];
                        user.$ref().set(newUser);
                    }
                });

            } else {
                console.log("User is logged out");
                vm.isLoggedIn = false;
            }
        }

        vm.logout = function () {
            authObj.$signOut();
            $state.go('home');
        }

        vm.signIn = function(){
            authObj.$createUserWithEmailAndPassword(
                vm.email,
                vm.password
            ).then(function(userData) {
                console.log(userData);
            }).catch(function(error) {
                console.log("Error: ", error);
            });
        }
        vm.googleLogin = function () {
            firebaseAuthLogin('google');
        }
        vm.facebookLogin = function () {
            firebaseAuthLogin('facebook');
        }

        // Fonction Auth login for provider
        function firebaseAuthLogin (provider){
            authObj.$signInWithPopup(provider).then(function (authData) {
                console.log("Authenticated successfully with provider " + provider +" with payload:", authData);
            }).catch(function (error) {
                console.error("Authentication failed:", error);
            });

        }
    }
})();
