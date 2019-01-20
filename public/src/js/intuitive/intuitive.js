if ($("#intuitive").length) {
    console.log('intuitive')
}

$(document).ready(function () {
    $('.choise-btn').click(function (e) { 
        e.preventDefault();
        $('.intuitive-bref').fadeOut(100);
        $('.intuitive-wrap').fadeIn(700);
    });
});