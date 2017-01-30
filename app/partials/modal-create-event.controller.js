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
        vm.objs = [];
        vm.haveTheme = false;
        vm.havePrix = false;
        vm.haveObj = false;

        // ADD OBJECt
        vm.ajouterObj = function(){
            vm.objs.push({"obj": ""});

        };

        // REMOVE OBJECT
        vm.supprimerObj = function(){
            vm.objs.pop();
        };

        // CANCEL WINDOW
        vm.cancel = function(){
            $uibModalInstance.dismiss();
        };

        // REMOVE ALERT
        vm.dismiss = function(){
            vm.messageKO = null;
        };

        // CREATE EVENT
        vm.creer = function(){
            if(vm.nomE && vm.descE && vm.dateD && vm.dateF && vm.photoURL ){
                if(checkDate(vm.dateD, vm.dateF) && checkObj()){
                    var event = {
                        "nom": vm.nomE,
                        "description": vm.descE,
                        "dateDebut": vm.dateD.toDate().getTime(),
                        "dateFin": vm.dateF.toDate().getTime(),
                        "theme": vm.theme,
                        "prix" : vm.prix,
                        "obj": vm.objs,
                        "photoURL": vm.photoURL
                    };
                    $uibModalInstance.close(event);
                }
            }else{
                vm.messageKO = "Le nom, la description, les dates et la photo doivent être remplis ";
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

        // CHECK DATE BEGIN & END
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
                vm.objs = false;
                return true;
            }else{
                if(vm.objs.length == 0){
                    vm.objs = false;
                }else{
                    for(var i = 0; i < vm.objs.length ; i++){
                        if(vm.objs[i].obj == undefined || vm.objs[i].obj == null || vm.objs[i].obj == ""){
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