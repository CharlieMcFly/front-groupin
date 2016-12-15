/**
 * Created by Charlie on 27/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('profileController', profileController);

    profileController.$inject = ['$state','Config', 'User', 'Users', '$http'];

    function profileController ($state, Config, User, Users, $http) {

        var vm = this;

        var authObj = Config.auth;
        var user = User.getUser();
        var users = Users.getAllUsers();

        if(user.displayName == undefined)
            vm.name = user.email;
        else
            vm.name = user.displayName;

        vm.photo = user.photoURL;

        vm.notifAmis = [];
        $http.get("http://localhost:8080/notifications_amis/"+user.uid).then(function(n){
            var mesNotifs = n.data.notifs;
            if(mesNotifs != undefined){
                Object.keys(mesNotifs).forEach(function(key,index) {
                    vm.notifAmis.push(users.users[key]);
                });
            }
        });

        vm.addFriends = function(data){
            alert("Ajout de " +data.displayName);
        }

        vm.dontAddFriend = function(data){
            alert("Ne pas ajouter");
        }

        vm.logout = function () {
            authObj.$signOut();
            $state.go('login');
        }

    }
})();
