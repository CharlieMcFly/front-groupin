/**
 * Created by charlie on 24/12/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('modalAjoutMembreController', modalAjoutMembreController);

    modalAjoutMembreController.$inject = ['Users', 'User', '$uibModalInstance', 'Groups'] ;

    function modalAjoutMembreController (Users, User, $uibModalInstance, Groups) {

        var vm = this;
        var user = User.getUser();
        var groupS = Groups.getGroupSelected();

        vm.users = Users.getAllUsersAddMembers(user, groupS);

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
            userToAdd = [];
        }

    }
})();