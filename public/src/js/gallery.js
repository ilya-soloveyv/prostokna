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

    $(function () {

        // html{
        //     background-color: red;
        //     overflow: hidden;
        //     width:100%;
        // }
        // body{
        //     height:100%;
        //     position:fixed; /* prevent overscroll bounce*/
        //     background-color: lightgreen;
        //     overflow-y:scroll;
        //     -webkit-overflow-scrolling: touch; /* iOS velocity scrolling */
        //     width:50%;                    
        //     margin-left:25%;
        // } 
        $('html').css({
            overflow: 'hidden',
            width: '100%'
        })
        $('body').css({
            height: '100%',
            position: 'fixed',
            overflow: 'hidden',
            '-webkit-overflow-scrolling': 'touch'
        })


        $('[data-toggle="popover"]').popover({
          container: 'body'
        })
      })

    // $("#gallery .item .pagg .pagg_list").scrollTop(150)
    
    // if ($(window).width() > 1199) {
    //     var slick_height = $('#gallery .item .pagg .slick').height()/15
    //     $('#gallery .item .pagg .slick a').height(slick_height)
    //     $('#gallery .item .pagg .slick').slick({
    //         slidesToShow: 15,
    //         slidesToScroll: 1,
    //         vertical: true,
    //         verticalSwiping: true,
    //         arrows: false,
    //         focusOnSelect: true,
    //         infinite: false,
    //         adaptiveHeight: true,
    //         // accessibility: false,
    //         // prevArrow: null,
    //         // nextArrow: null
    //     }).mousewheel(function(e) {
    //         e.preventDefault();
        
    //         if (e.deltaY < 0) {
    //             $(this).slick('slickNext');
    //         }
    //         else {
    //             $(this).slick('slickPrev');
    //         }
    //     })
    // } else {
    //     $('#gallery .item .pagg .slick').slick({
    //         slidesToShow: 5,
    //         // slidesToScroll: 5,
    //         vertical: false,
    //         verticalSwiping: false,
    //         arrows: false,
    //         focusOnSelect: true,
    //         infinite: false,
    //         // adaptiveHeight: true,
    //         // accessibility: false,
    //         // prevArrow: null,
    //         // nextArrow: null
    //     }).mousewheel(function(e) {
    //         e.preventDefault();
        
    //         if (e.deltaY < 0) {
    //             $(this).slick('slickNext');
    //         }
    //         else {
    //             $(this).slick('slickPrev');
    //         }
    //     })

    // }

}
