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
      
      river.loop()
    }
  } 

  change();

  for(let i = 0; i < num; i ++) {
    // create a new variable p and assign it the value of the i element in the particles array
    let p = particles[i];

    // draw a point on the canvas at the position of the current particle p. 
    point(p.x, p.y);

    //generate a Perlin noise value n based on the position of the particle p
    let n = noise(p.x * noiseScale, p.y * noiseScale, frameCount * noiseScale * noiseScale);

    //calculate the angle a that the particle should move based on the n noise value
    let a = TAU * n;

    //update the x and y positions of the current particle p based on the a angle
    p.x += cos(a);
    p.y += sin(a);

    //check if the current particle p is still on the canvas, using the onScreen() function
    //
    if(!onScreen(p)) {
      p.x = random(width);
      p.y = random(height);
    }
  }
}

//check whether a given point (represented by a vector) is within the boundaries of a canvas. 
//It returns true if the point is within the canvas and false otherwise.
function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}

function change(){
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
}




