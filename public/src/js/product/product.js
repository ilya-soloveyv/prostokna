$(document).ready(function() {
    function shadeOn(event) {
        var left = event.pageX - $('.statistic__shade').offset().left;
        $('.statistic__photos_2').width(left);
    }

    function shadeOnTouch(event) {
        var pageX = event.originalEvent.touches[0].pageX,
            left = pageX - $('.statistic__shade').offset().left;
        $('.statistic__photos_2').width(left);
    }

    $('.statistic__arm').mousedown(function (e) {
        $('.statistic__shade').mousemove(shadeOn);
    }).on("touchstart", function (e) {
        $('.statistic__shade').on("touchmove", shadeOnTouch)
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

    $('.colors__block').mousemove(function () {
        $('.colors__tooltip').addClass("colors__tooltip_show");
    }).mouseleave(function () {
        $('.colors__tooltip').removeClass("colors__tooltip_show");
    });

    /* GALLERY */
    $('.statistic__gallery-item img').click(function () {
       var src = $(this).attr("src");
       $('.statistic__gallery-window_base img').attr("src", src);
    });
});