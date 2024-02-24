var isuresTimeout = null;
(function($) {
    'use strict';

    /**
     * All of the code for your admin-facing JavaScript source
     * should reside in this file.
     *
     * Note: It has been assumed you will write jQuery code here, so the
     * $ function reference has been prepared for usage within the scope
     * of this function.
     *
     * This enables you to define handlers, for when the DOM is ready:
     *
     * $(function() {
     *
     * });
     *
     * When the window is loaded:
     *
     * $( window ).load(function() {
     *
     * });
     *
     * ...and/or other possibilities.
     *
     * Ideally, it is not considered best practise to attach more than a
     * single DOM-ready or window-load handler for a particular page.
     * Although scripts in the WordPress core, Plugins and Themes may be
     * practising this, we should strive to set a better example in our own work.
     */
    $('.pwp-search--coupons_wrap').sortable({
        items: '.pwp-coupon--item',
        cursor: 'move',
        /* mouse cursor */
        scrollSensitivity: 40,
        start: function(event, ui) {
            ui.item.css({
                'background-color': '#fff',
            });
        },
        stop: function(event, ui) {
            ui.item.removeAttr('style');
            coupon_join_ids();
        }
    });

    $('body').on('click', '#coupon_results .pwp-coupon--item', function(e) {
        $(this).stop().toggleClass('active');
        $('#coupon_results').hide();
        var $this = $(this).clone(true);
        $($this).insertBefore('.pwp-search--coupons_wrap .pwp-inline--search');
        coupon_join_ids();
        $('#pwp_search_coupons').val('');
        e.preventDefault();
    });

    // remove coupon
    $('body').on('click', '.pwp-coupon--item .remove', function(e) {
        $(this).parent().remove();
        coupon_join_ids();
        e.preventDefault();
    });

    function coupon_join_ids() {
        var array = new Array();
        $('.pwp-search--coupons_wrap .pwp-coupon--item').each(function() {
            var id = $(this).find('.remove').data('c_id');
            array.push(id);
        });
        $('#coupon_selected').val(array.join(','));

    }

    // search input
    $('#pwp_search_coupons').keyup(function() {
        if (isuresTimeout != null) {
            clearTimeout(isuresTimeout);
        }
        if ($('#pwp_search_coupons').val().length > 2) {
            $('.pwp-desc--wrap').show();
            $('#coupon_results').hide();
            isuresTimeout = setTimeout(pwp_coupon_ajax_search, 300);
        }
        return false;

    });

    function pwp_coupon_ajax_search() {
        // ajax search product
        isuresTimeout = null;

        var data = {
            action: 'pwp_coupon_ajax_search',
            keyword: $('#pwp_search_coupons').val(),
            exclude_ids: $('#coupon_selected').val(),
        };

        $.post(ajaxurl, data, function(response) {
            $('.pwp-desc--wrap').hide();
            $('#coupon_results').html(response).show();
        });
    }
    $("#pwp-admin--coupons").focusin(function() {
        $('.pwp-desc--wrap').show();

    });
    $("#pwp-admin--coupons").focusout(function() {
        $('.pwp-desc--wrap').hide();
        setTimeout(function() {
            $('#coupon_results').hide();
            $('#pwp_search_coupons').val('');
        }, 250)
    });

})(jQuery);