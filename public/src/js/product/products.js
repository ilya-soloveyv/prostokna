$(document).on("click", ".productsMenu__brands__brand a", function () {
    $('.productsMenu__brands__brand').removeClass('active')
    $(this).parent().addClass('active')
    var index = $(this).parent().index()
    $('.productsMenu__products__list').removeClass('active')
    $('.productsMenu__products__list').eq(index).addClass('active')
    return false
})


$(document).on("click", ".brand_list_link", function () {
    $(this).parents('.list').find('.brand_list_item').removeClass('open')
    $(this).parents('.brand_list_item').addClass('open')
    return false
}).on("click", "#productMenu .list .item .title ul li", function () {
    $(this).addClass('active').siblings().removeClass('active')
    return false
}).on("click", "#productMenu .filter .category ul li a", function () {
    $(this).parent().addClass('active').siblings().removeClass('active')
    return false
})



var productsMenu = new Vue({
    el: '#productMenu',
    data: {
        mess: 'Hello Vue'
    },
    created: function () {
        
    },
    methods: {
        test: function () {

        },
    }
})