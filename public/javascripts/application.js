var currentImage;
var slidesShowInterval;

const SLIDESHOW_INTERVAL = 8000;
const SLIDESHOW_FADE_DURATION = 1500;

$(document).ready(function() {
	calculateContentHeight();
	
	$('img:first').load(function() {
		calculateContentHeight();
	});			
	
	$(window).resize(function() {
		calculateContentHeight();
	});
	
	initSlideShow();
	
	$('a[href=#next]').click(slideShowClickListener);			
	$('a[href=#prev]').click(slideShowClickListener);
	
	startSlideShow();
});

// make the section-content the same height as the primary-column or secondary-column whichever is taller
function calculateContentHeight() {
	var primaryHeight = $('.primary-column').height();
	var secondaryHeight = $('.secondary-column').height();
	
	if (primaryHeight > secondaryHeight) {
		$('.section-content').height(primaryHeight);
	} else {
		$('.section-content').height(secondaryHeight);
	}
}		

function slideShowClickListener() {
		moveSlideShow(getDirection(this.href));
		
		resetSlideShow();
		return false;
}

function getDirection(href) {
	return href.split("#")[1];
}

function initSlideShow() {
	$('.primary-column img').not('.primary-column img:first').hide();
	currentImage = $('.primary-column img:first');
}

function startSlideShow() {
	slidesShowInterval = setInterval(function(){
		moveSlideShow('next');
	}, SLIDESHOW_INTERVAL);
}

function resetSlideShow() {
	
	clearInterval(slidesShowInterval);
	
	startSlideShow();
}

function moveSlideShow(direction) {
	var nextImage = getSlideShowImage(currentImage, direction);
	
	currentImage.hide();
	nextImage.fadeIn(SLIDESHOW_FADE_DURATION);
	calculateContentHeight();
	
	currentImage = nextImage;		
}

// gets the next image or the first one
function getSlideShowImage(currentImage, direction) {
	var proposed = currentImage[direction]('img');
	
	if (proposed.length != 0) {
		return proposed;
	} else {
		switch (direction) {
			case "next":
				return $('img:first');
			case "prev":
				return $('img:last');
		}
	}
}

// jQuery PRELOADER
(function($) {
  var cache = [];
  // Arguments are image paths relative to the current page.
  $.preLoadImages = function() {
	var args_len = arguments.length;
	for (var i = args_len; i--;) {
	  var cacheImage = document.createElement('img');
	  cacheImage.src = arguments[i];
	  cache.push(cacheImage);
	}
  }
})(jQuery);

