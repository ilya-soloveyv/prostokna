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
        items:3,
      },
      1000:{
        items:5,
      }
    },
  });

  $(document).one("mouseleave", function(e) {
    if (e.relatedTarget == null) {
      //NATIFICATIONS;
    }
  });

  
  var blockScroll = false,
      indexActiveOwl = 0,
      counterScroll = 0;

  $(document).on("scroll", function() {
    var bottomScroll = Math.floor($(".company-prostokna-section").offset().top - $(window).height()) - 20;
    if ($(window).scrollTop() > bottomScroll) {
      if (!blockScroll) {
        blockScroll = true;
        $(document).disablescroll();
      }
      ++counterScroll;
      if (counterScroll > 15) {
        counterScroll = 0;
        ++indexActiveOwl;
        changeActiveOwl(indexActiveOwl);
      }
      if (indexActiveOwl > 4) {
        $(document).disablescroll("undo");
        blockScroll = false;
      }
    } else if ($(window).scrollTop() + 10 < bottomScroll && blockScroll) {
      if (!indexActiveOwl) {
        $(document).disablescroll("undo");
        blockScroll = false;
      } else {
        --counterScroll;
        if (counterScroll < -15) {
          counterScroll = 0;
          --indexActiveOwl;
          changeActiveOwl(indexActiveOwl);
        }
      }
    }
  })


  function changeActiveOwl(index) {
    document.querySelectorAll(".company-header_slider .owl-item").forEach(function(item, i) {
      item.classList.remove("center-owl");
      if (i == index) {item.classList.add("center-owl");}
    })
  }
}
