if ($('#page-brand').length) {
    $(document).ready(function(){
      
   
    
        $('.carouselOne').owlCarousel({
          items:1,
          loop: true,
          navContainer: '.owl-nav',
          nav: true,
          afterMove: callback,
          afterAction: afterAction(),
          slideBy: 5
          
        });
        $('.container_slider').owlCarousel({
          center: true,
       
          nav:true,
          mouseDrag: false,
          touchDrag: false,
          responsiveClass:true,
          responsive:{
              0:{
                  items:3,
                  nav:true,
                  loop: true
              },
              600:{
                  items:3,
                  loop: true
              },
              1000:{
                  items:5,
                  touchDrag: false,
                  nav:true,
                  loop: true
              }
          }
        });
        var owl = $('.carouselOne');
        var owl2 = $('.container_slider');
        owl.owlCarousel();
        // Go to the next item
        $('.owl-next').click(function() {
            owl.trigger('next.owl.carousel');
    
            if(window.innerWidth > 768){
              if($('.container_slider .owl-item.active').hasClass('center')){
    
               for(i= 0; i <= els.length - 1; i++){
                 els[i].style.visibility = "hidden";
                 
               }
               $('.owl-item.center .slide .photo > .btn-look').css('visibility','inherit');
     
             } 
           }
        })
        // Go to the previous item
        $('.owl-prev').click(function() {
            // With optional speed parameter
            // Parameters has to be in square bracket '[]'
            owl.trigger('prev.owl.carousel');
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
            if(window.innerWidth > 768){
             if($('.container_slider .owl-item.active').hasClass('center')){
              for(i= 0; i <= els.length - 1; i++){
                els[i].style.visibility = "hidden";
                
              }
              $('.owl-item.center .slide .photo > .btn-look').css('visibility','inherit');
    
            } 
          }
      })
        
      owl.on('changed.owl.carousel', function(event){
            
        var pos = callback(event);
        owl2.trigger('to.owl.carousel', [pos]);
    
    })
    
      function callback(event) {
        var page      = event.page.index;     // 
        return page;
    }
    
    var els = document.getElementsByClassName('btn-look');
    var i;
    for(i= 0; i <= els.length - 1; i++){
      els[i].style.visibility = "hidden";
      
    }
    if(innerWidth < 768) $('.owl-item .slide1 > .btn-look').css('visibility','inherit');
    if(innerWidth > 768) $('.owl-item.center .slide .photo > .btn-look').css('visibility','inherit');
      });
}