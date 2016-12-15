/**
 * Created by Charlie on 27/10/2016.
 */
(function(){
    'use strict';
    angular
        .module('app')
        .service('User', User);

    User.$injection = ['UserService', 'FriendsService'];

    function User(UserService, FriendsService){

        var user = {};
        var friends = {};

        this.login = function(data){
            // Creation de l'utilisateur dans la db
            this.user = UserService.save(data.providerData[0]);
            this.friends = FriendsService.get({uid : this.user.uid});
            return this.user;
        }

        this.getFriends = function(){
            return this.friends;
        }


        this.getUser = function(){
            return this.user;
        }

        this.logout = function(){
            this.user = {};
            this.friends = {};
        }

    }

})();
