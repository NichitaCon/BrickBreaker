
let brickBreaker;

function setup() {
    createCanvas(900, 600);
    angleMode(DEGREES);

    brickBreaker = new BrickBreaker({
        xpos: 50,
        ypos: 50,
        width: 200,
        height: 400,
        paddleWidth: 90,
        paddleSpeed: 5,
        brickRows: 3,
        brickColumns: 7,
        brickHeight: 15,
        gameLength: 20,
        ballSpeed: 6

    });

}

function draw() {
    background(233);


    brickBreaker.update();
    brickBreaker.draw();


}

