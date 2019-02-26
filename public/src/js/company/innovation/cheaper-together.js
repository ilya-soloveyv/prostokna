if ($('#cheaper-together').length) {

  var slideIndex = 1;
  var nmIndex = 1;
  
  showSlides3(slideIndex);
  
  opas(nmIndex);
  
  
  function plusnm(m) {
    opas(nmIndex = m);
      // body...
    }
  
  function plusSlides3(n) {
    showSlides3(slideIndex = n);
      // body...
    }
  
  function opas(m){
    var i;
    var nm = document.getElementsByClassName("opasity");
      if( m > nm.length){
        nmIndex = 1;
      }
      if (m < 1){
        nmIndex = nm.length;
      }
    
      for(i=0; i< nm.length; i++){
        nm[i].style.opacity = "0.5";
      }
      
      nm[nmIndex - 1].style.opacity = "1";
  }


  function showSlides3(n) {
    // body...
    var slides = document.getElementsByClassName("description_item");


    if (n > slides.length){
      slideIndex = 1;
    }
    if (n < 1){
      slideIndex = slides.length;
    }
  
    for (var i = 0; i < slides.length; i++){
      slides[i].style.display = "none";
    }
    
    slides[slideIndex - 1].style.display = "block";
    
  }

  $(function() {
    // Owl Carousel
    
    var owl = $("#cheaper");

    owl.owlCarousel({
      center: true,
      items: 3,
      dots: false
    });

    owl.on('changed.owl.carousel', function(e) {
     // $('.counter').text(++e.page.index  + ' из ' + e.item.count)
      console.log(++e.item.index);
      plusSlides3(e.item.index); // - 2
      plusnm(e.item.index ); // - 3
    });
    
  });
}
