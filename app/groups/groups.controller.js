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

        // GET ALL GROUP USER
        $http.get( mode.dev + "groups/"+user.uid).then(function(d){
            vm.groups = d.data.groups;
            user = d.data.user;
            vm.affiche = false;
            if(vm.groups.length)
                vm.hasGroup = true;
            else
                vm.hasNoGroup = true;
        });

        // DELETE USER GROUP
        vm.quitGroupe = function(){
            var r = confirm("Êtes vous sûr de vouloir quitter le groupe ?");
            if (r == true) {
                var g = Groups.getGroupSelected();
                vm.hasGroup = false;
                vm.hasNoGroup = false;
                $http.delete(mode.dev + "users/" + user.uid + "/groups/" + g.id).then(function (data) {
                    vm.affiche = false;
                    User.setUser(data);
                    vm.groups = data.data.groups;
                    vm.messageOK = "Vous avez quitté le groupe";
                    if(vm.groups.length)
                        vm.hasGroup = true;
                    else
                        vm.hasNoGroup = true;
                });
            }
        };

        // RELOAD GROUPS
        vm.reloadGroups = function(){
            vm.hasGroup = null;
            vm.hasNoGroup = null;
            $http.get( mode.dev + "groups/"+user.uid).then(function(d){
                vm.groups = d.data.groups;
                vm.affiche = false;
                if(vm.groups.length)
                    vm.hasGroup = true;
                else
                    vm.hasNoGroup = true;
            });
        };

        // REMOVE ALERT
        vm.dismiss = function(){
            vm.messageOK = null;
        };

        // DISPLAY GROUPE
        vm.afficheGroupe = function(group){
            $state.go('profile.groups');
            vm.affiche = true;
            vm.group = group;
            vm.nomG = group.nom;
            vm.descG = group.description;
            Groups.setGroupSelected(group);
        };

        // CREATE A GROUPE
        vm.open = function () {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/partials/modal-create-group.html',
                controller: 'modalCreateGroupeController',
                controllerAs: 'vm'
            });

            modalInstance.result.then(function (group) {
                vm.hasGroup = false;
                vm.hasNoGroup = false;
                group['uid'] = user.uid;
                group['email'] = user.email;
                $http.post(mode.dev + "groups", group).then(function(data){
                    User.setUser(data);
                    vm.groups = data.data.groups;
                    vm.messageOK = "Le groupe "+group.nom+" a bien été créé.";
                    if(vm.groups.length)
                        vm.hasGroup = true;
                    else
                        vm.hasNoGroup = true;
                });
            });
        };

        // MODIFY A GROUPE
        vm.modifGroupe = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/partials/modal-update-group.html',
                controller: 'modalUpdateGroupeController',
                controllerAs: 'vm'
            });

            modalInstance.result.then(function (group) {
                group['uid'] = user.uid;
                $http.post(mode.dev+"groups/edit", group).then(function(data){
                    vm.affiche = false;
                    $state.go("profile.groups");
                    User.setUser(data);
                    vm.groups = data.data.groups;
                    vm.messageOK = "Le groupe a été correctement modifié";
                    if(vm.groups.length)
                        vm.hasGroup = true;
                    else
                        vm.hasNoGroup = true;
                })
            });
        };
    }
})();
