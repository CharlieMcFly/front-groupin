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
        vm.user = user;

        // GET NOTIFICATIONS AMIS
        $http.get(mode.dev + "notifications/"+user.uid).then(function(data){
            vm.notifsAmis = data.data.notifsAmis;
            vm.notifsGroupes = data.data.notifsGroupes;
            vm.notifsEvents = data.data.notifsEvents;
            if(vm.notifsAmis.length || vm.notifsGroupes.length || vm.notifsEvents.length)
                vm.hasNotifs = true;
            else
                vm.hasNoNotifs = true;
        });

        //ADD FRIEND
        vm.addFriends = function(u){
            var friend = {
                "uidD" : u,
                "uidR" : user.uid
            };
            $http.post(mode.dev + "users/friends", friend).then(function(data){
                reload(data);
                vm.messageOK = "La notification a été validé";
            });
        };

        // REMOVE NOTIF
        vm.dontAddFriend = function(friend){
            $http.delete(mode.dev + "notifications/users/"+user.uid+"/friends/" +friend).then(function(data){
                reload(data);
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
                reload(data);
                vm.messageOK = "La notification a été supprimée";
            });
        };

        // REMOVE NOTIF
        vm.dontJoinGroupe = function(u){
            $http.delete(mode.dev + "notifications/users/"+user.uid+"/groups/" +u).then(function(data){
                reload(data);
                vm.messageOK = "La notification a été supprimée";
            });
        };

        // CANCEL
        vm.cancel = function(){
            $uibModalInstance.dismiss();
        };

        // REMOVE NOTIF EVENT
        vm.removeNotifEvent = function(u){
            $http.delete(mode.dev + "notifications/users/"+user.uid+"/event/"+u.id).then(function(data){
                reload(data);
                vm.messageOK = "La notification a été supprimée";
            })
        };

        // PARTICIPATE TO AN EVENT
        vm.participateEvent = function(u, participe){
            var p = {
                "uid" : user.uid,
                "event" : u.id,
                "participe" : participe
            };
            $http.post(mode.dev + "/notifications/events/participate").then(function(data){
                reload(data);
                vm.messageOK = "La notification a été acceptée";
            });
        };

        function reload(data){
            User.setUser(data);
            vm.notifsAmis = data.data.notifsAmis;
            vm.notifsGroupes = data.data.notifsGroupes;
            vm.notifsEvents = data.data.notifsEvents
        }


    }

})();