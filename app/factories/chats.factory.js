/**
 * Created by charlie on 13/12/16.
 */
(function(){
    'use strict';
    angular
        .module('app')
        .service('Chats', Chats);

    Chats.$injection = ['ChatsService'];

    function Chats(ChatsService){

        var chats = {};

        this.getAllMessages = function(){
            if(this.chats == undefined)
                this.chats = ChatsService.get();
            return this.chats;
        };

        this.setAllChats = function(data){
            this.chats = data.data;
        };


    }

})();