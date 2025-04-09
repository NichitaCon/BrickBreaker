

let ballSpeed = 6;
let brickBreaker;

function setup() {
    createCanvas(900, 600);
    angleMode(DEGREES);

    brickBreaker = new BrickBreaker({
        xpos: 50,
        ypos: 50,
        width: 500,
        height: 400,
        paddleSpeed: 5,
        brickRows: 2,
        brickColumns: 11,
        brickHeight: 15,
        gameLength: 20,

    });

}

function draw() {
    background(233);


    brickBreaker.update();
    brickBreaker.draw();


}

