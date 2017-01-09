/**
 * Created by charlie on 21/12/16.
 */
(function(){
    'use strict';
    angular
        .module('app')
        .service('Groups', Groups);

    Groups.$injection = ['Users'];

    function Groups(Users){

        var groupSelect = {};

        /* GETTER */
        this.getGroupSelected = function(){
            return this.groupSelect;
        };

        this.getAllPhoto = function(){
          var groupPhoto = [];
          var photos = this.groupSelect.photos;
          if(photos){
              Object.keys(photos).forEach(function(url, index){
                  groupPhoto.push(photos[index]);
              });
          }
          return groupPhoto;
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
                    membres.push(users.users[key]);
                }
            });
            return membres;
        };

        /* SETTER */
        this.setGroupSelected = function(data){
            this.groupSelect = data;
        };


    }

})();