
let ball;
let paddle;
let bricks = [];
let ballSpeed = 2;

function setup() {
    createCanvas(250, 300);
    angleMode(DEGREES);
    ballPosX = width / 2;
    ballPosY = height / 2;

    barPosX = width / 2.5;
    barPosY = height * 0.9;

    barWidth = 50;
    barHeight = 10;
        ball = new Ball({
            velY: ballSpeed,
            radius: null,
            posX: null,
            posY: null,
        });
        
        
        
    paddle = new Paddle({
        sizeX: null,
        sizeY: null,
        posX: null,
        posY: null,
        barSpeed: 3,
    });

    let rows = 2;
    let cols = 11;
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
        ball.pos.x > paddle.pos.x && // And if
        // if ball is less that the right side of the paddle
        ball.pos.x < paddle.pos.x + paddle.sizeX && //and if
        // Ball is touching the top side of the paddle
        ball.pos.y + ball.radius > paddle.pos.y
    ) {
        // console.log("GOT IT")
        if (ball.pos.y > paddle.pos.y + paddle.sizeY) {
            //dont do anything if the ball is under the paddle
            // console.log("under");
        } else {
            // map the ball's x position on the paddle to a velocity
            let newVelX = map(
                ball.pos.x,
                paddle.pos.x,
                paddle.pos.x + paddle.sizeX,
                -ballSpeed,
                ballSpeed
            );

            // vector magnitude formula to make a new velY to keep a constant magnitude
            let newVelY = -sqrt(sq(ballSpeed) - sq(newVelX)); // negative so ball goes up

            ball.vel.x = newVelX;
            ball.vel.y = newVelY;
            // console.log("Top hit");
        }
    }

    //sidebounce
    if (
        //if ball is below topbar
        ball.pos.y > paddle.pos.y && //and if
        //if ball is above belowbar
        ball.pos.y < paddle.pos.y + paddle.sizeY && // and if
        //if ball is above left paddle side
        ball.pos.x + ball.radius > paddle.pos.x && // and if
        //if ball is below right paddle side
        ball.pos.x - ball.radius < paddle.pos.x + paddle.sizeX
    ) {
        ball.vel.x = -ball.vel.x;
        // console.log("Side Hit!");
    }
    // text(ball.pos.y, 50, 50);
}

function checkBrickCollision(ball, brick) {
    //skipping function if brick is destroyed
    if (brick.destroyed) {
        return;
    }

    // Top or bottom collision
    if (
        // Ball's x is within brick's width
        ball.pos.x > brick.x &&
        ball.pos.x < brick.x + brick.w &&
        // Ball is touching the top or bottom of the brick
        ball.pos.y + ball.radius > brick.y &&
        ball.pos.y - ball.radius < brick.y + brick.h
    ) {
        ball.vel.y = -ball.vel.y;
        console.log("Top/Bottom Brick Hit");
        brick.destroyed = true;
    }

    // Side collision
    if (
        // Ball's y is within brick's height
        ball.pos.y > brick.y &&
        ball.pos.y < brick.y + brick.h &&
        // Ball is hitting left or right side
        ball.pos.x + ball.radius > brick.x &&
        ball.pos.x - ball.radius < brick.x + brick.w
    ) {
        ball.vel.x = -ball.vel.x;
        console.log("Side Brick Hit");
        brick.destroyed = true;
    }
}
