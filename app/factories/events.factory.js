/**
 * Created by charlie on 21/12/16.
 */
(function(){
    'use strict';
    angular
        .module('app')
        .service('Events', Events);

    Events.$injection = ['EventsService', 'Users'];

    function Events(EventsService, Users){

        var events = {};

        this.getAllEvents = function(){
            if(this.events == undefined)
                this.events = EventsService.get();
            return this.events;
        };

        this.getParticipants = function(event){
            var participants = [];
            var users = Users.getAllUsers();
            Object.keys(event.participants).forEach(function(key, index){
                console.log(key);
                participants.push(users.users[key]);
            });
            return participants;
        };

        this.setAllEvents = function(data){
            this.events = data.data;
        };

    }

})();