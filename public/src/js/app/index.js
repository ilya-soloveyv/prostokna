const clientWidth = () => document.body.clientWidth

// const indexHeaderToggle = () => {
//     const sections = document.querySelector('#fullpage_welcome').childElementCount
//     console.log(sections);
// }

// indexHeaderToggle()

const upload = () => {
    var dropZone = $('.drop-wrap');

	$('[type="file"]').focus(function() {
		$('.drop-wrap label').addClass('focus');
	})
	.focusout(function() {
		$('.drop-wrap label').removeClass('focus');
	});


	dropZone.on('drag dragstart dragend dragover dragenter dragleave drop', function(){
		return false;
	});

	dropZone.on('dragover dragenter', function() {
		dropZone.addClass('dragover');
	});

	dropZone.on('dragleave', function(e) {
		let dx = e.pageX - dropZone.offset().left;
		let dy = e.pageY - dropZone.offset().top;
		if ((dx < 0) || (dx > dropZone.width()) || (dy < 0) || (dy > dropZone.height())) {
			dropZone.removeClass('dragover');
		}
	});

	dropZone.on('drop', function(e) {
		dropZone.removeClass('dragover');
        let files = e.originalEvent.dataTransfer.files;
        
        console.log(files)

		// sendFiles(files);
	});

	$('[type="file"]').change(function() {
        let files = this.files
        
        console.log(files)
		// sendFiles(files);
	});


	function sendFiles(files) {
		let maxFileSize = 5242880;
		let Data = new FormData();
		$(files).each(function(index, file) {
			if ((file.size <= maxFileSize) && ((file.type == 'image/png') || (file.type == 'image/jpeg'))) {
				Data.append('images[]', file);
			}
		});

		$.ajax({
			url: dropZone.attr('action'),
			type: dropZone.attr('method'),
			data: Data,
			contentType: false,
			processData: false,
			success: function(data) {
				alert ('Файлы были успешно загружены!');
			}
		});
	}
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

if (clientWidth() > 600) {
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
}

if (window.FileReader) { 
    //var drop; 
    addEventHandler(window, 'load', function() {
        // const status = document.querySelector('.drop-status')
        const drop = document.querySelector('.drop')
        // const list = document.querySelector('.drop-list')
  
        function cancel(e) {
            if (e.preventDefault) e.preventDefault()

            return false
        }
  
        // Tells the browser that we *can* drop on this target
        addEventHandler(drop, 'dragover', cancel)
        addEventHandler(drop, 'dragenter', cancel)
        addEventHandler(drop, 'drop', function (e) {
            e = e || window.event // get window.event if e argument missing (in IE)   
    
            if (e.preventDefault) e.preventDefault() // stops the browser from redirecting off to the image.
    
            var dt = e.dataTransfer
            var files = dt.files

            for (var i=0; i<files.length; i++) {
                var file = files[i]
                var reader = new FileReader()
    
                //attach event handlers here...
                reader.readAsDataURL(file)
                addEventHandler(reader, 'loadend', function(e, file) {
                    let bin = this.result

                    // console.log(bin)
                    // console.log(file)
    
                    showFiles(file)
    
                }.bindToEventHandler(file))
            }
            return false
        })
  
        Function.prototype.bindToEventHandler = function bindToEventHandler() {
            var handler = this
            var boundParameters = Array.prototype.slice.call(arguments)
            //create closure
            return function(e) {
                e = e || window.event // get window.event if e argument missing (in IE)   
                boundParameters.unshift(e)
                handler.apply(this, boundParameters)
            }
        }
    })
} else { 
    document.getElementsByClassName('status')[0].innerHTML = 'Ваш браузер не поддерживает HTML5 FileReader.';
}



function addEventHandler(obj, evt, handler) {
    if(obj.addEventListener) {
        // W3C method
        obj.addEventListener(evt, handler, false);
    } else if(obj.attachEvent) {
        // IE method.
        obj.attachEvent('on'+evt, handler);
    } else {
        // Old school method.
        obj['on'+evt] = handler;
    }
}