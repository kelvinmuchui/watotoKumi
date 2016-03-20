function formatNumber(num) {
    return num.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
var scriptTag = document.getElementById('getRoomRateScript');
if (scriptTag) {
    var specialPrice = scriptTag.getAttribute('data-special-price');
    var json = scriptTag.getAttribute('data-obj-str');

    json = json.replace(/&quot;/g, "'");
    KempinskiCore.Common.spanLoading(".special-offer-prices");
    $.ajax({
        url: '/umbraco/Surface/Booking/BestPriceOnHotelByRatePlanCode',
        //data: JSON.stringify(roomRate),
        data: json,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        success: function(data) {

            KempinskiCore.Common.spanLoaded(".special-offer-prices");
            var reg = '(\\d)(?=(\\d{' + (2 | 3) + '})+'+ ')';
            $.each(data, function (index, item) {
                var priceDisplay = "";

                if (item.Price == null || item.Price == '' || item.Price == 0 || item.Price == '0') {
                    
                    $("[id='" + item.RatePlanCode + "']").hide();
                    $("[id='" + item.PromotionCode + "']").hide();
                    $("[id='Id_" + item.RatePlanCode + "']").hide();
                    $("[id='Id_" + item.PromotionCode + "']").hide();
                }
                if (item.RatePlanCode != null && item.CurrencyCode != null) {

                    priceDisplay = formatNumber(item.Price);
                    
                    $("[id='" + item.RatePlanCode + "']").text(item.CurrencyCode + " " + priceDisplay);
                }
                if (item.RatePlanCode != null && item.CurrencyCode == null) {
                    priceDisplay = formatNumber(item.Price);
                    $("[id='" + item.RatePlanCode + "']").text(priceDisplay);

                }
                // pro
                if (item.PromotionCode != null && item.CurrencyCode == null) {
                    priceDisplay = formatNumber(item.Price);
                    $("[id='" + item.PromotionCode + "']").text(priceDisplay);

                }

                if (item.PromotionCode != null && item.CurrencyCode != null) {
                    priceDisplay = formatNumber(item.Price);
                    $("[id='" + item.PromotionCode + "']").text(item.CurrencyCode + " " + priceDisplay);
                 }

                if (item.Price == null || item.Price == '' || item.Price == 0 || item.Price == '0') {
                    $("[id='" + item.RatePlanCode + "']").text(specialPrice);
                    $("[id='" + item.PromotionCode + "']").text(specialPrice);
                }

            });
        return false;
    },
    error: function(xhr) {
        //console.log(xhr);
    }
    });
}
jQuery(function ($) {
    $.validator.addMethod("specialCharacter", function (value, element) {
        if ($(element).attr("type") == "password" || value == "" || $(element).is('[readonly]') || $(element).is('[disabled]')) {
            return true;
        }
        if ($(element).attr("name") == "Email" || $(element).attr("name") == "Confirm_Email") {
            if (!/^[a-zA-Z0-9-+ @.':\/]+$/.test(value)) {
                return false;
            }
        } else if ($(element).attr('name').indexOf('Address') > -1 && $(element).attr("type") == "text") {
            if (!/^[a-zA-Z0-9-+ .,;':\/]+$/.test(value)) {
                return false;
            }
        }
        else if ($(element).attr('name').indexOf('NameTitle') > -1 && $(element).attr("type") == "text") {
            if (!/^[a-zA-Z0-9-+ .':\/]+$/.test(value)) {
                return false;
            }
        }
        else {
            if (!/^[a-zA-Z0-9+ ':,]+$/.test(value)) {
                return false;
            }
        }
        return true;
    }, messageSpecialCharacterValid);
    $('form#loyaltyform input[type="text"]').each(function (event) {
        $(this).addClass("specialCharacter");
    });

    $.validator.messages.required = messageRequired;
    $.validator.messages.email = messageEmailValid;
    $.validator.messages.number = messageNumberValid;
    $.validator.messages.maxlength = messageMaxLenght;
    $.validator.messages.minlength = messageMinLenght;
    $.validator.messages.creditcard = messageCreditCardValid;

    $.validator.setDefaults({
        ignore: [],
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'text-danger',
        errorPlacement: function (error, element) {
            if (element.hasClass("bootstrap-select")) {
                $(element).closest('.select-group').append(error);
            } else if (element.attr("type") == "checkbox") {
                $(element).closest('.form-group').append("<br/>").append(error);
            } else {
                error.insertAfter(element);
            }

        },
        invalidHandler: function (form, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                //hide loading screen
                $('#loading-screen').css({
                    'left': "-200%"
                });
            }
        }
    });
    //console.log($("form#loyaltyform").attr("enctype"));
    $("form#loyaltyform").attr("novalidate", "novalidate");
    $("form#loyaltyform").validate();

    var formContact = $("#contour_form_CorporateContactUs form");
    var formProposal = $("#contour_form_ProposalRequest form");

    //add focus to contact form
    formContact.attr("action", formContact.attr("action") + "#" + formContact.closest(".section-corp-contact-tab").attr("id"));
    formProposal.attr("action", formProposal.attr("action") + "#" + formProposal.closest(".section-corp-contact-tab").attr("id"));
});