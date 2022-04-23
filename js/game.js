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
    this.frames = 0;
  }

  start() {
    this.player = new Player(this);
    this.ball = new Ball(this);
    this.controls = new Controls(this);
    this.controls.controlEvent();
    this.IntervalId = setInterval(() => {
      this.update();
    }, 1000 / 60);
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.frames++;
    this.drawScores();
    this.player.draw();
    this.ball.draw();
    //this.ball.x += this.ball.vx;
    //this.ball.y += this.ball.vy;
    //if (
    //this.ball.y + this.ball.vy > this.canvas.height ||
    //this.ball.y + this.ball.vy < 0
    //) {
    //this.ball.vy *= -1;
    //}
    //if (
    // this.ball.x + this.ball.vx > this.canvas.width ||
    //  this.ball.x + this.ball.vx < 0
    //) {
    // this.ball.vx *= -1;
    //}
  }

  stop() {
    clearInterval(this.IntervalId);
  }

  drawScores() {
    let score = Math.floor(this.frames / 60);
    this.ctx.font = "32px serif";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Score: ${score}`, 100, 30);
  }
}
