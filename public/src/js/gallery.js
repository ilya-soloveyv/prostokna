if ($("#gallery").length) {
    $(document).ready(function(){
        resizeGalleryListItemBlock()
    }).on("click", "#gallery .item .images ul li img", function () {
        var src = $(this).attr('src')
        $("#gallery .item .zoom img").attr('src', src)
    })
    function resizeGalleryListItemBlock() {
        var width = $('#gallery .list li').width()
        $('#gallery .list li').height(width)
    }
    $(window).resize(function(){
        resizeGalleryListItemBlock()
    })
    
    if ($(window).width() > 1199) {
        var slick_height = $('#gallery .item .pagg .slick').height()/15
        $('#gallery .item .pagg .slick a').height(slick_height)
        $('#gallery .item .pagg .slick').slick({
            slidesToShow: 15,
            slidesToScroll: 1,
            vertical: true,
            verticalSwiping: true,
            arrows: false,
            focusOnSelect: true,
            infinite: false,
            adaptiveHeight: true,
            // accessibility: false,
            // prevArrow: null,
            // nextArrow: null
        }).mousewheel(function(e) {
            e.preventDefault();
        
            if (e.deltaY < 0) {
                $(this).slick('slickNext');
            }
            else {
                $(this).slick('slickPrev');
            }
        })
    } else {
        $('#gallery .item .pagg .slick').slick({
            slidesToShow: 5,
            slidesToScroll: 5,
            vertical: false,
            verticalSwiping: false,
            arrows: false,
            focusOnSelect: true,
            infinite: false,
            // adaptiveHeight: true,
            // accessibility: false,
            // prevArrow: null,
            // nextArrow: null
        }).mousewheel(function(e) {
            e.preventDefault();
        
            if (e.deltaY < 0) {
                $(this).slick('slickNext');
            }
            else {
                $(this).slick('slickPrev');
            }
        })

    }

}
