/**
 * Updated by charlie on 21/12/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('modalUpdateGroupeController', modalUpdateGroupeController);

    modalUpdateGroupeController.$inject = ['$uibModalInstance', 'Groups'] ;

    function modalUpdateGroupeController ($uibModalInstance, Groups) {

        var vm = this;
        vm.group = Groups.getGroupSelected();

        vm.cancel = function(){
            $uibModalInstance.dismiss();
        };

        vm.dismiss = function(){
            vm.messageKO = null;
        };

        vm.modifier = function(){
            if(vm.group.nom && vm.group.description && vm.group.photoURL)
                $uibModalInstance.close(vm.group);
            else
                vm.messageKO = "Tous les champs doivents être remplis !";
        }

    }
})();