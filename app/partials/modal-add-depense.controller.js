/**
 * Created by charlie on 16/01/17.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('modalAddDepenseController', modalAddDepenseController);

    modalAddDepenseController.$inject = ['$uibModalInstance'] ;

    function modalAddDepenseController ($uibModalInstance) {

        var vm = this;

        vm.cancel = function(){
            $uibModalInstance.dismiss();
        };

        vm.dismiss = function(){
            vm.messageKO = null;
        };

        vm.creer = function(){

        };


    }
})();