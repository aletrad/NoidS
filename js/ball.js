class Ball {
  constructor(game) {
    this.game = game;
    this.x = 250;
    this.y = 552;
    this.vx = 3;
    this.vy = -7;
    this.radius = 8;
    this.img = new Image();
  }

  draw() {
    this.img.src = "docs/assets/imgs/ball.png";
    this.game.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      2 * this.radius,
      2 * this.radius
    );
  }

  ballVelocity() {
    this.game.ball.x += this.game.ball.vx;
    this.game.ball.y += this.game.ball.vy;
  }
}
