let myKey = "";
let barPosX;
let barPosY;
let barWidth;
let barHeight;

let ballPosX;
let ballPosY;
let xspeed = 0.5;
let yspeed = 2;

let barSpeed = 3;

let r = 5;

let ball;

function setup() {
    createCanvas(250, 300);
    angleMode(DEGREES);
    ballPosX = width / 2;
    ballPosY = height / 2;

    barPosX = width / 2.5;
    barPosY = height * 0.9;

    barWidth = 50;
    barHeight = 10;

    ball = new Ball(width / 2, height / 2, 1, 5, 10);
}

function draw() {
    background(233);
    text(myKey, 50, 50);

    //BAR SECTION

    // barBounce
    if (
        //TopSurface
        ballPosY >= barPosY - r &&
        // Larger than left side
        ballPosX >= barPosX &&
        //larger than right side
        ballPosX <= barPosX + barWidth
    ) {
        yspeed = -yspeed;
        // console.log(ballPosY);
    }

    // BarMovement
    push();
    if (keyIsDown(LEFT_ARROW) === true) {
        barPosX -= barSpeed;
    } else if (keyIsDown(RIGHT_ARROW) === true) {
        barPosX += barSpeed;
    }
    translate(barPosX, barPosY);
    rect(0, 0, barWidth, barHeight);
    pop();

    //walls
    if (barPosX < 0) {
        barPosX = 0;
    } else if (barPosX > width - barWidth) {
        barPosX = width - barWidth;
    }
    // console.log(barPosX);

    //BALL SECTION
    ball.drawBall();
    ball.moveBall();
}
