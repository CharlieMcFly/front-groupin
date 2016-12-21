/**
 * Created by Charlie on 27/10/2016.
 */
(function(){
    'use strict';
    angular
        .module('app')
        .service('User', User);

    User.$injection = ['UserService', 'FriendsService', 'UserGroupsService', 'UserEventsService'];

    function User(UserService, FriendsService, UserGroupsService, UserEventsService){

        var user = {};
        var friends = {};
        var groups= {};
        var events = {};

        this.login = function(data){
            // Creation de l'utilisateur dans la db
            this.user = UserService.save(data.providerData[0]);
            this.friends = FriendsService.get({uid : this.user.uid});
            this.groups = UserGroupsService.get({uid : this.user.uid});
            this.events = UserEventsService.get({uid : this.user.uid});
            return this.user;
        }

        this.getFriends = function(){
            return this.friends;
        }

        this.getGroups = function(){
            return this.groups;
        }

        this.getUser = function(){
            return this.user;
        }

        this.getEvents = function(){
            return this.events;
        }

        this.logout = function(){
            this.user = {};
            this.friends = {};
            this.groups = {};
            this.events = {};
        }

    }

})();
