$(function(){
    'use strict';
    var app = {
        init: function() {
            this.cacheElements();
            this.initPlugins();
            this.bindEvents();
        },
        cacheElements: function() {
            this.$window = $(window);
            this.$checkBtn = $('[data-checkbox]');
            this.$radioBtn = $('[data-radio]');
            this.$inputsCheckboxRadio = $('input[type = "checkbox"], input[type = "radio"]');
            this.$select = $('select');
            this.$fileInput = $('input[type="file"]');
            this.$toolTip = $('.-toolTip');
            this.$form = $('#js-form');
            this.$resetBtn = $('#js-reset-form');
            this.$formProgressBar = $('.form-progress');
            this.$progressBarLink = $('.' + this.config.progressBar.itemClass, this.$formProgressBar);
        },
        initPlugins: function() {
            this.$checkBtn.checkBtn();
            this.$radioBtn.radioBtn();
            this.$inputsCheckboxRadio.checkRadio();
            this.$select.selectBox();
            this.$fileInput.fileInput();
            this.$toolTip.toolTips();
            this.$form.formNova();
            this.$form.formNova('config', {afterValidate: this.config.formAfterValidate});
            this.$form.formNova('setValidFunctions', this.config.formValidRule);
            this.$form.formNova('setFormElemConfig', '.js-select, #js-checkbox', this.config.customConfigFormElement.selectAndCheckbox);
        },
        bindEvents: function () {
            this.$resetBtn.on('click', $.proxy(this.resetForm, this));
            this.$window.scroll($.proxy(this.floatBar, this));
            this.$progressBarLink.on('click', $.proxy(this.clickProgressBarLink, this));
        },
        // все события
        resetForm: function() {
            function handler() {
                this.$select.selectBox('reset');
                this.$fileInput.fileInput('reset');
                this.$radioBtn.radioBtn('reset');
                this.$checkBtn.checkBtn('reset');
                this.$progressBarLink.removeClass(this.config.progressBar.errorClass + ' ' + this.config.progressBar.successClass);
                this.$form.formNova('clearErrorsMessage');
            }
            setTimeout($.proxy(handler, this), 0); // запускаем действие после событий браузера
        },
        floatBar: function() {
            var offsetTopBar = this.$formProgressBar.offset().top;
            var offsetWinScroll = this.$window.scrollTop() + 40;
            var hasClass = this.$formProgressBar.hasClass(this.config.progressBar.fixedClass);
            if(!hasClass && (offsetWinScroll > offsetTopBar))
                this.$formProgressBar.addClass(this.config.progressBar.fixedClass).data(this.config.progressBar.dataValue, offsetTopBar);
            else if(hasClass && (offsetWinScroll < this.$formProgressBar.data(this.config.progressBar.dataValue)))
                this.$formProgressBar.removeClass(this.config.progressBar.fixedClass);

        },
        clickProgressBarLink: function(e) {
            var $anchorOffsetTop = $('[name="anchor_q' + e.target.hash.slice(1) + '_1"]').offset().top;
            $anchorOffsetTop && $('html, body').animate({scrollTop: $anchorOffsetTop}, 'slow');
            return false;
        },
        // конфиги
        config: {
            formAfterValidate: function(fieldObj) {
                var $progressItem = $('[href="#' + fieldObj.name.slice(1, -2) + '"].form-progress_list_item_link');
                var errorClass = 'form-progress_list_item_link--error';
                var successClass = 'form-progress_list_item_link--success';
                if(fieldObj.isFailed)
                    $progressItem.removeClass(successClass).addClass(errorClass);
                else
                    $progressItem.removeClass(errorClass).addClass(successClass);
            },
            formValidRule: {
                selectRule: {
                    rule: function() {
                        return (this.value !== 'no');
                    },
                    errors: {
                        inline: 'Укажите все же откуда узнали',
                        onSubmit: 'Поле «%n» должно быть указано'
                    }
                }
            },
            customConfigFormElement: {
                selectAndCheckbox: {
                    showInlineError: function(fieldObj) {
                        var $formEl = $(fieldObj.this_);
                        var $UiElement = $formEl.next();
                        $('[data-' + this.options.dataAttrNote + ' = "' + fieldObj.name + '"]', this.form).remove();
                        if(fieldObj.error)
                        {
                            this.options.showInputErrorClass && $UiElement.addClass(this.options.inputClassError);
                            this.options.isInputShake && this._shake($UiElement);
                            var noteError = $(this.options.temp_errorNote).text(fieldObj.error).attr('data-' + this.options.dataAttrNote, fieldObj.name);
                            $UiElement.after(noteError);
                        }
                        else
                            this.options.showInputErrorClass && $UiElement.removeClass(this.options.inputClassError);
                    }
                }
            },
            progressBar: {
                fixedClass: 'form-progress--fixed',
                dataValue: 'top',
                itemClass: 'form-progress_list_item_link',
                errorClass: 'form-progress_list_item_link--error',
                successClass: 'form-progress_list_item_link--success'
            }
        }
    };
    app.init();

});
