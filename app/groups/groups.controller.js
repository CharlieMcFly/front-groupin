/**
 * Created by charlie on 16/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('groupsController', groupsController);

    groupsController.$inject = ['$uibModal', 'User','Groups', 'GroupsService', '$http', '$state'];

    function groupsController ($uibModal, User, Groups, GroupsService, $http, $state) {

        var vm = this;
        var user = User.getUser().user;

        vm.affiche = false;
        vm.groups = User.getGroups();


        vm.quitGroupe = function(){
            var g = Groups.getGroupSelected();
            $http.delete("http://localhost:8080/users/"+user.uid+"/groups/"+g.id).then(function(u){
                vm.affiche = false;
                User.setUser(u);
                vm.groups = User.getGroups();
            });
        };

        vm.afficheGroupe = function(group){
            $state.go('profile.groups');
            vm.affiche = true;
            vm.nomG = group.nom;
            vm.descG = group.description;
            Groups.setGroupSelected(group);
        };

        vm.open = function (size) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/partials/modal-create-group.html',
                controller: 'modalCreateGroupeController',
                controllerAs: 'vm'
            });

            modalInstance.result.then(function (group) {
                group['uid'] = user.uid;
                $http.post("http://localhost:8080/groups", group).then(function(data){
                    Groups.setAllGroups(data);
                    User.setUser(data);
                    vm.groups = User.getGroups();
                });
            });
        };
    }
})();
