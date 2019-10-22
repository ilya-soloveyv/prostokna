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

    // Цель Метрика
    var metrika = $(this).find('input[name=metrika]').val()
    if (metrika) {
        yaCounter21714754.reachGoal(metrika)
    }
    

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
    form.append('page_path', $(this).find('input[name="page_path"]').val())

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







































// NEW MODAL WINDOW

if ($('#form_request').length) {

	var fileListArray = []

	Inputmask({ "mask": "+7 (999) 999-99-99" }).mask("#form_request input[name=phone]")

	// Active placeholder script
	$('.modal-block_form input').change(function () {
		if ($(this).val().length) {
			$(this).siblings('label').css('transform', 'translateY(-33px)');
		}
	});


	// Тестовое открытие
	// $("#top .search a.mbutton").on("click", function () {
	// 	$('#form_request').css({display: 'flex'})
	// 	return false
	// })

	let close = $('#form_request .modal-close');
	let cloverlay = $('#form_request .form-overlay');
	// Закрытие POP-UP
	close.on('click', function (){
		$('#form_request').fadeOut(300);
	});
	$('.modal-result').on('click', function (){
		$('#form_request').fadeOut(300);
	});
	cloverlay.on('click', function (){
		$('#form_request').fadeOut(300);
	});
	$('.modal-result').on('click', function (){
		$('#form_request').fadeOut(300);
	});


	// Переход к списку
	$('.modal-block_load-btn').on('click', function(){
		$('.modal-block_load').fadeOut(100);
		setTimeout(() => {
			$('.modal-block_checkload').fadeIn(300);
		}, 100);
		
	});

	// Переход добавить еще

	$('.modal-block_checkload-more').on('click', function () {
		$('.modal-block_checkload').fadeOut(100);
		setTimeout(() => {
			$('.modal-block_load').fadeIn(300);
		}, 100);

	});

	// Переход к форме
	$('.modal-block_checkload-btn').on('click', function () {
		$('.modal-block_checkload').fadeOut(100);
		setTimeout(() => {
			$('.modal-block_form').fadeIn(300);
		}, 100);
	});

	// Переход от формы к списку файлов
	$('.modal-block_form-back').on('click', function () {
		$('.modal-block_form').fadeOut(100);
		setTimeout(() => {
			$('.modal-block_checkload').fadeIn(300);
		}, 100);
	});

	// Переход к прогрес бару
	$('.modal-block_form-submit').on('click', function (e) {
		// console.log(fileListArray)

		var bodyFormData = new FormData()

    bodyFormData.set('title', 'Илья Тест')
		// for (var i = 0; i < fileListArray.length; i++) {
		// 	sendData.append('file[]', fileListArray[i])
		// }

		console.log(bodyFormData)

		axios({
			method: 'post',
			url: '/send2',
			data: bodyFormData,
			config: { headers: {'Content-Type': 'multipart/form-data' }}
			})
			.then(function (response) {
					//handle success
					console.log(response);
			})
			.catch(function (response) {
					//handle error
					console.log(response);
			});
    // axios.post('/send2', sendData, {
    //     headers: {
    //         'Content-Type': 'multipart/form-data'
    //     }
    // }).then( (response) => {
    //     if (response.data.error) {

    //     }
    // })

		e.preventDefault()
		return false

		$('.modal-main').fadeOut(100);
		setTimeout(() => {
			$('.modal-progressbar').fadeIn(300);
		}, 100);
		// Течение прогрес бара
		setTimeout(() => {
			let count = 0;

			let intervalId = setInterval(() => {
				count++;
				$('.modal-progressbar .count span').html(count);
				if (count > 99) {
					clearInterval(intervalId);
					setTimeout(() => {
						$('.modal-progressbar').fadeOut(100);
						$('.modal-result').fadeIn(300);
					}, 200);					
				}
			}, 20);
			$('.modal-progressbar .line').addClass('active');
		}, 300);
		
	});

	// Загрузка файлов
	var output = [],
			loadList = document.querySelector('.modal-block_checkload-list');
	var dropZone = document.querySelector('.modal-block_load');
	var reader;
	var progress = document.querySelector('.percent');
	// Загрузка файлов через кнопку		
	function handleFileSelectClick(evt) {
		let files = evt.target.files; // Сохраняем в переменую масив файлов
		fileListArray.push(files)
		console.log(files)

		progress.style.width = '0%';
		progress.textContent = '0%';

		reader = new FileReader();
		reader.onprogress = updateProgress;
		reader.onloadstart = function (e) {
			$('.progress_bar').addClass('loading');
		};

		reader.onload = function (e) {
			// Ensure that the progress bar displays 100% at the end.
			progress.style.width = '100%';
			progress.textContent = '100%';
			setTimeout("$('.progress_bar').removeClass('loading');", 2000);
		}

		reader.readAsBinaryString(evt.target.files[0]);
		// Перебираем все файлы которые загружают		
		for (var i = 0, f; f = files[i]; i++) {
			let itemValue = f.name;
			
			// Пушив в масив елементы с названиями файлов
			output.push(['<li class="modal-block_checkload-item">', truncate(itemValue), '<span>&times</span></li>'].join(''));			
		}
		// Вставляем масив в список
		loadList.innerHTML = output.join('');

		addScroll(output.length);
		if (output.length > 0) {
			$('.modal-block_checkload-btn').addClass('active');
		}

		$('.modal-block_checkload-item span').on('click', function () {
			let itemIdx = $(this).closest('.modal-block_checkload-item').index();
			output.splice(itemIdx, 1);
			
			$(this).closest('.modal-block_checkload-item').remove();
			addScroll($('.modal-block_checkload-item').length);


			if ($('.modal-block_checkload-item').length == 0) {
				$('.modal-block_checkload-btn').removeClass('active');
				$('.modal-block_checkload').fadeOut(100);
				setTimeout(() => {
					$('.modal-block_load').fadeIn(300);
				}, 100);
			}	
		})
	}

	// Загрузка файлов по через Drag and Drop

	function handleFileSelectDrop(evt) {
		
		evt.stopPropagation();
		evt.preventDefault();

		let files = evt.dataTransfer.files; // Сохраняем в переменую масив файлов		
		// Сбрасываем каждый раз прогрес бар
		progress.style.width = '0%';
		progress.textContent = '0%';
		// Создаем новый обьект
		reader = new FileReader();
		reader.onprogress = updateProgress;
		// Начинаеться загрузка, показываем прогрес бар
		reader.onloadstart = function (e) {
			$('.progress_bar').addClass('loading');
		};

		reader.onload = function (e) {
			// Ensure that the progress bar displays 100% at the end.
			progress.style.width = '100%';
			progress.textContent = '100%';
			// Убираем полосу прогрес бара после загрузки
			setTimeout("$('.progress_bar').removeClass('loading');", 2000);
		}

		reader.readAsBinaryString(evt.dataTransfer.files[0]);
		// Перебираем все файлы которые загружают		
		for (var i = 0, f; f = files[i]; i++) {
			let itemValue = f.name;
			// Пушив в масив елементы с названиями файлов
			output.push(['<li class="modal-block_checkload-item">', truncate(itemValue), '<span>&times</span></li>'].join(''));			
		}
		// Вставляем масив в список
		loadList.innerHTML = output.join('');

		addScroll(output.length);
		if (output.length > 0) {
			$('.modal-block_checkload-btn').addClass('active');
		}
		$('.modal-block_load-img svg path').css({'fill': '#fff'});
		$('.modal-block_load-img').css({'transform': 'scale(1)'});

		$('.modal-block_load').fadeOut(100);
		setTimeout(() => {
			$('.modal-block_checkload').fadeIn(300);
		}, 100);

		$('.modal-block_checkload-item span').on('click', function () {
			let itemIdx = $(this).closest('.modal-block_checkload-item').index();
			output.splice(itemIdx, 1);

			$(this).closest('.modal-block_checkload-item').remove();
			addScroll($('.modal-block_checkload-item').length);
			if ($('.modal-block_checkload-item').length == 0) {
				$('.modal-block_checkload-btn').removeClass('active');
				$('.modal-block_checkload').fadeOut(100);
				setTimeout(() => {
					$('.modal-block_load').fadeIn(300);
				}, 100);
			}
		})
	}

	function handleDragOver(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'copy';

		$('.modal-block_load-img svg path').css('fill', '#9b47e5');
		$('.modal-block_load-img').css({ 'transform': 'scale(1.2)' });
	}
	function handleDragLeave(evt) {
		evt.stopPropagation();
		evt.preventDefault();

		$('.modal-block_load-img svg path').css('fill', '#fff');
		$('.modal-block_load-img').css({ 'transform': 'scale(1)' });
	}

	function updateProgress(evt) {
		// evt is an ProgressEvent.
		if (evt.lengthComputable) {
			var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
			// Increase the progress bar length.
			if (percentLoaded < 100) {
				progress.style.width = percentLoaded + '%';
				progress.textContent = percentLoaded + '%';
			}
		}
	}

	function createProgressbar () {
		
	}

	// Следим за изменением инпута
	document.getElementById('load-input').addEventListener('change', handleFileSelectClick, false);

	dropZone.addEventListener('dragover', handleDragOver, false);
	dropZone.addEventListener('dragleave', handleDragLeave, false);
	dropZone.addEventListener('drop', handleFileSelectDrop, false);


	
	// Обрезаем лишние буквы ставим ...
	function truncate(value) {
		if (value.length > 10) {
			return value.substring(0, 10) + '...';
		} else {
			return value;
		}
	}

	// Если список имеет больше 9 елементов, делаем скролл блока
	function addScroll(value) {
		if (value > 9) {
			loadList.style.height = 125 + 'px';
			loadList.style.overflow = 'auto';
		} else {
			loadList.style.height = 'auto';
			loadList.style.overflow = 'visible';
		}
	}	
}