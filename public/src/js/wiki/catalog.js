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
            $(this).removeClass('is-active')
            $('#wiki_catalog .sidebar').removeClass('open')
            $('#wiki_catalog ul').removeClass('disabled')
            // $('html, body').css({overflow: 'auto'})
        } else {
            $(this).addClass('is-active')
            $('#wiki_catalog .sidebar').addClass('open')
            $('#wiki_catalog ul').addClass('disabled')
            // $('html, body').css({overflow: 'hidden'})
        } 
    })

    $('#wiki_catalog .sidebar ul li a').mouseenter(function(){
        $('#wiki_catalog .sidebar ul li a').not(this).css('opacity', 0.5);
    }).mouseleave(function(){
        $('#wiki_catalog .sidebar ul li a').css('opacity', 1);
    })


}