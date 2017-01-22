/**
 * Created by charlie on 17/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('groupChatController', groupChatController);

    groupChatController.$inject = ['$http', 'User', 'Groups', 'mode'];

    function groupChatController ($http, User, Groups, mode) {
        var vm = this;
        var user = User.getUser();
        var group = Groups.getGroupSelected();

        // GET MSG FROM GROUP
        $http.get(mode.dev + "chats/users/"+user.uid+"/groups/" +group.id).then(function(data){
            vm.messages = data.data.messages;
            if(vm.messages.length)
                vm.hasMsg = true;
            else
                vm.hasNoMsg = true;
        });

        // REMOVE ALERT
        vm.dismiss = function(){
            vm.messageKO_M = null;
            vm.messageOK_M = null;
        };

        // ENVOYER UN MESSAGE
        vm.envoyerMsg = function(){
            if(vm.msg){
                var data = {
                    "uid" : user.uid,
                    "groupId" : group.id,
                    "message" : vm.msg
                };
                $http.post(mode.dev + "chats", data).then(function(data){
                    User.setUser(data);
                    vm.messages = data.data.messages;
                    vm.messageOK_M  = "Votre message a été correctement envoyé";
                    vm.msg = null;
                });
            }else{
                vm.messageKO_M = "Vous devez entrer un message avant de l'envoyer";
            }
        };



    }
})();
