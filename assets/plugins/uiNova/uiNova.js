;(function($) {
    "use strict";

    // custom checkbox and radio button
    $.fn.checkRadio = function(opt) {
        var defaults = {
                className: '-chosen_custom',
                elementName: 'i'
                };
        var options = $.extend({}, defaults, opt);
        return this.each(function(){
            if(!$(this).next().hasClass(options.className))
                $('<' + options.elementName + ' class="' + options.className + '" />').insertAfter(this);
        });
    }

    // custom select box
    $.fn.selectBox = function(opt) {
        var defaults = {
            elementName: 'i',
            className: '-select_custom -fake-input',
            wrapElement: 'span',
            wrapClass: '-select_custom-wrap'
        };
        if(typeof opt === 'string' && opt === 'reset')
            return this.each(resetValue);
        var options = $.extend({}, defaults, opt);
        return this.each(function(){
            var $this = $(this);
            if(!$this.parent().hasClass(options.wrapClass))
                $this.wrap('<' + options.wrapElement + ' class="' + options.wrapClass + '" />');
            if(!$this.next().hasClass(options.className))
                $('<' + options.elementName + ' class="' + options.className + '" />').insertAfter(this);
            resetValue.call(this);
            $this.change(resetValue);
            $this.keyup(function(e) {
                var key = e.which,
                    UP = 40,
                    DOWN = 38;
                if(key === UP || key === DOWN)
                    resetValue.call(this);
            });
        });
        function resetValue() {
            var $this = $(this);
            $this.next().text($('[value="' + $this.val() + '"]', $this).text());
        }
    }

    // custom file input
    $.fn.fileInput = function(opt) {
        var defaults = {
            elementName: 'i',
            className: '-input-file_custom',
            subClass: '-fake-input'
            };
        if(typeof opt === 'string' && opt === 'reset')
            return this.each(resetValue);
        var options = $.extend({}, defaults, opt);
        return this.each(function(){
            var $this = $(this);
            if(!$this.next().hasClass(options.className))
                $('<' + options.elementName + ' class="' + options.className + ' ' + options.subClass + '" />').insertAfter(this);
            resetValue.call(this);

            $('.' + options.className).on("click", function() {
                $(this).prev().click();
                return false;
            });
            $this.change(resetValue);
        });

        function resetValue() {
            var $this = $(this);
            var value = $this.val();
            var mass = value.split("\\");
            if(mass.length > 1)
                value = mass[mass.length - 1];
            $this.next().text(value);
        }
    }

    // check btn
    $.fn.checkBtn = function(action) {
        var options = {
            toggleClass: '-btn--active',
            dataAttr: 'checkbox'
        };
        if(typeof action === 'string' && action === 'reset')
            return this.each(resetValue);
        return this.each(function(){
            var $targetInput = resetValue.call(this);
            $(this).on('click', function(){
                $(this).toggleClass(options.toggleClass);
                $targetInput.click();
            });
        });
        function resetValue() {
            var $this = $(this);
            var $targetInput = $('input[type="checkbox"][name="' + $this.data(options.dataAttr) + '"]', $this.parents('form'));
            $this.removeClass(options.toggleClass);
            if($targetInput.is(':checked'))
                $this.addClass(options.toggleClass);
            return $targetInput;
        }
    }

    // radio btn
    $.fn.radioBtn = function(action) {
        var options = {
            toggleClass: '-btn--active',
            dataAttr: 'radio',
            dataAttrValue: 'radioValue'
        };
        if(typeof action === 'string' && action === 'reset')
            return this.each(resetValue);
        return this.each(function() {
            var $targetInput = resetValue.call(this);
            $(this).on('click', function(){
                var $this = $(this);
                $('[data-' + options.dataAttr + ']', $this.parent()).removeClass(options.toggleClass);
                $this.addClass(options.toggleClass);
                $targetInput.click();
            });
        });
        function resetValue() {
            var $this = $(this);
            var $targetInput = $('input[type="radio"][name="' + $this.data(options.dataAttr) + '"][value="' + $this.data(options.dataAttrValue) + '"]', $this.parents('form'));
            $this.removeClass(options.toggleClass);
            if($targetInput.is(':checked'))
                $this.addClass(options.toggleClass);
            return $targetInput;
        }
    }

    // toolTips
    $.fn.toolTips = function() {
        var options = {
            toolTipElement: 'div',
            toolTipClass: '-toolTip_content',
            dataAttr: 'note',
            animTime: 200
        }
        return this.each(function() {
            var $el = $(this);
            var text = $el.data(options.dataAttr);
            if(text || text !== '')
            {
                $el.append($('<' + options.toolTipElement + ' class="' + options.toolTipClass +'" />').text(text));
                var $toolTip = $('.' + options.toolTipClass, $el);
                var width = $toolTip.width();
                var height = $toolTip.height();
                $el.hover(function(){
                    $toolTip.clearQueue()
                            .animate({width: width + 20, height: height + 20}, options.animTime)
                            .show(options.animTime)
                            .animate({width: width, height: height}, options.animTime);
                }, function(){
                    $toolTip.animate({width: width + 20, height: height + 20}, options.animTime - 50)
                            .animate({width: 'hide', height: 'hide'}, options.animTime - 50);
                });
                $el.mouseleave(function(){
                    $(this).children().is(':hidden') && $toolTip.clearQueue();
                });
            }
        });
    }
})(jQuery);