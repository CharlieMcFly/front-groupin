/**
 * Created by Charlie on 27/10/2016.
 */
(function(){
    'use strict';
    angular
        .module('app')
        .service('User', User);

    User.$injection = ['UserService', 'FriendsService', 'UserGroupsService'];

    function User(UserService, FriendsService, UserGroupsService){

        var user = {};
        var friends = {};
        var groups= {};

        this.login = function(data){
            // Creation de l'utilisateur dans la db
            this.user = UserService.save(data.providerData[0]);
            this.friends = FriendsService.get({uid : this.user.uid});
            this.groups = UserGroupsService.get({uid : this.user.uid});
            return this.user;
        }

        this.getFriends = function(){
            return this.friends;
        }

        this.setFriends = function(data){
            this.friends = data;
        }

        this.getGroups = function(){
            return this.groups;
        }

        this.getUser = function(){
            return this.user;
        }

        this.logout = function(){
            this.user = {};
            this.friends = {};
            this.groups = {};
        }

    }

})();
