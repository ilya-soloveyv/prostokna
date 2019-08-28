if ($('#page-brand').length) {
  // $('body').css({
  //   overflow: 'hidden',
  //   position: 'fixed',
  //   width: '100%'
  // })
  $('[data-toggle="tooltip"]').tooltip()
  $('[data-toggle="popover"]').popover()
  $('.buttonDesc').click(function () {
    $('.sBrandDesc').show()
  })
  $('.closeDesc').click(function () {
    $('.sBrandDesc').hide()
  })
  $('.gallery').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    // contain: true,
    swipeToSlide: true,
    focusOnSelect: true,
    // centerMode: true,
    // centerPadding: 0,
    asNavFor: '.gallery2',
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 4,
        }
      },
    ],
    prevArrow: '<button type="button" class="slick-prev"><img src="/images/page-brand/arrow.svg"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="/images/page-brand/arrow.svg"></button>'
  })
  $('.gallery .slick-slide').on("click", function (e) {
    e.preventDefault()
    return false;
    // var index = Number($(this).attr('data-slick-index'))
    // $('.gallery2').slick('slickGoTo', index)
  })
  $('.gallery .slick-slide').on("mouseover", function () {
    $(this).addClass('slick-current').siblings().removeClass('slick-current')
    // var index = Number($(this).attr('data-slick-index'))
    // $('.gallery2').slick('slickGoTo', index)
  })

  $('.gallery2').slick({
    // infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    asNavFor: '.gallery',
  }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
    // console.log(nextSlide)
    // $('.gallery .slick-slide').eq(nextSlide).addClass('active').siblings().removeClass('active')
    // $('.gallery').slick('slickGoTo', nextSlide - 1)
  })
  // $('.gallery .slick-slide').eq(0).click()
  // $('.gallery2 .slick-slide').eq(0).click()

}