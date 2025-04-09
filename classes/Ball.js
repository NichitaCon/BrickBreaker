class Ball {
    constructor(obj) {
        this.vel = createVector(0,obj.velY || 2)
        this.radius = obj.radius || 5
        if (obj.velY) {
            this.pos = createVector(0, obj.velY);
        } else {
            this.pos = createVector(0, 2);
        }
        if (obj.posX && obj.posY) {
            this.pos = createVector(obj.posX, obj.posX);
        } else {
            this.pos = createVector(width /2, height /2);
        }
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
