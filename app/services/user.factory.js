/**
 * Created by Charlie on 27/10/2016.
 */
(function(){
    'use strict';
    angular
        .module('app')
        .factory('UserFactory', UserFactory);

    UserFactory.$injection = [];

    function UserFactory(){
        /**
         * Constructor, with class name
         */
        function User(name, email, photo, provider, id) {
            // Public properties, assigned to the instance ('this')
            this.name = name;
            this.email = email;
            this.photo = photo;
            this.proverderId = provider;
            this.uid = id;
        }

        /**
         * Public method, assigned to prototype
         */
        User.prototype.getName = function ()
        {
            return this.name;
        };

        /**
         * Static method, assigned to class
         * Instance ('this') is not available in static context
         */
        User.build = function (data) {
            return new User(
                data.displayName,
                data.email,
                data.photoURL,
                data.providerId,
                data.uid
            );
        }
    }

})();
