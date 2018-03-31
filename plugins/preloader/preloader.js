// WHILE PAGE IS LOADING
jQuery(window).on('load', function(){

    // CACHE DOM ELEMENTS
    var preloader = jQuery('.preloader');

    setTimeout(function(){
        preloader.fadeOut(1000);
    },1000);

});
