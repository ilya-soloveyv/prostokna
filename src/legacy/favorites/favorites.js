import '@scss/favorites/favorites.scss';

if ($('#favorites').length) {
  countRow('favorites-card-item');
  setWindowPadding('favorites-card-item');
  //counting howmatch want row from grid
  function countRow(queryEl) {
    const elems = document.querySelectorAll('.' + queryEl);
    if (window.innerWidth > 1300) {
      const leng = Math.ceil(elems.length / 5);
      var tmplRow = '';
      for (let i = 0; i < leng; i++) {
        tmplRow += ' 400px';
      }
      $('.favorites-cards-container').css('grid-template-rows', `${tmplRow}`);
    }
    if (window.innerWidth > 1000 && window.innerWidth < 1300) {
      const leng = Math.ceil(elems.length / 4);
      let tmplRow = '';
      for (let i = 0; i < leng; i++) {
        tmplRow += ' 400px';
      }
      console.log(tmplRow);
      $('.favorites-cards-container').css('grid-template-rows', `${tmplRow}`);
    }
    if (window.innerWidth <= 1000 && window.innerWidth > 610) {
      const leng = Math.ceil(elems.length / 3);
      let tmplRow = '';
      for (let i = 0; i < leng; i++) {
        tmplRow += ' 480px';
      }
      $('.favorites-cards-container').css('grid-template-rows', `${tmplRow}`);
    }
    //&& window.innerWidth > 420
    if (window.innerWidth <= 610) {
      const leng = Math.ceil(elems.length / 2);
      let tmplRow = '';
      for (let i = 0; i < leng; i++) {
        tmplRow += ' 460px';
      }
      $('.favorites-cards-container').css('grid-template-rows', `${tmplRow}`);
    }

    if (window.innerWidth < 426) {
      const leng = Math.ceil(elems.length / 2);
      let tmplRow = '';
      for (let i = 0; i < leng; i++) {
        tmplRow += ' 350px';
      }
      $('.favorites-cards-container').css('grid-template-rows', `${tmplRow}`);
    }

    if (window.innerWidth < 350) {
      const leng = Math.ceil(elems.length / 2);
      let tmplRow = '';
      for (let i = 0; i < leng; i++) {
        tmplRow += ' 330px';
      }
      $('.favorites-cards-container').css('grid-template-rows', `${tmplRow}`);
    }
  }

  function setWindowPadding(els) {
    //&& window.innerWidth > 420
    if (window.innerWidth < 2000) {
      const elemts = document.querySelectorAll('.' + els);
      let vis = false;
      $('#favorites').click(function (e) {
        if ($('.favorites').css('padding-bottom', '500px') && !vis)
          $('.favorites').css('padding-bottom', '5rem');
        vis = false;
      });

      for (let i = 0; i < elemts.length; i++) {
        elemts[i].addEventListener('click', function () {
          vis = false;
          $('.favorites').css('padding-bottom', '5rem');
        });
      }
      const len = elemts.length;

      for (let i = 1; i <= 5; i++) {
        if (elemts[len - i])
          elemts[len - i].addEventListener('click', function () {
            vis = true;
            $('.favorites').css('padding-bottom', '500px');
          });
      }
      if (window.innerWidth < 1000)
        if (elemts.length % 3 === 0) {
          if (elemts[len - 1])
            elemts[len - 1].addEventListener('click', function () {
              vis = true;
              $('.favorites').css('padding-bottom', '500px');
            });
          if (elemts[len - 2])
            elemts[len - 2].addEventListener('click', function () {
              vis = true;
              $('.favorites').css('padding-bottom', '500px');
            });
          if (elemts[len - 3])
            elemts[len - 3].addEventListener('click', function () {
              vis = true;
              $('.favorites').css('padding-bottom', '500px');
            });
        } else {
          if (elemts[len - 1])
            elemts[len - 1].addEventListener('click', function () {
              vis = true;
              $('.favorites').css('padding-bottom', '500px');
            });
          if (elemts[len - 2])
            elemts[len - 2].addEventListener('click', function () {
              vis = true;
              $('.favorites').css('padding-bottom', '500px');
            });
        }
    }
  }

  $(function () {
    $('.look-all').click(function () {
      var get_id = this.id;
      var get_current = $('.favorites-cards-container .' + get_id);
      countRow(get_id);
      setWindowPadding(get_id);
      $('.favorites-card-item').not(get_current).hide();
      get_current.show();
      $('.look-all').css('display', 'none');
    });
  });

  $(function () {
    $('.tab-favorites a').click(function () {
      var get_id = this.id;
      var get_current = $('.favorites-cards-container .' + get_id);
      countRow(get_id);
      setWindowPadding(get_id);
      $('.favorites-card-item').not(get_current).hide();
      get_current.show();
      $('.look-all').css('display', 'initial');
    });
  });

  function addClicks() {
    $('.favorites-card-item').click(function (e) {
      const els = document.querySelectorAll('.favorites-card-item');
      for (let i = 0; i < els.length; i++) {
        if (els[i].classList.contains('active'))
          els[i].classList.remove('active');
      }
      if (e.target.className !== 'close' && e.target.className !== 'dots') {
        $(this).addClass('active');
      }
    });
  }
  addClicks();
  $(function () {
    $('.look-all').click(function () {
      var get_id = this.id;
      var get_current = $('.favorites-cards-container .' + get_id);
      $('.favorites-card-item').not(get_current).hide(500);
      get_current.show();
      $('.look-all').css('display', 'none');
    });
  });

  function close(e) {
    var div = $('.favorites-card-item');
    if (!div.is(e.target) && div.has(e.target).length === 0) {
      div.removeClass('active');
      div.children().css('height', 'auto');
    }
  }

  $(document).mouseup(function (e) {
    close(e);
  });
  $('.close').click(function (e) {
    const els = document.querySelectorAll('.favorites-card-item');
    for (let i = 0; i < els.length; i++) {
      if (els[i].classList.contains('active'))
        els[i].classList.remove('active');
    }
    $('.favorites-card-item').removeClass('active');
  });
}
