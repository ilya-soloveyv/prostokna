$(document).ready(function() {
    function shadeOn(event) {
        var left = event.pageX - $('.statistic__shade').offset().left;
        $('.statistic__photos_2').width(left);
    }

    $('.statistic__arm').mousedown(function (e) {
        $('.statistic__shade').mousemove(shadeOn);
    });

    $(document).mouseup(function() {
        $('.statistic__shade').off("mousemove");
    });

    /* SUBMENU */
    $(".submenu-open").click(function () {
        $(".submenu").addClass("submenu_show");
        $(".product__main").addClass("product__main_blur");
    });

    $("#submenu-cross").click(function () {
        $(".submenu").removeClass("submenu_show");
        $(".product__main").removeClass("product__main_blur");
    });

});