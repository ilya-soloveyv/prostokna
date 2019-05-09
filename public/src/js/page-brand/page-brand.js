if ($('#page-brand').length) {


    $(document).ready(function(){
      
   
    
        $('#page-brand .carouselOne').owlCarousel({
          items:1,
          loop: true,
          navContainer: '.owl-nav',
          nav: true,
          afterMove: callback,
          mouseDrag: true,
          afterAction: afterAction(),
          slideBy: 5,
          dots: false
          
        });
        $('#page-brand .container_slider').owlCarousel({
          center: true,
          dots: false,
          nav:true,
          mouseDrag: true,
          touchDrag: true,
          URLhashListener:true,
          autoplayHoverPause:true,
          startPosition: 'URLHash',
          responsiveClass:true,
          responsive:{
              0:{
                  items:3,
                  nav:true,
                  loop: true,
                  dots: false,
                  mouseDrag: true
              },
              600:{
                  items:3,
                  loop: true,
                  dots: false,
                  mouseDrag: true
              },
              1000:{
                  items:5,
                  mouseDrag: true,
                  nav:true,
                  loop: true,
                  dots: false,
                  URLhashListener:true,
                  autoplayHoverPause:true,
                  startPosition: 'URLHash',
              }
          }
        });
        var owl = $('.carouselOne');
        var owl2 = $('.container_slider');
        owl.owlCarousel();
        // Go to the next item
        $('#page-brand .owl-next').click(function() {
          if(window.innerWidth < 768){
          owl.trigger('next.owl.carousel');
          }
              owl.trigger('#page-brand next.owl.carousel');

            if(window.innerWidth > 768){
              if($('#page-brand .container_slider .owl-item.active').hasClass('center')){
    
               for(i= 0; i <= els.length - 1; i++){
                 els[i].style.visibility = "hidden";
                 
               }
               $('#page-brand .owl-item.center .slide .photo > .btn-look').css('visibility','inherit');
     
             } 
           }
        })
        // Go to the previous item
        $('#page-brand .owl-prev').click(function() {
            // With optional speed parameter
            // Parameters has to be in square bracket '[]'
            if(window.innerWidth < 768){
            owl.trigger('prev.owl.carousel');
            }
            owl.trigger('#page-brand prev.owl.carousel');
            if(window.innerWidth > 768){
              if($('.container_slider .owl-item.active').hasClass('center')){
               for(i= 0; i <= els.length - 1; i++){
                 els[i].style.visibility = "hidden";
                 
               }
               $('.owl-item.center .slide .photo > .btn-look').css('visibility','inherit');
     
             } 
           }
        }) 
    
        function afterAction() {
    
        }
    
        
          owl2.on('changed.owl.carousel', function(event){
    
            var pos = callback(event);
            if(window.innerWidth <= 768){
              //owl.trigger('to.owl.carousel', [pos]);
            }
         
      })

      owl2.on('translated.owl.carousel', function(event){
        if(window.innerWidth > 768){
          if($('.container_slider .owl-item.active').hasClass('center')){
           for(i= 0; i <= els.length - 1; i++){
             els[i].style.visibility = "hidden";
             
           }
           $('.owl-item.active.center .slide .photo > .btn-look').css('visibility','inherit');
           console.log('2')
         } 
       }   
    })

    owl2.on('dragged.owl.carousel', function(event){
      if(window.innerWidth > 768){
        if($('.container_slider .owl-item.active').hasClass('center')){
         for(i= 0; i <= els.length - 1; i++){
           els[i].style.visibility = "hidden";
           
         }
         $('.owl-item.active.center .slide .photo > .btn-look').css('visibility','inherit');
         console.log('2')
       } 
     }   
  })

        if(window.innerWidth < 768){
      owl2.on('translated.owl.carousel', function(event){
        var pos = callback(event);
        owl.trigger('to.owl.carousel', [pos - 3]);
        
        
    })
  }
    owl.on('changed.owl.carousel', function(event){
          
      var pos = callback(event);
      owl2.trigger('to.owl.carousel', [pos - 3]);
      
  })
    
      function callback(event) {
        var page      = event.item.index;     // 
        return page;
    }
    
    var els = document.getElementsByClassName('btn-look');
    var i;
    for(i= 0; i <= els.length - 1; i++){
      els[i].style.visibility = "hidden";
      
    }
    if(innerWidth < 768){ $('.owl-item .slide1 > .btn-look').css('visibility','inherit');
  
  }
    if(innerWidth > 768) 
    $('.owl-item.center .slide .photo > .btn-look').css('visibility','inherit');
      });
}