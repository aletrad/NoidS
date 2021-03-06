class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.background = new Image();
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
    this.isRunning = false;
    this.playerSound = new Audio("docs/assets/sounds/nutfall.flac");
    this.over = new Audio("docs/assets/sounds/horror.wav");
    this.death = new Audio("docs/assets/sounds/death.wav");
    this.round = new Audio("docs/assets/sounds/round.wav");
    this.win = new Audio("docs/assets/sounds/win.ogg");
  }

  start() {
    if (!this.isRunning) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
    this.isRunning = true;
    this.player = new Player(this);
    this.ball = new Ball(this);
    this.controls = new Controls(this);
    this.controls.controlEvent();
    if (this.level === 1) {
      this.ctx.font = "25px 'Press Start 2P', cursive";
      this.ctx.fillStyle = "white";
      this.ctx.fillText(`Get ready!`, 130, 300);
      this.multipleEnemies();
    } else if (this.level === 2) {
      this.multipleEnemies2();
    } else if (this.level === 3) {
      this.multipleEnemies3();
    } else if (this.level === 4) {
      this.multipleEnemies4();
    } else if (this.level === 5) {
      this.multipleEnemies5();
    }
    if (this.level === 6) {
      this.checkWin();
    }
    setTimeout(() => {
      this.IntervalId = setInterval(() => {
        this.update();
      }, 20);
    }, 3000);
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.frames++;
    this.drawBackground();
    this.player.draw();
    this.ball.draw();
    this.drawScores();
    this.drawLives();
    this.drawLevel();
    this.ball.ballVelocity();
    this.detectWall();
    this.enemyCollision();
    this.enemies.forEach((enemy) => {
      enemy.draw();
    });
    this.checkWin();
    this.livesRemaining();
    this.checkNextLevel();
    this.newLives();
  }

  drawBackground() {
    this.background.src = "docs/assets/imgs/space.jpeg";
    this.ctx.drawImage(
      this.background,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  detectWall() {
    if (this.ball.x < 5) {
      this.ball.vx = -this.ball.vx;
    }
    if (this.ball.x > 480) {
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

    this.enemies.push(new Enemies(this, 45, 150, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 45, 150, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 115, 150, 60, 25, "green"));
    this.enemies.push(new Enemies(this, 185, 150, 60, 25, "blue"));
    this.enemies.push(new Enemies(this, 255, 150, 60, 25, "green"));
    this.enemies.push(new Enemies(this, 325, 150, 60, 25, "blue"));
    this.enemies.push(new Enemies(this, 395, 150, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 395, 150, 60, 25, "gray"));

    this.enemies.push(new Enemies(this, 10, 200, 60, 25, "blue"));
    this.enemies.push(new Enemies(this, 80, 200, 60, 25, "green"));
    this.enemies.push(new Enemies(this, 150, 200, 60, 25, "blue"));
    this.enemies.push(new Enemies(this, 220, 200, 60, 25, "green"));
    this.enemies.push(new Enemies(this, 290, 200, 60, 25, "blue"));
    this.enemies.push(new Enemies(this, 360, 200, 60, 25, "green"));
    this.enemies.push(new Enemies(this, 430, 200, 60, 25, "blue"));

    this.enemies.push(new Enemies(this, 45, 250, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 45, 250, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 115, 250, 60, 25, "green"));
    this.enemies.push(new Enemies(this, 185, 250, 60, 25, "blue"));
    this.enemies.push(new Enemies(this, 255, 250, 60, 25, "green"));
    this.enemies.push(new Enemies(this, 325, 250, 60, 25, "blue"));
    this.enemies.push(new Enemies(this, 395, 250, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 395, 250, 60, 25, "gray"));

    this.enemies.push(new Enemies(this, 150, 350, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 150, 350, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 250, 350, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 250, 350, 60, 25, "gray"));
  }

  multipleEnemies2() {
    this.enemies.push(new Enemies(this, 10, 50, 60, 25, "yellow"));
    this.enemies.push(new Enemies(this, 10, 100, 60, 25, "yellow"));
    this.enemies.push(new Enemies(this, 10, 150, 60, 25, "yellow"));
    this.enemies.push(new Enemies(this, 10, 200, 60, 25, "yellow"));
    this.enemies.push(new Enemies(this, 10, 250, 60, 25, "yellow"));

    this.enemies.push(new Enemies(this, 80, 100, 60, 25, "red"));
    this.enemies.push(new Enemies(this, 80, 150, 60, 25, "red"));
    this.enemies.push(new Enemies(this, 80, 200, 60, 25, "red"));
    this.enemies.push(new Enemies(this, 80, 250, 60, 25, "red"));

    this.enemies.push(new Enemies(this, 150, 150, 60, 25, "yellow"));
    this.enemies.push(new Enemies(this, 150, 200, 60, 25, "yellow"));
    this.enemies.push(new Enemies(this, 150, 250, 60, 25, "yellow"));

    this.enemies.push(new Enemies(this, 220, 200, 60, 25, "red"));
    this.enemies.push(new Enemies(this, 220, 250, 60, 25, "red"));

    this.enemies.push(new Enemies(this, 290, 250, 60, 25, "yellow"));

    this.enemies.push(new Enemies(this, 10, 300, 60, 25, "red"));
    this.enemies.push(new Enemies(this, 80, 300, 60, 25, "red"));
    this.enemies.push(new Enemies(this, 150, 300, 60, 25, "red"));
    this.enemies.push(new Enemies(this, 220, 300, 60, 25, "red"));
    this.enemies.push(new Enemies(this, 290, 300, 60, 25, "red"));
    this.enemies.push(new Enemies(this, 360, 300, 60, 25, "red"));
    this.enemies.push(new Enemies(this, 430, 300, 60, 25, "red"));
  }

  multipleEnemies3() {
    this.enemies.push(new Enemies(this, 10, 50, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 10, 50, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 430, 50, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 430, 50, 60, 25, "gray"));

    this.enemies.push(new Enemies(this, 80, 100, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 80, 100, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 360, 100, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 360, 100, 60, 25, "gray"));

    this.enemies.push(new Enemies(this, 150, 150, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 150, 150, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 290, 150, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 290, 150, 60, 25, "gray"));

    this.enemies.push(new Enemies(this, 220, 200, 60, 25, "red"));

    this.enemies.push(new Enemies(this, 290, 250, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 290, 250, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 150, 250, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 150, 250, 60, 25, "gray"));

    this.enemies.push(new Enemies(this, 360, 300, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 360, 300, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 80, 300, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 80, 300, 60, 25, "gray"));

    this.enemies.push(new Enemies(this, 430, 350, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 430, 350, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 10, 350, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 10, 350, 60, 25, "gray"));
  }

  multipleEnemies4() {
    this.enemies.push(new Enemies(this, 10, 100, 60, 25, "purple"));
    this.enemies.push(new Enemies(this, 80, 100, 60, 25, "purple"));
    this.enemies.push(new Enemies(this, 10, 150, 60, 25, "purple"));
    this.enemies.push(new Enemies(this, 80, 150, 60, 25, "purple"));

    this.enemies.push(new Enemies(this, 10, 250, 60, 25, "red"));
    this.enemies.push(new Enemies(this, 80, 250, 60, 25, "red"));
    this.enemies.push(new Enemies(this, 10, 300, 60, 25, "red"));
    this.enemies.push(new Enemies(this, 80, 300, 60, 25, "red"));

    this.enemies.push(new Enemies(this, 430, 100, 60, 25, "pink"));
    this.enemies.push(new Enemies(this, 360, 100, 60, 25, "pink"));
    this.enemies.push(new Enemies(this, 430, 150, 60, 25, "pink"));
    this.enemies.push(new Enemies(this, 360, 150, 60, 25, "pink"));

    this.enemies.push(new Enemies(this, 430, 250, 60, 25, "orange"));
    this.enemies.push(new Enemies(this, 360, 250, 60, 25, "orange"));
    this.enemies.push(new Enemies(this, 430, 300, 60, 25, "orange"));
    this.enemies.push(new Enemies(this, 360, 300, 60, 25, "orange"));

    this.enemies.push(new Enemies(this, 220, 100, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 220, 100, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 220, 150, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 220, 150, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 220, 200, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 220, 200, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 220, 250, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 220, 250, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 220, 300, 60, 25, "gray"));
    this.enemies.push(new Enemies(this, 220, 300, 60, 25, "gray"));
  }

  multipleEnemies5() {
    this.enemies.push(new Enemies(this, 10, 80, 60, 25, "blue"));
    this.enemies.push(new Enemies(this, 100, 115, 60, 25, "green"));
    this.enemies.push(new Enemies(this, 10, 150, 60, 25, "blue"));
    this.enemies.push(new Enemies(this, 100, 185, 60, 25, "green"));
    this.enemies.push(new Enemies(this, 10, 220, 60, 25, "blue"));
    this.enemies.push(new Enemies(this, 100, 255, 60, 25, "green"));
    this.enemies.push(new Enemies(this, 10, 290, 60, 25, "blue"));
    this.enemies.push(new Enemies(this, 100, 325, 60, 25, "green"));
    this.enemies.push(new Enemies(this, 10, 360, 60, 25, "blue"));

    this.enemies.push(new Enemies(this, 190, 80, 60, 25, "red"));
    this.enemies.push(new Enemies(this, 250, 115, 60, 25, "yellow"));
    this.enemies.push(new Enemies(this, 190, 150, 60, 25, "red"));
    this.enemies.push(new Enemies(this, 250, 185, 60, 25, "yellow"));
    this.enemies.push(new Enemies(this, 190, 220, 60, 25, "red"));
    this.enemies.push(new Enemies(this, 250, 255, 60, 25, "yellow"));
    this.enemies.push(new Enemies(this, 190, 290, 60, 25, "red"));
    this.enemies.push(new Enemies(this, 250, 325, 60, 25, "yellow"));
    this.enemies.push(new Enemies(this, 190, 360, 60, 25, "red"));

    this.enemies.push(new Enemies(this, 430, 80, 60, 25, "blue"));
    this.enemies.push(new Enemies(this, 340, 115, 60, 25, "green"));
    this.enemies.push(new Enemies(this, 430, 150, 60, 25, "blue"));
    this.enemies.push(new Enemies(this, 340, 185, 60, 25, "green"));
    this.enemies.push(new Enemies(this, 430, 220, 60, 25, "blue"));
    this.enemies.push(new Enemies(this, 340, 255, 60, 25, "green"));
    this.enemies.push(new Enemies(this, 430, 290, 60, 25, "blue"));
    this.enemies.push(new Enemies(this, 340, 325, 60, 25, "green"));
    this.enemies.push(new Enemies(this, 430, 360, 60, 25, "blue"));
  }

  enemyCollision() {
    const ballHitsEnemy = (enemy) =>
      this.ball.x + 2 * this.ball.radius > enemy.x &&
      this.ball.x < enemy.x + enemy.width &&
      this.ball.y + 2 * this.ball.radius > enemy.y &&
      this.ball.y < enemy.y + enemy.height;

    this.enemies.forEach((enemy, i) => {
      if (ballHitsEnemy(enemy)) {
        this.playerSound.currentTime = 0;
        this.playerSound.play();
        this.ball.vy = -this.ball.vy;
        this.score += 10;
        this.enemies.splice([i], 1);
      }
    });
  }

  drawScores() {
    this.ctx.font = "13px 'Press Start 2P', cursive";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`Score: ${this.score}`, 50, 30);
  }

  drawLives() {
    this.ctx.font = "13px 'Press Start 2P', cursive";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`Lives: ${this.lives}`, 210, 30);
  }

  drawLevel() {
    this.ctx.font = "13px 'Press Start 2P', cursive";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`Level: ${this.level}`, 350, 30);
  }

  resetBallPaddle() {
    this.ball.x = 250;
    this.ball.y = 552;
    this.player.x = 209;
  }

  checkNextLevel() {
    if (this.enemies.length === 0 && this.level < 6) {
      this.nextLevel();
    }
  }

  nextLevel() {
    if (this.level < 5) {
      this.round.play();
      this.round.volume = 0.1;
    }
    this.level += 1;
    this.ctx.font = "20px 'Press Start 2P', cursive";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`Get ready for level ${this.level}!`, 35, 300);
    clearInterval(this.IntervalId);
    this.start();
  }

  checkWin() {
    if (this.level === 6) {
      this.win.play();
      this.background.src = "docs/assets/imgs/space.jpeg";
      this.ctx.drawImage(
        this.background,
        this.x,
        this.y,
        this.width,
        this.height
      );
      this.ctx.font = "20px 'Press Start 2P', cursive";
      this.ctx.fillStyle = "white";
      this.ctx.fillText("YOU WON!!!", 150, 150);
      this.ctx.fillText("CLICK 'START GAME'", 75, 300);
      this.ctx.fillText("TO PLAY AGAIN", 120, 350);
      clearInterval(this.IntervalId);
      this.isRunning = false;
    }
  }

  gameOver() {
    this.over.play();
    this.over.volume = 0.4;
    this.background.src = "docs/assets/imgs/space.jpeg";
    this.ctx.drawImage(
      this.background,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.ctx.font = "20px 'Press Start 2P', cursive";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("YOU LOST", 165, 150);
    this.ctx.fillText("CLICK 'START GAME'", 75, 300);
    this.ctx.fillText("TO TRY AGAIN", 130, 350);
    clearInterval(this.IntervalId);
    this.isRunning = false;
  }

  livesRemaining() {
    if (this.ball.y > this.canvas.height) {
      this.death.play();
      this.death.volume = 0.4;
      this.lives -= 1;
      if (this.lives === 0) {
        this.gameOver();
      }
      this.resetBallPaddle();
    }
  }
}
