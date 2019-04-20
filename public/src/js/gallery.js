if ($("#gallery").length) {
    $(document).ready(function(){
        resizeGalleryListItemBlock()
    })
    function resizeGalleryListItemBlock() {
        console.log(1)
        var width = $('#gallery .list li').width()
        $('#gallery .list li').height(width)
    }
    $(window).resize(function(){
        resizeGalleryListItemBlock()
    })
}
