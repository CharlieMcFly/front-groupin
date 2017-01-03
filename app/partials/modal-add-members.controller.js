/**
 * Created by charlie on 24/12/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('modalAjoutMembreController', modalAjoutMembreController);

    modalAjoutMembreController.$inject = ['Users', 'User', '$uibModalInstance'] ;

    function modalAjoutMembreController (Users, User, $uibModalInstance) {

        var vm = this;
        var user = User.getUser();

        vm.users = Users.getAllUsersAddMembers(user);

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