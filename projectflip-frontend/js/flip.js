//Other template bindings and triggers
$(document).ready(function() {
	var inWidth = "innerWidth" in window ? window.innerWidth : document.documentElement.offsetWidth;
	var inHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
	inWidth = inWidth;
	inHeight = inHeight*0.9;
  //set sideart vertical navbar
	//$('.sideart').css('max-height', inHeight-20);
	//set height of full page ad
	$("img.adv").height(inHeight);
  //add classes to first and last to preserve scroll sanity and mine
	var pages = $('.bp-page');
	var pageCount = pages.length-1;
	var lastPage = '.bp-page-'+pageCount;
  $('.bp-page-1').addClass('first current');
	$(lastPage).addClass('last');

	$('.bp-render-area').attr('id','bb-bookblock');
	$('.bp-render-area').addClass('bb-bookblock');
		$('.bp-render-area').append('<div class="bb-item asd bp-page" id="item"><div class="logo-load"></div><div class="se-pre-con"></div></div>');
		$('.bp-render-area').prepend('<div class="bb-item bp-page " style="display: block;" id="item"><div class="logo-load"></div><div class="se-pre-con"></div></div>');
	$('.bb-bookblock').wrap('<div class="bb-custom-wrapper"></div>');
	$('.bb-item').wrapInner('<div class="scroller"></div>');
	$('.scroller').wrap('<div class="content"></div>');
	$('.bb-bookblock').css({'width':inWidth,'height':inHeight});
	$('.bb-custom-wrapper').css({'width':inWidth,'height':inHeight});
	$('.container').css({'width':inWidth,'height':inHeight});
	
});

