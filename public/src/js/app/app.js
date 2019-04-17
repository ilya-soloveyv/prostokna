// $('document').ready(function () {
//     var trigger = $('#hamburger'),
//         topmenu = $("#top .l .menu"),
//         isClosed = false;
//     trigger.click(function () {
//         burgerTime();
//     });
//     function burgerTime() {
//         if (isClosed == true) {
//             trigger.removeClass('is-open');
//             trigger.addClass('is-closed');
//             topmenu.removeClass('opened');
//             isClosed = false;
//         } else {
//             trigger.removeClass('is-closed');
//             trigger.addClass('is-open');
//             topmenu.addClass('opened');
//             isClosed = true;
//         }
//     }
// });

$(document).on("click", "#top .hamburger", function () {
    topmenu = $("#top .l .menu")
    if (!$(this).hasClass('is-active')) {
        $(this).addClass('is-active')
        topmenu.addClass('opened')
    } else {
        $(this).removeClass('is-active')
        topmenu.removeClass('opened')
    }
})
$(document).on('mouseenter', '#top .l .menu', function(){
    $("#top .hamburger").addClass('is-active')
    $(this).addClass('opened')
}).on('mouseleave', '#top .l .menu', function(){
    $("#top .hamburger").removeClass('is-active')
    $(this).removeClass('opened')
});


$(document).on('mouseenter', '#fullpage_nav ul', function(){
    if ($(window).width() > 1200) {
        $(this).addClass('open')
    }    
}).on('mouseleave', '#fullpage_nav ul', function(){
    if ($(window).width() > 1200) {
        $(this).removeClass('open')
    }    
    
});

// $("#zay_modal").modal()
$("#zay_modal input[name=tel]").inputmask('+7 (999) 999-99-99')

$("#zay_form").submit(function () {
    var name = $(this).find('input[name="name"]');
    name.removeClass('is-invalid')
    var tel = $(this).find('input[name="tel"]');
    tel.removeClass('is-invalid')
    var from = $(this).find('select[name="from"]');
    var to = $(this).find('select[name="to"]');

    var data = {}
        data.name = name.val()
        data.tel = tel.val()
        data.from = from.val()
        data.to = to.val()
    if (data.name.length == 0) {
        name.addClass('is-invalid')
        return false
    }
    if (data.tel.length == 0) {
        tel.addClass('is-invalid')
        return false
    }

    $.ajax({
        url: "/send",
        type: "POST",
        data: data
    }).done(function() {
        
    });
    
    $("#zay_modal").modal('hide')
    $("#thanks_modal").modal()
    return false;
})