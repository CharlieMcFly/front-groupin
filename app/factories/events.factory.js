/**
 * Created by charlie on 21/12/16.
 */
(function(){
    'use strict';
    angular
        .module('app')
        .service('Events', Events);

    Events.$injection = ['EventsService'];

    function Events(EventsService){

        var events = {};

        this.getAllEvents = function(){
            if(this.events == undefined)
                this.events = EventsService.get();
            return this.events;
        }

    }

})();