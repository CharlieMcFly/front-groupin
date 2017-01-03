/**
 * Created by charlie on 17/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('groupPhotoController', groupPhotoController);

    groupPhotoController.$inject = [];

    function groupPhotoController () {
        var vm = this;

        vm.photo = [];
    }
})();
