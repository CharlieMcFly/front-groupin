/**
 * Created by charlie on 17/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('groupVotesController', groupVotesController);

    groupVotesController.$inject = ['$uibModal', 'User', 'Groups', '$http', 'mode'];

    function groupVotesController ($uibModal, User, Groups, $http, mode) {

        var vm = this;
        var user = User.getUser();
        var groupS = Groups.getGroupSelected();
        vm.user = user;

        // GET ALL VOTES DU GROUPE
        $http.get(mode.dev + "votes/users/"+user.uid+"/groups/"+groupS.id).then(function(data){
            vm.votes = data.data.votes;
            if(vm.votes.length)
                vm.hasVote = true;
            else
                vm.hasNoVote = true;
        });

        // CREATE VOTE
        vm.openCreateVote = function(){

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/partials/modal-create-vote.html',
                controller: 'modalCreateVoteController',
                controllerAs: 'vm'
            });

            modalInstance.result.then(function (vote) {
                vote['createur'] = user.uid;
                vote['group'] = groupS.id;
                $http.post(mode.dev + "votes", vote).then(function(data){
                    User.setUser(data);
                    vm.votes = data.data.votes;
                    vm.messageOK_V = "Le vote a été correctement créé";
                });

            });
        };

        // REMOVE ALERT
        vm.dismiss = function(){
            vm.messageOK_V = null;
        };

        // VOTE
        vm.aVote = function(vote){
            if(vm.reponse){
                var v = {
                    "uid"   :   user.uid,
                    "idVote" : vote,
                    "reponse" : vm.reponse,
                    "group" : groupS.id
                };
                 $http.post(mode.dev + "votes/users", v).then(function(data){
                     User.setUser(data);
                     vm.votes = data.data.votes;
                     vm.messageOK_V = "Votre vote a été pris en compte"
                 });
            }
        };

        // REMOVE VOTE
        vm.removeVote = function(vote){
            $http.delete(mode.dev + "votes/"+vote.id+"/groups/"+groupS.id+"/users/"+user.uid).then(function(data){
                User.setUser(data);
                vm.votes = data.data.votes;
                vm.messageOK_V = "Le vote a été correctement supprimé";
            });
        };
    }
})();
