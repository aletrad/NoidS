class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    //this.background = new Image();
    this.x = 0;
    this.y = 0;
    this.width = 500;
    this.height = 600;
    this.IntervalId = null;
    this.player = null;
    this.enemies = [];
    this.ball = null;
    this.controls = null;
    this.frames = 0;
    this.lives = 3;
    this.score = 0;
    this.level = 1;
  }

  start() {
    this.player = new Player(this);
    this.ball = new Ball(this);
    this.multipleEnemies();
    this.controls = new Controls(this);
    this.controls.controlEvent();
    this.IntervalId = setInterval(() => {
      this.update();
    }, 1000 / 60);
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.player.draw();
    this.enemies.forEach((enemy) => {
      enemy.draw();
    });
    this.ball.draw();
    this.frames++;
    this.drawScores();
    this.drawLives();
    this.ball.ballVelocity();
    this.detectWall();
    this.enemyCollision();
    this.livesRemaining();
    this.checkNextLevel();
    this.checkWin();
    this.gameOver();
  }

  detectWall() {
    if (this.ball.x < 10) {
      this.ball.vx = -this.ball.vx;
    }
    if (this.ball.x > 490) {
      this.ball.vx = -this.ball.vx;
    }
    if (this.ball.y < 0) {
      this.ball.vy = -this.ball.vy;
    }
    const hitPlayer = () =>
      this.ball.y + 4 * this.ball.radius >
        this.canvas.height - this.player.height &&
      this.ball.y + this.ball.radius < this.canvas.height &&
      this.ball.x + this.ball.radius > this.player.x &&
      this.ball.x + this.ball.radius < this.player.x + this.player.width;

    if (hitPlayer()) {
      this.ball.vy = -this.ball.vy;
      this.ball.y =
        this.canvas.height - this.player.height - 4 * this.ball.radius;
    }
  }

  multipleEnemies() {
    this.enemies.push(new Enemies(this, 10, 100, 60, 25, "blue"));
    this.enemies.push(new Enemies(this, 80, 100, 60, 25, "green"));
    this.enemies.push(new Enemies(this, 150, 100, 60, 25, "blue"));
    this.enemies.push(new Enemies(this, 220, 100, 60, 25, "green"));
    this.enemies.push(new Enemies(this, 290, 100, 60, 25, "blue"));
    this.enemies.push(new Enemies(this, 360, 100, 60, 25, "green"));
    this.enemies.push(new Enemies(this, 430, 100, 60, 25, "blue"));
    this.enemies.push(new Enemies(this, 45, 150, 60, 25, "grey"));
    this.enemies.push(new Enemies(this, 45, 150, 60, 25, "grey"));
    this.enemies.push(new Enemies(this, 115, 150, 60, 25, "green"));
    this.enemies.push(new Enemies(this, 185, 150, 60, 25, "blue"));
    this.enemies.push(new Enemies(this, 255, 150, 60, 25, "green"));
    this.enemies.push(new Enemies(this, 325, 150, 60, 25, "blue"));
    this.enemies.push(new Enemies(this, 395, 150, 60, 25, "grey"));
    this.enemies.push(new Enemies(this, 395, 150, 60, 25, "grey"));
    this.enemies.push(new Enemies(this, 10, 200, 60, 25, "blue"));
    this.enemies.push(new Enemies(this, 80, 200, 60, 25, "green"));
    this.enemies.push(new Enemies(this, 150, 200, 60, 25, "blue"));
    this.enemies.push(new Enemies(this, 220, 200, 60, 25, "green"));
    this.enemies.push(new Enemies(this, 290, 200, 60, 25, "blue"));
    this.enemies.push(new Enemies(this, 360, 200, 60, 25, "green"));
    this.enemies.push(new Enemies(this, 430, 200, 60, 25, "blue"));
    this.enemies.push(new Enemies(this, 200, 300, 60, 25, "grey"));
    this.enemies.push(new Enemies(this, 200, 300, 60, 25, "grey"));
  }

  enemyCollision() {
    const ballHitsEnemy = (enemy) =>
      this.ball.x + 2 * this.ball.radius > enemy.x &&
      this.ball.x < enemy.x + enemy.width &&
      this.ball.y + 2 * this.ball.radius > enemy.y &&
      this.ball.y < enemy.y + enemy.height;

    this.enemies.forEach((enemy, i) => {
      if (ballHitsEnemy(enemy)) {
        this.ball.vy = -this.ball.vy;
        this.score += 10;
        this.enemies.splice([i], 1);
      }
    });
  }

  drawScores() {
    this.ctx.font = "32px serif";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Score: ${this.score}`, 100, 30);
  }

  drawLives() {
    this.ctx.font = "32px serif";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Lives: ${this.lives}`, 300, 30);
  }

  resetBallPaddle() {
    this.ball.x = 250;
    this.ball.y = 552;
    this.player.x = 209;
  }

  checkNextLevel() {
    if (this.enemies.length === 0) {
      this.nextLevel();

      setTimeout(() => {
        this.start();
      }, 3000);
    }
  }

  nextLevel() {
    this.level += 1;
    //this.ball.vx += 10;
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.fillText(`LEVEL ${this.level}!`, 100, 300);
    clearInterval(this.IntervalId);
  }

  checkWin() {
    if (this.level === 3) {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, 500, 600);
      this.ctx.font = "20px Arial";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("YOU WON!", 200, 100);
      this.ctx.fillText("CLICK 'Start Game' TO PLAY AGAIN", 100, 300);
      clearInterval(this.IntervalId);
    }
  }

  gameOver() {
    if (this.ball.y > this.canvas.height) {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, 500, 600);
      this.ctx.font = "20px Arial";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("GAME OVER", 200, 100);
      this.ctx.fillText("CLICK 'Start Game' TO PLAY AGAIN", 100, 300);
      clearInterval(this.IntervalId);
    }
  }

  livesRemaining() {
    if (this.ball.y > this.canvas.height) {
      this.lives -= 1;
      if (this.lives === 0) {
        this.gameOver();
      }
      this.resetBallPaddle();
    }
  }
}
