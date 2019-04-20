if ($("#gallery").length) {
    $(document).ready(function(){
        resizeGalleryListItemBlock()
    })
    function resizeGalleryListItemBlock() {
        var width = $('#gallery .list li').width()
        $('#gallery .list li').height(width)
    }
    $(window).resize(function(){
        resizeGalleryListItemBlock()
    })
}
