import '@scss/options/options.scss';

$(function () {
  $('.menu__icon_burger').click(function (e) {
    e.preventDefault();
    $('.upmenu').addClass('upmenu__active');
    $('section').addClass('blur');
  });

  $('.upmenu__close').click(function () {
    $('.upmenu').removeClass('upmenu__active');
    $('section').removeClass('blur');
  });
});
