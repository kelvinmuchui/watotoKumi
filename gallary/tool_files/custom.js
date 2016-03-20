jQuery(function ($) {
    var $widget = $('.search-wrapper--desktop');
    var $widgetMobile = $('.modal-search-wrapper--sm');

    var bookingGateUrl = $("#bookingGateUrl").val();
    var queryCheckIn = $("#QueryCheckIn").val();
    var queryCheckOut = $("#QueryCheckOut").val();
    var queryAdults = $("#QueryAdults").val();
    var queryNoRoom = $("#QueryNoRoom").val();
    var queryChildren = $("#QueryChildren").val();
    var queryChildrenAge = $("#QueryChildrenAge").val();
    var queryPromotionCode = $('#QueryPromotionCode').val();
    var queryIataCode = $('#QueryIATACode').val();
    var queryCorporateCode = $('#QueryCorporateCode').val();
    var queryBlockCode = $('#QueryBlockCode').val();

    $("#btnShowPrices").click(function (event) {
        showPrice();
    });
    $("#btnShowPricesMobile").click(function (event) {
        showPriceMobile();
    });
    
    if(document.getElementById("btnShowPrices")){
        document.getElementById("btnShowPrices").addEventListener("touchend", function (event) {
            showPrice();
        });        
        document.getElementById("btnShowPricesMobile").addEventListener("touchend", function (event) {
            showPriceMobile();
        });
    }

    function showPrice() {
        //$(".booking-widget").addClass("show-error");
        //$(".booking-widget .error-msg").hide();
        var checkIn = new Date($('#CheckIn').val());
        var checkOut = new Date($('#CheckOut').val());
        var codeType = $('#CodeType').val();
        var codeValue = $('#CodeValue').val();
        var promotionCode = $('#PromotionCode').val();
        var data = {
            numOfAdults: parseInt($('#NumberOfAdult').val()),
            checkIn: checkIn.getFullYear() + '.' + (parseInt(checkIn.getMonth()) + 1) + '.' + checkIn.getDate(),
            checkOut: checkOut.getFullYear() + '.' + (parseInt(checkOut.getMonth()) + 1) + '.' + checkOut.getDate(),
            numOfChildren: parseInt($('#NumberOfChildren').val()),
            chidrenAge: '',
            numOfRoom: parseInt($('#NumberOfRoom').val()),
            promotionCode: promotionCode
        };
        if (codeType === "CORPORATEID") {
            data.corporateCode = codeValue;
        } else if (codeType === "IATACODE") {
            data.iataCode = codeValue;
        } else if (codeType === "BLOCKCODE") {
            data.groupCode = codeValue;
        }
        if (isNaN(data.numOfAdults)) data.numOfAdults = 0;
        if (isNaN(data.numOfChildren)) data.numOfChildren = 0;
        if (!isNaN(data.numOfRoom) && checkIn != "Invalid Date" && checkOut != "Invalid Date" && data.numOfAdults > 0) {

            for (var i = data.numOfChildren - 1; i >= 0; i--) {
                var age = $widget.find('select[name="ChildrenAge[' + i + ']"]').val();
                if (age == undefined || age == '') age = 1;
                if (i == 0)
                    data.chidrenAge += age;
                else
                    data.chidrenAge += age + ",";
            }
            $('#loading-screen').css({
                'left': 0
            }).find(".percen-bar").addClass("load");

            var url = bookingGateUrl + '?' + queryCheckIn + '=' + data.checkIn
                + '&' + queryCheckOut + '=' + data.checkOut
                + '&' + queryAdults + '=' + data.numOfAdults
                + '&' + queryNoRoom + '=' + data.numOfRoom
                + (data.numOfChildren > 0 ? '&' + queryChildren + '=' + data.numOfChildren : '')
                + (data.numOfChildren > 0 ? '&' + queryChildrenAge + '=' + data.chidrenAge : '')
                + (data.promotionCode !== "" && data.promotionCode != undefined ? '&' + queryPromotionCode + '=' + data.promotionCode : '')
                + (data.corporateCode !== "" && data.corporateCode != undefined ? '&' + queryCorporateCode + '=' + data.corporateCode : '')
                + (data.groupCode !== "" && data.groupCode != undefined ? '&' + queryBlockCode + '=' + data.groupCode : '')
                + (data.iataCode !== "" && data.iataCode != undefined ? '&' + queryIataCode + '=' + data.iataCode : '');
            window.location.href = url;
        }
        else {
            // alert(messageRequiredBookingWidget);
            $(".booking-widget").addClass("show-error");
            if (checkIn == "Invalid Date" || checkOut == "Invalid Date") {
                $(".booking-widget .block-range-picker").addClass('show-error');
            } else {
                $(".booking-widget .block-range-picker").removeClass('show-error');
            }
        }
    }
    function showPriceMobile() {
        var checkInFrom = $('#CheckInMobile').val().split("-");
        var checkOutFrom = $('#CheckOutMobile').val().split("-");
        var checkIn = new Date(checkInFrom[2] + "-" + checkInFrom[0] + "-" + checkInFrom[1]);
        var checkOut = new Date(checkOutFrom[2] + "-" + checkOutFrom[0] + "-" + checkOutFrom[1]);
        var codeType = $('#CodeTypeMobile').val();
        var codeValue = $('#CodeValueMobile').val();
        var promotionCode = $('#PromotionCodeMobile').val();

        var data = {
            numOfAdults: parseInt($('#NumberOfAdultMobile').val()),
            checkIn: checkIn.getFullYear() + '.' + (parseInt(checkIn.getMonth()) + 1) + '.' + checkIn.getDate(),
            checkOut: checkOut.getFullYear() + '.' + (parseInt(checkOut.getMonth()) + 1) + '.' + checkOut.getDate(),
            numOfChildren: parseInt($('#NumberOfChildrenMobile').val()),
            chidrenAge: '',
            numOfRoom: parseInt($('#NumberOfRoomMobile').val()),
            promotionCode: promotionCode
        };
        if (codeType === "CORPORATEID") {
            data.corporateCode = codeValue;
        } else if (codeType === "IATACODE") {
            data.iataCode = codeValue;
        } else if (codeType === "BLOCKCODE") {
            data.groupCode = codeValue;
        }

        if (isNaN(data.numOfAdults)) data.numOfAdults = 0;
        if (!isNaN(data.numOfRoom) && checkIn != "Invalid Date" && checkOut != "Invalid Date" && data.numOfAdults > 0) {
            for (var i = data.numOfChildren - 1; i >= 0; i--) {
                var age = $widgetMobile.find('select[name="ChildrenAge[' + i + ']"]').val();
                if (age == undefined || age == '') age = 1;
                if (i == 0)
                    data.chidrenAge += age;
                else
                    data.chidrenAge += age + ",";
            }
            $('#loading-screen').css({
                'left': 0
            }).find(".percen-bar").addClass("load");

            var url = bookingGateUrl + '?' + queryCheckIn + '=' + data.checkIn
                + '&' + queryCheckOut + '=' + data.checkOut
                + '&' + queryAdults + '=' + data.numOfAdults
                + '&' + queryNoRoom + '=' + data.numOfRoom
                + (data.numOfChildren > 0 ? '&' + queryChildren + '=' + data.numOfChildren : '')
                + (data.numOfChildren > 0 ? '&' + queryChildrenAge + '=' + data.chidrenAge : '')
                + (data.promotionCode !== "" && data.promotionCode != undefined ? '&' + queryPromotionCode + '=' + data.promotionCode : '')
                + (data.corporateCode !== "" && data.corporateCode != undefined ? '&' + queryCorporateCode + '=' + data.corporateCode : '')
                + (data.groupCode !== "" && data.groupCode != undefined ? '&' + queryBlockCode + '=' + data.groupCode : '')
                + (data.iataCode !== "" && data.iataCode != undefined ? '&' + queryIataCode + '=' + data.iataCode : '');
            window.location.href = url;
        } else {
            // alert(messageRequiredBookingWidget);
            $widgetMobile.addClass("show-error");

            if (checkIn == "Invalid Date" || checkOut == "Invalid Date") {
                $widgetMobile.find(".block-range-picker-mobile .error-msg.dest-error").css('display', "block");
            } else {
                $widgetMobile.find(".block-range-picker-mobile .error-msg.dest-error").css('display', "none");
            }
        }
    }
});


