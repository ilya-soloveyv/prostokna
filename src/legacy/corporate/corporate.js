import '@scss/corporate/corporate.scss';

if ($('#corporate').length) {
  var price = [
    {
      discount: 35,
      sum: 400000,
    },
    {
      discount: 40,
      sum: 750000,
    },
    {
      discount: 45,
      sum: 1000000,
    },
  ];

  var widthDiagram = Math.floor($('.corporate-diagram_block').width() * 0.9);

  function changeCostValue(value) {
    var index = (value / Math.floor(100 / price.length)) >> 0;

    if (index == price.length) {
      index = price.length - 1;
    }
    var sum = price[index].sum,
      discount = price[index].discount;
    $('.sum-title span:first-child').text(sum);
    $('.block-discount h5').text(discount + '%');
  }

  var diagram = $('.dial').knob({
    change: changeCostValue,
    width: widthDiagram,
    height: widthDiagram,
  });

  // Scroll down for phone
  var position = $('#corporate .under-title').offset().top - 80;
  $('#corporate .material-icons').on('click', function () {
    $('HTML, BODY').animate({ scrollTop: position }, 1000);
  });
}
