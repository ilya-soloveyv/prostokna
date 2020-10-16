import '@scss/index/s3.scss';

if (document.querySelector('.layout-index')) {
  $('#s3-modal').on('shown.bs.modal', function () {
    let modal = $(this);
    let videoUrl = modal.find('iframe').data('src');

    modal.find('iframe').attr('src', videoUrl);
  });

  $('#s3-modal').on('hidden.bs.modal', function () {
    let modal = $(this);

    modal.find('iframe').attr('src', '');
  });
}
