export default class Particle {
    constructor(p5, x, y, lifeTime, startSize, endSize, color) {
        this.p5 = p5;
        this.pos = this.p5.createVector(x, y);
        this.lastPos = this.p5.createVector(x, y);

        this.vel = this.p5.createVector(0, 0);
        this.acc = this.p5.createVector(0, 0);
        this.lifeTimeMax = lifeTime;
        this.lifeTime = lifeTime;

        this.startSize = startSize;
        this.endSize = endSize;
        this.size = startSize;

        this.maxSpeed = 1;
        this.color = color;
    }

    isDead() {
        return this.lifeTime <= 0;
    }

    edges() {
        const width = this.p5.width
        const height = this.p5.width

        if (this.pos.x > width) {
            this.lifeTime = 0;
        }
        if (this.pos.x < 0) {
            this.lifeTime = 0;
        }
        if (this.pos.y > height) {
            this.lifeTime = 0;
        }
        if (this.pos.y < 0) {
            this.lifeTime = 0;
        }
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

        const t = - this.lifeTime / this.lifeTimeMax;
        this.size = this.p5.lerp(this.endSize, this.startSize, t);
    }

    applyForce(flowField, scale, cols) {
        const x = this.p5.floor(this.pos.x / scale);
        const y = this.p5.floor(this.pos.y / scale);
        const index = x + y * cols;
        this.acc.add(flowField[index]);
    }

    draw() {
        if (this.isDead()) {
            return;
        }
        this.p5.stroke(0, 0, 0, 0);
        this.p5.strokeWeight(1);
        this.p5.fill(this.color);
        this.p5.ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }


}