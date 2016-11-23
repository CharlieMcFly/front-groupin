/**
 * Created by charlie on 15/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('amisController', amisController);

    amisController.$inject = [];

    function amisController () {
        var vm = this;

        vm.items = ['item1', 'item2', 'item3'];

        vm.friends = [
            {name:"John", img:"mon-img"},
            {name:"Frans", img:"mon-img"},
            {name:"Marc", img:"mon-img"},
            {name:"Georges", img:"mon-img"}
        ];
    }
})();
