if ($('#favorites').length) {

        //window load 
    countRow('favorites-card-item')
    setWindowPadding('favorites-card-item')
        //counting howmatch want row from grid
    function countRow(queryEl){
        const elems = document.querySelectorAll('.' + queryEl)
        if(window.innerWidth > 1300){
            const leng = Math.ceil(elems.length / 5);
            let tmplRow = ''
            for(let i = 0; i < leng; i++){
                tmplRow += ' 400px';
            }
            $('.favorites-cards-container').css('grid-template-rows', `${tmplRow}`)
        }
        if(window.innerWidth > 1000 && window.innerWidth < 1300){
            const leng = Math.ceil(elems.length / 4);
            let tmplRow = ''
            for(let i = 0; i < leng; i++){
                tmplRow += ' 400px';
            }
            $('.favorites-cards-container').css('grid-template-rows', `${tmplRow}`)
        }
        if( window.innerWidth < 1000 && window.innerWidth > 610){
            const leng = Math.ceil(elems.length / 3);
            let tmplRow = ''
            for(let i = 0; i < leng; i++){
                tmplRow += ' 400px';
            }
            $('.favorites-cards-container').css('grid-template-rows', `${tmplRow}`)
        }
    
        if( window.innerWidth < 610 && window.innerWidth > 420){
            const leng = Math.ceil(elems.length / 2);
            let tmplRow = ''
            for(let i = 0; i < leng; i++){
                tmplRow += ' 400px';
            }
            $('.favorites-cards-container').css('grid-template-rows', `${tmplRow}`)
        }
    }

    //tabs generator
    $(function () {
        $('.look-all').click(function () {
            var get_id = this.id;
            countRow(get_id)
            setWindowPadding(get_id)
            var get_current = $('.favorites-cards-container .' + get_id);
            $('.favorites-card-item').not(get_current).hide(500);
            get_current.show();
            $('.look-all').css('display', 'none')
        });
    });

    $(function () {
        $('.tab-favorites a').click(function () {
            var get_id = this.id;
            countRow(get_id)
            setWindowPadding(get_id)
            var get_current = $('.favorites-cards-container .' + get_id);
            $('.favorites-card-item').not(get_current).hide(500);
            get_current.show();
            $('.look-all').css('display', 'initial')
        });
    });

  
function setWindowPadding(els){
    if(window.innerWidth < 1000 && window.innerWidth > 420){

        const elemts = document.querySelectorAll('.' + els)
        let vis = false;
        $('#favorites').click(function(e){
        if($('.favorites').css('padding-bottom', '500px') && !vis) $('.favorites').css('padding-bottom', '5rem')
        vis = false;
    })

        for(let i= 0; i< elemts.length; i++){
            elemts[i].addEventListener('click', function(){
                vis = false;
                $('.favorites').css('padding-bottom', '5rem')
            })
        }
        const len = elemts.length;
        if(elemts.length % 3 === 0){
            
            elemts[len - 1].addEventListener('click', function(){
                vis = true;
                $('.favorites').css('padding-bottom', '500px')
            })
            elemts[len - 2].addEventListener('click', function(){
                vis = true;
                $('.favorites').css('padding-bottom', '500px')
            })
            elemts[len - 3].addEventListener('click', function(){
                vis = true;
                $('.favorites').css('padding-bottom', '500px')
            })
        } else {
            elemts[len - 1].addEventListener('click', function(){
                vis = true;
                $('.favorites').css('padding-bottom', '500px')
            })
            elemts[len - 2].addEventListener('click', function(){
                vis = true;
                $('.favorites').css('padding-bottom', '500px')
            })
        }
    }
}

   
}