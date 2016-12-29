/**
 * Created by charlie on 13/12/16.
 */
(function(){
    'use strict';
    angular
        .module('app')
        .service('Votes', Votes);

    Votes.$injection = ['VotesService'];

    function Votes(VotesService){

        var votes = {};

        this.getAllVotes = function(){
            if(this.votes == undefined)
                this.votes = VotesService.get();
            return this.votes;
        };

        this.setAllVotes = function(data){
            this.votes = data.data;
        };

    }

})();