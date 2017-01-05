/**
 * Created by charlie on 17/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('groupMembresController', groupMembresController);

    groupMembresController.$inject = ['Groups', 'NotifsGroupsService','$uibModal', 'User', 'NotifsAmisService'];

    function groupMembresController (Groups, NotifsGroupsService,  $uibModal, User, NotifsAmisService) {

        var vm = this;
        var user = User.getUser();
        var groupS = Groups.getGroupSelected();

        vm.user = user;
        vm.membres = Groups.getMembers(user);

        // ADD AMIS
        vm.addAmis = function(uid){
            var data = {
                "uidD" : user.uid,
                "uidR" : uid
            };
            NotifsAmisService.save(data);
        };

        // ADDMEMBRES
        vm.openAddMembers = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/partials/modal-add-members.html',
                controller: 'modalAjoutMembreController',
                controllerAs: 'vm'
            });

            modalInstance.result.then(function (users) {
                users.forEach(function(entry){
                    var data = {
                        "idG" : groupS.id,
                        "uidR" : entry.uid
                    }
                    NotifsGroupsService.save(data);
                });
            });
        };

    }
})();
