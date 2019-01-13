$(document).ready(function () {
  $('.btn-desc').click(function () { 
    $('.pop-up').fadeIn();    
  });
  $('.pop-up_close').click(function () { 
    $('.pop-up').fadeOut();    
  });

  $(".regulation_window-checkitem").click(function () {
    
    $(".regulation_window-checkitem").removeClass('active');
    $(this).addClass('active');
  })
});