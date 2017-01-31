/**
 * Created by charlie on 15/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('amisController', amisController);

    amisController.$inject = ['$uibModal', 'User', 'NotifsAmisService', '$http' , 'mode', 'Users'];

    function amisController ($uibModal, User, NotifsAmisService, $http, mode, Users) {

        var vm = this;

        var user = User.getUser();

        // Affichage des amis
        vm.friends = User.getFriends();


        vm.reloadUsers = function(){
          $http.get(mode.dev + "users").then(function(data){
             Users.setAllUsers(data.data);
          });
        };

        vm.dismiss = function(){
            vm.messageOK = null;
        };

        // Ouvre la fenetre d'ajout d'amis
        vm.openAjoutFriends = function () {
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
                vm.messageOK = "Une notification a été envoyé à chaque personne sélectionnée";

            });
        };
    }
})();
