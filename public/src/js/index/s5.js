$(document).on('click', '#fullpage_welcome .section.s5 .empty .down .c .button a', function(){
    $('#fullpage_welcome .section.s5 .empty, #fullpage_welcome .section.s5 .sravnenie').toggle();
    return false;
}).on('click', '#fullpage_welcome .section.s5 .sravnenie table thead tr th .r .remove i', function(){
    $('#fullpage_welcome .section.s5 .empty, #fullpage_welcome .section.s5 .sravnenie').toggle();
    return false;
})

$(document).on('click', '#fullpage_welcome .section.s5 .sravnenie table thead tr th:first-child img', function(){
    $("#fullpage_welcome .section.s5 .sravnenie table thead tr th:first-child img").removeClass('active')
    $(this).addClass('active')
})
$(document).on('click', '#fullpage_welcome .section.s5 .sravnenie table tfoot tr th:first-child a.linkmore', function(){
    $(this).toggleClass('active')
    
    if ($(this).hasClass('active')) {
        $('#fullpage_welcome .section.s5 .sravnenie table tbody tr.basic').hide();
        $('#fullpage_welcome .section.s5 .sravnenie table tbody tr.more').show();
        if ($(window).width() > 768) {
            $('#fullpage_welcome .section.s5 .sravnenie table tbody tr.more.phone').hide();
        } else {

        }
    } else {
        $('#fullpage_welcome .section.s5 .sravnenie table tbody tr.basic').show();
        $('#fullpage_welcome .section.s5 .sravnenie table tbody tr.more').hide();
    }
    return false
}).on('click', '#fullpage_welcome .section.s5 .sravnenie table tfoot tr th a.linkoriginal', function(){
    $(this).toggleClass('active')
    return false
})