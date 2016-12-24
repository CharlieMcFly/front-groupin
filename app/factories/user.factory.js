/**
 * Created by Charlie on 27/10/2016.
 */
(function(){
    'use strict';
    angular
        .module('app')
        .service('User', User);

    User.$injection = ['UserService', 'Users', 'NotifsAmisService', 'Groups'];

    function User(UserService, Users, NotifsAmisService, Groups){

        var user = {};
        var notifsAmis = {};

        this.login = function(data){
            // Creation de l'utilisateur dans la db
            this.user = UserService.save(data.providerData[0]);
            return this.user;
        };

        this.getUser = function(){
            return this.user;
        };

        this.setUser = function(data){
            this.user = data.data;
            console.log(Object.keys(this.user));
        };

        /**
         * Renvoie un tableau d'amis
         * @returns {Array}
         */
        this.getFriends = function(){
            var friends = [];
            var users = Users.getAllUsers();
            var u = this.user.user;
            if(u.friends != undefined){
                Object.keys(u.friends).forEach(function(key,index) {
                    friends.push(users.users[key]);
                });
            }
            return friends;
        };

        this.getGroups = function(){
            var g = [];
            var groups = Groups.getAllGroups();
            var u = this.user.user;
            if(u.groups != undefined){
                Object.keys(u.groups).forEach(function(key,index) {
                    g.push(groups.groups[key]);
                });
            }
            return g;
        }


        this.logout = function(){
            this.user = {};


        };

    }

})();
