class Paddle {
    constructor(sizeX, sizeY, barPosX, barPosY, barSpeed) {
        this.sizeX = 100;
        this.sizeY = 200;
        this.barPosX = width / 1.5;
        this.barPosY = height * 0.2;
        this.barSpeed = 10;
    }

    drawPaddle() {
        push();
            translate(this.barPosX, this.barPosY);
            rect(0, 0, this.sizeX, this.sizeY);
        pop();
    }

    paddleMovement() {
        push();
            if (keyIsDown(LEFT_ARROW) === true) {
                this.barPosX -= this.barSpeed;
            } else if (keyIsDown(RIGHT_ARROW) === true) {
                this.barPosX += this.barSpeed;
            }
        pop();

        //Paddle Restraint
        //left side
        if (this.barPosX < 0) {
            this.barPosX = 0;
        }
        //right side
        else if (this.barPosX > width - this.sizeX) {
            this.barPosX = width - this.sizeX;
        }
        // console.log("bar pos x is = ",barPosX);
    }
}
