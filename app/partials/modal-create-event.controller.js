/**
 * Created by charlie on 21/12/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('modalCreateEventController', modalCreateEventController);

    modalCreateEventController.$inject = ['$uibModalInstance'] ;

    function modalCreateEventController ($uibModalInstance) {

        var vm = this;

        vm.cancel = function(){
            $uibModalInstance.dismiss();
        };

        vm.creer = function(){
            var event = {
                "nom": vm.nomE,
                "description": vm.descE,
                "dateDebut": vm.dateD._i,
                "dateFin": vm.dateF._i,
                "theme": vm.theme,
                "prix" : vm.prix,
                "obj": vm.obj,
                "photoURL": vm.photoURL
            };
            $uibModalInstance.close(event);
        };

    }
})();