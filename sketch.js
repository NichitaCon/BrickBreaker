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
    paddle = new Paddle(100, 20, width / 1.5, height * 0.9, 1);
}

function draw() {
    background(233);
    text(myKey, 50, 50);


    paddle.drawPaddle();
    paddle.paddleMovement();

    //BALL SECTION
    ball.drawBall();
    ball.moveBall();
    checkCollision();
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
        ball.yspeed *= -1;
        console.log("Top hit")
    }

    //sidebounce
    if (
        //if ball is below topbar
        ball.ballPosY > paddle.barPosY && //and if
        //if ball is above belowbar
        ball.ballPosY < paddle.barPosY + paddle.sizeY && // and if
        //if ball is above left paddle side
        ball.ballPosX + ball.radius /2 > paddle.barPosX &&
        ball.ballPosX + ball.radius /2 < paddle.barPosX + paddle.sizeX
    ){
        //semi working, only works when paddle is stationary, maybe make a new temporary value, set the ball.xspeed faster than the paddle speed for one frame and then re set it back to normal
        ball.xspeed = -ball.xspeed
        // ball.xspeed = -ball.xspeed
        console.log("Side Hit!")
    }
    text(ball.ballPosY,50,50)
}
