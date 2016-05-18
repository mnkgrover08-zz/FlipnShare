$(document).ready(function() {
//Detect touch devices. TODO: problem in IE10 on Win 7 mobiles, need to verify again. This two lines of code should be heavily tested in all available devices possible. Since most of swipe works using this function.
function is_touch_device() {
  return 'ontouchstart' in window || 'onmsgesturechange' in window; // works on ie10
}
if(!is_touch_device()) {
	var i = null;
	$("#next,#prev").hide();
	$('#viewport,.container-fluid').mousemove(function() {
		  clearTimeout(i);
		  $("#next,#prev").show();
		  i = setTimeout('$("#next,#prev").hide();', 1500);
	}).mouseleave(function() {
		  clearTimeout(i);
		  $("#next,#prev").hide();  
	});
	$('.cover-type1').mousemove(function() {
		  clearTimeout(i);
		  $("#next,#prev").show();
		  i = setTimeout('$("#next,#prev").hide();', 1500);
	}).mouseleave(function() {
		  clearTimeout(i);
		  $("#next,#prev").hide();  
	});
}
else {
//http://stackoverflow.com/questions/7768269/ipad-safari-disable-scrolling-and-bounce-effect/20216913#20216913
	$(document).bind(
      'touchmove',
          function(e) {
            e.preventDefault();
          }
	);
}
var Page = (function() {
	var inWidth = "innerWidth" in window ? window.innerWidth : document.documentElement.offsetWidth;
	if(inWidth < 480) {
		var clientOrientation = 'horizontal';
		var shadowValue = false;
	}
	else {
		var clientOrientation = 'vertical';	
		var shadowValue = true;
	}
	if(inWidth < 1281 && is_touch_device()) {
			var shadowValue = false;
	}

	var config = {
			$bookBlock : $( '#bb-bookblock' ),
			$navNext : $( '#next' ),
			$navPrev : $( '#prev' ),
		},
		init = function() {
					current = 0,
					swipeVal = 0;
			config.$bookBlock.bookblock( {
				speed : 1200,
				shadows: shadowValue,
				shadowSides : 0.8,
				shadowFlip : 0.4,
				orientation : clientOrientation,
				onEndFlip : function(old, page, isLimit) {
					current = page;
					if(isLimit && page !=0) {
						window.location.href = $('a#next-article').attr('href');
					}
					else if(isLimit && page == 0){
						window.location.href = $('a#prev-article').attr('href');
					}
					else if(page == 0) {

					}
				}
			} );
			initEvents();
		},
		initEvents = function() {
			config.$bookBlock.bookblock('jump');
			var $slides = config.$bookBlock.children();
			
			// add navigation events
			config.$navNext.on( 'click touchstart', function() {
				config.$bookBlock.bookblock( 'next' );
				return false;
			} );

			config.$navPrev.on( 'click touchstart', function() {
				config.$bookBlock.bookblock( 'prev' );
				return false;
			} );
			//bind mouse scroll
			if(!is_touch_device()) {
				function scrollHandlerAdvanced(event) {
					//console.log(event.deltaX, event.deltaY, event.deltaFactor);
						//alert(event.clientX);
						//console.log(event.clientX);
						var custom1Left = $('.custom-1').offset().left;
						var custom2Left = $('.custom-2').offset().left;
						var custom3Left = $('.custom-3').offset().left;
						var custom1Top = $('.custom-1').offset().top;
						var custom2Top = $('.custom-2').offset().top;
						var custom3Top = $('.custom-3').offset().top;
						var custom1Height = custom1Top + $('.custom-1').height();
						var custom2Height = custom2Top + $('.custom-2').height();
						var custom3Height = custom3Top + $('.custom-3').height();
						var custom1Width = custom1Left + $('.custom-1').width();
						var custom2Width = custom2Left + $('.custom-2').width();
						var custom3Width = custom3Left + $('.custom-3').width();
						if ( (event.clientX >= custom1Left && event.clientY >= custom1Top)  &&  (event.clientX <= custom1Width && event.clientY <= custom1Height )) {
							event.preventDefault();
						}
						else if ( (event.clientX >= custom2Left && event.clientY >= custom2Top)  &&  (event.clientX <= custom2Width && event.clientY <= custom2Height )) {
							event.preventDefault();
						}
						else if ( (event.clientX >= custom3Left && event.clientY >= custom3Top)  &&  (event.clientX <= custom3Width && event.clientY <= custom3Height )) {
							event.preventDefault();
						}
						else{
								if(event.deltaY == -1) {
									config.$bookBlock.bookblock( 'next' );
								}
								else {
									config.$bookBlock.bookblock( 'prev' );
								}
						};									
					}
				function scrollHandlerBasic(event) {
								if(event.deltaY == -1) {
									config.$bookBlock.bookblock( 'next' );
								}
								else {
									config.$bookBlock.bookblock( 'prev' );
								}									
				}
				$(".container-fluid").bind("mousewheel", scrollHandlerAdvanced);
				$("#viewport").bind("mousewheel", scrollHandlerBasic);

				$( '.cover-side-box' ).hover(function(){
					
					$( '.cover-side-box' ).bind( 'mousewheel DOMMouseScroll', function ( e ) {
				          var e0 = e.originalEvent,
				              delta = e0.wheelDelta;  
				         var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel";
				           if(mousewheelevt == "DOMMouseScroll"){
				           	delta =  e0.deltaY==3 ? "-120" : "120";
				           }
				          this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
				          e.preventDefault();
				      });
				});
			}
			// add swipe events
			else {
				if(inWidth < 480) {
					$(function() {
					 //Enable swiping...
					 $("#viewport,.container-fluid").swipe( {
						 //Generic swipe handler for all directions
						 swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
							 if(direction === 'up') {
								config.$bookBlock.bookblock( 'next' );
								return false;
							 }
							 else if(direction === 'down'){
								config.$bookBlock.bookblock( 'prev' );
								return false;
							 }
						 },
						 threshold:0
						});
					});			
				}
				else {
					$(function() {
					 //Enable swiping...
					 $("#viewport,.container-fluid").swipe( {
						 //Generic swipe handler for all directions
						 swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
							 if(direction === 'left') {
								config.$bookBlock.bookblock( 'next' );
								return false;							 
							 }
							 else if(direction === 'right'){
								config.$bookBlock.bookblock( 'prev' );
								return false;
							 }
						 },
						 threshold:0
						});
					});				
				}
			}

			// add keyboard events
			$( document ).keydown( function(e) {
				var keyCode = e.keyCode || e.which,
					arrow = {
						left : 37,
						up : 38,
						right : 39,
						down : 40
					};

				switch (keyCode) {
					case arrow.left:
						config.$bookBlock.bookblock( 'prev' );
						break;
					case arrow.right:
						config.$bookBlock.bookblock( 'next' );
						break;
				}
			} );
		};

		return { init : init };

})();
	Page.init();

});
