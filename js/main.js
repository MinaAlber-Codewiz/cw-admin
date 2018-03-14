// WHEN PAGE IS LOADED
$(document).ready(function(){

    // CACHE DOM ELEMENTS
    var navbarLogo = $('.navbar-logo');
    var navbarHamburgerMenu = $('.navbar-hamburger-menu');
    var modulesSidebar = $('.modules-sidebar');
    var moduleBox = $('.module-box:not(.module-box-dropdown)');
    var moduleBoxDropdown = $('.module-box-dropdown .module-box-head');
    var moduleBoxHead = $('.module-box-head');
    var subModuleBox = $('.sub-module-box');

    // WHEN NAVBAR HAMBURGER MENU IS CLICKED
    navbarHamburgerMenu.click(function(){
        modulesSidebar.toggleClass('close-siderbar-modules');
        navbarLogo.toggleClass('close-navbar-logo');
    });

    // WHEN MODULE BOX IS CLICKED
    moduleBox.click(function(){
        moduleBox.removeClass('module-box-active');
        moduleBoxDropdown.parent().removeClass('module-box-active');
        $(this).addClass('module-box-active');
    });

    // WHEN DROPDOWN MENU IS CLICKED
    moduleBoxDropdown.click(function(){
        $(this).parent().toggleClass('module-box-dropdown-expanded');
    });

    // WHEN SUB MODULE BOX IS CLICKED
    subModuleBox.click(function(){
        moduleBox.removeClass('module-box-active');
        subModuleBox.removeClass('sub-module-active');
        moduleBoxDropdown.parent().removeClass('module-box-active');
        $(this).addClass('sub-module-active');
        $(this).parent().parent().addClass('module-box-active');
    });

});
