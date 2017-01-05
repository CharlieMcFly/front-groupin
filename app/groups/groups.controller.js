/**
 * Created by charlie on 16/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('groupsController', groupsController);

    groupsController.$inject = ['$uibModal', 'User','Groups', '$http', '$state', 'mode'];

    function groupsController ($uibModal, User, Groups, $http, $state, mode) {

        var vm = this;
        var user = User.getUser();

        // GET USER
        $http.get( mode.dev + "users/"+user.uid).then(function(d){
            user = d.data.user;
        });

        // GET ALL GROUP USER
        $http.get( mode.dev + "groups/"+user.uid).then(function(d){
            vm.groups = d.data.groups;
            vm.affiche = false;
        });

        // DELETE USER GROUP
        vm.quitGroupe = function(){
            var g = Groups.getGroupSelected();
            $http.delete( mode.dev +"users/"+user.uid+"/groups/"+g.id).then(function(data){
                vm.affiche = false;
                User.setUser(data);
                vm.groups = data.data.groups;
                vm.messageOK = "Vous avez quitté le groupe";
            });
        };

        // REMOVE ALERT
        vm.dismiss = function(){
            vm.messageOK = null;
        };

        vm.afficheGroupe = function(group){
            $state.go('profile.groups');
            vm.affiche = true;
            vm.nomG = group.nom;
            vm.descG = group.description;
            Groups.setGroupSelected(group);
        };

        vm.open = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/partials/modal-create-group.html',
                controller: 'modalCreateGroupeController',
                controllerAs: 'vm'
            });

            modalInstance.result.then(function (group) {
                group['uid'] = user.uid;
                $http.post("http://localhost:8080/groups", group).then(function(data){
                    User.setUser(data);
                    vm.groups = data.data.groups;
                    vm.messageOK = "Le groupe "+group.nom+" a bien été créé."
                });
            });
        };
    }
})();
