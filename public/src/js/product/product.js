$(document).ready(function(){
    if ($('#product').length) {

        if ($(window).width() > 800) {
            $('[data-toggle="tooltip"]').tooltip()
        }
        

        function positionTabBg (_this) {
            var _this = (_this) ? $(_this).parents(".nav-item").find('a').parent() : $('#product .data .basic .info ul.nav li.nav-item a.active').parent()
            var pos = _this.position()
            var left = pos.left
            var top = pos.top
            var width = _this.width()
            var height = _this.height()
            var bg = _this.parents('ul.nav').find('.bg')
            bg.width(width).height(height).css({top:top, left: left})
        }

        positionTabBg()
        
        $('#product .data .basic .info ul.nav li.nav-item').click(function(e){
            positionTabBg(e.target)
        })

        setWidthFrontBg()
        positionPoint2()
        useProductColorImage(0)

        $(window).resize(function(){
            setWidthFrontBg();
            positionPoint2();
        })

        var slick_gallery = $('#product .data .basic .gallery .list2 .slick').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            vertical: true,
            verticalSwiping: true,
            infinite: false,
            prevArrow: '<button type="button" class="slick-prev"><i class="material-icons">keyboard_arrow_up</i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="material-icons">keyboard_arrow_down</i></button>'
        })

        var slick_wrap = document.getElementById('slick_wrap')
        slick_wrap.addEventListener("wheel", function (e) {
            if (e.deltaY > 0) {
                slick_gallery.slick('slickNext')
            } else {
                slick_gallery.slick('slickPrev')
            }
            e.preventDefault()
        })



        $("#product .data .basic .gallery .view2 .front").resizable({
            containment: "#product .data .basic .gallery .view2",
            minWidth: 0
        })
        
        $("#product .data .basic .gallery .view2 .front").stop().animate({ width: '50%' }, 500)

        $('#product .data .basic .gallery .list2 .slick-change').on("click", function(e){
            let index = $(this).attr('data-slick-index')
            let iProductID = $(this).attr('data-iProductID')
            let iProductImageID = $(this).attr('data-iProductImageID')
            let sProductImageFrontName = $(this).attr('data-sProductImageFrontName')
            let sProductImageBackName = $(this).attr('data-sProductImageBackName')

            $('#product .data .basic .gallery .view2 .front .bg img')
                .attr('src', '/images/product/gallery/' + sProductImageFrontName)
                .attr('data-iProductImageID', iProductImageID)
                .attr('data-index', index)

            if (typeof sProductImageBackName !== 'undefined') {
                $("#product .data .basic .gallery .view2 .back .bg img")
                    .attr('src', '/images/product/gallery/' + sProductImageBackName)
                    .attr('data-index', index).show()
                $("#product .data .basic .gallery .view2 .front").stop().animate({
                    width: $("#product .data .basic .gallery .view2").width()/2
                }, 150)
            } else {
                $("#product .data .basic .gallery .view2 .back img").hide()
                $("#product .data .basic .gallery .view2 .front").stop().animate({
                    width: $("#product .data .basic .gallery .view2").width()
                }, 150)
            }
            positionPoint2()
        })
        
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

        $('#product .data .colors .list ul li').click(function(){
            useProductColorImage($(this).index())
        })

        $("#product .toggle_submenu .hamburger").click(function(){
            toggleProductSubmenu()
            // $('#product').toggleClass('openSubmenu')
        })

        $("#product .selectOption .item .title").click(function(){
            $(this).parent().parent().toggleClass('active').siblings().removeClass('active')
        })

        // Модалка с галлерееееей

        $("#product .data .basic .gallery .view2").click(function(e){
            if (e.target.localName == 'img') {
                var index = Number($(e.target).attr('data-index'))
                $('#product .data .basic .gallery .list2 .slick .slick-list .slick-track .slick-slide').each(function (e, i) {
                    var img = $(this).find('img').attr('src')
                    modal_gallery_owl.trigger('add.owl.carousel', [
                        `<div class="item">
                            <img src="` + img + `">
                        </div>`
                    ])
                })
                modal_gallery_owl.trigger('to.owl.carousel', [index, 0])
                $("#modal_gallery_owl").modal()
            }
        })

        $(document).on("click", "#product .data .colors .view img", function (e) {
            var index = Number($(e.target).attr('data-index'))
            $('#product .data .colors .list ul li').each(function (e, i) {
                var img = $(this).attr('attr-sproductcolorfilename')
                var title = $(this).attr('data-title')
                var code = $(this).attr('attr-sColorTitleCode')
                modal_gallery_owl.trigger('add.owl.carousel', [
                    `<div class="item">
                        <img src="/images/product/color/` + img + `">
                        <div class="titleCode">
                            <div class="title">` + title + `</div>
                            <div class="code">` + code + `</div>
                        </div>
                    </div>`
                ])
            })
            modal_gallery_owl.trigger('to.owl.carousel', [index, 0])
            $("#modal_gallery_owl").modal()
        })
        
        //  *** *** *** *** *** *** *** *** *** *** *** *** //

    }
});

var product_hamburger = $("#product .toggle_submenu .hamburger")
var product_catalog_modal = $('#product_catalog_modal')

function toggleProductSubmenu () {
    if (product_hamburger.hasClass('is-active')) {
        // product_hamburger.removeClass('is-active')
        product_catalog_modal.modal('hide')
    } else {
        // product_hamburger.addClass('is-active')
        product_catalog_modal.modal()

    }
}
$('#product_catalog_modal').on('show.bs.modal', function (event) {
    product_hamburger.addClass('is-active')
    // $('.modal-backdrop').css({top: 80+'px'})
    $('body').addClass('modal-backdrop-wiki').css({background: '#353535'})
    // // $('#wiki_catalog .hamburger').addClass('is-active')
    // $('#wiki_catalog ul').addClass('disabled')
    // $('#wiki_catalog a.load').addClass('disabled')
    // setTimeout("$('#wiki_catalog .hamburger').addClass('is-active')", 100)
}).on('shown.bs.modal', function (event) {
    $('html, body').css({overflow: "hidden", position: "fixed"})
    // $('.modal-backdrop').css({"z-index":97})
}).on('hide.bs.modal', function (event) {
    product_hamburger.removeClass('is-active')
    $('html, body').css({overflow: "auto", position: "static"})
    $('body').removeClass('modal-backdrop-wiki').css({background: '#FFF'})
    // // $('#wiki_catalog .hamburger').removeClass('is-active')
    // $('#wiki_catalog ul').removeClass('disabled')
    // $('#wiki_catalog a.load').removeClass('disabled')
    // setTimeout("$('#wiki_catalog .hamburger').removeClass('is-active')", 100)
})




function useProductColorImage (index) {
    $('#product .data .colors .list ul li').removeClass('active')
    $('#product .data .colors .list ul li').eq(index).addClass('active')
    var activeImg = $('#product .data .colors .list ul li.active')
    if (activeImg.length) {
        var title = activeImg.attr('data-title')
        var code = activeImg.attr('attr-sColorTitleCode')
        var iProductID = activeImg.attr('attr-iProductID')
        var sProductColorFilename = activeImg.attr('attr-sProductColorFilename')
        $('#product .data .colors .view').html('<img src="/images/product/color/' + sProductColorFilename + '" data-index="' + index + '">')
        $('#product .data .colors .list .colorName .bg span.sColorTitle').text(title)
        $('#product .data .colors .list .colorName .bg span.sColorTitleCode').text(code)
    }
}

function setWidthFrontBg () {
    var back_width = $('#product .data .basic .gallery .view2 .back .bg').width()
    $('#product .data .basic .gallery .view2 .front .bg').width(back_width)    
}

function currentPoint2 () {
    let image = $("#product .data .basic .gallery .view2 .front .front_bg .bg img")
    let iProductImageID = image.attr("data-iProductImageID")
    let points = $('#product .data .basic .gallery .view2 ul.point li')
    let points_current = $('#product .data .basic .gallery .view2 ul.point li[data-iProductImageID=' + iProductImageID + ']')
    points.stop().fadeOut()
    points_current.stop().fadeIn()
}

function positionPoint2 () {
    let view = $("#product .data .basic .gallery .view2")
    let view_width = view.width()
    let view_height = view.height()
    let image = $("#product .data .basic .gallery .view2 .front .front_bg .bg img")
    let image_width = image.width()
    let image_height = image.height()
    let points = $('#product .data .basic .gallery .view2 ul.point li')
    points.each(function(i,v){
        let point_x = Number($(this).attr('data-fProductImagePointPosX'))
        let point_y = Number($(this).attr('data-fProductImagePointPosY'))
        let point_left = ((view_width-image_width)/2)+image_width/100*point_x
        let point_top = ((view_height-image_height)/2)+image_height/100*point_y
        $(this).css({left: point_left, top: point_top})
    })
    currentPoint2()
}
