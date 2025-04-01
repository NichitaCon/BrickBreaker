class Paddle {
    constructor() {}

    paddleMovement() {
        push();
        if (keyIsDown(LEFT_ARROW) === true) {
            barPosX -= barSpeed;
        } else if (keyIsDown(RIGHT_ARROW) === true) {
            barPosX += barSpeed;
        }
        translate(barPosX, barPosY);
        rect(0, 0, barWidth, barHeight);
        pop();

        //Paddle Restraint
        //left side
        if (barPosX < 0) {
            barPosX = 0;
        } else
        //right side 
        if (barPosX > width - barWidth) {
            barPosX = width - barWidth;
        }
        console.log(barPosX);
    }
}
