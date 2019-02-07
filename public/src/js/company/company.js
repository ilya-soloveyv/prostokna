if ($('#company').length) {

  $(".owl-carousel.company-header_slider").owlCarousel({
    dots: false,
    nav: false,
    loop: false,
    margin: 30,
    responsive:{
      0:{
        items:1,
      },
      600:{
        items:2,
      },
      1000:{
        items:5,
      }
    },
  });

  $(".owl-carousel.company-section-slider").owlCarousel({
    dots: false,
    loop: true,
    items: 1,
    nav: true,
    navText: ["<img src='/images/company/left.png'>","<img src='/images/company/right.png'>"]
  });

  $(document).one("mouseleave", function(e) {
    if (e.relatedTarget == null) {
      //NATIFICATIONS;
    }
  });

  
  var blockScroll = false,
      canBlockScroll = true,
      indexActiveOwl = 0,
      counterScroll = 0;
      scrollSensitivity = 20;


  if ($(window).width() > 1000) {

    changeActiveOwl(indexActiveOwl);

    $(document).bind('mousewheel DOMMouseScroll', function(event) {
      var bottomScroll = Math.floor($(".company-header_bottom_desc").offset().top - $(window).height());
      var delta = event.originalEvent.wheelDelta || -event.detail;

      if ($(window).scrollTop() > bottomScroll - 100 
        && $(window).scrollTop() < bottomScroll + 100) {

        console.log("block");

        if (!blockScroll && canBlockScroll) {
          $("HTML, BODY").animate({ scrollTop: bottomScroll - 50 }, 400); 
          blockScroll = true;
          setTimeout(() => {
            $(document).disablescroll()
            console.log("SCROLL DISABLED");
          }, 407)
          console.log("animated");
        }

        if (delta < 0 && blockScroll) {

          ++counterScroll;

          if (counterScroll > scrollSensitivity) {
            counterScroll = 0;
            ++indexActiveOwl;
            if (indexActiveOwl > 4) {
              indexActiveOwl = 4;
              canBlockScroll = false;
              setTimeout(function() {
                canBlockScroll = true;
                console.log("Can block Scroll");
              }, 1000);
              $(document).disablescroll("undo");
              blockScroll = false;
            }
            changeActiveOwl(indexActiveOwl);
          }

        } else if (delta > 0  && blockScroll) {
          //Scroll Top 
          
          --counterScroll;

          if (counterScroll < -scrollSensitivity) {
            counterScroll = 0;
            --indexActiveOwl;
            if (indexActiveOwl < 0) {
              indexActiveOwl = 0;
              canBlockScroll = false;
              setTimeout(function() {
                canBlockScroll = true;
                console.log("Can block Scroll");
              }, 1000);
              $(document).disablescroll("undo");
              blockScroll = false;
            }
            changeActiveOwl(indexActiveOwl);

          }
        }
      }
    }); 
  }



  function changeActiveOwl(index) {
    document.querySelectorAll(".company-header_slider .owl-item").forEach(function(item, i) {
      item.classList.remove("center-owl");
      if (i == index) {item.classList.add("center-owl");}
    })
  }
}
