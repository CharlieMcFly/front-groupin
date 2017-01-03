/**
 * Created by charlie on 17/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('groupChatController', groupChatController);

    groupChatController.$inject = ['$http', '$state', 'User', 'Groups', 'Chats'];

    function groupChatController ($http, $state, User, Groups, Chats) {
        var vm = this;
        var user = User.getUser();
        var group = Groups.getGroupSelected();

        vm.messages = Groups.getMessagesGroups();

        vm.envoyerMsg = function(){
            if(vm.msg){
                var data = {
                    "uid" : user.uid,
                    "groupId" : group.id,
                    "message" : vm.msg
                };
                $http.post("http://localhost:8080/chats", data).then(function(data){
                    reload(data);
                });
            }
        };

        function reload(data){
            Chats.setAllChats(data);
            Groups.setAllGroups(data);
            var g = Groups.getAllGroups().groups[group.id];
            Groups.setGroupSelected(g);
            vm.messages = Groups.getMessagesGroups();
        }

    }
})();
