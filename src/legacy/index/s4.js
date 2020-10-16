import Dropzone from '../../vendor/dropzone';

import '@scss/index/s4.scss';

if (document.querySelector('.layout-index')) {
  if (document.body.clientWidth < 900) {
    let items = document.querySelectorAll('.s4-list li');

    items[0].classList.add('isActive');

    items.forEach((item) => {
      item.addEventListener('click', (event) => {
        items.forEach((el) => el.classList.remove('isActive'));

        event.currentTarget.classList.add('isActive');
      });
    });
  }

  // const myAwesomeDropzone = Dropzone.options.myAwesomeDropzone

  Dropzone.options.myAwesomeDropzone = {
    init: function (file) {
      this.on('addedfile', function (file) {
        let dropWrap = document.querySelector('.drop-wrap');
        let drop = document.querySelector('.drop');

        dropWrap.classList.add('-uploaded');
        drop.style.display = 'none';
      });
      // console.log('file: ', file)
    },
    // addedfile: function(file) {
    //     console.log('file added: ', file)
    // }
    // addedfile: function(file) {
    //     file.previewElement = Dropzone.createElement(this.options.previewTemplate);
    //     // Now attach this new element some where in your page
    //   },
  };

  // Dropzone.myAwesomeDropzone.on("addedfile", function(file, xhr, formData) {
  //     // Will send the filesize along with the file as POST data.
  //     console.log('file: ', file)
  //   });
}
