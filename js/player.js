class Player {
  constructor(game) {
    this.game = game;
    this.x = 209;
    this.y = 560;
    this.width = 80;
    this.height = 15;
    this.color = "blue";
  }

  draw() {
    this.game.ctx.fillStyle = this.color;
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  moveLeft() {
    this.x -= 10;
  }
  moveRight() {
    this.x += 10;
  }
}
