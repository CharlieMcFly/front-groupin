/**
 * Created by charlie on 15/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('amisController', amisController);

    amisController.$inject = ['$uibModal', 'User', 'Users', 'NotifsAmisService'];

    function amisController ($uibModal, User, Users, NotifsAmisService) {


        var vm = this;
        var user = User.getUser();
        var users = Users.getAllUsers();
        var friends = User.getFriends();

        // Affichage des amis
        vm.friends = [];
        if(friends.friends != undefined){
            Object.keys(friends.friends).forEach(function(key,index) {
                vm.friends.push(users.users[key]);
            });
        }

        // Gestion de la fenetre d'ajout d'un amis
        vm.animationsEnabled = true;

        vm.open = function (size) {
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                templateUrl: 'app/partial/modal-add-friend.html',
                controller: 'modalAjoutFriendController',
                controllerAs: 'vm'
            });

            modalInstance.result.then(function (users) {
                users.forEach(function(entry){
                   var data = {
                        "uidD" : user.uid,
                        "uidR" : entry.uid
                    }
                    NotifsAmisService.save(data);
                });
            });
        };
    }
})();
