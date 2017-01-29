/**
 * Created by charlie on 17/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('groupEuroController', groupEuroController);

    groupEuroController.$inject = ['Groups', '$http', '$uibModal', 'mode'];

    function groupEuroController (Groups, $http, $uibModal, mode) {

        var vm = this;
        var groupS = Groups.getGroupSelected();

        $http.get(mode.dev + "euros/" + groupS.id +"/bills").then(function(data){
            vm.balances = data.data.balances;
            vm.depenses = data.data.depenses;
            if(vm.balances.length && vm.depenses.length)
                vm.hasBalances = true;
            else
                vm.hasNoBalances = true;
        });

        vm.removeBill = function(depense){
              $http.delete(mode.dev + "euros/"+groupS.id+"/bills/"+depense.id).then(function(data){
                  alert("bill removed");
                 reload();
              });
        };

        vm.openAddBill = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/partials/modal-add-depense.html',
                controller: 'modalAddDepenseController',
                controllerAs: 'vm'
            });

            modalInstance.result.then(function (bill) {
               $http.post(mode.dev + "euros/bills ",bill).then(function(data){
                   reload();
               });
            });
        };

        function reload (){
            vm.hasBalances = false;
            vm.hasNoBalances = false;
            $http.get(mode.dev + "euros/" + groupS.id +"/bills").then(function(data){
                vm.balances = data.data.balances;
                vm.depenses = data.data.depenses;
                if(vm.balances.length && vm.depenses.length)
                    vm.hasBalances = true;
                else
                    vm.hasNoBalances = true;
            });
        }

    }
})();
