/**
 * Created by Charlie on 27/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('profileController', profileController);

    profileController.$inject = ['$state','Config', 'User', 'Users', '$uibModal'];

    function profileController ($state, Config, User, Users,  $uibModal ) {

        var vm = this;

        var authObj = Config.auth;
        var user = User.getUser();
        var users = Users.getAllUsers();

        if(user.uid === user.email)
            this.uid = user.uid_mail;

        if(user.displayName == undefined)
            vm.name = user.email;
        else
            vm.name = user.displayName;

        vm.photo = user.photoURL;

        vm.logout = function () {
            var r = confirm("Êtes vous sûr de vouloir vous déconnecter ?");
            if (r == true) {
                authObj.$signOut();
                $state.go('login');
            }
        };

        $state.go("profile.groups");

        vm.openNotifications = function(){

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/partials/modal-notification.html',
                controller: 'modalNotificationsController',
                controllerAs: 'vm'
            });

            modalInstance.result.then(function () {
                console.log(result)
            });

        };

    }
})();
