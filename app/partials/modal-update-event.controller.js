/**
 * Updated by charlie on 21/12/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('modalUpdateEventController', modalUpdateEventController);

    modalUpdateEventController.$inject = ['$uibModalInstance', 'Groups'] ;

    function modalUpdateEventController ($uibModalInstance, Groups) {

        var vm = this;
        vm.event = Groups.getEventSelected();

        vm.cancel = function(){
            $uibModalInstance.dismiss();
        };

        vm.dismiss = function(){
            vm.messageKO = null;
        };

        vm.modifier = function(){
            if(vm.event.dateDebutNew != undefined && vm.event.dateFinNew != undefined) {
                if(checkDate(vm.event.dateDebutNew, vm.event.dateFinNew))
                    $uibModalInstance.close(vm.event);
                else
                    vm.messageKO = "Probleme with the date";
            }else{
                $uibModalInstance.close(vm.event);
            }
        };

        function checkDate(dateD, dateF){
            var ojd = new Date();
            var d = dateD.toDate();
            var f = dateF.toDate();
            if(d.getTime() === f.getTime()){
                vm.messageKO = "La date de début et la date de fin ne peuvent pas être égales";
                return false;
            }else if (d.getTime() > f.getTime()){
                vm.messageKO = "La date de début doit être avant la date de fin";
                return false;
            }else if (d.getTime() < ojd.getTime()){
                vm.messageKO = "La date de début doit être égale ou après la date d'aujourd'hui";
                return false;
            }else{
                return true;
            }
        }

    }
})();