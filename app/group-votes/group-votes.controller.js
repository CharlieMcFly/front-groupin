/**
 * Created by charlie on 17/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('groupVotesController', groupVotesController);

    groupVotesController.$inject = ['$uibModal', 'User', 'Groups', 'Votes', '$http', '$state'];

    function groupVotesController ($uibModal, User, Groups, Votes, $http, $state) {

        var vm = this;
        var user = User.getUser();
        var votes = Votes.getAllVotes();
        var groupS = Groups.getGroupSelected();


        vm.votes = Groups.getVotesGroup(user);

        vm.aVote = function(vote){
            if(vm.reponse){
                var v = {
                    "uid"   :   user.uid,
                    "idVote" : vote,
                    "reponse" : vm.reponse
                };
                 $http.post("http://localhost:8080/votes/users", v).then(function(data){
                    reload(data);
                 });
            }
        };

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
                $http.post("http://localhost:8080/votes", vote).then(function(data){
                    reload(data);
                });

            });
        }

        function reload(data){
            $state.go('profile.groups.votes');
            Votes.setAllVotes(data);
            Groups.setAllGroups(data);
            var g = Groups.getAllGroups().groups[groupS.id];
            Groups.setGroupSelected(g);

            vm.votes = Groups.getVotesGroup(user);
            console.log(vm.votes);
        }

    }
})();
