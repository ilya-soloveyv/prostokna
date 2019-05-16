if ($('#news-tape').length) {
    const cards = document.querySelectorAll('.card-border')
    const leng = cards.length / 2;
    let colCount = '';
    for(let key = 0; key < leng + 1; key++){
        if(key % 2 == 0) colCount += '30% '
        else colCount += '50% '
    }
    console.log(colCount)
    const cardsContainer = document.querySelector('.cards-container');
    cardsContainer.style.gridTemplateColumns = colCount;


            
 

    if(window.innerWidth > 768){
  
    

        $(".cards-container").mousewheel(function(event, delta) {
            var mult = 1;
            var $this = $(this);
            if (event.timeStamp - $this.data('oldtimeStamp') < 1000) {
                //calculate easing here
                mult = 1000 / (event.timeStamp - $this.data('oldtimeStamp'));
            }
            $this.data('oldtimeStamp', event.timeStamp);
            this.scrollLeft -= (delta) * mult;
             this.style.transition = '1s';
            event.preventDefault();
        });

        
    }

    const slider = document.querySelector('.cards-container');
    let isDown = false;
    let startX;
    let scrollLeft;
    
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) - 15; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    });

    

}