/**
 * Created by charlie on 21/12/16.
 */
(function(){
    'use strict';
    angular
        .module('app')
        .service('Groups', Groups);

    Groups.$injection = ['GroupsService', 'Events', 'Users', 'Votes', 'Chats'];

    function Groups(GroupsService, Events, Users, Votes, Chats){

        var groups = {};
        var groupSelect = {};
        var eventsGroup = {};

        /* GETTER */
        this.getGroupSelected = function(){
            return this.groupSelect;
        };

        this.getEventsGroup = function(){
            var tabEvent = [];
            var gEvent = this.groupSelect;
            var events = Events.getAllEvents();
            if(gEvent.events != undefined){
                Object.keys(gEvent.events).forEach(function(key,index) {
                    tabEvent.push(events.events[key]);
                });
            }
            return tabEvent;
        };

        // Permet d'afficher les groupes avec les choix
        this.getVotesGroup = function(user){
            var tabVote = [];
            var gVote = this.groupSelect;
            var votes = Votes.getAllVotes();
            if(gVote.votes){
                Object.keys(gVote.votes).forEach(function(key){
                    if(votes.votes[key]){
                        if(votes.votes[key].a_vote){
                            if(votes.votes[key].a_vote[user.uid])
                                votes.votes[key].hasAlreadyVote = true;
                            votes.votes[key].nbVote = Object.keys(votes.votes[key].a_vote).length;

                        }
                        var choix = [];
                        Object.keys(votes.votes[key].choix).forEach(function(k){
                            var c = {
                                "choix" : k,
                                "voix" : votes.votes[key].choix[k]
                            };
                            choix.push(c);
                        });
                        votes.votes[key].choices = choix;

                        tabVote.push(votes.votes[key]);
                    }
                });
            }
            return tabVote;
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
        };

        this.getMessagesGroups = function(){
          var msgs = [];
          var groupsS = this.groupSelect;
          var users = Users.getAllUsers();
          var messages = Chats.getAllMessages();
          if(groupsS.messages){
              Object.keys(groupsS.messages).forEach(function(key){
                  var u = messages.messages[key].auteur;
                  var user = users.users[u];
                  messages.messages[key].auteur = user;
                  msgs.push(messages.messages[key]);
              });
          }
          return msgs;

        };

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
        };


    }

})();