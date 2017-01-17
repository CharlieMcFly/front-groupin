/**
 * Created by charlie on 17/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('groupEuroController', groupEuroController);

    groupEuroController.$inject = ['Groups', '$http', 'mode'];

    function groupEuroController (Groups, $http, mode) {

        var vm = this;
        var groupS = Groups.getGroupSelected();

        $http.get(mode.dev + "euros/" + groupS.id).then(function(data){
           vm.balances = data.data;
        });

        $http.get(mode.dev + "euros/" + groupS.id +"/bills").then(function(data){
            vm.depenses = data.data;
        });

        vm.openAddBill = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/partials/modal-add-depense.html',
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
                });
            });
        }

    }
})();
