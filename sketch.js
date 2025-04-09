

let ballSpeed = 6;
let brickBreaker;

function setup() {
    createCanvas(900, 600);
    angleMode(DEGREES);

    brickBreaker = new BrickBreaker();

}

function draw() {
    background(233);


    brickBreaker.update();
    brickBreaker.draw();


}

