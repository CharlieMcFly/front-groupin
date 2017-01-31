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
            })
            .state('profile.amis', {
                url: '/amis',
                templateUrl: 'app/amis/amis.html'
            })
            .state('profile.events', {
                url: '/events',
                templateUrl: 'app/events/events.html'
            })
            .state('profile.events.event', {
                url: '/event',
                templateUrl: 'app/events-event/events-event.html'
            })
            .state('profile.events.votes', {
                url: '/events-votes',
                templateUrl: 'app/events-votes/events-votes.html'
            })
            .state('profile.groups', {
                url: '/groups',
                templateUrl: 'app/groups/groups.html'
            })
            .state('profile.groups.events', {
                url: '/events',
                templateUrl: 'app/group-events/group-events.html'
            })
            .state('profile.groups.membres', {
                url: '/membres',
                templateUrl: 'app/group-membres/group-membres.html'
            })
            .state('profile.groups.votes', {
                url: '/votes',
                templateUrl: 'app/group-votes/group-votes.html'
            })
            .state('profile.groups.euro', {
                url: '/euro',
                templateUrl: 'app/group-euro/group-euro.html'
            })
            .state('profile.groups.chat', {
                url: '/chat',
                templateUrl: 'app/group-chat/group-chat.html'
            })

            ;
    }
})();