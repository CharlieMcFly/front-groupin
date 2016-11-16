/**
 * Created by Charlie on 27/10/2016.
 */
(function(){
    'use strict';
    angular
        .module('app')
        .service('User', User);

    User.$injection = ['UserService'];

    function User(UserService){

        var user = {};

        this.create = function(data){

            // Creation de l'utilisateur dans l'application
            user.name = data.providerData[0].displayName;
            user.email = data.providerData[0].email;
            user.photo = data.providerData[0].photoURL;
            user.providerId = data.providerData[0].providerId;
            user.uid = data.providerData[0].uid;

            // Creation de l'utilisateur dans la db
            UserService.save(data.providerData[0]);

            return user;
        }

        this.getUser = function(uid){
            return user;
        }

        this.cleanUser = function(){
            this.user = {};
        }

    }

})();
