class Ball {
    constructor(ballPosX,ballPosY,xspeed,yspeed,radius) {
        this.ballPosX = ballPosX
        this.ballPosY = ballPosY
        this.xspeed = xspeed
        this.yspeed = yspeed
        this.radius = radius

    }
    
    
    drawBall() {
        // console.log(this.velX)
        push();
        translate(this.ballPosX,this.ballPosY)
        ellipse(0, 0, this.radius, this.radius);
        pop();
    }
    
    moveBall() {
        
        this.ballPosX = this.ballPosX + this.xspeed;
        this.ballPosY = this.ballPosY + this.yspeed;
        //bounce off left OR right wall
        if (this.ballPosX > width - this.radius || this.ballPosX < this.radius) {
            this.xspeed = -this.xspeed;
        }

        //bounce off top OR bottom wall
        if (this.ballPosY > height - this.radius || this.ballPosY < this.radius) {
            this.yspeed = -this.yspeed;
        }

        //bottom surface detection
        if (this.ballPosY >= height - this.radius) {
            // console.log("bottom hit");
        }
    }
}
