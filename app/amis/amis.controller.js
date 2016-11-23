/**
 * Created by charlie on 15/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('amisController', amisController);

    amisController.$inject = ['$uibModal', '$log', '$document'];

    function amisController ($uibModal, $log, $document) {
        var vm = this;

        vm.items = ['item1', 'item2', 'item3'];

        vm.friends = [
            {name:"John", img:"mon-img"},
            {name:"Frans", img:"mon-img"},
            {name:"Marc", img:"mon-img"},
            {name:"Georges", img:"mon-img"},
            {name:"Geanine", img:"mon-img"},
            {name:"Charlie", img:"mon-img"},
            {name:"Edouard", img:"mon-img"},
            {name:"Walid", img:"mon-img"}
        ];

        vm.animationsEnabled = true;

        vm.open = function (size, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/partial/modal-add-friend.html',
                controller: 'modalAjoutFriendController',
                controllerAs: 'vm',
                size: size,
                appendTo: parentElem,
                resolve: {
                    items: function () {
                        return vm.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                vm.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }
})();
