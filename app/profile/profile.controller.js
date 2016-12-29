/**
 * Created by Charlie on 27/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('profileController', profileController);

    profileController.$inject = ['$state','Config', 'User', 'Users', '$http', 'Groups', 'Events', 'NotifsAmisService', 'Votes'];

    function profileController ($state, Config, User, Users, $http, Groups, Events, Votes) {

        var vm = this;

        var authObj = Config.auth;
        var user = User.getUser();
        var users = Users.getAllUsers();
        var groups = Groups.getAllGroups();
        Events.getAllEvents();

        this.uid = user.uid;


        if(user.displayName == undefined)
            vm.name = user.email;
        else
            vm.name = user.displayName;

        vm.photo = user.photoURL;

        vm.notifAmis = [];
        vm.notifGroupes = [];
        notifications(this.uid, vm.notifAmis, vm.notifGroupes);


        vm.addFriends = function(u){
            var data = {
                "uidD" : u,
                "uidR" : this.uid
            };
            $http.post("http://localhost:8080/users/friends", data).then(function(n){
                User.setUser(n);
            });
            notifications(this.uid, vm.notifAmis);
        };

        vm.dontAddFriend = function(data){
            $http.delete("http://localhost:8080/notifications/users/"+this.uid+"/friends/" +data);
            vm.notifAmis = [];
            notifications(this.uid, vm.notifAmis);
        };

        vm.joinGroup = function(u){
            var data = {
                "idG" : u,
                "uidR" : this.uid
            };
            $http.post("http://localhost:8080/users/groups", data).then(function(n){
                User.setUser(n);
            });
            notifications(this.uid, vm.notifGroupes);
        };

        vm.dontJoinGroupe = function(u){
            $http.delete("http://localhost:8080/notifications/users/"+this.uid+"/groups/" +u);
            vm.notifGroupes = [];
            notifications(this.uid, null, vm.notifGroupes);
        };


        vm.logout = function () {
            authObj.$signOut();
            $state.go('login');
        };

        function notifications(uid, tabA, tabG){
            $http.get("http://localhost:8080/notifications/"+uid).then(function(n){
                var mesNotifsA = n.data.notifsAmis;
                if(mesNotifsA != undefined){
                    Object.keys(mesNotifsA).forEach(function(key,index) {
                        tabA.push(users.users[key]);
                    });
                }
                var mesNotifsG = n.data.notifsGroupes;
                if(mesNotifsG != undefined){
                    Object.keys(mesNotifsG).forEach(function(key,index) {
                        tabG.push(groups.groups[key]);
                    });
                }
            });
        }

    }
})();
