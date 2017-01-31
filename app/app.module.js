/**
 * Created by Charlie on 27/10/2016.
 */
(function(){
'use strict';

    angular
        .module('app', [
            'app.core',
            'app.login',
            'app.profile',
            'app.amis',
            'app.events',
            'app.groups',
            'app.group-events',
            'app.group-membres',
            'app.group-votes',
            'app.group-euro',
            'app.group-chat'

        ])
        .constant("mode", {
                "dev" : "http://localhost:8080/",
                "prod" : "https://platine-groupin.herokuapp.com/"
        });
})();