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

        vm.ajouterChoix = function(){
            vm.choices.push({"choix": ""});
        };


        vm.supprimerChoix = function(){
            vm.choices.pop();
        };

        vm.cancel = function(){
            $uibModalInstance.dismiss();
        };

        vm.creer = function(){
            vote = {
                "question" : vm.question,
                "choix" : vm.choices
            };
            if(vm.choices.length >= 2 )
                $uibModalInstance.close(vote);
        }

    }
})();