import '@scss/accessories/accessories.scss';

if ($('#accessories').length) {
  // MENU

  $('.menu').on('click', function () {
    $('.menu .hamburger.hamburger--collapse').toggleClass('is-active');
    $(this).toggleClass('active');
    $('.content').toggleClass('blur');
    $('.menu-overlay').fadeToggle(300);
    $.each($('.menu-list li'), function (i, el) {
      setTimeout(function () {
        $(el).toggleClass('active');
      }, i * 150);
    });
  });

  // SELECT

  $('.select__list').on('click', function () {
    $(this).find('li:not(.active)').slideToggle(300);
    // $('.select li:not(.active)').slideToggle(300);
    $(this).toggleClass('active');
  });

  $('.select__item').on('click', function () {
    console.log(111);
    var opText = $(this)
      .closest('.select__list')
      .find('.select__item:first-child')
      .text();
    var opData = $(this)
      .closest('.select__list')
      .find('.select__item:first-child')
      .attr('data-option');
    // var opText = $('.select__item:first-child').text();
    // var opData = $('.select__item:first-child').attr('data-option');
    var text = $(this).text();
    var data = $(this).attr('data-option');

    $(this)
      .closest('.select__list')
      .find('.select__item:first-child')
      .text(text)
      .attr('data-option', data);
    // $('.select__item:first-child').text(text).attr('data-option', data);
    $(this).text(opText).attr('data-option', opData);
  });

  // COLORS

  function changeColor() {
    var active = $('.colors__item.active');
    const sPartImageFile = active.attr('data-sPartImageFile');
    const iPartColorPrice = active.attr('data-iPartColorPrice');
    const sPartColorTitle = active.attr('data-sPartColorTitle');
    const sPartColorTitleCode = active.attr('data-sPartColorTitleCode');
    console.log(sPartImageFile);
    // console.log(iPartColorPrice)
    // console.log(sPartColorTitle)
    // console.log(sPartColorTitleCode)
    $('.result__num').html(sPartColorTitleCode);
    $('.result__color').html(sPartColorTitle);
    $('.texture_handle').attr('src', '/images/part/' + sPartImageFile);
  }

  $('.colors__item').on('click', function () {
    // console.log(sPartImageFile)
    $(this).addClass('active').siblings().removeClass('active');
    changeColor();
  });

  // Carousell
  function setActive(index) {
    $('.circle li.i1').removeClass('i1');
    $('.circle li.i2').removeClass('i2');
    $('.circle li.i3').removeClass('i3');
    $('.circle li.i4').removeClass('i4');
    $('.circle li.i5').removeClass('i5');
    $('.circle li.active').removeClass('active');
    $('.circle li').eq(index).addClass('i3');
    $('.circle li').eq(index).addClass('active');
    var next = $('.circle li').eq(index).next('.item');
    var prev = $('.circle li').eq(index).prev('.item');
    if ($(next).length) {
      $(next).addClass('i4');
      $(next).next('.item').addClass('i5');
      if (!$(next).next('.item').length) {
        $('.circle li').filter(':first').addClass('i5');
      }
    } else {
      $('.circle li')
        .filter(':first')
        .addClass('i4')
        .next('.item')
        .addClass('i5');
    }

    if ($(prev).length) {
      $(prev).addClass('i2');
      $(prev).prev('.item').addClass('i1');
      if (!$(prev).prev('.item').length) {
        $('.circle li').filter(':last').addClass('i1');
      }
    } else {
      $('.circle li')
        .filter(':last')
        .addClass('i2')
        .prev('.item')
        .addClass('i1');
    }
  }

  $(document).on('click', '.circle li', function () {
    if (!$(this).hasClass('i1') && !$(this).hasClass('i5')) {
      var index = $(this).index();
      setActive(index);
    } else if ($(this).hasClass('i1')) {
      $('.circle li.i2').trigger('click');
      setTimeout(function () {
        $('.circle li.i2').trigger('click');
      }, 250);
    } else if ($(this).hasClass('i5')) {
      $('.circle li.i4').trigger('click');
      setTimeout(function () {
        $('.circle li.i4').trigger('click');
      }, 250);
    }
  });

  $('.choise').bind('mousewheel', function (e) {
    if (e.originalEvent.wheelDelta / 120 > 0) {
      $('.circle li.i4').trigger('click');
    } else {
      $('.circle li.i2').trigger('click');
    }
  });

  // Hover item circle
  if ($(window).width() >= 992) {
    $('.circle .item').hover(
      function () {
        $(this).find('.item__desc').css({ opacity: '1' });
        if ($(this).hasClass('active')) {
          $(this).find('.item__desc').css({ opacity: '1' });
        } else {
          $('.circle .item.active').find('.item__desc').css({ opacity: '0' });
        }
      },
      function () {
        if ($(this).hasClass('active')) {
          $(this).find('.item__desc').css({ opacity: '0' });
        } else {
          $(this).find('.item__desc').css({ opacity: '0' });
          $('.circle .item.active').find('.item__desc').css({ opacity: '0' });
        }
      }
    );
  }

  $('.sill-arrow .arrow').on('click', function () {
    var pos = $(window).scrollTop();
    $('html, body').animate({ scrollTop: pos + 200 }, 'slow');
  });

  let rotate = 0;
  let rotateCheck = true;
  function resetRotateCheck() {
    rotateCheck = true;
  }
  $('.krugaly .ccircle').bind('mousewheel', function (e) {
    // if (rotateCheck) {
    // 	var liCount = $('.krugaly .ccircle li').length
    // 	var liActive = $('.krugaly .ccircle li.active')
    // 	$('.krugaly .ccircle li').removeClass('active').removeClass('next').removeClass('prev')
    // 	if(e.originalEvent.wheelDelta /120 > 0) {
    // 		rotate += 45
    // 		if (liActive.prev().length) {
    // 			liActive.prev().addClass('active')
    // 		} else {
    // 			$('.krugaly .ccircle li').eq(liCount-1).addClass('active')
    // 		}
    // 	}
    // 	else{
    // 		rotate -= 45
    // 		if (liActive.next().length) {
    // 			liActive.next().addClass('active')
    // 		} else {
    // 			$('.krugaly .ccircle li').eq(0).addClass('active')
    // 		}
    // 	}
    // 	$('.krugaly .ccircle').css({ transform: 'rotate(' + rotate + 'deg)'})
    // 	$('.krugaly .ccircle li .item').css({ transform: 'rotate(' + (rotate * -1) + 'deg)'})
    // 	if ($('.krugaly .ccircle li.active').next().length) {
    // 		$('.krugaly .ccircle li.active').next().addClass('next')
    // 	} else {
    // 		$('.krugaly .ccircle li').eq(0).addClass('next')
    // 	}
    // 	if ($('.krugaly .ccircle li.active').prev().length) {
    // 		$('.krugaly .ccircle li.active').prev().addClass('prev')
    // 	} else {
    // 		$('.krugaly .ccircle li').eq(liCount-1).addClass('prev')
    // 	}
    // 	rotateCheck = false
    // 	setTimeout('resetRotateCheck()', 0)
    // }
  });

  function definitionPosition() {}

  function krugalyRotate(newIndex) {
    const oldIndex = $('.krugaly .ccircle ul li.active').index();
    $('.krugaly .ccircle ul li.active').removeClass('active');
    $('.krugaly .ccircle ul li:eq(' + newIndex + ')').addClass('active');
    console.log(oldIndex, newIndex);
    const corner = 45;
    const iteration = oldIndex - newIndex;
    console.log(iteration);
    const rotate = corner * iteration;
    $('.krugaly .ccircle').css({ transform: 'rotate(' + rotate + 'deg)' });
    $('.krugaly .ccircle li .item').css({
      transform: 'rotate(' + rotate * -1 + 'deg)',
    });
    // switch(newIndex) {
    // 	case 0:
    // 		break;
    // 	case 1:
    // 		break;
    // 	case 2:
    // 		break;
    // 	case 3:
    // 		break;
    // 	case 4:
    // 		break;
    // }
  }

  $(document)
    .ready(function () {
      // const newIndex = $('.krugaly .ccircle ul li.active').index()
      // krugalyRotate(newIndex)
    })
    .on('click', '.krugaly .ccircle ul li', function () {
      const newIndex = $(this).index();
      krugalyRotate(newIndex);
      // rotate -= 45
      // $('.krugaly .ccircle').css({ transform: 'rotate(' + rotate + 'deg)'})
      // $('.krugaly .ccircle li .item').css({ transform: 'rotate(' + (rotate * -1) + 'deg)'})
    });
}
