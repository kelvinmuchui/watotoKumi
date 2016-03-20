var KempinskiCore = KempinskiCore || {};

KempinskiCore.Common = (function () {
    var module = {};
    var dotInterval;

    module.dotInterval = null;

    module.buttonLoading = function (button) {
        $(button).prop('disabled', true);
        var curLabel = $(button).html();
        $(button).data('current-label', curLabel);
        var dots = "";
        module.dotInterval = window.setInterval(function () {
            if (dots.length >= 3)
                dots = "";
            else
                dots += ".";

            $(button).html(curLabel + dots);
        }, 300);
    };

    module.buttonLoaded = function (button) {
        if (module.dotInterval != null) {
            window.clearInterval(module.dotInterval);
            $(button).prop('disabled', false);
            var curLabel = $(button).data('current-label');
            if (curLabel != '') {
                $(button).html(curLabel);
            }
        }
    };

    module.spanLoading = function (ele) {
        var dots = "";
        module.dotInterval = window.setInterval(function () {
            if (dots.length >= 6)
                dots = "";
            else
                dots += ".";

            $(ele).html(dots);
        }, 300);
    };

    module.spanLoaded = function (ele) {
        if (module.dotInterval != null) {
            window.clearInterval(module.dotInterval);            
            $(ele).html('');            
        }
    };

    return module;

}());