/**
 * Created by charlie on 21/12/16.
 */
(function(){
    'use strict';
    angular
        .module('app')
        .service('Groups', Groups);

    Groups.$injection = ['GroupsService', 'GroupEventsService'];

    function Groups(GroupsService, GroupEventsService){

        var groups = {};
        var groupSelect = {};
        var eventsGroup = {};

        /* GETTER */
        this.getGroupSelected = function(){
            return this.groupSelect;
        };

        this.getEventsGroup = function(){
            return this.eventsGroups;
        };

        this.getAllGroups = function(){
            if(this.groups == undefined)
                this.groups = GroupsService.get();
            return this.groups;
        }

        /* SETTER */

        this.setGroupSelected = function(data){
            this.groupSelect = data;
            this.eventsGroups = GroupEventsService.get({uid : data.id});
        };


    }

})();