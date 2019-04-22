if ($("#gallery").length) {
    $(document).ready(function(){
        resizeGalleryListItemBlock()
    }).on("click", "#gallery .item .images ul li img", function () {
        var src = $(this).attr('src')
        $("#gallery .item .zoom img").attr('src', src)
    })
    function resizeGalleryListItemBlock() {
        var width = $('#gallery .list li').width()
        $('#gallery .list li').height(width)
    }
    $(window).resize(function(){
        resizeGalleryListItemBlock()
    })
}
