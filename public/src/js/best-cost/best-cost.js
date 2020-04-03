if ($('#best-cost').length) {


        function close(e){
            var div = $(".popup"); 
            if (!div.is(e.target) 
                && div.has(e.target).length === 0) { 
                div.removeClass('active')
              //  div.children().css('height', 'auto')
            }
        }

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
        
        $('.my-com-anchor').click(function (e){
            e.preventDefault()
            $('#my-com').addClass('active')
        })

        $('.descripshen').click(function (e){
            e.preventDefault()
            $('#pre-title').addClass('active')
        })

        $('.make-sale').click(function (e){
            e.preventDefault()
            setTimeout(() => {
            $('#form-target').addClass('active')
            }, 500)
        })
        $('.button-close').click(function (e){
            e.preventDefault()
            $('#pre-title').removeClass('active')
        })
        $('.cost').on('click', function() {
                setTimeout(() => {
                    $('html,body').animate({scrollTop:$('.background-form').offset().top + 200 +"px"},{duration:1E3});
                }, 250)
          });
          $('.form-panel').submit(function(ev) {
            ev.preventDefault(); // to stop the form from submitting
            /* Validations go here */
           
            $('#form-target').removeClass('active')
        });
if(window.innerWidth < 769) var btn = document.querySelector("a.make-sale");

if(window.innerWidth > 769) var btn = document.querySelector(".cost");
var ctx;

var colorInfoElem = document.querySelector("#colorInfo");
html2canvas(btn).then(canvas => {
  ctx = canvas.getContext("2d");
  
  createParticleCanvas();
  
  let reductionFactor = 50;
  btn.addEventListener("click", e => {
    // Get the color data for our button
    let width = btn.offsetWidth;
    let height = btn.offsetHeight
    let colorData = ctx.getImageData(0, 0, width, height).data;

    // Keep track of how many times we've iterated (in order to reduce
    // the total number of particles create)
    let count = 0;

    // Go through every location of our button and create a particle
    for(let localX = 0; localX < width; localX++) {
      for(let localY = 0; localY < height; localY++) {
        if(count % reductionFactor === 0) {
          let index = (localY * width + localX) * 4;
          let rgbaColorArr = colorData.slice(index, index + 4);

          let bcr = btn.getBoundingClientRect();
          let globalX = bcr.left + localX;
          let globalY = bcr.top + localY;
         //   console.log(globalX  + ' ' + globalY)
          createParticleAtPoint(100, 150, rgbaColorArr);
        }
        count++;
      }
    }
  });
});


/* An "exploding" particle effect that uses circles */
var ExplodingParticle = function() {
  // Set how long we want our particle to animate for
  this.animationDuration = 1000; // in ms

  // Set the speed for our particle
  this.speed = {
    x: -5 + Math.random() * 10,
    y: -5 + Math.random() * 10
  };
  
  // Size our particle
  this.radius = 2 + Math.random() * 2;
  
  // Set a max time to live for our particle
  this.life = 30 + Math.random() * 10;
  this.remainingLife = this.life;
  
  // This function will be called by our animation logic later on
  this.draw = ctx => {
    let p = this;

    if(this.remainingLife > 0
    && this.radius > 0) {
      // Draw a circle at the current location
      ctx.beginPath();
      ctx.arc(p.startX, p.startY, p.radius, 0, Math.PI * 5);
      ctx.fillStyle = "rgba(" + this.rgbArray[0] + ',' + this.rgbArray[1] + ',' + this.rgbArray[2] + ", 1)";
      ctx.fill();
    //  console.log(this.rgbArray)
      // Update the particle's location and life
      p.remainingLife--;
      p.radius -= 0.6;
      p.startX += p.speed.x;
      p.startY += p.speed.y;
    }
  }
}

var particles = [];
function createParticleAtPoint(x, y, colorData) {
  let particle = new ExplodingParticle();
  particle.rgbArray = colorData;
  particle.startX = x;
  particle.startY = y;
  console.log(particle.startX + particle.startY)
  particle.startTime = Date.now();
  
  particles.push(particle);
}


var particleCanvas, particleCtx;
function createParticleCanvas() {
  // Create our canvas
  particleCanvas = document.createElement("canvas");
  particleCtx = particleCanvas.getContext("2d");
  
  // Size our canvas
  particleCanvas.width = "200";
  particleCanvas.height = "600";
  
  // Position out canvas
  particleCanvas.style.position = "absolute";

  particleCanvas.style.top = "-70vw";
  particleCanvas.style.left = "0";
  particleCanvas.style.width= "100%";
  // Make sure it's on top of other elements
  particleCanvas.style.zIndex = "1001";
  
  // Make sure other elements under it are clickable
  particleCanvas.style.pointerEvents = "none";
  
  // Add our canvas to the page
  if(window.innerWidth < 769) var cont = document.querySelector('.button-make-sale')
  if(window.innerWidth > 769) var cont = document.querySelector('.button-dekstop')
  
  cont.appendChild(particleCanvas);
}



function update() {
  // Clear out the old particles
  if(typeof particleCtx !== "undefined") {
    particleCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  // Draw all of our particles in their new location
  for(let i = 0; i < particles.length; i++) {
    particles[i].draw(particleCtx);
    
    // Simple way to clean up if the last particle is done animating
    if(i === particles.length - 1) {
      let percent = (Date.now() - particles[i].startTime) / particles[i].animationDuration;
      
      if(percent > 1) {
        particles = [];
      }
    }
  }
  
  // Animate performantly
  window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);
}