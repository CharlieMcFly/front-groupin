/**
 * Created by Charlie on 27/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('profileController', profileController);

    profileController.$inject = ['$state','Config', 'User', 'Users', '$uibModal', '$http', 'mode'];

    function profileController ($state, Config, User, Users,  $uibModal , $http, mode) {

        var vm = this;
        var authObj = Config.auth;
        var users = Users.getAllUsers();
        var user = User.getUser();

        $http.get(mode.dev + "users/"+user.uid).then(function(data){
            User.setUser(data);
            vm.user = User.getUser();
            vm.name = vm.user.displayName;
            vm.photo = vm.user.photoURL;
            $state.go("profile.groups");
        });

        // UPDATE PROFILE
        vm.modifierProfile = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/partials/modal-profile-update.html',
                controller: 'modalUpdateUserController',
                controllerAs: 'vm'
            });

            modalInstance.result.then(function (result) {
                User.login(result);
                vm.user = User.getUser();
                vm.name = vm.user.displayName;
                vm.photo = vm.user.photoURL;
            });
        };

        // LOG OFF
        vm.logout = function () {
            var r = confirm("Êtes vous sûr de vouloir vous déconnecter ?");
            if (r == true) {
                authObj.$signOut();
                $state.go('login');
            }
        };

        // GET NOTIFICATIONS
        vm.openNotifications = function(){

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/partials/modal-notification.html',
                controller: 'modalNotificationsController',
                controllerAs: 'vm'
            });

            modalInstance.result.then(function () {

            });
        };

    }
})();
