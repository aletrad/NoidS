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
    this.ball = null;
    this.controls = null;
    this.frames = 0;
  }

  start() {
    this.player = new Player(this);
    this.ball = new Ball(this);
    this.controls = new Controls(this);
    this.controls.controlEvent();
    this.IntervalId = setInterval(() => {
      this.update();
    }, 15);
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.player.draw();
    this.ball.draw();
    this.frames++;
    this.drawScores();
    this.ball.ballVelocity();
    //this.detectPlayer();
    this.detectWall();
  }

  stop() {
    clearInterval(this.IntervalId);
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
      this.ball.y + 4.1 * this.ball.radius >
        this.canvas.height - this.player.height &&
      this.ball.y + this.ball.radius < this.canvas.height &&
      this.ball.x + this.ball.radius > this.player.x &&
      this.ball.x + this.ball.radius < this.player.x + this.player.width;

    if (hitPlayer()) {
      this.ball.vy = -this.ball.vy;
    }
  }

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
}
