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
        vm.objsNew = [];
        vm.dateF = null;
        vm.dateD = null;

        if(vm.event.theme){
            vm.haveTheme = true;
        }
        if(vm.event.prix){
            vm.havePrix = true;
        }
        if(vm.event.obj){
            vm.haveObj = true;
            for(var i = 0; i< vm.event.obj.length ; i++){
                vm.objsNew.push({"obj": vm.event.obj[i]});
            }
        }

        // ADD OBJECt
        vm.ajouterObj = function(){
            vm.objsNew.push({"obj": ""});
        };

        // REMOVE OBJECT
        vm.supprimerObj = function(){
            vm.objsNew.pop();
        };

        // REMOVE MODAL
        vm.cancel = function(){
            $uibModalInstance.dismiss();
        };

        // REMOVE ALERT
        vm.dismiss = function(){
            vm.messageKO = null;
        };

        // MODIFY
        vm.modifier = function(){
            if(vm.event.nom && vm.event.description && vm.event.photoURL){
                if(vm.dateD && vm.dateF){
                    if(checkDate(vm.dateD, vm.dateF) && checkObj()) {
                        vm.event.dateDebut = vm.dateD.toDate().getTime();
                        vm.event.dateFin = vm.dateF.toDate().getTime();
                        vm.event.obj = vm.objsNew;
                        $uibModalInstance.close(vm.event);
                    }
                }
                else{
                    if(checkObj()){
                        vm.event.obj = vm.objsNew;
                        $uibModalInstance.close(vm.event);
                    }
                    else
                        vm.messageKO = "Il y a un problème avec la liste d'objets";
                }
            }else {
                vm.messageKO = "Certains champs ne sont pas remplies.";
            }
        };

        // TOGGLE THEME
        vm.toggleTheme = function(){
            if(!vm.haveTheme || vm.haveTheme == undefined)
                vm.haveTheme = true;
            else
                vm.haveTheme = false;
        };

        // TOGGLE PRIX
        vm.togglePrix = function(){
            if(!vm.havePrix || vm.havePrix == undefined)
                vm.havePrix = true;
            else
                vm.havePrix = false;
        };

        // TOGGLE OBJ
        vm.toggleObj = function(){
            if(!vm.haveObj || vm.haveObj == undefined)
                vm.haveObj = true;
            else
                vm.haveObj = false;
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

        function checkObj(){
            if(vm.haveObj == false){
                vm.objsNew = false;
                return true;
            }else{
                if(vm.objsNew.length == 0){
                    vm.objsNew = false;
                }else{
                    for(var i = 0; i < vm.objsNew.length ; i++){
                        if(vm.objsNew[i].obj == undefined || vm.objsNew[i].obj == null || vm.objsNew[i].obj == ""){
                            vm.messageKO = "Un objet à prendre n'a pas de valeur veuillez vérifier";
                            return false;
                        }
                    }
                }
                return true;
            }
        }

    }
})();