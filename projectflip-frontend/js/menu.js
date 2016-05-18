$(document).ready(function(){
    $("#articles_objects").css({'display':'none'});
    $("#main-nav").click(function(){
        // Set the effect type
        var effect = 'slide';
        // Set the options for the effect type chosen
        var options = 'left';
        // Set the duration (default: 400 milliseconds)
        var duration = 500;
        $('#menu').toggle(effect, options, duration);
    });

    $("#viewport,.container-fluid").click(function(){
        // Set the effect type
        var effect = 'slide';
        // Set the options for the effect type chosen
        var options = 'right';
        // Set the duration (default: 400 milliseconds)
        var duration = 500;
        $('#menu').hide(effect, options, duration);
    });

    $("#total_articles").click(function(){
        document.getElementById('categories_objects').style.display='none';
        document.getElementById('articles_objects').style.display='block';
        document.getElementById('article_headline').style.display='block';
    });
});
