import '@scss/contact/contact.scss';

if ($('#contact').length) {
  Inputmask({ mask: '+7 (999) 999-99-99' }).mask('#contact input[name=phone]');

  $('.form-group input').change(function () {
    if ($(this).val().length && $(window).width() > 1200) {
      $(this).siblings('.form-label').css('transform', 'translateY(-40px)');
    } else {
      $(this).siblings('.form-label').css('transform', 'translateY(-33px)');
    }
  });

  $('.form-group textarea').change(function () {
    if ($(this).val().length && $(window).width() > 1200) {
      $(this).siblings('.form-label').css('transform', 'translateY(-40px)');
    } else {
      $(this).siblings('.form-label').css('transform', 'translateY(-33px)');
    }
  });
}
