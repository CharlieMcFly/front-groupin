/**
 * Created by charlie on 09/01/17.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('modalNotificationsController', modalNotificationsController);

    modalNotificationsController.$inject = ['$uibModalInstance', 'User', '$http', 'mode'];

    function modalNotificationsController($uibModalInstance, User, $http, mode) {

        var vm = this;
        var user = User.getUser();

        // GET NOTIFICATIONS AMIS
        $http.get(mode.dev + "notifications/"+user.uid).then(function(data){
            vm.notifsAmis = data.data.notifsAmis;
            vm.notifsGroupes = data.data.notifsGroupes;
        });

        //ADD FRIEND
        vm.addFriends = function(u){
            var friend = {
                "uidD" : u,
                "uidR" : user.uid
            };
            $http.post(mode.dev + "users/friends", friend).then(function(data){
                User.setUser(data);
                vm.notifsAmis = data.data.notifsAmis;
                vm.notifsGroupes = data.data.notifsGroupes;
                vm.messageOK = "La notification a été validé";
            });
        };

        // REMOVE NOTIF
        vm.dontAddFriend = function(friend){
            $http.delete(mode.dev + "notifications/users/"+user.uid+"/friends/" +friend).then(function(data){
                User.setUser(data);
                vm.notifsAmis = data.data.notifsAmis;
                vm.notifsGroupes = data.data.notifsGroupes;
                vm.messageOK = "La notification a été supprimée";
            });
        };

        // JOIN GROUP
        vm.joinGroup = function(u){
            var group = {
                "idG" : u,
                "uidR" : user.uid
            };
            $http.post(mode.dev + "users/groups", group).then(function(data){
                console.log(data);
                User.setUser(data);
                vm.notifsAmis = data.data.notifsAmis;
                vm.notifsGroupes = data.data.notifsGroupes;
                vm.messageOK = "La notification a été supprimée";
            });
        };

        vm.dontJoinGroupe = function(u){
            $http.delete(mode.dev + "notifications/users/"+user.uid+"/groups/" +u).then(function(data){
                User.setUser(data);
                vm.notifsAmis = data.data.notifsAmis;
                vm.notifsGroupes = data.data.notifsGroupes;
                vm.messageOK = "La notification a été supprimée";
            });
        };



        vm.cancel = function(){
            $uibModalInstance.dismiss();
        };

    }

})();