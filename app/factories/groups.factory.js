/**
 * Created by charlie on 21/12/16.
 */
(function(){
    'use strict';
    angular
        .module('app')
        .service('Groups', Groups);

    Groups.$injection = ['GroupsService', 'Events', 'Users'];

    function Groups(GroupsService, Events, Users){

        var groups = {};
        var groupSelect = {};
        var eventsGroup = {};

        /* GETTER */
        this.getGroupSelected = function(){
            return this.groupSelect;
        };

        this.getEventsGroup = function(){
            var tabEvent = [];
            var gEvent = this.eventsGroups;
            var events = Events.getAllEvents();
            if(gEvent.events != undefined){
                Object.keys(gEvent.events).forEach(function(key,index) {
                    tabEvent.push(events.events[key]);
                });
            }
            return tabEvent;
        };

        this.getMembers = function(user){
            var membres = [];
            var groupsS = this.groupSelect;
            var users = Users.getAllUsers();
            Object.keys(groupsS.membres).forEach(function(key) {
                // Si amis
                if(user.friends != undefined) {
                    // si c'est un ami du user alors property specifique
                    if (user.friends[key] != undefined) {
                        var f = users.users[key];
                        f.isMyFriend = true;
                        membres.push(f);
                    }
                    // sinon on l'ajout
                    else {
                        membres.push(users.users[key]);
                    }
                }
                // Si pas d'amis ajouter d'office
                else {
                    if (key != user.uid)
                        membres.push(users.users[key]);
                }
            });
            return membres;
        }

        this.getAllGroups = function(){
            if(this.groups == undefined)
                this.groups = GroupsService.get();
            return this.groups;
        };

        this.setAllGroups = function(data){
            this.groups = data.data;

        };

        /* SETTER */
        this.setGroupSelected = function(data){
            this.groupSelect = data;
            var id = data.id;
            this.eventsGroups = this.groups.groups[id];
        };


    }

})();