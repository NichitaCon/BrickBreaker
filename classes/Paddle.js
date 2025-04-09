class Paddle {
    constructor(sizeX, sizeY, barPosX, barPosY, barSpeed) {
        this.sizeX = 100;
        this.sizeY = 10;
        this.pos = createVector(width / 1.5,height * 0.9)
        this.barSpeed = 10;
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
