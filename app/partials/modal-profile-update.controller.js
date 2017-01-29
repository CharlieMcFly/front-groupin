/**
 * Created by Charlie on 28-01-17.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('modalUpdateUserController', modalUpdateUserController);

    modalUpdateUserController.$inject = ['$uibModalInstance', 'User'] ;

    function modalUpdateUserController ($uibModalInstance, User) {

        var vm = this;
        vm.user = User.getUser();

        vm.cancel = function(){
            $uibModalInstance.dismiss();
        };

        vm.dismiss = function(){
            vm.messageKO = null;
        };

        vm.modifier = function(){
           if(vm.user.displayName && vm.user.photoURL)
                $uibModalInstance.close(vm.user);
            else
                vm.messageKO = "Tous les champs doivents être remplis !";
        }

    }
})();