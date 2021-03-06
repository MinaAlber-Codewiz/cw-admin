// WHEN PAGE IS LOADED
$(document).ready(function(){

    // CACHE DOM ELEMENTS
    var body = $('body');
    var navbarLogo = $('.navbar-logo');
    var navbarHamburgerMenu = $('.navbar-hamburger-menu');
    var navbarSettingsBtn = $('.navbar-settings-btn');
    var modulesSidebar = $('.modules-sidebar');
    var emailNotifications = $('.email-notifications-popup-box');
    var systemNotifications = $('.notifications-popup-box');
    var moduleBox = $('.module-box:not(.module-box-dropdown)');
    var moduleBoxDropdown = $('.module-box-dropdown .module-box-head');
    var subModuleBox = $('.sub-module-box');
    var quickSettingsSidebar = $('.quick-settings-sidebar');
    var contentContainer = $('.content-container');
    var copyCodeBlock = $('pre button');
    var floatingLabelText = $('.style-float-label input');
    var floatingLabelTextarea = $('.style-float-label textarea');
    var floatingLabelSelect = $('.style-float-label select');
    var datePickerInput = $('div.datepicker input');
    var datePickerInDocs = $("pre code .datepicker input");
    var uploadBox = $('.file-upload-input');
    var uploadBoxInputField = uploadBox.find('input[type="file"]');
    var languagePicker = $('#toggle_language');
    var startTourWizardBtn = $('.start-tour-btn');
    var advancedSearchBtn = $('.fake-advanced-search-close-btn');
    var advancedSearchBox = $('.advanced-search-popup');
    var closeAdvancedSearchBoxBtn = $('.close-advanced-search-popup-box');

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

    // IF INPUT FILE HAS VALUE
    uploadBoxInputField.on('change', function(){
        if(this.files.length == 0){
            this.previousElementSibling.innerHTML = "Choose File to Upload ...";
            this.nextElementSibling.querySelectorAll("img")[0].setAttribute('src', 'img/default-image-upload.png');
        } else if(this.files.length !== 0){
            var filePath = this.value;
            var fileName = filePath.split(/(\\|\/)/g).pop();
            var previewImage = this.nextElementSibling.querySelectorAll("img")[0];
            var fileReader = new FileReader();
            this.previousElementSibling.innerHTML = fileName;
            fileReader.onload = function(e){
                previewImage.setAttribute('src', e.target.result);
            }
            fileReader.readAsDataURL(this.files[0]);
        }
    });

    // IF INPUT TEXT HAS VALUE
    if (floatingLabelText && floatingLabelText.length > 0) {
        for (var i = 0; i < floatingLabelText.length; i++) {
            if(floatingLabelText[i].value !== ''){
                var label = floatingLabelText[i].previousElementSibling;
                label.classList.add('normal-label');
            } else{
                var label = floatingLabelText[i].previousElementSibling;
                label.classList.remove('normal-label');
            }
        }
    }

    // IF INPUT TEXT FIELD IS FOCUSED
    floatingLabelText.focus(function(){
        if(this.parentElement.classList.contains('time_pick')){
            var label = this.parentElement.previousElementSibling;
            label.classList.add('normal-label');
        } else{
            var label = this.previousElementSibling;
            label.classList.add('normal-label');
        }
    });

    // IF INPUT TEXT FIELD IS NOT FOCUSED
    floatingLabelText.focusout(function(){
        if(this.parentElement && !this.parentElement.classList.contains('datepicker')){
            if(this.value === ''&& this.previousElementSibling){
                this.previousElementSibling.classList.remove('normal-label');
            }
        }
    });

    function timepickiCheck(TimePickipopup){
        if (this.isOpened && this.value === "") {
            this.parentElement.previousElementSibling.classList.add('normal-label');
        } else if(!this.isOpened && this.value === "") {
            this.parentElement.previousElementSibling.classList.remove('normal-label');
        } else if(!this.isOpened && this.value !== ""){
            this.parentElement.previousElementSibling.classList.add('normal-label');
        }
    }

    // IF INPUT TEXTAREA HAS VALUE
    if (floatingLabelTextarea && floatingLabelTextarea.length > 0) {
        for (var i = 0; i < floatingLabelTextarea.length; i++) {
            if(floatingLabelTextarea[i].value !== ''){
                var label = floatingLabelTextarea[i].previousElementSibling;
                label.classList.add('normal-label');
            } else{
                var label = floatingLabelTextarea[i].previousElementSibling;
                label.classList.remove('normal-label');
            }
        }
    }

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

    // IF INPUT SELECT HAS VALUE
    if (floatingLabelSelect && floatingLabelSelect.length > 0) {
        for (var i = 0; i < floatingLabelSelect.length; i++) {
            if(floatingLabelSelect[i].value !== ''){
                var label = floatingLabelSelect[i].previousElementSibling;
                label.classList.add('normal-label');
            } else{
                var label = floatingLabelSelect[i].previousElementSibling;
                label.classList.remove('normal-label');
            }
        }
    }

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
    datePickerInput.datepicker({dateFormat:"dd-mm-yy", changeMonth: true, changeYear: true, yearRange: "-100:+20", closeText: 'Reset', showButtonPanel: true, showAnim: "slideDown",
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
    $(".timepicker input").timepicki({reset: true,on_open: timepickiCheck , on_close: timepickiCheck});

    // ACCORDION
    $('.accordion').accordion({
        collapsible: true,
        heightStyle: "content"
    });

    // TOOLTIPS
    $(document).ready(function(){
        Tipped.create('.tooltip-bottom', {
            position: 'bottom'
        });
        Tipped.create('.tooltip-top', {
            position: 'top'
        });
        Tipped.create('.tooltip-right', {
            position: 'right'
        });
        Tipped.create('.tooltip-left', {
            position: 'left'
        });
    });

    // WYSIWYG EDITOR
    CKEDITOR.replaceClass = 'ckeditor';
    CKEDITOR.config.height = 300;
    // CKEDITOR.config.contentsLangDirection = 'rtl';

    // LANGUAGE SWITCHER
    function checkLanguage(){
        if(languagePicker.is(":checked")){
            body.addClass('rtl');
        } else{
            body.removeClass('rtl');
        }
    }
    languagePicker.change(function(){
        checkLanguage();
    });
    checkLanguage();

    // TOUR WIZARD
    startTourWizardBtn.click(function(){
        hopscotch.startTour(tourWizard);
    });
    var tourWizard = {
        id: "tour_wizard",
        steps: [
            {
                target: "tour-step-1",
                title: "Navigation Bar",
                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                placement: 'bottom',
                xOffset: 'center',
                arrowOffset: 'center',
                zindex: 999,
                showPrevButton: true
            },
            {
                target: "tour-step-2",
                title: "Main Menu",
                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                placement: 'bottom',
                xOffset: 'center',
                arrowOffset: 'center',
                zindex: 999,
                showPrevButton: true
            },
            {
                target: "tour-step-3",
                title: "Global Search Bar",
                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                placement: 'bottom',
                xOffset: 'center',
                arrowOffset: 'center',
                zindex: 999,
                showPrevButton: true
            },
            {
                target: "tour-step-4",
                title: "E-mail Notifications",
                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                placement: 'bottom',
                xOffset: 'center',
                arrowOffset: 'center',
                zindex: 999,
                showPrevButton: true,
                onShow: function(){
                    emailNotifications.css('max-height','3000px');
                },
                onNext: function(){
                    emailNotifications.removeAttr('style');
                }
            },
            {
                target: "tour-step-5",
                title: "System Notifications",
                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                placement: 'bottom',
                xOffset: 'center',
                arrowOffset: 'center',
                zindex: 999,
                showPrevButton: true,
                onShow: function(){
                    systemNotifications.css('max-height','3000px');
                },
                onNext: function(){
                    systemNotifications.removeAttr('style');
                }
            },
            {
                target: "tour-step-6",
                title: "Quick Settings Menu",
                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                placement: 'left',
                xOffset: 20,
                arrowOffset: 'right',
                zindex: 999,
                showPrevButton: true,
                showCTAButton: true,
                onShow: function(){
                    navbarSettingsBtn.trigger( "click" );
                },
                onNext: function(){
                    navbarSettingsBtn.trigger( "click" );
                }
            },
            {
                target: "tour-step-7",
                title: "Help & Documentation",
                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                placement: 'left',
                xOffset: 20,
                arrowOffset: 'right',
                zindex: 999,
                showPrevButton: true
            }
        ]
    };

    // ALERTIFY
    $('.notify-success').click(function(){
        alertify.notify('This is a Success Sample Message!', 'success');
    });
    $('.notify-error').click(function(){
        alertify.notify('This is an Error Sample Message!', 'error');
    });
    $('.basic-alert').click(function(){
        alertify.alert('Alert Title Heading', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s!');
    });
    $('.confirm-alert').click(function(){
        alertify.confirm().setting({
            'labels': {ok: 'Yes', cancel: 'Cancel'},
            'title': 'Some kind of Action',
            'message': 'Are your sure you want to perform this kind of Action?',
            onok: function(){
                        alertify.success('Confirmed');
                    },
            oncancel: function(){
                        alertify.error('Canceled');
                    },
            closable: false
        }).show();
    });
    $('.prompt-alert').click(function(){
        alertify.prompt().setting({
            'labels': {ok: 'Submit', cancel: 'Cancel'},
            'title': 'Prompt Title Heading',
            'message': 'Prompt Label Heading',
            'value': 'Random Value',
            onok: function(evt, value){
                        alertify.success('Submitted Value: ' + value);
                    },
            oncancel: function(){
                        alertify.error('Canceled');
                    },
            closable: false
        }).show();
    });

    // ADVANCED SEARCH
    advancedSearchBtn.click(function(){
        advancedSearchBox.addClass('advanced-search-popup-open');
    });
    closeAdvancedSearchBoxBtn.click(function(e){
        advancedSearchBox.removeClass('advanced-search-popup-open');
    });

});
