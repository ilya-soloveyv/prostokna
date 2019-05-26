
if ($("#gallery").length) {

    // var elem = document.getElementById("gallery_scroll")
    // console.log(elem)
    // var scrollbar = Scrollbar.init(elem, {
    //     alwaysShowTracks: true
    // })

    var gallery_scroll = document.getElementById('gallery_scroll')
    if (gallery_scroll) {
        var galleryScrollPos = 0;
        gallery_scroll.addEventListener('scroll', function (e) {
            st = $(gallery_scroll).scrollTop()
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
        if ($(window).width() < 1200) {
            var i = $(this).parent().index()
            imageZoomOpen(i)
        }
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

    if (gallery_card) {
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
    }


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



    if (gallery_card) {
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


    var gallery_card_owl = document.getElementById('gallery_card_owl')
    if (gallery_card_owl) {

        var active_index = $('#gallery .gallery_card #gallery_card_pagg .wrap_pagg a.active').index()


        var owl = $('#gallery_card_owl')
        owl.on('changed.owl.carousel', function(event) {

            // console.log('changed.owl.carousel')
            $('.owl-item').scrollTop(0)
            $('#gallery .head').removeClass('hide')

            // var active = $('.owl-item.active')
            // if (active.length) {
            //     var index = event.item.index
            //     var iGalleryID = active.find('.owl-item-gallery-card').attr('data-igalleryid')
            //     // console.log('index', index)
            //     // console.log('iGalleryID', iGalleryID)

            //     // var currentItem = event.item.index;
            //     // console.log('iGalleryID', currentItem)

                
                
            //     // owl.trigger("to.owl.carousel", [2,250])
            //     // owl.on('to.owl.carousel', 3)
            // }

            $('#gallery .gallery_card #gallery_card_pagg .wrap_pagg a').eq(event.item.index).addClass('active').siblings().removeClass('active')

            scroll_active_gallery_card(event.item.index)
            
            // var x = $('.owl-item.active')
            var pagg_height = $('#gallery .gallery_card #gallery_card_pagg').height()
            // console.log(pagg_height)
            var pagg_scrollTop = $('#gallery .gallery_card #gallery_card_pagg .wrap_pagg').scrollTop()
            // console.log(pagg_scrollTop)
            var pagg_active_top = $('#gallery .gallery_card #gallery_card_pagg .wrap_pagg a.active').position().top
            // console.log(pagg_active_top)
            var pagg_active_height = $('#gallery .gallery_card #gallery_card_pagg .wrap_pagg a.active').height()
            // console.log(pagg_active_height)

            $('#gallery .gallery_card #gallery_card_pagg .wrap_pagg').scrollTop(100)
            
            // history.pushState(null, null, '/gallery/big/' + iGalleryID)
            // console.log(iGalleryID)
            // history.replaceState("/gallery/big/" + iGalleryID)
            // if (x.length) {
            //     var iGalleryID = x.find('.owl-item-gallery-card').attr('data-iGalleryID')
            //     console.log(iGalleryID)
            // history.replaceState()
            //     window.history.pushState(null, null, '/gallery/big/' + iGalleryID)
            //     // history.pushState(null, null, '/gallery/big/' + iGalleryID)
            // }
            
            // var id_active = $('')
            // history.pushState(null, null, '/gallery/big/21111')
        })
        owl.on('initialized.owl.carousel', function(event) {
            scroll_active_gallery_card(event.item.index)

            // console.log(event)
            // event.item.index = 3
            // owl.trigger("refresh.owl.carousel")
            // console.log('initialized.owl.carousel')
            // var x = $('.owl-item.active')
            // console.log(x)
            // $('#gallery .gallery_card #gallery_card_owl .owl-stage-outer .owl-stage .owl-item').eq(2).addClass('active').siblings().removeClass('active')
            // var currentItem = event.item.index;
            // console.log('iGalleryID', currentItem)
            // owl.trigger("to.owl.carousel", [1,0])
            // scroll_active_gallery_card()
            // owl.trigger("to.owl.carousel", [2,0])
        })
        owl.owlCarousel({
            items: 1
        })
        .trigger('to.owl.carousel', [active_index, 0])

        function scroll_active_gallery_card (index) {
            var galleryScrollPos3 = 0
            var gallery_card_owl_item_active = document.getElementsByClassName('owl-item')[index]
            if (gallery_card_owl_item_active) {
                console.log(gallery_card_owl_item_active)
                // console.log(gallery_card_owl_item_active)
                gallery_card_owl_item_active.addEventListener('scroll', function(e) {
                    var st = $(this).scrollTop()

                    // console.log(st)

                    if (st > galleryScrollPos3) {
                        if (st > 120) {
                            $('#gallery .head').addClass('hide')
                            $('#gallery_card_pagg').addClass('postop')
                        }
                        // console.log('down')
                    } else {
                        $('#gallery .head').removeClass('hide')
                        $('#gallery_card_pagg').removeClass('postop')
                        // console.log('up')
                    }

                    galleryScrollPos3 = st
                })                
            }
        }
        
        $("#gallery .gallery_card #gallery_card_pagg .wrap_pagg a").click(function(){
            var index = $(this).index()
            owl.trigger("to.owl.carousel", [index,0])
            return false
        })
        



        // $(document).ready(function () {
        //     $("").owlCarousel({
        //         items: 1
        //     })
        // })


        // var gallery_card_owl_item_list = document.getElementsByClassName('owl-item')
        // console.log(gallery_card_owl_item_list)
        // var gallery_card_owl_item = gallery_card_owl_item_list[0]
        // console.log(gallery_card_owl_item)
        // gallery_card_owl_item_list.forEach(element => {
        //     element.addEventListener('scroll', function(e) {
        //         console.log(e)
        //     })
        // })
        // console.log(gallery_card_owl_item[0])
        // console.log(gallery_card_owl_item)
        // var st = $('.owl-item.active').scrollTop();
    }

}
