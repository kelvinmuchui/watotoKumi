jQuery(function ($) {
    $.ajax({
        url: '/umbraco/Surface/Account/RenderHeaderAccountInformation',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        success: function (data) {
            $(".login-link-wrapper .login-link").removeClass("hide");

            if (data.profileId != undefined) {
                $(".login-wrapper").addClass("hide");
                $(".logout-wrapper").removeClass("hide");

                $(".login-link-wrapper .text-login").text($(".login-link-wrapper a").attr("data-login"));
            } else {
                $(".login-wrapper").removeClass("hide");
                $(".logout-wrapper").addClass("hide");

                $(".login-link-wrapper .text-login").text($(".login-link-wrapper a").attr("data-logout"));
            }
            $(".login-link").off('click').on("click", function (e) {
                e.preventDefault();
                if ($(window).width() > 1024)
                    $(".my-account-popup").stop().slideToggle();
                else {
                    $("#account-popup-mobile").modal('show');
                }
            })

            return true;
        },
        error: function (xhr) {

        }
    });
    $("form#loyaltyform").attr("action", $("form#loyaltyform").attr("action") + "#loyaltyform");

    $("#logoutLinkMobile").click(function (event) {
        document.getElementById('form-logout-mobile').submit();
    });

    if (document.getElementById("logoutLinkMobile")) {
        document.getElementById("logoutLinkMobile").addEventListener("touchend", function (event) {
            document.getElementById('form-logout-mobile').submit();
        });
    }

});


