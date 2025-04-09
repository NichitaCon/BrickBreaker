class Paddle {
    constructor(obj) {
        this.sizeX = obj.sizeX || 100;
        this.sizeY = obj.sizeY || 10;
        this.barSpeed = obj.barSpeed || 10;
        if (obj.posX && obj.posY) {
            this.pos = createVector(obj.posX, obj.posY);
        } else {
            this.pos = createVector(width * 0.3, height * 0.9);
        }
    }

    drawPaddle() {
        push();
        translate(this.pos.x, this.pos.y);
        rect(0, 0, this.sizeX, this.sizeY);
        pop();
    }

    paddleMovement() {
        push();
        if (keyIsDown(LEFT_ARROW) === true) {
            this.pos.x -= this.barSpeed;
        } else if (keyIsDown(RIGHT_ARROW) === true) {
            this.pos.x += this.barSpeed;
        }
        pop();

        //Paddle Restraint
        //left side
        if (this.pos.x < 0) {
            this.pos.x = 0;
        }
        //right side
        else if (this.pos.x > width - this.sizeX) {
            this.pos.x = width - this.sizeX;
        }
        // console.log("bar pos x is = ",barPosX);
    }
}
