// WHEN PAGE IS LOADED
$(document).ready(function(){

    // CACHE DOM ELEMENTS
    var navbarLogo = $('.navbar-logo');
    var navbarHamburgerMenu = $('.navbar-hamburger-menu');
    var navbarSettingsBtn = $('.navbar-settings-btn');
    var modulesSidebar = $('.modules-sidebar');
    var moduleBox = $('.module-box:not(.module-box-dropdown)');
    var moduleBoxDropdown = $('.module-box-dropdown .module-box-head');
    var moduleBoxHead = $('.module-box-head');
    var subModuleBox = $('.sub-module-box');
    var quickSettingsSidebar = $('.quick-settings-sidebar');
    var contentContainer = $('.content-container');

    function adjustContentContainer(){
        if(modulesSidebar.hasClass('close-siderbar-modules')){
            contentContainer.addClass('content-container-condition-1');
            contentContainer.removeClass('content-container-condition-3');
        } else if(!modulesSidebar.hasClass('close-siderbar-modules')){
            contentContainer.removeClass('content-container-condition-1');
        }

        if(quickSettingsSidebar.hasClass('close-quick-settings-modules')){
            contentContainer.addClass('content-container-condition-2');
        } else if(!quickSettingsSidebar.hasClass('close-quick-settings-modules')){
            contentContainer.removeClass('content-container-condition-2');
            contentContainer.removeClass('content-container-condition-3');
        }

        if(!modulesSidebar.hasClass('close-siderbar-modules') && quickSettingsSidebar.hasClass('close-quick-settings-modules')){
            contentContainer.addClass('content-container-condition-3');
        } else if(modulesSidebar.hasClass('close-siderbar-modules') && !quickSettingsSidebar.hasClass('close-quick-settings-modules')){
            contentContainer.removeClass('content-container-condition-3');
        }
    }

    // WHEN NAVBAR HAMBURGER MENU IS CLICKED
    navbarHamburgerMenu.click(function(){
        modulesSidebar.toggleClass('close-siderbar-modules');
        navbarLogo.toggleClass('close-navbar-logo');
        adjustContentContainer();
    });

    // WHEN NAVBAR QUICK SETTINGS BUTTON IS CLICKED
    navbarSettingsBtn.click(function(){
        quickSettingsSidebar.toggleClass('close-quick-settings-modules');
        adjustContentContainer();
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
