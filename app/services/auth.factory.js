/**
 * Created by Charlie on 10/11/2016.
 */
(function(){
    'use strict';
    angular
        .module('app')
        .factory('Auth', Auth);

    Auth.$injection = ['Config'];

    function Auth(Config) {

        var authObj = Config.auth;

        function signIn(email, pwd) {
            authObj.$signInWithEmailAndPassword(email, pwd)
                .then(function (userData) {

                }).catch(function (error) {
                    alert(error.message);
            });
        }


        return {
            // Fonction Auth login for provider
            firebaseAuthLogin : function(provider){
                authObj.$signInWithPopup(provider).then(function (authData) {
                    // Nothing
                }).catch(function (error) {
                    console.error("Authentication failed:", error);
                });
            },
            register : function(email, pwd){
                authObj.$createUserWithEmailAndPassword(email, pwd)
                .then(function(userData) {
                    // Nothing
                }).catch(function(error) {
                    if(error.code == 'auth/email-already-in-use')
                        signIn(email, pwd);
                    else
                        alert(error.message);
                })
            }
        };
    }
})();