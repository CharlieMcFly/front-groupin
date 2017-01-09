/**
 * Created by charlie on 17/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('groupPhotoController', groupPhotoController);

    groupPhotoController.$inject = ['Groups', '$http', 'mode'];

    function groupPhotoController (Groups, $http, mode) {
        var vm = this;

        var groupS = Groups.getGroupSelected();

        // GET ALL PHOTO
        vm.photos = Groups.getAllPhoto();

        // REMOVE ALERT
        vm.dismiss = function(){
            vm.messageKO_P = null;
            vm.messageOK_P = null;
        };

        // ADD PHOTO TO GROUPE
        vm.ajouterPhoto = function(){
            if(vm.img){
                var photo = {
                    "key" : groupS.id,
                    "url" : vm.img
                };
                $http.post(mode.dev + "groups/photo", photo).then(function(data){
                   Groups.setGroupSelected(data.data.group);
                   vm.photos = Groups.getAllPhoto();
                   vm.messageOK_P = "L'image a été correctement envoyé";
                   vm.img = null;
                });
            }else{
                vm.messageKO_P = "Il faut rentrer une url pour la photo";
            }
        };
    }
})();
