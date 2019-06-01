if ($('#best-cost').length) {

   
    
    // $(document).ready(function(){ 
        
    //     $("#best-cost").on("click","a.anchor", function (event) {
    //         history.pushState('', document.title, window.location.pathname);
    //      //   if($(this).attr('href') === '#pre-title')
    //      console.log('qwe')
    //         var id  = $(this).attr('href'),
    //             top = $(id).offset().top;
    //             console.log(top)
    //         $('body,html').animate({scrollTop: top}, 1);

    //     });
        
        
    //     });

        function close(e){
            var div = $(".popup"); 
            if (!div.is(e.target) 
                && div.has(e.target).length === 0) { 
                div.removeClass('active')
              //  div.children().css('height', 'auto')
            }
        }

        $(document).mouseup(function (e){ 
            close(e)
        });
        $('.close').click(function (e){
            const els = document.querySelectorAll('.favorites-card-item')
            for(let i= 0; i< els.length; i++){
                if(els[i].classList.contains('active')) els[i].classList.remove('active')
            }
        $(".favorites-card-item").removeClass('active') 
        });
        
        $('.my-com-anchor').click(function (e){
            e.preventDefault()
            $('#my-com').addClass('active')
        })

        $('.descripshen').click(function (e){
            e.preventDefault()
            $('#pre-title').addClass('active')
        })

        $('.make-sale').click(function (e){
            e.preventDefault()
            $('#form-target').addClass('active')
        })
        $('.button-close').click(function (e){
            e.preventDefault()
            $('#pre-title').removeClass('active')
        })
        $('.cost').on('click', function() {
            $('html,body').animate({scrollTop:$('.background-form').offset().top + 200 +"px"},{duration:1E3});
          });
          $('.form-panel').submit(function(ev) {
            ev.preventDefault(); // to stop the form from submitting
            /* Validations go here */
            $('#form-target').removeClass('active')
        });
}