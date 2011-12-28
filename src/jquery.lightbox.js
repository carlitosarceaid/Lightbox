/*

Title:		bcLightbox: a jQuery Lightbox Plugin
Author:		Derek Beauchemin
Version:	0.0.2
Website:	http://derekbeau.com
License: 	Dual licensed under the MIT and GPL licenses.

bcLightbox Options

autoLoad:		automatically load the light box when called [boolean, defaults to false]
delay:			how long to wait before showing the lightbox [integer, milliseconds, defautls to 0]
fadeIn:			the duration of the fade in animation [integer, milliseconds, defaults to 1000]
maskClose:		close the lightbox when the mask is clicked [boolean, defaults to true]
timesShown:		how many times a visitor should be shown the lightbox [integer]
cookieExpires:	how many days the cookie should last [integer]
fitWindow:		resize the lightbox to fit the window [boolean, defaults to false]
url:			loads lightbox content directly from a url [string]
iframe:			creates an iframe within the lightbox and loads the url [string]

*/

(function( $ ) {
	$.fn.lightbox = function(settings) {		
		// default global vars
		var config = {
			autoLoad: false,
			delay: 0,
			fadeIn: 1000,
			maskClose: true,
			timesShown: 0,
			cookieExpires: 0,
			fitWindow: false,
			url: undefined,
			iframe: undefined
		};
		
		// merge default global variables with custom variables, modifying 'config'
		if (settings) $.extend(true, config, settings);
		
		// initialize and run
		this.each(function() {	
			// create the window mask
			$('body').append('<div id="lightbox-mask">Mask</div>');
			var mask = $('#lightbox-mask');

			// save the element variable
			var element = $(this);
			var elementHeight = element.height();
			var elementWidth = element.width();
			element.addClass('lightbox');
			
			// load the content
			if (config.url != undefined) { $('.content', element).load(config.url); }
			else if (config.iframe != undefined) { 
				var iframe = '<iframe style="width: 100%; height: 100%;" src='+config.iframe+' />';
				$('.content', element).html(iframe);
			}
			
			// autoload the box and attach a click listener
			if (config.autoLoad == true) { showModal(); }

			$('a[href=#'+element.attr('id')+']').click(function(e) {
				e.preventDefault();
				showModal();
			});
			
			// show the box
			function showModal() {
				if (checkCookie(config)) {
					window.setTimeout(function() {
						moveElements();

						// transition effects   
						mask.fadeIn(config.fadeIn/2);
						element.fadeIn(config.fadeIn); 

						// hide if close button is clicked
						$('.close', element).click(function(e) {
							e.preventDefault(); mask.hide(); element.hide();
						}); 

						// hide if mask is clicked
						if (config.maskClose == true) {
							mask.click(function () {
								mask.hide(); element.hide();
							})
						}
						
						// move things around when the window resizes
						$(window).resize(function() {
							moveElements();
						});
						$(window).scroll(function() {
							moveElements();
						});
					}, config.delay);
				}
			}
			
			function moveElements() {
				// set the mask to full screen
				mask.css({'width':$(document).width(),'height':$(document).height()});
				
				// set the popup position
				if (element.height() > $(window).height()) element.css('top', 0);
				else element.css('top', ($(window).height()/2-element.height()/2));
				
				if (element.width() > $(window).width()) element.css('left', 0);
				else element.css('left', $(window).width()/2-element.width()/2);
				
				// resize the ligthbox
				if (config.fitWindow == true) resizeElements();
			}
			
			function resizeElements() {
				// reset element size
				element.height(elementHeight);
				element.width(elementWidth);

				// set the popup window max size
				if (element.height() > $(window).height()) element.height($(window).height());
				if (element.width() > $(window).width()) element.width($(window).width());

				// set the popup window to center
				element.css('top', ($(window).height()/2-element.height()/2)+$(window).scrollTop());
				element.css('left', $(window).width()/2-element.width()/2);
			}
		});
		return this;
	};
})( jQuery );

// basic helper functions
function setCookie(c_name, value, exdays) {
	var exdate = new Date();	
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
	var i,x,y,ARRcookies = document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++) {
		x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x = x.replace(/^\s+|\s+$/g,"");
		if (x==c_name) {
			return unescape(y);
		}
		else {
			return undefined;
		}
	}
}

function checkCookie(config) {
	// get the current cookie value
	var timesShown = getCookie('lightbox');
	if (timesShown == null || timesShown == '') {
		timesShown = 0;
	}
	timesShown = parseInt(timesShown);
	
	// check if we should show the box
	if (timesShown >= config.timesShown && config.timesShown > 0) {
		return false;
	}
	else {
		setCookie('lightbox', timesShown+1, config.cookieExpire);
		return true;
    }
}