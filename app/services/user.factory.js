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

        var user = {
            "name":"",
            "email":"",
            "photo":"",
            "providerId":"",
            "uid":""
        };

        this.create = function(data){
            user.name = data.displayName;
            user.email = data.email;
            user.photo = data.photoURL;
            user.providerId = data.providerId;
            user.uid = data.uid;
            UserService.save(user);
            return user;
        }

        this.getUser = function(){
            return user;
        }

        this.cleanUser = function(){
            this.user = {
                "name":"",
                "email":"",
                "photo":"",
                "providerId":"",
                "uid":""
            };
        }

    }

})();
