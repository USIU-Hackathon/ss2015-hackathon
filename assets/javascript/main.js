$(function() {

	if($('.content').hasClass('schedule')) {

	    window.onscroll = function() {
	        if ($(window).scrollTop() < 120) {
	            $('section > div > header').removeClass('sticky');
	            $('footer').removeClass('shadow');
	    } else {
	            $('section > div > header').addClass('sticky');
	            $('footer').addClass('shadow');
	        }
	    }
	}
})