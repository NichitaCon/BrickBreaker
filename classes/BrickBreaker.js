class BrickBreaker {
    constructor(obj) {
        this.xpos = obj.xpos || 50;
        this.ypos = obj.ypos || 50;
        this.width = obj.width || 200;
        this.height = obj.height || 400;
        this.paddleWidth = obj.paddleWidth || this.width * .4
        this.paddleSpeed = obj.paddleSpeed || 10
        this.brickRows = obj.brickRows || 2
        this.brickColumns = obj.brickColumns || 11
        this.brickHeight = obj.brickHeight || 15
        this.gameLength = obj.gameLength || 30
        this.ballSpeed = obj.ballSpeed || 3

        this.score = 0;
        this.status = true;

        // Create the Ball, Paddle, and Bricks
        this.ball = new Ball({
            velY: this.ballSpeed,
            radius: 10,
            gameXpos: this.xpos,
            gameYpos: this.ypos,
            gameWidth: this.width,
            gameHeight: this.height,
            posX: this.xpos + this.width / 2,
            posY: this.ypos + this.height / 2,
        });

        this.paddle = new Paddle({
            sizeX: this.paddleWidth,
            sizeY: 10,
            gameXpos: this.xpos,
            gameWidth: this.width,
            gameHeight: this.height,
            posX: this.xpos + this.width / 2 - 50,
            posY: this.ypos + this.height * 0.9,
            barSpeed: this.paddleSpeed,
        });

        this.bricks = [];
        let rows = this.brickRows;
        let cols = this.brickColumns;
        let brickW = this.width / cols;
        let brickH = this.brickHeight;

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
            // if ball is below the right side of the paddle
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
                    - this.ballSpeed,
                    this.ballSpeed
                );
                let newVelY = -sqrt(sq(this.ballSpeed) - sq(newVelX)); // Negative so ball goes up

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
                this.score += 10;
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
                this.score += 10;
            }
        }
    }

    // Update the game objects
    update() {
        if (!this.status) {
            return;
        }
        // Update the ball
        this.ball.moveBall();

        // Check collisions
        this.checkCollision(); // Ball and paddle collision
        this.checkBrickCollision(); // Ball and brick collision


        
    }

    // Draw all the game objects
    draw() {
        background(233); // Clear the canvas
        fill(255);
        rect(this.xpos, this.ypos, this.width, this.height);

        // Draw bricks
        for (let i = 0; i < this.bricks.length; i++) {
            this.bricks[i].drawBrick();
        }

        // Draw paddle

        fill(0);
        this.paddle.drawPaddle();
        this.paddle.paddleMovement();

        // Draw ball
        this.ball.drawBall();

        // console.log(frameCount);

        let totalSecs = frameCount / 60;
        let mins = floor(totalSecs / 60);
        let secs = floor(totalSecs % 60);

        if (secs < 10) {
            secs = "0" + secs;
        }
        // console.log(mins, secs);

        let time = mins + ":" + secs;
        textSize(25);
        if (this.status) {
            text(
                "Score: " + this.score,
                this.xpos + 5,
                this.ypos + 25
            );
            text(
                secs - this.gameLength+"s",
                this.xpos + this.width - 50,
                this.ypos + 25
            );
        }

        if (secs >= this.gameLength || this.ball.ballLost) {
            // console.log("active");
            textSize(this.width * 0.13);
            text(
                "Score: " + this.score,
                this.xpos + this.width / 2 - this.width * 0.25,
                this.ypos + this.height * 0.35
            );

            this.status = false;
        }

        // console.log(this.ball.ballLost)
    }
}
