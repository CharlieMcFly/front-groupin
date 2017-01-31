/**
 * Created by charlie on 21/12/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('modalCreateVoteController', modalCreateVoteController);

    modalCreateVoteController.$inject = ['$uibModalInstance'] ;

    function modalCreateVoteController ($uibModalInstance) {

        var vm = this;
        var vote = {};
        vm.choices = [];

        // TOGGLE QCM
        vm.toggleQcm = function(){
            if(!vm.qcm || vm.qcm == undefined)
                vm.qcm = true;
            else
                vm.qcm = false;
        };

        // ADD CHOICE
        vm.ajouterChoix = function(){
            vm.choices.push({"choix": ""});
        };

        // REMOVE ALERT
        vm.dismiss = function(){
          vm.messageKO_V = null;
        };

        // REMOVE CHOICe
        vm.supprimerChoix = function(){
            vm.choices.pop();
        };

        // CANCEL
        vm.cancel = function(){
            $uibModalInstance.dismiss();
        };

        // CREATE
        vm.creer = function(){
            if(vm.question){
                vote = {
                    "question" : vm.question,
                    "choix" : vm.choices,
                    "qcm" : vm.qcm
                };
                if(vm.choices.length >= 2 ){
                    $uibModalInstance.close(vote);
                }else{
                    vm.messageKO_V = "Il faut au moins 2 choix pour le vote";
                }
            }else{
                vm.messageKO_V = "Il faut une question pour créer un vote";
            }
        }

    }
})();