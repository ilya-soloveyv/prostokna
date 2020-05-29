const clientWidth = () => document.body.clientWidth

function fullpage_welcome_color(i) {
    let index = i.index;
    if (index == 0 || index == 1 || index == 2) {
        var fullpage_color_class = "white";
    } else {
        var fullpage_color_class = "black";
    }
    $("#fullpage_nav").removeClass("white").removeClass("black").addClass(fullpage_color_class);
}

if (clientWidth() > 600) {
    $('#fullpage_welcome').fullpage({
        licenseKey: '095A4D35-EC934AC7-BFAB6609-F703CCA0',
    
        //Navigation
        anchors: ['s1','s2','s3','s4','s5','s6','s7','s8','s9'],
        // slidesNavigation: true,
    
        //Scrolling
        scrollingSpeed: 700,
        normalScrollElements: '#top, #fullpage_nav, #map, .pop_choice, .s2-back-card, .s1-items, #compareModal',
    
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
}