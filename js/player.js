class Player {
  constructor(game) {
    this.game = game;
    this.x = 209;
    this.y = 560;
    this.width = 80;
    this.height = 15;
    this.img = new Image();
  }

  draw() {
    this.img.src = "docs/assets/imgs/paddle.png";
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  moveLeft() {
    this.x -= 30;
  }
  moveRight() {
    this.x += 30;
  }
}
