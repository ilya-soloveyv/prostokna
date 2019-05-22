if ($('#favorites').length) {


    // function done(){
    //     const card = document.querySelectorAll('.card-photo')
    //     for(let i = 0; i< card.length; i++){
    //         if(card[i].childNodes[0].clientHeight > 100){
    //             if(window.innerWidth <376)
    //             card[i].style.width = '40%';
    //             if(window.innerWidth < 426 && window.innerWidth > 376)
    //             card[i].style.width = '30%';
    //         } 
    //     }
    // }
    
    // document.addEventListener("DOMContentLoaded", function(){
    //     const time = setInterval(() => {
    //         done()
    //     })
    //     setTimeout(() => {
    //         clearInterval(time)
    //     }, 1500)
      
    // });
    
        //window load 
                        //     countRow('favorites-card-item')
                        //     setWindowPadding('favorites-card-item')
                        //         //counting howmatch want row from grid
                        //     function countRow(queryEl){
                        //         const elems = document.querySelectorAll('.' + queryEl)
                        //         if(window.innerWidth > 1300){
                        //             const leng = Math.ceil(elems.length / 5);
                        //             let tmplRow = ''
                        //             for(let i = 0; i < leng; i++){
                        //                 tmplRow += ' 400px';
                        //             }
                        //             $('.favorites-cards-container').css('grid-template-rows', `${tmplRow}`)
                        //         }
                        //         if(window.innerWidth > 1000 && window.innerWidth < 1300){
                        //             const leng = Math.ceil(elems.length / 4);
                        //             let tmplRow = ''
                        //             for(let i = 0; i < leng; i++){
                        //                 tmplRow += ' 400px';
                        //             }
                        //             $('.favorites-cards-container').css('grid-template-rows', `${tmplRow}`)
                        //         }
                        //         if( window.innerWidth < 1000 && window.innerWidth > 610){
                        //             const leng = Math.ceil(elems.length / 3);
                        //             let tmplRow = ''
                        //             for(let i = 0; i < leng; i++){
                        //                 tmplRow += ' 400px';
                        //             }
                        //             $('.favorites-cards-container').css('grid-template-rows', `${tmplRow}`)
                        //         }
                        //     //&& window.innerWidth > 420
                        //         if( window.innerWidth < 610 ){
                        //             const leng = Math.ceil(elems.length / 2);
                        //             let tmplRow = ''
                        //             for(let i = 0; i < leng; i++){
                        //                 tmplRow += ' 400px';
                        //             }
                        //             $('.favorites-cards-container').css('grid-template-rows', `${tmplRow}`)
                        //         }

                        //         if( window.innerWidth < 426 ){
                        //             const leng = Math.ceil(elems.length / 2);
                        //             let tmplRow = ''
                        //             for(let i = 0; i < leng; i++){
                        //                 tmplRow += ' 285px';
                        //             }
                        //             $('.favorites-cards-container').css('grid-template-rows', `${tmplRow}`)
                        //         }
                        //     }

                            //tabs generator
                            

                        
                        // function setWindowPadding(els){
                        //     //&& window.innerWidth > 420
                        //     if(window.innerWidth < 1000 ){

                        //         const elemts = document.querySelectorAll('.' + els)
                        //         let vis = false;
                        //         $('#favorites').click(function(e){
                        //         if($('.favorites').css('padding-bottom', '500px') && !vis) $('.favorites').css('padding-bottom', '5rem')
                        //         vis = false;
                        //     })

                        //         for(let i= 0; i< elemts.length; i++){
                        //             elemts[i].addEventListener('click', function(){
                        //                 vis = false;
                        //                 $('.favorites').css('padding-bottom', '5rem')
                        //             })
                        //         }
                        //         const len = elemts.length;
                        //         if(elemts.length % 3 === 0){
                        //             if(elemts[len - 1])
                        //             elemts[len - 1].addEventListener('click', function(){
                        //                 vis = true;
                        //                 $('.favorites').css('padding-bottom', '500px')
                        //             })
                        //             if(elemts[len - 2])
                        //             elemts[len - 2].addEventListener('click', function(){
                        //                 vis = true;
                        //                 $('.favorites').css('padding-bottom', '500px')
                        //             })
                        //             if(elemts[len - 3])
                        //             elemts[len - 3].addEventListener('click', function(){
                        //                 vis = true;
                        //                 $('.favorites').css('padding-bottom', '500px')
                        //             })
                        //         } else  {
                        //             if(elemts[len - 1])
                        //             elemts[len - 1].addEventListener('click', function(){
                        //                 vis = true;
                        //                 $('.favorites').css('padding-bottom', '500px')
                        //             })
                        //             if(elemts[len - 2])
                        //             elemts[len - 2].addEventListener('click', function(){
                        //                 vis = true;
                        //                 $('.favorites').css('padding-bottom', '500px')
                        //             })
                        //         }
                        //     }
//}
    let fetchData = [
        {name: 'montblanc', 
        type: 'windows', 
        title: 'bienge', 
        modal: '4242',
        modalOne: 'bienge', 
        modalName:'simple Modal',
        color: '#ad966a',
        img: '../../images/favorites/2.png', text:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt dolore nisi ea quibusdam iste a! Aspernatur, ducimus ipsum exercitationem voluptate totam sed sint culpa sit quibusdam aliquam ipsa, libero laudantium.'},
        {name: 'montblanc', 
        type: 'windows', 
        title: 'bienge', 
        modal: '4242',
        modalOne: 'bienge', 
        modalName:'simple Modal', 
        color: '#9f9e9d',
        img: '../../images/favorites/1.png', text:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt dolore nisi ea quibusdam iste a! Aspernatur, ducimus ipsum exercitationem voluptate totam sed sint culpa sit quibusdam aliquam ipsa,  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt dolore nisi ea quibusdam iste a! Aspernatur, ducimus ipsum exercitationem voluptate totam sed sint culpa sit quibusdam aliquam ipsa, libero laudantium.libero laudantium.'},
        {name: 'montblanc', 
        type: 'windows', 
        title: 'bienge', 
        modal: '4242',
        modalOne: 'bienge', 
        modalName:'simple Modal',
        color:'#887561', 
        img: '../../images/favorites/3.png', text:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt dolore nisi ea quibusdam iste a! Aspernatur, ducimus ipsum exercitationem voluptate totam sed sint culpa sit quibusdam aliquam ipsa, libero laudantium.'},
        {name: 'montblanc', 
        type: 'gloss', 
        title: 'bienge', 
        modal: '4242',
        modalOne: 'bienge', 
        modalName:'simple Modal', 
        color:'#c04b00',
        img: '../../images/favorites/5.png', text:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt dolore nisi ea quibusdam iste a! Aspernatur, ducimus ipsum exercitationem voluptate totam sed sint culpa sit quibusdam aliquam ipsa, libero laudantium.'},
        {name: 'montblanc', 
        type: 'gloss', 
        title: 'bienge', 
        modal: '4242',
        modalOne: 'bienge', 
        modalName:'simple Modal', 
        color: '#8da418',
        img: '../../images/favorites/4.png', text:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt dolore nisi ea quibusdam iste a! Aspernatur, ducimus ipsum exercitationem voluptate totam sed sint culpa sit quibusdam aliquam ipsa, libero laudantium.'},
        {name: 'montblanc', 
        type: 'windows', 
        title: 'bienge', 
        modal: '4242',
        modalOne: 'bienge', 
        modalName:'simple Modal',
        color: '#ad966a',
        img: '../../images/favorites/2.png', text:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt dolore nisi ea quibusdam iste a! Aspernatur, ducimus ipsum exercitationem voluptate totam sed sint culpa sit quibusdam aliquam ipsa, libero laudantium.'},
        {name: 'montblanc', 
        type: 'windows', 
        title: 'bienge', 
        modal: '4242',
        modalOne: 'bienge', 
        modalName:'simple Modal', 
        color: '#9f9e9d',
        img: '../../images/favorites/1.png', text:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt dolore nisi ea quibusdam iste a! Aspernatur, ducimus ipsum exercitationem voluptate totam sed sint culpa sit quibusdam aliquam ipsa,  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt dolore nisi ea quibusdam iste a! Aspernatur, ducimus ipsum exercitationem voluptate totam sed sint culpa sit quibusdam aliquam ipsa, libero laudantium.libero laudantium.'},
        {name: 'montblanc', 
        type: 'windows', 
        title: 'bienge', 
        modal: '4242',
        modalOne: 'bienge', 
        modalName:'simple Modal',
        color:'#887561', 
        img: '../../images/favorites/3.png', text:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt dolore nisi ea quibusdam iste a! Aspernatur, ducimus ipsum exercitationem voluptate totam sed sint culpa sit quibusdam aliquam ipsa, libero laudantium.'},
        {name: 'montblanc', 
        type: 'gloss', 
        title: 'bienge', 
        modal: '4242',
        modalOne: 'bienge', 
        modalName:'simple Modal', 
        color:'#c04b00',
        img: '../../images/favorites/5.png', text:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt dolore nisi ea quibusdam iste a! Aspernatur, ducimus ipsum exercitationem voluptate totam sed sint culpa sit quibusdam aliquam ipsa, libero laudantium.'},
        {name: 'montblanc', 
        type: 'gloss', 
        title: 'bienge', 
        modal: '4242',
        modalOne: 'bienge', 
        modalName:'simple Modal', 
        color: '#8da418',
        img: '../../images/favorites/4.png', text:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt dolore nisi ea quibusdam iste a! Aspernatur, ducimus ipsum exercitationem voluptate totam sed sint culpa sit quibusdam aliquam ipsa, libero laudantium.'},
        {name: 'montblanc', 
        type: 'windows', 
        title: 'bienge', 
        modal: '4242',
        modalOne: 'bienge', 
        modalName:'simple Modal',
        color: '#ad966a',
        img: '../../images/favorites/2.png', text:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt dolore nisi ea quibusdam iste a! Aspernatur, ducimus ipsum exercitationem voluptate totam sed sint culpa sit quibusdam aliquam ipsa, libero laudantium.'},
        {name: 'montblanc', 
        type: 'gloss', 
        title: 'bienge', 
        modal: '4242',
        modalOne: 'bienge', 
        modalName:'simple Modal', 
        color: '#8da418',
        img: '../../images/favorites/4.png', text:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt dolore nisi ea quibusdam iste a! Aspernatur, ducimus ipsum exercitationem voluptate totam sed sint culpa sit quibusdam aliquam ipsa, libero laudantium.'},
        {name: 'montblanc', 
        type: 'windows', 
        title: 'bienge', 
        modal: '4242',
        modalOne: 'bienge', 
        modalName:'simple Modal', 
        color: '#9f9e9d',
        img: '../../images/favorites/1.png', text:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt dolore nisi ea quibusdam iste a! Aspernatur, ducimus ipsum exercitationem voluptate totam sed sint culpa sit quibusdam aliquam ipsa,  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt dolore nisi ea quibusdam iste a! Aspernatur, ducimus ipsum exercitationem voluptate totam sed sint culpa sit quibusdam aliquam ipsa, libero laudantium.libero laudantium.'},
        {name: 'montblanc', 
        type: 'gloss', 
        title: 'bienge', 
        modal: '4242',
        modalOne: 'bienge', 
        modalName:'simple Modal', 
        color: '#8da418',
        img: '../../images/favorites/4.png', text:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt dolore nisi ea quibusdam iste a! Aspernatur, ducimus ipsum exercitationem voluptate totam sed sint culpa sit quibusdam aliquam ipsa, libero laudantium.'},
        {name: 'montblanc', 
        type: 'windows', 
        title: 'bienge', 
        modal: '4242',
        modalOne: 'bienge', 
        modalName:'simple Modal',
        color:'#887561', 
        img: '../../images/favorites/3.png', text:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt dolore nisi ea quibusdam iste a! Aspernatur, ducimus ipsum exercitationem voluptate totam sed sint culpa sit quibusdam aliquam ipsa, libero laudantium.'},
        {name: 'montblanc', 
        type: 'gloss', 
        title: 'bienge', 
        modal: '4242',
        modalOne: 'bienge', 
        modalName:'simple Modal', 
        color:'#c04b00',
        img: '../../images/favorites/5.png', text:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt dolore nisi ea quibusdam iste a! Aspernatur, ducimus ipsum exercitationem voluptate totam sed sint culpa sit quibusdam aliquam ipsa, libero laudantium.'},
        {name: 'montblanc', 
        type: 'gloss', 
        title: 'bienge', 
        modal: '4242',
        modalOne: 'bienge', 
        modalName:'simple Modal', 
        color: '#8da418',
        img: '../../images/favorites/4.png', text:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt dolore nisi ea quibusdam iste a! Aspernatur, ducimus ipsum exercitationem voluptate totam sed sint culpa sit quibusdam aliquam ipsa, libero laudantium.'},
        {name: 'montblanc', 
        type: 'gloss', 
        title: 'bienge', 
        modal: '4242',
        modalOne: 'bienge', 
        modalName:'simple Modal', 
        color: '#8da418',
        img: '../../images/favorites/4.png', text:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt dolore nisi ea quibusdam iste a! Aspernatur, ducimus ipsum exercitationem voluptate totam sed sint culpa sit quibusdam aliquam ipsa, libero laudantium.'},
        {name: 'montblanc', 
        type: 'gloss', 
        title: 'bienge', 
        modal: '4242',
        modalOne: 'bienge', 
        modalName:'simple Modal', 
        color: '#8da418',
        img: '../../images/favorites/4.png', text:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt dolore nisi ea quibusdam iste a! Aspernatur, ducimus ipsum exercitationem voluptate totam sed sint culpa sit quibusdam aliquam ipsa, libero laudantium.'}
    ]

function addClicks(){
    $(".favorites-card-item").click(function(e){
        console.log(e.target.className )
        if (e.target.className !== 'close' && e.target.className !== 'dots'){
        $(this).addClass('active')
        if($(this).children('.favorites-card-body').children('.favorites-card-body-text').text().length <= 390){
        $(this).children('.favorites-card-body').css('height', '380px')
        if( window.innerWidth <= 680 && window.innerWidth >= 610){
            $(this).children('.favorites-card-body').css('height', '380px')
            }}
        
        }
    })
}
function filterItemsFunc(filterItems){
    if(window.innerWidth >= 1300){
        removeDiv()
        pullElemet(5, filterItems)
        addClicks()
   }
   if(window.innerWidth <= 1300 && window.innerWidth >= 1000){
    removeDiv()
    pullElemet(4, filterItems)
    addClicks()
    }
    if(window.innerWidth <= 1000 && window.innerWidth > 610){
        removeDiv()
        pullElemet(3, filterItems)
        addClicks()
    }
    if(window.innerWidth <= 610){
        removeDiv()
        pullElemet(2, filterItems)
        addClicks()
    }
}
    $(function () {
        $('.look-all').click(function () {
            var get_id = this.id;
            var get_current = $('.favorites-cards-container .' + get_id);
            const filterItems = fetchData;
            filterItemsFunc(filterItems)
         //   $('.favorites-card-item').not(get_current).hide(500);
            get_current.show();
            $('.look-all').css('display', 'none')
        });
    });
    function removeDiv(){
        const containerRemove = document.querySelectorAll(".lines-container")
        for(let i = 0; i< containerRemove.length; i++){
            console.log('3')
            while(containerRemove[i].firstChild){
                containerRemove[i].removeChild(containerRemove[i].firstChild)
            }
        }
    }
    $(function () {
        $('.tab-favorites a').click(function () {
            var get_id = this.id;
            var get_current = $('.favorites-cards-container .' + get_id);
            
            const filterItems = fetchData.filter( item => item.type === get_id)
            filterItemsFunc(filterItems)
         //   $('.favorites-card-item').not(get_current).hide(500);
            get_current.show();
            $('.look-all').css('display', 'initial')
        });
    });

    function createEl(type, classNames = [], txt = '', id = ''){
        const el = document.createElement(type);
        for(let i in classNames){
            el.classList.add(classNames[i])
        }
        (id) ? el.id = id : null;
        el.innerHTML = txt;
        return el;
    }
   
    const container = document.querySelector('.lines-container')
    function pullElemet(count, dataArray){
        let arrLine = []
        let elArr = [];
        console.log(arrLine)
           for(let i= 0; i< count; i++){
            const line = createEl('div', [ 'favorites-cards-container'])
            arrLine.push(line)
           }
        console.log(arrLine)
           for(let j in dataArray){
               const allElement = createEl('div', ['favorites-card-item', dataArray[j].type])
               const headerElement = createEl('div', ['favorites-card-header'])
               const classLink = [{name: 'fre-qurty', url:'../../images/favorites/sq.png'},
                                 {name:'eyes', url:'../../images/favorites/eye.png'},
                                  {name:'window', url: '../../images/favorites/ww.png'},
                                  {name:'close', url: '../../images/favorites/close.png'}
                                ]
    
               for(let i= 0; i< (count <=3 ? 4: 3); i++){
                   const a = createEl('a', ['favorites-card-button', classLink[i].name])
                   var image = new Image();
                   if(classLink[i].name == 'close') image.classList.add('close')
                   image.src = classLink[i].url;
                   a.appendChild(image)
                   headerElement.appendChild(a)
               }
    
               const bodyElement = createEl('div', ['favorites-card-body'])
            //    if(dataArray[j].text.length <= 390){
            //        if(bodyElement.parentNode.classList.contains('active'))
            //        bodyElement.style.height = '360px'
            //    }
               const btnView = createEl('a', ['btn-view'], '<span> CHRISTALLS </span>')
               bodyElement.appendChild(btnView)
               const cardModalsView = createEl('div', ['card-modals-view'], null, 'view')
               cardModalsView.appendChild(createEl('div', ['card-number'], `<span>${dataArray[j].modal} </span>`))
               cardModalsView.appendChild(createEl('div', ['card-modal'], `<span>${dataArray[j].modalName} </span>`))
               bodyElement.appendChild(cardModalsView)
               bodyElement.appendChild(createEl('div', ['favorites-card-body-text'], `<span>${dataArray[j].text}</span>`))
               bodyElement.appendChild(createEl('div', ['card-title'], `<span>${dataArray[j].name}</span>`))
    
               const cardModals = createEl('div', ['card-modals'])
    
               cardModals.appendChild(createEl('div', ['card-number'], `<span>${dataArray[j].modal} </span>`))
               cardModals.appendChild(createEl('div', ['card-modal'], `<span>${dataArray[j].modalName} </span>`))
    
               const cardModalsOne = createEl('div', ['card-modals'])
    
               cardModalsOne.appendChild(createEl('div', ['card-number'], `<span>${dataArray[j].modal} </span>`))
               cardModalsOne.appendChild(createEl('div', ['card-modal'], `<span>${dataArray[j].modalOne} </span>`))
               bodyElement.appendChild(cardModals)
    
               const border = createEl('div', ['card-color-border'])
               const borderColor = createEl('div', ['card-color', 'backColorBrown']);
               borderColor.style.background = `${dataArray[j].color}`
               border.appendChild(borderColor)
    
               bodyElement.appendChild(border)
               bodyElement.appendChild(cardModalsOne)
               const images = createEl('div', ['card-photo']);
               images.style.backgroundImage = `url('${dataArray[j].img}')`
               images.style.backgroundImage = `url('${dataArray[j].img}')`
               bodyElement.appendChild(images)
               if(count <= 3){
                    const btnMob = createEl('a', ['btn-view-mob', 'dots']);
                    const img= new Image();
                    img.src = '../../images/favorites/dots.png';
                    img.classList.add('dots')
                    btnMob.appendChild(img)
                    bodyElement.appendChild(btnMob)
               }
               allElement.appendChild(headerElement)
               allElement.appendChild(bodyElement)
               allElement.addEventListener('click', function(){
                for(let i in elArr){
                    if(elArr[i].classList.contains('active')) elArr[i].classList.remove('active')
                    elArr[i].childNodes[1].style.height = '100%'
                }
                
                if(allElement.classList.contains('active'))
                {   
                    if(txtLength <= 390) allElement.childNodes[1].style.height = '360px'}
                else { allElement.childNodes[1].style.height = '100%' }
               })
               elArr.push(allElement)
           }
        //    for(let i in elArr){
        //     elArr[i].addEventListener('click', function(e){
        //         activeClass(e)
        //        })
        //    }


           let elIndex = 0
           while(elIndex < elArr.length)
           {
               for(let i in arrLine){
                   if(elIndex < elArr.length){
                       arrLine[i].appendChild(elArr[elIndex])
                       elIndex++
                   }else{
                       break;
                   }
               }
           }
       
           for(let i in arrLine){
               container.appendChild(arrLine[i])
           }
    }

   if(window.innerWidth >= 1300){
        pullElemet(5, fetchData)
   }
   if(window.innerWidth <= 1300 && window.innerWidth > 1000){
        pullElemet(4, fetchData)
    }
    if(window.innerWidth <= 1000 && window.innerWidth > 610){
        pullElemet(3, fetchData)
    }
    if(window.innerWidth <= 610){
        pullElemet(2, fetchData)
    }
    function close(e){
        var div = $(".favorites-card-item"); 
		if (!div.is(e.target) 
		    && div.has(e.target).length === 0) { 
            div.removeClass('active')
            div.children().css('height', '100%')
            
        }
    }
    addClicks()
    $(document).mouseup(function (e){ 
        close(e)
    });
    $('.close').click(function (e){
        const els = document.querySelectorAll('.favorites-card-item')
        for(let i= 0; i< els.length; i++){
            if(els[i].classList.contains('active')) els[i].classList.remove('active')
        }
       $(".favorites-card-item").removeClass('active') 
    });
    
}