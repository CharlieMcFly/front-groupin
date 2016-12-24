/**
 * Created by charlie on 13/12/16.
 */
(function(){
    'use strict';
    angular
        .module('app')
        .service('Users', Users);

    Users.$injection = ['UserService'];

    function Users(UserService){

        var users = {};

        this.getAllUsers = function(){
            if(this.users == undefined)
                this.users = UserService.get();
            return this.users;
        };

        this.getAllUsersAddFriends = function(user){
            var users = this.users;
            var tabUser = [];
            if(users.users != undefined){
                Object.keys(users.users).forEach(function(key) {
                    if(user.friends != undefined){
                        if(user.friends[key] == undefined && key != user.uid)
                            tabUser.push(users.users[key]);
                    }else{
                        if(key != user.uid)
                            tabUser.push(users.users[key]);
                    }
                });
            }
            return tabUser;
        };

        this.getAllUsersAddMembers = function(user){
            var users = this.users;
            var tabUser = [];
            if(users.users != undefined){
                Object.keys(users.users).forEach(function(key) {
                    // Si amis
                    if(user.friends != undefined) {
                        // si c'est un ami du user alors property specifique
                        if (user.friends[key] != undefined && key != user.uid) {
                            var f = users.users[key];
                            f.isMyFriend = true;
                            tabUser.push(f);
                        }
                        // sinon on l'ajout
                        else {
                            if (key != user.uid)
                                tabUser.push(users.users[key]);
                        }
                    }
                    // Si pas d'amis ajouter d'office
                    else {
                        if (key != user.uid)
                            tabUser.push(users.users[key]);
                    }
                });
            }
            return tabUser;
        };

    }

})();