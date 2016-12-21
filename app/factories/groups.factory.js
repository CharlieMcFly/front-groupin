/**
 * Created by charlie on 21/12/16.
 */
(function(){
    'use strict';
    angular
        .module('app')
        .service('Groups', Groups);

    Groups.$injection = ['GroupsService'];

    function Groups(GroupsService){

        var groups = {};

        this.getAllGroups = function(){
            if(this.groups == undefined)
                this.groups = GroupsService.get();
            return this.groups;
        }

    }

})();