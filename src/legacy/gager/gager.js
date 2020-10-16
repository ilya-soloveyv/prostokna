import '@scss/gager/gager.scss';

if ($('#gager').length) {
  Inputmask({ mask: '+7 (999) 999-99-99' }).mask('#gager input[name=phone]');
  // плавная прокрутака
  var $page = $('html, body');
  $('a[href*="#"]').click(function () {
    $page.animate(
      {
        scrollTop: $($.attr(this, 'href')).offset().top,
      },
      600
    );
    return false;
  });
  // Если поля не пустые оставлем описание наверху
  $('.gager-form_main input').change(function () {
    if ($(this).val().length) {
      $(this).siblings('label').css('transform', 'translateY(-32px)');
    }
  });

  // Скрипт лоадера после отправки формы
  var circles = $('.ico');
  $('.form-submit').on('click', function (e) {
    // console.log(e)
    // return false
    // Отменяю отправку для примера анимации
    // e.preventDefault();
  });

  // Возвращение к норме
}

function gagerFormSuccess() {
  $('.gager-form_main').hide();
  $('.overlay').css({
    background: 'rgba(0, 0, 0, 0.3)',
  });

  // Сама анимация svg
  $('.ellipse').css({
    'stroke-dasharray': '1400, 0',
  });

  $.each(circles, function (i, el) {
    setTimeout(function () {
      $(el).addClass('active');
    }, i * 375);
  });

  setTimeout(() => {
    circles.removeClass('active');
    $('.popup-thanks').show();
    $('.ellipse').css({
      'stroke-dasharray': '0, 1400',
    });
    $('.overlay').css({
      background: 'rgba(0, 0, 0, 0.9)',
    });
    if ($('.popup-thanks').is(':visible')) {
      $('.popup-thanks').on('click', function () {
        $('.popup-thanks').hide();
        $('.gager-form_main').show();
        $('.overlay').css({
          background: 'rgba(0, 0, 0, 0.7)',
        });
      });
    }
  }, 3000);
}
