(function(e) {
    "use strict";

    function r(t, n) {
        this.opts = e.extend({
            handleWheel: !0,
            handleScrollbar: !0,
            handleKeys: !0,
            scrollEventKeys: [32, 33, 34, 35, 36, 37, 38, 39, 40]
        }, n);
        this.$container = t;
        this.$document = e(document);
        this.lockToScrollPos = [0, 0];
        this.disable()
    };
    var t, n;
    n = r.prototype;
    n.disable = function() {
        var e = this;
        e.opts.handleWheel && e.$container.on("mousewheel.disablescroll DOMMouseScroll.disablescroll touchmove.disablescroll", e._handleWheel);
        if (e.opts.handleScrollbar) {
            e.lockToScrollPos = [e.$container.scrollLeft(), e.$container.scrollTop()];
            e.$container.on("scroll.disablescroll", function() {
                e._handleScrollbar.call(e)
            })
        }
        e.opts.handleKeys && e.$document.on("keydown.disablescroll", function(t) {
            e._handleKeydown.call(e, t)
        })
    };
    n.undo = function() {
        var e = this;
        e.$container.off(".disablescroll");
        e.opts.handleKeys && e.$document.off(".disablescroll")
    };
    n._handleWheel = function(e) {
        e.preventDefault()
    };
    n._handleScrollbar = function() {
        this.$container.scrollLeft(this.lockToScrollPos[0]);
        this.$container.scrollTop(this.lockToScrollPos[1])
    };
    n._handleKeydown = function(e) {
        for (var t = 0; t < this.opts.scrollEventKeys.length; t++)
            if (e.keyCode === this.opts.scrollEventKeys[t]) {
                e.preventDefault();
                return
            }
    };
    e.fn.disablescroll = function(e) {
        !t && (typeof e == "object" || !e) && (t = new r(this, e));
        t && typeof e == "undefined" ? t.disable() : t && t[e] && t[e].call(t);
        return this
    };
    window.UserScrollDisabler = r;
})(jQuery);


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

  var seeNatifications = false;

  $(document).one("mouseleave", function(e) {
    if (e.relatedTarget == null
    && !seeNatifications) {
      seeNatifications = true;
      $(document).disablescroll();
      $("#company").addClass("company-natifications");//NATIFICATIONS;
    }
  });

  $(document).scroll(function(e) {
    if ($(window).scrollTop() + $(window).height() == $(document).height()
      && !seeNatifications) {
      seeNatifications = true;
      setTimeout( function() {
        $("#company").addClass("company-natifications");//NATIFICATIONS;
        $(document).disablescroll();
      }, 5000 );
    }
  });

  $(".company-natification-input-icon").on("click", function() {
    $("#company").removeClass("company-natifications");//NATIFICATIONS;
    $(document).disablescroll("undo");
  });
  
  var blockScroll = false,
      canBlockScroll = true,
      indexActiveOwl = 0,
      counterScroll = 0,
      scrollSensitivity = 20;


  if ($(window).width() > 1000) {

    changeActiveOwl(indexActiveOwl);

    $(document).bind('mousewheel DOMMouseScroll', function(event) {
      var bottomScroll = Math.floor($(".company-header_bottom_desc").offset().top - $(window).height());
      var delta = event.originalEvent.wheelDelta || -event.detail;

      if ($(window).scrollTop() > bottomScroll - 100 
        && $(window).scrollTop() < bottomScroll + 100) {

        if (!blockScroll && canBlockScroll) {
          $("HTML, BODY").animate({ scrollTop: bottomScroll - 50 }, 400); 
          blockScroll = true;
          setTimeout(() => {
            $(document).disablescroll();
            //console.log("SCROLL DISABLED");
          }, 407);
          //console.log("animated");
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
