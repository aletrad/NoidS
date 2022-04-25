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
    this.ball.ballVelocity();
    this.detectWall();
    this.detectEnemyCollision();
    this.checkGameOver();
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
    this.enemies.push(new Enemies(this, 10, 30, 60, 30, "blue"));
    this.enemies.push(new Enemies(this, 110, 100, 60, 30, "blue"));
    this.enemies.push(new Enemies(this, 210, 100, 60, 30, "blue"));
    this.enemies.push(new Enemies(this, 310, 100, 60, 30, "blue"));
    this.enemies.push(new Enemies(this, 410, 100, 60, 30, "blue"));
    this.enemies.push(new Enemies(this, 200, 150, 60, 30, "green"));
    this.enemies.push(new Enemies(this, 300, 200, 60, 30, "yellow"));
  }

  detectEnemyCollision() {
    const ballHitEnemy = (enemy) =>
      this.ball.x + 2 * this.ball.radius > enemy.x &&
      this.ball.x < enemy.x + enemy.width &&
      this.ball.y + 2 * this.ball.radius > enemy.y &&
      this.ball.y < enemy.y + enemy.height;

    this.enemies.forEach((enemy) => {
      if (ballHitEnemy(enemy)) {
        console.log("hey");
      }
    });
  }

  // checkCol() {
  //   const ball = this.ball;
  //   const crashed = this.enemies.some(function (enemy) {
  //     return ball.crashWith(enemy);
  //   });

  //   if (crashed) {
  //     console.log("hey");
  //   }
  // }

  //   detectBrickCollision() {

  //       if (
  //          this.ball.x + 2 * this.ball.radius > this.enemies.x &&
  //       this.ball.x < this.enemies.x + this.enemies.width &&
  //       this.ball.y + 2 * this.ball.radius > this.enemies.y &&
  //       this.ball.y < this.enemies.y + this.enemies.height) {
  //         this.ball.vy = -this.ball.vy;
  //       }
  //  }

  //   multipleEnemies.forEach((enemies) => {
  //     if (this.enemies.hitsLeft && isBallInsideBrick(enemies)) {
  //       this.enemies.hitsLeft--;
  //     }
  //   });
  // }

  // detectPlayer() {
  //   if (
  //     this.ball.y + 2 * this.ball.radius >
  //     this.canvas.height - this.player.height
  //   ) {
  //     this.ball.vy = -this.ball.vy;
  //   }
  //   if (this.ball.y + this.ball.radius < this.canvas.height) {
  //     this.ball.vy = -this.ball.vy;
  //   }
  //   if (this.ball.x + this.ball.radius > this.player.x) {
  //     this.ball.vx = -this.ball.vx;
  //   }
  //   if (this.ball.x + this.ball.radius < this.player.x + this.player.width) {
  //     this.ball.vx = -this.ball.vx;
  //   }
  // }

  // detectWall() {
  //   if (
  //     this.ball.y + this.ball.vy > this.canvas.height ||
  //     this.ball.y + this.ball.vy < 0
  //   ) {
  //     this.ball.vy *= -1;
  //   }
  //   if (
  //     this.ball.x + this.ball.vx > this.canvas.width ||
  //     this.ball.x + this.ball.vx < 0
  //   ) {
  //     this.ball.vx *= -1;
  //   }
  // }

  // detectWall() {
  //   const hitLeftWall = () => this.ball.x < 0;
  //   const hitRightWall = () =>
  //     this.ball.x + this.ball.radius * 1 > this.canvas.width;
  //   const hitTopWall = () => this.ball.y < 0;
  //   const hitPlayer = () =>
  //     this.ball.y + 2 * this.ball.radius >
  //       this.canvas.height - this.player.height &&
  //     this.ball.y + this.ball.radius < this.canvas.height &&
  //     this.ball.x + this.ball.radius > this.player.x &&
  //     this.ball.x + this.ball.radius < this.player.x + this.player.width;

  //   if (hitLeftWall()) {
  //     this.ball.vx = -this.ball.vx;
  //     this.ball.x = 0;
  //   }
  //   if (hitRightWall()) {
  //     this.ball.vx = -this.ball.vx;
  //     this.ball.x = this.canvas.width - 1 * this.ball.radius;
  //   }
  //   if (hitTopWall()) {
  //     this.ball.vy = -this.ball.vy;
  //     this.ball.y = 10;
  //   }
  //   if (hitPlayer()) {
  //     this.ball.vy = -this.ball.vy;
  //     this.ball.y =
  //       this.canvas.height - this.player.height - 2 * this.ball.radius;
  //   }
  // }

  drawScores() {
    let score = Math.floor(this.frames / 60);
    this.ctx.font = "32px serif";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Score: ${score}`, 100, 30);
  }

  checkGameOver() {
    if (this.ball.y > this.canvas.height) {
      this.stop();
    }
  }

  stop() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, 500, 600);
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("GAME OVER", 200, 100);
    this.ctx.fillText("CLICK 'Start Game' TO PLAY AGAIN", 100, 300);
    clearInterval(this.IntervalId);
  }
}
