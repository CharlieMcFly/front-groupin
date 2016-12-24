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

        var user = User.getUser().user;

        // Affichage des amis
        vm.friends = User.getFriends();

        // Ouvre la fenetre d'ajout d'amis
        vm.openAjoutFriends = function (size) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/partials/modal-add-friend.html',
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
