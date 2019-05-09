if ($('#news').length) {
    $(document).ready(function(){
        if(window.innerWidth < 900){
        $('.owl-carousel').owlCarousel({
            center: true,
            responsive:{
                0:{
                    center: true,
                    loop:true,
                    items:2
                },
                600:{
                    center: true,
                    items:3,
                    loop:true,
                    arrows: false,
                    dots: false,
                    nav: false
                },
                400:{
                    center: true,
                    loop:true,
                    items:2
                },
                1000:{
                    items:5
                }
            }
        })
        }
    });
    if(window.innerWidth > 1000)
    $(function(){
        $('.card-news-container').slick({
            vertical: true,
            verticalSwiping: true,
            slidesToShow: 5,
            arrows: false
        });
    });
}