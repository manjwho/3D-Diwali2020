// from Polar Fireworks by D_Snyder

function rose(theta, n=5, d=8)
{
  let k = n/d
  let r = cos(k*theta*2); // radius? -- able to get dotted lines
  let x = r*cos(theta*8); // rotation of each particle
  let y = r*sin(theta*8);
  let z = y/x;
  //console.log(z);
  return createVector(x, y, z/10); //play with z val
}

// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI


class Particle {
  constructor(x, y, z, hu, firework, index, n, d) {
    this.pos = createVector(x, y, z);
    this.firework = firework;
    this.lifespan = 255;
    this.hu = hu;
    this.acc = createVector(0, 0, 0);
    if (this.firework) {
      this.vel = createVector(0, random(-18, -8), 0); // height of burst
    } else {
      this.vel = rose(map(index, 0, 719, 0, PI*d), n, d);
      this.vel.mult(10); // explode form
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    if (!this.firework) {
      this.vel.mult(0.9);
      this.lifespan -= 4;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  done() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }

  show() {  // render each dot
    colorMode(HSB);
    let z;

    if (!this.firework) {  // for the burst
      strokeWeight(2);
      stroke(this.hu, 255, 255, this.lifespan); //[HSB, Alpha]
      z = random (-2, 2);
    } else {  // for the rocket
      strokeWeight(4);
      stroke(this.hu, 255, 255);
      z = 0;
    }

    point(this.pos.x, this.pos.y, this.pos.z ); 
  }
}