/**
 * Created by Charlie on 23/11/2016.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('modalAjoutFriendController', modalAjoutFriendController);

    modalAjoutFriendController.$inject = ['Users', 'User', '$uibModalInstance'] ;

    function modalAjoutFriendController (Users, User, $uibModalInstance) {

        vm = this;

        var vm = this;
        var friends = User.getFriends();
        var user = User.getUser();
        var users = Users.getAllUsers();

        vm.users = [];
        if(users.data != undefined){
            Object.keys(users.data).forEach(function(key) {
                if(friends.data != undefined){
                    if(friends.data[key] == undefined && key != user.uid)
                        vm.users.push(users.data[key]);
                }else{
                    if(key != user.uid)
                        vm.users.push(users.data[key]);
                }
            });
        }

        var userToAdd = [];
        vm.selectionAmis = function(user){
            if(userToAdd.indexOf(user) < 0)
                userToAdd.push(user);
            else{
               var pos = userToAdd.indexOf(user);
               userToAdd.splice(pos,1);
            }
        }

        vm.cancel = function(){
            $uibModalInstance.dismiss();
        }

        vm.ajouter = function(){
            $uibModalInstance.close(userToAdd);
        }

    }
})();