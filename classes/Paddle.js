class Paddle {
    constructor(sizeX, sizeY, barPosX, barPosY, barSpeed) {
        this.sizeX = 100;
        this.sizeY = 20;
        this.barPosX = width / 1.5;
        this.barPosY = height * 0.9;
        this.barSpeed = 1;
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
        else if (this.barPosX > width - this.sizeY) {
            this.barPosX = width - this.sizeY;
        }
        console.log(barPosX);
    }
}
