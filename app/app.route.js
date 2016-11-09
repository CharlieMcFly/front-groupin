/**
 * Created by Charlie on 27/10/2016.
 */
(function(){
    'use strict';

    angular
        .module('app')
        .config(appRouting);

    appRouting.$inject = ['$stateProvider', '$urlRouterProvider'];

    function appRouting($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('login', {
                url: '/',
                templateUrl: 'app/login/login.html'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'app/profile/profile.html',
                resolve: {
                    // controller will not be loaded until $waitForAuth resolves
                    // Auth refers to our $firebaseAuth wrapper in the example above
                    "currentAuth": ["$firebaseAuth", function ($firebaseAuth) {
                        // $waitForAuth returns a promise so the resolve waits for it to complete
                        var authObj = $firebaseAuth(firebase.auth());

                        return authObj.$requireSignIn();
                    }]
                }
            });
    }
})();