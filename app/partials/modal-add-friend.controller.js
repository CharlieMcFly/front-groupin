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
        var user = User.getUser();

        // renvoie un tableau avec tous les utilisateurs nous meme et nos amis
        vm.users = Users.getAllUsersAddFriends(user);

        var userToAdd = [];
        vm.selectionAmis = function(user){
            if(userToAdd.indexOf(user) < 0){
                user.isSelected = true;
                userToAdd.push(user);
            }
            else{
                user.isSelected  = false;
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