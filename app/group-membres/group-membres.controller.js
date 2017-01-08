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
        console.log(vm.membres);

        // ADD AMIS
        vm.addAmis = function(u){
            var data = {
                "uidD" : user.uid,
                "uidR" : u.uid
            };
            NotifsAmisService.save(data);
            if(u.displayName)
                vm.messageOK_M = "La demande d'ajout d'amis e été envoyé à "+u.displayName;
            else
                vm.messageOK_M = "La demande d'ajout d'amis e été envoyé à "+u.email;


        };

        // REMOCE ALERT
        vm.dismiss = function(){
            vm.messageOK_M = null;
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
                    };
                    if(!groupS.membres[entry.uid])
                        NotifsGroupsService.save(data);
                });
                vm.messageOK_M = "La proposition pour rejoindre le groupe a été envoyé à "+ users.length + " personnes"
            });
        };

    }
})();
