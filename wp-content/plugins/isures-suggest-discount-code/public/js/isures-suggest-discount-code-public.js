jQuery(document).ready(function($) {

    // apply coupon ajax
    $('body').on('click', '.isures-sdc--apply_code:not(.isures-discount--applied)', function(e) {
        var couponcode = $(this).data('id');
        var $section = $(".isures-sdc--dropdown_list");
        $.ajax({
            type: 'POST',
            url: isures_sdc_vars.url_ajax,
            data: {
                action: 'sdc_discount_order',
                couponcode: couponcode,
            },
            dataType: 'json',
            beforeSend: function() {


                if ($section.is(".processing")) {
                    return false;
                }

                $section.addClass("processing").block({
                    message: null,
                    overlayCSS: {
                        background: "#ccc",
                        opacity: 0.6
                    }
                });

            },
            success: function(response) {
                if (response) {

                    if (response === true && $('.woocommerce-cart').length === 0 && $('.woocommerce-checkout').length === 0) {
                        $.magnificPopup.open({
                            items: {
                                src: '<div id="isures_notice_popup" class="lightbox-content lightbox-white"></div>',
                            },
                            type: 'inline',
                            mainClass: 'isures_notice_popup',
                            closeOnBgClick: true
                        });
                        var success_icon = '<div class="svg-container"><svg viewBox="0 0 100 100" class="animate"> <filter id="dropshadow" height="100%"><feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/> <feFlood flood-color="rgba(76, 175, 80, 1)" flood-opacity="0.5" result="color"/> <feComposite in="color" in2="blur" operator="in" result="blur"/> <feMerge> <feMergeNode/> <feMergeNode in="SourceGraphic"/> </feMerge> </filter> <circle cx="50" cy="50" r="46.5" fill="none" stroke="rgba(76, 175, 80, 0.5)" stroke-width="5"/><path d="M67,93 A46.5,46.5 0,1,0 7,32 L43,67 L88,19" fill="none" stroke="rgba(76, 175, 80, 1)" stroke-width="5" stroke-linecap="round" stroke-dasharray="80 1000" stroke-dashoffset="-220" style="filter:url(#dropshadow)"/> </svg></div>';
                        $('#isures_notice_popup').html(success_icon + isures_sdc_vars.alert_success + '</p><a href="javascript:void(0)" class="isures-close--lightbox">' + isures_sdc_vars.text_close + '</a>');
                    }
                }
            },
            complete: function() {

                $(document.body).
                trigger('wc_update_cart').
                trigger('wc_fragment_refresh');

                if ($('.woocommerce-checkout').length > 0) {
                    $(document.body).trigger('update_checkout');
                }
            },
        });
        e.preventDefault();
    });
    // remove coupon

    $('body').on('click', '.isures-sdc--apply_code.isures-discount--applied', function(e) {
        var couponcode = $(this).data('id');
        var $section = $(".isures-sdc--dropdown_list");
        $.ajax({
            type: 'POST',
            url: isures_sdc_vars.url_ajax,
            data: {
                action: 'sdc_remove_coupon',
                couponcode: couponcode,
            },
            dataType: 'json',
            beforeSend: function() {


                if ($section.is(".processing")) {
                    return false;
                }

                $section.addClass("processing").block({
                    message: null,
                    overlayCSS: {
                        background: "#ccc",
                        opacity: 0.6
                    }
                });

            },
            success: function(response) {

            },
            complete: function() {

                $(document.body).
                trigger('wc_update_cart').
                trigger('wc_fragment_refresh');

                if ($('.woocommerce-checkout').length > 0) {
                    $(document.body).trigger('update_checkout');
                }
            },
        });
        e.preventDefault();
    });


    $(document.body).on("updated_checkout", function() {
        $('body').trigger('wc_fragment_refresh');
    });

    $('body').on('click', '.isures-close--lightbox', function() {
        $.magnificPopup.close();
    });

    $('body').on('click', '.isures-sdc--code_item', function(e) {
        $(this).closest('.isures-sdc--wrap').toggleClass('active');
        e.preventDefault();
    });


    $('body').on('click', '.isures-view--details_conditions', function(e) {
        $condition_html = $(this).parent().find('.isures-sdc--short_pop').html();
        $.magnificPopup.open({
            items: {
                src: '<div id="isures_conditions_popup" class="lightbox-content lightbox-white"></div>',
            },
            type: 'inline',
            mainClass: 'isures_conditions_popup',
            closeOnBgClick: true
        });
        $('#isures_conditions_popup').html($condition_html);
        e.preventDefault();
    });
    $('body').on('click', '.isures-sdc--close_popup', function(e) {
        $.magnificPopup.close();
        if ($(this).hasClass('not-popup')) {
            $(this).closest('.isures-sdc--wrap').removeClass('active');
        }
        e.preventDefault();
    });

    $('body').on('click', '.isures-sdc--copy_code', function(e) {
        const coupon = $(this).data('coupon_code'),
            copiedText = 'Copied';
        iSuresSDCCopyToClipboard(coupon);
        const _this = $(this);
        _this.addClass('copied');
        _this.parent().append(`<span class="html-copied">${copiedText}</span>`);
        setTimeout(function() {
            _this.removeClass('copied');
            _this.parent().find('.html-copied').remove();
        }, 1000)
        e.preventDefault();
    });
    $('body').on('click', '.isures-sdc--save_code', function(e) {
        const coupon = $(this).data('coupon_code'),
            copiedText = 'Copied',
            btn_text = isures_sdc_vars.btn_savecode;
        iSuresSDCCopyToClipboard(coupon);
        const _this = $(this);
        _this.addClass('copied');
        _this.html(copiedText);
        setTimeout(function() {
            _this.removeClass('copied');
            _this.html(btn_text);
        }, 1000)
        e.preventDefault();
    });

    function iSuresSDCCopyToClipboard(string) {
        let textarea;
        let result;

        try {
            textarea = document.createElement('textarea');
            textarea.setAttribute('readonly', true);
            textarea.setAttribute('contenteditable', true);
            textarea.style.position = 'fixed'; // prevent scroll from jumping to the bottom when focus is set.
            textarea.value = string;
            $(textarea).html(string);

            document.body.appendChild(textarea);

            //textarea.focus();
            textarea.select();

            const range = document.createRange();
            range.selectNodeContents(textarea);

            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);

            textarea.setSelectionRange(0, textarea.value.length);
            result = document.execCommand('copy');
        } catch (err) {
            result = null;
        } finally {
            document.body.removeChild(textarea);
        }

        if (!result) return false;
        return true;
    }

});