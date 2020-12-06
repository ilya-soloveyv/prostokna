import '@scss/optional_service/optional_service.scss';

if ($('#optional_service').length) {
  // call pop-up window
  $('.btn-desc').click(function () {
    $('.pop-up').fadeIn();
  });

  $('.optional_service-chekclist').owlCarousel({
    margin: 150,
    items: 3,
    center: true,
    loop: true,
    stagePadding: 10,
    responsive: {
      0: {
        margin: 10,
        items: 1,
      },
      992: {
        margin: 40,
      },
      1300: {
        margin: 80,
      },
      1500: {
        margin: 150,
      },
    },
  });
}
