class Controls {
  constructor(game) {
    this.game = game;
    this.player = this.game.player;
  }

  controlEvent() {
    window.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "ArrowRight":
          if (this.player.x + this.player.width < 490) {
            this.player.moveRight();
          }
          break;
        case "ArrowLeft":
          if (this.player.x > 10) {
            this.player.moveLeft();
          }
          break;
      }
    });
  }
}
