import "p5";


export default class Particle {
    constructor(x, y, lifeTime, startSize, endSize, color) {
        this.pos = createVector(x, y);
        this.lastPos = createVector(x, y);

        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

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
        this.size = map(this.lifeTime, 0, this.startSize, this.endSize, 0);
        stroke(0, 0, 0, 255 / 10);
        strokeWeight(1);
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }

    
}