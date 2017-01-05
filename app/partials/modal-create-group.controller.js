/**
 * Created by charlie on 21/12/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('modalCreateGroupeController', modalCreateGroupeController);

    modalCreateGroupeController.$inject = ['$uibModalInstance'] ;

    function modalCreateGroupeController ($uibModalInstance) {

        var vm = this;
        var group = {};

        vm.cancel = function(){
            $uibModalInstance.dismiss();
        };

        vm.dismiss = function(){
            vm.messageKO = null;
        };

        vm.creer = function(){
            group = {
                "nom" : vm.nom,
                "description" : vm.description,
                "photoURL" : vm.photoURL
            };
            if(vm.nom && vm.description && vm.photoURL)
                $uibModalInstance.close(group);
            else
                vm.messageKO = "Tous les champs doivents être remplis !";
        }

    }
})();