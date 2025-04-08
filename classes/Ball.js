class Ball {
    constructor(ballPosX,ballPosY,velX,velY,radius) {
        this.pos = createVector(ballPosX,ballPosY)
        this.vel = createVector(velX,velY)
        this.radius = radius

    }
    
    
    drawBall() {
        // console.log(this.velX)
        push();
            translate(this.pos.x,this.pos.y)
            ellipse(0, 0, this.radius *2, this.radius*2);
        pop();
    }
    
    moveBall() {
        
        this.pos.x = this.pos.x + this.vel.x;
        this.pos.y = this.pos.y + this.vel.y;
        //bounce off left OR right wall
        if (this.pos.x > width - this.radius || this.pos.x < this.radius) {
            this.vel.x = -this.vel.x;
        }

        //bounce off top OR bottom wall
        if (this.pos.y > height - this.radius || this.pos.y < this.radius) {
            this.vel.y = -this.vel.y;
        }

        //bottom surface detection
        if (this.pos.y >= height - this.radius) {
            // console.log("bottom hit");
        }
    }
}
