  function disable_scroll() {
    if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll MozMousePixelScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
  }

  function enable_scroll() {
    if (window.removeEventListener) {
      window.removeEventListener('DOMMouseScroll MozMousePixelScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
  }
  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
      e.preventDefault();
      e.returnValue = false;
    }

    function keydown(e) {
      for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
          preventDefault(e);
          return;
        }
      }
    }

    function wheel(e) {
      preventDefault(e);
    }

    $(document).ready(function(){
      $('#menu').bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(e) {
          var scrollTo = null;

          if (e.type == 'mousewheel') {
              scrollTo = 40 * e.originalEvent.detail;
          }
          else if (e.type == 'DOMMouseScroll') {
              scrollTo = (e.originalEvent.wheelDelta * -1);
          }

          if (scrollTo) {
              e.preventDefault();
              $(this).scrollTop(scrollTo + $(this).scrollTop());
          }
      });

 

      $(".container-fluid").hover(function(){
      //  enable_scroll();
      });
      $("#viewport").hover(function(){
        enable_scroll();
      });
      
    

    });
