/**
 * Created by charlie on 17/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('groupEventController', groupEventController);

    groupEventController.$inject = ['$uibModal', 'User', 'Groups', 'Events', '$http'];

    function groupEventController ($uibModal, User, Groups, Events, $http) {

        var vm = this;
        var user = User.getUser().user;
        var gSelect = Groups.getGroupSelected();

        vm.user = user;

        vm.events = Groups.getEventsGroup();

        vm.showEvent = function(event){
            if(event.show == undefined || !event.show){
                event.show = true;
                event.users = Events.getParticipants(event);
            }
            else{
                event.show = false;
            }

        };

        vm.participe = function(event, rep){
            var data = {
                "uid" : user.uid,
                "event" : event.id,
                "participe" : rep
            };
            $http.post("http://localhost:8080/events/participants", data).then(function(d){
                Events.setAllEvents(d);
                User.setUser(d);
                var groups = Groups.getAllGroups();
                Groups.setGroupSelected(groups.groups[gSelect.id]);
                vm.events = Groups.getEventsGroup();
            });
        };

        vm.removeEvent = function(event){
            // Todo : etes vous sur ?
            $http.delete("http://localhost:8080/events/"+event.id+"/groups/"+gSelect.id+"/users/"+user.uid).then(function(data){
                refreshData(data);
            });
        };


        vm.open = function (size) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/partials/modal-create-event.html',
                controller: 'modalCreateEventController',
                controllerAs: 'vm'
            });

            modalInstance.result.then(function (event) {


                event['userId'] = user.uid;
                event['groupId'] = gSelect.id;
                $http.post("http://localhost:8080/events", event).then(function(data){
                    refreshData(data);
                });

            });
        };

        function refreshData(data){
            Events.setAllEvents(data);
            Groups.setAllGroups(data);
            User.setUser(data);
            var groups = Groups.getAllGroups();
            Groups.setGroupSelected(groups.groups[gSelect.id]);
            vm.events = Groups.getEventsGroup();
        }


    }

})();
