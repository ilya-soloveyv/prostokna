if ($('#wiki_catalog').length) {

    function wiki_catalog_num () {
        $('#wiki_catalog ul.catalog_list li').each(function(i, v){
            let num = i+1;
                num = (String(num).length == 1) ? '0'+num : num;
            $(this).find('.num').text(num);
        })
    }

    wiki_catalog_num()

    $('#wiki_catalog a.load').click(function(){
        $.ajax({
            url: "/wiki/get"
        }).done(function(html) {
            $('#wiki_catalog ul.catalog_list').append(html)
            wiki_catalog_num()
        });
        return false;
    })

    $('#wiki_catalog .hamburger').click(function(){
        if ($(this).hasClass('is-active')) {
            $('#wiki_catalog_modal').modal('hide')
            // $(this)
            // $('#wiki_catalog .sidebar').removeClass('open')
            
            // $('html, body').css({overflow: 'auto'})
        } else {
            $('#wiki_catalog_modal').modal()
            // $(this).addClass('is-active')
            // $('#wiki_catalog .sidebar').addClass('open')
            // $('#wiki_catalog ul').addClass('disabled')
            // $('html, body').css({overflow: 'hidden'})
        } 
    })

    $('#wiki_catalog_modal').on('show.bs.modal', function (event) {
        $('.modal-backdrop').css({top: 80+'px'})
        $('body').addClass('modal-backdrop-wiki').css({background: '#353535'})
        // $('#wiki_catalog .hamburger').addClass('is-active')
        $('#wiki_catalog ul').addClass('disabled')
        $('#wiki_catalog a.load').addClass('disabled')
        setTimeout("$('#wiki_catalog .hamburger').addClass('is-active')", 100)
    }).on('shown.bs.modal', function (event) {
        $('html, body').css({overflow: "hidden", position: "fixed"})
        $('.modal-backdrop').css({"z-index":97})
    }).on('hide.bs.modal', function (event) {
        $('html, body').css({overflow: "auto", position: "static"})
        $('body').removeClass('modal-backdrop-wiki').css({background: '#FFF'})
        // $('#wiki_catalog .hamburger').removeClass('is-active')
        $('#wiki_catalog ul').removeClass('disabled')
        $('#wiki_catalog a.load').removeClass('disabled')
        setTimeout("$('#wiki_catalog .hamburger').removeClass('is-active')", 100)
    })

    $('#wiki_catalog_modal ul li a').mouseenter(function(){
        $('#wiki_catalog_modal ul li a').not(this).css('opacity', 0.5);
    }).mouseleave(function(){
        $('#wiki_catalog_modal ul li a').css('opacity', 1);
    })



}