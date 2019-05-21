
if ($("#gallery").length) {

    // var elem = document.getElementById("gallery_scroll")
    // console.log(elem)
    // var scrollbar = Scrollbar.init(elem, {
    //     alwaysShowTracks: true
    // })
    var gallery_scroll = document.getElementById('gallery_scroll')
    if (gallery_scroll) {
        var galleryScrollPos = 0;
        new MiniBar(gallery_scroll, {
            alwaysShowBars: true,
            onScroll: function(e) {
                st = e.scrollTop
    
                if (st > galleryScrollPos) {
                    if (st > 120) {
                        $('#gallery .head').addClass('hide')
                    }
                    console.log('down')
                } else {
                    $('#gallery .head').removeClass('hide')
                    console.log('up')
                }
    
                galleryScrollPos = st
            }
        })
    }


    // Scrollbar.initAll({
    //     alwaysShowTracks: true
    // })

    // console.log(Scrollbar.get())

    // window.addEventListener('scroll', (e) => {
        // console.log(1)
    // })

    // console.log(Scrollbar)

    // Scrollbar.addListener(function() {
        // console.log(1)
        // output.textContent = scrollbar.isVisible(content);
    //   });

    // var galleryScrollPos = 0;
    // setInterval(function(){


    //     var x = Scrollbar.get('.wrap')
    //     console.log(x)


    //     var t = $('.scroll-content').css('transform').replace(/[^0-9\-.,]/g, '').split(',')
    //     st = Number(t[5])
    //     console.log(st)

    //     if (st < galleryScrollPos) {
    //         if (st < -200) {
    //             $('#gallery .head').addClass('hide')
    //         }
    //         console.log('down')
    //     } else if (st > galleryScrollPos) {
    //         $('#gallery .head').removeClass('hide')
    //         console.log('up')
    //     }

    //     galleryScrollPos = st
    // }, 100)









    // Scrollbar.wheelEventTarget((e) => {
    //     console.log(e) // returns “scrollTop” equivalent
    // })
    // var x = Scrollbar.getAll()
    // console.log(x)
    
    // $('.wrap').scroll(function(e){
    //     console.log(e)
    // })

    // $('body').addClass('gallery_scroll')

    

    // var galleryScrollPos = 0;
    // $(window).scroll(function(e) {
    //     var windowWidth = $(window).width()
    //     console.log(windowWidth)
    //     if (windowWidth) {

    //     }
    //     var st = $(this).scrollTop()

    //     if (st < 200) {
    //         // $('#gallery .head').css({position: 'absolute', left: 0, top: 0})
    //     } else {
    //         // $('#gallery .head').css({position: 'fixed', left: 60, top: 60})
    //     }

    //     if (st > galleryScrollPos) {
    //         if (st > 120) {
    //             $('#gallery .head').addClass('hide')
    //         }
    //         console.log('down')
    //     } else {
    //         $('#gallery .head').removeClass('hide')
    //         console.log('up')
    //     }

    //     galleryScrollPos = st
    // })



    $(document).ready(function(){
        // resizeGalleryListItemBlock()
    }).on("click", "#gallery .item .images ul li img", function () {
        var src = $(this).attr('src')
        $("#gallery .item .zoom img").attr('src', src)
    })
    // function resizeGalleryListItemBlock() {
    //     var width = $('#gallery .list li').width()
    //     $('#gallery .list li').height(width)
    // }
    $(window).resize(function(){
        // resizeGalleryListItemBlock()
    })

    // $(function () {

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
        // $('html').css({
        //     overflow: 'hidden',
        //     width: '100%'
        // })
        // $('body').css({
        //     height: '100%',
        //     position: 'fixed',
        //     overflow: 'hidden',
        //     '-webkit-overflow-scrolling': 'touch'
        // })


    //   })

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

    $('[data-toggle="popover"]').popover({
        container: 'body'
    })


    $("#gallery .item .images ul li img").click(function () {
        var i = $(this).parent().index()
        imageZoomOpen(i)
    })
    $("#imageZoom .nav_close").click(function () {
        imageZoomClose()
    })

    var imageZoomOwl = $('#imageZoom .owl-carousel').owlCarousel({
        loop:true,
        dots: false,
        margin:0,
        nav: true,
        items:1,
        navText : ["<img src='/images/gallery/prev.png'>","<img src='/images/gallery/next.png'>"]
    })


    var gallery_card = document.getElementById('gallery_card')

    gallery_card.addEventListener('swiped-left', function(e) {
        // console.log(e)
        var href = $('#gallery .item .pagg .pagg_bg .pagg_list a.active').next().attr('href')
        if (href) {
            location = href
        }
        // console.log(href)
        // $('#gallery .head .title').html(href)
        // console.log(href);
        // location = href
        
    });

    gallery_card.addEventListener('swiped-right', function(e) {
        // console.log(e)
        var href = $('#gallery .item .pagg .pagg_bg .pagg_list a.active').prev().attr('href')
        if (href) {
            location = href
        }
        // $('#gallery .head .title').html(href)
        // console.log(href);
        // location = href
    });

    function imageZoomOpen (i) {
        // $('.owl-carousel .item').remove()
        // $("#gallery .item .images ul li").each(function (i, el) {
        //     var src = $(el).find('img').attr('src')
        //     $('.owl-carousel').append("<div class='item'><img src='" + src + "'></div>");
        // })
        // console.log(src);
        imageZoomOwl.trigger('to.owl.carousel',i)
        $("#imageZoom").attr('data-i', i).addClass('active')
        $("html, body").css({overflow: 'hidden'})
    }

    function imageZoomClose () {
        $("#imageZoom").removeClass('active')
        $("html, body").css({overflow: 'auto'})
    }




    var galleryScrollPos2 = 0
    gallery_card.addEventListener('scroll', function(e) {

        var st = $(gallery_card).scrollTop()

        if (st > galleryScrollPos2) {
            if (st > 120) {
                $('#gallery .head').addClass('hide')
            }
            console.log('down')
        } else {
            $('#gallery .head').removeClass('hide')
            console.log('up')
        }

        galleryScrollPos2 = st

    });

}
