let myKey = "";
let barPosX;
let barPosY = 150;
let barWidth;
let barHeight;

let ballPosX;
let ballPosY;
let xspeed = 0.5;
let yspeed = 2;

let barSpeed = 3;

let r = 5;

function setup() {
    createCanvas(500, 250);
    angleMode(DEGREES);
    ballPosX = width / 2;
    ballPosY = height / 2;

    barPosX = width / 2.5;

    barWidth = 50;
    barHeight = 5;
}

function draw() {
    background(233);
    text(myKey, 50, 50);

    //BAR SECTION

    //movement
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
    console.log(barPosX);

    //BALL SECTION
    ellipse(ballPosX, ballPosY, r * 2, r * 2);
    ballPosX += xspeed;
    ballPosY += yspeed;

    if (ballPosX > width - r || ballPosX < r) {
        xspeed = -xspeed;
    }

    if (ballPosY > height - r || ballPosY < r) {
        yspeed = -yspeed;
    }

    // barBounce
    if (
        //TopSurface
        ballPosY == barPosY - r &&
        //Larger than left side
        ballPosX > barPosX &&
        //larger than right side
        ballPosX < barPosX + barWidth
    ) {
        yspeed = -yspeed;
    }

    // if (
    //     ballPosY > barPosY 
    //     && ballPosX == barPosX - r 
    //     || ballPosX == barPosX + barWidth - r
    // ) {
    //     xspeed = -xspeed
    // }



    if (        //bottomSurface
        ballPosY >= height - r) {
            console.log("bottom hit")
        }
}
