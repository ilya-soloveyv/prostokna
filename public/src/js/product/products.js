$(document).on("click", ".productsMenu__brands__brand a", function () {
    $('.productsMenu__brands__brand').removeClass('active')
    $(this).parent().addClass('active')
    var index = $(this).parent().index()
    $('.productsMenu__products__list').removeClass('active')
    $('.productsMenu__products__list').eq(index).addClass('active')
    return false
})