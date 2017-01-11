/**
 * Created by charlie on 16/11/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('eventsController', eventsController);

    eventsController.$inject = ['$compile', 'uiCalendarConfig', 'User','$http','mode'];

    function eventsController ($compile,uiCalendarConfig, User, $http, mode) {
        var vm = this;
        var user = User.getUser();

        vm.events = [];

        /* event source that contains custom events on the scope */
        $http.get(mode.dev + "events/users/"+user.uid).then(function(data){
            angular.copy(data.data, vm.events);
        });

        /* Change View Day Week Month */
        vm.changeView = function(view,calendar) {
            uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
        };


        /* alert on eventClick */
        vm.alertOnEventClick = function( date, jsEvent, view){
            $http.get(mode.dev + "events/" +date.id).then(function(data){
                console.log(data.data);
                vm.event = data.data;
                vm.affiche = true;
            });
        };

        /* config object */
        vm.uiConfig = {
            calendar:{
                height: 700,
                editable: false,
                header:{
                    left: 'month basicWeek basicDay agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                dayNames : ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Dimanche"],
                dayNamesShort : ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                monthNames : ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
                    'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                monthNamesShort : ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
                eventClick: vm.alertOnEventClick,
                eventDrop: vm.alertOnDrop,
                eventResize: vm.alertOnResize,
                eventRender: vm.eventRender
            }
        };

        /* event sources array*/
        vm.eventSources = [vm.events];

    }
})();
