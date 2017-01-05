jQuery(document).ready(function($){
	$('.disabled').click(function (e) {e.preventDefault()});
	$('[href^=#]').click(function (e) {e.preventDefault()});
	$("[data-toggle=tooltip]").tooltip();
	$("[data-toggle=popover]").popover();
	$('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>').prependTo('div.alert-dismissable');
	
	function autocollapse() {
		var navbar = $('.navbar.navbar-autocollapse');
		navbar.removeClass('collapsed');
		if(navbar.innerHeight() > 50) {
			navbar.addClass('collapsed');
		}
	}
	$(document).on('ready', autocollapse);
	$(window).on('resize', autocollapse);
});