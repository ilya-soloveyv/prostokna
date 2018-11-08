if ($('#wiki_catalog').length) {

    function wiki_catalog_num () {
        $('#wiki_catalog ul li').each(function(i, v){
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
            $('#wiki_catalog ul').append(html)
            wiki_catalog_num()
        });
        return false;
    })


}