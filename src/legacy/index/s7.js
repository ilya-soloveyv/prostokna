import '@scss/index/s7.scss';

$('.owl-carousel.owl-gird-s7').owlCarousel({
  nav: true,
  navText: [
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
  ],
  responsive: {
    0: {
      items: 2,
    },
    768: {
      items: 3,
    },
    1280: {
      items: 4,
    },
  },
  onInitialized: () => {
    $('.s7 .owl-nav').prepend($('.s7 .owl-dots'));
  },
});
