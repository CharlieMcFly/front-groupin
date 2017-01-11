/**
 * Created by Charlie on 27/10/2016.
 */
(function(){
    'use strict';
    angular
        .module('app')
        .service('User', User);

    User.$injection = ['UserService', 'Users'];

    function User(UserService, Users){

        var user = {};

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
            if(data){
                if(data.data){
                    if(data.data.user)
                        this.user =data.data.user;
                    else
                        this.user = data.data;
                }else{
                    this.user = data;
                }
            }
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

        this.logout = function(){
            this.user = {};


        };

    }

})();
