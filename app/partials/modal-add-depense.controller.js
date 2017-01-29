/**
 * Created by charlie on 16/01/17.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('modalAddDepenseController', modalAddDepenseController);

    modalAddDepenseController.$inject = ['$uibModalInstance', 'Groups', 'User'] ;

    function modalAddDepenseController ($uibModalInstance, Groups, User) {

        var vm = this;
        var user = User.getUser();
        var groupS = Groups.getGroupSelected();
        vm.membres = Groups.getMembers(user);

        vm.cancel = function(){
            $uibModalInstance.dismiss();
        };

        vm.dismiss = function(){
            vm.messageKO = null;
        };

        var userToAdd = [];
        vm.selectionPayeurPour = function(user){
            if(userToAdd.indexOf(user.uid) < 0){
                user.isSelected = true;
                userToAdd.push(user.uid);
            }
            else{
                user.isSelected  = false;
                var pos = userToAdd.indexOf(user.uid);
                userToAdd.splice(pos,1);
            }
        };

        vm.creer = function(){
            var bill = {
                "what" : vm.what,
                "id" : groupS.id,
                "uid" : vm.payeur.uid,
                "payerTab" : userToAdd,
                "prix" : vm.prix
            };
            $uibModalInstance.close(bill);

        };


    }
})();