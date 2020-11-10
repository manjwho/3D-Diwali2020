// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI

class Firework {
  constructor() {
    this.hu = random(255); // colour range - can be region wise
    this.firework = new Particle(random(width), height, random(-400, 400), this.hu, true); // starting point
    this.exploded = false;
    this.particles = [];
  }

  done() {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  update() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();

      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();

      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }

  explode() {
    let n = int(random(1,7)) // shape - spokes
    let d = int(random(1,7))// shape - loops
    for (let i = 0; i < 241; i++) // no. of particles
      {
      const p = new Particle(this.firework.pos.x, this.firework.pos.y, this.firework.pos.z, this.hu, false, i, n,d);
      this.particles.push(p);
    }
  }

  show() {
    if (!this.exploded) {
      this.firework.show();
    }

    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }
}
