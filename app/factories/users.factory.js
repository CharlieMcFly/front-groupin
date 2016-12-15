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
        }

    }

})();