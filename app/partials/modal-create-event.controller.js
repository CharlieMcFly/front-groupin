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

        vm.dismiss = function(){
            vm.messageKO = null;
        };

        vm.creer = function(){
            if(vm.nomE && vm.descE && vm.dateD && vm.dateF && vm.photoURL){
                if(checkDate(vm.dateD, vm.dateF)){
                    var event = {
                        "nom": vm.nomE,
                        "description": vm.descE,
                        "dateDebut": vm.dateD.toDate().getTime(),
                        "dateFin": vm.dateF.toDate().getTime(),
                        "theme": vm.theme,
                        "prix" : vm.prix,
                        "obj": vm.obj,
                        "photoURL": vm.photoURL
                    };
                    $uibModalInstance.close(event);
                }
            }else{
                vm.messageKO = "Le nom, la description, les dates et la photo doivent être remplis ";
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