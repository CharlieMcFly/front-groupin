/**
 * Created by charlie on 16/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('groupsController', groupsController);

    groupsController.$inject = ['$uibModal', 'User','Groups', 'GroupsService'];

    function groupsController ($uibModal, User, Groups, GroupsService) {

        var vm = this;
        var user = User.getUser().user;
        var ugroups = User.getGroups();
        var groups = Groups.getAllGroups();

        vm.affiche = false;

        vm.groups = [];
        // Affichage des groups
        if(ugroups.groups != undefined){
            Object.keys(ugroups.groups).forEach(function(key,index) {
                vm.groups.push(groups.groups[key]);
            });
        }

        vm.afficheGroupe = function(group){
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
                GroupsService.save(group);
            });
        };
    }
})();
