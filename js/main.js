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
    var copyCodeBlock = $('pre button');
    var floatingLabelText = $('.style-float-label input');
    var floatingLabelTextarea = $('.style-float-label textarea');
    var floatingLabelSelect = $('.style-float-label select');
    var datePickerInput = $('div.datepicker input');
    var datePickerInDocs = $("pre code .datepicker input");

    // FUNCTION TO ADJUST CONTENT CONTAINER WIDTH SIZE
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

    // WHEN COPY CODEBLOCK BUTTON IS CLICKED
    copyCodeBlock.click(function(){
        var codeBlock = this.nextElementSibling;
        codeBlock.contentEditable = true;
        codeBlock.focus();
        document.execCommand('selectAll');
        document.execCommand('copy');
        codeBlock.contentEditable = false;
        this.innerHTML = "Copied to Clipboard";

        setTimeout(function(){
            this.innerHTML = "Copy";
        }.bind(this),500);

        // IF CONDITION TO DESELECT COPIED TEXT
        if(window.getSelection){
            window.getSelection().removeAllRanges();
        }
        else if(document.selection){
            document.selection.empty()
        };
    });

    // IF INPUT TEXT FIELD IS FOCUSED
    floatingLabelText.focus(function(){
        let label = this.previousElementSibling;
        label.classList.add('normal-label');
    });

    // IF INPUT TEXT FIELD IS NOT FOCUSED
    floatingLabelText.focusout(function(){
        if(!this.parentElement.classList.contains('datepicker')){
            if(this.value === ''){
                var label = this.previousElementSibling;
                label.classList.remove('normal-label');
            }
        }
    });

    // IF INPUT TEXTAREA FIELD IS FOCUSED
    floatingLabelTextarea.focus(function(){
        var label = this.previousElementSibling;
        label.classList.add('normal-label');
    });

    // IF INPUT TEXTAREA FIELD IS NOT FOCUSED
    floatingLabelTextarea.focusout(function(){
        if(this.value === ''){
            var label = this.previousElementSibling;
            label.classList.remove('normal-label');
        }
    });

    // IF INPUT SELECT FIELD IS FOCUSED
    floatingLabelSelect.focus(function(){
        var label = this.previousElementSibling;
        label.classList.add('normal-label');
    });

    // IF INPUT SELECT FIELD IS NOT FOCUSED
    floatingLabelSelect.focusout(function(){
        if(this.value === ''){
            var label = this.previousElementSibling;
            label.classList.remove('normal-label');
        }
    });

    // ACTIVATE SCROLLBARS
    new PerfectScrollbar('.email-notifications-popup-box-container');
    new PerfectScrollbar('.notifications-popup-box-container');
    new PerfectScrollbar('.modules-sidebar');
    new PerfectScrollbar('.quick-settings-sidebar');

    // DATEPICKER
    datePickerInput.attr('readonly', true);
    datePickerInput.datepicker({dateFormat:"dd-mm-yy", changeMonth: true, changeYear: true, yearRange: "-100:+0", closeText: 'Reset', showButtonPanel: true, showAnim: "slideDown",
    onClose: function () {
        var event = arguments.callee.caller.caller.arguments[0];
            if ($(event.delegateTarget).hasClass('ui-datepicker-close') || this.value==='') {
            $(this).val('');
            var label = this.previousElementSibling;
            label.classList.remove('normal-label');
        }
    }})
    .on("change", function() {
        var label = this.previousElementSibling;
        label.classList.add('normal-label');
    });

    datePickerInDocs.datepicker("destroy").removeAttr("class").removeAttr('id');
    $.datepicker._gotoToday = function(id) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			var date = new Date();
			this._setDate(inst,date);
	}

    // TIMEPICKER
    $(".timepicker input").attr('readonly', true);
    $(".timepicker input").timepicki({reset: true});

    // ACCORDION
    $('.accordion').accordion({
        heightStyle: "content"
    });

    // TOOLTIPS
    $(document).tooltip();

});
