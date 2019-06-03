$("#fullpage_welcome .section.s3 .l .play .button").on("click", function (){
    $("#video_vimeo").html('<iframe src="https://player.vimeo.com/video/72915044?autoplay=1" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>')
    $("#modal_video").modal().on('hidden.bs.modal', function (e) {
        $("#video_vimeo").html("")
    })
})