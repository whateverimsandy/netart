document.body.style.margin   = 0
document.body.style.overflow = `hidden`

// declare an empty array to store the particles
let particles = [];

// declare a variable 'river'
let river;

//declare a constant variable 'num' and assign value of 200
const num = 200;


//declare a constant variable 'num' and assign value of 0.09/2
const noiseScale = 0.09/2;

//declare function preload() to load a sound file with loadSound()
function preload (){
  river = loadSound ("river.mp3")
}


function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(5);
  for(let i = 0; i < num; i ++) {
    particles.push(createVector(random(width), random(height)));
  }
  
  
  clear();
  background('black'); 
}

function draw() {
   
// The sound is played in loop when user clicks the mouse (anywhere within the canvas)
 if (mouseIsPressed) {
    if ( river.isPlaying() ==false){
      console.log (`hii! the mouseClicked function was called!`)
      river.loop()
    }
  } 

 // If the mouse is in the top-left corner of the canvas (both mouseX and mouseY are less than or equal to 100), the color of the stroke is set to red  
 if(mouseX <=100 & mouseY <=100){
    
    stroke('red')
  //If the mouse is in the bottom-right corner of the canvas (both mouseX and mouseY are greater than or equal to 300), the color of the stroke is set to blue  
  }else if (mouseX >=300 & mouseY >=300){
    
    stroke ('blue')    
  //If the mouse is to the right of the center of the canvas (mouseX is greater than 500), the color of the  stroke is set to yellow and the stroke weight is increased to 1.5   
  }else if(mouseX > 500){
    
    stroke ('yellow')
    strokeWeight(1.5)
  //If none of these conditions are met, the color of the particle stroke is set to cyan 
  }else { 
     stroke ('cyan')
  }

  for(let i = 0; i < num; i ++) {
    let p = particles[i];
    point(p.x, p.y);
    let n = noise(p.x * noiseScale, p.y * noiseScale, frameCount * noiseScale * noiseScale);
    let a = TAU * n;
    p.x += cos(a);
    p.y += sin(a);
    if(!onScreen(p)) {
      p.x = random(width);
      p.y = random(height);
    }
  }
}


function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}




