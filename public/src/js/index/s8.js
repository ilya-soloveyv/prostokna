if ($('#fullpage_welcome').length) {
    // $('#fullpage_welcome .s8 input[name=tel]').inputmask("+7 (999) 999-99-99")
    select_s8(0)
    $(document).on("click", "#fullpage_welcome .s8 .l ul li", function () {
        select_s8($(this).index())
    })
}

function select_s8 (index) {
    var subject = $("#fullpage_welcome .s8 .l ul li").eq(index).attr('data-subject')
    $("#fullpage_welcome .s8 form").find('input[name=subject]').val(subject)
    $('#fullpage_welcome .s8 .l ul li').removeClass('active')
    $('#fullpage_welcome .s8 .l ul li').eq(index).addClass('active')
}
    