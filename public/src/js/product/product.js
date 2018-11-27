$(document).ready(function(){
    if ($('#product').length) {
        $("#product .data .basic .gallery .list").width(0).resizable({
            containment: "#product .data .basic .gallery",
            minWidth: 0
        })
        $(window).resize(function(){
            setWidthListPreview();
            positionPoint();
        })
        function setWidthListPreview() {
            let view = $("#product .data .basic .gallery .view")
            let view_width = view.width()
            let view_heigth = view.height()
            $("#product .list .preview").width(view_width).height(view_heigth)
        }
        function positionPoint () {
            let view = $("#product .data .basic .gallery .view")
            let view_width = view.width()
            let view_height = view.height()
            let image = $("#product .data .basic .gallery .view img")
            let image_width = image.width()
            let image_height = image.height()
            let points = $('#product .data .basic .gallery .view ul.point li')
            points.each(function(i,v){
                let point_x = Number($(this).attr('data-fProductImagePointPosX'))
                let point_y = Number($(this).attr('data-fProductImagePointPosY'))
                let point_left = ((view_width-image_width)/2)+image_width/100*point_x
                let point_top = ((view_height-image_height)/2)+image_height/100*point_y
                $(this).css({left: point_left, top: point_top})
            })
            currentPoint()
        }
        function currentPoint () {
            let image = $("#product .data .basic .gallery .view img")
            let iProductImageID = image.attr("data-iProductImageID")
            let points = $('#product .data .basic .gallery .view ul.point li')
            let points_current = $('#product .data .basic .gallery .view ul.point li[data-iProductImageID=' + iProductImageID + ']')
            points.stop().fadeOut()
            points_current.stop().fadeIn()
        }
        setWidthListPreview();
        positionPoint();
        $('#product .data .basic .gallery .list .back ul li').on("click", function(){
            let iProductID = $(this).attr('data-iProductID')
            let iProductImageID = $(this).attr('data-iProductImageID')
            let sProductImageFrontName = $(this).attr('data-sProductImageFrontName')
            let sProductImageBackName = $(this).attr('data-sProductImageBackName')
            
            $("#product .data .basic .gallery .view img").attr('data-iProductImageID', iProductImageID);
            $("#product .data .basic .gallery .list .back .preview img").attr('src', '/images/product/' + iProductID + '/' + sProductImageFrontName)
            if (typeof sProductImageBackName !== 'undefined') {
                $("#product .data .basic .gallery .view img").attr('src', '/images/product/' + iProductID + '/' + sProductImageBackName).show()    
            } else {
                $("#product .data .basic .gallery .view img").hide()
                $("#product .data .basic .gallery .list").stop().animate({
                    width: $("#product .data .basic .gallery").width()
                }, 150)
            }
            positionPoint()
        })
        $('#product .data .basic .gallery .view ul.point li').each(function () {
            const instance = new Tooltip(this, {
                title: this.innerText,
                trigger: "hover",
                placement: "right"
            });
        })
        $('#product .data .colors .list ul li').click(function(){
            $('#product .data .colors .list ul li').removeClass('active')
            $(this).addClass('active')
        })
        $("#product .toggle_submenu").click(function(){
            $('#product').toggleClass('openSubmenu')
        })
    }
});





// $(document).ready(function() {
//     function shadeOn(event) {
//         var left = event.pageX - $('.statistic__shade').offset().left;
//         $('.statistic__photos_2').width(left);
//     }

//     function shadeOnTouch(event) {
//         var pageX = event.originalEvent.touches[0].pageX,
//             left = pageX - $('.statistic__shade').offset().left;
//         $('.statistic__photos_2').width(left);
//     }

//     $('.statistic__arm').mousedown(function (e) {
//         $('.statistic__shade').mousemove(shadeOn);
//     }).on("touchstart", function (e) {
//         $('.statistic__shade').on("touchmove", shadeOnTouch)
//     });

//     $(document).mouseup(function() {
//         $('.statistic__shade').off("mousemove");
//     });

//     /* SUBMENU */
//     $(".submenu-open").click(function () {
//         $(".submenu").addClass("submenu_show");
//         $(".product__main").addClass("product__main_blur");
//     });

//     $("#submenu-cross").click(function () {
//         $(".submenu").removeClass("submenu_show");
//         $(".product__main").removeClass("product__main_blur");
//     });

//     $('.colors__block').mousemove(function () {
//         $('.colors__tooltip').addClass("colors__tooltip_show");
//     }).mouseleave(function () {
//         $('.colors__tooltip').removeClass("colors__tooltip_show");
//     });

//     /* GALLERY */
//     $('.statistic__gallery-item img').click(function () {
//        var src = $(this).attr("src");
//        $('.statistic__gallery-window_base img').attr("src", src);
//     });
// });