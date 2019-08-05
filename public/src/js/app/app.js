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

$(document).on("click", "#toggleBasicMenu", function () {
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
$('#zay_modal').on('show.bs.modal', function (e) {
    var classmodal = $(e.relatedTarget).attr('data-class')
    $('#zay_modal').addClass(classmodal)
}).on('hidden.bs.modal', function (e) {
    $('#zay_modal').removeClass('zay_modal_black').removeClass('zay_modal_white')
})

$(".form_contact input[name=tel]").inputmask('+7 (999) 999-99-99')

$(".form_contact").submit(function (event) {
    event.preventDefault()

    $(this).find('input[name="name"]').removeClass('is-invalid')
    $(this).find('input[name="tel"]').removeClass('is-invalid')

    var name = $(this).find('input[name="name"]').val()
    if (name.length == 0) {
        $(this).find('input[name="name"]').addClass('is-invalid')
        return false
    }
    var tel = $(this).find('input[name="tel"]').val()
    if (tel.length == 0) {
        $(this).find('input[name="tel"]').addClass('is-invalid')
        return false
    }

    yaCounter21714754.reachGoal('zvonok');

    $("#zay_modal").modal('hide')
    $("#thanks_modal").modal()            


    var form = new FormData()

    form.append('name', $(this).find('input[name="name"]').val())
    form.append('tel', $(this).find('input[name="tel"]').val())
    form.append('email', $(this).find('input[name="email"]').val())
    form.append('from', $(this).find('input[name="from"]').val())
    form.append('to', $(this).find('input[name="to"]').val())
    form.append('subject', $(this).find('input[name="subject"]').val())
    form.append('message', $(this).find('input[name="message"]').val())

    if ($(this).find('input[type=file]').length) {
        var files = $(this).find('input[type=file]')[0].files
        for (var i = 0; i < files.length; i++) {
            form.append('file[]', files[i])
        }
    }

    axios.post('/send', form, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then( (response) => {
        if (response.data.error) {

        }
    })


    return false;
})



    // var fileCatcher = document.getElementById('file-catcher')
    // var fileInput = document.getElementById('file-input')
    // var fileListDisplay = document.getElementById('file-list-display')
  
    // var fileList = []
    // var renderFileList, sendFile
  
    // fileInput.addEventListener('change', function (evnt) {
    //     fileList = []
    //     for (var i = 0; i < fileInput.files.length; i++) {
    //         fileList.push(fileInput.files[i])
    //     }
    //     renderFileList()
    // })
  
    // renderFileList = function () {
    //     fileListDisplay.innerHTML = ''
    //     var length = fileList.length
    //     fileList.forEach(function (file, index) {
    //         var temp = index
    //         var z = (length > (temp+1)) ? ', ' : ''
    //         var fileDisplayEl = document.createElement('span')
    //         fileDisplayEl.innerHTML = file.name + z
    //         fileListDisplay.appendChild(fileDisplayEl)
    //     })
    // }

    // fileCatcher.addEventListener('click', function (event) {
    //     event.preventDefault()

    //     var formData = new FormData()
    //     fileList.forEach(function (file, index) {
    //         formData.append('file[]', fileList[index])
    //     })
    //     formData.set('file2', fileList)

    //     console.log(formData)

    //     // sendFile()
    //     // fileList.forEach(function (file) {
            
    //     // })
    // })
  
    // sendFile = function (file) {
    //     // console.log(fileList)
    //     // var formData = new FormData()

    //     // fileList.forEach(function (file, index) {
    //     //     formData.append('file[]', fileList[index])
    //     // })

    //     // console.log(formData)
        
    //     // var request = new XMLHttpRequest();
    
    //     // formData.set('file', file);
    //     // request.open("POST", '/send');
    //     // request.send(formData);
    // };









































var modal_gallery_owl = $("#modal_gallery_owl .owl-carousel")
modal_gallery_owl.on('changed.owl.carousel', function(event) {

})
modal_gallery_owl.on('initialized.owl.carousel', function(event) {
    
})
modal_gallery_owl.owlCarousel({
    items: 1,
    nav: true,
    dots: true
})
$('#modal_gallery_owl').on('show.bs.modal', function (event) {

}).on('shown.bs.modal', function (event) {
    $('html, body').css({overflow: "hidden"})
    $('body').addClass('modal-backdrop-wiki').css({background: '#353535'})
    $("#product .toggle_submenu .bg .icons .hamburger").addClass('is-active')
    $("#modal_gallery_owl").find('.hamburger').addClass('is-active')
    modal_gallery_owl.addClass('open')
}).on('hide.bs.modal', function (event) {
    $('html, body').css({overflow: "auto"})
    $('body').removeClass('modal-backdrop-wiki').css({background: '#FFF'})
    $("#product .toggle_submenu .bg .icons .hamburger").removeClass('is-active')
    $("#modal_gallery_owl").find('.hamburger').removeClass('is-active')
    modal_gallery_owl.removeClass('open')
    $('#modal_gallery_owl .owl-item').each(function(i, el){
        modal_gallery_owl.trigger('remove.owl.carousel', i)
    })
})
//  *** *** *** *** *** *** *** *** *** *** *** *** //
