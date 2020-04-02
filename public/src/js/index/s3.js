// $("#fullpage_welcome .section.s3 .l .play .button").on("click", function (){
//     $('#fullpage_welcome .section.s3').addClass('goVideo')
//     $('#fullpage_welcome .section.s3 .hamburger').addClass('is-active')
//     $('#fullpage_welcome .section.s3 .video .v').html('<iframe src="https://player.vimeo.com/video/72915044?autoplay=1" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>')
//     // $("#video_vimeo").html('<iframe src="https://player.vimeo.com/video/72915044?autoplay=1" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>')
//     // $("#modal_video").modal().on('hidden.bs.modal', function (e) {
//     //     $("#video_vimeo").html("")
//     // })
// })
// $("#fullpage_welcome .section.s3 .l .video .hamburger").on("click", function () {
//     $('#fullpage_welcome .section.s3').removeClass('goVideo')
//     $('#fullpage_welcome .section.s3 .hamburger').removeClass('is-active')
//     $('#fullpage_welcome .section.s3 .video .v').html("")
// })

$('#s3-modal').on('shown.bs.modal', function () {
    let modal = $(this)
    let videoUrl = modal.find('iframe').data('src')
    
    modal.find('iframe').attr('src', videoUrl)
})

$('#s3-modal').on('hidden.bs.modal', function () {
    let modal = $(this)

    modal.find('iframe').attr('src', '')
})