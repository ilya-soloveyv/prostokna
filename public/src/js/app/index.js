const clientWidth = () => document.body.clientWidth

const toggleImg = (target) => {
    if (!target) return

    const activeLinkData = target.dataset
    let imgUrl

    if (clientWidth() < 575) {
        imgUrl = `url(${activeLinkData.img})`
    } else {
        imgUrl = `url(${activeLinkData.img})`
    }

    $(".s1 .bg-image").stop().animate({opacity: 0},300, function() {
        $(this).css({'background-image': imgUrl}).animate({opacity: 0.5},{duration:300})
    })
}

const s1CreateEventsForLinks = () => {
    let links = document.querySelectorAll('.s1-items a')

    if (!links.length) return

    links.forEach(link => {
        link.addEventListener('mouseover', event => {
            let target = event.currentTarget

            if (target.classList.contains('isActive')) return

            links.forEach(el => el.classList.remove('isActive'))

            target.classList.add('isActive')
            
            toggleImg(target)
        })
    })
}

function fullpage_welcome_color(i) {
    let index = i.index;
    if (index == 0 || index == 1 || index == 2) {
        var fullpage_color_class = "white";
    } else {
        var fullpage_color_class = "black";
    }
    $("#fullpage_nav").removeClass("white").removeClass("black").addClass(fullpage_color_class);
}

$('#fullpage_welcome').fullpage({
    licenseKey: '095A4D35-EC934AC7-BFAB6609-F703CCA0',

    //Navigation
    anchors: ['s1','s2','s3','s4','s5','s6','s7','s8','s9'],
    // slidesNavigation: true,

    //Scrolling
    scrollingSpeed: 700,
    normalScrollElements: '#top, #fullpage_nav, #map, .pop_choice, .s2-back-card',
    scrollOverflow: true,
    scrollOverflowReset: true,
    scrollOverflowResetKey: '85F59DF5-C3C6429B-9D26694D-ED504778',

    onLeave: function (origin, destination, direction) {
        fullpage_welcome_color(destination);
        $("#fullpage_nav li").removeClass('active');
        $("#fullpage_nav li").eq(destination-1).addClass('active');
    },
    afterLoad: function (origin, destination, direction) {
        fullpage_welcome_color(destination);
    }
});

$("#fullpage_nav li").click(function(){
    var i = $(this).index();
    $.fn.fullpage.moveTo(i+1);
});

function indexShowImage(imgPath, target) {
    let imgUrl = `url(${imgPath})`;

    $(target).stop().animate({opacity: 0},200,function(){
        $(this).css({'background-image': imgUrl})
                   .animate({opacity: 1},{duration:200});
    });
}