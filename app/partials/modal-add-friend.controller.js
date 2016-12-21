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

        var vm = this;
        var user = User.getUser().user;
        var users = Users.getAllUsers();
        var friends = User.getFriends();


        vm.users = [];
        if(users.users != undefined){
            Object.keys(users.users).forEach(function(key) {
                if(friends.friends != undefined){
                    if(friends.friends[key] == undefined && key != user.uid)
                        vm.users.push(users.users[key]);
                }else{
                    if(key != user.uid)
                        vm.users.push(users.users[key]);
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