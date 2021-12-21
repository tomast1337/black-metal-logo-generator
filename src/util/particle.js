export default class Particle {
    constructor(p5,x, y, lifeTime, startSize, endSize, color) {
        this.p5 = p5;
        this.pos = this.p5.createVector(x, y);
        this.lastPos = this.p5.createVector(x, y);

        this.vel = this.p5.createVector(0, 0);
        this.acc = this.p5.createVector(0, 0);

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
        this.p5.stroke(0, 0, 0, 255 / 10);
        this.p5.strokeWeight(1);
        this.p5.fill(this.color);
        this.p5.ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }

    
}