import p5 from "p5";

export default class Particle {
    constructor(x, y, lifeTime, startSize, endSize, color) {
        this.pos = p5.createVector(x, y);
        this.lastPos = p5.createVector(x, y);

        this.vel = p5.createVector(0, 0);
        this.acc = p5.createVector(0, 0);

        this.lifeTime = lifeTime;
        this.startSize = startSize;
        this.endSize = endSize;
        this.size = startSize;

        this.maxSpeed = 5;
        this.color = color;
    }

    isDead() {
        return this.lifeTime <= 0;
    }

    update() {
        if (this.isDead()) {
            return;
        }
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.lastPos = this.pos.copy();
        this.lifeTime -= 1;
    }

    applyForce(force) {
        this.acc.add(force);
    }

    draw() {
        if (this.isDead()) {
            return;
        }
        p5.stroke(0, 0, 0, 255 / 10);
        p5.strokeWeight(1);
        p5.fill(this.color);
        p5.ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }

    
}