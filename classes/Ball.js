class Ball {
    constructor(obj) {
        this.vel = createVector(0, obj.velY || 2);
        this.radius = obj.radius || 5;
        this.gameXpos = obj.gameXpos;
        this.gameYpos = obj.gameYpos;
        this.gameWidth = obj.gameWidth;
        this.gameHeight = obj.gameHeight;
        this.ballLost = false;
        if (obj.velY) {
            this.vel = createVector(0, obj.velY);
        } else {
            this.vel = createVector(0, 2);
        }
        if (obj.posX && obj.posY) {
            this.pos = createVector(obj.gameXpos + this.gameWidth/2, obj.gameYpos + this.gameHeight/2);
        } else {
            this.pos = createVector(width / 2, height / 2);
        }
    }

    drawBall() {
        // console.log(this.velX)
        if (!this.ballLost) {
            push();
            translate(this.pos.x, this.pos.y);
            ellipse(0, 0, this.radius * 2, this.radius * 2);
            pop();
        }
    }

    moveBall() {
        this.pos.x = this.pos.x + this.vel.x;
        this.pos.y = this.pos.y + this.vel.y;
        //bounce off left OR right wall
        if (
            this.pos.x > this.gameXpos + this.gameWidth - this.radius ||
            this.pos.x < this.gameXpos + this.radius
        ) {
            this.vel.x = -this.vel.x;
        }

        //bounce off top OR bottom wall
        if (
            this.pos.y > this.gameHeight + this.gameYpos - this.radius ||
            this.pos.y < this.gameYpos + this.radius
        ) {
            this.vel.y = -this.vel.y;
        }

        //bottom surface detection
        if (this.pos.y >= this.gameYpos + this.gameHeight - this.radius) {
            this.ballLost = true;
        }
    }
}
