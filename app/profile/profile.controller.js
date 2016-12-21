/**
 * Created by Charlie on 27/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('profileController', profileController);

    profileController.$inject = ['$state','Config', 'User', 'Users', '$http', 'Groups', 'Events'];

    function profileController ($state, Config, User, Users, $http, Groups, Events) {

        var vm = this;

        var authObj = Config.auth;
        var user = User.getUser();
        var users = Users.getAllUsers();
        var groups = Groups.getAllGroups();
        var events = Events.getAllEvents();

        this.uid = user.uid;


        if(user.displayName == undefined)
            vm.name = user.email;
        else
            vm.name = user.displayName;

        vm.photo = user.photoURL;

        vm.notifAmis = [];
        $http.get("http://localhost:8080/notifications_amis/"+this.uid).then(function(n){
            var mesNotifs = n.data.notifs;
            if(mesNotifs != undefined){
                Object.keys(mesNotifs).forEach(function(key,index) {
                    vm.notifAmis.push(users.users[key]);
                });
            }
        });

        vm.addFriends = function(data){
            var data = {
                "uidD" : data,
                "uidR" : this.uid
            }
            $http.delete("http://localhost:8080/notifications_amis/"+this.uid+"/"+data);
            $http.delete("http://localhost:8080/notifications_amis/"+data+"/"+this.uid);
            $http.post("http://localhost:8080/friends", data);
            // TODO : Raffraichir la liste des amis
        }

        vm.dontAddFriend = function(data){
            $http.delete("http://localhost:8080/notifications_amis/"+this.uid+"/"+data);
            // TODO : Raffraichir la liste
        }

        vm.logout = function () {
            authObj.$signOut();
            $state.go('login');
        }

    }
})();
