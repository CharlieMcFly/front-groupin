/**
 * Created by charlie on 17/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('groupEventController', groupEventController);

    groupEventController.$inject = ['$uibModal', 'User', 'EventsService', 'Groups', 'Events'];

    function groupEventController ($uibModal, User, EventsService, Groups, Events) {
        var vm = this;
        var user = User.getUser().user;
        var gSelect = Groups.getGroupSelected();
        var gEvent = Groups.getEventsGroup();
        var events = Events.getAllEvents();

        vm.events = [];
        if(gEvent.events != undefined){
            Object.keys(gEvent.events).forEach(function(key,index) {
                vm.events.push(events.events[key]);
            });
        }

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
                EventsService.save(event);

            });
        };


    }

})();
