let myKey = "";
let barPosX = 150;

function setup() {
    createCanvas(500, 500);
    angleMode(DEGREES);
}

function keyPressed() {
    console.log(key);
    myKey = key;
}

function draw() {
    background(233);

    push();
    if (keyIsDown(LEFT_ARROW) === true) {
        barPosX -= 1;
    } else if (keyIsDown(RIGHT_ARROW) === true) {
        barPosX += 1;
    }
    translate(barPosX, 450);
    rect(0, 0, 200, 20);
    pop();

    text(myKey, 50, 50);
}
