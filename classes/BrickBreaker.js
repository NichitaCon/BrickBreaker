class BrickBreaker {
    constructor(xpos, ypos, width, height) {
        // Set the position and size of the game world
        this.xpos = xpos || 50; // Default to 0 if not provided
        this.ypos = ypos || 50; // Default to 0 if not provided
        this.width = width || 200; // Default width
        this.height = height || 400; // Default height

        // Create the Ball, Paddle, and Bricks
        this.ball = new Ball({
            velY: ballSpeed,
            radius: 10,
            gameXpos: this.xpos,
            gameYpos: this.ypos,
            gameWidth: this.width,
            gameHeight: this.height,
            posX: this.xpos + this.width / 2, // Position the ball within the world
            posY: this.ypos + this.height / 2, // Position the ball within the world
        });

        this.paddle = new Paddle({
            sizeX: 100,
            sizeY: 10,
            gameXpos: this.xpos,
            gameWidth: this.width,
            gameHeight: this.height,
            posX: this.xpos + this.width / 2 - 50, // Position the paddle within the world
            posY: this.ypos + this.height * 0.9, // Position the paddle at the bottom of the world
            barSpeed: 10,
        });

        this.bricks = [];
        let rows = 2;
        let cols = 11;
        let brickW = this.width / cols; // Brick width adjusted to the new world width
        let brickH = 15;

        // Create bricks and position them within the world
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                let brickX = this.xpos + col * brickW;
                let brickY = this.ypos + row * brickH + 30; // offset from top
                let brickColor = color(random(255), random(255), random(255));
                this.bricks.push(
                    new Brick(brickX, brickY, brickW, brickH, brickColor)
                );
            }
        }
    }

    // Check ball and paddle collision
    checkCollision() {
        let ball = this.ball;
        let paddle = this.paddle;

        if (
            // if ball is larger than left side of paddle
            ball.pos.x > paddle.pos.x &&
            ball.pos.x < paddle.pos.x + paddle.sizeX &&
            // Ball is touching the top side of the paddle
            ball.pos.y + ball.radius > paddle.pos.y
        ) {
            if (ball.pos.y > paddle.pos.y + paddle.sizeY) {
                // Don't do anything if the ball is under the paddle
            } else {
                let newVelX = map(
                    ball.pos.x,
                    paddle.pos.x,
                    paddle.pos.x + paddle.sizeX,
                    -ballSpeed,
                    ballSpeed
                );
                let newVelY = -sqrt(sq(ballSpeed) - sq(newVelX)); // Negative so ball goes up

                ball.vel.x = newVelX;
                ball.vel.y = newVelY;
            }
        }

        // Side bounce
        if (
            ball.pos.y > paddle.pos.y &&
            ball.pos.y < paddle.pos.y + paddle.sizeY &&
            ball.pos.x + ball.radius > paddle.pos.x &&
            ball.pos.x - ball.radius < paddle.pos.x + paddle.sizeX
        ) {
            ball.vel.x = -ball.vel.x;
        }
    }

    // Check ball and brick collision
    checkBrickCollision() {
        let ball = this.ball;

        for (let i = 0; i < this.bricks.length; i++) {
            let brick = this.bricks[i];
            if (brick.destroyed) {
                continue; // Skip destroyed bricks
            }

            // Top or bottom collision
            if (
                ball.pos.x > brick.x &&
                ball.pos.x < brick.x + brick.w &&
                ball.pos.y + ball.radius > brick.y &&
                ball.pos.y - ball.radius < brick.y + brick.h
            ) {
                ball.vel.y = -ball.vel.y;
                brick.destroyed = true;
            }

            // Side collision
            if (
                ball.pos.y > brick.y &&
                ball.pos.y < brick.y + brick.h &&
                ball.pos.x + ball.radius > brick.x &&
                ball.pos.x - ball.radius < brick.x + brick.w
            ) {
                ball.vel.x = -ball.vel.x;
                brick.destroyed = true;
            }
        }
    }

    // Update the game objects
    update() {
        // Update the ball
        this.ball.moveBall();

        // Check collisions
        this.checkCollision(); // Ball and paddle collision
        this.checkBrickCollision(); // Ball and brick collision
    }

    // Draw all the game objects
    draw() {
        background(233); // Clear the canvas
        fill(233);
        rect(this.xpos, this.ypos, this.width, this.height);

        // Draw bricks
        for (let i = 0; i < this.bricks.length; i++) {
            this.bricks[i].drawBrick();
        }

        // Draw paddle
        this.paddle.drawPaddle();
        this.paddle.paddleMovement();

        // Draw ball
        this.ball.drawBall();

        console.log(frameCount);

        let totalSecs = frameCount / 60;
        let mins = floor(totalSecs / 60);
        let secs = floor(totalSecs % 60);

        if (secs < 10) {
            secs = "0" + secs;
        }
        console.log(mins, secs);

        let time = mins + ":" + secs;
        textSize(25);
        text(time, this.xpos + 30, this.ypos + 100);
    }
}
