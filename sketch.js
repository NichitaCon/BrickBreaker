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
let paddle;
let bricks = [];

function setup() {
    createCanvas(250, 300);
    angleMode(DEGREES);
    ballPosX = width / 2;
    ballPosY = height / 2;

    barPosX = width / 2.5;
    barPosY = height * 0.9;

    barWidth = 50;
    barHeight = 10;

    ball = new Ball(width / 2, height / 2, 2, 2, 5);
    paddle = new Paddle(100, 20, width / 1.5, height * 0.9, 1);

    let rows = 2;
    let cols = 10;
    let brickW = width / cols;
    let brickH = 15;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let brickX = col * brickW;
            let brickY = row * brickH + 30; // offset from top
            let brickColor = color(random(255), random(255), random(255));
            bricks.push(new Brick(brickX, brickY, brickW, brickH, brickColor));
        }
    }
}

function draw() {
    background(233);
    text(myKey, 50, 50);

    //Bricks section
    for (let i = 0; i < bricks.length; i++) {
        bricks[i].drawBrick();
    }

    //Paddle section
    paddle.drawPaddle();
    paddle.paddleMovement();

    //BALL SECTION
    ball.drawBall();
    ball.moveBall();
    checkCollision();

    //Bricks collision
    for (let i = 0; i < bricks.length; i++) {
        checkBrickCollision(ball, bricks[i]);
        // console.log("brick", i, "check")
    }
}

function checkCollision() {
    if (
        // if ball is larger than left side of paddle
        ball.ballPosX > paddle.barPosX && // And if
        // if ball is less that the right side of the paddle
        ball.ballPosX < paddle.barPosX + paddle.sizeX && //and if
        // Ball is touching the top side of the paddle
        ball.ballPosY + ball.radius > paddle.barPosY
    ) {
        // console.log("GOT IT")
        if (ball.ballPosY > paddle.barPosY + paddle.sizeY) {
            // console.log("under");
        } else {
            ball.yspeed *= -1;
            // console.log("Top hit");
        }
    }

    //sidebounce
    if (
        //if ball is below topbar
        ball.ballPosY > paddle.barPosY && //and if
        //if ball is above belowbar
        ball.ballPosY < paddle.barPosY + paddle.sizeY && // and if
        //if ball is above left paddle side
        ball.ballPosX + ball.radius > paddle.barPosX && // and if
        //if ball is below right paddle side
        ball.ballPosX - ball.radius < paddle.barPosX + paddle.sizeX
    ) {
        ball.xspeed = -ball.xspeed;
        // console.log("Side Hit!");
    }
    text(ball.ballPosY, 50, 50);
}

function checkBrickCollision(ball, brick) {
    //skipping function if brick is destroyed
    if (brick.destroyed) {
        return;
    }

    // Top or bottom collision
    if (
        // Ball's x is within brick's width
        ball.ballPosX > brick.x &&
        ball.ballPosX < brick.x + brick.w &&
        // Ball is touching the top or bottom of the brick
        ball.ballPosY + ball.radius > brick.y &&
        ball.ballPosY - ball.radius < brick.y + brick.h
    ) {
        ball.yspeed = -ball.yspeed;
        // console.log("Top/Bottom Brick Hit");
        brick.destroyed = true;
    }

    // Side collision
    if (
        // Ball's y is within brick's height
        ball.ballPosY > brick.y &&
        ball.ballPosY < brick.y + brick.h &&
        // Ball is hitting left or right side
        ball.ballPosX + ball.radius > brick.x &&
        ball.ballPosX - ball.radius < brick.x + brick.w
    ) {
        ball.xspeed *= -1;
        // console.log("Side Brick Hit");
        brick.destroyed = true;
    }
}
