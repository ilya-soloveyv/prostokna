import '@scss/gallery.scss';

if ($('#gallery').length) {
  var gallery_scroll = document.getElementById('gallery_scroll');
  if (gallery_scroll) {
    var galleryScrollPos = 0;
    gallery_scroll.addEventListener('scroll', function (e) {
      st = $(gallery_scroll).scrollTop();
      if (st > galleryScrollPos) {
        if (st > 120) {
          $('#gallery .head').addClass('hide');
        }
        console.log('down');
      } else {
        $('#gallery .head').removeClass('hide');
        console.log('up');
      }
      galleryScrollPos = st;
    });
  }

  $(document)
    .on('click', '#gallery_card_owl .images img', function () {
      if ($(window).width() > 767) {
        var src = $(this).attr('src');
        var index = $(this).index();
        $(this)
          .parents('.owl-item-gallery-card')
          .find('.image img')
          .attr('src', src)
          .attr('data-index', index);
      } else {
        var index = $(this).index();
        $(this)
          .parent()
          .find('img')
          .each(function (i2, el) {
            var img = $(el).attr('src');
            modal_gallery_owl.trigger('add.owl.carousel', [
              `<div class="item">
                        <img src="` +
                img +
                `">
                    </div>`,
            ]);
            modal_gallery_owl.trigger('to.owl.carousel', [index, 0]);
            $('#modal_gallery_owl').modal();
          });
      }
    })
    .on('click', '#gallery_card_owl .image img', function () {
      var index = $(this).attr('data-index');

      $(this)
        .parents('.owl-item-gallery-card')
        .find('.images .bg img')
        .each(function (i2, el) {
          var img = $(el).attr('src');
          modal_gallery_owl.trigger('add.owl.carousel', [
            `<div class="item">
                    <img src="` +
              img +
              `">
                </div>`,
          ]);
          modal_gallery_owl.trigger('to.owl.carousel', [index, 0]);
          $('#modal_gallery_owl').modal();
        });
    });

  $('[data-toggle="popover"]').popover({
    container: 'body',
  });

  $('#imageZoom .nav_close').click(function () {
    imageZoomClose();
  });

  var imageZoomOwl = $('#imageZoom .owl-carousel').owlCarousel({
    loop: true,
    dots: false,
    margin: 0,
    nav: true,
    items: 1,
    navText: [
      "<img src='/images/gallery/prev.png'>",
      "<img src='/images/gallery/next.png'>",
    ],
  });

  // function imageZoomOpen (i) {
  //     imageZoomOwl.trigger('to.owl.carousel',i)
  //     $("#imageZoom").attr('data-i', i).addClass('active')
  //     $("html, body").css({overflow: 'hidden'})
  // }

  function imageZoomClose() {
    $('#imageZoom').removeClass('active');
    $('html, body').css({ overflow: 'auto' });
  }

  var gallery_card_owl = document.getElementById('gallery_card_owl');
  if (gallery_card_owl) {
    var active_index = $(
      '#gallery .gallery_card #gallery_card_pagg .wrap_pagg a.active'
    ).index();

    var owl = $('#gallery_card_owl');
    owl.on('changed.owl.carousel', function (event) {
      $('.owl-item').scrollTop(0);
      $('#gallery .head').removeClass('hide');

      $('#gallery .gallery_card #gallery_card_pagg .wrap_pagg a')
        .eq(event.item.index)
        .addClass('active')
        .siblings()
        .removeClass('active');

      scroll_active_gallery_card(event.item.index);

      if ($(window).width() > 767) {
        var pagg_height = $(
          '#gallery .gallery_card #gallery_card_pagg'
        ).height();
        var pagg_scrollTop = $(
          '#gallery .gallery_card #gallery_card_pagg .wrap_pagg'
        ).scrollTop();
        var pagg_active_top = $(
          '#gallery .gallery_card #gallery_card_pagg .wrap_pagg a.active'
        ).position().top;
        var pagg_active_height = $(
          '#gallery .gallery_card #gallery_card_pagg .wrap_pagg a.active'
        ).height();
        var t =
          pagg_active_top +
          pagg_scrollTop -
          pagg_height / 2 +
          pagg_active_height / 2;
        $('#gallery .gallery_card #gallery_card_pagg .wrap_pagg').animate(
          { scrollTop: t },
          250,
          'swing'
        );
      } else {
        var pagg_width = $('#gallery .gallery_card #gallery_card_pagg').width();
        var pagg_scrollLeft = $(
          '#gallery .gallery_card #gallery_card_pagg .wrap_pagg'
        ).scrollLeft();
        var pagg_active_left = $(
          '#gallery .gallery_card #gallery_card_pagg .wrap_pagg a.active'
        ).position().left;
        var pagg_active_width = $(
          '#gallery .gallery_card #gallery_card_pagg .wrap_pagg a.active'
        ).width();
        var l =
          pagg_active_left +
          pagg_scrollLeft -
          pagg_width / 2 +
          pagg_active_width / 2;
        $('#gallery .gallery_card #gallery_card_pagg .wrap_pagg').animate(
          { scrollLeft: l },
          250,
          'swing'
        );
      }
    });
    owl.on('initialized.owl.carousel', function (event) {
      scroll_active_gallery_card(event.item.index);
    });
    owl
      .owlCarousel({
        items: 1,
      })
      .trigger('to.owl.carousel', [active_index, 0]);

    function scroll_active_gallery_card(index) {
      var galleryScrollPos3 = 0;
      var gallery_card_owl_item_active = document.getElementsByClassName(
        'owl-item'
      )[index];
      if (gallery_card_owl_item_active) {
        gallery_card_owl_item_active.addEventListener('scroll', function (e) {
          var st = $(this).scrollTop();

          if (st > galleryScrollPos3) {
            if (st > 120) {
              $('#gallery .head').addClass('hide');
              $('#gallery_card_pagg').addClass('postop');
            }
          } else {
            $('#gallery .head').removeClass('hide');
            $('#gallery_card_pagg').removeClass('postop');
          }

          galleryScrollPos3 = st;
        });
      }
    }

    $('#gallery .gallery_card #gallery_card_pagg .wrap_pagg a').click(
      function () {
        var index = $(this).index();
        owl.trigger('to.owl.carousel', [index, 250]);
        return false;
      }
    );
  }
}
