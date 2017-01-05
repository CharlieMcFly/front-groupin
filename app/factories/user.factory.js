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
            var my_data = data.providerData[0];
            if(my_data.email === my_data.uid){
                var uid = data.uid;
                my_data['uid_mail'] = uid;
            }
            this.user = UserService.save(my_data);
            return this.user;
        };

        this.getUser = function(){
            return this.user;
        };

        this.setUser = function(data){
            this.user = data.data;
        };

        /**
         * Renvoie un tableau d'amis
         * @returns {Array}
         */
        this.getFriends = function(){
            var friends = [];
            var users = Users.getAllUsers();
            var u = this.user;
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
            var u = this.user;
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
