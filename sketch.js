// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI


const fireworks = [];
let gravity;
let easycam;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB);
  gravity = createVector(0, 0.2, 0);
  stroke(255);
  strokeWeight(4);
  background(0);
  
  easycam = createEasyCam();
  document.oncontextmenu = function() { return false; }
  
}

function windowResized(){
 resizeCanvas(windowWidth, windowHeight); 
  
  
 
}

function draw() {
  colorMode(RGB);
  background(0);
  
  //orbitControl();
   rotateY(millis()/10000);
  //rotateX(millis()/20000);
  
  translate (-width/2, -height/2);
 
  if (random(1) < 0.1) { // density of fireworks
    fireworks.push(new Firework());
  }
  
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}
