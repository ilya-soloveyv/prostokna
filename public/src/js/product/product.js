$(document).ready(function(){
    if ($('#product').length) {

        // новое
        $("#product .data .basic .gallery .view2 .front").resizable({
            containment: "#product .data .basic .gallery .view2",
            minWidth: 0
        })
        function setWidthFrontBg () {
            var back_width = $('#product .data .basic .gallery .view2 .back .bg').width()
            $('#product .data .basic .gallery .view2 .front .bg').width(back_width)    
        }
        setWidthFrontBg()
        $(window).resize(function(){
            setWidthFrontBg();
            positionPoint2();
        })
        
        $("#product .data .basic .gallery .view2 .front").stop().animate({
            width: '50%'
        }, 500)

        $('#product .data .basic .gallery .list2 ul li').on("click", function(){
            let iProductID = $(this).attr('data-iProductID')
            let iProductImageID = $(this).attr('data-iProductImageID')
            let sProductImageFrontName = $(this).attr('data-sProductImageFrontName')
            let sProductImageBackName = $(this).attr('data-sProductImageBackName')

            $('#product .data .basic .gallery .view2 .front .bg img')
                .attr('src', '/images/product/' + iProductID + '/' + sProductImageFrontName)
                .attr('data-iProductImageID', iProductImageID);
            $('#product .data .basic .gallery .view2 .back .bg img').attr('src', '/images/product/' + iProductID + '/' + sProductImageBackName)

            if (typeof sProductImageBackName !== 'undefined') {
                $("#product .data .basic .gallery .view2 .back .bg img").attr('src', '/images/product/' + iProductID + '/' + sProductImageBackName).show()
            } else {
                $("#product .data .basic .gallery .view2 .back img").hide()
                $("#product .data .basic .gallery .view2 .front").stop().animate({
                    width: $("#product .data .basic .gallery .view2").width()
                }, 150)
            }
            positionPoint2()
        })
        function positionPoint2 () {
            let view = $("#product .data .basic .gallery .view2")
            let view_width = view.width()
            let view_height = view.height()
            // console.log(view_width, view_height)
            let image = $("#product .data .basic .gallery .view2 .front .front_bg .bg img")
            let image_width = image.width()
            let image_height = image.height()
            // console.log(image_width, image_height)
            let points = $('#product .data .basic .gallery .view2 ul.point li')
            points.each(function(i,v){
                let point_x = Number($(this).attr('data-fProductImagePointPosX'))
                let point_y = Number($(this).attr('data-fProductImagePointPosY'))
                // console.log(point_x, point_y)
                let point_left = ((view_width-image_width)/2)+image_width/100*point_x
                let point_top = ((view_height-image_height)/2)+image_height/100*point_y
                // console.log(point_left, point_top)
                $(this).css({left: point_left, top: point_top})
            })
            currentPoint2()
        }
        positionPoint2()

        $(document).on('mouseenter', "#product .data .basic .gallery .view2 ul.point li", function () {
            $("#product .data .basic .gallery .view2 ul.point").css({'z-index': 100});
        }).on('mouseleave', "#product .data .basic .gallery .view2 ul.point li", function () {
            $("#product .data .basic .gallery .view2 ul.point").css({'z-index': 1});
        })

        $('#product .data .basic .gallery .view2 ul.point li').each(function () {
            const instance = new Tooltip(this, {
                title: this.innerText,
                trigger: "hover",
                placement: "right"
            });
        })
        function currentPoint2 () {
            let image = $("#product .data .basic .gallery .view2 .front .front_bg .bg img")
            let iProductImageID = image.attr("data-iProductImageID")
            // console.log(iProductImageID)
            let points = $('#product .data .basic .gallery .view2 ul.point li')
            let points_current = $('#product .data .basic .gallery .view2 ul.point li[data-iProductImageID=' + iProductImageID + ']')
            points.stop().fadeOut()
            points_current.stop().fadeIn()
        }

        // *** //

        $(document).ready(function(){
            useProductColorImage()
        })
        // $("#product .data .basic .gallery .list").width(0).resizable({
        //     containment: "#product .data .basic .gallery",
        //     minWidth: 0
        // })
        // $(window).resize(function(){
        //     setWidthListPreview();
        //     positionPoint();
        // })
        // function setWidthListPreview() {
        //     let view = $("#product .data .basic .gallery .view")
        //     let view_width = view.width()
        //     let view_heigth = view.height()
        //     $("#product .list .preview").width(view_width).height(view_heigth)
        // }
        // function positionPoint () {
        //     let view = $("#product .data .basic .gallery .view")
        //     let view_width = view.width()
        //     let view_height = view.height()
        //     let image = $("#product .data .basic .gallery .view img")
        //     let image_width = image.width()
        //     let image_height = image.height()
        //     let points = $('#product .data .basic .gallery .view ul.point li')
        //     points.each(function(i,v){
        //         let point_x = Number($(this).attr('data-fProductImagePointPosX'))
        //         let point_y = Number($(this).attr('data-fProductImagePointPosY'))
        //         let point_left = ((view_width-image_width)/2)+image_width/100*point_x
        //         let point_top = ((view_height-image_height)/2)+image_height/100*point_y
        //         $(this).css({left: point_left, top: point_top})
        //     })
        //     currentPoint()
        // }
        // function currentPoint () {
        //     let image = $("#product .data .basic .gallery .view img")
        //     let iProductImageID = image.attr("data-iProductImageID")
        //     let points = $('#product .data .basic .gallery .view ul.point li')
        //     let points_current = $('#product .data .basic .gallery .view ul.point li[data-iProductImageID=' + iProductImageID + ']')
        //     points.stop().fadeOut()
        //     points_current.stop().fadeIn()
        // }
        // setWidthListPreview();
        // positionPoint();
        // $('#product .data .basic .gallery .list .back ul li').on("click", function(){
        //     let iProductID = $(this).attr('data-iProductID')
        //     let iProductImageID = $(this).attr('data-iProductImageID')
        //     let sProductImageFrontName = $(this).attr('data-sProductImageFrontName')
        //     let sProductImageBackName = $(this).attr('data-sProductImageBackName')
            
        //     $("#product .data .basic .gallery .view img").attr('data-iProductImageID', iProductImageID);
        //     $("#product .data .basic .gallery .list .back .preview img").attr('src', '/images/product/' + iProductID + '/' + sProductImageFrontName)
        //     if (typeof sProductImageBackName !== 'undefined') {
        //         $("#product .data .basic .gallery .view img").attr('src', '/images/product/' + iProductID + '/' + sProductImageBackName).show()    
        //     } else {
        //         $("#product .data .basic .gallery .view img").hide()
        //         $("#product .data .basic .gallery .list").stop().animate({
        //             width: $("#product .data .basic .gallery").width()
        //         }, 150)
        //     }
        //     positionPoint()
        // })
        // $('#product .data .basic .gallery .view ul.point li').each(function () {
        //     const instance = new Tooltip(this, {
        //         title: this.innerText,
        //         trigger: "hover",
        //         placement: "right"
        //     });
        // })
        $('#product .data .colors .list ul li').click(function(){
            $('#product .data .colors .list ul li').removeClass('active')
            $(this).addClass('active')
            useProductColorImage()
        })
        $("#product .toggle_submenu").click(function(){
            $('#product').toggleClass('openSubmenu')
        })

    }
});

function useProductColorImage () {
    var activeImg = $('#product .data .colors .list ul li.active')
    var code = activeImg.attr('attr-sColorTitleCode')
    var iProductID = activeImg.attr('attr-iProductID')
    $('#product .data .colors .view').html('<img src="/images/product/' + iProductID + '/colors/' + code + '.png">')
    // img(src="/images/product/" + product.iProductID + "/" + image_product_text.sProductImageFrontName, alt="")
}
