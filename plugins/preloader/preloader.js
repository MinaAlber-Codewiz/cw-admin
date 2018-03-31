// WHILE PAGE IS LOADING
window.onload = function(){

    function fadeOutEffect() {
    var preloader = document.getElementsByClassName('preloader')[0];
    var fadeEffect = setInterval(function () {
            if (!preloader.style.opacity) {
                preloader.style.opacity = 1;
            }
            if (preloader.style.opacity < 0.1) {
                clearInterval(fadeEffect);
            } else {
                preloader.style.opacity -= 0.1;
            }
        }, 100);
    }

    fadeOutEffect();

};
