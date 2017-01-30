/**
 * Created by charlie on 17/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('groupEventController', groupEventController);

    groupEventController.$inject = ['$uibModal', 'User', 'Groups', '$http', 'mode'];

    function groupEventController ($uibModal, User, Groups, $http, mode) {

        var vm = this;
        var user = User.getUser();
        var gSelect = Groups.getGroupSelected();
        vm.user = user;

        // GET EVENTS DU GROUP
        $http.get(mode.dev + "events/users/" + user.uid+"/groups/"+gSelect.id).then(function(d){
            vm.events = d.data.events;
            if(vm.events.length)
                vm.hasEvent = true;
            else
                vm.hasNoEvent = true;
        });

        // RAPPEL EVENT
        vm.rappel = function(event){
            var send = {"idEvent" : event.id, "uid" : user.uid};
            $http.post(mode.dev + "events/rappel", send).then(function(data){
               vm.messageOK_E = "Le rappel a bien été envoyé à tous les participants";
            });
        };

        // DISPLAY EVENT
        vm.showEvent = function(event){
            if(event.show == undefined || !event.show){
                event.show = true;
            }
            else{
                event.show = false;
            }
        };

        // ADD OR REMOVE PARTICIPANTS
        vm.participe = function(event, rep){
            var data = {
                "uid" : user.uid,
                "event" : event.id,
                "group" : gSelect.id,
                "participe" : rep
            };
            $http.post(mode.dev + "events/participants", data).then(function(d){
                User.setUser(d);
                vm.events = d.data.events;
                if(vm.events.length)
                    vm.hasEvent = true;
                else
                    vm.hasNoEvent = true;
            });
        };

        // EDIT PARTICIPATION
        vm.edit_participation = function(event){
            if(event.edit == undefined || !event.edit){
                event.edit = true;
            }
            else{
                event.edit = false;
            }
        };

        // REMOVE EVENT
        vm.removeEvent = function(event){
            if(confirm("Êtes vous sûr de supprimer l'évènement du groupe ?")){
                vm.hasEvent = false;
                vm.hasNoEvent = false;
                $http.delete(mode.dev + "events/"+event.id+"/groups/"+gSelect.id+"/users/"+user.uid).then(function(data){
                    User.setUser(data);
                    vm.events = data.data.events;
                    if(vm.events.length)
                        vm.hasEvent = true;
                    else
                        vm.hasNoEvent = true;
                });
                vm.messageOK_E = "L'évènement a été correctement supprimé";
            }
        };

        // REMOVE ALERT
        vm.dismiss = function(){
            vm.messageOK_E = null;
        };

        // CREATE EVENT
        vm.open = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/partials/modal-create-event.html',
                controller: 'modalCreateEventController',
                controllerAs: 'vm'
            });

            modalInstance.result.then(function (event) {
                event['userId'] = user.uid;
                event['groupId'] = gSelect.id;
                $http.post(mode.dev + "events", event).then(function(data){
                    User.setUser(data);
                    vm.events = data.data.events;
                    vm.messageOK_E = "L'évènement " + event.nom + " a bien été créé";
                    if(vm.events.length)
                        vm.hasEvent = true;
                    else
                        vm.hasNoEvent = true;
                });
            });
        };

        // MODIFY EVENT
        vm.modifEvent = function (event) {
            Groups.setEventSelected(event);
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/partials/modal-update-event.html',
                controller: 'modalUpdateEventController',
                controllerAs: 'vm'
            });

            modalInstance.result.then(function (event) {
                event["id"] = event.id;
                event["groupId"] = gSelect.id;
                event["userId"] = event.createur;
                $http.post(mode.dev + "events/edit", event).then(function(d){
                    User.setUser(d);
                    vm.messageOK_E = "L'évènement " + event.nom + " a bien été modifié";
                    vm.events = d.data.events;
                    if(vm.events.length)
                        vm.hasEvent = true;
                    else
                        vm.hasNoEvent = true;
                });
            });
        };


    }

})();
