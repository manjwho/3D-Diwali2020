// 2D rose func from Polar Fireworks by D_Snyder

function rose(theta,gamma, n=5, d=8)
{
  let k = n/d
  let r = cos(k*theta); 
  let x = r*cos(theta);
  let y = r*sin(theta);
  let z = r*sin(gamma*k); // gamma var contrib by Archit
  return createVector(x, y, z); 
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
      this.vel = rose(map(index, 0, 120, 0, PI*4), map(index, 0,120, -2*PI, 2*PI), n, d);
      this.vel.mult(10); // exploded form. theta and gamma mapped to half the number of partcicles -1 - ie. 120
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
      strokeWeight(map(this.lifespan, 255, 0, 3, 0));
      stroke(this.hu, 255, 255); //[HSB, Alpha]
     // z = random (-2, 2);
    } else {  // for the rocket
      strokeWeight(5);
      stroke(this.hu, 255, 255);
      z = 0;
    }

    point(this.pos.x, this.pos.y, this.pos.z ); 
  }
}
