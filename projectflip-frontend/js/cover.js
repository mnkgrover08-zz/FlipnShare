var Page = (function() {
    var inWidth = "innerWidth" in window ? window.innerWidth : document.documentElement.offsetWidth;
    if (inWidth < 480) {
        var clientOrientation = 'horizontal';
    } else {
        var clientOrientation = 'vertical';
    }
    var config = {
            $bookBlock: $('#bb-bookblock'),
            $navNext: $('#next'),
            $navPrev: $('#prev'),
        },
        init = function() {
            current = 0, config.$bookBlock.bookblock({
                speed: 400,
                shadowSides: 0.8,
                shadowFlip: 0.4,
                orientation: clientOrientation,
                onEndFlip: function(old, page, isLimit) {
                    current = page;
                    if (isLimit && page != 0) {
                        window.location.href = $('a#next-article').attr('href');
                    } else if (isLimit && page == 0) {
                        window.location.href = $('a#prev-article').attr('href');
                    } else if (page == 0) {}
                }
            });
            initEvents();
        },
        initEvents = function() {
            config.$bookBlock.bookblock('jump');
            var $slides = config.$bookBlock.children();
            config.$navNext.on('click touchstart', function() {
                config.$bookBlock.bookblock('next');
                return false;
            });
            config.$navPrev.on('click touchstart', function() {
                config.$bookBlock.bookblock('prev');
                return false;
            });
            $('body').on('mousewheel', function(event) {
                if (event.deltaY == -1) {
                    config.$bookBlock.bookblock('next');
                } else {
                    config.$bookBlock.bookblock('prev');
                }
            });
            $slides.on({
                'swipeleft': function(event) {
                    config.$bookBlock.bookblock('next');
                    return false;
                },
                'swiperight': function(event) {
                    config.$bookBlock.bookblock('prev');
                    return false;
                }
            });
            $(document).keydown(function(e) {
                var keyCode = e.keyCode || e.which,
                    arrow = {
                        left: 37,
                        up: 38,
                        right: 39,
                        down: 40
                    };
                switch (keyCode) {
                    case arrow.left:
                        config.$bookBlock.bookblock('prev');
                        break;
                    case arrow.right:
                        config.$bookBlock.bookblock('next');
                        break;
                }
            });
        };
    return {
        init: init
    };
})();
Page.init();
